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