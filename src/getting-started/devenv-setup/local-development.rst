.. _local-development:

***********************************
Setup local development environment
***********************************

These instructions assume you are using Ubuntu 22.04 as your development OS,
but some brief explanation and/or official documentation will be provided so that
you can adapt the instructions to other OSes.

Install the needed base system packages
=======================================

The base packages that you need are python3 venv, git, and the build tools (gcc, make, etc).
On Ubuntu 22.04, you can install them with the following command:

.. code-block:: bash

    sudo apt install git python3-venv build-essential

Set up your Git global configuration
====================================

.. code-block:: bash

    git config --global user.name "Your Name"
    git config --global user.email "Your Institutional Email"

Set python 3 as the default python version
==========================================

Instructions will vary between OSs, but Ubuntu already provides an handy utility package for this purpose:

.. code-block:: bash

    sudo apt install python-is-python3

Install Poetry
==============

Poetry provides an automated install script that will work on most OSes.
Check the `Poetry official documentation`_ official documentation for more details.

.. code-block:: bash

    curl -sSL https://install.python-poetry.org | python3 -

.. _`Poetry official documentation`: https://python-poetry.org/docs

Install Docker
==============

Follow the `Official docker documentation`_ for your OS to install docker.
If you are using a Linux flavour, make sure to follow the `linux post install`_ instructions as well.

.. _`Official docker documentation`: https://docs.docker.com/engine/install/
.. _`linux post install`: https://docs.docker.com/engine/install/linux-postinstall/


Configure Visual Studio Code for local development
==================================================

Although the user can use any IDE of choice, these instructions will focus on
setting up Visual Studio Code for local development as it is the recommended
IDE for the project.

Mostly, the user must install the following extensions:

* `Docker`_
* `Kubernetes`_
* `Python`_

It is also recommended to install the following extensions:

* `GitLens`_
* `Jupyter`_
* `Makefile Tools`_
* `YAML`_

.. _`Docker`: https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker
.. _`Python`: https://marketplace.visualstudio.com/items?itemName=ms-python.python
.. _`GitLens`: https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
.. _`Jupyter`: https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter
.. _`Kubernetes`: https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools
.. _`Makefile Tools`: https://marketplace.visualstudio.com/items?itemName=ms-vscode.makefile-tools
.. _`YAML`: https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml

The default configuration for these extensions will be enough for the user to get started.

.. note::
    Another IDE used by a sizeable number of developers in the SKAO is `PyCharm`_, but some of its functionality,
    specifically parts related to remote and container development, are not available in the free version.

.. _`PyCharm`: https://www.jetbrains.com/pycharm/

.. _local-development:

***********************************
Setup local development environment
***********************************

These instructions assume you are using Ubuntu 22.04 as your development OS,
but some brief explanation and/or official documentation will be provided so that
the user can adapt the instructions to other OSes.

Install the needed base system packages
=======================================

The base packages that you need are python3 venv, git, and the build tools (gcc, make, etc).
On Ubuntu 22.04, you can install them with the following command:

.. code-block:: bash

    sudo apt install git python3-venv build-essential

Setup your Git global configuration
===================================

.. code-block:: bash

    git config --global user.name "Your Name"
    git config --global user.email "Your Institutional Email"

Set python 3 as the default python version
==========================================

Instructions will vary between OSs, but ubuntu already provides an handy utility package for this purpose:

.. code-block:: bash

    sudo apt install python-is-python3

Install Poetry
==============

Poetry provides an automated install script that will work on most OSes.
Check the `Poetry official documentation`_ official documentation for more details.

.. code-block:: bash

    curl -sSL https://install.python-poetry.org | python3 -

.. _`Poetry official documentation`: https://python-poetry.org/docs

Install Docker
==============

Follow the `Official docker documentation`_ for your OS to install docker.
If you are using a linux flavour, make sure to follow the `linux post install`_ instructions as well.

.. _`Official docker documentation`: https://docs.docker.com/engine/install/
.. _`linux post install`: https://docs.docker.com/engine/install/linux-postinstall/


Configure Visual Studio Code for local development
==================================================

Although the user can use any IDE of choice, these instructions will focus on
setting up Visual Studio Code for local development as it is the recommended
IDE for the project.

Mostly, the user must install the following extensions:

* `Docker`_
* `Kubernetes`_
* `Python`_

It is also recommended to install the following extensions:

* `GitLens`_
* `Jupyter`_
* `Makefile Tools`_
* `YAML`_

.. _`Docker`: https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker
.. _`Python`: https://marketplace.visualstudio.com/items?itemName=ms-python.python
.. _`GitLens`: https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
.. _`Jupyter`: https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter
.. _`Kubernetes`: https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools
.. _`Makefile Tools`: https://marketplace.visualstudio.com/items?itemName=ms-vscode.makefile-tools
.. _`YAML`: https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml

The default configuration for these extensions will be enough for the user to get started.

.. note::
    Another IDE used by a sizeable number of developers in the SKAO is `PyCharm`_, but some of its functionality,
    specifically parts related to remote and container development, are not available in the free version.

.. _`PyCharm`: https://www.jetbrains.com/pycharm/

