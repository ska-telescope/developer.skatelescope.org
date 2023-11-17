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

   .. ATTIC-BEGIN
   
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

   .. ATTIC-END

   ``JIRA_AUTH``, "JIRA Authentication token for uploading XRAY Test Results"
   ``SKA_K8S_TOOLS_BUILD_DEPLOY``, "Latest OCI image for build and test jobs- artefact.skao.int/ska-cicd-k8s-tools-build-deploy:x.x.x"
   ``SKA_K8S_TOOLS_BUILD_DEPLOY_ALPINE``, "Latest OCI image for build and test jobs (Alpine based) - artefact.skao.int/ska-cicd-k8s-tools-build-deploy-alpine:x.x.x"
   ``SKA_PYTHON_PYTANGO_BUILDER_IMAGE``, "Latest OCI image for Python lint and test jobs - artefact.skao.int/ska-tango-images-pytango-builder:x.x.x"
   ``JIRA_URL``, "SKA Jira URL"
   ``JIRA_USERNAME``, "Jira Automation Account Username"
   ``JIRA_PASSWORD``, "Jira Automation Account Password"
   ``SLACK_RELEASE_CHANNEL``, "Slack channel id used for release notification message"

   
