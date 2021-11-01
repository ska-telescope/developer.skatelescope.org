Tango Development Environment set up
------------------------------------

Definition
===========================
The Development Environment is the set of processes and software tools used to create software.

Tools include:
 - python version 3.8
 - TANGO-controls '9.3.3'
 - Visual Studio Code
 - ZEROMQ '4.3.2'
 - OMNIORB '4.2.3'

Processes include:
 - writing code,
 - testing code,
 - packaging it.

The main process is a python/c++ developer working with one tango device server writing one or more devices:

1. (optional) Work with pogo and create the device(s) needed;
2. Work with a text editor (such as VSCode);
3. The tango framework is running locally (with containers) together with other runtime application (generally other devices) needed for the specific development so that the developer can test the device(s) just created;
4. In order to test the work done, the developer creates unit tests (with pytest);
5. The developer creates (if needed) a document for non-trivial testing (for instance for integration testing, usability testing and so on) if the test automation is not possible;
6. The developer creates (if not done before) the `Dockerfile` in order to ship its work and execute it in a different environment (GitLab CI infrastructure); note that this step can be deleted if the `Dockerfile` is already available for some kind of development (i.e. for python tango devices the `Dockerfile` can be the same for every project);
7. The developer creates the file '.gitlab-ci.yml' for the GitLab CI integration;
8. The developer tests the project in GitLab.


Creating a Development Environment
==================================================

Working with Tango
==================

In order to start working with tango you should refer to the documentation on `Tango Example Project </projects/ska-tango-examples/en/latest/?badge=latest#>`_.
This project describes how to install a tango environment including pytango with containers in a kubernetes(minikube) environment so that is structured to use k8s for development and testing so that the build environment, test environment and test results are all completely reproducible and are independent of host environment

You should follow this documentation to start tango on a kubernetes environment using `Minikube <https://gitlab.com/ska-telescope/sdi/ska-cicd-deploy-minikube>`_.*(Note: This project is already mentioned the above project but to get the latest minikube environment follow the documentation)*

The `Tango Example Project </projects/ska-tango-examples/en/latest/?badge=latest#>`_ project describes 

Other information
=================
Please visit the following gitlab pages for more information:

1. https://gitlab.com/ska-telescope/ska-tango-images.
2. https://gitlab.com/ska-telescope/ska-skampi.
