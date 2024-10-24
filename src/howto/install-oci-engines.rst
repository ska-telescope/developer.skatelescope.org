OCI Engine Installation Guide
==============================

This guide provides step-by-step instructions on how to install OCI engines recommended for development purposes. The well-known Docker Desktop now has a restrictive license which makes it unsuitable for SKAO use. Therefore we recommend the installation of Podman instead. In :doc:`../explanation/containerization`, you can learn mode about the OCI (Open Container Initiative) and the various engines.

Installing Podman
-----------------

Podman is a Linux daemonless container engine for developing, managing, and running OCI Containers. While being built for Linux, Podman works on macOS and Windows by spinning up a guest Linux system, referred as a **Podman machine**.

**Ubuntu Linux/WSL**

1. Update your package index:

   .. code-block:: bash

      sudo apt-get update

2. Install Podman and dependent packages:

   .. code-block:: bash

      sudo apt install podman

**macOS**

.. note::
   We strongly suggest using Homebrew (https://brew.sh/) to install software on macOS that we rely on when developing software for SKAO.

1. Install QEMU (for the Podman machine):

   .. code-block:: bash

      brew install qemu

2. Install Podman. Dependent packages will automatically be installed too. Then start a Podman machine:

   .. code-block:: bash

      brew install podman
      podman machine init
      podman machine start

   Alternatively just install Podman Desktop:

   .. code-block:: bash

      brew install --cask podman-desktop

We do not support other distributions or OSes that what is listed above, but more details about how to install and run Podman elsewhere can be found at the `Podman’s installation guide <https://podman.io/getting-started/installation>`_.

**Wrapping up**

Finally, we can check if Podman is up and running:

  .. code-block:: bash

      podman info
      podman ps

Installing Docker
-----------------

Docker is the most popular containerization platform, with Linux, Windows (native) and macOS support. While being the most popular, the Docker Desktop product is now only available under a restrictive and commercial license. We do **not** recommend to use Docker Desktop for developing SKAO software.

**Ubuntu Linux/WSL**

1. Update your package index:

   .. code-block:: bash

      sudo apt-get update

2. Install packages to allow apt to use a repository over HTTPS:

   .. code-block:: bash

      sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common

3. Add Docker’s official GPG key:

   .. code-block:: bash

      curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

4. Add Docker's stable package repository:

   .. code-block:: bash

      sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

5. Install the Docker engine from the Docker repository:

   .. code-block:: bash

      sudo apt-get update
      sudo apt-get install docker-ce docker-ce-cli containerd.io

**Windows**

1. Follow the installation instructions from `Docker Hub <https://docs.docker.com/desktop/install/windows-install/>`_.

.. note::
   We do not support Windows as a development environment, so we strongly encourage setting up WSL instead. Check the official `Microsoft WSL installation instructions <https://learn.microsoft.com/en-us/windows/wsl/install>`_

**macOS**

1. Install Docker:

   .. code-block:: bash

      brew install docker

For more information, please visit the official `Docker documentation <https://docs.docker.com/desktop/>`_.

**Wrapping up**

Finally, we can check if Docker is up and running:

  .. code-block:: bash

      docker info
      docker ps


What's next
-----------

You now have Docker or Podman installed on your system. These tools are at the forefront of containerization technology, allowing for efficient, isolated, and scalable application deployment.

Now, feel free to explore the rest of the :doc:`/tutorial/oci-tutorial`.
