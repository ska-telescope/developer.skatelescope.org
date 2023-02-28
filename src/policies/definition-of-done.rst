.. _definition-of-done:

Definition of Done
==================

Done-ness is defined differently at different stages of development and for different purposes.

The tables below describe the criteria that need to be taken into account by Product Owners (for Team Increment work), by Feature Owners (for System Increment), by Capability Owners (for Solution Increment work), and by Release Managers (for Software Releases).

Please note that when a Product/Feature/Capability Owner, or Release Manager marks a Story/Feature/Capability/Release as Done, **all applicable criteria** from the Definition of Done are expected to be fulfilled. When that is not possible, or applicable to an item, the Product/Feature/Capability Owner, or Release Manager MUST indicate in the comments why those elements of the Definition of Done do not apply to that Product/Feature/Capability or Release.

Failure to justify the lack of complete compliance with the Definition of Done results in decreasing quality, and increased Technical Debt, so please be very mindful of this Definition of Done.

Definition of Done checklists are mandated to be used at all stages of development.  The definition at the Team Increment may be customised to the context of a team e.g. Enabling Team vs Feature Team. Speak to an RTE to arrange this.

Team Increment
--------------

=================== =========================================================================================================================
Issue Type          Definition of Done
=================== =========================================================================================================================
**Story/Enabler**   **Code**

                    * Supplied with an :ref:`ok-licenses`.
                    * Adheres to SKA language :doc:`specific style </tools/codeguides>`.
                    * Checked into SKA repository with a :doc:`reference </tools/jira>` to a JIRA ticket ID.
                    * Passes the CI/CD pipeline including compiling cleanly and being linted with no warnings: :ref:`linting`.
                    * Unit and module :ref:`tests <tests>` pass with adequate coverage (>= 75% with the appropriate exclusions for boiler-plate code).
                    * Component, integration and system :ref:`tests <tests>` (appropriate for the context) pass.
                    * Regression :ref:`tests <tests>` pass.
                    * Outstanding bugs and technical debt have been logged and triaged, Major or Critical severity issues have been fixed.


                    **Artefacts**

                    * Packaged software artefacts are published to the Central Artefact Repository inline with  :doc:`SKA naming and semantic versioning standards </tools/software-package-release-procedure>`.


                    :doc:`Code Documentation </tools/documentation>`

                    * Exposed Public :ref:`API <API>` (where applicable) is cleanly documented.
                    * Documented inline according to :doc:`language specific standards </tools/codeguides>`.
                    * Deployed to externally visible website accessible via the :ref:`dev-portal-integration`.


                    **Integration**

                    * Deployed to a :doc:`/tools/ci-cd/continuous-integration` environment (staging environment during Construction).


                    **Process**

                    * Peer-reviewed/approved and integrated into the default branch via GitLab :ref:`merge-request`.
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
----------------

=================== =========================================================================================================================
Issue Type          Definition of Done
=================== =========================================================================================================================
**Feature/Enabler** **Child Stories/Enablers**

                    * Completed by all teams and integrated in an :ref:`integration environment <verify-k8s>`  (staging environment during Construction).

                    **Documentation**

                    * `Solution Intent <https://confluence.skatelescope.org/display/SWSI/Solution+Intent+Home>`_ and `User Documentation <https://confluence.skatelescope.org/display/UD/User+Documentation>`_ updated to reflect the actual implementation.

                    **Process**

                    * UX deliverables (where applicable) are usable by end users or their proxies
                    * Outstanding bugs and technical debt have been logged and triaged, Major or Critical severity issues have been fixed
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
------------------

====================== =========================================================================================================================
Issue Type             Definition of Done
====================== =========================================================================================================================
**Capability/Enabler** **Child Stories/Enablers**

                       * Completed by all teams, deployed and tested in a `Continuous Deployment <https://developer.skatelescope.org/en/latest/tools/ci-cd/continuous-integration.html>`_ environment (staging environment during Construction).

                       **Documentation**

                       * `Solution Intent <https://confluence.skatelescope.org/display/SWSI/Solution+Intent+Home>`_ or project documentation updated to reflect the actual implementation

                       **Process**

                       * Outstanding bugs and technical debt have been logged and triaged, Major or Critical severity issues have been fixed
                       * Satifies acceptance criteria
                       * Relevant `NFRs <https://confluence.skatelescope.org/display/SWSI/Requirements>`_ are met
                       * Demonstrated to relevant stakeholders
                       * Accepted by Capability Owner
                       * Any remaining technical debt has been added to the backlog
====================== =========================================================================================================================

Release
-------

=================== =========================================================================================================================
Issue Type          Definition of Done
=================== =========================================================================================================================
**Release**

                       * Delivered items Done and meet Acceptance Criteria
                       * Artifacts published in the Central Artefact Repository
                       * A short clear description/summary of the release is provided
                       * User facing change log provided
                       * User facing documentation provided
                       * Verification of the functionality, behavior, and performance of user interfaces provided by product, carried out in an relevant environment
                       * Outstanding bugs and technical debt have been logged and triaged, Major or Critical severity issues have been fixed.
=================== =========================================================================================================================


Formally Controlled Project Documentation
-----------------------------------------

Documents that are matured to the extent that they quantify an impact on safety, security, quality, schedule, cost, profit or the environment should be validated and formally controlled as per the SKA Document Creation, Validation and Release Standard Operating Procedure (SOP) (SKA-TEL-SKAO-0000765).  Until such time, the `Lightweight Document Process and Repository <https://confluence.skatelescope.org/display/SE/Lightweight+Document+Process>`_ may used to manage these documents.

Thereafter, these documents must be formally reviewed and placed in the project's configuration management
system. Whilst there is an unavoidable overhead to this we aim to make it as efficient as
possible. However, this level of documentation requires you to follow the process in the `Configuration Management part of Confluence <https://confluence.skatelescope.org/display/CMI/Document+Management>`_, specifically:

  * Document number obtained by completing and forwarding the `New Document Request Form <https://ska-aw.bentley.com/SKAProd/Search/QuickLink.aspx?n=SKA-TEL-SKO-0000511&t=3&d=Main%5ceB_PROD&sc=Global&i=view>`_ to mailto:cm@skatelescope.org.
  * Document is reviewed by suitable reviewer(s).
  * Document is in eB and signed off.

