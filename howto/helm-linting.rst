Linting Helm Charts
=================

Linting Locally
===============

To lint helm charts, run:

.. code-block:: bash
  
    make helm-lint

Linting Automatically
=====================

To perform helm chart linting automatically through a CI/CD pipeline, add the following lines to the .gitlab-ci.yml file:

.. code-block:: yaml
   
    stages:
    - lint

    include:
    - project: 'ska-telescope/templates-repository'
      file: 'gitlab-ci/includes/helm-chart-lint.gitlab-ci.yml'



