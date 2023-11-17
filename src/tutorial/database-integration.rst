
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

Set up the MariaDB database credentials (options):

* accept default values for ``TANGO_USER`` / ``TANGO_PASSWORD`` (tango/tango) - the most common option for a development enviroment
* define explicit environment variables for ``TANGO_USER`` / ``TANGO_PASSWORD``
* create/update Vault secrets for ``TANGO_USER`` / ``TANGO_PASSWORD``

Set up the MariaDB database credentials
---------------------------------------

Option 1: Development environment credentials
The MariaDB credentials are required for the connection between the DatabaseDS and the
database backend.  Typically, the developer would just rely on the defaults which are 
automatically set - these are username: ``tango`` password: ``tango``
 
Option 2: Custom enviroment credentials
To override the default credentials, define the following environment variables: ``TANGO_USER`` / ``TANGO_PASSWORD`` . 
These will be picked up by the following steps to seed the TangoDB and configure the 
connection with the DatabaseDS.

Option 3: Production enviroment credentials
Establish the associated secrets in Hashicorp Vault so that the secrets are picked up
by the following steps to seed the TangoDB and configure the connection with the DatabaseDS.

Prepare your enviroment
=======================

Prepare for the deployment of components by exporting the following environment variables
(substituting for your own values):

.. code:: bash

    $ export TANGO_USER=tango
    $ export TANGO_PASSWORD=tango
    $ export TANGO_DB_HOST=ska-tango-base-tangodb
    $ export KUBE_NAMESPACE=ska-tango-db


Deployment Option 1: deploy using ``make``
==========================================

Using the ``make`` style deployment is typically used for setting up a development enviroment.
To deploy using ``make``, first clone the ``ska-tango-images`` repository:

.. code:: bash

    $ git clone --recurse-submodules git@gitlab.com:ska-telescope/ska-tango-images.git
    $ cd ska-tango-images
 

Configure the deployment by creating a ``values.yaml`` file:

.. code:: bash

    $ cat << EOF >values.yaml
    global:
        minikube: true
        exposeDatabaseDS: true
        tango_host: databaseds-tango-base:10000
        cluster_domain: cluster.local
    tangodb:
        db:
            user: $TANGO_USER
            password: $TANGO_PASSWORD
    EOF


.. note::

    Delete the ``db`` YAML key above to just accept the default user/password.


Once the repository has been cloned (including submodules), run the make targets
for deployment:

.. code:: bash

    $ make k8s-install-chart KUBE_NAMESPACE=${KUBE_NAMESPACE} \
      RELEASE_NAME=tangodb \
      K8S_CHART_PARAMS=--values values.yaml

    ...
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
    $ kubectl -n ${KUBE_NAMESPACE} get svc ska-tango-base-tangodb

    ...
    NAME                     TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
    ska-tango-base-tangodb   NodePort   10.111.159.246   <none>        3306:32552/TCP   34m

    $ # extract the nodePort of the MariaDB
    $ kubectl -n ${KUBE_NAMESPACE} get svc ska-tango-base-tangodb -o=jsonpath="{.spec.ports[0].nodePort}"

    ...
    32552

    $ # identify the IP address of the node that nodePort MariaDB is on
    $ kubectl config view | grep server | awk '{print $2}' | cut -d ':' -f 2 | sed 's#//##'

    ...
    192.168.105.3

    $ # review the running service for the DatabaseDS
    $ kubectl -n ${KUBE_NAMESPACE} get svc databaseds-tango-base  

    ...
    NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP      PORT(S)           AGE
    databaseds-tango-base   LoadBalancer   10.100.154.253   192.168.105.97   10000:30150/TCP   31m

    $ # extract the external IP and Port
    $ kubectl -n ${KUBE_NAMESPACE} get svc databaseds-tango-base \
      -o=jsonpath="{.status.loadBalancer.ingress[0].ip}:{.spec.ports[0].port}"

    ...
    192.168.105.97:10000


Deployment Option 2: deploy using ``helm``
==========================================

Deploying the TangoDB is typically used for setting up a production like environment.  This fully 
emulates the independent deployment of a separate High Availability database that the DatabaseDS talks to.

Connect Helm repository
-----------------------

In order to deploy the Helm charts for both the TangoDB and the DatabaseDS it is 
necessary to create a repository connection to the associated Helm repository.

.. code:: bash

    $ helm repo add skao https://artefact.skao.int/repository/helm-internal

    ...
    "skao" has been added to your repositories

    $ helm repo update

    ...
    Hang tight while we grab the latest from your chart repositories...
    ...Successfully got an update from the "skao" chart repository
    Update Complete. ⎈Happy Helming!⎈

This has now added the repository of all the SKAO Helm charts.


Configure database parameters (``values.yaml``)
-----------------------------------------------

Prior to deploying the TangoDB, it may be necessary to customise the configuration.
Create a :literal:`values.yaml` and set parameters like so:

.. code:: bash

    $ cat << EOF >values.yaml
    architecture: standalone
    image:
        tag: 10.11-debian-11
    auth:
        database: tango
        username: $TANGO_USER
        password: $TANGO_PASSWORD
    initdbScriptsConfigMap: tangodb-init-script
    primary:
        service:
            type: LoadBalancer
    EOF

