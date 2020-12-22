SDP Execution Control
---------------------


sdp-lmc
+++++++
Tango devices for local monitoring and control.

The SDP Master Tango Device is intended to provide the top-level control of SDP services. The SDP Subarray Tango Devices control the processing associated with SKA Subarrays.
More details can be found here (documentation link).

sdp-proccontrol
+++++++++++++++

The Processing Controller controls the execution of Processing Blocks.
It detects them by monitoring the Configuration Database.
To execute a Processing Block, it requests the deployment of the corresponding Workflow by
creating an entry in the Configuration Database. More details can be found here (documentation link).

sdp-configdb
++++++++++++

The Configuration Database is the central store of configuration information in the SDP.
It is the means by which the components communicate with each other.
More details can be found here (documentation link).

sdp-console
+++++++++++

Console used to interact with the configuration database. More details can be found here (documentation link).

