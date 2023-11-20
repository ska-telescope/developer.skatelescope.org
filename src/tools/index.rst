Development tools and practices
-------------------------------
SKA git repositories
====================

The SKA uses git as its distributed version control system, and all SKA code shall be hosted in an SKA organisation. The gitlab organization *ska-telescope* can be found at https://gitlab.com/ska-telescope. All SKA developers
must have a gitlab account and be added to the organisation. See :doc:`git` for further details.

Working with SKA Jira
=====================

Every team is tracking daily work in a team-based project on our JIRA server at https://jira.skatelescope.org. Our internal wiki, Confluence, has guidance on how we use JIRA.  We rely on integrations between GitLab and JIRA to manage our work.

- :doc:`jira`

CI/CD: Continuous Integration and Deployment
============================================

CI/CD is at the heart of SKA development, and we use GitLab's automation extensively, so we can test and deploy our software more efficiently.

- :doc:`ci-cd`

Testing
=======

Tests are a key part of producing working software. We suggest you look at our :doc:`../policies/ska-testing-policy-and-strategy`, and our :doc:`bdd-test-context` and :doc:`bdd-walkthrough`.

Test Infrastructure
===================

To support our testing and CI/CD pipelines, we have the multiple kubernetes clusters configured to allow testing to happen.

- :doc:`test-infrastructure`
- :doc:`monitoring-dashboards/stfc-performance-env`

Containerisation
================

To facilitate code portability and reliability and test running, we use containers. We also use kubernetes as our container orchestration system.

- :doc:`containers`
- :doc:`containers/containerisation-standards`
- :doc:`containers/kubernetes-introduction`
- :doc:`containers/orchestration-guidelines`
- :doc:`containers/multitenancy`
- :doc:`containers/docker-proxy-cache`
- :doc:`containers/uploading-docker-nexus`

Documentation
=============

While we prefer working code over documentation (as Agile developers), we also recognise that this is a large and long-lived project, so documentation has an important place.

- :doc:`documentation`

Package Release Process
=======================

What you need to know in order to release an SKA software package.

- :doc:`software-package-release-procedure`

Logging
=======

Making sure your software project outputs useful logs for the SKA

- :doc:`logging-format`

Monitoring Dashboards
=====================

You've deployed your code on one of our test systems. Now you want to monitor it.

- :doc:`centralised-monitoring-and-logging`

Bug Reporting
=============

What to do when you find a bug in SKA code.

- :doc:`reporting-bugs`

Coding Guidelines
=================

Guidelines to the coding standards we apply in the SKA. Not available for all languages.

- :doc:`codeguides`
- :doc:`codeguides/cplusplus-codeguide`
- :doc:`codeguides/javascript-codeguide`
- :doc:`codeguides/python-codeguide`
- :doc:`codeguides/vhdl-codeguide`

FAQ
===

Questions frequently asked by developers.

- :doc:`dev-faq`


.. toctree::
  :maxdepth: 2
  :caption: Tools
  :hidden:

  git
  jira
  ci-cd
  bdd-test-context
  bdd-walkthrough
  test-infrastructure
  containers
  binderhub
  documentation
  software-package-release-procedure
  secret-management
  logging-format
  centralised-monitoring-and-logging
  reporting-bugs
  codeguides
  dev-faq