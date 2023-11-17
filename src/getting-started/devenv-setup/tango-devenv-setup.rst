.. _tango-devenv-setup:

************************************
Tango Development Environment set up
************************************

Many of the project's teams and developers are working on Tango devices and device servers.
This document describes how to set up a development environment for Tango controls.

Using Minikube
==============

During the initial years of the project, setting up a fully fledged Tango environment was a complex task that required
compiling tango-idl, cppTango and PyTango from source code to install them on the local machine.
In order to minimize this effort and ensure that the resulting environment was using the blessed versions for the project,
the SKAO created a set of container images and Helm deployment chart that should be used to set up a development environment.

There are still use cases where a Tango developer should be using this method for local development, and when building the base images
we still need to use this method. But for most cases, the developer can simply install it locally inside a virtual environment.

In any case, if a developer wants to use the kubernetes based approach, they should `Deploy minikube </tutorial/setup-minikube>`_ on their local machine and then follow the instructions on the
`Tango Examples Project <https://gitlab.com/ska-telescope/ska-tango-examples>`_.

After this, your system will be ready with a Minikube kubernetes deployment running the Tango operator and a set of Tango examples which you
can modify, or you can create your own project inside a new namespace.


Local installation
==================

Presently, deploying Tango locally for development, is a much simpler task than it used to be.

It is suggested to use a virtual environment to install Tango and PyTango, so that you can have multiple versions of PyTango installed in your system
and you can keep your base environment clean.

Create a new Poetry project:

.. code-block:: bash

    poetry new my-tango-project


Add the pytango dependency to your project:

.. code-block:: bash

    poetry add pytango

And now activate the environment with:

.. code-block:: bash

    poetry shell

You can also check the official `PyTango documentation <https://pytango.readthedocs.io/en/stable/contents.html>`_ for more information on how to use it.
