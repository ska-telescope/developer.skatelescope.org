.. _`Visual Studio Code docker configuration`:

Visual Studio Code docker configuration
***************************************

These instructions show how to configure Visual Studio Code for SKA
control system development using the SKA Docker images. VSCode can
be configured to debug using the Python interpreter inside a Docker
image, which allows:

- development and testing without requiring a local Tango installation;
- the development environment to be identical to the testing and deployment
  environment, eliminating problems that occur due to differences in
  execution environment.

Limitations of VSCode docker container debugging compared to PyCharm:

* Unlike PyCharm Pro Edition, VSCode docker integration doesn't allow for
  code completion and linting using a docker container though. Therefore
  in order to have intellisense (code completion inside VSCode) and linting
  you will need to have a local installation of the project as well (i.e.
  a *pipenv* environment).

* VSCode remote debugging library *ptvsd* presently conflicts with *pytest*,
  meaning that debugging breakpoints cannot be set while running the automated
  unit testing. Still, you can set any particular unit test file as the entry
  point for debugging and set breakpoints normally in it. The developing
  approach should then be to run the unit tests from the terminal, and then
  in case of errors, to analyze the specific test routine from within the
  debugger in VSCode.

Improvements to debugging capabilities in VSCode compared to PyCharm:

* Unlike PyCharm, VSCode does allow for setting up breakpoints on
  non-asyncio modes.

Follow the steps below to configure VSCode to develop new code and run
tests for the tango-example project using the
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


Clone the tango-example project and get VSCode to recognize it
==============================================================

#. Clone the `tango-example repository`_ in your local machine.

#. Open VSCode from inside the *tango-example* folder.

.. _`tango-example repository`: https://gitlab.com/ska-telescope/tango-example


Build the application image (this step is optional)
===================================================

With the source code source code checked out, the next step is to build a
Docker image for the application. This image will contain the Python
environment which will we will later connect to VSCode.

Start a terminal session inside VSCode:

.. image:: vscode_terminal.png
    :align: center


On the terminal tab build the image by typing ``make build``. *This step is
optional since the ``make interactive`` command described bellow, takes
care of this task if needed*:

.. image:: vscode_build.png
    :align: center


Start the docker container in interactive mode and debug
========================================================

Having the built docker image in the system we now start the docker container
in interactive mode and are ready to debug.

* On the terminal tab start the container interactively with
  ``make interactive``:

.. image:: vscode_interactive.png
    :align: center

* Debug a particular file using the ``vscode-debug.sh`` utility inside
  the docker image. For instance
  ``./vscode-debug.sh powersupply/powersupply.py``:

.. image:: vscode_connect.png
    :align: center

Notice that the terminal shell now shows a message stating that it is waiting
for the debugger attachment:

.. code-block:: console

    tango@b2dbf52b73c7:/app$ ./vscode-debug.sh powersupply/powersupply.py 
    [+] Waiting for debugger attachment.

* You can now set breakpoints inside the VSCode editor (or use previously set
  ones):

.. image:: vscode_breakpoints.png
    :align: center

* Start the debugger from whitin VSCode by pressing ``F5`` or the *debug*
  button under the debug tab:

.. image:: vscode_debug.png
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
  
      docker run --rm -it -p 3000:3000 --name=powersupply-dev -e TANGO_HOST=databaseds:10000 --network=tango-example_default \
        -v /home/morgado/Sync/Work/Code/ska/tango-example:/app registry.gitlab.com/ska-telescope/tango-example/powersupply:latest /bin/bash
      docker: Error response from daemon: Conflict. The container name "/powersupply-dev" is already in use by container "215a9150910605a0670058a0023cbd2d180f1cea11d196b2a413910fb428e290". You have to remove (or rename) that container to be able to reuse that name.
      See 'docker run --help'.
      Makefile:59: recipe for target 'interactive' failed
      make: *** [interactive] Error 125
  
  In this case you need to check what are the docker containers running using
  ``docker ps``, and then kill the containers that are running in the background
  with ``docker kill CONTAINER_NAME``.
