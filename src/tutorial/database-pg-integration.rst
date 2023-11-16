
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
both for development and the Production environment.


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
* accept default values for ``POSTGRES_USER`` / ``POSTGRES_PASSWORD`` (postgres/postgres) - the most common option for a development enviroment
* define explicit environment variables for ``POSTGRES_USER`` / ``POSTGRES_PASSWORD``
* create/update Vault secrets for ``POSTGRES_USER`` / ``POSTGRES_PASSWORD``

Steps
=====

Setup the PostgreSQL credentials
--------------------------------

Option 1:
The PostgreSQL credentials are required for the connection between the DatabaseDS and the
 Database backend.  typically, the developer would just rely on the defaults which are 
automatically set - these are username: ``postgres`` password: ``postgres``

Option 2:
To override the default credentials, define the following environment variables: ``POSTGRES_USER`` / ``POSTGRES_PASSWORD`` . 
These will be picked up by the following steps to seed the PostgreSQL database and configure the 
connection with the DatabaseDS.

Option 3:
Establish the associated secrets in Hashicorp Vault so that the secrets are picked up
 by the following steps to seed the PostgreSQL database and configure the connection with the DatabaseDS.

Connect Helm repository
-----------------------

In order to deploy the Helm charts for both the PostgreSQL database and the DatabaseDS it is 
necessary to create a repository connection to the associated Helm repository.

.. code:: bash

    $ helm repo add skao https://artefact.skao.int/repository/helm-internal
    "ska" has been added to your repositories
    $ helm repo update
    Hang tight while we grab the latest from your chart repositories...
    ...Successfully got an update from the "skao" chart repository
    Update Complete. ⎈Happy Helming!⎈

This has now added the repository of all the SKAO Helnm charts.


Configure database parameters (``values.yaml``)
-----------------------------------------------

Prior to deploying the PostgreSQL database, it maybe necessary to customise the configuration.
Create a :literal:`values.yaml` and set parameters like so:

.. code:: bash

    cat << EOF >values.yaml
    architecture: standalone
    image:
        tag: 10.11-debian-11
    auth:
        database: postgres
        username: $POSTGRES_USER
        password: $POSTGRES_PASSWORD
    initdbScriptsConfigMap: postgresdb-init-script
    EOF


Deploy PostgreSQL
-----------------

Once the database parameters have been altered to requirements, the PostgreSQL can 
now be deployed for the PostgreSQL database.

.. code:: bash

    namespace=my-postgresql
    port=65432
    init="https://gitlab.com/ska-telescope/ska-databases-metadata-scripts/-/raw/main/PostgreSQLdb/tng.sql?ref_type=heads"
    curl $init > tng.sql
    kubectl create namespace $namespace
    kubectl create configmap postgresdb-init-script --namespace=$namespace --from-file=tng.sql
    helm install mariadb oci://registry-1.docker.io/bitnamicharts/mariadb --namespace=$namespace \
    --values values.yaml
    echo "Waiting for PostgreSQL startup"
    sleep 10
    echo "Localhost forward on port $port"
    kubectl port-forward -n $namespace svc/postgresql $port:5432


Configure DatabaseDS parameters (``values.yaml``)
-------------------------------------------------

Prior to deploying the DatabaseDS, it maybe necessary to customise the configuration.
Create a :literal:`values.yaml` and set parameters like so:

.. code:: bash

    cat << EOF >values.yaml
    architecture: standalone
    image:
        tag: 10.11-debian-11
    auth:
        database: postgres
        username: $POSTGRES_USER
        password: $POSTGRES_PASSWORD
    initdbScriptsConfigMap: postgresdb-init-script
    EOF




Deploy PostgreSQL
-----------------

Once the database parameters have been altered to requirements, the PostgreSQL can 
now be deployed for the PostgreSQL database.

.. code:: bash

    namespace=my-postgresql
    port=63306
    init="https://gitlab.com/ska-telescope/ska-databases-metadata-scripts/-/raw/main/postgresdb/tng.sql?ref_type=heads"
    curl $init > tng.sql
    kubectl create namespace $namespace
    kubectl create configmap postgresdb-init-script --namespace=$namespace --from-file=tng.sql
    helm install mariadb oci://registry-1.docker.io/bitnamicharts/mariadb --namespace=$namespace \
    --values values.yaml
    echo "Waiting for mariadb startup"
    sleep 10
    echo "Localhost forward on port $port"
    kubectl port-forward -n $namespace svc/mariadb $port:3306




