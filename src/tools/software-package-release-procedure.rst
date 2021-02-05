.. _Semver: https://semver.org
.. _Helm Chart Repository: https://nexus.engageska-portugal.pt/#browse/browse:helm-chart
.. _SKAMPI: https://gitlab.com/ska-telescope/skampi

==================================
Software Package Release Procedure
==================================

Whilst source code related to software artefacts are hosted on `GitLab <https://gitlab.com/ska-telescope>`_ , the delivered runtime artefacts for the SKAO are maintained and curated in the `*Central Artefact Repository* <https://artefact.skatelescope.org>`_.  It is here that they will navigate through the process of verification and testing with the aim of finally being promoted to a state ready for production release.


Central Artefact Repository
###########################

 The Central Artefact Repository provides the storage and library management facilities for artefacts throughout the Software Development Life Cycle.  Being central to the SDLC means that it is highly desirable that the Repository is stable, long lived, and can evolve with the SKAO requirements through the different stages of DevSecOps maturity, and the life time of the project.

An Artefact Repository is essentially a content management system for software artefacts delivered in their published form.  The Artefact Repository makes it possible to publish and retrieve the artefacts using the native tools, processes and protocols commonly associated with the related programming language and/or language based framework.  The Artefacts are versioned, and decorated with extensible metadata that is used to help manage the life cycle of the Artefacts.  The Central Artefact Repository provides APIs and reporting interfaces to provide integration into extended DevSecOps processes such as CI/CD, BoM and dependency management, license management, provenance, vulnerability scanning and release management.   It also provides controlled access to Artefacts through IAM, and offers notary features for provenance through TLS/SSL and signatures.

The purpose of the Central Artefact Repository within the context of the SKAO, is to provide a controlled single source of truth for all artefacts that enter the software delivery and verification processes through to the curation and maintenance of approved software artefacts available for production deployment and historical reference for the life time of the Observatory.  This means that the Central Artefact Repository not only holds the canonical reference versions of all artefacts within the SKAO landscape, but it also holds the stateful context of these artefacts as they progress through their continuous life-cycle from development to production deployment, to decommissioning.  

Deployment
##########

The Central Artefact Repository plays a key role in regulating the flow of artefacts throughout the Software Development Life Cycle.  It is highly integrated into all the phases of software development, build, test, and publish.  In this position, it can ensure that only approved software artefacts are included in composite products, and subsequently delivered to the production environments.

Whilst it is important for the Repository to be highly available and performant in the context of the SDLC, it is not responsible for directly servicing the delivery of artefacts into the operational environments.  This will be manged by high speed delivery services and caches.

The repository is based on *Nexus* Repository Manager 3 deployed on an independent UK based hosting service.  The core deployment is nexus-oss-edition with the nexus-core-feature, nexus-cma-feature, nexus-oss-feature features enabled. 

 LDAP authentication has been integrated for SKAO administration purposes, with an additional minimal set of accounts managed for publishing artefacts.  All repositories are enable read-only for anonymous access.  Additionally, email has been integrated for handling task notifications.

Configured Repositories
-----------------------

The SKAO aims to maintain repositories with native interface support for the core languages and frameworks used for software development within the project.  This includes:

* Docker (OCI Images)
* Helm (Charts)
* PyPi (Wheels/Source Distributions)
* Conan (C/C++)
* NPM (Node)
* Maven (Java)
* GitLFS (Large File Support)
* Apt (Debian)
* Yum (Fedora)


Additionally, there are also upsteam proxy/caching facilities available for:

