Linting Python Projects
+++++++++++++++++++++++

Code Formatting
===============

To format your python code to be in compliance with the linting rules, the following command can be used:

.. code:: bash

    make python-format


Linting Locally
===============

To lint your python project locally, the following command can be used:

.. code:: bash

    make python-lint


Linting Automatically
=================

To lint your python project automatically in a ci-cd pipeline, add the following to the include section of your .gitlab-ci.yml file:

.. code:: yaml

    include:
        # Python
    - project: 'ska-telescope/templates-repository'
        file: 'gitlab-ci/includes/python.gitlab-ci.yml'

Then, make sure to define the ``lint`` stage in your .gitlab-ci.yml file as well:

.. code:: yaml

    stages:
      - lint

This will automatically include and run the python linting template on your pipeline.
