SDP Execution Control
---------------------

SDP Local Monitoring and Control
++++++++++++++++++++++++++++++++

Tango Devices are the objects which implement the microservices of a Tango System.
Devices belong to a Device Class and are in a Device Server. These devices implement the Tango control system used by the SKA telescope for system control.
The SDP Master Tango Device is intended to provide the top-level control of SDP services.
The SDP Subarray Tango Devices control the processing associated with SKA Subarrays.

- `Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-lmc>`_
- `Documentation <https://developer.skatelescope.org/projects/ska-sdp-lmc/en/latest/index.html>`_

SDP Processing Controller
+++++++++++++++++++++++++

The Processing Controller controls the execution of Processing Blocks.
The processing blocks define the workflows to be run and the parameters to be passed to the workflows.
It detects processing blocks by monitoring the Configuration Database.

- `Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-proccontrol>`_
- `Documentation <https://developer.skatelescope.org/projects/ska-sdp-proccontrol/en/latest/?badge=latest>`_

SDP Configuration Library
++++++++++++++++++++++++++

The SDP Configuration Library is the interface to the Configuration Database, which is the central store of configuration information in the SDP.
This package defines the schema for the entries in the Configuration Database.
It provides ways for SDP controller and processing components to discover and manipulate the intended state of the system.

- `Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-config>`_
- `Documentation <https://developer.skatelescope.org/projects/ska-sdp-config/en/latest/index.html>`_

SDP Console
+++++++++++

The SDP Console is used to interact with the configuration database.

- `Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-console>`_

