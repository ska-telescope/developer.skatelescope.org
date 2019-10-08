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

Public API
==========

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

Documentation must be placed in a ``docs`` folder in the upper level of the 
repository structure. 

Using sphinx
============

Documentation must be realised using the `sphinx <http://www.sphinx-doc.org>`_  
package and `Restructured Text <http://docutils.sourceforge.net/rst.html>`_ .
SKA provides a predefined sphinx template for this purpose in the 
`SKA python skeleton <https://github.com/ska-telescope/ska-python-skeleton>`_ project. 
Every project shall use the same ``docs`` folder as a starting point for assembling their 
own documentation.

Sphinx can be used to generate text documents such as this portal, but it also provides 
capabilities to automatically extract and parse code documentation.  

Integrating a project's documentation into the Developer Portal
===============================================================

The developer portal is hosted on ReadTheDocs. On the :ref:`list` page a list of all the projects that are hosted on Github is available, with badges to show the build status of the project's documentation. Each badge is also a hyperlink to the project's documentation. Every SKA project's documentation is hosted on Readthedocs as a "subproject" of the developer portal, so that all projects have a common URL for easier search-ability.

For example:
Whereas the developer portal's URL is https://developer.skatelescope.org/en/latest/index.html, the ska_python_skeleton project is at https://developer.skatelescope.org/projects/ska-python-skeleton.

Using ReadTheDocs
=================
.. todo::
  - adding textual documentation
  - adding automatically extracted documentation
  - documenting the public API


In order to add the project's documentation as a subproject on Readthedocs, a project must first be imported into Readthedocs.

Register on ReadTheDocs
-----------------------

* Log in with GitLab user
* Log in with GitHub user
* Accept

Import project to ReadTheDocs
-----------------------------


Add project as a sub-project on ReadTheDocs
-------------------------------------------

 A sub-project must be added by a user with Maintainer privileges on the main project. Currently only the System Team members have these permissions. Please ask on the Slack channel `#team-system-support <https://skasoftware.slack.com/messages/CEMF9HXUZ>`_ to have your project added.
For more information on how to add a subproject, go to `Read The Docs <https://docs.ReadTheDocs.io/en/stable/subprojects.html>`_


General documentation guidelines
--------------------------------

* Textual documentation
* Add docstrings to Readthedocs