.. _container-development:

****************************
Development using containers
****************************

In order to manage dependencies and versioning inside the project,
developing using a containerized environment is recommended.

You can use either Docker or Podman to run the containers, although the tooling for Docker is more mature
and better tested.

Start by setting up your local environment as described in the
:doc:`Set up local development environment</getting-started/devenv-setup/local-development>`
documentation. This will set up the local environment with the necessary containerization tools and Visual Studio Code.

.. note::
  Most of the instructions in this document assume that you are using Docker,
  but should work with Podman except for the caveats mentioned on the
  `Docker documentation <https://code.visualstudio.com/remote/advancedcontainers/docker-options#_podman>`_.

VSCode can be configured to debug using the Python interpreter inside a Docker image, which allows:

* development and testing without requiring a local Tango installation;
* the development environment to be identical to the testing and deployment
  environment, eliminating problems that occur due to differences in
  execution environment.

Follow the steps below to configure VSCode to develop new code and run
tests for the ska-tango-examples project using the
Docker images for the project.

Prerequisites
=============
Make sure that the following prerequisites are met:

- Docker is installed, as described on the page `Docker Docs`_.
- `Visual Studio Code`_ must be installed.
- You have basic familiarity with VSCode - If this is the first time you have
  used VSCode, follow the `First Steps`_ tutorials so that you know how to
  use VSCode to develop, debug, and test a simple Python application using a
  local Python interpreter.

.. _`Docker Docs`: https://docs.docker.com/
.. _`Visual Studio Code`: https://code.visualstudio.com/
.. _`First Steps`: https://code.visualstudio.com/docs/python/python-tutorial


Clone the ska-tango-examples project and get VSCode to recognize it
===================================================================

#. Clone the `ska-tango-examples repository`_ in your local machine.

    .. code-block:: bash

        git clone --recurse-submodules https://gitlab.com/ska-telescope/ska-tango-examples.git

#. Open VSCode from inside the *ska-tango-examples* folder.

    .. code-block:: bash
      
        cd ska-tango-examples && code


.. _`ska-tango-examples repository`: https://gitlab.com/ska-telescope/ska-tango-examples



Build the application image (this step is optional)
===================================================

With the source code checked out, the next step is to build a
Docker image for the application. This image will contain the Python
environment which will we will later connect to VSCode.

Start a terminal session inside VSCode:

.. image:: vscode-terminal.png
    :align: center


On the terminal tab build the image by typing ``make oci-build``. *This step is
optional since the ``make interactive`` command described bellow, takes
care of this task if needed*:

.. image:: vscode-build.png
    :align: center


Start the docker container in interactive mode and debug
========================================================

Having the built docker image in the system we now start the docker container
in interactive mode and are ready to debug.

* On the terminal tab start the container interactively with
  ``make interactive``:

.. image:: vscode-interactive.png
    :align: center

* Debug a particular file using the ``vscode-debug.sh`` utility inside
  the docker image. For instance
  ``./vscode-debug.sh powersupply/powersupply.py``:

.. image:: vscode-connect.png
    :align: center

Notice that the terminal shell now shows a message stating that it is waiting
for the debugger attachment:

.. code-block:: console

    tango@b2dbf52b73c7:/app$ ./vscode-debug.sh powersupply/powersupply.py 
    [+] Waiting for debugger attachment.

* You can now set breakpoints inside the VSCode editor (or use previously set
  ones):

.. image:: vscode-breakpoints.png
    :align: center

* Start the debugger from within VSCode by pressing ``F5`` or the *debug*
  button under the debug tab:

.. image:: vscode-debug.png
    :align: center


.. note::
    For general information on how to use the native VSCode debugger, consult the
    `Debugging`_ documentation from VSCode.


.. _`Debugging`: https://code.visualstudio.com/Docs/editor/debugging

Troubleshooting
===============

- **make interactive fails**

  If the debugger is disconnected improperly, there is a possibility that the
  docker containers are left running in the background and it isn't possible
  to start a new interactive sessions from the VSCode terminal:
  
  .. code-block:: console
  
      docker run --rm -it -p 3000:3000 --name=powersupply-dev -e TANGO_HOST=databaseds:10000 --network=ska-tango-examples_default \
        -v /home/morgado/Sync/Work/Code/ska/ska-tango-examples:/app registry.gitlab.com/ska-telescope/ska-tango-examples/powersupply:latest /bin/bash
      docker: Error response from daemon: Conflict. The container name "/powersupply-dev" is already in use by container "215a9150910605a0670058a0023cbd2d180f1cea11d196b2a413910fb428e290". You have to remove (or rename) that container to be able to reuse that name.
      See 'docker run --help'.
      Makefile:59: recipe for target 'interactive' failed
      make: *** [interactive] Error 125
  
  In this case you need to check what are the docker containers running using
  ``docker ps``, and then kill the containers that are running in the background
  with ``docker kill CONTAINER_NAME``.
