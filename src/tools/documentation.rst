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
capabilities to automatically extract and parse code documentation, or docstrings. Refer to the :ref:`Python Coding Guidelines <python-code-guide>` for more information.

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

Log in with OAuth
=================

As of October 2019, most developers are also registered on the SKA GitHub, and some may sign in using the OAuth credentials provided by GitHub, when signing into GitLab. This will be the preferred route.

.. figure:: images/login-oauth.png
   :scale: 40%
   :alt: Login on GitLab
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


