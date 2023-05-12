
*********************************
Jupyter Notebook Coding Guidlines
*********************************

Best Practices
==============

Jupyter notebooks are widely used across SKAO by a number of teams to share ideas, code snippets and break down largeer concepts into more managable chucks. The usage of notebooks mostly resides within Binderhub/Jupyterhub, see :doc:`here </tools/binderhub>` for more. With the large number of notebooks produced it is very important to address the best practices of creating notebooks so that a standard approach can be utilised across the SKAO.

.. list-table::
    :widths: 50 50
    :Header-rows: 1

    * - SKAO Jupyter Notebook Standard
      - Description
    * - Naming	
      - Use expressive names for your notebooks that describe what your notebook is doing.
    * - Execution
      - Avoid ambiguous execution orders. To ensure that your notebook is reproducible and creates the expected results, restart the kernel and execute all cells of the notebook before you share your notebook.
    * - Modularisation
      - Use modularisation (i.e. modules, functions, classes) if reasonable.
    * - Testing	
      - Use the testing make target described below.
    * - Linting
      - Use the linting make target described below.
    * - Data Distribution
      - Ensure that all data used in the notebook is distributed together with the notebook (or at least can be downloaded) and that you're using relative paths to access the data.
    * - Dependencies
      - Ensure you are referencing the dependencies using .TOML for example to pin the versions of all used dependencies and import all dependencies at the beginning of a notebook.
    * - Outputs
      - Distribute a notebook with its outputs. This makes it easier to reproduce the results as everyone who executes the notebook can verify that the results are the same.
    * - Variables
      - Do not redefine variables in different parts of the notebook.

Pipeline Machinery
==================

The CICD makefile repository contains make targets for the linting, formatting and testing of notebooks, all found `here <https://gitlab.com/ska-telescope/sdi/ska-cicd-makefile/-/blob/master/python.mk>`_. Below describes the usage of these targets.

Linting
#######

To lint notebooks, run:

.. code-block:: bash
  
    make notebook-lint

This target uses the same plugins as the python-lint target (isort, black, flake8 and pylint), but runs them through nbQa as well. nbQa is a plugin that simply allows you to use python linters for Jupyter notebooks. By default, only notebooks inside your repository's src/ and tests/ directories will be linted.

You can also format notebooks automatically using the target:

.. code-block:: bash

    make notebook-format

Testing
#######

To test notebooks, run:

.. code-block:: bash

    make notebook-test

This target uses Pytest and nbmake, which is a Pytest plugin. It verifies Jupyter notebooks can execute fully without error, the target execution fails if an error occurs. By default, notebooks must be placed inside the src/ directory in your repository for them to be tested with this target.

CICD Template
#############

Linting and testing of Jupyter notebooks is currently supported within CICD pipelines. You must include `notebook.gitlab-ci <https://gitlab.com/ska-telescope/templates-repository/-/blob/master/gitlab-ci/includes/notebook.gitlab-ci.yml>`_ in your repository's gitlab-ci file to enable jobs for the linting and testing of notebooks, as below:

.. code-block:: yaml

    include:
    # Jupyter notebook linting and testing
    - project: 'ska-telescope/templates-repository'
      file: 'gitlab-ci/includes/notebook.gitlab-ci.yml'