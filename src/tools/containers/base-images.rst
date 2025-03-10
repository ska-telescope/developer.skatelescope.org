.. _base-images:

Container Base images
*********************

In order to meet the security recommendations and in specific aim to have zero critical vulnerabilities, SKAO provides build images for development and base images for applications.

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

* The build image is needed in order to automate the construction of an image both locally and in a Gitlab pipeline (using the cicd infrastructure) transparently. Without it, every time the image has to be built an new environment should be created. The image is advised to be used when building applications
* In order to have a secure software supply chain, the base image must be well known and must include the security patches and every required upgrade. By giving to the SKAO developers a secure image, vulnerabilities would be only in the image they are working on since SKAO infrastructure would try to minimise many vulnerabilities from the start.

Example Dockerfile
==================

Below it is possible to see an example of a Dockerfile which install a virtual environment with poetry in the build image and that copy it to the runtime using multi-stage builds. 

.. code:: Dockerfile

   FROM artefact.skao.int/ska-build-python:0.1.1 as build

   WORKDIR /src

   COPY pyproject.toml poetry.lock* ./

   ENV POETRY_NO_INTERACTION=1
   ENV POETRY_VIRTUALENVS_IN_PROJECT=1
   ENV POETRY_VIRTUALENVS_CREATE=1

   #no-root is required because in the build
   #step we only want to install dependencies
   #not the code under development
   RUN poetry install --no-root

   FROM artefact.skao.int/ska-python:0.1.2

   WORKDIR /src

   #Adding the virtualenv binaries
   #to the PATH so there is no need
   #to activate the venv
   ENV VIRTUAL_ENV=/src/.venv
   ENV PATH="$VIRTUAL_ENV/bin:$PATH"

   COPY --from=build ${VIRTUAL_ENV} ${VIRTUAL_ENV}

   COPY ./src/my_project ./my_project

   #Add source code to the PYTHONPATH
   #so python is able to find our package
   #when we use it on imports
   ENV PYTHONPATH=${PYTHONPATH}:/src/
    ...
