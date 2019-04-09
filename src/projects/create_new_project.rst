Create a new project
--------------------

SKA developers are allowed to create new repositories under the SKA-telescope 
organisation git server.
When creating a new repo there is a number of aspects to be considered.

Mono VS Multi repositories
==========================

One of the first choices when creating a new project is how to split the code into repositories. 
In a project such as SKA there is no strict rule that can be applied, and a degree of judgement is 
necessary from the developers.
In general, a repository should be created for every software component following this definition: 

  *All software and firmware source code handed over to the SKA organisation shall be organised into source code repositories. A source code repository is a set of files and metadata, organized in a directory structure. It is expected that source code repositories map to individual applications or modules according to the following definition: A component is reusable, replaceable with something else that implements the same API, independently deployable, and encapsulates some coherent set of behaviors and responsibilities of the system.*
  
  -- *adapted from 'Continuous Delivery'*

Naming a repository
===================

Repository names shall clearly map to a particular element of the SKA software architecture,
as described in the SKA software design documentation. That is to say, someone familiar with the 
SKA software architecture shuold be able to identify the content of a repository just by its name. 

Names shall be all lowercase, multiple words shall be seprated by hypens. 


.. _repository-checklist:

Repository contents
===================

All software repositories shall host whatever is necessary to download and run the code
they contain. This does not only include code, but also documentation, dependencies and 
configuration data. Can someone external to the project point at your repository and 
have all the means to run your code? 
A software repository shall contain: 

.. admonition:: Repository Checklist

  * A *LICENSE* file (see :ref:`licensing`)
  * A README.md file containing basic instructions on what the repository contains. 
    And how to install, test and run the software
  * A *docs* folder containing RST formatted documentation (see :ref:`document-project`)
  * All application code and dependencies (e.g. libraries, static content etc... ) 
  * Any script used to create database schemas, application reference data etc... 
  * All the environment creation tools and artifacts described in the previous step (e.g. 
    Puppet or Ansible playbooks) 
  * Any file used to create containers (Dockerfile, docker-compose.yml ... ) 
  * All supported automated tests and any manual test scripts
  * Any script that supports code packaging, deployment, database migration
    and environment provisioning
  * All project artefacts (deployment procedures, release notes etc.. ) 
  * All cloud configuration files
  * Any other script or configuration information required to create infrastructure 
    that supports multiple services (e.g. enterprise service buses, database management
    systems, DNS zoe files, configuration rules for firewalls, and other networking devices)

  -- *adapted from 'The DevOps Handbook'* 


SKA Skeleton Projects
=====================

The SKA Organisation repository contain a number of skeleton projects which are intended to be forked
when starting a new project. 
The skeleton projects contain all necessary hooks to documentation, test harness, continuous integration, 
already configured according to SKA standards. 
