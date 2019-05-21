.. developer.skatelescope.org documentation master file, created by
   sphinx-quickstart on Wed Dec 13 11:59:38 2017.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

.. HOME SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Home
  :hidden:

SKA telescope developer portal
------------------------------

Welcome to the `Square Kilometre Array <http://www.skatelescope.org>`_ software
documentation portal. Whether you are a developer involved in SKA or you are
simply one of our many users, all of our software processes and projects are
documented in this portal.

Scope
=====

This documentation applies to the bridging phase of the SKA project, further
updates and scope changes will be published on this website.
Part of the bridging phase goals will be to consolidate and enrich this portal
with more detailed information. It is thus anticipated that in this phase
the change rate of the documentation will be very frequent.



SKA developer community
-----------------------

SKA software development is managed in an open and transparent way.

.. COMMUNITY SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Community
  :hidden:

  community/code_of_conduct
  community/getting_started
  community/teams_responsibilities
  community/decision_making

- :doc:`community/code_of_conduct`
- :doc:`community/getting_started`
- :doc:`community/teams_responsibilities`
- :doc:`community/decision_making`

.. todo::
   - SAFe process implementation
   - Community forum

.. DEVELOPMENT TOOLS SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Development tools
  :hidden:

  tools/git
  tools/continuousintegration
  tools/cidashboard
  tools/tango-devenv-setup
  tools/pycharm/pycharm
  tools/vscode/vscode

Development tools
-----------------
Working with git
================

Git is adopted as distributed version control system, and all SKA code shall be hosted in a git repository.
The github organization *ska-telescope* can be found at https://github.com/ska-telescope . All SKA developers
must have a github account and be added to the organization as part of a team.

- :doc:`tools/git`

Working with SKA Jira
=====================

Every team is tracking daily work in a team-based project on our JIRA server at [https://jira.skatelescope.org]

.. todo::
   - Create a new project
   - Link to issue tracker

Development Environments
========================

Python and Tango development
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A completely configured development environment can be set up very easily. This will include 
TANGO, PyTANGO, docker and properly configured IDEs.

- :doc:`tools/tango-devenv-setup`


PyCharm and VSCode are two IDEs that can be configured to support python and 
PyTANGO development activities. You will find detailed instructions and how-tos at:

- :doc:`tools/pycharm/pycharm`
- :doc:`tools/vscode/vscode`


.. AGILE PRACTICES FOLLOWED AT SKA SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Agile practices followed at SKA
  :hidden:

  agile_practices/definition_of_done

Agile practices followed at SKA
--------------------------------

Definition of Done
==================

The definition of done is used to guide teams in planning and estimating the size of stories and features:

- :doc:`agile_practices/definition_of_done`


.. DEVELOPMENT GUIDELINES SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Development guidelines
  :hidden:

  development/fundamental_sw_requirements
  development/python-codeguide
  development/javascript-codeguide
  development/containerisation-standards
  development/python_package_release_procedure
  development/uploading-docker-nexus


Development guidelines
----------------------

Fundamental SKA Software & Hardware Description Language Standards
==================================================================

These standards underpin all SKA software development. The canonical copy is 
`held in eB <https://ska-aw.bentley.com/SKAProd/Search/QuickLink.aspx?n=SKA-TEL-SKO-0000661&t=3&d=&sc=Global&i=view>`_,
but the essential information is here:

- :doc:`development/fundamental_sw_requirements`


Python coding guidelines
========================

A Python skeleton project is created for use within the SKA Telescope. This skeleton purpose is to
enforce coding best practices and bootstrap the initial project setup. Any development should start
by forking this skeleton project and change the appropriate files.

- :doc:`development/python-codeguide`

Javascript coding guidelines
============================

A React based javascript skeleton project is created for use within the SKA Telescope. Similar to the 
Python skeleton above its purpose is to enforce coding best practices and bootstrap the initial project 
setup for browser based javascript applications.

- :doc:`development/javascript-codeguide`

Containerisation Standards
==========================

A set of standards, conventions and guidelines for building, integrating and maintaining Container
technologies.

- :doc:`development/containerisation-standards`

SKA Software Packaging Procedure
================================

This details a procedure that all *SKA* developers shall follow to ensure that they make use of the
existing CI/CD pipelines to automate the building of their software packages for release.

- :doc:`development/python_package_release_procedure`

Hosting a docker image on Nexus
===============================

This details steps that all *SKA* developers shall abide to when building and hosting their docker
images on the Nexus registry.

- :doc:`development/uploading-docker-nexus`


.. PROJECTS SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Projects
  :hidden:

  projects/list
  projects/create_new_project
  projects/document_project
  projects/licensing

Projects
--------

- :doc:`projects/list`
- :doc:`projects/create_new_project`
- :doc:`projects/document_project`
- :doc:`projects/licensing`

.. SERVICES SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Services
  :hidden:

  services/ait_performance_env


Developer Services
------------------

- :doc:`services/ait_performance_env`

.. SHARE SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Share Your Knowledge
  :hidden:

  community/share_your_knowledge  


Share Your Knowledge
--------------------
- :doc:`community/share_your_knowledge`

Commitment to opensource
------------------------

As defined in SKA software standard, SKA software development is committed to opensource,
and an open source licensing model is always preferred within SKA software development.

.. todo::
   - Committment to opensource
   - Exceptions

.. RECOMMENDED READING SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Recommended Reading
  :hidden:

  recommended_reading/system_design
  recommended_reading/programming
  recommended_reading/programming_languages

.. FOLLOW US SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Follow us
  :hidden:

  follow_us/followus_env

Follow Us
----------

- :doc:`follow_us/followus_env`

