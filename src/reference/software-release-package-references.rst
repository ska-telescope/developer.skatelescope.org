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
* Helm - https://artefact.skao.int/repository/helm-proxy/ (from https://charts.helm.sh/stable)
* PyPi - https://artefact.skao.int/repository/pypi-all/ (from pypi.python.org and include pypi-internal)
* Conda - https://artefact.skao.int/repository/conda-proxy/ (from https://repo.continuum.io/pkgs/)
* Conan - https://artefact.skao.int/repository/conan-proxy/ (from https://conan.bintray.com)
* NPM - https://artefact.skao.int/repository/npm-all/ (from https://registry.npmjs.org and include npm-internal which is not active yet)
* Maven - https://artefact.skao.int/repository/maven-public/ (from maven-release, maven-snapshots, https://repo1.maven.org/maven2/)
* Apt - https://artefact.skao.int/repository/ubuntu-archive/, https://artefact.skao.int/repository/ubuntu18.04-proxy/, and https://artefact.skao.int/repository/ubuntu20.04-proxy/
* Yum - CentOS7 https://artefact.skao.int/repository/yum_centos_7-internal/ (from http://download.fedoraproject.org/pub/epel/7/x86_64 and yum_centos_7-internal), CentOS8 https://artefact.skao.int/repository/yum_centos_8-internal/ (from http://download.fedoraproject.org/pub/epel/8/Everything/x86_64 and yum_centos_8-internal)
* Go Lang - https://artefact.skao.int/repository/go-proxy/ (from https://golang.org/pkg/)


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

More information can be found in `Predefined variables reference <https://docs.gitlab.com/ee/ci/variables/predefined_variables.html>`_.
The procedure for including these metadata is documented in **Deploying Artefacts**. 
.. Deploying Artefacts to be linked to Ugur's How-to page on this

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