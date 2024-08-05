.. HOME SECTION ==================================================

.. toctree::
  :maxdepth: 1
  :caption: Home
  :hidden:

.. note::
   SRCNet v0.1

SRCNet Software Stack
=====================

.. toctree::
   :hidden:

   self



The SRCNet Software Stack encompasses the mandatory and optional software  
for the nodes within the SRCNet network. This includes data and 
metadata management services, visualization services, monitoring tools, and scientific 
platforms, among others. All components are aligned with the implementation 
plan designed for SRCNet v0.1.

The goal of this repository is to provide various installation methods and versions to 
facilitate reproducible installations across SRCNet nodes. By offering detailed 
instructions and multiple installation options, we aim to streamline the deployment 
process and ensure consistency and reliability across the SRC Network. Where feasible, 
manual, script-based automated installation and GitOps-based deployment methods will be provided, catering to 
different deployment preferences and requirements.



Global Services
---------------

The Global SRC Services will operate centrally, providing essential functionalities across the entire SRCNet network. These services include:

- *Common Software Repository*: A centralized repository for storing and distributing software used within the SRCNet.
- *Identity and Access Management Service*: A service to manage user identities and control access to resources within the SRCNet.
- *Permissions Service*: A service to handle permissions and authorization for accessing various resources.
- *Science Metadata Services*: Services for publishing and discovering scientific metadata.
- *Services Metadata-related Services*: Tools for data registration, discovery, and access to services within the SRCNet.
- *Distributed Data Management Service*: A service to manage and access data across distributed nodes within the SRCNet.
- *Service to Manage Rucio Data Transfers*: A dedicated service for managing data transfers using Rucio.
- *Data Registration (Ingestion) Prototype Node*: A prototype node for testing and implementing data registration and ingestion processes.
- *Operations Portal/Dashboard*: A centralized portal or dashboard for monitoring and managing operations within the SRCNet.

.. toctree::
  :maxdepth: 1
  :caption: Global SRCNet Services
  :hidden:

  services/global/global

See  :doc:`services/local/mandatory/data-management-api/data-management-api`.

Local SRC Services
------------------

Local SRCNet Services are those installed on the SRCNet nodes, classified into 
mandatory and optional categories, and also providing several methods to install 
them:

.. list-table::
  :width: 100 %
  :widths: 50 10 10 10 10 10
  :header-rows: 1

  * - Service & Type
    - Reqs.
    - Manual
    - Container
    - Helm
    - GitOps
  * - | Data Management API 
      | **Mandatory** 
    - :ref:`IAM <iam-data-management-api>`
    - 
    - :ref:`Link <container-data-management-api>`
    - :ref:`Link <helm-data-management-api>`
    - 
  * - | Rucio Storage Element
      | **Mandatory** 
    - :ref:`IAM <iam-rucio-storage-element>`
    - | :ref:`Manual (WebDav) <manual_storm_webdav>`
      | :ref:`Manual (xrootd) <manual_xrootd_webdav>`
    - | :ref:`Docker (WebDav) <container_storm_webdav>`
      | TBC.
    - | :ref:`Helm (WebDav) <helm_storm_webdav>`
      |
    - 
  * - | Visualisation Services
      | **Mandatory** 
    - :ref:`IAM <iam-visualisation-services>`
    - 
    - :ref:`Docker Compose <docker-compose-visualisation-services>`
    - 
    - 
  * - | Monitoring tools
      | **Mandatory**
    - 
    - :ref:`Manual <manual-monitoring-tools>`
    - 
    - 
    - 
  * - | Science Platform
      | **Optional** 
    - :ref:`IAM <iam-science-platform>`
    - :ref:`Manual <manual-science-platform>`
    - 
    - 
    - :ref:`Argo CI/CD <gitops>`

Local Mandatory SRC Services
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. toctree::
  :maxdepth: 2
  :caption: Local Mandatory SRCNet Services 
  :hidden:

  services/local/mandatory/data-management-api/data-management-api
  services/local/mandatory/rucio-storage-element/rucio-storage-element
  services/local/mandatory/visualisation-services/visivo-soda
  services/local/mandatory/monitoring-tools/perfsonar

**Mandatory Services:** 

These are the critical components required for the proper functioning of each SRCNet node:

- *Common Data-related Services*: Tools for discovering and accessing data.
- *Local Data Parsing Services*: Services allowing remote invocation for data parsing.
- *Visualization Services*: Containerized visualization tools capable of running on SRCNet nodes.
- *Interactive Analysis Interface*: Notebooks and tools for interactive data analysis.
- *Monitoring Services*: Tools for monitoring the performance and health of the SRCNode.
- *Interfaces and Integration with Global Services*: Essential interfaces to ensure seamless integration with global SRCNet services.

See :doc:`services/local/mandatory/mandatory`.

Local Optional SRC Services
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. toctree::
  :maxdepth: 2
  :caption: Local Optional SRCNet Services 
  :hidden:
  
  services/local/optional/science-platform/canfar

These are additional services that can be installed on each node to enhance the 
basic functionality provided by the mandatory services.

- *Science Platform Gateway (Webserver Interface)*.
- *Science Platform*: CANFAR.
- *User Areas Based on VOSpace Cavern*.
- *Cloud-Based Software Deployment*: Platform Azimuth.
- *HPC and Batch Compute*: SLURM Clusters.
- *Software Distribution* CVMFS Client.
- *Additional Services*: Other services can be deployed and registered into the SRCNet Site Capabilities Service.

See :doc:`services/local/optional/optional`.

Dependent SRCNet Services
-------------------------

Dependent services are components of the SRCNet that depend on other services 
to work properly. In the context of SRCNet software, services and tools, 
they are part of a broader ecosystem that needs to be deployed to provide certain 
functionalities. 

.. toctree::
  :maxdepth: 2
  :caption: Dependent SRCNet Services 
  :hidden:

  services/dependent/storage-element/storage-element
  services/dependent/gitops/gitops

Storage Elements implementations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
A Rucio Storage Element can have different implementations aligned with the SKAO Rucio DataLake.

See :doc:`services/dependent/storage-element/storage-element` deployment of implementations.

GitOps
^^^^^^

Some of the software and services identified for the SRCNet on local nodes may 
require the installation of a platform for local GitOps support that will enable 
the deployment of other services.  GitOps is an operational framework that uses 
Git repositories as the sole source of truth for declarative infrastructure and 
applications. This alternative leverages Git version control, which ensures auditing, 
automated deployments and consistency across environments. This improves collaboration, 
enables continuous delivery of services and automation of the deployment process.

See :doc:`services/dependent/gitops/gitops` deployment.
