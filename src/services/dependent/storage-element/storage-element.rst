.. _storage-element:



Storage Element (SE)
=====================

.. note::
    - Support: https://skao.slack.com/archives/C047DPDKRN0
    - Status: https://skao.slack.com/archives/C0243CKRR6G 


A Storage Element (SE) is the logical abstraction of a storage system for physical files.

Supported storage element technologies include:

.. toctree::
  :maxdepth: 1
  :glob:

  implementations/*

Deployment is both technology and infrastructure dependent. Some deployment options are listed below:

.. list-table::
   :header-rows: 1

   * - Technology
     - Protocol
     - Deployment Methods
   * - StoRM WebDAV
     - https/webdav
     - | :ref:`Manual <manual_storm_webdav>`
       | :ref:`Docker <container_storm_webdav>`
       | :ref:`Helm <helm_storm_webdav>`
   * - xrootd
     - https/webdav
     - | :ref:`Manual <manual_xrootd_webdav>`


   

   