* Docker (OCI Images - only available inside AWS VPC)
* Helm - https://artefact.skatelescope.org/repository/helm-proxy/ (from https://charts.helm.sh/stable)
* PyPi - https://artefact.skatelescope.org/repository/pypi-all/ (from pypi.python.org and include pypi-internal)
* Conda - https://artefact.skatelescope.org/repository/conda-proxy/ (from https://repo.continuum.io/pkgs/)
* Conan - https://artefact.skatelescope.org/repository/conan-proxy/ (from https://conan.bintray.com)
* NPM - https://artefact.skatelescope.org/repository/npm-all/ (from https://registry.npmjs.org and include npm-internal which is not active yet)
* Maven - https://artefact.skatelescope.org/repository/maven-public/ (from maven-release, maven-snapshots, https://repo1.maven.org/maven2/)
* Apt - https://artefact.skatelescope.org/repository/ubuntu-archive/, https://artefact.skatelescope.org/repository/ubuntu18.04-proxy/, and https://artefact.skatelescope.org/repository/ubuntu20.04-proxy/
* Yum - CentOS7 https://artefact.skatelescope.org/repository/yum_centos_7-internal/ (from http://download.fedoraproject.org/pub/epel/7/x86_64 and yum_centos_7-internal), CentOS8 https://artefact.skatelescope.org/repository/yum_centos_8-internal/ (from http://download.fedoraproject.org/pub/epel/8/Everything/x86_64 and yum_centos_8-internal)
* Go Lang - https://artefact.skatelescope.org/repository/go-proxy/ (from https://golang.org/pkg/)


Finally, there are repositories that utilise the Nexus Raw format to provide library space for the following:

* Ansible
* Raw objects (binary, text etc.)


Versioning
----------

As part of the goal to align all developmental efforts to one standard, we
have documented a procedure of how we would like all the *SKAO* developers to
version their releases and what process to follow in ensuring that they are
able to make use of the existing Gitlab CI/CD pipeline to automate the building
of artefacts. This standard is defined in detail for each artefact type in `ADR-25 - Software naming conventions <https://confluence.skatelescope.org/display/SWSI/ADR-25+General+software+naming+convention>`_.  These convetions are fundamentally derived from the `Sematic Versioning standard 2.0.0 <https://semver.org/>`_.  In a nutshell, this follows a dotted numeric notation for `Major`.`Minor`.`Patch` eg: `1.2.3`, but please check the above guidance for the details, and language specifics.

Artefact Naming
---------------

In additon to the semantic versioning scheme, when publishing artefacts to the repositories, the naming  conventions for the artefact must be adhered to (also detailed in `ADR-25 - Software naming conventions <https://confluence.skatelescope.org/display/SWSI/ADR-25+General+software+naming+convention>`_).  The general rules are:

* Prefix the artefact with the namespace'd name of the GitLab repository that holds the source code
* Name the artefact after it's core function
* Observe the Semantic Versioning standard for this kind of artefact
* Do not use generic versions such as 'latest' tags for container images
* Published artefacts are immutable - do not re-release an artefact version
* Filters and cleanup policies are implemented to purge artefacts that do not adhere to standards, and where possible validation hooks will deny publishing of incorrectly named/versioned artefacts.  For instance images with the tag 'latest' will be trapped by a cleanup policy.


Deploying Artefacts
-------------------

While the Central Artefact Repository is available for anonymous browsing and pulling of artefacts, all artefacts must be published via the SKAO GitLab CI/CD infrastructure.  The GitLab Runner environment provides the credentials.  These are specified in the :ref:`full list of environment variables <gitlab-variables>`, with examples given below.


OCI Image
---------

The OCI Image repository is locate at https://artefact.skatelescope.org/#browse/browse:docker-internal . 

Example: publish an OCI Image for the tango-cpp base image from ska-tango-images

.. code:: bash

  # checkout https://gitlab.com/ska-telescope/ska-tango-images
  # Build and tag the image for a fictitious version 9.3.4 repo-prefix=ska-tango-images core-function=tango-cpp
  docker build -t ${CAR_OCI_REGISTRY_HOST}/ska-tango-images/tango-cpp:9.3.4 .
  # login to the registry
  echo ${CAR_OCI_REGISTRY_PASSWORD} | docker login --username ${CAR_OCI_REGISTRY_USERNAME} --password-stdin ${CAR_OCI_REGISTRY_HOST}
  # Push the image
  docker push ${CAR_OCI_REGISTRY_HOST}/ska-tango-images/tango-cpp:9.3.4
  This image has been published at https://artefact.skatelescope.org/#browse/browse:docker-internal:v2%2Fska-tango-images%2Ftango-cpp%2Ftags%2F9.3.4



.. _helm-chart-repo:

Helm Chart
----------

Package and publish Helm Charts to the SKAO Helm Chart Repository
=================================================================

