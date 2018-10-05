.. developer.skatelescope.org documentation master file, created by
   sphinx-quickstart on Wed Dec 13 11:59:38 2017.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

.. ATTENTION::
   This portal is under active development and in **BETA** version

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

SKA Code of Conduct
-------------------

SKA Organisation (SKAO) is committed to the highest standards of business
ethics and as such expects everyone involved in SKAO-related business to
uphold the standards and expected professional behavior set out in
`SKA Code of Ethics page <https://www.skatelescope.org/code-of-ethics/>`_ .

The code of ethics applies to every SKA collaborators and it is the
reference guide defining the culture of this online community of contributors.

  * Download the `SKA Code of Ethics
    <http://www.skatelescope.org/wp-content/uploads/2017/12/SKAO_Code_of_Ethics_Nov17.pdf>`_

.. COMMUNITY SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Community
  :hidden:

  community/getting_started
  community/decision_making

SKA developer community
-----------------------

SKA software development is managed in an open and transparent way.

- :doc:`community/getting_started`
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

Development tools
-----------------
Git
===

Git is adopted as distributed version control system, and all SKA code shall be hosted in a git repository.
The github organization *ska-telescope* can be found at https://github.com/ska-telescope . All SKA developers
must have a github account and be added to the organization as part of a team.

- :doc:`tools/git`

Jira
====

Every team is tracking daily work in a team-based project on our JIRA server at [https://jira.skatelescope.org]

.. todo::
   - Create a new project
   - Link to issue tracker

.. PROJECTS SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Projects
  :hidden:

  projects/list
  projects/create_new_project
  projects/document_project

Projects
--------

- :doc:`projects/list`
- :doc:`projects/create_new_project`
- :doc:`projects/document_project`

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


Commitment to opensource
------------------------

As defined in SKA software standard, SKA software development is committed to opensource,
and an open source licensing model is always preferred within SKA software development.

.. todo::
   - Licensing your project
   - Committment to opensource
   - Exceptions
