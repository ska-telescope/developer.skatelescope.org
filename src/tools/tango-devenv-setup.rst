Tango Development Environment set up
------------------------------------

Definition
===========================
The Development Environment is the set of processes and software tools used to create software.  

Tools include:
 - python version 3.7
 - TANGO-controls '9.3.3'
 - Visual Studio Code, PyCharm Community Edition
 - ZEROMQ '4.3.2'
 - OMNIORB '4.2.3'
 
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

Creating a Development Environment
==================================================
Download a image of ubuntu 18.04 like the following one: 
 - https://sourceforge.net/projects/osboxes/files/v/vb/55-U-u/18.04/18.04.2/18042.64.7z/download

Run the box and call the following commands:

.. code:: bash

    sudo apt -y install git
    git clone https://gitlab.com/ska-telescope/ansible-playbooks
    cd ansible-playbooks
    sudo apt-add-repository --yes --update ppa:ansible/ansible && sudo apt -y install ansible
    ansible-playbook -i hosts deploy_tangoenv.yml --extra-vars "ansible_become_pass=osboxes.org"
    sudo reboot

Start the tango system
======================
In order to start the tango system, just call the following commands:

.. code:: bash

    cd /usr/src/ska-docker/docker-compose
    make up
    make start tangotest


Other information
=================
Please visit the following gitlab pages for more information:

1. https://gitlab.com/ska-telescope/ansible-playbooks.
2. https://gitlab.com/ska-telescope/ska-docker
