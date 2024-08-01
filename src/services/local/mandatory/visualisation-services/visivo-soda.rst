.. _visivo-soda:

Visualisation services
======================

Pre-requisites
--------------

.. _iam-visualisation-services:

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

       - Enter a name and description (i.e. ```espsrc-client-visivo-soda````).

4. **Credentials**

   - On the *Credentials* tab:

       - Maintain all items by default

5. **Grant types**

   - On the *Grant types* tab:

       - Ensure `authorization_code` and `refresh_token` grants are checked.

6. **Enable Scopes**

   - On the *Scopes* tab:

       - For this VisIVO-SODA service you will need to select ```email offline_access openid profile```.

7. **Save the Client**

   - One saved, get the ```Client Name``` and ```Client Secret```, to include them into your configuration file for the VisIVO Service `iamtoken.properties`.


Then create a file named `iamtoken.properties`:

.. code-block:: bash

    introspect=https://iam-escape.cloud.cnaf.infn.it/introspect
    client_name=<CLIENT_NAME>
    client_password=<CLIENT_PASSWORD>

VisIVO-SODA Service
-------------------

The SODA server provides access to FITS-files which are expected to reside on the Docker-host, in a directory like /srv/ska/datasets in this example:

.. code-block:: bash

    /srv/ska/
    └── datasets
    ├── cubes
    │ └── part-Eridanus_full_image_V3.fits
    └── images
    └── Eridanus_cont.fits


The files under ``datasets`` should have read-only access. Files can be in sub-directories to form collections or just placed directly to ``datasets`` directory.

The ``datasets`` directory must be visible from Docker-host and is external to the SODA-container. It will be mapped to a fixed internal path of the SODA-service when the SODA-container is started.


.. _docker-compose-visualisation-services:

Deployment
^^^^^^^^^^

The preferred way to run the service is docker compose.
Use ``compose.yaml`` like the one below to set context root and path to files.


.. code-block:: bash

    version: '3'
    services: 
    ska:
        container_name: ska
        image: registry.gitlab.com/ska-telescope/src/visivo-vlkb-soda:1.6.2
        ports:
            - <EXTERNAL_PORT>:8080
        environment:
            - SECURITY=<IAM_TOKEN>
            - ACCESS_CONTEXT_ROOT=ska#datasets
        volumes:
            - <STORAGE_FOLDER>:/srv/surveys:z,ro
        restart: always

The parameters are:

- `SECURITY`: leave blank for open access or set to 'iamtoken' for IAM-ESCAPE instance A&A. The 'SECURITY=iamtoken' setting activates an adaptor to IAM/Indigo authorization server, and performs token validation by 'introspect' endpoint. Resource servers performing this checks are clients to the authorization server, and need to have an account on it. The URL to the introspect endpoint and the account (client-name, secret) is configured in `iamtoken.properties` file (see IAM Configuration).
- `ACCESS_CONTEXT_ROOT`: web-application's context-path (for the URL: substitute '#' with slash `/` and append `soda`): http://<HOSTNAME:PORT>/ska/datasets/soda
- `RESPONSE_FORMAT`: `MIME-type` of the response. For SKA-SODA currently only `'application/fits'` is accepted.
- `<STORAGE_FOLDER>`: map the directory with FITS-file collections to a fixed `'/srv/surveys'`, which is the internal docker directory where SODA application expects the dataset collections.

Finally, the file named `iamtoken.properties`, created in the Pre-requisites must be placed in the datasets `<STORAGE_FOLDER>` directory (i.e. `/srv/ska/datasets/iamtoken.properties`).

The IAM-adaptor runs before the SODA-service. It reads the `iamtoken.properties`` file at startup of the SODA-docker. When a request with access-token arrives, the adaptor: 

- a) validates the access-token with the introspect endpoint. Then, if token is active, and 
- b) matches the path to the file for which the access-token was issued to that in the local-part of the ID SODA-parameter. If paths do not match, access is denied. Requests without access-token are not accepted.

