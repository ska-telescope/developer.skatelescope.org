**********************************
Central Artefact Repository
**********************************

The Central Artefact Repository provides the storage and library management facilities for artefacts throughout the Software Development Life Cycle (SDLC).  Being central to the SDLC means that it is highly desirable that the Repository is stable, long lived, and can evolve with the SKAO requirements through the different stages of DevSecOps maturity, and the life time of the project.

An Artefact Repository is essentially a content management system for software artefacts delivered in their published form.  The Artefact Repository makes it possible to publish and retrieve the artefacts using the native tools, processes and protocols commonly associated with the related programming language and/or language based framework.  The Artefacts are versioned, and decorated with extensible metadata that is used to help manage the life cycle of the Artefacts.  The Central Artefact Repository provides APIs and reporting interfaces to provide integration into extended DevSecOps processes such as CI/CD, Software Bill of Materials (SBoM) and dependency management, license management, provenance, vulnerability scanning and release management. It also provides controlled access to Artefacts through Identity and Access Management (IAM), and offers notary features for provenance through TLS/SSL and signatures.

The purpose of the Central Artefact Repository within the context of the SKAO is to provide a controlled single source of truth for all artefacts that enter the software delivery and verification processes, through to the curation and maintenance of approved software artefacts available for production deployment and historical reference for the lifetime of the Observatory.  This means that the Central Artefact Repository not only holds the canonical reference versions of all artefacts within the SKAO landscape, but it also holds the stateful context of these artefacts as they progress through their continuous life-cycle from development to deployment to decommissioning.  


Deployment
==========

The Central Artefact Repository plays a key role in regulating the flow of artefacts throughout the Software Development Life Cycle.  It is highly integrated into all the phases of software development, building, testing, and publishing.  It can ensure that only approved software artefacts are included in composite products, and subsequently delivered to the production environments.

Whilst it is important for the Repository to be highly available and performant in the context of the SDLC, it is not responsible for directly servicing the delivery of artefacts into the operational environments.  This will be managed by high speed delivery services and caches.

The repository is based on *Nexus* Repository Manager 3 deployed on an independent UK based hosting service. The core deployment is `nexus-oss-edition <https://www.sonatype.com/products/sonatype-nexus-oss>`_ with the nexus-core-feature, nexus-cma-feature, nexus-oss-feature features enabled.

LDAP authentication has been integrated for SKAO administration purposes, with an additional minimal set of accounts for publishing artefacts.  All repositories have read-only permissions for anonymous access.  Additionally, email has been integrated for handling task notifications.


Artefact Conventions
====================

Artefact Naming
---------------

In addition to the semantic versioning scheme, when publishing artefacts to the repositories, the naming conventions for the artefact must be adhered to (also detailed in `ADR-25 - Software naming conventions <https://confluence.skatelescope.org/display/SWSI/ADR-25+General+software+naming+convention>`_).  The general rules are:

#. Prefix the artefact with the namespaced name of the GitLab repository that holds the source code
#. Name the artefact after its core function or after its Gitlab repository name
    
    * **E.g. of artefact named after its Gitlab repository:** ska-tango-examples
    * **E.g. of artefact named after its core function:** ska-tango-images-pytango-builder

#. Observe the Semantic Versioning standard for this kind of artefact
#. Do not use generic versions such as 'latest' tags for container images
#. Published artefacts are immutable - do not re-release an artefact version. To correct any errors, you will need to release a new version.
#. Filters and cleanup policies are implemented to purge artefacts that do not adhere to standards, and where possible validation hooks will deny publishing of incorrectly named/versioned artefacts.  For instance images with the tag 'latest' will be trapped by a cleanup policy.

Artefact Versioning
-------------------

As part of the goal to align all developmental efforts to one standard, we have defined a procedure of how we would like all the *SKAO* developers to
version their releases and what process to follow in ensuring that they are able to make use of the existing Gitlab CI/CD pipeline to automate the building
of artefacts. This standard is defined in detail for each artefact type in `ADR-25 - Software naming conventions <https://confluence.skatelescope.org/display/SWSI/ADR-25+General+software+naming+convention>`_.  These convetions are fundamentally derived from the `Sematic Versioning standard 2.0.0 <https://semver.org/>`_.  In a nutshell, this follows a dotted numeric notation for `Major`.`Minor`.`Patch` eg: `1.2.3`, but please check the above guidance for the details, and language specifics.

Artefact Validation
--------------------

To ensure the guidelines and policies described in this Developer Portal are followed for consistent, compliant and robust artefact management, there are a series of automated validations in place.
If an artefact fails validation, then it is quarantined and the result of the validations are reported back to the developers in a newly created Merge Request.  This Merge Request is assigned to the developer who triggered the pipeline job that pushed the artefact.
The Merge Request title includes the name and version of the artefact and a table composed of the failed validations and instructions on how to mitigate them are given in the MR description.

Each validation has a brief description that explains what it does with a mitigation or explanation (depending on validation type).  This gives detailed information about the artefact and how to fix the issue or provides further explaination of the findings.

All the information listed on this page is used in the artefact validation, i.e. all artefacts are validated against naming, versioning and metadata conventions and they are quarantined if they are not compliant.
