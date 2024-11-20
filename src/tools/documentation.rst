.. _document-project:

*********************
Documenting a project
*********************

Documenting a project is the key to make it usable, understandable
and maintainable, making the difference between a technically excellent
software and a successful software.
SKA has defined a set of standards and practices that shall be
implemented when developing software documentation.
A more comprehensive set of resources can be found online at:

  * `A beginner guide to writing documentation <https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/>`_

What to document
################

Based on the documentation provided everyone should be able to:

  * understand the problem the project is trying to solve
  * understand how the project is implemented
  * know exactly what this projects depends on
  * download and build the project
  * execute the project tests
  * run the project

In order to achieve this goal any structure can be used allowing free
text as well as code-extracted documentation.

Where to document
#################

There are several places where it's possible to write SKA documentation: on the developer portal, as part of the `Solution Intent <https://confluence.skatelescope.org/display/SWSI/Solution+Intent+Home/>`_, as part of the code repository using sphinx (as described below), in your Team space in Confluence (if you're a Confluence user), or using Google Docs in SKA's Google Drive.

Individual code repository documentation is good for describing the current architecture of the code within that repo, and any public APIs it may have. It's also good for user documentation, deployment information and similar documentation that's related to the code. It's not a good place to document information that contains secrets.

The Solution Intent Confluence space is good for planned architecture, developing and modifying the architecture. As the design is developed, some of the Confluence material will migrate into the relevant repositories, or may cause an update to the formal architecture documents via the :doc:`/policies/decision-making`. The Solution Intent describes what we'd like to develop; repositories document the code "as-is", i.e. what is currently implemented in the code. Because Confluence moves ahead of the code, it's not a good home for documenting the current implementation, especially at the repository level. It is a good space for developing specifications, and sketching out system tests,  which eventually may be formulated as `BDD tests </tools/bdd-test-context>`. The Solution Intent Confluence space is also not always a good home for user documentation, because again it's hard to know if that's in sync with the code.  It's clear what should *not* go in this space: anything that directly describes developed code. The Solution Intent Confluence space is reviewed regularly by the architecture group. If you are not sure where to place documents in the Solution Intent space, the "work" sub-pages for a product are a good place to start. See, for example, the `Simulation Work <https://confluence.skatelescope.org/display/SWSI/Simulations+Work/>`_ pages. If you can't find a suitable area, ask on the `Architecture Community of Practice Slack channel <https://skao.slack.com/archives/CP6NSB9MH/>`_.

Google Docs is good for drafting formal documents collaboratively, especially documents that will be managed using the SKA Configuration Management system, such as ICDs. If user manuals are to be managed via eB rather than in a repository, then Google Docs is a good tool to use for this. If it is preferred, Overleaf can also be used to manage formal documents collaboratively.

The Developer Portal is best used for SKA software policies and procedures. It is ideally suited for any development-related information that needs to be public, and is applicable to a wide audience. It should not contain information that's specific to one repo (apart from its own contribution guidelines!) It is not suitable for storing information that needs to be kept private (such as private GitLab variables, passwords, etc.) It isn't great for information that changes rapidly; we suggest either using other documentation tools until the pace of change is lower, or automating the updates.

Team spaces are good for time-limited material, drafting material for discussion ahead of adding it to a repository, information that needs to be kepts slighly private (i.e. material that can be circulated within SKA, but not to people outside the project). Architecture work is generally better suited to the Solution Intent, where the work can be reviewed and discussed before implementation. For anything that needs reference beyond Program Ingrement (PI) boundaries, some other space may be better, preferably either the Solution Intent or a repository, so that it's easy to find, and to reduce documentation fragmentation. It's also less accessible than the developer portal; not all collaborators may have an SKA Community Confluence account.  Team spaces are really a private "scratch" space, for communication within the team.


.. _API:

Documenting the Public API
##########################

When it comes to software systems, such as services or libraries, it
is of paramount importance that the public API exposed by the software
component is clearly captured and documented.

How to document
***************

Documentation on git
====================

Each software repository shall contain its documentation as part of the
code included in a git repository. In this way the documentation will
be released with the same cadence as the code and it will always be possible
to trace a particular version of the documentation to a particular version
of the code documented.

Free text documentation must be placed in a ``docs`` folder in the upper level of the
repository structure. Sphinx generates automatically extracted files under this folder as well, wherever there are docstrings in the code.

Using sphinx
------------

Documentation must be realised using the `sphinx <http://www.sphinx-doc.org>`_
package and `Restructured Text <http://docutils.sourceforge.net/rst.html>`_ .
SKA provides a predefined sphinx template for this purpose in the
`SKA Python skeleton <https://gitlab.com/ska-telescope/templates/ska-python-skeleton>`_ project.
Every project shall use the same ``docs`` folder as a starting point for assembling their
own documentation.

Sphinx can be used to generate text documents such as this portal, but it also provides
capabilities to automatically extract and parse code documentation, or docstrings. Refer to the :doc:`Python Coding Guidelines </tools/codeguides/python-codeguide>` for more information.

Extracting documentation from code
----------------------------------

.. The internet is full of information on how to write docstrings. A generic example of how to document the hello world module is provided in the `SKA Python skeleton <https://gitlab.com/ska-telescope/ska-skeleton>`_ project, and you can look at the `output of the sphinx build </projects/ska-python-skeleton/en/latest/?badge=latest>`_.

.. todo::
    * add hello world class with parameters to the SKA Python Skeleton Project
    * add code snippet here as an example of additional documentation which is decoupled from code, and describe the pitfalls of separating documentation from the code.

.. _dev-portal-integration:

Integration into the Developer Portal
-------------------------------------

