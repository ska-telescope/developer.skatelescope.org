
Data models and processing functions
------------------------------------

The packages below contain the building blocks of SDP processing.

Memory Data Models
++++++++++++++++++

The repository provides a set of universal data models, implemented in python,
which can be used across various scripts and pipelines in the SDP architecture.
They are mostly based on xarray.Dataset.

- `Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-datamodels>`__
- `Documentation </projects/ska-sdp-datamodels/en/latest/>`__

Processing Function Library
+++++++++++++++++++++++++++

Contains low-level capabilities such as coordinate systems, Fourier Transforms, etc,
implemented in C++.

- `Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-func>`__
- `Documentation </projects/ska-sdp-func/en/latest/>`__

Python Processing Functions
+++++++++++++++++++++++++++

Contains processing functions for imaging, calibration, coordinate systems, etc,
implemented in Python. It is a reference library of various low-level processing
function implementations.

- `Repository <https://gitlab.com/ska-telescope/sdp/ska-sdp-func-python>`__
- `Documentation </projects/ska-sdp-func-python/en/latest/>`__
