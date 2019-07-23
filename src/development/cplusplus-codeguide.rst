.. doctest-skip-all
.. _code-guide:

.. todo::
    - Pretty much everythin
    - Testing Framework (GoogleTest)
    - Actual code guides
    - Example C++ project on gitlab

************************
C++ Coding Guidelines
************************

This section describes requirements and guidelines for development and testing. A

.. contents:: Table of Contents

New Project Recommendations and Conventions
===========================================

C++ Template project
--------------------


We have created a `skeleton C++ project
<https://gitlab.com/steve-ord/cpp_template>`_. Which should provide a full introduction to the various
recommendations and requirements for the development of C++. The philosophy behind the development of this
template was to demonstrate one way to meet the project guidelines. There are probably as many ways to organise C++ projects
as there are developers there are sure to be some contraversial design descisions made. 

This projects demonstrates a recommended
project layout. It also demonstrates how to implement the following recommended C++ project development features. 

* Continous integration (CI) setup using Gitlab 
* Cmake as a build tool.
* GoogleTest framework and example unit testing.
* C++ linting using clang for stylistic errors.
* Also test running under valgrind for memory errors.
* gcov to measure test coverage 

All building and testing is done within a docker container.

Project Layout
==============

Top Level
---------

We have a top level of the project containing:

CMakeLists.txt
^^^^^^^^^^^^^^
        We have built this template using CMake. The structure of this file
        will be discussed in `Building the Project`_.   

LICENSE
^^^^^^^
        All projects *must* have a license. We have include the recommended BSD
        3 clause license template *please fill it in*.

README.md
^^^^^^^^^
        Should at the very least provide a brief discription, installation
        instructions, pre-requisites

src
^^^
        This is the top of `the source tree`. It does not have to be called src.
        But we recommend that the source tree has its head here. The first
        namespace being the level below this one.

version.txt
^^^^^^^^^^^
        In this template the version file is parsed by the CMakeLists file during the 
        build process. This specific functionality is not required, but clear versioning is.
        We recommend - but do not mandate `Semantic Versioning <https://semver.org>`_.


The Source Tree
---------------

Our recomended source tree structure follows:

.. literalinclude:: source_tree.txt
        
A number of design decisions have been made here:

1) The structure follows the namespaces. We have defined a *top* and a *nested*
namespace and the directory structure follows this structure. This allows code
to be grouped together easily by namespace. Also the installation assumes this
structure also. Therefore headers are included using their full namespaces.
This avoids pollution of the install tree.

.. warning:: we have not decided yet whether all projects should have a top-level SKA namespace


2) Header files are included with source. We have done this to make it easier
to navigate the source tree.

3) The example class structure follows the design *Pimpl* design paradigm but
there are many others. This has an abstract base class *hello* and a derived
class *wave* which is a type of hello, but we are also including an
implementation of a *wave*. We have done this as this scheme allows multiple
implementations of a wave to be created without forcing a recompilation of
every source file that inludes *wave.h*.

4) Tests are co-located at the  namespace level of the classes that they test. Another scheme would be
to have a separate branch from the top level that maintains the same directory structure. We prefer this scheme for 
the same reasons as we prefer to colocate the headers and the source. Plus
anything that promotes the writing of unit tests at the same time as the
classes are developed is a good thing


Continuous Integration
======================

GitLab manages builds via a YAML file held inside your repository. Similar to a Jenkinsfile in philosophy. This is the file in the skeleton HelloWorld project. 

.. literalinclude:: example-ci.yml 

We have four stages of the CI 

* build
* lint
* test
* pages


Building the project
--------------------

.. todo:: Need to add some CMake Coding Conventions

We recommend using CMake as a build tool. It is widely used, includes the
ability to generate buildfiles for different development environments. 
This allows developers the freedom to use whatever IDE they
would like (e.g. Eclipse and Xcode) from the same CMake files.

We have also included a couple of examples of how to do things that occasional
or new users of CMake may not know. 

Including the version number
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
There is a template configuration file that demonstates how to pull in the
version number into the code base. We do this in a few  steps. First the Semantic
Version number is held in plain text in version.txt. This is done so that it is
easy to "bump" the version number on code changes. The second stage is the the
CMakeLists.txt file reads this file and creates an internal version number
using its contents. Finally the configuration file is used to generate a header
file containing the version number that can be included by the code.

Including External Projects
^^^^^^^^^^^^^^^^^^^^^^^^^^^

We have including the GoogleTest framework as an external project, instead of a dependency to demonstrate one way to use external projects. 

.. warning:: We have used a git submodule to do this. There may be a formal recomendation that git subtrees be used instead.

In this case we need to  
Style Conventions (The lint step)
---------------------------------

Unit testing
------------

Deployment
----------




Coding Style/Conventions
========================
A good place to start:

* `The cplusplus Core Guidelines <http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines>`_.

Testing Frameworks
==================

* `The Google Test framework <https://github.com/google/googletest/>`_.
* `Travis CI <https://travis-ci.org>`_.


Acknowledgements
================

