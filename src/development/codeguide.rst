.. doctest-skip-all
.. _code-guide:

.. todo::
    - Testing Guidelines
    - Writing Command-Line Scripts
    - C or Cython Extensions

*****************
Coding Guidelines
*****************

This section describes requirements and guidelines.

Interface and Dependencies
==========================

* All code must be compatible with Python 3.5 and later.

* The new Python 3 formatting style should be used (i.e.
  ``"{0:s}".format("spam")`` instead of ``"%s" % "spam"``).


Documentation and Testing
=========================

* Docstrings must be present for all public classes/methods/functions, and
  must follow the form outlined by `PEP8 Docstring Conventions <https://www.python.org/dev/peps/pep-0257/>`_.

* Unit tests should be provided for as many public methods and functions as
  possible, and should adhere to `Pytest best practices <https://docs.pytest.org/en/latest/goodpractices.html>`_.


Data and Configuration
======================

* All persistent configuration should use `python-dotenv <https://github.com/theskumar/python-dotenv>`_.
  Such configuration ``.env`` files should be placed at the top of the ``ska_skeleton``
  module and p[rovide a description sufficient for users to understand the settings changes.

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

The logging system should use the built-in Python `logging
<https://docs.python.org/3/library/logging.html>`_ module.


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

* The use of Cython_ is strongly recommended for C extensions, as per the
  example in the template package. Cython_ extensions should store ``.pyx``
  files in the source code repository, but they should be compiled to ``.c``
  files that are updated in the repository when important changes are made to
  the ``.pyx`` file.

* In cases where C extensions are needed but Cython_ cannot be used, the `PEP 7
  Style Guide for C Code <https://www.python.org/dev/peps/pep-0007/>`_ is
  recommended.


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


Acknowledgements
================

The present document's coding guidelines are derived from project `Astropy's codding guidelines <http://docs.astropy.org/en/stable/development/codeguide.html>`_.
