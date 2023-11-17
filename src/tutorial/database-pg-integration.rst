
.. raw:: html

    <style>
        div .figborder p.caption {margin-top: 10px;}
    </style>

.. .. admonition:: The thing

..    You can make up your own admonition too.


*******************************
PostgreSQL Database Integration
*******************************

This section steps through the process of Integrating and Deploying a PostgreSQL database
for the development environment.


.. contents:: Table of Contents


Prerequisites
=============

The following preconditions are required, so that there is a connection available to 
the target Kubernetes cluster for the Database deployment:

* A target Kubernetes enviroment set as the current ``KUBECONFIG`` context (mini-howto)
* ``kubectl`` is installed
* ``helm`` is installed

Optional Flows
==============

There are three options for deploying the PostgreSQL DB component.  These directly relate 
to the target environment and require the selection and configuration of different 
credentials for each.

Setup the PostgreSQL database credentials (options):

* accept default values for ``POSTGRES_USER`` / ``POSTGRES_PASSWORD`` / ``POSTGRES_DB`` (postgres/postgres/pgdb) - the most common option for a development enviroment
* define explicit environment variables for ``POSTGRES_USER`` / ``POSTGRES_PASSWORD`` and ``POSTGRES_DB``
* create/update Vault secrets for ``POSTGRES_USER`` / ``POSTGRES_PASSWORD``

Steps
=====

Setup the PostgreSQL credentials
--------------------------------

Option 1:
The PostgreSQL credentials are required for the connection between the database and the Database backend. Typically the developer would just rely on the defaults which are automatically set(username: ``postgres``, password: ``postgres``).

Option 2:
To override the default credentials, define the following environment variables: ``POSTGRES_USER`` / ``POSTGRES_PASSWORD`` / ``POSTGRES_DB``. 
These will be picked up by the following steps to seed the PostgreSQL database and configure the 
connection with the database.

Option 3:
Establish the associated secrets in Hashicorp Vault so that the secrets are picked up
by the following steps to seed the PostgreSQL database and configure the connection with the PostgreSQL.

Connect Helm repository
-----------------------

In order to deploy the Helm charts for both the PostgreSQL database and the database it is 
necessary to create a repository connection to the associated Helm repository.

.. code:: bash

    $ helm repo add skao https://artefact.skao.int/repository/helm-internal
    "ska" has been added to your repositories
    $ helm repo update
    Hang tight while we grab the latest from your chart repositories...
    ...Successfully got an update from the "skao" chart repository
    Update Complete. ⎈Happy Helming!⎈

This has now added the repository of all the SKAO Helnm charts.

Configure PostgreSQL parameters (``values.yaml``)
-------------------------------------------------

Prior to deploying the database, it maybe necessary to customise the configuration.
Create a :literal:`values.yaml` and set parameters like so:

.. code:: bash

    cat << EOF >values.yaml
    architecture: standalone
    image:
        tag: 14-debian-11
    global:
      postgresql:
        auth:
          username: $POSTGRES_USER
          password: $POSTGRESS_PASS
          database: $POSTGRESS_DB
    primary:
        initdb:
            scriptsConfigMap: postgresql-init-script
    EOF




Deploy PostgreSQL
-----------------

Once the database parameters have been altered to requirements, the PostgreSQL can 
now be deployed for the PostgreSQL database.

.. code:: bash

    #!/bin/sh
    svcname=postgresql
    namespace=my-$svcname
    svcport=5432
    port=6$svcport
    script=myddl.sql
    init="https://gitlab.com/ska-telescope/db/ska-db-oda/-/raw/main/charts/ska-db-oda-umbrella/data/create_tables.sql?ref_type=heads"

    kubectl create namespace $namespace

    curl $init > $script
    kubectl create configmap $svcname-init-script --namespace=$namespace --from-file=$script

    helm install $svcname oci://registry-1.docker.io/bitnamicharts/$svcname -f values.yaml --namespace=$namespace 

    echo "Waiting for $svcname startup"
    sleep 10
    echo "Localhost forward on port $port"
    kubectl port-forward -n $namespace svc/$svcname $port:$svcport

Connecting to the database
--------------------------

This is done with:

.. code:: bash

    $ psql -U $POSTGRES_USER -d $POSTGRES_DB -h localhost -p 65432
    Password for user pg: 
    psql (15.4, server 14.10)
    Type "help" for help.

    devdb=> \d
                        List of relations
    Schema |            Name             |   Type   | Owner 
    --------+-----------------------------+----------+-------
    public | tab_oda_eb                  | table    | pg
    public | tab_oda_eb_id_seq           | sequence | pg
    public | tab_oda_obs_prg             | table    | pg
    public | tab_oda_obs_prg_id_seq      | sequence | pg
    public | tab_oda_prj                 | table    | pg
    public | tab_oda_prj_id_seq          | sequence | pg
    public | tab_oda_sbd                 | table    | pg
    public | tab_oda_sbd_id_seq          | sequence | pg
    public | tab_oda_sbi                 | table    | pg
    public | tab_oda_sbi_id_seq          | sequence | pg
    public | tab_oda_sbi_sbd_version_seq | sequence | pg
    (11 rows)

    devdb=> 


