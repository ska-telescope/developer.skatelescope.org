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

Working with a Helm chart repository is well-documented on `The Official Helm Chart Repository Guide <https://v2.helm.sh/docs/developing_charts/#the-chart-repository-guide>`_.

Adding (our) repository
'''''''''''''''''''''''

.. note::
 Our Helm chart repository URL is https://nexus.engageska-portugal.pt/repository/helm-chart

In order to add the Helm chart repo to your local list of repositories, run

.. code:: bash

 $ `helm repo add [REPONAME] https://nexus.engageska-portugal.pt/repository/helm-chart`

where [REPONAME] is a name you choose to identify the repo on your local machine.

Search available charts in a repo
'''''''''''''''''''''''''''''''''

To browse through the repo to find the available charts, you can then say (if, for example, you decided to name the repo `ska-repo`), to see output similar to this:

.. code:: bash

 $ helm search ska-repo
 NAME                  	CHART VERSION	APP VERSION	DESCRIPTION
 ska-repo/sdp-prototype	0.2.1        	1.0        	helm chart to deploy the SDP Prototype on Kuber...
 ska-repo/test-app     	0.1.0        	1.0        	A Helm chart for Kubernetes
 ska-repo/webjive      	0.1.0        	1.0        	A Helm chart for deploying the WebJive on Kuber...

To install the test-app, you call **helm install the-app-i-want-to-test ska-repo/test-app** to install it in the default namespace. Test this with **kubectl get pods -n default**.

Update the repo
'''''''''''''''
Almost like a **git fetch** command, you can update your local repositories' indexes by running

.. code:: bash

 $ helm repo update

Note: this will update *ALL* your local repositories' index files.

Package and publish Helm Charts to the SKA Helm Chart Repository
================================================================

Package a chart
'''''''''''''''
Packaging a chart is relatively trivial. Let's say you create a chart called ``my-new-chart``, with the following directory structure:

.. code:: bash

 $ tree
   my-new-chart/
   ├── Chart.yaml
   ├── charts
   ├── templates
   │   ├── NOTES.txt
   │   ├── _helpers.tpl
   │   ├── deployment.yaml
   │   ├── ingress.yaml
   │   ├── service.yaml
   │   └── tests
   │       └── test-connection.yaml
   └── values.yaml

You can now package it with the simple command ``helm package my-new-chart`` and it will create the package file:

.. code:: bash

 $ helm package my-new-chart
 $ tree
   my-new-chart-0.1.0.tgz
   my-new-chart/
   ├── Chart.yaml
	...
   └── values.yaml

Now, in order to publish the chart, you can simply run a curl command with an ``--upload-file`` flag:

.. code:: bash

 $ curl -v -u $USERNAME:$PASSWORD --upload-file new-helm-package-v-0.1.0.tgz --url https://nexus.engageska-portugal.pt//repository/helm-chart/

.. note::
 You will of course need credentials (``$USERNAME`` and ``$PASSWORD``) to run the above ``curl`` command with, and this user should have privileges for reading and writing on the Repository. We have a Gitlab Runner already set up with a user that has the required privileges - see :ref:`how to do this <helm-with-gitlab>` below.

If you now run ``helm repo update`` you (or your colleagues) should see your new application also listed under the repo:

.. code:: bash

 $ helm search ska-repo
  NAME                  	CHART VERSION	APP VERSION	DESCRIPTION
  ska-repo/sdp-prototype		0.2.1        	1.0        	helm chart to deploy the SDP Prototype on  Kuber...
  ska-repo/test-app     		0.1.0        	1.0        	A Helm chart for Kubernetes
  ska-repo/webjive      		0.1.0        	1.0        	A Helm chart for deploying the WebJive on Kuber...
  ska-integr8/my-new-chart		0.1.0        	1.0        	A Helm chart for Kubernetes

.. _helm-with-gitlab:

Bulk package and publish using Gitlab CI
''''''''''''''''''''''''''''''''''''''''

Read the `Helm documentation <https://v2.helm.sh/docs/developing_charts/#the-chart-repository-guide>`_ in order to learn how to publish your application to a Helm repository. If you want to publish your chart, you can copy the CI pipeline job below, and push your work to a branch called **helm-publish** (note the **only:** tag). Keep in mind, if you have multiple charts in your repository, you will be uploading all of them as part of the pipeline - this may take some time, so don't overdo this.

.. code:: yaml

	publish-chart:
	  stage: .post # recommended that you have a LOT of good tests in place that passes before you upload your chart.
	  when: always # options: manual / always. If you say manual, this job will run after you've clicked somewhere on Gitlab.
	  only: # This is the name of the branch from where you will be able to update the repo with your chart(s)
		- helm-publish
	  tags:   # Make sure to enable the helm-repoman Gitlab Runner to run this chart. On your project, go to
		- helm-repoman
	  script:
		- curl -s https://gitlab.com/ska-telescope/stupid/raw/master/scripts/helm-repo-update.sh | sh

.. note::
 Note that the link provided here is for Helm v2, which was the version of helm that we used at the time of writing this. Helm v3 was not yet working with our integration environment.

