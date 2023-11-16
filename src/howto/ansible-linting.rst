Linting Ansible Projects
++++++++++++++++++++++++


Linting Locally
===============

To lint your ansible project locally, the following command can be used:

.. code:: bash

    make ansible-lint


Linting Automatically
=====================

To lint your ansible project automatically in a ci-cd pipeline, add the following to the include section of your ``.gitlab-ci.yml`` file:

.. code:: yaml

    include:
        # Ansible
        - project: 'ska-telescope/templates-repository'
            file: 'gitlab-ci/includes/ansible.gitlab-ci.yml'


Then, make sure to define the ``lint`` stage in your ``.gitlab-ci.yml`` file as well:

.. code:: yaml

    stages:
      - lint

This will automatically include and run the ansible linting template on your pipeline.
