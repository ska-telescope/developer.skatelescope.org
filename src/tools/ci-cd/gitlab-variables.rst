.. _gitlab-variables:

***********************
GitLab Global Variables
***********************

This section describes the global variables that are presently being used as part of the
GitLab CI/CD infrastructure.

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

+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
|             Key                |                            Description                                         |             Notes             |
+================================+================================================================================+===============================+
| ``CAR_OCI_REGISTRY_HOST``      | Is the FQDN of the Central Artefact Repository - artefact.skatelescope.org     |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
| ``CAR_OCI_REGISTRY_USERNAME``  | OCI Image Publishing user name                                                 |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
| ``CAR_OCI_REGISTRY_PASSWORD``  | OCI Publishing user password                                                   |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
| ``CAR_PYPI_REPOSITORY_URL``    | https://artefact.skatelescope.org/repository/pypi-internal/                    |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
| ``CAR_PYPI_USERNAME``          | PyPi Publishing user name                                                      |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
| ``CAR_PYPI_PASSWORD``          | PyPi user password                                                             |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
| ``CAR_HELM_REPOSITORY_URL``    | Is the FQDN of the Central Artefact Repository - artefact.skatelescope.org     |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
| ``CAR_HELM_USERNAME``          | Helm Chart Publishing user name                                                |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
| ``CAR_HELM_PASSWORD``          | Helm Chart Publishing user password                                            |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
| ``CAR_ANSIBLE_REPOSITORY_URL`` | https://artefact.skatelescope.org/repository/ansible-internal                  |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
| ``CAR_ANSIBLE_USERNAME``       | Ansible role/collection Publishing user name                                   |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
| ``CAR_ANSIBLE_PASSWORD``       | Ansible role/collection Publishing user password                               |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
| ``CAR_RAW_REPOSITORY_URL``     | https://artefact.skatelescope.org/repository/raw-internal                      |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
| ``CAR_RAW_USERNAME``           | Raw Repository Publishing user name                                            |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+
| ``CAR_RAW_PASSWORD``           | Raw Repository Publishing user password                                        |                               |
+--------------------------------+--------------------------------------------------------------------------------+-------------------------------+


Historical Variable Use (Deprecated)
====================================

The following variables have been used historically to drive behaviour in the pipelines, but must be set at the individual repository level:

+--------------------------------+-------------------------------------------------+--------------------------------------------------------------+
|             Key                |                  Description                    |                          Notes                               |
+================================+=================================================+==============================================================+
| ``DOCKER_REGISTRY_FOLDER``     | specify the base path prefixed                  | Used to produce the image path: with                         |
|                                | for an image eg: ``ska-docker``                 | ``DOCKER_REGISTRY_HOST/DOCKER_REGISTRY_FOLDER/<image-name>`` |
+--------------------------------+-------------------------------------------------+--------------------------------------------------------------+
| ``DOCKER_REGISTRY_HOST``       | FQDN of the Nexus Docker registry               | Replaced by ``CAR_OCI_REGISTRY_HOST``                        |
+--------------------------------+-------------------------------------------------+--------------------------------------------------------------+
| ``DOCKER_REGISTRY_PASSWORD``   | Password for uploading to the Nexus registry    | Replaced by ``CAR_OCI_REGISTRY_USERNAME``                    |
+--------------------------------+-------------------------------------------------+--------------------------------------------------------------+
| ``DOCKER_REGISTRY_USERNAME``   | Username for uploading to the Nexus registry    | Replaced by ``CAR_OCI_REGISTRY_PASSWORD``                    |
+--------------------------------+-------------------------------------------------+--------------------------------------------------------------+
| ``HELM_HOST``                  | FQDN of the Helm Chart repository               | Replaced by ``CAR_HELM_REPOSITORY_URL``                      |
+--------------------------------+-------------------------------------------------+--------------------------------------------------------------+
| ``HELM_USERNAME``              | Username for uploading to the Helm Chart repo   | Replaced by ``CAR_HELM_USERNAME``                            |
+--------------------------------+-------------------------------------------------+--------------------------------------------------------------+
| ``HELM_PASSWORD``              | Password for uploading to the Helm Chart repo   | Replaced by ``CAR_HELM_PASSWORD``                            |
+--------------------------------+-------------------------------------------------+--------------------------------------------------------------+
| ``PYPI_REPOSITORY_URL``        | FQDN of the PyPi Nexus repository               | Replaced by ``CAR_PYPI_REPOSITORY_URL``                      |
+--------------------------------+-------------------------------------------------+--------------------------------------------------------------+
| ``TWINE_USERNAME``             | Username for uploading to the PyPi Nexus repo   | Replaced by ``CAR_PYPI_USERNAME``                            |
+--------------------------------+-------------------------------------------------+--------------------------------------------------------------+
| ``TWINE_PASSWORD``             | Password for uploading to the PyPi Nexus repo   | Replaced by ``CAR_PYPI_PASSWORD``                            |
+--------------------------------+-------------------------------------------------+--------------------------------------------------------------+
| ``RAW_HOST``                   | FQDN for the Raw file hosting                   | Replaced by ``CAR_RAW_REPOSITORY_URL``                       |
+--------------------------------+-------------------------------------------------+--------------------------------------------------------------+
| ``RAW_USER``                   | Username for uploading to the Raw repo on Nexus | Replaced by ``CAR_RAW_USERNAME``                             |
+--------------------------------+-------------------------------------------------+--------------------------------------------------------------+
| ``RAW_PASS``                   | Password for uploading to the Raw repo on Nexus | Replaced by ``CAR_RAW_PASSWORD``                             |
+--------------------------------+-------------------------------------------------+--------------------------------------------------------------+
