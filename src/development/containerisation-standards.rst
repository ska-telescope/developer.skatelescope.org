.. doctest-skip-all
.. _code-guide:

.. raw:: html

    <style>
        div .figborder p.caption {margin-top: 10px;}
    </style>

.. todo::
    - Testing Guidelines
    - Writing Command-Line Scripts
    - Lots



**************************
Containerisation Standards
**************************

This section describes a set of standards, conventions and guidelines for building, integrating and maintaining Container technologies.

.. contents:: Table of Contents

Overview of Standards
=====================

These standards, best practices and guidelines are based 
on existing industry standards and tooling.  The main 
references are:

* `Open Container Initiative run-time sepcification <https://github.com/opencontainers/runtime-spec/releases/tag/v1.0.0>`_.
* `Open Container Initiative image specification <https://github.com/opencontainers/image-spec/releases/tag/v1.0.0>`_.
* `Container Network Interface <https://github.com/containernetworking/cni>`_.
* `Container Storage Interface <https://github.com/container-storage-interface/spec>`_.
* `Dockerfile best practices <https://docs.docker.com/develop/develop-images/dockerfile_best-practices/>`_.

The standards are broken down into the following areas:

* Structuring applications in a Containerised environment - general guidelines for breaking up application suites for running in a containerised environment
* Defining and building Container images - how to structure image definitions, and map your applications onto the image declaration
* Running Containerised applications - interfacing your application with the Container run time environment

Throughtout this documentation, `Docker <https://docs.docker.com/>`_ is used as the reference implementation, however the aim is to target compliance with the OCI specifications so it is possible to substitute in alternative Container Engines that are compatible.

Structuring Applications in a Containerised Environment
=======================================================


How does Containerisation work 
-------------------------------

Containerisation are a manifestation of a collection of features of the Linux kernel and OS based on:

* `Namespaces <https://en.wikipedia.org/wiki/Linux_namespaces>`_ - introduced in 2002 
* `Cgroups <https://en.wikipedia.org/wiki/Cgroups>`_ - introduced in January 2008
* `Capabilities <https://wiki.archlinux.org/index.php/capabilities>`_ (CAPS) - POSIX 1003.1e capabilities - predate namespaces, but gensis for Linux unknown - approximately Kernel 2.2 onwards
* File-system magic - such as `pivot_root <https://linux.die.net/man/8/pivot_root>`_, and `bind mounting <https://unix.stackexchange.com/questions/198590/what-is-a-bind-mount>`_ first appeared in Linux 2.4 - `circa 2001 <https://lwn.net/Articles/690679/>`_

These features combine to give a form of virtualisation that runs directly in the host system Kernel of Linux, where the Container is typically launched by a Container Engine such as `Docker <https://docs.docker.com/>`_.

**Namespaces** create the virtualisation effect by switching the init process of a Container into a separate namespace of the Kernel for processes, network stacks and mount tables so as to isolate the Container from all other running processes in the Kernel.
**Cgroups** provide a mechanism for controlling resource allocation eg: Memory, CPU, Net, and IO quotas, limits, priorities.
**Capabilities** are used to set the permissions that containerised processes have for performing system calls such as IO.
The **file-system magic** performed with pivot_root recasts the root of the file-system for the Container init process to a new mount point, typically the root of the Container image directory tree.  Bind mounting enables sharing file-system resources into a Container.


.. figure:: container-anatomy.png
   :scale: 40%
   :alt: Basic anatomy of a Container
   :align: center
   :figclass: figborder

   
   The basic anatomy of a Container and how it interfaces with host
   at run time.


Container Image
---------------

The Linux Kernel features make it possible for the Container Virtualisation to take place in the Kernel, and to have controls placed on the runtime of processes within that virtualisation.  The Container Image, is the first corner stone of the software contract between the developer of a Containerised application and the Container Engine that implements the Virtualisation.  The Image is used to encapsulate all the dependencies of the target application including executables, libraries, static configuration and sometimes static data.

The `OCI Image sepcification <https://github.com/opencontainers/image-spec/releases/tag/v1.0.0>`_ defines a standard for constructing the root file-system that a Containerised application is to be launched from.  The file-system layout of the image is just like the running application would expect and need as an application running in virtual server.  This can be as little as an empty ``/`` (root) directory for a fully statically linked executable, or it could be a complete OS file-system layout including ``/etc``, ``/usr``, ``/bin``, ``/lib``, ``/dev`` etc. - whatever the target application needs.

