********************
Linting OCI Projects
********************


Linting Locally
===============

To lint your OCI project locally, the following command can be used:

.. code:: bash

    make oci-lint


Linting Automatically
=====================

To lint your OCI project automatically in a ci-cd pipeline, add the following to the include section of your ``.gitlab-ci.yml`` file:

.. code:: yaml

    include:
        # OCI
        - project: 'ska-telescope/templates-repository'
            file: 'gitlab-ci/includes/oci-image.gitlab-ci.yml'


Then, make sure to define the ``lint`` stage in your ``.gitlab-ci.yml`` file as well:

.. code:: yaml

    stages:
      - lint

This will automatically include and run the OCI linting template on your pipeline.
