.. _document-project: 

Documenting a project
---------------------

Documenting a project is the key to make it usable, understandable 
and maintainable, making the difference between a technically excellent
software and a successful software.
SKA has defined a set of standards and practices that shall be 
implemented when developing software documentation.
A more comprehensive set of resources can be found online at:

  * `A beginner guide to writing documentation <https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/>`_

What to document
~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~

There are several places where it's possible to write SKA documentation: on the developer portal, as part of the `Solution Intent <https://confluence.skatelescope.org/display/SWSI/Solution+Intent+Home/>`_, as part of the code repository using sphinx (as described below), in your Team space in Confluence (if you're a Confluence user), or using Google Docs in SKA's Google Drive.

The Developer Portal is best used for SKA software policies and procedures. It should not contain information that's specific to one repo (apart from its own contribution guidelines!) It is not suitable for storing information that needs to be kept private (such as private GitLab variables, passwords, etc.) It isn't great for information that changes rapidly; we suggest either using other documentation tools until the pace of change is lower, or automating the updates. 

The Solution Intent is good for planned architecture, developing and modifying he architecture. Once the architecture is settled, much of it will migrate into the relevant repositories, or may cause an update to the formal architecture documents via the :doc:`polices/decision-making`. The Solution Intent describes what we'd like to develop; repositories document the code "as-is", i.e. what is currently implemented in the code. Because it moves ahead of the code, it's not a good home for documenting current architecture, especially at the repository level. It's also not a good home for user documentation, because again it's hard to know if that's in sync with the code.  

Individual code repository documentation is good for describing the current architecture of the code within that repo, and any public APIs it may have. It's also good for user documentation, deployment information and similar documentation that's tightly tied to the code. The same caveats that apply to the developer portal also apply here. 

Team spaces are good for time-limited material, drafting material for discussion ahead of adding it to a repository, information that needs to be kepts slighly private (i.e. material that can be circulated within SKA, but not to people outside the project). Architecture work is generally better suited to the Solution Intent. For anything that needs reference beyond Program Ingrement (PI) boundaries, some other space may be better, preferably either the Solution Intent or a repository, so that it's easy to find, and to reduce documentation fragmentation. It's also less accessible than the developer portal; not all collaborators may have an SKA Community Confluence account. 

Google Docs is good for user manuals that are changing erlatively rapidly, so the material can be collected together rather than distributed across Team spaces. They can also be used for somewhat senstive material because of the access controls. However, they can also be made public if that works better for users. However, finding Google Docs is difficult, so if the documentation is relatively stable, consider moving it into a repository. 

.. _API:

Documenting the Public API
==========================

When it comes to software systems, such as services or libraries, it
is of paramount importance that the public API exposed by the software
component is clearly captured and documented. 

How to document
~~~~~~~~~~~~~~~

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
============

Documentation must be realised using the `sphinx <http://www.sphinx-doc.org>`_  
package and `Restructured Text <http://docutils.sourceforge.net/rst.html>`_ .
SKA provides a predefined sphinx template for this purpose in the 
`SKA Python skeleton <https://gitlab.com/ska-telescope/ska-skeleton>`_ project.
Every project shall use the same ``docs`` folder as a starting point for assembling their 
own documentation.

Sphinx can be used to generate text documents such as this portal, but it also provides 
capabilities to automatically extract and parse code documentation, or docstrings. Refer to the :doc:`Python Coding Guidelines </tools/codeguides/python-codeguide>` for more information.

Extracting documentation from code
==================================

.. The internet is full of information on how to write docstrings. A generic example of how to document the hello world module is provided in the `SKA Python skeleton <https://gitlab.com/ska-telescope/ska-skeleton>`_ project, and the output of the sphinx build can be seen `here <https://developer.skatelescope.org/projects/ska-python-skeleton/en/latest/?badge=latest>`_.

.. todo::
    * add hello world class with parameters to the SKA Python Skeleton Project
    * add code snippet here as an example of additional documentation which is decoupled from code, and describe the pitfalls of separating documentation from the code.

.. _dev-portal-integration:

Integration into the Developer Portal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The developer portal is hosted on ReadTheDocs. On the :ref:`list` page a list of all the projects that are hosted on GitLab is available, with badges to show the build status of the project's documentation. Each badge is also a hyperlink to the project's documentation that you can click on.

Every SKA project's documentation is hosted on Readthedocs as a :ref:`subproject <sub-project>` of the developer portal, so that all projects have a common URL for easier search-ability. For example: whereas the developer portal's URL is https://developer.skatelescope.org, the ska_python_skeleton project is at https://developer.skatelescope.org/projects/ska-python-skeleton.

In order to add the project's documentation as a subproject on Readthedocs, a project must first be imported into Readthedocs.

Register on ReadTheDocs
=======================
Developers working on the SKA are members of the ska-telescope organisation on GitLab. Registering an account using the OAuth credentials on ReadTheDocs is recommended, because then the integration between the SKA GitLab and SKA ReadTheDocs services is done automatically. The integrations can also be set up manually later, and is not difficult.

Sign up / sign in with GitLab account
=====================================

.. figure:: images/login-rtd.png
   :scale: 40%
   :alt: Login on Readthedocs
   :align: center
   :figclass: figborder


Import project to ReadTheDocs
=============================

After signing in, one lands on the Dashboard, and the steps for importing a project are pretty self-explanatory from here. While importing the project **name** should be the `ska-telescope-` and project's gitlab slug (part in the url after https://gitlab.com/ska-telescope/), i.e. `ska-telescope-ska-python-skeleton`. After the project is imported successfully, name should be changed to the name of the project as listed in Gitlab project site. Project name could be changed in the *Admin* page of Read the Docs project site. As a last step, `kurtcobain-19` account should be added to the project as a maintainer for the system team to manage the documentation later on.

.. _sub-project:

Add project as a sub-project on ReadTheDocs
===========================================

A sub-project must be added by a user with Maintainer privileges on the main project.

Currently only the System Team members have these permissions. Please ask on the Slack channel `#team-system-support <https://skasoftware.slack.com/messages/CEMF9HXUZ>`_ to have your project added.

For more information on how to add a subproject, go to `Read The Docs <https://docs.ReadTheDocs.io/en/stable/subprojects.html>`_.


