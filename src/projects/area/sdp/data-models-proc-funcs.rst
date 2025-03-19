
Data models and processing functions
------------------------------------

The packages below contain the building blocks of SDP processing.

Memory Data Models
++++++++++++++++++

The repository provides a set of data models involved in radio astronomy
visibility processing. The models are specifically meant to facilitate
passing data between services and processing components within the SDP.
They are mostly based on `xarray.Dataset <https://docs.xarray.dev/en/stable/user-guide/data-structures.html#dataset>`__.

- `Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-datamodels>`__
- `Documentation </projects/ska-sdp-datamodels/en/latest/>`__

Processing Function Library
+++++++++++++++++++++++++++

Contains low-level capabilities such as coordinate systems, Fourier Transforms, etc,
implemented in C, C++, and CUDA (internal), with C interfaces.
Eventually it will cover reference implementations of all important domain-specific
algorithms needed for the SKA, optimised for SKA-specific processing use cases.


- `Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-func>`__
- `Documentation </projects/ska-sdp-func/en/latest/>`__

Python Processing Function Wrappers
+++++++++++++++++++++++++++++++++++

Contains processing function wrappers and reference implementations for imaging, calibration,
coordinate systems, etc, implemented in Python. It meant to allow low-level processing function
libraries (e.g ska-sdp-func) to present high-level interfaces using ska-sdp-datamodel.

- `Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-func-python>`__
- `Documentation </projects/ska-sdp-func-python/en/latest/>`__
