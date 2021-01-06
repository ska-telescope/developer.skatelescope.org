SDP Execution Control
---------------------

SDP Local Monitoring and Control
++++++++++++++++++++++++++++++++

The SDP Master Tango Device is intended to provide the top-level control of SDP services.
The SDP Subarray Tango Devices control the processing associated with SKA Subarrays.
These devices implement the Tango control system used by the SKA telescope for system control.

- `More details about the devices can be found here <https://developer.skatelescope.org/projects/sdp-lmc/en/latest/index.html>`_

SDP Processing Controller
+++++++++++++++++++++++++

The Processing Controller controls the execution of Processing Blocks.
The processing blocks define the workflows to be run and the parameters to be passed to the workflows.
It detects processing blocks by monitoring the Configuration Database.

- `More details can be found here <https://developer.skatelescope.org/projects/sdp-proccontrol/en/latest/?badge=latest>`_

SDP Configuration Database
++++++++++++++++++++++++++

The SDP Configuration Database is the central store of configuration information in the SDP.
SDP Configuration Library is the frontend module for accessing the SKA SDP configuration information.
It provides ways for SDP controller and processing components to discover and manipulate the intended state of the system.

- `More information about the database and library can be found here <https://developer.skatelescope.org/projects/sdp-config/en/latest/?badge=latest>`_

SDP Console
+++++++++++

The SDP Console is used to interact with the configuration database.

- `Repository can be found here <https://gitlab.com/ska-telescope/sdp/ska-sdp-console>`_

