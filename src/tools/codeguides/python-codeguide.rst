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

.. literalinclude:: python-source-tree.txt

Interface and Dependencies
==========================

* All code must be compatible with Python 3.10 and later.

* The new Python 3 formatting style should be used (i.e.
  ``"{0:s}".format("spam")`` instead of ``"%s" % "spam"``),
  or use format strings ``f"{spam}"`` if variable ``spam="spam"`` is in scope.


Documentation and Testing
=========================

* Docstrings must be present for all public classes/methods/functions, and
  must follow the form outlined by `PEP8 Docstring Conventions <https://www.python.org/dev/peps/pep-0257/>`_.

* Unit tests should be provided for as many public methods and functions as
  possible, and should adhere to `Pytest best practices <https://docs.pytest.org/en/latest/goodpractices.html>`_. These tests should always be able to run locally (the filesystem, the network, the database should not not be involved) and pass.

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

Packaging & Dependencies
========================

SKA python packages use `Poetry <https://python-poetry.org/>`_ for packaging &
dependency management.


Acknowledgements
================

The present document's coding guidelines are derived from project
`Astropy's coding guidelines <http://docs.astropy.org/en/stable/development/codeguide.html>`_.
