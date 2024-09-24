.. _base-images:

Container Base images
*********************

In order to meet the security recommendations and in specific to have zero critical vulnerabilities, SKAO provides build images for development and base images for applications.

The list of the images provided are shown below:

.. note:: The build image tools is a work in progress as the required tools are identified and support is expanded!
   The aim is to have one container that can be used as a build image for all SKAO software
   
* ska-base: Default image derived from ubuntu:22.04 with no application dependencies and security patches.
* ska-build: Build image based on `ska-base` with the following tools: python, pip, poetry (with pipx), C++ build tools (build-essentials), Python build tools (libffi-dev python3-dev).
* ska-build-python: Build image based on `ska-build` for python. 
* ska-python: Runtime image for python applications. Includes only python. 

For easier traceability, security and management purposes, The following metadata are present in the images (in the file ``/etc/skao.metadata``) and as labels:
* int.skao.image.created: creation date: ISO 8601 format date and time the image was built
* int.skao.image.version: image version
* int.skao.image.tags
* int.skao.image.team
* int.skao.image.url: URL to find more information on the image, i.e. docs url
* int.skao.image.source: source code url
* int.skao.image.baseImage

Rationale
=========

* The build image is needed in order to automate the construction of an image both locally and in a Gitlab pipeline (using the cicd infrastructure) transparently. Without it, every time the image has to be built an new environment should be created. 
* In order to have zero critical vulnerabilities, the base image must be well known and must include the security patched and every required upgrade. By giving to the SKAO developers a secure image, vulnerabilities would be only in the image they are working on. 

Example Dockerfile
==================

Below it is possible to see an example of a Dockerfile which install a virtual environment with poetry in the build image and that copy it to the runtime. 

.. code:: Dockerfile

    FROM ska-base AS build
    
    WORKDIR /code
    RUN poetry install
    
    FROM ska-python
    COPY --from build /code /code
    EXPOSE...
    RUN python3 app-mudule
    ...
