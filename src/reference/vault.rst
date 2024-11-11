.. _reference-vault:

Vault
=====

This reference page provides quick access to all documentation related to SKAO's Vault usage. Below you'll find a list of resources categorized for easy navigation.

.. list-table:: Vault Documentation Reference
   :header-rows: 1
   :widths: 20 60 20

   * - **Title**
     - **Description**
     - **Link**
   * - Vault
     - Overview of SKAO's Vault usage, including key references to tools, structure, integrations, and best practices.
     - :ref:`Vault <reference-vault>`
   * - Secret & Configuration Management
     - Detailed explanation of how HashiCorp Vault is utilized for secrets management, authentication methods, and integration with Kubernetes.
     - :ref:`Vault as a secrets management tool <tools-vault>`
   * - Vault Structure
     - Comprehensive guide on the hierarchical organization of Vault KV engines, path naming standards, and access-control policies within SKAO.
     - :ref:`Vault Structure <explanation-vault-structure>`
   * - Current Vault Secret Hierarchy
     - Current representation and organization of Vault secrets across various datacentres and environments.
     - :ref:`Current Vault secret hierarchy <explanation-vault-current-structure>`
   * - Use Vault in Kubernetes
     - Tutorial on setting up Vault Secrets Operator (VSO) for synchronizing secrets in Kubernetes, including deployment steps and resource creation.
     - :ref:`Vault-Kubernetes integration with Vault Secrets Operator <tutorial-vault>`
   * - GitLab CI/CD Vault Integration
     - Guide on integrating GitLab CI/CD pipelines with Vault using OIDC for secure secret retrieval and injection as environment variables or files.
     - :ref:`Vault-Gitlab integration tutorial <tutorial-vault-gitlab-integration>`
   * - Using Vault with GitLab and Helm
     - Instructions on leveraging Vault to supply `values.yml` for Helm chart deployments within GitLab CI/CD pipelines, enhancing security and maintainability.
     - :ref:`How to use Vault provided values.yml to deploy Helm charts <how-vault-gitlab-helm>`
   * - Automatic Secret Rotation
     - Procedures for automatically rotating secrets in Kubernetes using Vault Secrets Operator to mitigate the impact of secret leaks.
     - :ref:`How to automatically rotate leaked secrets <how-vault-secret-rotation>`

For more detailed information on each topic, please refer to the respective sections above.
