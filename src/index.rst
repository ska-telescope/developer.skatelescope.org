SKA telescope developer portal
------------------------------

  howto/*
..  howto/**/*

.. toctree::
  :maxdepth: 1
  :caption: References
  :glob:

  reference/*
..  reference/**/*

.. toctree::
  :maxdepth: 1
  :caption: Explanations
  :glob:

  explanation/*
..  explanation/**/*

Welcome to the `Square Kilometre Array <http://www.skao.int/>`_ software
documentation portal. Whether you are a developer involved in SKA or you are
simply one of our many users, all of our software processes and projects are
documented or linked to in this portal.

The portal is frequently updated as the project evolves; if you feel that something is missing, please have a look at our :doc:`guide to contributing to the developer portal </contributor/contribute>`

If you're new to developing the SKA, please have a look at :doc:`our Onboarding material </getting-started/onboarding>` and the :doc:`guideance on setting up your development environment </getting-started/devenv-setup/devenv-setup>`.

.. note::
   Please also read the :doc:`/policies/code-of-conduct`, which governs all SKA interactions.

What follows is a brief guide to the headings you'll find in the left-hand sidebar of this site. Feel free to explore!



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
=======
.. grid:: 2
    :gutter: 2

    .. grid-item-card::  SKAO Website
       :link: https://www.skaobservatory.org/

        Follow this card for main SKAO Website

    .. grid-item-card::  Onboarding
       :link: getting-started/getting-started
       :link-type: doc

       Are you new to the project?
       Follow this card for the onboarding experience!

    .. grid-item-card:: PlaceHolder Card 1

       Put more easy to follow links for Important Stuff here

    .. grid-item-card::  PlaceHolder Card 2

       Put more easy to follow links for Important Stuff here


.. toctree::
  :maxdepth: 1
  :hidden:

  Getting Started <getting-started/index>
  Projects <projects/index>
  How-to Guides <tools/index>
  Reference <tools/index>
  Policies <policies/index>
  Testing <policies/index>
  About <about/index>
