.. _explanation-vault-structure:

===============
Vault Structure
===============

In modern cloud environments, securely and efficiently managing sensitive information - like API keys, credentials - as well as configuration files is crucial. Vault KV engines offer a secure way to store and manage this data, acting as a secure store for configurations in general. By utilizing KV paths, we can implement a **structure** - driven by path naming standards and access-control policies - that brings flexibility and practicality when managing configurations and secrets. Understanding how these are structured and accessed will help their integration in SKAO applications and infrastructure. Note that this structure is transversal to the SKAO, as it is used by the Systems Teams for infrastructure and services, as well as AIV and Development teams for applications.

.. note::

    We will refer interchangeably to **configurations** and **secrets**, as this structure contemplates treating this data agnostically, looking at Vault as a **secure store** for configurations, regardless of the type of data.

By considering Vault as a secure store for configurations - not just secrets - we enhance our ability to manage both application and infrastructure configurations securely and efficiently. This holistic approach ensures that all sensitive data and configurations are stored, managed, and accessed in a consistent and secure manner across the organization. Moreover, it allows for a common solution for auditing and traceability on different types of configuration data.

Understanding the Structure
===========================

We mainly contemplate three levels of ownership of data when structuring Vault KV engines and path naming standards:

- **Datacentre**: Refers to a physical infrastructure where multiple environments can be deployed.
- **Environment**: Refers to a set of applications, services, or infrastructure components deployed together to deliver functionality to end-users.
- **Application/Service/Infrastructure Component**: Pieces of software or infrastructure components that can be deployed to an environment to fulfill a role.

In the proposed Vault structure, secrets are organized hierarchically to ensure clear separation of concerns between different datacentres, environments, and applications, services, or infrastructure components. This allows us to tightly control access and facilitate the management of data at scale. The structure of a Vault configuration or secret follows the pattern:

::

   <prefix>/<service>/<secret>

.. image:: images/secret_structure.png
  :alt: Basic secret path structure

Where:

- `<prefix>`: Refers to the path representing the context (e.g., shared/global, `<datacentre>/<environment>`, dev/`<team>`).
- `<service>`: The name of the application, service, or infrastructure component.
- `<secret>`: The specific configuration or secret being stored for that service or component (e.g., configuration files, credentials, or complete files such as `values.yml` for Helm charts).

Example structure:

::

   shared/
   └── global/
       ├── my-app/
       │   └── config: <configuration content>
       └── network-config/
           └── firewall_rules: <firewall configuration>

   dev/
   └── some-team/
       ├── ska-something/
       │   └── values.yml: <contents of values.yml>
       └── infra-component/
           └── config.yml: <infrastructure component configuration>
    
   stfc-techops/
   └── production/
       ├── another-app/
       │   └── values.yml: <contents of values.yml>
       └── my-app/
           └── database_credentials: <database-credentials>

This structure simplifies the management of access control to the various KV engines and subpaths. Now, we must look at the various KV engines available and how they are meant to be used.

Vault KV Engines
================

Vault KV engines are organized into three main categories:

- **Dev KV Engine**: Stores configurations to be used in development deployments and CI/CD.
- **Shared KV Engine**: Stores configurations that are shared across datacentres and environments (production-grade deployments).
- **Datacentre-Specific KV Engines**: Stores configurations specific to each datacentre, with segregation by environment (production-grade deployments).

Separating into multiple engines allows us to:

- Simplify secret organization and management.
- Implement easier access control policies.
- Have a shared engine and sections to reduce duplication.

Let's look at the various KV engines and the roles they are designed to play.

Shared
------

The **Shared KV Engine** is used for configurations that need to be shared across multiple datacentres or environments of the same type. This engine is structured to enable secure access at both the global and environment-specific levels while allowing efficient data sharing. It is composed of two categorical sections - **global** and **environment/environment-type** specific:

- **Global Section**:
    - **Path**: `shared/global`
    - **Contains**: Secrets that are common to all datacentres and environments.
    - **Examples**:
        - API keys for external or central services.
            - InfraHQ access key.
            - Best-practice configurations for `ska-tango-base`.
        - Infrastructure configurations.
            - Network configurations.
            - Common firewall rules.

- **Environment / Environment-Type Sections**:
    - **Path**: `shared/<environment or environment-type>`
    - **Stores**: Secrets shared among environments of the same name or type (e.g., `shared/staging`, `shared/production`).

.. note::

   The environment type construct was introduced to facilitate sharing secrets among environments named differently (hence, `shared/<environment>` would be different) but that are similar in their type. For example, to share among several `dish-lmc` environments—`dish-lmc-001`, `dish-lmc-002`, etc.—we can create a `shared/dish-lmc` section and name the environment type "dish-lmc". Remember, this is just a construct/reference that needs to be implemented when actually using the configurations.

Each section contains configurations relevant to environments that fit a particular use case or classification. Shared sections of engines need to be used with care, particularly when changing upstream shared values. This can have an impact on all of the environments that use them. For this reason, the access control on shared sections is very strict and fine-grained.

Example structure:

::

   shared/
     ├── global/                 # Shared across all datacentres
     ├── production/             # Shared across all production environments
     └── staging/                # CShared across all staging environments

Datacentre-Specific
-------------------

Each datacentre has its own dedicated KV engine, which stores configurations specific to that datacentre. Within each engine, configurations are organized by environment, with an additional **shared** section for data that is shared across environments within the same datacentre. Again, it has two section categories: **per-environment** and **shared**.

- **Per-Environment Section**:
    - **Path**: `<datacentre>/<environment>`
    - **Contains**: Secrets specific to each environment (e.g., `stfc-techops/production`, `aws-eu-west-2/staging`).
    - **Examples**:
        - Environment-specific database configurations.
        - Environment-specific network configurations.
        - Infrastructure component configurations.

- **Datacentre-Shared Section**:
    - **Path**: `<datacentre>/shared`
    - **Contains**: Secrets shared across multiple environments within the datacentre.
    - **Examples**:
        - Common infrastructure configurations within the datacentre.
        - Shared network settings.

These KV engines will have wider write access, as the various teams managing deployments need access. The same care with the shared section needs to be taken here as with the shared engine.

Dev
---

The **Dev KV Engine** is meant to be a "meta-engine," acting like a separate Vault instance with multiple engines in it. The main idea is for development teams to replicate the structure of Vault itself, but instead of the first level being per-datacentre, it must be per-team. Your team's slug at `https://gitlab.com/groups/ska-telescope/ska-dev` must be used. If your team doesn't have a GitLab group, please reach out to the System Team via `STS <https://jira.skatelescope.org/servicedesk/customer/portal/166>`_.

Example structure:

::

   dev/
   └── some-team/
       ├── some-service/
       │   └── values.yml: <contents of values.yml>
       ├── another-service/
       │   └── database_credentials: <database-credentials>
       └── infra-component/
           └── config.yml: <infrastructure component configuration>

Teams can then manage their own configurations and secrets while being able to share them with other teams, as all integrated systems (e.g., GitLab, Kubernetes clusters) have read access to the whole engine. Together with the improvement of the :ref:`Kubernetes integration <tutorial-vault>`, the goal is for development teams to cease the usage of GitLab secrets and Makefile changes to the Helm chart **values**, so that `auditing` and `tracing` of a deployment can be done reliably, replacing it with proper :ref:`GitLab integrations <tutorial-vault-gitlab-integration>`.
