Linting Notebooks
+++++++++++++++++

Code Formatting
===============

You can format notebooks automatically using the target:

.. code-block:: bash

    make notebook-format

Linting Locally
===============

To lint notebooks, run:

.. code-block:: bash
  
    make notebook-lint

This target uses the same plugins as the python-lint target (isort, black, flake8 and pylint), but runs them through nbQa as well. nbQa is a plugin that simply allows you to use python linters for Jupyter notebooks. By default, all notebooks inside the repository will be linted.

Linting Automatically
=====================

To perform notebook linting automatically through a CI/CD pipeline, add the following lines to the .gitlab-ci.yml file:

.. code-block:: yaml
   
    stages:
    - lint

    include:
      # Notebook
      - project: 'ska-telescope/templates-repository'
        file: 'gitlab-ci/includes/notebook-lint.gitlab-ci.yml'