According to the OCI specification, these images are built up out of layers that typically start with a minimal OS such as `AlpineLinux <https://alpinelinux.org/>`_ with successive layers of modification, that might add libraries, and other application dependencies.

At Container launch, the image layers of the specified image are stacked up in ascending order using a `Union File-System <https://en.wikipedia.org/wiki/UnionFS>`_. This creates a complete virtual file-system view, that is read only (if an upper layer has the same file as a lower layer, the lower layer is masked).  Over the top of this a final read/write layer is added to complete the view that is passed into the Container as it's root file-system at runtime.


Network Integration
-------------------

Different Container Engines deal with networking in varying ways at runtime, but typically it comes in two flavours:

* host networking - the host OS network stack is pushed into the Container 
* a separate virtual network is constructed and `bridged <https://wiki.archlinux.org/index.php/Network_bridge>`_ into the Container namespace

There are variations available within Docker based on overlay, macvlan custom network plugins that conform to the `CNI <https://github.com/containernetworking/cni>`_ specification.

Hostname, and DNS resolution is managed by bind mounting a custom /etc/hosts and /etc/resolv.conf into the Container at runtime, and manipulating the `UTS namespace <https://en.wikipedia.org/wiki/Linux_namespaces#UTS>`_.


Storage Integration
-------------------

External storage required at runtime by the Containerised application is mapped into the Container using bind mounting.  This takes a directory location that is already present on the host system, and maps it into the specified location within the Container file-system tree.  This can be either files or directories.  The details of how specialised storage is made available to the Container is abstracted by the Container Engine which should support the `CSI specification <https://github.com/container-storage-interface/spec>`_ for drivers integrating storage solutions.  This is the same mechanism used to share specialised devices eg: ``/dev/nvidia0`` into a Container.


Structuring Containerised Applications
--------------------------------------

Each Containerised Application should be a single discrete application.  A good test for this is:

* is there a single executable entry point for the Container?
* is the running process fulfilling a single purpose?
* is the process independently maintainable and upgradable?
* is the running process independently scalable?

For example, ``iperf``, and ``apache2`` are correct, but putting ``NGiNX`` and ``PostgreSQL`` in a single Container is wrong.  This is because ``NGiNX`` and ``PostgreSQL`` should be independently maintained, upgraded and scaled.

A Containerised Application should also not need a specialised multi-process init process such as ``supervisord``.  As soon as this is forming part of the design, there should almost always be an alternative where each application controlled by the ``init`` process is put into a seaprate Container.  Often this can be because the design is trying to treat a Container like a full blown Virtual Machine through adding ``sshd``, ``syslog`` and other core OS services.  This is not an optimal design because these services will be multiplied up with the scalling of the Containerised Application wasting resources.  In both these example cases, ``ssh`` is not required because a Container can be attached to for diagnostic purposes eg: ``docker exec ...``, and it is possible to bind mount ``/dev/log`` from the host into a Container or configure the Containerised Application to point to ``syslog`` over TCP/UDP.

Take special care with signal handling - the Container Engine propogates signals to init process which should be the application (using the EXEC for of entry point).  If not it will be necessary to ensure that what ever  wrapper (executable, shell script etc.) is used propogates signals correctly to the actual application in the container.  This is particularly important at termination where th Engine will typically send a SIGHUP waiting for a specified timeout and then following up with a SIGKILL.  This could be harmful to stateful applications such as databases, message queues, or anything that requires an orderly shutdown.


Defining and Building Container Images
======================================

The core of a Containerised Application is the image.  According to the OCI specification, this is the object that encapsulates the executable and dependencies, external storage (VOLUMES) and the basics of the launch interface (the ENTRYPOINT and ARGS).


.. figure:: https://i.stack.imgur.com/Lm3Td.jpg
   :width: 200px
   :alt: Cattle not Pets
   :align: right

   Cattle not Pets!


