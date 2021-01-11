.. _sdp:

Science Data Processor
----------------------

.. toctree::
  :maxdepth: 1
  :hidden:

  sdp/execution_control
  sdp/pipelines_processing_components
  sdp/platform_services
  sdp/simulations


The Science Data Processor (SDP) is part of the evolutionary prototype of the SKA software. The SDP is built from software modules which produce a number of different types of artefacts.
The components of the system are built as Docker images which are deployed on a kubernetes cluster using a Helm chart.
The Docker images depend on libraries containing common code.

More Details on SDP Design and on how to run SDP locally or on an integration environment can be found `here <https://developer.skatelescope.org/projects/ska-sdp-integration/en/latest/>`_.

SDP Module View
+++++++++++++++

.. figure:: sdp/images/sdp_module_view.svg
  :align: center
