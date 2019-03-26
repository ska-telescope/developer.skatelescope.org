.. _Semver: https://semver.org

==================================
Software Package Release Procedure
==================================

Versioning Procedure
--------------------

As part of our goal to align all developmental efforts to one standard, we
have documented a procedure of how we would like all the *SKA* developers to
version their releases and what process to follow in ensuring that they are 
able to make use of the existing Gitlab CI/CD pipeline to automate the building
of python packages, for now, and have them published on the *SKA* pypi registry
which is hosted on *Nexus*.


Versioning scheme to use
========================

The scheme chosen to be adopted by the *SKA* developer community is the semantic versioning
scheme.
More information regarding this scheme can be found on the Semver_ site.

How to mark a release
=====================

A developer should make use of the git annotated tags to indicate that this
current commit is to serve as a release. For example:

.. code:: bash

  $ git tag -a "1.0.0" -m "Release 1.0.0. This is a patch release that resolves
    issue <JIRA issue>."

After that is complete, then the tag needs to be published to the origin:

.. code:: bash

  $ git push origin <tag_name>


Packaging Procedure
-------------------


Minimum requirements to meet
============================

For proper Python packaging, the following metadata must be present 
in the repository:

* Package name
* Package version
* Github repo url
* Description of the package
* Classifiers

All of this should be specified in the *setup.py* module that lives
in the root directory.

Additional metadata files should be included in the root directory, that
is the:

* README.{md|rst} - A description of the package including installation steps
* CHANGELOG.{md|rst} - A log of release versions and the changes in each version
* LICENSE - A text file with the relevant license

Building packages
=================

The following command will be executed in order to build a wheel
for a Python package:

.. code:: bash
  
  $ python setup.py sdist bdist_wheel

This will form part of the CI pipeline job for the repository so that it can be build
automatically. The developer should add this build step in their *.gitlab-ci.yml* file,
for example:

.. code:: yaml

  build_wheel:
    stage: build
    tags:
      - docker-executor
    script:
      - pip install setuptools
      - python setup.py sdist bdist_wheel # --universal option to used for pure python packages


Publishing packages to *Nexus*
------------------------------

Provided that the release branch has been tagged precisely as described in the above sections
then the CI job will be triggered by the availability of the tag to publish the *Python* wheel
to the *SKA* pypi registry on *Nexus*.

.. code:: yaml

  publish to nexus:
    stage: publish
    tags:
      - docker-executor
    variables:
      TWINE_USERNAME: $TWINE_USERNAME
      TWINE_PASSWORD: $TWINE_PASSWORD
    script:
      - pip install twine
      - twine upload --repository-url $PYPI_REPOSITORY_URL dist/*
    only:
      variables:
         - $CI_COMMIT_MESSAGE =~ /^.+$/ # Confirm tag message exists
         - $CI_COMMIT_TAG =~ /^((([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$/ # Confirm semantic versioning of tag


Installing a package from *Nexus*
---------------------------------

For developers who want to install a python package from the *SKA*
pypi registry hosted on *Nexus*, they should edit the project's Pipfile to have
the following section(s), for example:

.. code:: ini

  [[source]]
  url = 'https://nexus.engageska-portugal.pt/repository/pypi/simple'
  verify_ssl = true
  name = 'nexus'

  [packages]
  'skaskeleton' = {version='*', index='nexus'}
