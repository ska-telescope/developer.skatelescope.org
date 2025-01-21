.. _container-cheat-sheet:

Container Standards CheatSheet
******************************

A summary of the standards to be used as a checklist.


.. admonition:: Reference Implementation

   Throughout  `Docker <https://docs.docker.com/>`_ is used as the reference implementation with the canonical version being Docker 18.09.4 CE API version 1.39.


Structuring applications in a Containerised Environment
=======================================================

* Each containerised application should be a single discrete application.
* A containerised application should not need a specialised multi-process init process such as ``supervisord`` as there should not be multiple parent processes.
* Ensure that signal handling is correctly propagated from PID 1 to the containerised application so that container engine SIGHUP and SIGKILL are correctly handled.
* There should be one container image per application with one application per Git repository in order to correctly manage independent release cycles.

Defining and Building Container Images
======================================

* Containers are immutable by design - it should be possible to destroy and recreate them with (little or) no side effects.
* Do not store state inside a containerised application - always mount in storage for this purpose keeping containers ephemeral.
* Minimise the size and number of layers of the image to speed up image transfer and container launch.
* Order the layers from most static to least static to reduce churn and depth to the image rebuild process.
* All directives and key words should be in upper case.
* All element names should be in lower case - image labels and tags, and arguments (``ARG``) apart from environment variables (``ENV`` - upper case).
* Liberally use comments (lines starting with ``#``) to explain each step of the build and describe any external dependencies.
* Where multi-line arguments are used such as ``RUN apt-get install ...``, sort them for ease of reading.
* The size of the build context should be minimised in order to speed up the build process.
* Always be careful to exclude unnecessary and sensitive files from the image build context.
* Break the build process into multiple images so that core and common builds can be shared with other applications.
* Use multi-stage builds (with ``COPY --from...``) to reduce the final size of an image.
* Avoid embedding configuration and data in the container image unless it is small, guaranteed to be static,   and forms sensible defaults for the running application.
* Base images and image provenance must be checked in order to maintain the security and integrity of the SKA runtime systems.
* Stable image tags should be used for base images that include the Major and Minor version number of `Semantic Versioning <https://semver.org>`_ eg: ``python:3.7``.
* Avoid installing unnecessary packages in your container image.
* Create a derivative image from the standard production one explicitly for the purposes of debugging, and problem resolution.
* Always clean the package cache afterward use of ``apt-get install ...`` to avoid the package archives and other temporary files becoming part of the new layer.
* Order the build directives specified in the ``Dockerfile``, to ensure that they are running from the lowest frequency changing to the highest to exploit the build cache.
* Use the ``LABEL`` directive to add metadata to your image.
* Use arguments (``ARG``) to parameterise elements such as the base image, and versions of key packages to be installed.
* Only set environment variables using ``ENV`` if they are required in the final image to avoid embedding unwanted data.
* Prioritise use of ``RUN + curl`` over ``ADD/COPY + RUN`` to reduce image size.
* use ``USER`` and ``WORKDIR`` to switch the user at execution time and set directory context.
* Never use sudo - there should never be a need for an account to elevate permissions.
* set ``ENTRYPOINT`` to the full path to the application and ``CMD`` to the default command line arguments.
* Use the ``["thing"]`` which is the ``exec`` notation ensuring that proper signal propagation occurs to the containerised application.
* Use the ``ONBUILD`` feature sparingly, as it can cause unintended consequences.

Naming and Tagging
==================

* Image names should reflect the application that will run in the resultant container eg: ``ska-tango-examples/powersupply:1.13.2``.
* Images should be tagged with short commit hash as derived by ``git rev-parse --verify --short=8 HEAD`` from the parent Git repository.
* When an image version for an application is promoted to production, it should be tagged with the application version (using `Semantic Versioning <https://semver.org>`_).
* For the most current major.minor.patch image version the 'latest' tag should be added.
* Application version tags should be added eg: ``1.13.2``, ``1.13``, ``1`` - where major/minor/patch version point to the latest in that series.
* A production deployment should always be made with a fully qualified semantic version eg: ``ska-tango-examples/powersupply:1.13.2``.
* The SKA will endeavour to support only one OS base per image as the practice of multi-OS bases does not strictly follow Semantic Versioning, and creates considerable maintenance overhead.
* Within the SKA hosted Continuous Integration infrastructure, all production images are kept indefinitely.
* Images with debugging tools, profilers, and any tools not essential to the running of the target application should be contained in a derivative image that is named explicitly ``dev`` eg: ``ska-tango-examples/powersupply-dev:1.13.2``.
* All images should be stored in a Docker v2 Registry API compliant repository, protected by HTTPS.
* All containerised software used within the SKA, will be served out of the hosted repository service.


Image Signing and Publishing
============================

* All images pushed to the SKA hosted repository must be signed.  This will ensure that only trusted content will be launched in containerised environments.

Running Containerised Applications
==================================

* The containerised application developer must determine what **the application interface contract** based on the :ref:`touch points with resources<header-2-running-containerised-applications>` from the underlying host through the Container Engine.
* Usage documentation for the image must describe the intended purpose of each configured resource, how they combine and what the defaults are with default behaviours.
* Use ``VOLUME`` statements for all directories to be mounted as it provides annotation of the image requirements.
* When adding a volume at runtime, consider whether write access is really required - add ``:ro`` liberally.
* Containerised applications should avoid using ``--net=host`` (host only) based networking as this will push the container onto the running host network namespace monopolising any ports that it uses.
* Where possible, a containerised application should run under a specific UIG/GID to avoid privilege escalation as an attack vector.
* It should be a last resort to run the container in privileged mode ``docker run --privileged ...`` as this has security implications.
* Configuration of a containerised application should be managed primarily by :ref:`header-3-environment-variables` and configuration files.
* Avoid passing large numbers of configuration options on the command line or secrets such as keys and passwords.
* Configuration passed into a container should not directly rely on a 3rd party secret/configuration service integration.
* Appropriate configuration defaults should be defined in the image build using :ref:`image environment variables<header-3-environment-variables>`, along with default configuration files. These defaults should be enough to launch the application into it's minimal state unaided by specifics from the user.
* Runtime constraints for Memory and CPU should be specified, to ensure that an application does not exhaust host resources, or behave badly with co-located applications.
* Although Container Orchestration is not covered by these standards, it is important to note that the leading Orchestration solutions (Docker Swarm, Kubernetes, Mesos) use DNS as the primary service discovery mechanism.  This should be considered when designing containerised applications so that they inherently expect to resolve dependent services by DNS, and in return expose their own services over DNS.  This will ensure that when in future the containerised application is integrated as part of an Orchestrated solution, it will conform to that architecture seamlessly.

Logging
=======

* Stdout and stderr are sent straight to the Container Engine logging system.  In Docker, this is the `logging sub-system <https://docs.docker.com/config/containers/logging/configure/>`_ which combines the output for viewing purposes with ``docker logs ...``.  This is used as a defacto standard for containerised application logging.
* Logging should be implemented so that  stdout/stderr is used, but is configurable to switch the emission to syslog
* Logging to `stdout` or console so that the routing and handling of log messages can be handled by the container runtime (*dockerd*, *containerd*) or dynamic infrastructure platform (*Kubernetes*).
* The SKA has adopted :doc:`/tools/logging-format` as the logging standard to be used by all SKA software.
* Within the this standard, the message portion should be enriched with JSON structured data so that the universal logging solution integrated with the Container Engine and/or Orchestration solution can derive greater semantic meaning from the application logs.

