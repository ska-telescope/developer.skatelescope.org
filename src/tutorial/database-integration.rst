
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
DatabaseDS components both for development and the Production environment.  There are 
multiple ways in which these components can be deployed driven by the requirements of 
the target system - development, test, production.

For instance - Developers can automatically deploy a combined TangoDB/DatabaseDS using
the appropriate ``make`` targets, test environments can be deployed in the same way, or by 
using ``helm`` to deploy the components independently, and production will be deployed
using independent components and an HA MariaDB instance.


.. contents:: Table of Contents


Prerequisites
=============

The following preconditions are required, so that there is a connection available to 
the target Kubernetes cluster for the Database deployment:

* A target Kubernetes enviroment set as the current ``KUBECONFIG`` context (mini-howto)
* ``kubectl`` is installed
* ``helm`` is installed
* ``make`` is installed
* ``git`` commandline tools are installed

Optional Credential Handling Flows
==================================

There are three options for handling database credentials when deploying the Tango DB
 component.  These directly relate to the target environment and require the selection 
 and configuration of different credentials for each.

Setup the MariaDB database credentials (options):
* accept default values for ``TANGO_USER`` / ``TANGO_PASSWORD`` (tango/tango) - the most common option for a development enviroment
* define explicit environment variables for ``TANGO_USER`` / ``TANGO_PASSWORD``
* create/update Vault secrets for ``TANGO_USER`` / ``TANGO_PASSWORD``

Prepare for the deployment of components by exporting the following environment variables,
substituting for your own values:

.. code:: bash

    $ export TANGO_USER=tango
    $ export TANGO_PASSWORD=tango


Setup the MariaDB database credentials
--------------------------------------

Option 1:
The MariaDB credentials are required for the connection between the DatabaseDS and the
 Database backend.  typically, the developer would just rely on the defaults which are 
automatically set - these are username: ``tango`` password: ``tango``

Option 2:
To override the default credentials, define the following environment variables: ``TANGO_USER`` / ``TANGO_PASSWORD`` . 
These will be picked up by the following steps to seed the TangoDB and configure the 
connection with the DatabaseDS.

Option 3:
Establish the associated secrets in Hashicorp Vault so that the secrets are picked up
 by the following steps to seed the TangoDB and configure the connection with the DatabaseDS.


Deployment Option 1: deploy using ``make``
==========================================

To deploy using ``make``, first clone the ``ska-tango-images`` repository:

