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

This section describes a set of standards, conventions and guidelines for building, integrating and maintaining Container
technologies.

.. contents:: Table of Contents

Overview of Standards
=====================

These standards, best practices and guidelines are based 
on existing industry standards and tooling.  The main 
references are:

* `Open Container Initiative run-time sepcification <https://github.com/opencontainers/runtime-spec/releases/tag/v1.0.0>`_.
* `Open Container Initiative image sepcification <https://github.com/opencontainers/image-spec/releases/tag/v1.0.0>`_.
* `Container Network Interface <https://github.com/containernetworking/cni>`_.
* `Container Storage Interface <https://github.com/container-storage-interface/spec>`_.
* `Dockerfile best practices <https://docs.docker.com/develop/develop-images/dockerfile_best-practices/>`_.

The standards are broken down into the following areas:

* Structuring applications in a Containerised environment - general guidelines for breaking up application suites for running in a containerised environment
* Defining and building Container images - how to structure image definitions, and map your applications onto the image declaration
* Running Containerised applications - interfacing your application with the Container run time environment


Structuring Applications in a Containerised Environment
=======================================================


General directions

.. figure:: container-anatomy.png
   :scale: 40%
   :alt: Basic anatomy of a Container
   :align: center
   :figclass: figborder

   
   The basic anatomy of a Container and how it interfaces with host
   at run time.




Defining and Building Container Images
======================================




Naming and Tagging
------------------

Images should be tagged with:

- short commit hash as derived by`git rev-parse --verify --short=8 HEAD` eg: bbedf059 - this is useful on each feature branch build as it uniquely identifies branch HEAD on each push when used in conjunction with CI
- the current branch HEAD built image from CI should also have the additional tag of the branch name.  This assists with mapping image versions to feature development
- When an image version for an application is promoted to production, it should be tagged with the application version and 'latest' eg: for a tango device and a released image instance - hash tag: 9fab040a, version tags: 1.13.2,1.13,1 - where major/minor version point to the latest in that line


Development and test images will be periodically purged after N months, leaving the last version built.  All production images are kept indefinitely.

  This way anyone who looks at the image repository will have an idea of the context of a particular image version and can trace it back to the source




- build context
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
