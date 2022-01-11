
.. _registry: https://artefact.skao.int/#browse/search/docker

===========================================================
Hosting an OCI image on the *Central Artefact Repository*
===========================================================

As part of our goal to align all developmental efforts to one standard, we have documented
a procedure of how we would like all the *SKA* developers to version tag their OCI images
and what process to follow in ensuring that they are able to make use of the existing Gitlab CI/CD
pipeline to automate the building of OCI images, for now, and have them published on
the *SKA* OCI registry_ which is hosted on *Central Artefact Repository*.

Tagging the OCI image
------------------------

To explicitly tag an OCI image run the following command:

.. code:: bash

  $ docker tag <source_image> artefact.skao.int/<repository_name>/<image_name>:<tag_name>

This command will create an alias by the name of the :code:`<image_name>` that refers to the :code:`<source_image>`.

**Note that naming and tagging conventions are outlined in the containerisation standards. And those should follow
the same semantic versioning used for the repository.**

Uploading the OCI image to the *Central Artefact Repository*
---------------------------------------------------------------

Once the OCI image has been built and tagged, it can then be uploaded to the *Central Artefact Repository* registry
by executing the following command:

.. code:: bash

  $ docker push artefact.skao.int/<repository_name>/<image_name>:<tag_name>
