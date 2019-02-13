Development Environment
-----------------------
Definition
===========================
The Development Environment is the set of processes and software tools used to create software.  

Tools include:
 - python version 3.5
 - pip 19.0.2
 - pytest 4.1.0
 - pylint 0.13.0
 - g++ 7.3.0 (default ubuntu 18.04)
 - TANGO-controls '9.2.5a'
 - Visual Studio Code '1.30', PyCharm Community Edition 'community-2018.3.3'
 - ZEROMQ '4.0.5'
 - OMNIORB '4.2.1'
 
Processes include:
 - writing code,
 - testing code,
 - packaging it.
 
The main process is a python/c++ developer working with one tango device server writing one or more devices:

1. (optional) Work with pogo and create the device(s) needed;
2. Work with a text editor (such as pycharm or VSCode);
3. The tango framework is running locally (with docker) together with other runtime application (generally other devices) needed for the specific development so that the developer can test the device(s) just created;
4. In order to test the work done, the developer creates unit tests (with pytest);
5. The developer creates (if needed) a document for non-trivial testing (for instance for integration testing, usability testing and so on) if the test automation is not possible;
6. The developer creates (if not done before) the docker file in order to ship its work and execute it in a different environment (GitLab CI infrastructure); note that this step can be deleted if the docker file is already available for some kind of development (i.e. for python tango devices the docker file can be the same for every project;
7. The developer creates the file '.gitlab-ci.yml' for the GitLab CI integration;
8. The developer tests the project in GitLab.

Prerequisites
===========================
- VirtualBox installed	
- git
- Vagrant (optional)

Creating a Development Environment with Vagrant
===============================================
To create a box containing the Development Environment there are few commands to execute. They are:

1. git clone https://github.com/ska-telescope/ansible-playbooks.git
2. cd ansible-playbooks
3. vagrant up
4. vagrant provision

The above commands will create a new Ubuntu 18.04 box with the TANGO framwork installed and all the tools above. 

Creating a Development Environment without Vagrant
==================================================
Download a image of ubuntu 18.04 like the following one: 
 - https://sourceforge.net/projects/osboxes/files/v/vb/55-U-u/18.04/1804164.7z/download

Run the box and call the following commands:

1. git clone https://github.com/ska-telescope/ansible-playbooks.git
2. cd ansible-playbooks
3. apt-add-repository --yes --update ppa:ansible/ansible && apt-get install ansible
4. ansible-playbook -i hosts deploy_tangoenv.yml 

Start the tango system
======================
In order to start the tango system just call the following commands:

1. cd /usr/src/ska-docker/docker-compose
2. make up
3. make start tangotest

Other information
=================
Please visit the following github pages for more information:

1. https://github.com/ska-telescope/ansible-playbooks.
2. https://github.com/ska-telescope/ska-docker
