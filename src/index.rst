.. developer.skao.int documentation master file, created by
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

Welcome to the `Square Kilometre Array <http://www.skao.int/>`_ software
documentation portal. Whether you are a developer involved in SKA or you are
simply one of our many users, all of our software processes and projects are
documented or linked to in this portal.

The portal is frequently updated as the project evolves; if you feel that something is missing, please have a look at our :doc:`guide to contributing to the developer portal </contributor/contribute>`

If you're new to developing the SKA, please have a look at :doc:`our Onboarding material </getting-started/onboarding>` and the :doc:`guideance on setting up your development environment </getting-started/devenv-setup/devenv-setup>`.

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

  getting-started/onboarding
  getting-started/contrib-guidelines
  getting-started/devenv-setup/devenv-setup

- :doc:`getting-started/onboarding`
- :doc:`getting-started/contrib-guidelines`
- :doc:`getting-started/devenv-setup/devenv-setup`

.. REPOSITORIES SECTION ========================================================

.. Hidden toctree to manage sidebar navigation

.. toctree::
  :maxdepth: 1
  :caption: Repositories
  :hidden:

  projects/area
  projects/list
  projects/create-new-project
  projects/licensing

.. DEVELOPMENT TOOLS SECTION ==================================================

.. Hidden toctree to manage the sidebar navigation.

.. toctree::
  :maxdepth: 1
  :caption: Development tools
  :hidden:

  tools/git
  tools/jira
  tools/ci-cd
  tools/bdd-test-context
  tools/bdd-walkthrough
  tools/test-infrastructure
  tools/containers
  tools/binderhub
  tools/documentation
  tools/secret-management
  tools/logging-format
  tools/centralised-monitoring-and-logging
  tools/reporting-bugs
  tools/codeguides
  tools/dev-faq
  tools/skao-bar
  tools/skao-bar-migration-guidelines

Development tools and practices
-------------------------------

Here is the journey SKA Developers take to turn ideas into deployed code. 
Some of these tasks will be done every day; others less frequently. 
Feel free to click on each item to navigate to relevant explanations, tutorials, how-to guides or reference documentation.

.. mermaid::

  flowchart TD
    subgraph Getting Started
        A[Develop Inside a Container] --> C[Setup]
        B[Develop Locally] --> C
        C --> D[Set up Environment: Clone the Repo]
        C --> E[Set up Environment: Create the Repo]
        E --> F[Create the Work Branch]
        D --> F
    end
    subgraph Coding & Testing
        F --> F1[Write Code]
        F1 --> G[Lint Code]
        G --> H[Build Artifacts]
        H --> S[Get Unit Tests Running Locally]
        S --> F1
    end
    subgraph Review
        S --> U[Push Code to Gitlab]
        U --> V[Create MR]
        V --> W[Code Review]
        W --> F1
    end
    subgraph Continuous Integration
        S --> I[Write Your Dockerfile]
        I --> J[Build and Run Your Dockerfile]
        J --> K[Get Tests Running in Cloud/CICD]
    end
    subgraph Continuous Deployment
        K --> L[Create/Update My Helm Chart]
        L --> M[Integrate with DBs]
        L --> N[Integrate with Secrets]
        M --> O[Run Integration Tests]
        O --> L
        N --> O
    end
    subgraph Release
        O --> P[Update CHANGELOG/Documentation]
        P --> Q[Update Versions/Release]
        Q --> R[Deploy to PSI/ITF]
        R --> Z[Deploy to Production]
    end


Python Developer Journey
=========================

Setup Environment
#################

1. Develop Inside a Container

  1. Set up Environment: Clone the Repo
  2. Create the Work Branch

2. Develop Locally

  1. Set up Environment: Clone the Repo
  2. Create the Work Branch

Coding & Testing
################

1. Write Code

  - :doc:`howto: Integrate Cicd Make </howto/integrate-cicd-make>`

2. Lint Code

  - :doc:`exp: Linting </explanation/linting>`
  - :doc:`howto: Ansible Linting </howto/ansible-linting>`
  - :doc:`howto: Helm Linting </howto/helm-linting>`
  - :doc:`howto: Notebook Linting </howto/notebook-linting>`
  - :doc:`howto: OCI Linting </howto/oci-linting>`
  - :doc:`howto: Python Linting </howto/python-linting>`
  - :doc:`howto: Terraform Linting </howto/terraform-linting>`
  
3. Build Python Wheel
4. Get Unit Tests Running Locally

Review
######

1. Push Code to Gitlab
2. Create MR
3. Code Review

  - :doc:`howto: Code Review </howto/code-review>`

Continuous Integration
######################

1. Write Your Dockerfile

  - :doc:`exp: Continuous Integration </explanation/continuous-integration>`
  - :doc:`howto: Install Oci Engines </howto/install-oci-engines>`
  - :doc:`exp: Optimize Oci Image Builder </explanation/optimize-oci-image-builder>`
  - :doc:`exp: Containerization </explanation/containerization>`

2. Build and Run Your Dockerfile

  - :doc:`exp: Central Artefact Repository </explanation/central-artefact-repository>`
  - :doc:`howto: Docker Vscode </howto/docker-vscode>`

3. Get Tests Running in Cloud/CICD

Continuous Deployment
#####################

1. Create/Update My Helm Chart
2. Integrate with databases

 - :doc:`tutorial: Database Integration </tutorial/database-integration>`

