Execution Control
-----------------

Local Monitoring and Control
++++++++++++++++++++++++++++

The local monitoring and control is the interface between the telescope control
system and the SDP. It consists of Tango device servers which control different
aspects of the system. The SDP Master device provides the top-level control of
the system. The SDP Subarray device controls the processing associated with a
telescope subarray.

- `Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-lmc>`__
- `Documentation <https://developer.skatelescope.org/projects/ska-sdp-lmc/en/latest/>`__

Processing Controller
+++++++++++++++++++++

The processing controller controls the execution of processing blocks. The
processing blocks define the workflows to be run and the parameters to be
passed to the workflows. It detects processing blocks by monitoring the
configuration database.

- `Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-proccontrol>`__
- `Documentation <https://developer.skatelescope.org/projects/ska-sdp-proccontrol/en/latest/>`__

Configuration Library
++++++++++++++++++++++

The configuration library is the interface to the configuration database. The
database is the central store of configuration data in the SDP and it is used
to coordinate actions between the components of the system. The configuration
library defines the schema for the entries in the database and it provides ways
for controller and processing components to discover and manipulate the
intended state of the system.

- `Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-config>`__
- `Documentation <https://developer.skatelescope.org/projects/ska-sdp-config/en/latest/>`__

Console
+++++++

The console provides an environment for interacting with the configuration
database.

- `Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-console>`__
