.. _oci-multiple-build:

Building multiple OCI images
============================

This guide provides step-by-step instructions on how to set up your repository to build multiple OCI images. First, make sure you've followed :ref:`the pipeline machinery guide <cicd-makefile>`.

Directory structure and versioning
----------------------------------

By default, the Makefile looks into the `images/` directory for images. You can change this directory by setting `OCI_IMAGE_ROOT_DIR=<directory where images are available>` in your top-level Makefile. Although this is possible, it is **discouraged**.

It expects a structure like this:

.. code-block:: bash
   images/.
   ├── some-image
   │   ├── Dockerfile
   │   └── ...
   ├── another-image
   │   ├── Dockerfile
   │   └── ...

By default, all images will be versioned with the version present in the repository's top-level `.release` file. Now, we can add a `.release` file to the directory of the image, so that we can have images with different versions:

.. code-block:: bash
   release=0.1.1
   tag=some-image-0.1.1

Selecting images to build
-------------------------

To build multiple images, we run:

   .. code-block:: bash

      make oci-build-all

By default, this command will look into all directories under the `images/` directory and build them. If we want to filter what images we want to build, we can do:

1. Configure images to build:

   .. code-block:: bash

      OCI_IMAGES="some-image another-image" # space separated list

2. Build the images:

   .. code-block:: bash

      make oci-build-all
