
.. raw:: html

    <style>
        div .figborder p.caption {margin-top: 10px;}
    </style>

.. .. admonition:: The thing

..    You can make up your own admonition too.


********************
Database Integration
********************

This section steps through the process of Integrating and Deploying the TangoDB and
DatabaseDS components both for development and the Production environment.


.. contents:: Table of Contents


Prerequisites
=============

The following preconditions are required, so that there is a connection available to 
the target Kubernetes cluster for the Database deployment:

* A target Kubernetes enviroment set as the current `KUBECONFIG` context (mini-howto)
* `kubectl` is installed
* `helm` is installed

Optional Flows
==============

There are three options for deploying the Tango DB component.  These directly relate 
to the target environment and require the selection and configuration of different 
credentials for each.

Setup the MariaDB database credentials (options):
* accept default values for `TANGO_USER` / `TANGO_PASSWORD` (tango/tango) - the most common option for a development enviroment
* define explicit environment variables for `TANGO_USER` / `TANGO_PASSWORD`
* create/update Vault secrets for `TANGO_USER` / `TANGO_PASSWORD`

Steps
=====

Setup the MariaDB database credentials
--------------------------------------

Option 1:
The MariaDB credentials are required for the connection between the DatabaseDS and the
 Database backend.  typically, the developer would just rely on the defaults which are 
automatically set - these are username: `tango` password: `tango`

Option 2:
To override the default credentials, define the following environment variables: `TANGO_USER` / `TANGO_PASSWORD` . 
These will be picked up by the following steps to seed the TangoDB and configure the 
connection with the DatabaseDS.

Option 3:
Establish the associated secrets in Hashicorp Vault so that the secrets are picked up
 by the following steps to seed the TangoDB and configure the connection with the DatabaseDS.

Connect Helm repository
-----------------------

In order to deploy the Helm charts for both the TangoDB and the DatabaseDS it is 
necessary to create a repository connection to the associated Helm repository.

.. code:: bash

    $ helm repo add ska https://artefact.skao.int/repository/helm-internal
    "ska" has been added to your repositories
    $ helm repo update
    Hang tight while we grab the latest from your chart repositories...
    ...Successfully got an update from the "ska" chart repository
    Update Complete. ⎈Happy Helming!⎈

This has now added the repository of all the SKAO Helnm charts.


Configure database parameters (values.yaml)
-------------------------------------------

Prior to deploying the TangoDB, it maybe necessary to customise the configuration.


Deploy MariaDB
--------------





Configure DatabaseDS parameters (values.yaml)
---------------------------------------------



Deploy DatabaseDS
-----------------




Extract connection details (DB connection and TANGO_HOST)
---------------------------------------------------------




