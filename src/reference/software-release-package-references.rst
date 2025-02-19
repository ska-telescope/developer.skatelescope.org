***********************************
Software Package Release References
***********************************

Supported Artefact Types
========================

The SKAO aims to maintain `Nexus repositories <https://artefact.skao.int/#browse/browse>`_ with native interface support for the core languages and frameworks used for software development within the project. This includes:

* Docker (OCI Images)
* Helm (Charts)
* PyPi (Wheels/Source Distributions)
* Conan (C/C++)
* NPM (Node)
* Maven (Java)
* GitLFS (Large File Support)
* Apt (Debian)
* Yum (Fedora)

Additionally, there are also upstream proxy/caching facilities available for:

* Docker (OCI Images - only available inside AWS VPC)
* Helm - `helm-proxy repository <https://artefact.skao.int/repository/helm-proxy/>`_ (from https://charts.helm.sh/stable)
* PyPi - `pypi-all repository <https://artefact.skao.int/repository/pypi-all/>`_ (from pypi.python.org and include pypi-internal)
* Conan - `conan-proxy repository <https://artefact.skao.int/repository/conan-proxy/>`_ (from https://conan.bintray.com)
* NPM - `npm-all repository <https://artefact.skao.int/repository/npm-all/>`_ (from https://registry.npmjs.org and include npm-internal which is not active yet)
* Maven - `maven-public repository <https://artefact.skao.int/repository/maven-public/>`_ (from maven-release, maven-snapshots, https://repo1.maven.org/maven2/)
* Apt - `ubuntu-archive repository <https://artefact.skao.int/repository/ubuntu-archive/>`_, `ubuntu18.04-proxy repository <https://artefact.skao.int/repository/ubuntu18.04-proxy/>`_, `ubuntu20.04-proxy repository <https://artefact.skao.int/repository/ubuntu20.04-proxy/>`_ and `ubuntu22.04-proxy repository <https://artefact.skao.int/repository/ubuntu22.04-proxy/>`_ (from http://archive.ubuntu.com/ubuntu/)
* Yum - `yum_centos_7-internal repository <https://artefact.skao.int/repository/yum_centos_7-internal/>`_ (from http://download.fedoraproject.org/pub/epel/7/x86_64) and `yum_centos_8-internal repository <https://artefact.skao.int/repository/yum_centos_8-internal/>`_ (from http://download.fedoraproject.org/pub/epel/8/Everything/x86_64)
* Go Lang - `go-proxy repository <https://artefact.skao.int/repository/go-proxy/>`_ (from https://golang.org/pkg/)


Finally, there are repositories that utilise the Nexus Raw format to provide library space for the following:

* Ansible
* Raw objects (binary, text etc.)
* RPM packages

Metadata
========

To be declared as valid, an artefact must be decorated with a set of metadata which certify its origin. Since all the artefacts are published from gitlab pipelines, all the relevant information must be attached. Please ensure that the below information is included in the metadata:

 * CI_COMMIT_AUTHOR
 * CI_COMMIT_REF_NAME
 * CI_COMMIT_REF_SLUG
 * CI_COMMIT_SHA
 * CI_COMMIT_SHORT_SHA
 * CI_COMMIT_TIMESTAMP
 * CI_JOB_ID
 * CI_JOB_URL
 * CI_PIPELINE_ID
 * CI_PIPELINE_IID
 * CI_PIPELINE_URL
 * CI_PROJECT_ID
 * CI_PROJECT_PATH_SLUG
 * CI_PROJECT_URL
 * CI_RUNNER_ID
 * CI_RUNNER_REVISION
 * CI_RUNNER_TAGS
 * GITLAB_USER_NAME
 * GITLAB_USER_EMAIL
 * GITLAB_USER_LOGIN
 * GITLAB_USER_ID

.. code-block:: yaml
    :caption: Example from OCI image inspection snippet

        "Labels": {
                        "CI_COMMIT_AUTHOR": "Ugur Yilmaz <ugur.yilmaz@skao.int>",
                        "CI_COMMIT_REF_NAME": "0.9.0",
                        "CI_COMMIT_REF_SLUG": "0-9-0",
                        "CI_COMMIT_SHA": "9262f0d42fffff549d85a0f93f102bc7ae8f4f6f",
                        "CI_COMMIT_SHORT_SHA": "9262f0d4",
                        "CI_COMMIT_TIMESTAMP": "2023-07-26T12:30:15+00:00",
                        "CI_JOB_ID": "4744388752",
                        "CI_JOB_URL": "https://gitlab.com/ska-telescope/ska-cicd-k8s-tools/-/jobs/4744388752",
                        "CI_PIPELINE_ID": "946033414",
                        "CI_PIPELINE_IID": "531",
                        "CI_PIPELINE_URL": "https://gitlab.com/ska-telescope/ska-cicd-k8s-tools/-/pipelines/946033414",
                        "CI_PROJECT_ID": "24071551",
                        "CI_PROJECT_PATH_SLUG": "ska-telescope-ska-cicd-k8s-tools",
                        "CI_PROJECT_URL": "https://gitlab.com/ska-telescope/ska-cicd-k8s-tools",
                        "CI_RUNNER_ID": "25177620",
                        "CI_RUNNER_REVISION": "85586bd1",
                        "CI_RUNNER_TAGS": "[\"k8srunner\"]",
                        "GITLAB_USER_EMAIL": "ugur.yilmaz@skao.int",
                        "GITLAB_USER_ID": "3049864",
                        "GITLAB_USER_LOGIN": "limonkufu",
                        "GITLAB_USER_NAME": "Ugur Yilmaz",
                        "author": "Matteo Di Carlo <matteo.dicarlo@inaf.it>",
                        "description": "This image includes tools for the deployment of a chart and the execution of pytest",
                        "int.skao.application": "SKA Deploy",
                        "license": "BSD-3-Clause",
                        "org.opencontainers.image.ref.name": "ubuntu",
                        "org.opencontainers.image.version": "22.04",
                        "org.skatelescope.team": "Systems Team",
                        "org.skatelescope.version": "1.0.0",
                        "registry": "/ska-cicd-build-deploy"
                    }

More information can be found in `Predefined variables reference <https://docs.gitlab.com/ee/ci/variables/predefined_variables.html>`_.

Global Gitlab Variables for the Central Artefact Repository (CAR)
=================================================================

This section describes the global variables, CAR related, that are presently being used as part of the GitLab CI/CD infrastructure.

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