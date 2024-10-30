.. _explanation-vault-structure:

======================
Vault Secret Structure
======================

In modern cloud environments, securely managing sensitive information such as API keys, database credentials, and configuration files is crucial. Vault KV engines offer a secure way to store and manage this data. With the KV path we can also implement a **structure** - driven by path naming standards and access-control policies - that brings flexibility and practicality when managing secrets. Understanding how these secrets are structured and accessed will help their integration in SKAO applications. Note that this structure is meant for both cloud operations and application deployments, as it is also used by the Systems Teams to manage their secrets for the various environments they manage.

Understanding the structure
===========================

We mainly contemplate three levels of ownership of data when structuring Vault secret engines and path naming standards:

- **Datacentre**: Refers to a physical infrastructure where multiple environments can be deployed
- **Environment**: Refers to a set of applications/services deployed together to deliver functionality to end-users
- **Application/Service**: Piece of software that can be deployed to an environment as a workload

In the proposed Vault structure, secrets are organized hierarchically to ensure clear separation of concerns between different environments, datacentres, and services. This allows us to tightly control access and facilitate the management of secrets at scale. The structure of a Vault secret follows the pattern:

::

   <prefix>/<service>/<secret>

.. image:: images/secret_structure.png
  :alt: Basic secret path structure

Where:

- `<prefix>`: Refers to the path representing the context of the secret (e.g., shared/global, <datacentre>/<environment>, dev/<team>)
- `<service>`: The name of the application, service, or infrastructure component
- `<secret>`: The specific secret being stored for that service (e.g., configuration, credentials, or complete files such as values.yml for Helm charts)

Example structure:

::

   shared/
   └── global/
       └── my-app/
           └── api_key: <apikey>

   dev/
   └── some-team/
       ├── ska-something
       ├   └── values.yml: <contents of values.yml>
    
   stfc-techops/
   └── production/
       ├── another-app
       ├   └── values.yml: <contents of values.yml>
       └── my-app
           └── database_credentials: <database-credentials>

This way it becomes simple to manage access control to the various KV engines and subpaths. Now, we must look at the various KV engines available and how they are meant to be used.

Vault KV Engines
================

Vault KV engines are organized into three main categories:

- **Dev KV Engine**: Stores secrets to be used in development deployments and CICD
- **Shared KV Engine**: Stores secrets that are shared across datacentres and environments (production-grade deployments)
- **Datacentre-specific KV Engines**: Stores secrets specific to each datacentre, with segregation by environment (production-grade deployments)

Separating into multiple engines, allows to:

- Simplify secret organization and management
- Easier access control policies
- Have a shared engine to reduce duplication

Lets look at the various KV engines and what role they were designed to play.

Shared
------

The shared KV Engine is used for secrets that need to be shared across multiple datacentres or environments or the same type. This engine is structured to enable secure access at both the global and environment-specific levels, while allowing efficient data sharing. It is composed of two categorical sections - **global** and **environment**/**environment type** specific:

- Global section:
    - Path: shared/global
    - Contains secrets that are common to all datacentres and environments
    - Examples:
        - API keys for external or central services
            - InfraHQ access key
            - Best-practice configurations for ska-tango-base
- Environment / Environment-Type sections:
    - Path: shared/<environment or environment type>
    - Stores secrets shared among environments of the same name or type (e.g., shared/staging, shared/production). 


.. note::

   The environment type construct was introduced to facilitate sharing secrets among environments named differently (hence, shared/<environment> would be different) but that are similar in their type. For example, to share among several dish-lmc environments - dish-lmc-001, dish-lmc-002 ... - we can create a shared/dish-lmc section and name the environment type "dish-lmc". Remember, this is just a contruct/reference that needs to be implemented when actually using the secrets.

Each section contains secrets relevant to environments that fit a particular use case or classification. Shared sections of engines need to be used with care, particularily when changing upstream shared values. This can have impact in all of the environments that use them. For this reason, the access control on shared sections is very strict and fine-grained.

Example structure:

::

   shared/
     ├── global/                 # Secrets shared across all    datacentres
     ├── production/             # Secrets shared across all    production environments
     ├── staging/                # Secrets shared across all staging    environments
     └── dev/                    # Secrets shared across all    development environments

Datacentre-specific
-------------------

Each datacentre has its own dedicated KV engine, which stores secrets specific to that datacentre. Within each engine, secrets are organized by environment, with an additional **shared** section for secrets that are shared across environments within the same datacentre. Again, it has two section categories: **per-environment** and **shared**.

- Per-Environment section:
    - Path: <datacentre>/<environment>
    - Contains secrets specific to each environment (e.g., stfc-techops/production, aws-eu-west-2/staging).
- Datacentre-Shared section:
    - Path: <datacentre>/shared
    - Contains secrets shared across multiple environments within the datacentre. Again, if some secret is used on most environments, it should be placed here.

This KV engines will have wider write access, as the various teams managing deployments need access. The same care with the shared section needs to be taken here, as with the shared engine.

Dev
---

The dev KV engine is meant to be a "meta-engine", acting like as a separate Vault instance with multiple engines in it. The main idea is for development teams to replicate the structure of Vault itself, but insted of the first level being per-datacentre, it must be per-team. Your team's slug at https://gitlab.com/groups/ska-telescope/ska-dev must be used. If your team doesn't have a Gitlab group, please reach out to the System Team via `STS <https://jira.skatelescope.org/servicedesk/customer/portal/166>`_.

Example structure:

::

   dev/
   └── some-team/
       ├── some-service
       ├   └── values.yml: <contents of values.yml>
       └── another-service
           └── database_credentials: <database-credentials>

Teams can then manage their own secrets, while being able to share them with other teams, as all integrated systems (i.e., Gitlab, Kubernetes clusters) have read access to the whole engine. Together with the improvement of the :ref:`Kubernetes integration <tutorial-vault>`, the goal is for development teams to cease the usage of Gitlab secrets & Makefile changes to the helm chart **values** so that `auditing` and `tracing` of a deployment can be done reliabily, replacing it with proper :ref:`Gitlab integrations <tutorial-vault-gitlab-integration>`
