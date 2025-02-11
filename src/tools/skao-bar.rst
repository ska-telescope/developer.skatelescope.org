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

The REST API is available at the following link: `SKAO RAW <https://binaries.artefact.skao.int>`__ where you can check its documentation.

.. list-table:: Artefact API Endpoints
   :widths: 10 40 30
   :header-rows: 1

   * - Method
     - Endpoint
     - Description
   * - GET
     - /artefacts
     - List all artefacts with optional filtering
   * - GET
     - /artefacts/{name}
     - List all versions/tags of an artefact
   * - GET
     - /artefacts/{name}/sha/{sha}
     - Get metadata for a specific artefact version by SHA
   * - GET
     - /artefacts/{name}/tags/{tag}
     - Get metadata for a specific artefact version
   * - GET
     - /artefacts/{name}/tags/{tag}/assets
     - List files in artefact version
   * - GET
     - /artefacts/{name}/tags/{tag}/assets/{asset_name}
     - Get specific file
   * - GET
     - /artefacts/{name}/tags/{tag}?format=zip
     - Download complete artefact version as zip
   * - POST
     - /artefacts/{name}/tags/{tag}
     - Create new artefact version
   * - PUT
     - /artefacts/{name}/tags/{tag}
     - Update already existing artefact version
   * - DELETE
     - /artefacts/{name}/tags/{tag}
     - Delete artefact version

Example Usage Scenarios
-----------------------
Let's now see some examples of how to use the REST API to manage artefacts.
These examples are taken from real use cases we had - at the time of this writing - in the project.

Uploading an artefact with multiple assets (files)
``````````````````````````````````````````````````
This is one of the most straightforward examples. We have an artefact with multiple files that we want to upload to the repository.
We are assuming the files are on the current directory and are named ``myfile1.txt`` and ``myfile2.zip``.

- Name: ``myartefact``
- Tag: ``v1.0.0``
- Assets: ``myfile1.txt, myfile2.zip``

**Using CURL:**
::

    curl -X POST "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0" \
              -F "files=@myfile1.txt" \
              -F "files=@myfile2.zip"

**Using Python:**
::

    import requests

    url = "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0"
    
    files = [
        ("files", ("myfile1.txt", open("myfile1.txt", "rb"))),
        ("files", ("myfile2.zip", open("myfile2.zip", "rb")))
    ]
    
    response = requests.post(url, files=files)
    # you should then log the response status code and content depending on your needs

Update an artefact version with a new asset
```````````````````````````````````````````
Imagine you want to update an artefact version with a new asset. This implies updating the all artefact version. You can't update a single asset and in fact are creating a new artefact and replacing the old one.

- Name: ``myartefact``
- Tag: ``v1.0.0``
- Assets: ``myfile3.txt, myfile4.zip``

**Using CURL:**
::

    curl -X PUT "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0" \
              -F "

**Using Python:**
::

    import requests

    url = "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0"
    
    files = [
        ("files", ("myfile3.txt", open("myfile3.txt", "rb"))),
        ("files", ("myfile4.zip", open("myfile4.zip", "rb")))
    ]
    
    response = requests.put(url, files=files)
    # you should then log the response status code and content depending on your needs

The artefact version will now be updated with the new assets. The assets for this artefact version will now be ``"myfile3.txt, myfile4.zip"``.

Delete an artefact version
``````````````````````````
This functionality is not intended to be used often, but yet, we do provide a way to delete an uploaded artifact version in case the need arises.
The procedure is straightforward and can be done with a single request.

- Name: ``myartefact``
- Tag: ``v1.0.0``

**Using CURL:**
::

    curl -X DELETE "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0"

**Using Python:**
::

    import requests

    url = "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0"
    
    response = requests.delete(url)
    # you should then log the response status code and content depending on your needs

The artefact version will now be deleted and will no longer be available in the repository.

Check artifact metadata and download it by name and version tag
```````````````````````````````````````````````````````````````
This is another straightforward example. We have an artefact that we want to download from the repository.
For identifying it all we will need is the name and the tag of the artefact.

- Name: ``myartefact``
- Tag: ``v1.0.0``

Optionally, we will first check the metadata of the artefact to see if it is the one we want to download.

**Using CURL to check metadata:**
::

    curl -X GET "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0"

**Using Python to check metadata:**
::

    import requests

    url = "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0"
    
    response = requests.get(url)
    # you should then log the response status code and content depending on your needs

Now that we have checked the metadata and we are sure we want to download the artefact, we can proceed with the download.

**Using CURL to download the artefact:**
::

    curl -X GET "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0?format=zip" -o myartefact.zip

**Using Python to download the artefact:**
::

    import requests

    url = "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0?format=zip"
    
    response = requests.get(url)
    with open("myartefact.zip", "wb") as f:
        f.write(response.content)
    # you should then log the response status code and content depending on your needs

The artefact assets (files) will now be in the ``myartefact.zip`` file. You can then extract them and use them as needed.

List artefact versions, get sha key for specific version, and download artefact by sha key
``````````````````````````````````````````````````````````````````````````````````````````
Another way to download an artefact, is by referencing its name and sha key.
in this example we will list all versions of an artefact, get the sha key for a specific version, and then download the artefact by that sha key.

- Name: ``myartefact``
- SHA: ``730b95bd``

**Using CURL to list all versions of an artefact:**
::

    curl -X GET "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact"

**Using Python to list all versions of an artefact:**
::

    import requests

    url = "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact"
    
    response = requests.get(url)
    # you should then log the response status code and content depending on your needs

We will now get a json response with all the versions of the artefact. One of the fields of the response will be ``sha256``. This is the sha key we need to download the artefact.

**Using CURL to download the artefact by sha key:**
::

    curl -X GET "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/sha/730b95bd?format=zip" -o myartefact.zip

**Using Python to download the artefact by sha key:**
::

    import requests

    url = "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/sha/730b95bd?format=zip"
    
    response = requests.get(url)
    with open("myartefact.zip", "wb") as f:
        f.write(response.content)
    # you should then log the response status code and content depending on your needs

The artefact assets (files) will now be in the ``myartefact.zip`` file. You can then extract them and use them as needed.

List all assets of an artefact version and download a specific asset
````````````````````````````````````````````````````````````````````
In this example we will list all assets of an artefact version and download a specific asset.

- Name: ``myartefact``
- Tag: ``v1.0.0``
- Asset: ``myfile1.txt``

**Using CURL to list all assets of an artefact version:**
::

    curl -X GET "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0/assets"

**Using Python to list all assets of an artefact version:**
::

    import requests

    url = "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0/assets"
    
    response = requests.get(url)
    # you should then log the response status code and content depending on your needs

We will now get a json response where the body will be a list of all the assets of the artefact version: ``"myfile1.txt; myfile2.txt"``. Using this information we can now download a specific asset.

**Using CURL to download a specific asset:**
::

    curl -X GET "https://binaries.artefact.skao.int/binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0/assets/myfile1.txt" -o myfile1.txt

**Using Python to download a specific asset:**
::

    import requests

    url = "https://binary_artefacts/v1/artefacts/myartefact/tags/v1.0.0/assets/myfile1.txt"
    
    response = requests.get(url)
    with open("myfile1.txt", "wb") as f:
        f.write(response.content)
    # you should then log the response status code and content depending on your needs

The asset will now be in the ``myfile1.txt`` file. You can then use it as needed.
