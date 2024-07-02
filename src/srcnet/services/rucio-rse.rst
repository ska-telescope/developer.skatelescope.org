.. _rucio-rse:

Rucio RSE
=========

A Rucio Storage Element (RSE) is the logical abstraction of a storage 
system for physical files. Each of the installation methods for the 
clients, protocols and services supported by the SKAO Rucio Datalake 
are described here. 

.. toctree::
  :maxdepth: 1
  :caption: Rucio RSE
  :hidden:
  
  data-management/webdav
  data-management/xrootd

Pre-requisites
--------------

To be part of the SKAO Rucio Datalake, it is necessary that the service for 
the RSE in the local node is integrated within IAM Authorisation and 
Authentication (A&A), for this it will be necessary to create an IAM client 
and associate it to the service that enables the RSE. 

Follow the next instructions to create and manage this IAM A&A client:  

.. toctree::
  :maxdepth: 1
  :caption: IAM Client Configuration
  :hidden:
  
  iam-client-configuration/iam-client-configuration

- :doc:`iam-client-configuration/iam-client-configuration`

Deployment options
------------------

Choose to install **one** of the methods that fits best 
to your needs and the features of your storage infrastructure:

.. list-table::
   :header-rows: 1

   * - Protocol
     - Service
     - Version
     - Method
   * - WebDav
     - StoRM WebDav
     - 1.4.2-1
     - :doc:`Manual on Rocky Linux 9 <data-management/webdav>`
   
