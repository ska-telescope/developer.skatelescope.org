*******
Linting
*******

This page explains the linting rules in place for the various tools and languages in use at SKAO. For detailed instructions, see the how-to guides.


Python & Jupyter Notebooks Coding Style/Conventions
===================================================

The SKAO enforces the following coding style rules and conventions for Python and Jupyter Notebooks:

* The code will follow the standard `PEP8 Style Guide for Python Code
  <https://www.python.org/dev/peps/pep-0008/>`_. In particular, this includes
  using only 4 spaces for indentation, and never tabs.

* The ``import numpy as np``, ``import matplotlib as mpl``, and ``import
  matplotlib.pyplot as plt`` naming conventions should be used wherever
  relevant. ``from packagename import *`` should never be used, except as a
  tool to flatten the namespace of a module. An example of the allowed usage
  is given in :ref:`import-star-example`.

* Classes should either use direct variable access, or Python’s property
  mechanism for setting object instance variables. ``get_value``/``set_value``
  style methods should be used only when getting and setting the values
  requires a computationally-expensive operation. :ref:`prop-get-set-example`
  below illustrates this guideline.

* Classes should use the builtin :func:`super` function when making calls to
  methods in their super-class(es) unless there are specific reasons not to.
  :func:`super` should be used consistently in all subclasses since it does not
  work otherwise.  :ref:`super-vs-direct-example` illustrates why this is
  important.

* Multiple inheritance should be avoided in general without good reason.

* ``__init__.py`` files for modules should not contain any significant
  implementation code. ``__init__.py`` can contain docstrings and code for
  organizing the module layout, however (e.g. ``from submodule import *``
  in accord with the guideline above). If a module is small enough that
  it fits in one file, it should simply be a single file, rather than a
  directory with an ``__init__.py`` file.

The python source code should be automatically validated using the pipeline machinery, which uses the ``isort``, ``black``, ``flake8`` and ``pylint`` tools to enforce the above guidelines.


C++ Coding Style/Conventions
============================

The SKAO recommends that new software follow `The C++ Core Guidelines <http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines>`_. However, no automated linting exists.


Ansible Coding Style/Conventions
================================

Ansible playbooks should be automatically validated using the pipeline machinery, which uses the ``yamllint``, ``ansiblelint`` and ``flake8`` tools to enforce default guidelines.


Helm Coding Style/Conventions
=============================

Helm charts should be automatically validated using the pipeline machinery, which uses the ``yamllint`` tool to enforce default guidelines.


OCI Coding Style/Conventions
============================

OCI images should be automatically validated using the pipeline machinery, which uses the ``hadolint`` tool to enforce default guidelines.


Terraform Coding Style/Conventions
==================================

Terraform files should be automatically validated using the pipeline machinery, which uses the ``tflint`` tool to enforce default guidelines.


VHDL Coding Style/Conventions
=============================

The VHDL coding guidelines developed and published by ALSE are excellent, and form the basis of this coding guideline. They are available from their website: 

http://www.alse-fr.com/VHDL-Coding-Guide.html 

and as a pdf: 

http://www.alse-fr.com/sites/alse-fr.com/IMG/pdf/vhdl_coding_v4_eng.pdf.

The following numbered additions/modifications/clarifications are used:

The VHDL-2008 standard will be used, so far as its features are supported by synthesis and simulation tools. Synthesis tools’ support for VHDL-2008 features has improved to a level where its usage can result in simpler, less verbose, and more descriptive code.

**P_11)** VHDL keywords shall be in lower case. Use an editor with syntax highlighting.

**N_8)** Active low signals should be avoided. In preference signals should be named to make them active high (positive logic). If no such obvious name can be found then active low signal names should have the suffix _n. For example the following are equivalent::

    tx_disable == tx_enable_n.

Note that in VHDL 2008, operators can be applied in port maps. So conversion can be applied without having to create an intermediate signal (and hence specify a name for it). For example::

  E_EXT_MOD : entity extern_lib.module 
  port map ( ...
    i_tx_enable_n <= not tx_enable,
    ...);

**N_9)** When ports of mode ‘out’ need to be accessed internally, the derived internal signals shall be named using <out port name>_i (for example o_outbus_i being the internally accessible signal from which the output port o_outbus is directly derived. However, in VHDL-2008 the output port can be accessed directly making this irrelevant.

**N_10)** Use instance names derived from the entity names. Prefix E\_ should be used to identify the direct instantiation of the entity, and C\_ for instantiation from a component declaration. The label shall be in all upper case. 
For example::

    E_FIR16X8 : entity work.fir16x8 port map ( etc...
    C_FIR16X8 : fir16x8 port map ( etc…
    
If there are multiple instances then instance names should have a descriptor appended that adds information. Avoid simply appending a number (consider using a generate loop instead). For example::

    E_EMIF_BOTTOM_RIGHT : entity work.external_memory_interface port map ( ...
    E_EMIF_TOP_LEFT     : entity work.external_memory_interface port map ( ...
    E_EMIF_TOP_RIGHT    : entity work.external_memory_interface port map ( ...

**N_14)** Names for clock and reset signals shall conform to the following convention:

* Clocks: ``<name>_clk``

* Reset: ``<name>_clk_<reset_name>_rst`` (active high reset, synchronised to ``<name>_clk``) 

* Reset: ``<name>_clk_<reset_name>_rst_n`` (active low reset, synchronised to ``<name>_clk``)

``<name>`` should be shared with the signals in the clock's domain.

An entity with a single clock, should have the input clock ``i_clk``, and with a single active high synchronous reset ``i_clk_rst``.

**N_15)** Constants shall use the c\_ prefix, and the name be capitalised, for example::

    constant c_BYTE_WIDTH : natural := 8;
    
**N_11)** Generics shall use the g\_ prefix, and the name be capitalised, for example::

    generic (g_BLOCK_LENGTH : natural := 256);
    
**N_12)** Variables shall use the v\_ prefix, for example::

    variable v_sum : unsigned(7 downto 0);
    
**N_13)** Process labels shall use the P\_ prefix, and be capitalised for example::

    P_DO_READ : process(i_clk)
    Begin
        if rising_edge(i_clk) then
            ... 
        end if;
    end process P_DO_READ;
    
**N_12)** Generate labels should use the G\_ prefix, and be capitalised, for example::

    G_USE_BUFFER : if not g_SIM generate
        -- instantiate buffer module
    else generate
        -- default signal assignments 
    end generate G_USE_BUFFER;
    G_EACH_DATA : for idx in 0 to g_DATA_WIDTH-1 generate
        -- assignments/instantiations for each bit in the data.
    end generate G_EACH_DATA;
    
**C_6a)** Allow numeric_std version of unsigned and signed types in ports. This increases the information in port description, giving meaning to the bit vector that is not available when declared as a std_logic_vector.

.. note::

  Further discussion on firmware development process, continuous integration, automated testing and recommendations for best practices can be found in the following google doc.
  This document will be gradually implemented and the resulting decision will be included in this developer portal.

  https://docs.google.com/document/d/1Kfc_4vLUy-0pSbi9HVeEkAmhuvEIEnt4voFnXxsc0zM/edit?usp=sharing