3. Integrate with Secrets

 - :doc:`tutorial: Vault Kubernetes Integration </tutorial/vault>`
 - :doc:`tutorial: Vault Gitlab CICD Integration </tutorial/vault-gitlab-integration>`

4. Run Integration Tests

Release
#######

1. Update CHANGELOG/Documentation

  1. :doc:`tutorial: Automate Release Process </tutorial/release-management/automate-release-process>`

2. Update Versions/Release

  2. :doc:`tutorial: Automate Release Process </tutorial/release-management/automate-release-process>`
  3. :doc:`: Automate Release Process </tutorial/release-management/automate-release-process>`

3. Deploy to PSI/ITF

  4. :doc:`: Deploying to Multiple SKAO Clusters </howto/deploy-to-datacentres>`

.. toctree::
  :maxdepth: 1
  :caption: Tutorials
  :glob:
  :hidden:

  tutorial/*
  tutorial/**/*

.. toctree::
  :maxdepth: 1
  :caption: How-To Guides
  :glob:
  :hidden:

  howto/*
..  howto/**/*

.. toctree::
  :maxdepth: 1
  :caption: References
  :glob:
  :hidden:

  reference/*
..  reference/**/*

.. toctree::
  :maxdepth: 1
  :caption: Explanations
  :glob:
  :hidden:

  explanation/*
..  explanation/**/*


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

Tests are a key part of producing working software. We suggest you look at our :doc:`policies/ska-testing-policy-and-strategy`, and our :doc:`tools/bdd-test-context` and :doc:`tools/bdd-walkthrough`.

Test Infrastructure
===================

To support our testing and CI/CD pipelines, we have the multiple kubernetes clusters configured to allow testing to happen.

- :doc:`tools/test-infrastructure`
- :doc:`tools/monitoring-dashboards/stfc-performance-env`

Containerisation
================

To facilitate code portability and reliability and test running, we use containers. We also use kubernetes as our container orchestration system.

- :doc:`tools/containers`
- :doc:`tools/containers/containerisation-standards`
- :doc:`tools/containers/kubernetes-introduction`
- :doc:`tools/containers/orchestration-guidelines`

Working with BinderHub
======================

To enable developers to share their code and collaborate, while being provided with enough computational resources to execute it.

- :doc:`tools/binderhub`

Documentation
=============

While we prefer working code over documentation (as Agile developers), we also recognise that this is a large and long-lived project, so documentation has an important place.

- :doc:`tools/documentation`

Package Release Process
=======================

What you need to know in order to release an SKA software package.

- :doc:`tutorial/release-management/automate-release-process`

Vault Secret Management
=======================

What you need to know in order to keep your secrets secret.

- :doc:`tools/secret-management`

Logging
=======

Making sure your software project outputs useful logs for the SKA

- :doc:`tools/logging-format`

Monitoring Dashboards
=====================

You've deployed your code on one of our test systems. Now you want to monitor it.

- :doc:`tools/centralised-monitoring-and-logging`

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
- :doc: `explanation/linting`

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
  policies/fundamental-sw-requirements
  policies/sw-quality-assurance
  policies/sw-dev-security
  policies/compute-access
  policies/definition-of-done
  policies/ska-testing-policy-and-strategy
  policies/decision-making
  policies/incident-management

Policies and Procedures
-----------------------

Fundamental SKA Software & Hardware Description Language Standards
==================================================================

These standards underpin all SKA software development. The canonical copy is
`held in eB <https://ska-aw.bentley.com/SKAProd/Search/QuickLink.aspx?n=SKA-TEL-SKO-0000661&t=3&d=&sc=Global&i=view>`_,
but the essential information is here:

- :doc:`policies/fundamental-sw-requirements`

Software Product Quality Assurance plan
=======================================

This Software Product Quality Assurance Plan (SPQAP) defines the Quality Assurance requirements and management
activities for the development of software by the Agile Development Teams through the PSSC Contracting arrangements,
and the delivery of the software by the SKAO.

This document is a mapping to the SKA Product Quality Assurance (PQA) Plan, that describes the roles and
responsibilities of the SKAO and the Contractors and provides an itemised response to the Product Quality Assurance Management,
and the PQA Requirements sections.

- :doc:`policies/sw-quality-assurance`

Software Development Security Policy
====================================

Most of the software used for the control and operation of the SKAO telescopes will be developed by SKA Community members and contributors.
To ensure the smooth operation of the SKAO and minimise the risk of software vulnerabilities, information security must be incorporated
within the software development lifecycle of SKAO software. This document describes how this must be achieved.

- :doc:`policies/sw-dev-security`

Compute Access Policy
=====================

While we like to keep as much as possible open, we can't allow everyone access to the computing hardware that powers our telescopes.
Therefore we have defined groups who can get certain kinds of access to our computing hardware, and that is described in this document.

- :doc:`policies/compute-access`

Definition of Done
==================


The definition of done is used to guide teams in planning and estimating the size of stories and features:

- :doc:`policies/definition-of-done`

Testing Policy and Strategy
===========================


The testing policy and strategy is used to align people to the goals of testing and to guide them in establishing an effective testing process:

- :doc:`policies/ska-testing-policy-and-strategy`


Incident Management
===================

The incident management workflow is used to guide teams in dealing with anomolous conditions that lead to some form of service outage, unexpected system behaviour or degraded system performance:

- :doc:`policies/incident-management`

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
