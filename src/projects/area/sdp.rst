.. _sdp:

Science Data Processor
======================

The Science Data Processor (SDP) is part of the evolutionary prototype of the
SKA. The SDP is built from software modules which produce a number of different
types of artefacts. The components of the system are built as Docker images
which are deployed on a Kubernetes cluster using a Helm chart. The Docker
images depend on libraries containing common code.

The components of the system are integrated in the `SDP integration repository
<https://gitlab.com/ska-telescope/sdp/ska-sdp-integration>`_, which contains
the Helm chart to deploy the SDP. More details on the design of the SDP and how
to run it locally or in the integration environment can be found in the
`SDP Integration documentation
</projects/ska-sdp-integration/en/latest/>`__.

.. figure:: sdp/images/sdp-module-view.svg
  :align: center

  SDP module view

SDP Modules
-----------

The software modules are organised according to the `SDP module view
<https://confluence.skatelescope.org/x/W4COBQ>`_, shown above. Those developed
so far are part of:

.. toctree::
  :maxdepth: 1

  sdp/execution-control
  sdp/science-pipelines
  sdp/platform-services

Controlling SDP
---------------

The main instructions for how to deploy and run the SDP are in the
`SDP Integration documentation
</projects/ska-sdp-integration/en/latest/>`__.

Tutorials for controlling SDP are additionally provided in the form of
`Jupyter notebooks </projects/ska-sdp-notebooks/en/latest/?badge=latest>`__:

    - `Control SDP with the ska-sdp CLI <https://gitlab.com/ska-telescope/sdp/ska-sdp-notebooks/-/blob/main/src/ska-sdp-cli-tutorial.ipynb>`_
    - `Control SDP using the Tango devices <https://gitlab.com/ska-telescope/sdp/ska-sdp-notebooks/-/blob/main/src/ska-sdp-tango-tutorial.ipynb>`_