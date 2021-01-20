.. doctest-skip-all
.. _python-code-guide:

.. todo::
    - Testing Guidelines
    - Writing Command-Line Scripts
    - C or Cython Extensions

************************
Python Coding Guidelines
************************

This section describes requirements and guidelines.

An Example Python Project
=========================

We have created a `skeleton Python project
<https://gitlab.com/ska-telescope/templates/ska-python-skeleton>`_ which should provide a full introduction to the various
recommendations and requirements for the development of Python. The philosophy behind the development of this
template was to demonstrate one way to meet the project guidelines and demonstrate a
`recommended <https://blog.ionelmc.ro/2014/05/25/python-packaging/#the-structure>`_ project layout.

The recommended project layout is as follows:

.. literalinclude:: python_source_tree.txt

Interface and Dependencies
==========================

* All code must be compatible with Python 3.7 and later.

* The new Python 3 formatting style should be used (i.e.
  ``"{0:s}".format("spam")`` instead of ``"%s" % "spam"``),
  or use format strings ``f"{spam}"`` if variable ``spam="spam"`` is in scope.


Documentation and Testing
=========================

* Docstrings must be present for all public classes/methods/functions, and
  must follow the form outlined by `PEP8 Docstring Conventions <https://www.python.org/dev/peps/pep-0257/>`_.

* Unit tests should be provided for as many public methods and functions as
  possible, and should adhere to `Pytest best practices <https://docs.pytest.org/en/latest/goodpractices.html>`_.


Data and Configuration
======================

* All persistent configuration should use `python-dotenv <https://github.com/theskumar/python-dotenv>`_.
  Such configuration ``.env`` files should be placed at the top of the ``ska_python_skeleton``
  module and provide a description that is sufficient for users to understand the settings changes.

Standard output, warnings, and errors
=====================================

The built-in ``print(...)`` function should only be used for output that
is explicitly requested by the user, for example ``print_header(...)``
or ``list_catalogs(...)``. Any other standard output, warnings, and
errors should follow these rules:

* For errors/exceptions, one should always use ``raise`` with one of the
  built-in exception classes, or a custom exception class. The
  nondescript ``Exception`` class should be avoided as much as possible,
  in favor of more specific exceptions (`IOError`, `ValueError`,
  etc.).

* For warnings, one should always use ``warnings.warn(message,
  warning_class)``. These get redirected to ``log.warning()`` by default.

* For informational and debugging messages, one should always use
  ``log.info(message)`` and ``log.debug(message)``.

Logging implementation
======================

There is a standard `Python logging module <https://gitlab.com/ska-telescope/ska-logging>`_ for logging in SKA projects.
This module ensures that messages are formatted correctly according to our formatting standards.

For details on how to use the logging module with detailed examples, please refer to:
https://gitlab.com/ska-telescope/ska-logging/tree/master#ska-logging-configuration-library


Coding Style/Conventions
========================

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


.. _handling-unicode:

Unicode guidelines
==================

For maximum compatibility, we need to assume that writing non-ASCII
characters to the console or to files will not work.


Including C Code
================

* When C extensions are used, the Python interface for those extensions
  must meet the aforementioned Python interface guidelines.

* The use of Cython_ is strongly recommended for C extensions. Cython_ extensions
  should store ``.pyx`` files in the source code repository, but they should be compiled
  to ``.c`` files that are updated in the repository when important changes are made
  to the ``.pyx`` file.

* In cases where C extensions are needed but Cython_ cannot be used, the `PEP 7
  Style Guide for C Code <https://www.python.org/dev/peps/pep-0007/>`_ is
  recommended.

.. _Cython: https://cython.org/


Examples
========

This section shows examples in order to illustrate points from the guidelines.

.. _prop-get-set-example:

Properties vs. get\_/set\_
--------------------------

This example shows a sample class illustrating the guideline regarding the use
of properties as opposed to getter/setter methods.

Let's assuming you've defined a ``':class:`Star`'`` class and create an instance
like this::

    >>> s = Star(B=5.48, V=4.83)

