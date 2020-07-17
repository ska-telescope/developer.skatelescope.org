Base Development Environment
----------------------------

Principles
==========

The dependencies for every of the ska-telescope repositories will be defined
on what packages from different origins need to be added to a *base system*.

These packages are allowed to be installed through the following methods:

  - The OS' package management tools, namely ``apt``
  - From the python package index `PyPI` using ``pipenv``


Definition of *base system*
============================

The *base system* is defined as the base needed to start the development on
every *SKA telescope* project.

The base system is defined by the following:

  - python:3.5-slim docker image comprised of:

     - debian stable slim image
     - minimal python installation on top of debian stable slim image
  - git tooling
  - make
  - pipenv

Requests for adding packages to the *base system*
=================================================

For the present, the System Team can be contacted in order to update the
definition of *base system* and add new base dependencies to it.

Defining dependencies to install
================================

Each project is responsible to script the steps needed to build them and
install their needed dependencies in the form of simple shell commands as
expressed in the file ``get-deps.sh``.

Listing dependencies
====================

The dependencies list extracted from running the too shall reside in
``dependencies/PROJECT_NAME`` and consist of the following:

  - ``lib_deps.txt``: the libraries installed in the OS and their associated
    packages
  - ``lib_deps_diff.txt``: the libraries installed in the OS and their
    associated packages that are not part of the *base project*
  - ``system_deps.txt``: the packages installed in the OS
  - ``system_deps_diff.txt``: the packages installed in the OS that are not
    part of the *base project*
  - ``system_deps.csv``: the packages installed in the OS in simplified CSV
    format
  - ``system_deps_diff.txt``: the packages installed in the OS in simplified
    CSV format that are not part of the *base project*
  - ``pipfile_deps.csv``: the packages expressly specified to install by
    ``pipenv`` (package sub dependencies are not part of this file) in
    simplified CSV format
  - ``pipenv_graph.txt``: the packages installed by `pipenv` including all sub
    dependencies
  - ``pipenv_graph.csv``: the top level packages expressly installed by
    ``pipenv`` (package sub dependencies are not part of this file) in
    simplified CSV format