The rules for building an image are specified in the ``Dockerfile`` which forms a kind of manifest.  Each rule specified creates a new layer in the image.  Each layer in the image represents a kind of high watermark of an image state which can ultimately be shared between different image builds.  Within the local image cache, these layer points can be shared between running Containers because as explained above, the image layers are stacked as a read only UnionFS.   This Immutability is a key concept in Containers.  Containers should not be considered mutable and therefore precious - 'they are cattle, not pets'! in the sense that it should be possible to destry and recreate them with (little or) no side effects.

If there is any file-system based state requirement for a Containerised application, then that requirement should be satisfied by mounting in storage.  This will mean that the Container can be killed and restarted at anytime, giving a pathway to upgradability and maintainability for the application.


The Image
---------

When structuring the image build eg: ``Dockerfile``, it is important to:

* minimise the size of the image, which will speed up the image pull from the repository and the Container launch
* minimise the number of layers to sped up the Container launch through speeding up the assembly process
* order the layers from most static to least static so that there is less churn and depth to the image rebuild process - why rebuild layers 1-5 if only 6 requires building.

Build Context
~~~~~~~~~~~~~

The basic build process is performed by:

.. code:: bash

    docker build -t <fully qualified tag for this image> \
                 -f path/to/Dockerfile \
                 project/path/to/build/context

The build context is a directory tree that is copied into the image build process, making all of those files available to subsequent ``COPY`` and ``ADD`` commands for adding content into the target image.  The size of the build context should be minimised in order to speed up the build process.  This should be done by specifying a path with in the project that contains only the files that are required to be added to the image.


- excluding files - speed of build, and security (ie. never COPY id_rsa ...)
- multi-stage builds and COPY --from=...
- minimise layers
- encapsulation of code and data
- base images
- labels
- args
- envs
- passing in variables - software component version control
- ordering - exploiting the build cache, and separation of statics and volitiles
- ADD or COPY + RUN vs RUN + curl
- USER and WORKDIR
- launching (process profile)
- ENTRYPOINT and CMD
- ONBUILD and the undead



What is the application interface contract for containers 




Naming and Tagging
------------------

Images should be tagged with:

- short commit hash as derived by ``git rev-parse --verify --short=8 HEAD`` eg: bbedf059 - this is useful on each feature branch build as it uniquely identifies branch HEAD on each push when used in conjunction with CI
- the current branch HEAD built image from CI should also have the additional tag of the branch name.  This assists with mapping image versions to feature development
- When an image version for an application is promoted to production, it should be tagged with the application version and 'latest' eg: for a tango device and a released image instance - hash tag: 9fab040a, version tags: 1.13.2,1.13,1 - where major/minor version point to the latest in that line


Development and test images will be periodically purged after N months, leaving the last version built.  All production images are kept indefinitely.

  This way anyone who looks at the image repository will have an idea of the context of a particular image version and can trace it back to the source



Image Tools
-----------

docker and others (eg: BuildKit, img, ...)

Development tools
-----------------

 - integration with: IDEs, Debuggers, Profilers




Image Storage
-------------
Docker v2 Registry API standard
SKA supported and/or hosted repositories
Integration with external and private
Tagging and version control (rules around deployment and 'latest')
Image signing (DCT)?







Running Containerised Applications
==================================


Container resource interface
----------------------------

Storage
Network
Compute
Memory
CPU
Devices



Service Discovery
-----------------


Runtime Contract
----------------

Configuration
 - env vars
 - config files

(prefer not to rely on 3rd party secret/config service integration eg: vault, consul etc.)


namespaces
clustering related applications

resource allocation
 - storage
 - ports
 - memory
 - cpu
 - devices

logging integration
 - emission standards - stdout/stderr, syslog [what are the rules for when these should be used?]
 - syslog - RFC5424
 - enriched logging (JSON)




Standard input, output, and errors
=====================================

Inputs/Outputs


Interactions (external to container, container to container)
 - stdin
 - signals
 - SHMEM/IPC
 - pipes

monitoring integration
 - liveness
 - readiness
 - telemetry

OS Interaction
 - loading kernel modules
 - tuning parameters (sysctl)






Dependencies
==========================

* dependencies


Documentation and Testing
=========================

* docs.




Examples
========

This section shows examples in order to illustrate points from the guidelines.



Acknowledgements
================

The present document's coding guidelines are derived from project
`a-source <http://example.com>`_.
