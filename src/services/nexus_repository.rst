Nexus OSS Repository
********************

Repository address
==================
https://nexus.engageska-portugal.pt

.. image:: nexus_repository/nexus-oss.png

Repository formats
=================================

PyPi
----
.. image:: nexus_repository/pypi.png

Docker
------
.. image:: nexus_repository/docker.png

Raw
---
Raw repository is intended for any type and size of file. The main usage of raw repository is intended for sharing and storage of files.

.. image:: nexus_repository/raw.png

APT
---
.. image:: nexus_repository/apt.png

Other available formats
-----------------------
.. image:: nexus_repository/other.png

Repository upload (through browser)
===================================

If you have a Nexus user and the user has rights to upload, you may upload your file using an ordinary browser. Without Nexus user you may only list and download files.

In order to upload the file you need to click on "Upload" and then select the repository.

.. image:: nexus_repository/nexus-upload.png

PyPi
----
To upload PyPi content, click on "Browse" and select file to upload.

.. image:: nexus_repository/pypi-upload.png

Raw
---
To upload a raw file, click on "Browse" and select file to upload. You also must specify the path for the file.

.. image:: nexus_repository/raw-upload.png

Repository upload (through command line)
========================================

PyPi
----
Uploading a PyPi package into the nexus repo can be done using python tool called "twine".
To install it you can use "pip":
.. code:: bash

	pip install twine

In order to upload the package using twine you must specify the "--repository-url" and the "package name"

.. code:: bash

	twine upload --repository-url https://nexus.engageska-portugal.pt/repository/pypi/ pelican-2.4.4.tar.gz

It will be prompted for your Nexus user credentials.

.. image:: nexus_repository/pypi-twine-upload.png

Repository download
===================

PyPi
----
.. code:: bash

	pip install -i https://nexus.engageska-portugal.pt/repository/pypi/simple flask

.. image:: nexus_repository/pypi-download.png