The developer portal is hosted on `ReadTheDocs <https://readthedocs.org>`_. On the :ref:`list` page a list of all the projects that are hosted on GitLab is available, with badges to show the build status of the project's documentation. Each badge is also a hyperlink to the project's documentation that you can click on.

Every SKA project's documentation is hosted on Readthedocs as a :ref:`subproject <sub-project>` of the developer portal, so that all projects have a common URL for easier search-ability. For example: whereas the developer portal's URL is https://developer.skao.int, the ska_python_skeleton project is at https://developer.skao.int/projects/ska-python-skeleton.

In order to add the project's documentation as a subproject on ReadTheDocs, a project must first be imported into Readthedocs.

Setting up your Project
-----------------------
SKA provides a predefined template for setting up ReadTheDocs in the `SKA Python skeleton <https://gitlab.com/ska-telescope/templates/ska-python-skeleton>`_ project. This repository contains all the necessary files for setting up your ReadTheDocs integration.

The first step is to copy the ``docs`` folder and all its contents into your project. This folder includes the ``conf.py`` file, which is essential for generating documentation, as it configures Sphinx. Additionally, you will need the ``.readthedocs.yml`` file, located in the project’s root folder; this file is also essential, as it specifies the path to ``conf.py`` and provides configuration for how ReadTheDocs builds the documentation.

This project uses :doc:`Poetry </getting-started/devenv-setup/local-development>` to manage the dependencies for building the documentation on ReadTheDocs. To support this, copy and add the ``[tool.poetry.group.docs.dependencies]`` dependency group in your ``pyproject.toml``. If you are not using Poetry, it’s best to follow the `tutorial <https://docs.readthedocs.io/en/stable/tutorial/index.html>`_ from ReadTheDocs.

Now, the repository should be ready to generate documentation. To preview the process, use the `make docs-build html` target.

`Accessing ReadTheDocs`_
========================
Developers working on the SKA are members of the ska-telescope organisation on GitLab. Accessing ReadTheDocs using OAuth credentials such as their GitLab account is recommended, as the integration between the SKA GitLab and SKA ReadTheDocs services is done automatically. The integrations can also be set up manually later, and is not difficult.

Developers should `sign up / sign in with their GitLab account  <https://readthedocs.org/dashboard/>`_

Signing up / in to ReadTheDocs
==============================

.. figure:: images/login-rtd.png
   :scale: 40%
   :alt: Login on Readthedocs
   :align: center
   :figclass: figborder



Import project to ReadTheDocs
=============================

After signing in, one lands on the Dashboard. To import a project so that it is automatically built by Readthedocs, click on the dropdown next to your name at the top right and choose **My Projects**, then **Import a Project**:

.. figure:: images/rtd_my_projects_import.jpg
   :scale: 80%
   :alt: My Projects >> Import Project
   :align: center
   :figclass: figborder

Find the project you want to import. You can filter the projects using the list on the right, or if you cannot find your project, import manually.

.. figure:: images/rtd_import.jpg
   :scale: 80%
   :alt: Import a Project
   :align: center
   :figclass: figborder


Name the project correctly
--------------------------

When importing the project, the **Name/Project Slug** should have SKA Telescope (or ska-telescope-, if the project name is in this format) as a prefix followed by the gitlab repository slug.

.. list-table::
   :widths: 30 50
   :header-rows: 1

   * - Repository Name
     - Required RTD Project Slug
   * - ska-tango-examples
     - ska-telescope-ska-tango-examples
   * - ska-python-skeleton
     - ska-telescope-ska-python-skeleton
   * - ska-nextjs-skeleton
     - ska-telescope-ska-nextjs-skeleton

.. warning::
   The RTD project name is used to create the RTD project slug and the slug cannot be changed later, whereas the project name can be changed in the settings to "SKA Tango Examples" for readability. 

.. note::
   Regardless of the project being part of a subgroup or many subgroups, the RTD project name will only contain the repository slug, never the subgroups.
   i.e. project url: https://gitlab.com/ska-telescope/templates/ska-python-skeleton, the RTD project name should be `ska-telescope-ska-python-skeleton`.

It's **important** to note that if the ``docs`` directory is not in your default branch, the build process will not succeed. If your ``docs`` directory is in a different branch(i.e. `dev`), you can set that branch as the default. Later, once you merge your branch, you can go back to the ReadTheDocs settings and change the default branch back to main/master.
If there's an error it's best to delete the project and recreate it again.

.. figure:: images/rtd_prefix.jpg
   :scale: 80%
   :alt: Import a Project
   :align: center
   :figclass: figborder


Set up documentation versioning
-----------------------------------
Next, create an automation rule that activates a new documentation version for any new git tag. Thus, whenever a new version of the code is released, ReadTheDocs will automatically activate a corresponding documentation version. To create this rule, navigate to **Admin**, **Automation Rules**, and then **Add rule**:

.. figure:: images/automation_rule.png
   :scale: 80%
   :alt: Add an automation rule
   :align: center
   :figclass: figborder


Add a special account as Maintainer
-----------------------------------

Importantly, the user `kurtcobain-19` must be added to the project as a Maintainer so that the System Team can add it as a Sub-project (see next step). You might also add other team members at this step.

.. figure:: images/kurtcobain.jpg
   :scale: 60%
   :alt: Add a maintainer
   :align: center
   :figclass: figborder

.. _sub-project:

Add project as a sub-project on ReadTheDocs
-------------------------------------------

A sub-project must be added by a user with Maintainer privileges on the main project.

Currently only the System Team members have these permissions. Please create a System team Support request on `STS Service Desk <https://jira.skatelescope.org/servicedesk/customer/portal/166/create/465>`_ to have your project added.

For more information on how to add a subproject, go to `Read The Docs <https://docs.ReadTheDocs.io/en/stable/subprojects.html>`_.


