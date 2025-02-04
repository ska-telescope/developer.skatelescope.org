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
========
The REST API is available at the following link: `SKAO RAW <https://CHANGEME>`__.

There are 2 main endpoints in the API:
- Repository: This endpoint allows the user to create, list, edit and get information about specific repositories.
- Artefact: This endpoint allows the user to upload, download, list, edit, get info and delete artefacts.

.. _rest_api_documentation:

Repository Endpoints
--------------------
.. _rest_api_documentation:

GET /repositories/
~~~~~~~~~~~~~~~~~~~
**Description:** Retrieves a list of all available repositories.

**Response:**
    - ``200 OK`` - Returns a JSON array containing repository details.
    - ``500 Internal Server Error`` - If an error occurs while retrieving repositories.

GET /repositories/{repository_name}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**Description:** Retrieves information about a specific repository.

**Path Parameters:**
    - ``repository_name`` (string) - Name of the repository to fetch details for.

**Response:**
    - ``200 OK`` - Returns a JSON object with repository details.
    - ``404 Not Found`` - If the repository does not exist.

POST /repositories/{repository_name}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**Description:** Creates a new repository.

**Path Parameters:**
    - ``repository_name`` (string) - Name of the repository to create.

**Request Body:**

.. code-block:: json

    {
      "type": "maven",
      "storage": "default"
    }

**Response:**
    - ``201 Created`` - Repository created successfully.
    - ``400 Bad Request`` - If request parameters are invalid.
    - ``409 Conflict`` - If the repository already exists.

PUT /repositories/{repository_name}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**Description:** Edits information about an existing repository.

**Path Parameters:**
    - ``repository_name`` (string) - Name of the repository to update.

**Request Body:**

.. code-block:: json

    {
      "type": "maven",
      "storage": "custom-location"
    }

**Response:**
    - ``200 OK`` - Repository updated successfully.
    - ``400 Bad Request`` - If request parameters are invalid.
    - ``404 Not Found`` - If the repository does not exist.

Artefact Endpoints
------------------

GET /repositories/{repository_name}/artefacts/
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**Description:** Retrieves all artefacts from a specific repository.

**Path Parameters:**
    - ``repository_name`` (string) - Name of the repository.

**Response:**
    - ``200 OK`` - Returns a JSON array containing artefact details.
    - ``404 Not Found`` - If the repository does not exist.

GET /repositories/{repository_name}/artefacts?tag={tag}&sha256={sha}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**Description:** Retrieves information about a specific artefact by tag or SHA256 within a repository.

**Query Parameters:**
    - ``tag`` (string) - Tag name of the artefact.
    - ``sha256`` (string) - SHA256 hash of the artefact.

**Response:**
    - ``200 OK`` - Returns a JSON object with artefact details.
    - ``404 Not Found`` - If the artefact does not exist.

POST /repositories/{repository_name}/artefacts?tag={tag}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**Description:** Uploads a new artefact to a repository.

**Path Parameters:**
    - ``repository_name`` (string) - Name of the repository.

**Query Parameters:**
    - ``tag`` (string) - Tag name for the new artefact.

**Request Body:**
    Binary file upload.

**Response:**
    - ``201 Created`` - Artefact uploaded successfully.
    - ``400 Bad Request`` - If the request is malformed.
    - ``409 Conflict`` - If an artefact with the same tag already exists.

PUT /repositories/{repository_name}/artefacts?tag={tag}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**Description:** Edits an existing artefact in a repository.

**Path Parameters:**
    - ``repository_name`` (string) - Name of the repository.

**Query Parameters:**
    - ``tag`` (string) - Tag name of the artefact to update.

**Request Body:**
    Binary file upload or metadata changes.

**Response:**
    - ``200 OK`` - Artefact updated successfully.
    - ``400 Bad Request`` - If the request is malformed.
    - ``404 Not Found`` - If the artefact does not exist.

DELETE /repositories/{repository_name}/artefacts?sha256={sha}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**Description:** Deletes an existing artefact from a repository using its SHA256.

**Path Parameters:**
    - ``repository_name`` (string) - Name of the repository.

**Query Parameters:**
    - ``sha256`` (string) - SHA256 hash of the artefact.

**Response:**
    - ``204 No Content`` - Artefact deleted successfully.
    - ``404 Not Found`` - If the artefact does not exist.

GET /repositories/{repository_name}/artefacts/content?tag={tag}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**Description:** Downloads a specific artefact by name and tag from a repository.

**Path Parameters:**
    - ``repository_name`` (string) - Name of the repository.

**Query Parameters:**
    - ``tag`` (string) - Tag name of the artefact to download.

**Response:**
    - ``200 OK`` - Returns the binary content of the requested artefact.
    - ``404 Not Found`` - If the artefact does not exist.
    - ``500 Internal Server Error`` - If there is an issue retrieving the file.

