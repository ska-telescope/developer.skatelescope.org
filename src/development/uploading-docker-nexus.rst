.. _registry: https://nexus.engageska-portugal.pt/#browse/search/docker

==============================================
Hosting a docker image on the *Nexus* registry
==============================================

As part of our goal to align all developmental efforts to one standard, we have documented
a procedure of how we would like all the *SKA* developers to version tag their docker images
and what process to follow in ensuring that they are able to make use of the existing Gitlab CI/CD
pipeline to automate the building of docker images, for now, and have them published on
the *SKA* docker registry_ which is hosted on *Nexus*.

Tagging the docker image
------------------------

To explicitly tag a docker image run the following command:

.. code:: bash

  $ docker tag <source_image> nexus.engageska-portugal.pt/<repository_name>/<image_name>:<tag_name>

This command will create an alias by the name of the :code:`<image_name>` that refers to the :code:`<source_image>`.

**Note that naming and tagging conventions are outlined in the containerisation standards.**

Uploading the docker image to *NEXUS*
-------------------------------------

Once the docker image has been built and tagged, it can then be uploaded to the *Nexus* registry
by executing the following command:

.. code:: bash

  $ docker push nexus.engageska-portugal.pt/<repository_name>/<image_name>:<tag_name>