The process of packaging and publishing Helm charts to the SKAO repository is very simple. A few lines are needed in the ``.gitlab-ci.yml`` file, and the project needs to have a ``charts`` directory under the root of the project, that contains all your project's charts. If the ``charts`` folder is not under the project root, a line can be added in the CI job to first change to the directory containing this ``charts`` directory, however this is discouraged. For further information on best practices with regards to specifically the folder structure of charts, refer to `The Chart Best Practices Guide <https://helm.sh/docs/chart_best_practices/>`_, and also to our own set of :ref:`helm-best-practices`.

As an example, let's take the following project structure:

.. code:: bash

  .
  ├── my-project
  │   ├── charts
  │   |   └── my-first-chart
  │   |   └── my-second-chart
  │   ├── .gitlab-ci.yml
  │   └── README.md

Refer to the Helm repository guide to understand how to package a chart, but to package and publish the two charts in the above example, simply add the following code to your ``.gitlab-ci.yml`` file and also ensure that your pipeline has a `publish` stage:

.. code:: yaml

  # uncomment and specify specific charts to publish
  # variables:
  #   CHARTS_TO_PUBLISH: my-first-chart my-second-chart

  # Ensure your .gitlab-ci.yml has "publish" stage defined!
  include:
    - project: 'ska-telescope/templates-repository'
      file: 'gitlab-ci/includes/helm_publish.yml'


In case you only want to publish a sub-set of the charts in your project, you can uncomment the variable declaration lines (above) in the job specifying the ``CHARTS_TO_PUBLISH`` variable. Note that the list in the above example is redundant, since the default behaviour is to publish all the charts found in the ``charts/`` folder, and in this case there are only those two charts.


The CI job that is included using the above lines of code takes care of packaging the chart in a temporary directory and pushes it to the SKAO repository. The job runs manually, which means that you need to trigger it on the Gitlab web UI in the CI/CD pipeline view. Note, triggering the job, you can specify the ``CHARTS_TO_PUBLISH`` variable before the job executes again, however, re-running this job in turn will not use the manual variable specification again and will result in an attempt to publish all the charts under the ``charts/`` folder.

If no new versions of charts are found (i.e. if the version of the chart that you are trying to publish is already listed in the SKAO Helm repository), none will be uploaded. All the changes will be listed at the end of the CI Pipeline job.

.. note::
  A chart has a ``version`` number and an ``appVersion``. Updating only the appVersion number will *not* result in an update to the chart repository - if you want a new version of the application to be uploaded, you *must* update the chart version as well. Read more on the Helm documentation.


Working with a Helm Repository
==============================

Working with a Helm chart repository is well-documented on `The Official Helm Chart Repository Guide <https://helm.sh/docs/topics/chart_repository/>`_.

Adding the SKAO repository
''''''''''''''''''''''''''

The Helm Chart index is here `https://artefact.skatelescope.org/#browse/search/helm <https://artefact.skatelescope.org/#browse/search/helm>`_ .  This consists of the hosted repository *helm-internal* and the upstream proxy of `https://charts.helm.sh/stable <https://charts.helm.sh/stable>`_. 

In order to add the Helm chart repo to your local list of repositories, run

.. code:: bash

 $ helm repo add skao https://nexus.engageska-portugal.pt/repository/helm-chart

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

PyPi and Python Packaging
-------------------------

Creating a Version
==================

A developer should make use of the git annotated tags to indicate that this
current commit is to serve as a release. For example:

.. code:: bash

  $ git tag -a "1.0.0" -m "Release 1.0.0. This is a patch release that resolves
    issue <JIRA issue>."

After that is complete, then the tag needs to be published to the origin:

.. code:: bash

  $ git push origin <tag_name>

.. caution:: The format of the tag must observe semantic versioning eg: N.N.N

Minimum Metadata requirements
=============================

For proper Python packaging, the following metadata must be present
in the repository:

* Package name
* Package version
* Gitlab repo url
* Description of the package
* Classifiers

All of this should be specified in the *setup.py* module that lives
in the project root directory, or the *project.toml* file if *poetry* is used for the build.

Additional metadata files that should be included in the root directory, are:

* README.{md|rst} - A description of the package including installation steps
* CHANGELOG.{md|rst} - A log of release versions and the changes in each version
* LICENSE - A text file with the relevant license

