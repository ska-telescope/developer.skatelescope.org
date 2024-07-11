.. _srcnet:

SRCNet Software Stack
=====================

This section details the software stack that underpins the SRCNet platform. 
The aim is to provide deployment and installation instructions for each of 
the services involved in the local functionality of SRCNet.
This software stack refers to the various software subsystems that work together 
to enable the functionality of SRCNet nodes. These subsystems can be broadly 
categorized into local services running on individual nodes, optional services 
that can be deployed on nodes, and global services that run centrally. 
The following sections detail the specific software components for each category. 
This includes Data Management Services, Data Parsing and Visualization Services and Tools, 
Interactive Analysis Interfaces, Monitoring Services, and Interfaces and Integration with Global Services.

Local Compulsory Services
-------------------------

Local Compulsory Services are essential subsystems running on each node within the 
SRCNet platform, ensuring the fundamental operations and baseline functionality. 


Interfaces and Integration with Global Services
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Part of the compulsory Local Services, they need to be integrated with other 
global services, such as IAM-based authentication and authorisation (A&A). 
Follow the instructions below if your service requires SKAO IAM-based A&A: 

.. toctree::
  :maxdepth: 1
  :caption: IAM configuration for the Storage Element - Rucio RSE
  :hidden:
  
  services/iam-client-configuration/rucio-rse-iam-client-configuration

- :doc:`services/iam-client-configuration/rucio-rse-iam-client-configuration`

Data Management Services
^^^^^^^^^^^^^^^^^^^^^^^^

One of the pillars of the SRNet is the Data Management Services. 
Local SRC nodes must be integrated into the SKAO Rucio DataLake as Rucio 
Storage Element (RSE).
For this, SRCNet nodes need to install and deploy a client to efficiently 
and securely manage, access and deliver data across the different storage 
infrastructures of the SKAO Rucio Datalake that Rucio is able to handle. 
Several services, clients and protocols are available for this purpose. 

Next subsection will cover different installation options for your 
infrastructure:

.. toctree::
  :maxdepth: 1
  :caption: Storage Element
  :hidden:

  services/data-management/storage-element/storage-element

- :doc:`services/data-management/storage-element/storage-element`

Local Optional Services
-----------------------

Optional Local Services are subsystems that can be installed 
in a complementary way on each node of the SRCNet.

Science Platform
^^^^^^^^^^^^^^^^

The Science Platform for the SRCNet will be a comprehensive data 
management and analysis system designed to support the SKA's radio astronomy projects. 
It will provides tools for accessing, processing, and analyzing astronomical data 
collected by the SKA telescopes. The following subsection covers the deployment of 
`OpenCADC CANFAR<https://github.com/opencadc/science-platform>`_ science platform.

.. toctree::
  :maxdepth: 1
  :caption: OpenCADC - CANFAR
  :hidden:

  services/science-platform/canfar

- :doc:`  services/science-platform/canfar`

