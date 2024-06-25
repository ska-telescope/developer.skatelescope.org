.. _iam-client-configuration:



IAM Client Configuration
========================

.. toctree::
  :maxdepth: 1
  :caption: IAM Client Configuration
  :hidden:
  
Many SRCNet services require authentication through an IAM client. 
Additionally, the user creating the IAM client must belong to the 
groups specific to the service being configure.

1. **Create an Account**

   - Register if you are not a member or log in at `https://ska-iam.stfc.ac.uk/ <https://ska-iam.stfc.ac.uk/>`_.

2. **Log in and Set Up a Client**

   - Go to the dashboard at `https://ska-iam.stfc.ac.uk/dashboard#!/home <https://ska-iam.stfc.ac.uk/dashboard#!/home>`_.

3. **Configure the Client**

   - Navigate to *My Clients* and select *New Client*.
   
   - On the *Main* tab:

       - Enter a name and description (i.e. ```espsrc-client-rse````).
       - Enter a ```Redirect URI```. Ensure it matches the URI defined in the file configuration of your service deployment.


4. **Credentials**

   - On the *Credentials* tab:

       - Maintain all items by default

5. **Enable Scopes**

   - On the *Scopes* tab:

       - This will depend on the service you are deploying. For example for Rucio-RSE and most of the services, you will need to select ```email offline_access openid profile```.

6. **Save the Client**

   - One saved, get the ```Client ID```, ```Redirect URIs```, ```Client Secret``` and ```Client Scopes```, to include them into your configuration file of your service authentication.

For more information, visit: `IAM Client Registration <https://indigo-iam.github.io/v/v1.9.0/docs/tasks/user/client-registration/>`_.