Further details of configuration options are in the `Bitnami charts <https://github.com/bitnami/charts/blob/main/bitnami/mariadb/README.md>`_ .


Deploy MariaDB
--------------

Once the database parameters have been altered to meet your requirements, the MariaDB can 
now be deployed for the TangoDB.

.. code:: bash

    $ init="https://gitlab.com/ska-telescope/ska-databases-metadata-scripts/-/raw/main/tangodb/tng.sql?ref_type=heads"
    $ curl $init > tng.sql
    $ kubectl create namespace ${KUBE_NAMESPACE}
    $ kubectl create configmap tangodb-init-script --namespace=${KUBE_NAMESPACE} --from-file=tng.sql
    $ helm install mariadb oci://registry-1.docker.io/bitnamicharts/mariadb --namespace=${KUBE_NAMESPACE} \
    --values values.yaml
    
    ...
    Pulled: registry-1.docker.io/bitnamicharts/mariadb:14.1.2
    Digest: sha256:e49a79e89a3e523bb1725632caa9318bc60d424740732a8e3a90eed6efabbddb
    NAME: mariadb
    LAST DEPLOYED: Fri Nov 17 11:34:59 2023
    NAMESPACE: ska-tango-db
    STATUS: deployed
    REVISION: 1
    TEST SUITE: None
    NOTES:
    CHART NAME: mariadb
    CHART VERSION: 14.1.2
    APP VERSION: 11.1.3

This has now deployed the TangoDB. You can now find the connection details
with the following:

.. code:: bash

    $ # review the running service for the TangoDB
    $ kubectl -n ${KUBE_NAMESPACE} get svc mariadb
    
    ...
    NAME      TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)          AGE
    mariadb   LoadBalancer   10.107.114.11   192.168.105.97   3306:32765/TCP   7s

    $ # extract the external IP and Port
    $ kubectl -n ${KUBE_NAMESPACE} get svc mariadb \
      -o=jsonpath="{.status.loadBalancer.ingress[0].ip}:{.spec.ports[0].port}"
    
    ...
    192.168.105.97:3306


Now add the expected ``Service`` name mapped to MariaDB so that the DatabaseDS
can find it:

.. code:: bash

    $ cat << EOF >mariadb-internal-service.yaml
    apiVersion: v1
    kind: Service
    metadata:
    labels:
        app.kubernetes.io/component: primary
        app.kubernetes.io/instance: mariadb
        app.kubernetes.io/name: mariadb-internal
    name: ${TANGO_DB_HOST}
    spec:
        type: ClusterIP
        ports:
        - name: mysql
            port: 3306
            protocol: TCP
            targetPort: mysql
        selector:
            app.kubernetes.io/component: primary
            app.kubernetes.io/instance: mariadb
            app.kubernetes.io/name: mariadb
    EOF

    $ kubectl -n ${KUBE_NAMESPACE} apply -f mariadb-internal-service.yaml
    
    ...
    service/ska-tango-base-tangodb created



Configure DatabaseDS parameters (``values.yaml``)
-------------------------------------------------

Prior to deploying the DatabaseDS, it may be necessary to customise the configuration.
Once the repository has been cloned (including submodules) as per the instructions 
from Option 1 above, create a :literal:`values.yaml` and set parameters like so:

.. code:: bash

    $ cd ska-tango-images
    $ cat << EOF >values.yaml
    global:
        minikube: true
        exposeDatabaseDS: true
        exposeAllDS: false
        tango_host: databaseds-tango-base:10000
        cluster_domain: cluster.local
    tangodb:
        enabled: false
        db:
            host: $TANGO_DB_HOST
            user: $TANGO_USER
            password: $TANGO_PASSWORD
    EOF


Deploy DatabaseDS
-----------------

Now run the make targets for deployment:

.. code:: bash

    $ cd ska-tango-images
    $ make k8s-install-chart KUBE_NAMESPACE=${KUBE_NAMESPACE} \
      RELEASE_NAME=tangodb \
      K8S_CHART_PARAMS=--values values.yaml

    ...
    Release "test" has been upgraded. Happy Helming!
    NAME: test
    LAST DEPLOYED: Fri Nov 17 10:01:05 2023
    NAMESPACE: ska-tango-db
    STATUS: deployed
    REVISION: 3
    TEST SUITE: None


This has now deployed the DatabaseDS. You can now find the connection details
with the following:

.. code:: bash

    $ # review the running service for the DatabaseDS
    $ kubectl -n ${KUBE_NAMESPACE} get svc databaseds-tango-base  

    ...
    NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP      PORT(S)           AGE
    databaseds-tango-base   LoadBalancer   10.100.154.253   192.168.105.97   10000:30150/TCP   31m

    $ # extract the external IP and Port
    $ kubectl -n ${KUBE_NAMESPACE} get svc databaseds-tango-base \
      -o=jsonpath="{.status.loadBalancer.ingress[0].ip}:{.spec.ports[0].port}"

    ...
    192.168.105.97:10000


This concludes the tutorial for deploying the TangoDB and DatabaseDS.
