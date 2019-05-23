.. doctest-skip-all
.. _code-guide:


****************************
VHDL Coding Style Guidelines
****************************

Following a coding style is an integral part of robust development. It should not be a burden, and something done afterwards to pass code review – it should be done continuously at all stages of code development. A clean coding style is desired. This allows other team members (and yourself in a month or a year) to read and digest your code quickly, and to use the code with a high confidence in its correctness.

The VHDL coding guidelines developed and published by ALSE are excellent, and will form the basis of this coding guideline. They are available from their website: 

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

****************************
Additional Material
****************************

Futher discussion on firmware development process, continuous integration, automated testing and recommendations for best practices can be found in the following google doc.

https://docs.google.com/document/d/1Kfc_4vLUy-0pSbi9HVeEkAmhuvEIEnt4voFnXxsc0zM/edit?usp=sharing
