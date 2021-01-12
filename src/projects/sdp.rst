.. _sdp:

Science Data Processor
----------------------

.. toctree::
  :maxdepth: 1
  :hidden:

  sdp/execution_control
  sdp/science_pipeline_workflows.rst
  sdp/platform_services


The Science Data Processor (SDP) is part of the evolutionary prototype of the SKA software. The SDP is built from software modules which produce a number of different types of artefacts.
The components of the system are built as Docker images which are deployed on a kubernetes cluster using a Helm chart.
The Docker images depend on libraries containing common code.

More Details on SDP Design and on how to run SDP locally or on an integration environment can be found in the SDP Integration
`Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-integration>`_ and `Documentation <https://developer.skatelescope.org/projects/ska-sdp-integration/en/latest/>`_


.. figure:: sdp/images/sdp_module_view.svg
  :align: center
