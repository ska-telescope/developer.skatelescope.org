.. _data-management-api:

Data Management API
===================

.. note::
    - Support: https://skao.slack.com/archives/C05A1D147FV
    - Code Repository: https://gitlab.com/ska-telescope/src/src-service-apis/ska-src-data-management-api

Pre-requisites
--------------

.. _iam-data-management-api:

IAM Configuration
^^^^^^^^^^^^^^^^^

Follow the next instructions to create and manage this IAM A&A client:

1. **Create an Account (if not previously created)**:
   
   - Register if you are not a member or log in at `https://ska-iam.stfc.ac.uk/ <https://ska-iam.stfc.ac.uk/>`_.

2. **Log in and Set Up a Client**

   - Go to the dashboard at `https://ska-iam.stfc.ac.uk/dashboard#!/home <https://ska-iam.stfc.ac.uk/dashboard#!/home>`_.

3. **Configure the Client**

   - Navigate to *My Clients* and select *New Client*.

   - On the *Main* tab:

       - Enter a name and description (i.e. ```espsrc-data-management-api````).


4. **Credentials**

   - On the *Credentials* tab:

       - Maintain all items by default

5. **Grant types**

   - On the *Grant types* tab:

       - Ensure `authorization_code` and `refresh_token` grants are checked.

6. **Enable Scopes**

   - On the *Scopes* tab:

       - For this Data Management API service you will need to select ```openid profile```.

7. **Save the Client**

   - One saved, get the ```Client ID``` and ```Client Secret```, to include them into your configuration file for `.env` or `values.yaml`.


Deployment
----------

Deployment is managed by `docker-compose` or helm. The `docker-compose`` file can be used to bring up the necessary services locally i.e. the REST API, setting the mandatory environment variables. Sensitive environment variables, including those relating to the IAM client, should be kept in `.env` files to avoid committing them to the repository.

The first step is to clone the next repository and `cd` to the folder of the service:

.. code-block:: bash

    git clone  https://gitlab.com/ska-telescope/src/src-service-apis/ska-src-data-management-api.git
    cd ska-src-data-management-api

Then, continue with your installation method, via docker-compose or via helm.

.. _container-data-management-api:

Container - docker compose
^^^^^^^^^^^^^^^^^^^^^^^^^^

Edit the `.env.template` file accordingly and rename to `.env`:

.. code-block:: bash

    API_IAM_CLIENT_SECRET=<>
    SITE_CAPABILITIES_CLIENT_SECRET=
    GEOIP_LICENSE_KEY=
    RUCIO_ADMIN_CLIENT_SECRET=

Run the service: 

.. code-block:: bash

    docker-compose up -d

.. _helm-data-management-api:

Kubernetes - Helm 
^^^^^^^^^^^^^^^^^

First, edit the `values.yaml` (template in `/etc/helm/values.yaml.template`):

.. code-block:: bash

    image_registry_url: registry.gitlab.com/ska-telescope/src/src-service-apis/ska-src-data-management-api/api
    image_tag: data-management.srcdev.skao.int
    svc:
        api:
            root_path: /api
            scheme:
            iam_client_conf_url: https://ska-iam.stfc.ac.uk/.well-known/openid-configuration
            iam_client_id: <IAM_CLIENT_ID>
            iam_client_secret: <IAM_CLIENT_SECRET>
            iam_client_scopes: "openid profile"
            iam_client_audience: data-management-api
            permissions_api_url: https://permissions.srcdev.skao.int/api/v1
            permissions_service_name: data-management-api
            permissions_service_version: 1
            schemas_relpath: ../../../etc/schemas
            metadata_schema_name: metadata.json
            site_capabilities_url: https://site-capabilities.srcdev.skao.int/api/v1
            site_capabilities_client_id: <SITE_CAPABILITIES_CLIENT_ID>
            site_capabilities_client_secret: <SITE_CAPABILITIES_CLIENT_SECRET>
            site_capabilities_client_scopes: openid profile site-capabilities-api-service
            site_capabilities_client_audience: site-capabilities-api
            geoip_license_key:
            rucio_host_url: https://rucio.srcdev.skao.int/
            rucio_iam_token_endpoint: https://iam-escape.cloud.cnaf.infn.it/token
            rucio_admin_client_id: <RUCIO_ADMIN_CLIENT_ID>
            rucio_admin_client_secret: <RUCIO_ADMIN_CLIENT_SECRET>
            rucio_admin_client_scopes: openid profile offline_access wlcg.groups
            rucio_admin_client_audience: rucio https://wlcg.cern.ch/jwt/v1/any
            rucio_account: root
            cache_type: redis
            cache_host: cache
            cache_port: 6379
    ing:
        api:
            host: data-management.srcdev.skao.int

Change the next fields with the corresponding values:

    - `<IAM_CLIENT_ID>`: 
    - `<IAM_CLIENT_SECRET>`:
    - `<SITE_CAPABILITIES_CLIENT_ID>`: 
    - `<SITE_CAPABILITIES_CLIENT_SECRET>`:
    - `<RUCIO_ADMIN_CLIENT_ID>`:
    - `<RUCIO_ADMIN_CLIENT_SECRET>`:

Then, create a new namespace in kubernetes:

.. code-block:: bash

    create namespace ska-src-data-management-api

and install the helm in this namespace:

.. code-block:: bash
    
    helm install --namespace ska-src-data-management-api ska-src-data-management-api

    or

    helm install --namespace ska-src-data-management-api ska-src-data-management-api --values values.yaml



