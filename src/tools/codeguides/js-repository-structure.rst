Repository layout and dependencies
==================================

Repository structure
--------------------

It is recommended that the JS repository is set out in the following structure so that it is simple for all SKAO
developers to navigate through repositories and there is a consistency. Below is a sample structure which should be
used and extended as required.

|    src
|    └── components/
|        ├── App/
|        │   ├── App.css
|        │   ├── App.jsx
|        │   └── App.test.jsx
|        └── Component/
|        │   ├── Component.css
|        │   ├── Component.jsx
|        │   └── Component.test.jsx
|        └── pages/
|        └── services/
|        └── utils/

.. csv-table:: Folder usage
   :header: "Folder", "Descriptions"

    "components", "Contains the base and group components. Each component is in its own folder together with associated tests and CSS as needed"
    "pages", "Pages of the application.  They are separated to simplify page identification and usage"
    "services", "Methods and calls to external applications and utilities"
    "utils", "Standard methods and functions that are used internally within the application without external references"

.. note:: 

   Applications are expected to make use of Material-UI and so most styling has been pre-defined as part of this.
   The result is that it is expected that there will be minimal requirements for CCS, so it likely that no CSS will be required,
   and the mention above is for exceptional cases only.


Packaging & Dependencies
------------------------

Packages and dependant libraries are identified in the ``package.json.`` contained in the repository, which also contains
standard scripts that are used by the CI/CD process and/or as an aid to developers.   

The packages are split into dependencies and devDependencies.  

- DevDependencies should be used for those libraries that are used for any packages required to build, test or to deploy the code. 

- Dependencies should contain only those packages that will be required for the effective running of the production application.

Any 3rd party packages used should be compatible with the SKA BSD-3 License terms.
Here is a link to clause 3 of the BSD license for reference : https://opensource.org/license/bsd-3-clause

Checking for dependency/security issues
---------------------------------------

To ensure that there are no security concerns it is recommended that the following be run so that any issues with the dependencies
in use are identified and resolved before they become critical.  To aid with this, the following script has also been added to the
CI/CD process

``yarn audit``

Checking for dependency updates
-------------------------------

It is recommended that the dependencies are checked and updated regularly. To do this the following command with identify
dependencies that have available updates which can be updated or skipped as required.

``yarn upgrade-interactive``