Building Python Packages
========================

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
      - python setup.py egg_info -b+$CI_COMMIT_SHORT_SHA sdist bdist_wheel # --universal option to be used for pure python packages

This will build a *Python* wheel that can then be published to the Central Artefact Repository. For developmental purposes one can replace the ``-b+$CI_COMMIT_SHORT_SHA``
command line option with ``-b+dev.$CI_COMMIT_SHORT_SHA`` to have the wheel built on each commit.

Publishing packages to *Nexus*
==============================

Provided that the release branch has been tagged precisely as described in the above sections
then the CI job will be triggered by the availability of the tag to publish the *Python* wheel
to the *SKAO* pypi registry on *Nexus*.

.. code:: yaml

  # with setup.py
  publish-python:
    stage: publish
    tags:
      - k8srunner
    variables:
      TWINE_USERNAME: $CAR_PYPI_USERNAME
      TWINE_PASSWORD: $CAR_PYPI_PASSWORD
    script:
      - pip3 install twine
      - twine upload --repository-url $CAR_PYPI_REPOSITORY_URL dist/*
    only:
      variables:
         - $CI_COMMIT_MESSAGE =~ /^.+$/ # Confirm tag message exists
         - $CI_COMMIT_TAG =~ /^((([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$/ # Confirm semantic versioning of tag

  # with poetry and project.toml
  publish-python:
    stage: publish
    tags:
      - k8srunner
    variables:
      POETRY_HTTP_BASIC_PYPI_USERNAME: $CAR_PYPI_USERNAME
      POETRY_HTTP_BASIC_PYPI_PASSWORD: $CAR_PYPI_PASSWORD
    before_script:
      - pip install poetry
      - poetry config virtualenvs.create false
      - poetry install --no-root
      - poetry config repositories.skao $CAR_PYPI_REPOSITORY_URL
    script:
      - poetry build
      - poetry publish -r skao
    when: on_success
    only:
      refs:
        - tags
      variables:
        # Confirm tag message exists
        - $CI_COMMIT_MESSAGE =~ /^.+$/
        # Confirm semantic versioning of tag
        - $CI_COMMIT_TAG =~ /^((([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$/


Installing a package from *Nexus*
=================================

The Python Package Index is located at https://artefact.skatelescope.org/#browse/search/pypi .  A combined PyPi index of pypi-internal and pypi.python.org is available from https://artefact.skatelescope.org/repository/pypi-all/ .

Packages for upload must follow the SKAO naming convention starting with ska- (ADR-25) and incorporating the semantic version number.  The following example shows the Python ska_logging class.

For developers who want to install a python package from the *SKAO*
pypi registry hosted on *Nexus*, they should edit the project's Pipfile to have
the following section(s), for example:

.. code:: ini

  [[source]]
  url = 'https://artefact.skatelescope.org/#browse/search/pypi'
  verify_ssl = true
  name = 'skao'

  [packages]
  'skaskeleton' = {version='*', index='skao'}


Ansible Roles and Collections
-----------------------------

Ansible roles and collections are held in a Raw format repository *helm-internal* .  These are uploaded as individual files following the ADR-25 conventions of `<repository>/<role/collection name>` .

The following example is for common systems role collections:

.. code:: bash

  curl -u ${CAR_ANSIBLE_USERNAME}:${CAR_ANSIBLE_PASSWORD} \
    --upload-file ska_cicd_docker_base--0.4.0.tar.gz \
    ${CAR_ANSIBLE_REPOSITORY_URL}/ska-cicd-roles/ska_cicd_docker_base--0.4.0.tar.gz


Raw
---

Raw artefacts are typically `tar.gz` files, images, reports, data files, and specific repositories that do not have direct functional support in Nexus (same as for Ansible roles and collections).  These are hosted here `raw-internal <https://artefact.skatelescope.org/#browse/search/raw>`_ .  Note that the artefact directory structure must be prefixed by the related repository, but can be flexible but meaningful after that.

The following example shows the publishing of an external dependency library for the Tango base image builds:

.. code:: bash

  curl -u ${CAR_RAW_USERNAME}:${CAR_RAW_PASSWORD} \
    --upload-file tango-9.3.4.tar.gz \
    ${CAR_RAW_REPOSITORY_URL}/ska-tango-images/libraries/tango-9.3.4.tar.gz
