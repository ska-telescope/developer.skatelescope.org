Linting Terraform
*****************

Code Formatting
===============

You can format Terraform automatically using the target:

.. code-block:: bash

    make tf-format

Linting Locally
===============

To lint Terraform, run:

.. code-block:: bash
  
    make tf-lint

Linting Automatically
=====================

To perform Terraform linting automatically through a CI/CD pipeline, add the following lines to the .gitlab-ci.yml file:

.. code-block:: yaml
   
    stages:
    - lint

    include:
      # Terraform
      - project: 'ska-telescope/templates-repository'
        file: 'gitlab-ci/includes/terraform-lint.gitlab-ci.yml'



