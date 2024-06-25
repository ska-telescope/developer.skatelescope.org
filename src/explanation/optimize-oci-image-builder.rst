Optimize OCI Image Builds
=========================

The Open Container Initiative (OCI) defines open standards for container images. Optimizing OCI image builds is crucial for efficient container deployment. This guide provides key tips for building optimized container images.

Understanding Layers
--------------------

1. **Layer Caching**: Each layer in a container image is a set of differences from the layer before it. Reuse layers to speed up build processes.

2. **Minimize Layer Count**: While layers are beneficial, too many can slow down image builds. Combine related commands to reduce the number of layers.

3. **Layer Ordering**: Place layers that change less frequently (like installing dependencies) before layers that change often (like copying source code).

Best Practices for Building Images
----------------------------------

- **Use Official Base Images**: Start with a small, official base image to ensure security and minimize size.

- **Optimize Layering**: Group commands to reduce layers. For example, use a single `RUN` statement to update, install, and clean up packages.
  Such as for example the following where a repo is cloned, the build and install all done in the same RUN command:

  .. code-block:: 

    RUN bash -xc "\ 
    git clone https://github.com/iovisor/bcc.git && \
    mkdir bcc/build && cd bcc/build && \
    cmake .. && \
    make && \
    make install && \
    cmake -DPYTHON_CMD=python3 .. && \
    pushd src/python/ && \
    make && \
    make install && \
    popd \


- **Clean Up in the Same Layer**: When installing packages, ensure cleanup happens in the same `RUN` instruction to avoid adding bloat to layers.

  As an example let's take into account the installation of a package using **apt**, when you install packages in Debian/Ubuntu using the apt-get command, a copy of the .deb file is **locally stored**. So to **clean** some space in the image after doing the install is recommended to do a **clean** such as the following example:

   .. code-block::

    RUN apt-get install -y --no-install-recommends \
      build-essential \
      libboost-python-dev \
      pkg-config \
      python3-distutils \
      python3-setuptools \
      python3-wheel \
      python3-venv \
      zlib1g-dev \
      ca-certificates \
      curl \
      git && \
      sudo apt-get clean --dry-run


- **Leverage .dockerignore**: Exclude unnecessary files and directories from the context sent to the Docker daemon.

    Take for example the `ska-tango-examples <https://gitlab.com/ska-telescope/ska-tango-examples/-/blob/master/.dockerignore?ref_type=heads>`_ repository where this practice is used to ignore multiple files in that repo. 

- **Multi-Stage Builds**: Use multi-stage builds to separate the build environment from the runtime environment, reducing the final image size.
  
  Let's take as an example a simple example where we copied the required artifact from **stage 1** to **stage 2** without compromising the Dockerfile and successfully created the most **optimized** and **reduced** image. :

  .. code-block:: dockerfile

    # Stage1
    FROM ubuntu:20.04 as stage1
    RUN apt-get update
    RUN apt-get -y install make curl
    RUN curl http://xyz.com/abc.tar.gz -o
    RUN tar zxf abc.tar.gz && cd abc
    RUN make DESTDIR=/tmp install

    # Stage 2
    FROM alpine:3.10

    COPY --from=stage1 /tmp /abc

    ENTRYPOINT ["/abc/app"]

- **Layer Ordering**: Order the build directives specified in the Dockerfile, to ensure that they are running from the lowest frequency changing to the highest to exploit the build cache.

  Let's take as an example a simple python example:

  .. code-block::

    # Use an official lightweight base image
    FROM python:3.9-slim

    # Install system dependencies
    # These change less frequently, so they are placed at the beginning
    RUN apt-get update && \
        apt-get install -y --no-install-recommends build-essential && \
        rm -rf /var/lib/apt/lists/*

    # Set the working directory
    WORKDIR /app

    # Copy only the requirements file initially
    # This layer changes infrequently compared to the actual source code
    COPY requirements.txt .

    # Install Python dependencies
    RUN pip install --no-cache-dir -r requirements.txt

    # Copy the rest of your application's code
    # This layer changes more frequently
    COPY . .

    # Command to run the application
    CMD ["python", "app.py"]

Pyproject as requirement
------------------------

As the default python dependency manager for the project is poetry, this section explains the best way to install the dependencies from it. An example of it follows:

.. ::


    FROM python:3.9 as base

    WORKDIR /tmp

    RUN pip install poetry

    COPY pyproject.toml  poetry.lock* /tmp/

    RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

    FROM python:3.9

    WORKDIR /code

    COPY --from=base /tmp/requirements.txt /code/requirements.txt

    RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

    COPY ./src/ /code/

