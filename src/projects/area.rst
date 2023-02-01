.. this title is converted into a DOM id and used
   for populating this page using Gitlab APIs,
   Do not edit it
   Note that the section titles are used in
   `src/_static/js/topics_list.js` to populate the tables
   So when a new section is added, the following section name
   should be added to the list in the above file (in lowercase)

.. _topics:

Projects by Area
****************

SDP
===

   ============= =================
   Documentation Gitlab repository
   ============= =================
   ============= =================

.. toctree::
  :maxdepth: 1

  area/sdp

Simulations
===========

   ============= =================
   Documentation Gitlab repository
   ============= =================
   ============= =================

.. toctree::
  :maxdepth: 1

  simulations

SKAMPI
======

   ============= =================
   Documentation Gitlab repository
   ============= =================
   ============= =================

- `SKAMPI repository <https://gitlab.com/ska-telescope/ska-skampi/>`_: the SKA MVP Integration project. Contains helm charts and automation for deployment.
- `SKAMPI documentation </projects/ska-skampi/en/latest/?badge=latest>`_.

- `Central Signal Processor Local Monitoring and Control repository <https://gitlab.com/ska-telescope/csp-lmc/>`_ CSP monitoring and control functionality for both SKA MID and LOW  telescopes.
- `CSP LMC documentation </projects/ska-csp-lmc-mid/en/latest/lmc/mid_csp_lmc.html>`_.

- `Mid CBF MCS Repository <https://gitlab.com/ska-telescope/ska-mid-cbf-mcs/>`_
- `Mid CBF MCS documentation </projects/ska-mid-cbf-mcs/en/latest/?badge=latest>`_.

- `Observation Execution Control repository <https://gitlab.com/ska-telescope/ska-oso-oet/>`_
- `Observation Execution Control documentation </projects/ska-oso-oet/en/latest/?badge=latest>`_.

- `Pulsar Search Pipeline repository <https://gitlab.com/ska-telescope/pss-pipeline/>`_ code for the Pulsar Search Subelement.
- `Pulsar Search Pipeline Documentation </projects/pss-pipeline/en/latest/?badge=latest>`_.

- `PSS test vector generator repository <https://gitlab.com/ska-telescope/pss-test-vector-generator>`_: allows generation of tests for Pulsar search.
- `PSS test vector generator documentation </projects/pss-test-vector-generator/en/latest/?badge=latest>`_.

- `PSS-CentOS-docker repository <https://gitlab.com/ska-telescope/pss-centos-docker/>`_ Allows PSS integration with skampi.
- `PSS-CentOS-docker documetation </projects/pss-centos-docker/en/latest/?badge=latest>`_.

- `ska-low-mccs repository <https://gitlab.com/ska-telescope/ska-low-mccs/>`_ for the monitoring, control and calibration subsystem for the LOW telescope.
- `ska-low-mccs documentation </projects/ska-low-mccs/en/master/?badge=latest>`_.

- `ska-sdp-config repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-config/>`_: interface for accessing Science Data Processor (SDP) configuration database.
- `ska-sdp-config documentation </projects/ska-sdp-config/en/latest/?badge=latest>`_.

- `ska-sdp-console repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-console/>`_: builds an image that can be used to launch a shell to connect to the SDP Configuration database.
- `ska-sdp-console documentation </projects/ska-sdp-console/en/latest/?badge=latest>`_.

- `ska-sdp-helmdeploy repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-helmdeploy/>`_: SDP Helm deployment controller.
- `ska-sdp-helmdeploy documentation </projects/ska-sdp-helmdeploy/en/latest/?badge=latest>`_.

- `ska-sdp-helmdeploy-charts repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-helmdeploy-charts/>`_: charts for the SDP Helm deployer.
- `ska-sdo-helmdeploy-charts documentation </projects/ska-sdp-helmdeploy-charts/en/latest/?badge=latest>`_.

- `ska-sdp-integration repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-integration/>`_ integrates components of the Science Data Processor (SDP).
- `ska-sdp-integration documentation </projects/ska-sdp-integration/en/latest/?badge=latest>`_.

- `ska-sdp-lmc repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-lmc/>`_ Tango device servers to control the SDP.
- `ska-sdp-lmc documentation </projects/ska-sdp-lmc/en/latest/?badge=latest>`_.

- `ska-sdp-opinterface repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-opinterface/>`_ SDP operator web interface.
- `ska-sdp-opinterface documentation </projects/ska-sdp-opinterface/en/latest/?badge=latest>`_.

- `ska-sdp-proccontrol repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-proccontrol/>`_: processing controller, allowing the SDP to control the execution of processing blocks.
- `ska-sdp-proccontrol documentation </projects/ska-sdp-proccontrol/en/latest/?badge=latest>`_.

- `ska-sdp-script repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-script/>`_ SDP processing scripts.
- `ska-sdp-script documentation </projects/ska-sdp-script/en/latest/?badge=latest>`_.

- `ska-sdp-scripting repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-scripting/>`_: high-level interface for writing processing scripts.
- `ska-sdp-scripting documentation </projects/ska-sdp-scripting/en/latest/?badge=latest>`_.

- `ska-umbrellas repository <https://gitlab.com/ska-telescope/ska-umbrellas/>`_: contains a minimal set of skampi charts for SKA MID and LOW.
- `ska-umbrellas documentation </projects/ska-umbrellas/en/latest/?badge=latest>`_.

- `tangogql project <https://gitlab.com/ska-telescope/tangogql/>`_: for of an externl project to provide a GraphQL interface to Tango.
- `tangogql documentation </projects/tangogql/en/latest/?badge=latest>`_.

- `telescope-model project <https://gitlab.com/ska-telescope/ska-telmodel/>`_: library of data models shared between telescope elements.
- `telescope-model documentation </projects/ska-telmodel/en/latest/?badge=latest>`_.

Telescope Monitoring and Control (TMC)
======================================

.. include:: area/tmc/repos.rst

.. toctree::
  :maxdepth: 2
  :includehidden:
  
  area/tmc/repos