You should always use attribute syntax like this::

    >>> s.color = 0.4
    >>> print(s.color)
    0.4

Using Python properties, attribute syntax can still do anything possible with
a get/set method. For lengthy or complex calculations, however, use a method::

    >>> print(s.compute_color(5800, age=5e9))
    0.4

.. _super-vs-direct-example:

super() vs. Direct Calling
--------------------------

By calling :func:`super` the entire method resolution order for
``D`` is precomputed, enabling each superclass to cooperatively determine which
class should be handed control in the next :func:`super` call::

    # This is safe

    class A(object):
        def method(self):
            print('Doing A')

    class B(A):
        def method(self):
            print('Doing B')
            super().method()


    class C(A):
        def method(self):
            print('Doing C')
            super().method()

    class D(C, B):
        def method(self):
            print('Doing D')
            super().method()

::

    >>> d = D()
    >>> d.method()
    Doing D
    Doing C
    Doing B
    Doing A

As you can see, each superclass's method is entered only once.  For this to
work it is very important that each method in a class that calls its
superclass's version of that method use :func:`super` instead of calling the
method directly.  In the most common case of single-inheritance, using
``super()`` is functionally equivalent to calling the superclass's method
directly.  But as soon as a class is used in a multiple-inheritance
hierarchy it must use ``super()`` in order to cooperate with other classes in
the hierarchy.

.. note:: For more information on the the benefits of :func:`super`, see
          https://rhettinger.wordpress.com/2011/05/26/super-considered-super/

.. _import-star-example:

Acceptable use of ``from module import *``
------------------------------------------

``from module import *`` is discouraged in a module that contains
implementation code, as it impedes clarity and often imports unused variables.
It can, however, be used for a package that is laid out in the following
manner::

    packagename
    packagename/__init__.py
    packagename/submodule1.py
    packagename/submodule2.py

In this case, ``packagename/__init__.py`` may be::

    """
    A docstring describing the package goes here
    """
    from submodule1 import *
    from submodule2 import *

This allows functions or classes in the submodules to be used directly as
``packagename.foo`` rather than ``packagename.submodule1.foo``. If this is
used, it is strongly recommended that the submodules make use of the ``__all__``
variable to specify which modules should be imported. Thus, ``submodule2.py``
might read::

    from numpy import array, linspace

    __all__ = ['foo', 'AClass']

    def foo(bar):
        # the function would be defined here
        pass

    class AClass(object):
        # the class is defined here
        pass

This ensures that ``from submodule import *`` only imports ``':func:`foo'``
and ``':class:`AClass'``, but not ``':class:`numpy.array'`` or
``':func:`numpy.linspace'``.


. _python-packaging:

Packaging
=========

SKA python packages use `setuptools <https://setuptools.readthedocs.io>`_ to 
assemble the packages


Apart from the standard arguments to :meth:`~setuptools.setup`, several extra 
enhancements are used.

Running tests out of the top-level directory can lead to conflicts when the 
package is a direct child. It is best to put the package code in a subdirectory 
e.g. ``src``

``package_dir={"": "src"}``

Package layout:

.. code-block:: none

    setup.py
    setup.cfg
    requirements.txt
    requirements-test.txt
    src/ska/foo/__init__.py
    src/ska/foo/bardevice.py
    tests/__init__.py
    tests/test_bardevice.py
    docs/requirements.txt
    docs/source/conf.py
    docs/source/index.rst


Namespace
---------

It is recommended to use the ``ska`` namespace package for modules developed 
in Python which are directly related to SKA. 
`Namespace packages <https://docs.python.org/3/glossary.html#term-namespace-package>`_
in python3 are native and distinguish themselves as directories without ``__init__.py``
files. They have to be declared by using the output of 
:meth:`setuptools.find_namespace_packages` to supply to the ``packages`` 
keyword in :meth:`~setuptools.setup`

Requirements
------------

There are many ways to handle the installation of dependencies in ``python``.
`pip` 
Best practice though is to put direct dependencies into `install_requires` 
usually with a lower compatibility bound, but not explicit, e.g.

