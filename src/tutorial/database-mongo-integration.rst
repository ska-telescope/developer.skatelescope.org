
.. raw:: html

    <style>
        div .figborder p.caption {margin-top: 10px;}
    </style>

.. .. admonition:: The thing

..    You can make up your own admonition too.


****************************
MongoDB Database Integration
****************************

This section steps through the process of Integrating and Deploying a MongoDB database
both for development environment.


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

There are three options for deploying the MongoDB DB component.  These directly relate 
to the target environment and require the selection and configuration of different 
credentials for each.

Setup the MongoDB database credentials (options):

* accept default values for ``MONGO_USER`` / ``MONGO_PASSWORD`` / ``MONGO_DB`` (mongo/mongo/mongodb) - the most common option for a development enviroment
* define explicit environment variables for ``MONGO_USER`` / ``MONGO_PASSWORD`` and ``MONGO_DB``
* create/update Vault secrets for ``MONGO_USER`` / ``MONGO_PASSWORD``

Steps
=====

Setup the MongoDB credentials
--------------------------------

Option 1:
The MongoDB credentials are required for the connection between the database and the
Database backend.  typically, the developer would just rely on the defaults which are 
automatically set - these are username: ``mongo`` password: ``mongo``

Option 2:
To override the default credentials, define the following environment variables: ``MONGO_USER`` / ``MONGO_PASSWORD`` / ``MONGO_DB``. 
These will be picked up by the following steps to seed the MongoDB database and configure the 
connection with the database.

Option 3:
Establish the associated secrets in Hashicorp Vault so that the secrets are picked up
by the following steps to seed the MongoDB database and configure the connection with the MongoDB.

Connect Helm repository
-----------------------

In order to deploy the Helm charts for both the MongoDB database and the database it is 
necessary to create a repository connection to the associated Helm repository.

.. code:: bash

    $ helm repo add skao https://artefact.skao.int/repository/helm-internal
    "ska" has been added to your repositories
    $ helm repo update
    Hang tight while we grab the latest from your chart repositories...
    ...Successfully got an update from the "skao" chart repository
    Update Complete. ⎈Happy Helming!⎈

This has now added the repository of all the SKAO Helnm charts.

Configure MongoDB parameters (``values.yaml``)
-------------------------------------------------

Prior to deploying the database, it maybe necessary to customise the configuration.
Create a :literal:`values.yaml` and set parameters like so:

.. code:: bash

    cat << EOF >values.yaml
    image:
      tag: 6.0-debian-11
    architecture:
      standalone
    auth:
      enable: true
    usernames: 
      [ $MONGO_USER ]
    databases: 
      [ $MONGO_DB ]
    passwords:
      [ $MONGO_PASSWORD ]
    #initdbScriptsConfigMap: mongodb-init-script
    EOF

Deploy MongoDB
-----------------

Once the database parameters have been altered to requirements, the MongoDB can 
now be deployed for the MongoDB database.

.. code:: bash
    #/bin/sh
    svcname=mongodb
    namespace=my-$svcname
    svcport=27017
    port=$svcport #627017 is out of range
    script=myddl.json

    kubectl create namespace $namespace

    #You can create an initial script but you will have to enable initdbScriptsConfigMap in the values.yaml file
    #init="https://gitlab.com/ska-telescope/path/to/your/json/create_tables_and_data.json?ref_type=heads"

    #curl $init > $script
    #kubectl create configmap $svcname-init-script --namespace=$namespace --from-file=$script

    helm install $svcname oci://registry-1.docker.io/bitnamicharts/$svcname -f values.yaml --namespace=$namespace 

    echo "Waiting for $svcname startup"
    sleep 10
    echo "Localhost forward on port $port"
    kubectl port-forward -n $namespace svc/$svcname $port:$svcport

You will be able to connect with this command:

.. code:: shell

    % mongosh 'mongodb://mongo@localhost:27017/devdb?authSource=devdb&authMechanism=SCRAM-SHA-256'
    Enter password: *********
    Current Mongosh Log ID:	655744501f719516b4aeded2
    Connecting to:		mongodb://<credentials>@localhost:27017/devdb?authSource=devdb&authMechanism=SCRAM-SHA-256&directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2
    Using MongoDB:		6.0.11
    Using Mongosh:		2.0.2

    For mongosh info see: https://docs.mongodb.com/mongodb-shell/

    Warning: Found ~/.mongorc.js, but not ~/.mongoshrc.js. ~/.mongorc.js will not be loaded.
    You may want to copy or rename ~/.mongorc.js to ~/.mongoshrc.js.
    devdb> 


