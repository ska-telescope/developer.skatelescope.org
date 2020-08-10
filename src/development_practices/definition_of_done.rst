Definition of Done
==================

Done-ness is defined differently at different stages of development and for different purposes.

Team Increment
==============
=================== =========================================================================================================================
Issue Type          Definition of Done
=================== =========================================================================================================================
**Story/Enabler**   **Code**

                    * Supplied with an `acceptable license <https://developer.skatelescope.org/en/latest/projects/licensing.html?#licensing-a-project>`_
                    * Adheres to SKA language `specific style <https://developer.skatelescope.org/en/latest/search.html?q=coding%2Bguidelines>`_
                    * Checked into SKA repository with `reference <https://developer.skatelescope.org/en/latest/tools/jira.html>`_ to a Jira issue ID
                    * Passes the CI/CD pipeline including compiling cleanly and being linted with no `warnings <https://developer.skatelescope.org/en/latest/tools/continuousintegration.html?#linting>`_ 
                    * Unit and module `tests <https://developer.skatelescope.org/en/latest/tools/continuousintegration.html?#test>`_ pass with adequate coverage (>= 75% with appropriate exclusions for boiler-plate code) 
                    * Component, integration and system `tests <https://developer.skatelescope.org/en/latest/tools/continuousintegration.html?#test>`_ (appropriate for the context) pass 
                    * Regression `tests <https://developer.skatelescope.org/en/latest/tools/continuousintegration.html?#test>`_ pass 

                    `Code Documentation <https://developer.skatelescope.org/en/latest/projects/document_project.html#documenting-a-project>`_

                    * Exposed `Public API <https://developer.skatelescope.org/en/latest/projects/document_project.html#documenting-the-public-api>`_ (where applicable) is cleanly documented 
                    * Documented inline according to `language specific standards <https://developer.skatelescope.org/en/latest/search.html?q=coding%2Bguidelines>`_
                    * Deployed to externally visible website accessible via the `developer portal <https://developer.skatelescope.org/en/latest/projects/document_project.html#integrating-into-the-developer-portal>`_

                    **Integration**

                    * Deployed to a `continuous integration <https://developer.skatelescope.org/en/latest/tools/continuousintegration.html#continuous-integration>`_ environment (staging environment during Construction) 
                    * `Migrations <https://developer.skatelescope.org/en/latest/projects/create_new_project.html?highlight=migration#repository-contents>`_ are implemented with defined automated processes for roll-forward and rollback as appropriate
 
                    **Process**

                    * Peer-reviewed and integrated into the main branch via Gitlab `merge-request <https://developer.skatelescope.org/en/latest/tools/git.html#merge-requests>`_ process 
                    * Relevant `NFRs <https://confluence.skatelescope.org/display/SWSI/Requirements>`_ are met 
                    * Satisfies acceptance criteria 
                    * Accepted by Product Owner
**Spike**           **Documentation**

                    * Outcomes documented on the relevant SKA platform
                    * Documentation linked to issue in Jira

                    **Process**

                    * Outcomes reviewed by relevant stakeholders
                    * Satisfies acceptance criteria
                    * Accepted by Product Owner
=================== =========================================================================================================================

System Increment
================

=================== =========================================================================================================================
Issue Type          Definition of Done
=================== =========================================================================================================================
**Feature/Enabler** **Child Stories/Enablers**

                    * Completed by all teams and integrated in an `integration environment <https://developer.skatelescope.org/en/latest/development/getting_started.html#incorporate-my-project-into-the-integration-environment>`_ (staging environment during Construction)

                    **Documentation**

                    * `Solution Intent <https://confluence.skatelescope.org/display/SWSI/Solution+Intent+Home>`_ updated to reflect the actual implementation

                    **Process**

                    * Satifies acceptance criteria
                    * Relevant `NFRs <https://confluence.skatelescope.org/display/SWSI/Requirements>`_ are met
                    * Demonstrated to relevant stakeholders
                    * Accepted by Feature Owner
**Spike**           **Documentation**

                    * Outcomes documented on the relevant SKA platform
                    * Documentation linked to issue in Jira

                    **Process**

                    * Outcomes reviewed by relevant stakeholders
                    * Satisfies acceptance criteria
                    * Accepted by Spike Owner
=================== =========================================================================================================================

Solution Increment
==================

====================== =========================================================================================================================
Issue Type             Definition of Done
====================== =========================================================================================================================
**Capability/Enabler** **Child Stories/Enablers**

                       * Completed by all ARTs and integrated in an `integration environment <https://developer.skatelescope.org/en/latest/development/getting_started.html#incorporate-my-project-into-the-integration-environment>`_ (staging environment during Construction)

                       **Documentation**

                       * `Solution Intent <https://confluence.skatelescope.org/display/SWSI/Solution+Intent+Home>`_ updated to reflect the actual implementation

                       **Process**

                       * Satifies acceptance criteria
                       * Relevant `NFRs <https://confluence.skatelescope.org/display/SWSI/Requirements>`_ are met
                       * Demonstrated to relevant stakeholders
                       * Accepted by Capability Owner
====================== =========================================================================================================================

Release
=======

=================== =========================================================================================================================
Issue Type          Definition of Done
=================== =========================================================================================================================
TBD                 TBD
=================== =========================================================================================================================


Formally Controlled Project Documentation
=========================================

Documents that are matured to the extent that they quantify an impact on safety, security, quality, schedule, cost, profit or the environment should be validated and formally controlled as per the SKA Document Creation, Validation and Release Standard Operating Procedure (SOP) (SKA-TEL-SKAO-0000765).  Until such time, the `Lightweight Document Process and Repository <https://confluence.skatelescope.org/display/SE/Lightweight+Document+Process>`_ may used to manage these documents.

Thereafter, these documents must be formally reviewed and placed in the project's configuration management
system. Whilst there is an unavoidable overhead to this we aim to make it as efficient as 
possible. However, this level of documentation requires you to follow the process in the `Configuration Management part of Confluence <https://confluence.skatelescope.org/display/CMI/Document+Management>`_, specifically:

  * Document number obtained by completing and forwarding the `New Document Request Form <https://ska-aw.bentley.com/SKAProd/Search/QuickLink.aspx?n=SKA-TEL-SKO-0000511&t=3&d=Main%5ceB_PROD&sc=Global&i=view>`_ to mailto:cm@skatelescope.org.
  * Document is reviewed by suitable reviewer(s).
  * Document is in eB and signed off.

