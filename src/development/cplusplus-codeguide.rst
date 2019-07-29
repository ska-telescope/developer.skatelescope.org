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

These stages are automatically run by the GitLab runners when you push to the repository. The pipeline halts and you are informed if any of the steps fail. There are some subtleties in the way the test results and test coverage are reported and we deal with them below as we go through the steps in more detail.

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
There is a template configuration file that demonstrates how to pull in the
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

We consider that there are two principles of dependency management we would dictate:

1) Dependency installation should be unambigigous and repeatable. This requires dependencies to be listed, together with a minimum, or required version number. 

2) Dependencies should be project specific, there should be no reason for developers to pollute their environment just to build your package.

We do not advocate a solution here - there is not a dominant package management system for C++. Indeed you could just pull and build all your deopendencies via external projects as the our GoogleTest example. Another option would simply be to list the dependencies in a text file *dependencies.txt* and allow the developer to use their preferred pacakge management system to install them.

Coding Style & Conventions
--------------------------

We are not advocating that software be restructured and rewritten before
on-boarding - However we recommend that new software follow `The cplusplus Core
Guidelines <http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines>`_.

The clang/llvm compiler tools have an extension which can provide some direct
criticism of your code for stylistic errors (and even automatically fix them). For example in our lint step we
suggest you run:: 

    run-clang-tidy -checks='cppcoreguidelines-*,performance-*,readibility-*,modernize-*,misc-*,clang-analyzer-*,google-*'

.. note:: The GoogleTest  macros generate a lot of warnings ... Google have their own code guidelines ...

In the linting stage we also run cppcheck as a separate step. 

.. warning:: The linting stage as presented here is spotting an error in the GTest macros. So we have explicitly removed the test directory from the cppcheck path. 


Unit testing
------------

Setting Up The Tests 
^^^^^^^^^^^^^^^^^^^^
Within the template we give examples of how to write a Unit Test in `The Google Test framework <https://github.com/google/googletest/>`_.

You will also see from the  CI script that we publish the test results in the following manner:

.. code-block:: bash

    stage: test
    dependencies:
        - build_debug
    script:
        - cd build
        - ctest -T test --no-compress-output
    after_script:
        - cd build
        - ctest2junit > ctest.xml
    artifacts:
        paths:
        - build/
    reports:
      junit: build/ctest.xml


How GitLab Can Use The Results
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The above directives publish the results to the GitLab JUnit test plugin, but
the system is very minimal. Primarily it is used in examining merge requests.
When you push to the GitLab repo your branch is built. On completion the test
reqults are compared if tests fail you are warned, if they pass you are
notified. For example. I have created a test branch for the repo that contains
a new derived instance of an hello world. I have included a test and I checked
locally that all the existing code built - after the merge request is started
GitLab gives the following report:

.. image:: merge-request.png

You can see that there is not much detail - but the tests results are parsed and any differences are noted.

Pages (or Publishing Artifacts)
-------------------------------

We use this step to run the test coverage tool gcov, and to publish the results:

.. code-block:: bash

  stage: pages
  dependencies:
    - test
  script:
    - mkdir .public
    - cd .public
    - gcovr -r ../ -e '.*/external/.*' -e '.*/CompilerIdCXX/.*' -e '.*/tests/.*' --html --html-details -o index.html
    - cd ..
    - mv .public public
  artifacts:
    paths:
      - public

Note that the atifacts step this allows the results to be accessed via the pipelines pages. Every build stores its artifacts from the test step and the pages step. 

.. note:: As far as we know there is no plugin for the coverage artifacts generated by gcov


.. image:: coverage.png

But you can access the artifact from the pipeline.


Summary
=======

This basic template available at demonstrates the following:

1) Provides a base image on which to run C++ builds
2) Describes example basic dependency management is possible at least based on CMake but way of CMake External projects and git submodules
3) Presents a convention for defininig third party/external to project libs such that they are independent of the dependency management layer that will be supported by the systems team.  
4) Proposes a C++ 14 language standard and related static code checking tools
5) Outlines header naming conventions that follow namespace definitions
6) Proposal of GoogleTest for a common C++ unit testing library

