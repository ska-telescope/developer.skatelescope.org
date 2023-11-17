Integrating CICD Makefile Submodule
===================================

This guide provides step-by-step instructions on how to set up and use the `Makefile repository <https://gitlab.com/ska-telescope/sdi/ska-cicd-makefile>`_ as a submodule to leverage built-in functionality to handle building, linting and publishing artefacts, following the SKAO guidelines.

Adding the Makefile Submodule to a Project
-------------------------------------------

To add `ska-cicd-makefile` as a submodule in your repository, follow these steps:

1. Clone your repository. 

2. Open a shell in the root folder of your repository.

3. Run the following command to add the repo as a submodule:

   .. code-block:: bash

      git submodule add https://gitlab.com/ska-telescope/sdi/ska-cicd-makefile.git .make

4. After the submodule has been included in your repo, add, commit, and push it:

   .. code-block:: bash

      git add .gitmodules .make
      git commit -s
      git push

Cloning a project with the Makefile submodule
---------------------------------------------

To clone a repository with the `ska-cicd-makefile` as a submodule (or any submodule), follow these steps:

1. Clone your repository.

2. Open a shell in the root folder of your repository.

3. Run the following command to pull the submodules:

   .. code-block:: bash

      git submodule update --recursive --init

Using the OCI Makefile targets
------------------------------

After adding the **ska-cicd-makefile** repository as a submodule, you should now have a `.make` folder in your project's root directory. This repository is composed of several **sections** with Makefile inclusions. Each of these inclusions wraps functionality for a particular artefact lifecycle or technology (i.e., oci, python). Add **include** statements at the **top** of your **Makefile** as follows:

.. code-block:: make

   ...

   # Include base Makefiles
   -include .make/base.mk
   # Include makefile targets for OCI images management
   -include .make/oci.mk

   ...

To get the list of available targets and variables for each section, you can run:

.. code-block:: console

   make help <section>

To make jobs more dynamic and adaptable to different repositories, you can override variables in your **Makefile**. Using the **oci** Makefile as an example:

.. code-block:: make

   OCI_BUILDER=podman

   # Include makefile targets for OCI images management
   -include .make/oci.mk

   ...

.. note:: If you are overriding Makefile variables defined in the included Makefiles with conditional variable assignment operator (**?=**), define them **BEFORE** the includes.

In the example above Podman will be used as the OCI engine to build the image instead of Docker (the default value). To list all variables used in the OCI make targets, run the command **make long-help <section>**.

Customizing Makefile targets
----------------------------

In the Makefiles of the several sections, the targets follow a customizable workflow: `<section>-pre-<job>`, `<section>-do-<job>`, and `<section>-post-<job>`. The **pre** and **post** targets act as hooks so that you can customize the overall behavior of the target. These targets must be defined **AFTER** the include statements.

* **<section>-do-<job>**: This make target performs the core job (e.g., running the lint procedure for an OCI image). It is well-defined in the templates and should **never** be overridden in the root Makefile.

* **<section>-pre-<job>**: This target is used to perform actions before the main job. It is **empty** and meant to be overridden according to the repository's needs. Again, using **oci** as an example, we can lock a specific package before building:

  .. code-block:: make

     ...

     # Include makefile targets for OCI images management
     -include .make/oci.mk

     oci-pre-build:
         @if [[ ! -z "$(PYTANGO_VERSION)" ]]; then \
            echo "Locking pytango version: $(PYTANGO_VERSION)"; \
            poetry add --lock pytango==$(PYTANGO_VERSION); \
         fi

     ...

* **<section>-post-<job>**: Similar to the pre hook, this target is also empty and can be used for actions after the job is finished, with the same override principles applying.
