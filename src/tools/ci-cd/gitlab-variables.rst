.. _gitlab-variables:

***********************
GitLab Global Variables
***********************

This section describes the global variables that are presently being used as part of the
GitLab CI/CD infrastructure.

You can directly use these variables in `$VARIABLE` format in your CI/CD pipelines.
Passwords are masked and not visible on the pipeline outputs. 
Please refrain from writing them in plain-text format.

Variables Interface
===================

The variables are set under the
`CI/CD Settings <https://gitlab.com/groups/ska-telescope/-/settings/ci_cd>`_ on GitLab.


.. _figure-1-gitlab-variables:

.. figure:: ../images/gitlab-variables.png
   :scale: 55%
   :alt: GitLab Variables
   :align: center
   :figclass: figborder

   The variables interface on GitLab


Variables Description
=====================

.. csv-table:: GitLab ska-telescope Group Variables
   :header: "Key", "Description"
   :widths: auto

   ``CAR_OCI_REGISTRY_HOST``, "Is the FQDN of the Central Artefact Repository - artefact.skao.int"
   ``CAR_OCI_REGISTRY_USERNAME``, "OCI Image Publishing user name"
   ``CAR_OCI_REGISTRY_PASSWORD``, "OCI Publishing user password"
   ``CAR_PYPI_REPOSITORY_URL``, "Python Package Artefact Repository URL - https://artefact.skao.int/repository/pypi-internal/"
   ``CAR_PYPI_USERNAME``, "PyPi Publishing user name"
   ``CAR_PYPI_PASSWORD``, "PyPi user password"
   ``CAR_HELM_REPOSITORY_URL``, "Helm Artefact Repository URL - https://artefact.skao.int/repository/helm-internal"
   ``CAR_HELM_USERNAME``, "Helm Chart Publishing user name"
   ``CAR_HELM_PASSWORD``, "Helm Chart Publishing user password"
   ``CAR_ANSIBLE_REPOSITORY_URL``, "Ansible Collections Repository URL - https://artefact.skao.int/repository/ansible-internal"
   ``CAR_ANSIBLE_USERNAME``, "Ansible role/collection Publishing user name"
   ``CAR_ANSIBLE_PASSWORD``, "Ansible role/collection Publishing user password"
   ``CAR_RAW_REPOSITORY_URL``, "Raw Artefact Repository URL - https://artefact.skao.int/repository/raw-internal"
   ``CAR_RAW_USERNAME``, "Raw Repository Publishing user name"
   ``CAR_RAW_PASSWORD``, "Raw Repository Publishing user password"
   ``CAR_CONAN_REPOSITORY_URL``, "Conan Artefact Repository URL - https://artefact.skao.int/repository/conan-internal"
   ``CAR_CONAN_USERNAME``, "Conan Repository Publishing user name"
   ``CAR_CONAN_PASSWORD``, "Conan Repository Publishing user password"
   ``JIRA_AUTH``, "JIRA Authentication token for uploading XRAY Test Results"
   ``SKA_K8S_TOOLS_DEPLOY_IMAGE``, "Latest OCI image for deployment jobs - artefact.skao.int/ska-cicd-k8s-tools-deploy:x.x.x"
   ``SKA_K8S_TOOLS_DOCKER_BUILDER_IMAGE``, "Latest OCI image for OCI build jobs - artefact.skao.int/ska-cicd-k8s-tools-docker-builder:x.x.x"
   ``SKA_K8S_TOOLS_BUILD_DEPLOY_ALPINE``, "Latest OCI image for OCI build jobs (Alpine image) - artefact.skao.int/ska-cicd-k8s-tools-build-deploy-alpine:x.x.x"
   ``SKA_PYTHON_PYTANGO_BUILDER_IMAGE``, "Latest OCI image for Python lint and test jobs - artefact.skao.int/ska-tango-images-pytango-builder:x.x.x"
   ``JIRA_URL``, "SKA Jira URL"
   ``JIRA_USERNAME``, "Jira Automation Account Username"
   ``JIRA_PASSWORD``, "Jira Automation Account Password"
   ``MARVIN_SLACK_TOKEN``, "Slack token used by Marvin for Slack usage"
   ``SLACK_RELEASE_CHANNEL``, "Slack channel used for releases"

   
Historical Variable Use (Deprecated)
====================================

The following variables are pointing to SKAEngage Nexus Artefact Repository.
They have been used historically to drive behaviour in the pipelines, but if you want to use them, they must be set at the individual repository level:


.. csv-table:: GitLab ska-telescope Group Variables (Deprecated)
   :header: "Key", "Description", "Notes"
   :widths: auto

   ``DOCKER_REGISTRY_FOLDER``, "specify the base path prefixed for an image eg: ``ska-docker`` ", "Used to produce the image path: with ``DOCKER_REGISTRY_HOST/DOCKER_REGISTRY_FOLDER/<image-name>``"
   ``DOCKER_REGISTRY_HOST``, "FQDN of the Nexus Docker registry ", "Replaced by ``CAR_OCI_REGISTRY_HOST``"
   ``DOCKER_REGISTRY_PASSWORD``, "Password for uploading to the Nexus registry", "Replaced by ``CAR_OCI_REGISTRY_USERNAME``"
   ``DOCKER_REGISTRY_USERNAME``, "Username for uploading to the Nexus registry", "Replaced by ``CAR_OCI_REGISTRY_PASSWORD``"
   ``HELM_HOST``, "FQDN of the Helm Chart repository", "Replaced by ``CAR_HELM_REPOSITORY_URL``"
   ``HELM_USERNAME``, "Username for uploading to the Helm Chart repo", "Replaced by ``CAR_HELM_USERNAME``"
   ``HELM_PASSWORD``, "Password for uploading to the Helm Chart repo", "Replaced by ``CAR_HELM_PASSWORD``"
   ``PYPI_REPOSITORY_URL``, "FQDN of the PyPi Nexus repository", "Replaced by ``CAR_PYPI_REPOSITORY_URL``"
   ``TWINE_REPOSITORY_URL``, "FQDN of the PyPi Nexus repository", "Replaced by ``CAR_PYPI_REPOSITORY_URL``"
   ``TWINE_USERNAME``,  "Username for uploading to the PyPi Nexus repo", "Replaced by ``CAR_PYPI_USERNAME``"
   ``TWINE_PASSWORD``, "Password for uploading to the PyPi Nexus repo", "Replaced by ``CAR_PYPI_PASSWORD``"
   ``RAW_HOST``, "FQDN for the Raw file hosting", "Replaced by ``CAR_RAW_REPOSITORY_URL``"
   ``RAW_USER``, "Username for uploading to the Raw repo on Nexus", "Replaced by ``CAR_RAW_USERNAME``"
   ``RAW_PASS``, "Password for uploading to the Raw repo on Nexus", "Replaced by ``CAR_RAW_PASSWORD``"