.. code:: bash

    $ git clone --recurse-submodules git@gitlab.com:ska-telescope/ska-tango-images.git
    Cloning into 'ska-tango-images'...
    remote: Enumerating objects: 12610, done.
    remote: Counting objects: 100% (57/57), done.
    remote: Compressing objects: 100% (57/57), done.
    remote: Total 12610 (delta 15), reused 0 (delta 0), pack-reused 12553
    Receiving objects: 100% (12610/12610), 771.96 MiB | 15.77 MiB/s, done.
    Resolving deltas: 100% (7711/7711), done.
    Submodule '.make' (https://gitlab.com/ska-telescope/sdi/ska-cicd-makefile.git) registered for path '.make'
    Cloning into '/Users/p.harding/git/public/ska-telescope/ska-tango-images/.make'...
    remote: Enumerating objects: 3728, done.        
    remote: Counting objects: 100% (3728/3728), done.        
    remote: Compressing objects: 100% (1400/1400), done.        
    remote: Total 3728 (delta 2316), reused 3679 (delta 2284), pack-reused 0        
    Receiving objects: 100% (3728/3728), 6.84 MiB | 13.91 MiB/s, done.
    Resolving deltas: 100% (2316/2316), done.
    Submodule path '.make': checked out '93828e42b0b1415b674281257d09df04c8b87a8b'

Configure the deployment by creating a ``values.yaml`` file:

.. code:: bash

    $ cd ska-tango-images
    cat << EOF >values.yaml
    global:
        minikube: true
        exposeDatabaseDS: true
        exposeDatabaseDS: true
        tango_host: databaseds-tango-base:10000
        cluster_domain: cluster.local
    tangodb:
        db:
            user: $TANGO_USER
            password: $TANGO_PASSWORD
    EOF

Once the repository has been cloned (including submodules), run the make targets
for deployment:

.. code:: bash

    $ cd ska-tango-images
    $ make k8s-install-chart KUBE_NAMESPACE=ska-tango-db \
      RELEASE_NAME=tangodb \
      K8S_CHART_PARAMS=--values values.yaml
    make helm-pre-publish
    make[1]: Entering directory '/Users/p.harding/git/public/ska-telescope/ska-tango-images'
    helm-pre-publish: generating charts/ska-tango-base/values.yaml
    make[1]: Leaving directory '/Users/p.harding/git/public/ska-telescope/ska-tango-images'
    k8s-pre-install-chart: setting up charts/values.yaml
    ...
    Update Complete. ⎈Happy Helming!⎈
    Saving 2 charts
    Deleting outdated charts
    Name:         ska-tango-db
    Labels:       kubernetes.io/metadata.name=ska-tango-db
    Annotations:  <none>
    Status:       Active

    No resource quota.

    No LimitRange resource.
    install-chart: install ./charts/ska-tango-umbrella/  release: test in Namespace: ska-tango-db with params: --set global.minikube=true  --set global.exposeDatabaseDS=true  --set global.exposeAllDS=true  --set global.tango_host=databaseds-tango-base:10000 --set global.device_server_port=45450 --set global.cluster_domain=cluster.local
    helm upgrade --install test \
    --set global.minikube=true  --set global.exposeDatabaseDS=true  --set global.exposeAllDS=true  --set global.tango_host=databaseds-tango-base:10000 --set global.device_server_port=45450 --set global.cluster_domain=cluster.local \
    ./charts/ska-tango-umbrella/  --namespace ska-tango-db
    Release "test" has been upgraded. Happy Helming!
    NAME: test
    LAST DEPLOYED: Fri Nov 17 10:01:05 2023
    NAMESPACE: ska-tango-db
    STATUS: deployed
    REVISION: 3
    TEST SUITE: None


This has now deployed the TangoDB and the DatabaseDS. You can now find the connection details
with the following:

.. code:: bash

    $ # review the running service for the TangoDB
    $ kubectl -n ska-tango-db get svc ska-tango-base-tangodb
    NAME                     TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
    ska-tango-base-tangodb   NodePort   10.111.159.246   <none>        3306:32552/TCP   34m
    $ # extract the nodePort of the MariaDB
    $ kubectl -n ska-tango-db get svc ska-tango-base-tangodb -o=jsonpath="{.spec.ports[0].nodePort}"
    32552
    $ # identify the IP address of the node that nodePort MariaDB is on
    $ kubectl config view | grep server | awk '{print $2}' | cut -d ':' -f 2 | sed 's#//##'
    192.168.105.3
    $ # review the running service for the DatabaseDS
    $ kubectl -n ska-tango-db get svc databaseds-tango-base  
    NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP      PORT(S)           AGE
    databaseds-tango-base   LoadBalancer   10.100.154.253   192.168.105.97   10000:30150/TCP   31m
    $ # extract the external IP and Port
    $ kubectl -n ska-tango-db get svc databaseds-tango-base -o=jsonpath="{.status.loadBalancer.ingress[0].ip}:{.spec.ports[0].port}"
    192.168.105.97:10000


Deployment Option 2: deploy using ``helm``
==========================================


Connect Helm repository
-----------------------

In order to deploy the Helm charts for both the TangoDB and the DatabaseDS it is 
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

Prior to deploying the TangoDB, it maybe necessary to customise the configuration.
Create a :literal:`values.yaml` and set parameters like so:

.. code:: bash

    cat << EOF >values.yaml
    architecture: standalone
    image:
        tag: 10.11-debian-11
    auth:
        database: tango
        username: $TANGO_USER
        password: $TANGO_PASSWORD
    initdbScriptsConfigMap: tangodb-init-script
    EOF


Deploy MariaDB
--------------

Once the database parameters have been altered to requirements, the MariaDB can 
now be deployed for the TangoDB.

.. code:: bash

    namespace=my-mariadb
    port=63306
    init="https://gitlab.com/ska-telescope/ska-databases-metadata-scripts/-/raw/main/tangodb/tng.sql?ref_type=heads"
    curl $init > tng.sql
    kubectl create namespace $namespace
    kubectl create configmap tangodb-init-script --namespace=$namespace --from-file=tng.sql
    helm install mariadb oci://registry-1.docker.io/bitnamicharts/mariadb --namespace=$namespace \
    --values values.yaml
    echo "Waiting for mariadb startup"
    sleep 10
    echo "Localhost forward on port $port"
    kubectl port-forward -n $namespace svc/mariadb $port:3306


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
        database: tango
        username: $TANGO_USER
        password: $TANGO_PASSWORD
    initdbScriptsConfigMap: tangodb-init-script
    EOF




Deploy DatabaseDS
-----------------

Once the database parameters have been altered to requirements, the MariaDB can 
now be deployed for the TangoDB.

.. code:: bash

    namespace=my-mariadb
    port=63306
    init="https://gitlab.com/ska-telescope/ska-databases-metadata-scripts/-/raw/main/tangodb/tng.sql?ref_type=heads"
    curl $init > tng.sql
    kubectl create namespace $namespace
    kubectl create configmap tangodb-init-script --namespace=$namespace --from-file=tng.sql
    helm install mariadb oci://registry-1.docker.io/bitnamicharts/mariadb --namespace=$namespace \
    --values values.yaml
    echo "Waiting for mariadb startup"
    sleep 10
    echo "Localhost forward on port $port"
    kubectl port-forward -n $namespace svc/mariadb $port:3306



Extract connection details (DB connection and TANGO_HOST)
---------------------------------------------------------




