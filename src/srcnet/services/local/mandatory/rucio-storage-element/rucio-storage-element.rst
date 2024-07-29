.. _rucio-storage-element:


Rucio Storage Element (RSE)
===========================

.. toctree::
  :maxdepth: 1
  :caption: Rucio Storage Elements (RSE)
  :hidden:


A Rucio Storage Element (RSE) is the logical abstraction of a storage
system for physical files. Each of the installation methods for the
implementations supported by the SKAO Rucio Datalake are described here.


Prerequisites
-------------

IAM integration
^^^^^^^^^^^^^^^

To be part of the SKAO Datalake, it is necessary that the service for
the RSE in the local node is integrated within IAM Authorisation and
Authentication (A&A), for this it will be necessary to create an IAM client
and associate it to the service that enables the RSE.

Follow the next instructions to create and manage this IAM A&A client:

1. **Create an Account**

   - Register if you are not a member or log in at `https://ska-iam.stfc.ac.uk/ <https://ska-iam.stfc.ac.uk/>`_.

2. **Log in and Set Up a Client**

   - Go to the dashboard at `https://ska-iam.stfc.ac.uk/dashboard#!/home <https://ska-iam.stfc.ac.uk/dashboard#!/home>`_.

3. **Configure the Client**

   - Navigate to *My Clients* and select *New Client*.

   - On the *Main* tab:

       - Enter a name and description (i.e. ```espsrc-client-rse````).


4. **Credentials**

   - On the *Credentials* tab:

       - Maintain all items by default

5. **Grant types**

   - On the *Grant types* tab:

       - Ensure `authorization_code` and `refresh_token` grants are checked.

6. **Enable Scopes**

   - On the *Scopes* tab:

       - For the Rucio RSE you will need to select ```email offline_access openid profile```.

7. **Save the Client**

   - One saved, get the ```Client ID```, ```Redirect URIs```, ```Client Secret``` and ```Client Scopes```, to include them into your configuration file of the Rucio RSE client.

For more information, visit: `IAM Client Registration <https://indigo-iam.github.io/v/v1.9.0/docs/tasks/user/client-registration/>`_.


Deployment
----------

Choose the :doc:`storage-element <../../../dependent/storage-element/storage-element>` implementation that
fits best to your needs and the features of your storage infrastructure.
