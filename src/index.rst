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

Welcome to the `Square Kilometre Array <http://www.skatelescope.org>`- software
documentation portal. Whether you are a developer involved in SKA or you are
simply one of our many users, all of our software processes and projects are
documented or linked to in this portal.

The portal is frequently updated as the project evolves; if you feel that something is missing, please have a look at our :doc:`guide to contributing to the developer portal </contributor/contribute>`

If you're new to developing the SKA, please have a look at :doc:`our Onboarding material </getting-started/getting-started>` and the :doc:`guideance on setting up your development environment </getting-started/devenv-setup>`.

.. note::
   Please also read the :doc:`/policies/code-of-conduct`, which governs all SKA interactions. 

What follows is a brief guide to the headings you'll find in the left-hand sidebar of this site. Feel free to explore!


Getting Started and the SKA Developer Community
-----------------------------------------------

This section is about getting you up and running. It contains the onboarding material for all new SKA developers, the general contribution guidelines when working on SKA projects, guidance on setting up your development environment, and a list of projects, so you know what the SKA is working on. There is also a wealth of information about our development tools and practices, which you can read as you start development work.


.. GETTING STARTED SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Getting Started
  :hidden:

  getting-started/getting-started
  getting-started/contrib-guidelines
  getting-started/devenv-setup
  getting-started/projects

- :doc:`getting-started/getting-started`
- :doc:`getting-started/contrib-guidelines`
- :doc:`getting-started/devenv-setup`
- :doc:`getting-started/projects`

A list of the tools we are using to collaborate, together with guidance on how to use them can be found at this confluence page: `SKA Guidelines to Remote Working <https://confluence.skatelescope.org/display/SKAIT/SKA+Guidelines+to+Remote+Working>`- (requires an SKA Confluence account).


.. DEVELOPMENT TOOLS SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Development tools
  :hidden:

  tools/git
  tools/jira
  tools/ci-cd
  tools/testing
  tools/test-infrastructure
  tools/containers
  tools/documentation
  tools/software-package-release-procedure
  tools/logging-format
  tools/monitoring-dashboards/monitoring-dashboards
  tools/reporting-bugs
  tools/codeguides
  tools/dev-faq

Development tools and practices
-------------------------------
SKA git repositories
====================

The SKA uses git as its distributed version control system, and all SKA code shall be hosted in an SKA organisation. The gitlab organization *ska-telescope* can be found at https://gitlab.com/ska-telescope. All SKA developers
must have a gitlab account and be added to the organisation. See :doc:`/tools/git` for further details.

Working with SKA Jira
=====================

Every team is tracking daily work in a team-based project on our JIRA server at https://jira.skatelescope.org. Our internal wiki, Confluence, has guidance on how we use JIRA.  We rely on integrations between GitLab and JIRA to manage our work.

- :doc:`tools/jira`

CI/CD: Continuous Integration and Deployment
============================================

CI/CD is at the heart of SKA development, and we use GitLab's automation extensively, so we can test and deploy our software more efficiently.

- :doc:`tools/ci-cd`

Testing
=======

Tests are a key part of producing working software. We suggest you look at our :doc:`policies/ska-testing-policy-and-strategy`, and our :doc:`tools/testing`.
 
Test Infrastructure
===================

To support our testing and CI/CD pipelines, we have the EngageSKA and other clusters configured to allow testing to happen. 

- :doc:`tools/test-infrastructure`
- :doc:`tools/monitoring-dashboards/ait-performance-env`

Containerisation
================

To facilitate code portability and reliability and test running, we use containers. We also use kubernetes as our container orchestration system. 

- :doc:`tools/containers`
- :doc:`tools/containers/containerisation-standards`
- :doc:`tools/containers/kubernetes-introduction`
- :doc:`tools/containers/orchestration-guidelines`
- :doc:`tools/containers/multitenancy`
- :doc:`tools/containers/docker-proxy-cache`
- :doc:`tools/containers/uploading-docker-nexus`

Documentation
=============

While we prefer working code over documentation (as Agile developers), we also recognise that this is a large and long-lived project, so documentation has an important place.

- :doc:`tools/documentation`

Package Release Process
=======================

What you need to know in order to release an SKA software package.

- :doc:`tools/software-package-release-procedure`

Logging
=======

Making sure your software project outputs useful logs for the SKA

- :doc:`tools/logging-format`

Monitoring Dashboards
=====================

You've deployed your code on one of our test systems. Now you want to monitor it.

- :doc:`tools/monitoring-dashboards/monitoring-dashboards`

Bug Reporting
=============

What to do when you find a bug in SKA code.

- :doc:`tools/reporting-bugs`

Coding Guidelines
=================

Guidelines to the coding standards we apply in the SKA. Not available for all languages.

- :doc:`tools/codeguides`
- :doc:`tools/codeguides/cplusplus-codeguide`
- :doc:`tools/codeguides/javascript-codeguide`
- :doc:`tools/codeguides/python-codeguide`
- :doc:`tools/codeguides/vhdl-codeguide`

FAQ
===

Questions frequently asked by developers.

- :doc:`tools/dev-faq`

.. POLICES & PROCEDURES SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Policies and Procedures
  :hidden:

  policies/code-of-conduct
  policies/definition-of-done
  policies/ska-testing-policy-and-strategy
  policies/fundamental-sw-requirements
  policies/decision-making
  policies/incident-management

Definition of Done
==================

The definition of done is used to guide teams in planning and estimating the size of stories and features:

- :doc:`policies/definition-of-done`

Fundamental SKA Software & Hardware Description Language Standards
==================================================================

These standards underpin all SKA software development. The canonical copy is
`held in eB <https://ska-aw.bentley.com/SKAProd/Search/QuickLink.aspx?n=SKA-TEL-SKO-0000661&t=3&d=&sc=Global&i=view>`-,
but the essential information is here:

- :doc:`policies/fundamental-sw-requirements`


Incident Management
===================

The incident management workflow is used to guide teams in dealing with anomolous conditions that lead to some form of service outage, unexpected system behaviour or degraded system performance:


.. RECOMMENDED READING SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Recommended Reading
  :hidden:

  recommended-reading/system-design
  recommended-reading/programming
  recommended-reading/programming-languages

.. ABOUT SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: About the SKA
  :hidden:

  about/ska-org
  about/safe-for-ska
  about/followus-env
  about/teams-responsibilities

About the SKA
-------------

For information about the SKA, have a look at this section.

- :doc:`about/ska-org`
- :doc:`about/safe-for-ska`
- :doc:`about/followus-env`
- :doc:`about/teams-responsibilities`


- :doc:`about/followus-env`


.. CONTRIBUTOR SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Contribute to the Developer Portal
  :hidden:

  contributor/contribute

Contribute to the SKA Developer Portal
--------------------------------------

We encourage all members of the development community to submit improvements to the Developer Portal. These pages describe how you can contribute changes to the Developer Portal.

- :doc:`contributor/contribute`