.. code-block:: python

       install_requires=[
            "pytango >= 9.3.2",
            "lmcbaseclasses >= 0.5.4"
        ]

For testing a package there is better to use and explicit `requirements.txt` file
rather than  ``setup(test_requires=)``.
A typical development scenario could look like::

  pip install -e . # pulls in dependencies via install_requires
  pip install -r requirements-test.txt
  pytest tests

Entry points
------------

If your code contains scripts or `main` functions in your module, these can 
automatically wrapped as executables in the deployed package. For example 
Tango ``Device Classes`` can be exposed without adding wrapper scripts

``entry_points=``

Sample ``setup.py``
-------------------

Here is a sample for the `foo` module in the ``ska`` namespace package:

.. code-block:: python
   :emphasize-lines: 18-26

    setuptools.setup(
        name="foo.bar",
        description="Foo stuff",
        version=0.0.1,
        author="Prof Dr Dr Foo",
        author_email="foo AT bar DOT org",
        license="IP here",
        url="https://foo.bar.org",
        classifiers=[
            "Development Status :: 3 - Alpha",
            "Intended Audience :: Developers",
            "License :: Other/Proprietary License",
            "Operating System :: OS Independent",
            "Programming Language :: Python",
            "Topic :: Software Development :: Libraries :: Python Modules",
            "Topic :: Scientific/Engineering :: Astronomy"],
        platforms=["OS Independent"],
        package_dir={"": "src"},
        packages=setuptools.find_namespace_packages(where="src"),
        entry_points={
            "console_scripts": [
                "FooDevice=ska.foo.bar_device:main",
            ]
        },        
        include_package_data=True,
        install_requires=[
            # should be pulled in by lmcbaseclasses but isn't
            "pytango >= 9.3.2",
            "lmcbaseclasses >= 0.5.4"
        ],
        keywords="foo tango ska",
        zip_safe=False
    )


Reproducible workflow
---------------------

.. todo:: 

  This section is still evolving

While testing in a local environment is quick and easy it doesn't fully guarantee
independence of the system. A widely used way to abstract environment handling is
tox_, which can control your testing workflow through several stages similar
to what various continuous integration pipelines do.

Simply install via ``pip install tox``

Here is a SKA pytango package example tox.ini:

.. code-block:: ini

  [tox]
  envlist = py37

  [testenv]
  setenv = PIP_DISABLE_VERSION_CHECK = 1
  install_command = python -m pip install --extra-index-url https://nexus.engageska-portugal.pt/repository/pypi/simple {opts} {packages}
  deps = 
      -rrequirements.txt  # runtime requirements
      -rrequirements-test.txt   # test/development requirements
  commands =
      # this ugly hack is here because:
      # https://github.com/tox-dev/tox/issues/149
      python -m pip install -U --extra-index-url https://nexus.engageska-portugal.pt/repository/pypi/simple -r{toxinidir}/requirements.txt
      # 
      python -m pytest {posargs}
  # use system site-packages for pytango (and c++ library dependencies)
  sitepackages = true

  [testenv:docs]
  description = build documentation
  basepython = python3
  sitepackages = false # we want to run docs without pytango, as that isn't available on RTD
  skip_install = true
  install_command = python -m pip install -U {opts} {packages}
  deps = -rdocs/requirements.txt
  commands = 
      sphinx-build -E -W -c docs/source/ -b html docs/source/ docs/build/html

  [testenv:lint]
  basepython = python3
  skip_install = true
  description = report linting 
  whitelist_externals = mkdir
  deps = -rrequirements-tst.txt
  commands = 
      - mkdir -p build/reports
      - python -m flake8 --max-line-length=88 --format=junit-xml --output-file=build/reports/linting.xml
      python -m flake8 --max-line-length=88 --statistics --show-source

To use `tox` simple invoke as follows::

  tox -e py37
  tox -e lint
  ...

.. _tox: https://tox.readthedocs.io/en/latest/




Acknowledgements
================

The present document's coding guidelines are derived from project
`Astropy's coding guidelines <http://docs.astropy.org/en/stable/development/codeguide.html>`_.
