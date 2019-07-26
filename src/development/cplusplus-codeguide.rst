.. doctest-skip-all
.. _code-guide:

.. todo::
    - Pretty much everythin
    - Actual code guides

************************
C++ Coding Guidelines
************************
This section describes requirements and guidelines for development and testing of a new C++ project on GitLab. The COntinuous Integration tools are GitLab specific - but most of the processes could be easily moved to a Jenkins Pipeline if required. 

.. contents:: Table of Contents

An Example C++ Project
======================

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
--------------
Top Level
^^^^^^^^^
We have a top level of the project containing:

CMakeLists.txt
""""""""""""""
        We have built this template using CMake. The structure of this file
        will be discussed in `Building the Project`_.   

LICENSE
"""""""
        All projects *must* have a license. We have include the recommended BSD
        3 clause license template *please fill it in*.

README.md
"""""""""
        Should at the very least provide a brief discription, installation
        instructions, pre-requisites

src
"""
        This is the top of `the source tree`. It does not have to be called src.
        But we recommend that the source tree has its head here. The first
        namespace being the level below this one.

version.txt
"""""""""""
        In this template the version file is parsed by the CMakeLists file during the 
        build process. This specific functionality is not required, but clear versioning is.
        We recommend - but do not mandate `Semantic Versioning <https://semver.org>`_.


The Source Tree
^^^^^^^^^^^^^^^
Our recomended source tree structure follows:

.. literalinclude:: source_tree.txt
        
A number of design decisions have been made here:

What To Do With Namespaces
""""""""""""""""""""""""""
The structure follows the namespaces. We have defined a *top* and a *nested*
namespace and the directory structure follows this structure. This allows code
to be grouped together easily by namespace. Also the installation assumes this
structure also. Therefore headers are included using their full namespaces.
This avoids pollution of the install tree.

.. warning:: we have not decided yet whether all projects should have a top-level SKA namespace

Headers
"""""""
Header files are included with source. We have done this to make it easier
to navigate the source tree.

Design Paradigms
""""""""""""""""
The example class structure follows the design *Pimpl* design paradigm but
there are many others. This has an abstract base class *hello* and a derived
class *wave* which is a type of hello, but we are also including an
implementation of a *wave*. We have done this as this scheme allows multiple
implementations of a wave to be created without forcing a recompilation of
every source file that inludes *wave.h*.

Unit Test Locations
"""""""""""""""""""
Tests are co-located at the  namespace level of the classes that they test.
Another scheme would be to have a separate branch from the top level that
maintains the same directory structure. We prefer this scheme for the same
reasons as we prefer to colocate the headers and the source. Plus anything that
promotes the writing of unit tests at the same time as the classes are
developed is a good thing

.. todo:: What about functional tests

Continuous Integration
----------------------
GitLab manages builds via a YAML file held inside your repository. Similar to a
Jenkinsfile in philosophy. This is the file in the skeleton HelloWorld project. 

.. literalinclude:: example-ci.yml 

We have four stages of the CI 

* build
* lint
* test
* pages


Building The Project
^^^^^^^^^^^^^^^^^^^^
.. todo:: Need to add some CMake Coding Conventions

The Image
"""""""""
We recommend building using the cpp_base image that we have developed and
stored in the image repository. This, or an image derived from it contains all
the tools required to operate this CI pipeline and you should avoid the pain of
installing and configuring dependencies.


CMake Coding Conventions
""""""""""""""""""""""""
We recommend using CMake as a build tool. It is widely used, includes the
ability to generate buildfiles for different development environments. 
This allows developers the freedom to use whatever IDE they
would like (e.g. Eclipse and Xcode) from the same CMake files.

Unfortunately there is even less consensus in the community as to the most
effective way to write CMake files, thought there are a lot of opinions. We
have found a good distillation of some effective ideas can be found `here
<https://gist.github.com/mbinna/c61dbb39bca0e4fb7d1f73b0d66a4fd1>`_. And GitLab
has an introduction to `Modern CMake
<https://cliutils.gitlab.io/modern-cmake/>`_.

In general however we recommend Modern CMake (minimum version of 3.0). A lot of legacy
projects will have used 2.8 - but we cannot recommend that new projects use
this. It is no longer maintained and does not contain many features of modern
(v3+ CMake). As far as we are aware CMake v3.0 is backward compatible
with 2.8, so if you are onboarding code that uses 2.8 we strongly suggest you upgrade. 

.. todo:: Maybe add some more advice? use targets not global settings etc ...

Including the version number
""""""""""""""""""""""""""""
There is a template configuration file that demonstates how to pull in the
version number into the code base. We do this in a few  steps. First the Semantic
Version number is held in plain text in version.txt. This is done so that it is
easy to "bump" the version number on code changes. The second stage is the the
CMakeLists.txt file reads this file and creates an internal version number
using its contents. Finally the configuration file is used to generate a header
file containing the version number that can be included by the code.

Including External Projects
"""""""""""""""""""""""""""
We have including the GoogleTest framework as an external project, instead of a
dependency to demonstrate one way to use external projects. 

.. warning:: We have used a git submodule to do this. There may be a formal recomendation that git subtrees be used instead.

Runtime Dependencies
""""""""""""""""""""

.. todo:: Add a simple description of dependency and version listing


Coding Style & Conventions
------------------------

We are not advocating that software be restructured and rewritten before
on-boarding - However we recommend that new software follow `The cplusplus Core
Guidelines <http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines>`_.


Unit testing
------------
* `The Google Test framework <https://github.com/google/googletest/>`_.
* `Travis CI <https://travis-ci.org>`_.

Deployment
----------




Acknowledgements
================

