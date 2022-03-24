.. _monitoring-dashboards:

STFC cluster
*****************

The STFC cluster is located at the SKAO headquarters, UK. Direct access to Openstack platforms used by SKAO is provided only to the System Team. Access to namespaced deployments and monitoring is available only through a VPN connection.

Connecting to the STFC VPN
===============================

For Accessing branch-based deployments of the MVP it is necessary to have a connection to the VPN. This will not only provide access to the iTango, Taranta and REST interfaces, but also allow usage of the KUBECONFIG that can be downloaded from the pipeline logs of the deployments - hence giving developers and testers kubectl access to their namespaced deployments.

In order to gain a VPN connection, you first need credentials.  To get them please contact the system team by sending a Slack message on `#team-system-support <https://skao.slack.com/archives/CEMF9HXUZ>`_ channel. Sharing these credentials has to be done in a secure way. We support two methods for doing this - GPG encryption, and LastPass. A GPG key is also required for SKA Developers for verifying their commits, so if you are a developer this is the preferred method.

Receiving your OVPN key using GPG encryption is a three-step process:

 1 Create and publish your GPG key
 2 Request VPN credentials from System Team
 3 Receive encrypted credentials and decrypt them.

Once the above three steps were followed, you should be able to connect as described under Connecting to the VPN.

Create your GPG key
===================

If you don’t already have a GPG key, the following steps can help you get started.
If you are using LastPass, you can ignore this step and continue to Request VPN credentials


As a prerequiste you need to install GPG for your operating system. If your operating system has gpg2 installed, 
replace gpg with gpg2 in the following commands.

If you are using Windows, you can install Gpg4win. IMPORTANT NOTE: tick all the boxes (GPA is deselected by default) when installing. Then create your GPG key following either the guide for the Command Line or the GUI below.

Command Line / Terminal
-----------------------

Generate the private/public key pair with the following command, which will spawn a series of questions:

.. code-block:: bash

    gpg --full-gen-key

In some cases like Gpg4win on Windows and macOS versions, the command here may be ``gpg --gen-key``.


The first question is which algorithm can be used. Select the kind you want or press Enter to choose the default (RSA and RSA):

.. code-block:: bash

   Please select what kind of key you want:
       (1) RSA and RSA (default)
       (2) DSA and Elgamal
       (3) DSA (sign only)
       (4) RSA (sign only)
   Your selection? 1
   
The next question is key length. We recommend you choose 4096: 

.. code-block:: bash

   RSA keys may be between 1024 and 4096 bits long.
   What keysize do you want? (2048) 4096
   Requested keysize is 4096 bits

Specify the validity period of your key. This is something subjective, and you can use the default value, which is to never expire:

.. code-block:: bash

   Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
   Key is valid for? (0) 0
   Key does not expire at all
   
Confirm that the answers you gave were correct by typing y:

.. code-block:: bash

   Is this correct? (y/N) y

Enter your real name, the email address to be associated with this key (should match a verified email address you use in GitLab) and an optional comment (press Enter to skip): 

.. code-block:: bash

   GnuPG needs to construct a user ID to identify your key.
 
   Real name: Mr. Robot
   Email address: <YOUR_EMAIL>
   Comment:
   You selected this USER-ID:
       "Mr. Robot <YOUR_EMAIL>"
 
   Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
   
Pick a strong password when asked and type it twice to confirm.
