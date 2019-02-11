Development Environment
-----------------------
Definition
===========================
The Development Environment is the set of processes and software tools used to create software.  

Processes include:
 - writing code (TBD),
 - testing code (in python with pytest, in C++ TBD),
 - packaging it (with Docker).

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

The above commands will create a new Ubuntu 18.04 box with the above packages installed and the TANGO framwork. 

Creating a Development Environment without Vagrant
==================================================
Download a image of ubuntu 18.04 like the following one: 
 - https://sourceforge.net/projects/osboxes/files/v/vb/55-U-u/18.04/1804164.7z/download

Run the box and call the following commands:

1. git clone https://github.com/ska-telescope/ansible-playbooks.git
2. cd ansible-playbooks
3. apt-add-repository --yes --update ppa:ansible/ansible && apt-get install ansible
4. ansible-playbook -i hosts deploy_tangoenv.yml 

Other information on https://github.com/ska-telescope/ansible-playbooks.

