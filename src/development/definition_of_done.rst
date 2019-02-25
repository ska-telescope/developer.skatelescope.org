Definition of Done
------------------

Done-ness is defined differently at different stages of development and for different purposes.

Story
=====

  * Code is supplied with an acceptable license
  * Code is peer-reviewed (via pull-request process)
  * Code is checked into SKA repository with reference to ticket
  * Code has tests that have adequate (between 75% and 90%) coverage
  * Code compiles cleanly with no warnings
  * Code adheres to SKA language specific style
  * Code is deployed to continuous integration environment
  * Code passes regression testing
  * Code passes smoke test
  * NFRs are met
  * Story is tested against acceptance criteria
  * Story is documented
  * Story ok-ed by Product Owner

Code documentation
==================

  * Public API exposed is clearly documented
  * Code is documented inline according to language specific standards
  * Documentation is peer-reviewed by stakeholder (e.g. Product Owner for a feature or technical peer for an enabler) via pull-request mechanism.
  * Documentation is deployed to externally visible website accessible via the developer portal.

Feature
=======

  * Feature has been demonstrated to relevant stakeholders
  * Feature meets the acceptance criteria
  * Feature is accepted by Feature owner
  * Feature is integrated in an integration environment
  * Code documentation is integrated as part of the developer portal
  * Architectural documentation is updated to reflect the actual implementation
  
Formally Controlled Project Documentation
=========================================

Some documentation (particularly architectural documentation) that impacts other parts of 
the project must to be formally reviewed and placed in the project's configuration management
system. Whilst there is an unavoidable overhead to this we aim to make it as efficient as 
possible. However, this level of documentation requires you to follow the process in the `Configuration Management are of Confluence <https://confluence.skatelescope.org/display/CMI/Document+Management>`_, specifically:

  * Document number obtained by completing and forwarding the `New Document Request Form <https://ska-aw.bentley.com/SKAProd/Search/QuickLink.aspx?n=SKA-TEL-SKO-0000511&t=3&d=Main%5ceB_PROD&sc=Global&i=view>`_ to mailto:cm@skatelescope.org.
  * Document is reviewed by suitable reviewer(s).
  * Document is in eB and signed off.
