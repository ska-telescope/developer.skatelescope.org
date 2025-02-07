**************************************
SKAO Binary Artefacts Repository (BAR)
**************************************

The SKAO Binary Artefacts Repository (BAR) is an application that enables the ability to publish and store binary artefacts so that they are archived and made available as part of the SKAO digital infrastructure.

The tool is available at the following link: `SKAO BAR <https://k8s-services.skao.int/binary_artefacts_ui/upload>`__, 

Repository and artefacts
========================
`Harbor <goharbor.io>`__ has been selected as preferred solution for storing artefacts within SKAO. This technology includes two main concepts: repository and artefact. A repository is identified with a name and is composed by a collection of artefacts. 
An artefact is identified with an hash (sha256) and, optionally, with a tag and is composed by one or more files. 

The SKAO BAR allows the user (developer and not) to be able to upload a new repository which can include more than one artefact. No conversion will be done and the uploaded files will be exactly the same that will be downloaded. 

Even if the tag for an artefact is optional, with the SKAO BAR tool, it is not possible to upload an artefact without a tag due to SKAO policies therefore the user will always refer to an artefact with a name and tag where the name refer to the repository and the tag to the artefact. 

Security
========

To be able to access the tool, a gitlab account is required. This needs to be requested from the System Team in Slack or `System Team Support Desk <https://jira.skatelescope.org/servicedesk/customer/portal/166>`__. The user information will be also attached to the annotations in the artefact. Users can only see, with this tool, the artefacts they have uploaded but they can see all the repositories. Binary artefacts are immutable, they cannot be changed, they cannot be deleted

Detailed Operation list
=======================

The tool include the following pages: 
* `Upload an artefact <https://k8s-services.skao.int/binary_artefacts_ui/upload>`__, 
* `List repositories <https://k8s-services.skao.int/binary_artefacts_ui/repositories>`__,

From the repositories page it is possible to access the artefact page. For example if a user uploaded a repository with name XYZ, it will be possible to see the information about the artefacts at the following link: https://k8s-services.skao.int/binary_artefacts_ui/xyz/artefacts.

It is possible to download a specific artefact in 2 possible ways: by downloading all the files composing it or by selecting a specific file. For example if a user wants to download all files from a repository called xxx with tag yyy, then the link will be: https://k8s-services.skao.int/binary_artefacts_ui/download/xxx/yyy

To access a specific file called zzz, the link will be: https://k8s-services.skao.int/binary_artefacts_ui/download/yetest/v1/zzz.

Using RAW Artefacts
====================
Due to the non standard nature of RAW artefacts, these don't have a standardized tool to manage them.

While for Python we use `pip` and for `C++` we use `conan`, for RAW artefacts we don't have a standard tool to manage them. 
This is because RAW artefacts are not meant to be used as a dependency in other projects, but rather as a standalone artefact
that can be used to build other artefacts.

As an effort to align their usage inside the SKAO, we have defined a procedure to follow when creating and using RAW artefacts and are
providing a REST API to manage them and that makes the bridge between the end user and the Nexus Repository Manager API. This will provide
a more seamless experience when using RAW artefacts and will allow us to move away from Nexus or to use different repositories on different
parts of the project while always providing the same interface to the end user.

REST API
--------

The principle of the REST API is to provide a separation between artefacts and their assets inside a single repository. This allows the user to manage the artefacts in a more granular way and to be able to upload and download only the assets that are needed.

TODO: The REST API is available at the following link: `SKAO RAW <https://CHANGEME>`__ where you can check its documentation.

.. list-table:: Artefact API Endpoints
   :widths: 10 40 30 40
   :header-rows: 1

   * - Method
     - Endpoint
     - Description
     - Example
   * - GET
     - /artefacts
     - List all artefacts with optional filtering
     - GET /artefacts?name=test&tag=v1.0.0
   * - GET
     - /artefacts/{name}
     - List all versions/tags of an artefact
     - GET /artefacts/test
   * - GET
     - /artefacts/{name}/sha/{sha}
     - Get metadata for a specific artefact version by SHA
     - GET /artefacts/test/sha/730b95bd
   * - GET
     - /artefacts/{name}/tags/{tag}
     - Get metadata for a specific artefact version
     - GET /artefacts/test/tags/v1.0.0
   * - GET
     - /artefacts/{name}/tags/{tag}/assets
     - List files in artefact version
     - GET /artefacts/test/tags/v1.0.0/assets
   * - GET
     - /artefacts/{name}/tags/{tag}/assets/{asset_name}
     - Get specific file
     - GET /artefacts/test/tags/v1.0.0/assets/config.json
   * - GET
     - /artefacts/{name}/tags/{tag}?format=zip
     - Download complete artefact version as zip
     - GET /artefacts/test/v1.0.0?format=zip
   * - POST
     - /artefacts/{name}/tags/{tag}
     - Create new artefact version
     - POST /artefacts/test/tags/v2.0.0
   * - PUT
     - /artefacts/{name}/tags/{tag}
     - Update already existing artefact version
     - PUT /artefacts/test/tags/v1.0.0
   * - DELETE
     - /artefacts/{name}/tags/{tag}
     - Delete artefact version
     - DELETE /artefacts/test/tags/v1.0.0

Example Usage
-------------

Uploading and artefact with the following properties:

- Name: ``myartefact``
- Tag: ``v1.0.0``
- Assets: ``myfile1.txt, myfile2.zip``

Using CURL
^^^^^^^^^^  
::

    curl -X POST "http://127.0.0.1:8000/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0" \
              -F "files=@myfile1.txt" \
              -F "files=@myfile2.zip"


Using Python
^^^^^^^^^^^^
::

    import requests

    url = "http://127.0.0.1:8000/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0"
    
    files = [
        ("files", ("myfile1.txt", open("myfile1.txt", "rb"))),
        ("files", ("myfile2.zip", open("myfile2.zip", "rb")))
    ]
    
    response = requests.post(url, files=files, auth=("morgado", "morgado."))
    
    print(response.status_code)
    print(response.text)
