***********************************************************************************************
Migration Guidelines for Binary Artefacts Repository (BAR) from Nexus Raw Artefact Repositories
***********************************************************************************************

This page describes some examples use cases that have been identified on the SKAO project and gives guidelines for an easier migration.

STS-608 - SDP TelModel
======================

Downloading Artefacts
---------------------

1. Use the BAR API instead of Nexus search API to find the correct artefact to download following this example: :ref:`bar_api_example_get_sha`.

Uploading Artefacts
-------------------

1. Request an API key for machine usage and use it as part of auth flow.
2. Ideally use a descriptive name for the artefact. There's no need to use sha256 as part of the name as this is created automatically and added as a metadata property for the artefact.
3. The target repo can be flattened into the name. i.e. ``sts-608/gitlab/<repo>/largefiles`` becomes ``telmodel-<repo>-largefiles`` as the artifact name, and the version can be anything.
4. Push the files using the linked example: :ref:`bar_api_example_post`.

    a) Please note that artefacts need a version field now. This can be any alphanumerical.


p4-switch-internal
==================

Downloading Artefacts
---------------------

1. Instead of using a harcoded path, use the BAR API to download an artefact by its name and version using example: :ref:`bar_api_example_get_name_tag`
2. In case you want to download a specific asset (file) from the artefact instead of all the assets as a zip file, you can use the BAR API to download a specific asset directly using example: :ref:`bar_api_example_get_asset`

Uploading artefacts
-------------------

1. Request an API key for machine usage and use it as part of auth flow.
2. The SDE folder, should instead be the artifact name and each file can have different versions as required. i.e.:

    a) Alternative 1: artifact name: ``sde``; version: ``bf-reference-bsp-9.13.0``.
    b) Alternative 2: artifact name: ``sde-bf-reference-bsp``; version ``9.13.0``.
3. Push the files using the instructions at :ref:`bar_api_example_post`, or manually using the `UI <https://k8s-services.skao.int/binary_artefacts_ui/upload>`__.

raw-telmodel
============

Downloading Artefacts
---------------------

1. Instead of using a harcoded path, use the BAR API to download an artefact by its name and version using example: :ref:`bar_api_example_get_name_tag`
2. In case you want to download a specific asset (file) from the artefact instead of all the assets as a zip file, you can use the BAR API to download a specific asset directly using example: :ref:`bar_api_example_get_asset`

Uploading artefacts
-------------------

1. Request an API key for machine usage and use it as part of auth flow.
2. The target repo can be flattened into the name. i.e. ``gitlab.com/ska-telescope/gitlab/<project>/<repo>/`` becomes ``telmodel-<project>-<repo>`` as the artifact name, and the version can be anything to keep tract with the different ``tmdata`` contents versions.
3. Push the files under ``tmdata/<hash>`` using the linked example: :ref:`bar_api_example_post`

ansible-internal
================

Downloading Artefacts
---------------------

1. Instead of using a harcoded path, use the BAR API to download an artefact by its name and version using example: :ref:`bar_api_example_get_name_tag`
2. In case you want to download a specific asset (file) from the artefact instead of all the assets as a zip file, you can use the BAR API to download a specific asset directly using example: :ref:`bar_api_example_get_asset`

Uploading artefacts
-------------------

No use case identified for this repository.


k8s-ci-creds-internal
=====================

Downloading Artefacts
---------------------

1. Ideally migrate to an automated process as described at :ref:`bar_api_example_get_name_tag` to avoid the need to download the artefacts manually.
If this is not possible, use the `BAR UI <https://k8s-services.skao.int/binary_artefacts_ui>`__.

Uploading artefacts
-------------------

1. Request an API key for machine usage and use it as part of auth flow.
2. The target asset can be flattened into the name. i.e. ``k8s-ci-ska-tmc-low-integration-41-sa-ci-ska-tmc-low-integration-41a2cebd-conf`` becomes ``k8s-ci-ska-tmc-low-integration`` as the artifact name, and the version can be anything to keep track of changes.
3. Push the files ``conf``, ``on-demand-conf`` and ``low-ith-conf`` using the linked example: :ref:`bar_api_example_post`

raw-internal
============

There are too many different use cases for this repository for us to go through all of them. As such, we are going to provide some general guidance on how to migrate artefacts from this repository.

Downloading Artefacts
---------------------

1. Use the BAR API instead of Nexus search API to find the correct artefact to download following this example: :ref:`bar_api_example_get_name_tag`.

Uploading artefacts
-------------------

1. Request an API key for machine usage and use it as part of auth flow.
2. The target repo/asset can be flattened into the name. i.e. ``ska-mid-cbf-talondx/fpga-test`` becomes ``ska-mid-cbf-talondx-fpga-test`` as the artifact name, and the version can be anything to keep track of changes.
3. Push the diferent files presently under ``ska-mid-cbf-talondx/fpga-test`` using the linked example: :ref:`bar_api_example_post`

General Guidance
================

1. **Do**: Use the BAR API instead of Nexus search API to find the correct artefact to download following this example: :ref:`bar_api_example_get_name_tag`.
2. **Do**: Flatten the target path/repo into the artefact name and use the version field to keep track of changes.
3. **Do**: Push the files that are connected to that artefact version as artefact assets using the linked example: :ref:`bar_api_example_post`.
4. **Do not**: Use harcoded paths to download/upload artifacts.
5. **Do not**: Use sha256 as part of the name as this is created automatically and added as a metadata property for the artefact.
6. **Do not**: Parse the HTML output of the BAR UI to find and  download artefacts.
 