.. _binderhub.rst:

BinderHub/JupyterHub
*********************

BinderHub is a service that allows developers/scientists to share computational resources and code using Jupyter Notebooks in a kubernetes-based cluster environment.
A developer can create his Jupyter Notebooks, push them into a repository and, through BinderHub, create an environment where he can both execute and modify his code while collaborating with other developers.

Initial steps
=============

To access BinderHub, go to https://k8s.stfc.skao.int/binderhub/ and sign in using *<jira-username>@ad.skatelescope.org* and your JIRA password.

.. figure:: images/binderhub-home.png
   :scale: 40%
   :alt: BinderHub homepage
   :align: center
   :figclass: figborder

   BinderHub homepage

Once successfully logged in a user can enter the name/URL of its repository, including a Git ref if needed (HEAD will be the default), and click on the "launch" button.
BinderHub will then build a Docker image of the repository provided - pushing it into CAR - and launch it, creating a customized URL so that the collaboration can begin.

If a developer tries to launch a repository which has already been built the image will be pulled from CAR instead of being built again. A rebuild of the image will only happen if a new commit has been made.

It is important to note that the repository provided should **include a dependencies file** so that these are included when building the docker image.

Once the image has been launched JupyterHub will be presented showing the home folder of the launched server which contains the files from the selected repository. 

.. figure:: images/jupyterhub-launcher.png
   :scale: 40%
   :alt: JupyterHub Launcher
   :align: center
   :figclass: figborder

   JupyterHub Launcher

The developer can then navigate to its notebook and start collaborating!

.. figure:: images/jupyterhub-notebook.png
   :scale: 40%
   :alt: JupyterHub Notebook Example
   :align: center
   :figclass: figborder

   JupyterHub - Notebook Example

Another option is, if a user doesn't have an existing repo to import through BinderHub or simply wants to continue the work previously started, to begin the interaction from JupyterHub at https://k8s.stfc.skao.int/binderhub/jupyterhub/hub.
This will show the previously launched servers - if any - and provide options to:

* Create a new named server, start it and either create a new notebook or upload one from the local machine
* Start a previously stopped server, being able to pickup the work right where it was left 
* Stop or delete any servers that are no longer needed

.. figure:: images/jupyterhub-home.png
   :scale: 40%
   :alt: JupyterHub Home
   :align: center
   :figclass: figborder

   JupyterHub Home

Policies
========

To ensure that every developer has the same amount of resources available the following policies were defined:

* **Server names:** The name of a server should be limited to 20 characters;
* **Number of servers:** Each developer can have up to 5 named servers plus its own server (using the "My Server" option from JupyterHub);
* **Server timeout:** If a developer leaves a server running for more than 2 hours, without any kind if activity, it will automatically be stopped. It will be available to be started again, once needed, from JupyterHub;
* **Storage capacity:** Each server will have a maximum storage capacity of 2Gib;
* **Storage retention:** Once a server is started, it will have a volume mounted and associated to it to save the work in progress. If the server is stopped, the storage will be kept so that the work can continue once the server is started again. Still, once the server gets deleted, so will its associated storage;
* **CPU and RAM:** Each server will be limited to one CPU and 2GB of RAM.