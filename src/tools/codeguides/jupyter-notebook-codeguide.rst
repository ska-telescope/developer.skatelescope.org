
**********************************
Jupyter Notebook Coding Guidelines
**********************************

Best Practices
==============

Jupyter notebooks are widely used across the SKAO by a number of teams - mostly within :doc:`Binderhub/Jupyterhub </tools/binderhub>` - to share ideas, code snippets and break down larger concepts into more manageable chunks. With the large number of notebooks produced it is very important to address the best practices of creating notebooks so that a standard approach can be utilised across the SKAO.

.. list-table::
    :widths: 50 50
    :Header-rows: 1

    * - SKAO Jupyter Notebook Standard
      - Description
    * - Naming	
      - Use expressive names that describe what your notebook is doing.
    * - Directory Structure
      - Notebooks should be placed inside a /notebooks directory, at the root of your repository.
    * - Execution
      - Avoid ambiguous execution orders. To ensure that your notebook is reproducible and creates the expected results, restart the kernel and execute all cells of the notebook before you share it.
    * - Modularisation
      - Use modularisation (i.e. modules, functions, classes) if reasonable.
    * - Testing	
      - Use the testing make target described below.
    * - Linting
      - Use the linting make target described below.
    * - Data Distribution
      - Ensure that all data used in the notebook is distributed together with it (or at least can be downloaded) and that you're using relative paths to access the data.
    * - Dependencies
      - Ensure you are referencing the dependencies using .TOML for example to pin the versions of all used dependencies and import all dependencies at the beginning of a notebook.
    * - Outputs
      - Distribute a notebook with its outputs. This makes it easier to reproduce the results as everyone who executes the notebook can verify that the results are the same.
    * - Variables
      - Do not redefine variables in different parts of the notebook.

Pipeline Machinery
==================

The CICD makefile repository contains make targets for the linting, formatting and testing of notebooks, all found `here <https://gitlab.com/ska-telescope/sdi/ska-cicd-makefile/-/blob/master/python.mk>`_. To access these new targets, ensure your repository's ``Makefile`` includes the python support makefile:

.. code-block:: make

  # Include Python support
  include .make/python.mk

Below describes the usage of these targets.

Testing
#######

To test notebooks, run:

.. code-block:: bash

    make notebook-test

This target uses Pytest and nbmake, which is a Pytest plugin. It verifies Jupyter notebooks can execute fully without error, the target execution fails if an error occurs. By default, all notebooks inside the repository will be tested.

CICD Template
#############

Linting and testing of Jupyter notebooks is currently supported within CICD pipelines. You must include `notebook.gitlab-ci <https://gitlab.com/ska-telescope/templates-repository/-/blob/master/gitlab-ci/includes/notebook.gitlab-ci.yml>`_ in your repository's gitlab-ci file to enable jobs for the linting and testing of notebooks, as below:

.. code-block:: yaml

    include:
    # Jupyter notebook linting and testing
    - project: 'ska-telescope/templates-repository'
      file: 'gitlab-ci/includes/notebook.gitlab-ci.yml'

Customising
###########

If you wish to exclude specific notebooks from being targetted by any of the above make targets, simply include the names of them in the ``NOTEBOOK_IGNORE_FILES`` environment variable. Define this in your repository's ``Makefile``, ensuring it appears before you include ``python.mk``. It must follow the form ``not <file1> and not <file2>...``:

.. code-block:: make

    NOTEBOOK_IGNORE_FILES = not notebook.ipynb and not another-notebook.ipynb

    # Include Python support
    include .make/python.mk