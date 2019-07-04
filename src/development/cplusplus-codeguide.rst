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
recommendations and requirements for the development of C++ 

This projects demonstrates a recommended
project layout. It also demonstrates how to implement the following recommended C++ project development features. 

* Continous integration (CI) setup using Gitlab 
* Cmake as a build tool.
* GoogleTest framework and example unit testing.
* C++ linting using clang for stylistic errors.
* Also test running under valgrind for memory errors.
* gcov to measure test coverage 

All building and testing is done within a debian-stretch docker container.

Continuous Integration
======================

GitLab manages builds via a YAML file held inside your repository. Similar to a Jenkinsfile in philosophy. This is the file in the skeleton HelloWorld project.

.. literalinclude:: example-ci.yml 

We have four stages of the CI 

* build
* lint
* test
* deploy

Building the project
--------------------

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

