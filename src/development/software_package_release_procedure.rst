.. _Semver: https://semver.org
.. _Helm Chart Repository: https://nexus.engageska-portugal.pt/#browse/browse:helm-chart
.. _SKAMPI: https://gitlab.com/ska-telescope/skampi

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

Python Packaging Procedure
--------------------------

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

.. caution:: The format of the tag should be N.N.N

Minimum requirements to meet
============================

For proper Python packaging, the following metadata must be present 
in the repository:

* Package name
* Package version
* Gitlab repo url
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

  build_wheel for publication: # Executed on a tag:
    stage: build
    tags:
      - docker-executor
    script:
      - pip install setuptools
      - python setup.py egg_info -b+$CI_COMMIT_SHORT_SHA sdist bdist_wheel # --universal option to used for pure python packages

This will build a *Python* wheel that will be published to *Nexus*. For developmental purposes one can replace the ``-b+$CI_COMMIT_SHORT_SHA``
command line option with ``-b+dev.$CI_COMMIT_SHORT_SHA`` to have the wheel built on each commit.

Publishing packages to *Nexus*
==============================

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
      # check metadata requirements
      - scripts/validate-metadata.sh
      - pip3 install twine
      - twine upload --repository-url $PYPI_REPOSITORY_URL dist/*
    only:
      variables:
         - $CI_COMMIT_MESSAGE =~ /^.+$/ # Confirm tag message exists
         - $CI_COMMIT_TAG =~ /^((([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$/ # Confirm semantic versioning of tag


Installing a package from *Nexus*
=================================

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

.. _helm_chart_repo:

Helm Chart Packaging, Publishing and Sharing
--------------------------------------------

Working with a Helm Repository
==============================

Working with a Helm chart repository is well-documented on `The Official Helm Chart Repository Guide <https://helm.sh/docs/topics/chart_repository/>`_.

Adding (our) repository
'''''''''''''''''''''''

.. note::
 Our Helm chart repository URL is https://nexus.engageska-portugal.pt/repository/helm-chart

In order to add the Helm chart repo to your local list of repositories, run

.. code:: bash

 $ helm repo add [REPONAME] https://nexus.engageska-portugal.pt/repository/helm-chart

where [REPONAME] is a name you choose to identify the repo on your local machine. In order to standardise, we would recommend you use ``skatelescope``.

Search available charts in a repo
'''''''''''''''''''''''''''''''''

To browse through the repo to find the available charts, you can then say (if, for example, you decided to name the repo ``skatelescope``), to see output similar to this:

.. code:: bash

  $ helm search skatelescope
  NAME                      	CHART VERSION	APP VERSION	DESCRIPTION
  skatelescope/sdp-prototype	0.2.1        	1.0        	helm chart to deploy the SDP Prototype on Kubernetes
  skatelescope/test-app     	0.1.0        	1.0        	A Helm chart for Kubernetes
  skatelescope/webjive      	0.1.0        	1.0        	A Helm chart for deploying the WebJive on Kubernetes

To install the test-app, you call **helm install the-app-i-want-to-test skatelescope/test-app** to install it in the default namespace. Test this with **kubectl get pods -n default**.

Update the repo
'''''''''''''''
Almost like a **git fetch** command, you can update your local repositories' indexes by running

.. code:: bash

 $ helm repo update

Note: this will update *ALL* your local repositories' index files.

Package and publish Helm Charts to the SKA Helm Chart Repository
================================================================

The process of packaging and publishing Helm charts to the SKA repository is very simple. A few lines are needed in the ``.gitlab-ci.yml`` file, and the project needs to have a ``charts`` directory under the root of the project, that contains all your project's charts. If the ``charts`` folder is not under the project root, a line can be added in the CI job to first change to the directory containing this ``charts`` directory, however this is discouraged. For further information on best practices with regards to specifically the folder structure of charts, refer to `The Chart Best Practices Guide <https://helm.sh/docs/chart_best_practices/>`_, and also to our own set of :ref:`helm-best-practices`.

As an example, let's take the following project structure:

.. code:: bash

  .
  ├── my-project
  │   ├── charts
  │   |   └── my-first-chart
  │   |   └── my-second-chart
  │   ├── .gitlab-ci.yml
  │   └── README.md

Refer to the Helm repository guide to understand how to package a chart, but to package and publish the two charts in the above example, simply add the following code to your ``.gitlab-ci.yml`` file:

.. code:: yaml

  publish-chart:
    # variables:
    #   CHARTS_TO_PUBLISH: my-first-chart my-second-chart
    stage: helm-publish
    when: always
    # only:
    #   - helm-publish
    tags:
      - docker-executor
    script:
      - apt-get -y update
      - apt-get install -y curl ca-certificates --no-install-recommends
      - curl -s https://gitlab.com/ska-telescope/stupid/raw/master/scripts/publish-charts.sh | bash

The line to change directory can be the first line of the ``script`` section. If you uncomment the ``only`` section and name the branch where this should occur, the publishing job will *only* run when a commit is pushed to that named branch - in the commented out example the branch name is ``helm-publish`` but this is up to the developer / team. Of course, adding some tagging and testing as seperate jobs is also a good idea.

In case you only want to publish a sub-set of the charts in your project, you can uncomment and use the top two lines in the job specifying the CHARTS_TO_PUBLISH variable. Note that the above example is redundant, since the default behaviour is to publish all the charts found in the ``charts/`` folder.

The shell script packages the chart in a temporary directory and pushes it to the SKA repository. Note the output of the CI job - one of the last output lines mentions the changes that were brought about by this publish step and is meant to verify whether or not an update has been added to the chart repository correctly. If chart packages were uploaded but there is no *diff* output, it may mean you forgot to update the chart version - see below note.

.. note::
  A chart has a ``version`` number and an ``appVersion``. Updating only the appVersion number will *not* result in an update to the chart repository - if you want a new version of the application to be uploaded, you *must* update the chart version as well. If something changed in the chart, but you did not update the version, the index may point at the wrong file so be careful.
