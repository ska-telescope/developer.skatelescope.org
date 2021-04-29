==================================
Fundamental SKA Software Standards
==================================

These standards underpin all SKA software development. The canonical copy of this information is 
`held in eB <https://ska-aw.bentley.com/SKAProd/Search/QuickLink.aspx?n=SKA-TEL-SKO-0000661&t=3&d=Main%5ceB_PROD&sc=Global&r=03&i=view>`_ ,
but the essential information is on this page, which is extracted from the eB document.


LIST OF ABBREVIATIONS
#####################

+--------+--------------------------------------------------------------------------------+
| ABBR   | MEANING                                                                        |
+========+================================================================================+
| ADR    |  Architectural Decision Record                                                 |
+--------+--------------------------------------------------------------------------------+
| AN     |  AD                                                                            |
+--------+--------------------------------------------------------------------------------+
| API    |  Application Programming Interface                                             |
+--------+--------------------------------------------------------------------------------+
| BSD    |  Berkeley System Distribution                                                  |
+--------+--------------------------------------------------------------------------------+
| CSP    |  Central Signal Processor                                                      |
+--------+--------------------------------------------------------------------------------+
| CUDA   | Originally “Compute Unified Device Architecture”, now an Nvidia trade mark     |
+--------+--------------------------------------------------------------------------------+
| EX     | Example                                                                        |
+--------+--------------------------------------------------------------------------------+
| FPGA   | Field Programmable Gate Array                                                  |
+--------+--------------------------------------------------------------------------------+
| HDL    | Hardware Description Language                                                  |
+--------+--------------------------------------------------------------------------------+
| IEC    | International Electro-technical Commission                                     |
+--------+--------------------------------------------------------------------------------+
| IEEE   | Institute of Electrical and Electronics Engineers                              |
+--------+--------------------------------------------------------------------------------+
| IETF   | Internet Engineering Task Force                                                |
+--------+--------------------------------------------------------------------------------+
| ITF    | Integration and Test Facility                                                  |
+--------+--------------------------------------------------------------------------------+
| ISO    | International Standards Organisation                                           |
+--------+--------------------------------------------------------------------------------+
| LSST   | Large Synoptic Survey Telescope                                                |
+--------+--------------------------------------------------------------------------------+
| LSST DM| Large Synoptic Survey Telescope Data Management element                        |
+--------+--------------------------------------------------------------------------------+
| LFAA   | Low Frequency Aperture Array                                                   |
+--------+--------------------------------------------------------------------------------+
| LMC    | Local Monitoring and Control                                                   |
+--------+--------------------------------------------------------------------------------+
| NIP    | Non Image Processing                                                           |
+--------+--------------------------------------------------------------------------------+
| ReST   | Re-Structured Text                                                             |
+--------+--------------------------------------------------------------------------------+
| RFC    | Request for Comment                                                            |
+--------+--------------------------------------------------------------------------------+
| SDP    | Science Data Processor                                                         |
+--------+--------------------------------------------------------------------------------+
| SKA    | Square Kilometre Array                                                         |
+--------+--------------------------------------------------------------------------------+
| SKAO   | SKA Organisation (before 1 May 2021) or SKA Observatory (after 1 May 2021)     |
+--------+--------------------------------------------------------------------------------+
| VHDL   | Very High Speed Integrated Circuit (VHSIC) Hardware Description Language       |
+--------+--------------------------------------------------------------------------------+


Introduction
============

Explanation of terms
--------------------

In this document, terms in bold italic font are terms that have a
specific meaning in the document. The first usage of the term will
generally represent a definition. For example, in this document:

-  A **Hardware Description Language** is a specialized computer
   language used to describe the structure and behavior of electronic
   circuits, and most commonly, digital logic circuits [1]_.

-  **Firmware** is a combination of a hardware device and computer
   instructions or computer data that reside as read-only software on
   the hardware device [2]_.

-  **Software** includes the software portion of **firmware** as well as
   traditional software, in both source code and binary code form. In
   this document **software** also includes source code and binary
   **Hardware Description Language** artefacts associated with
   programmable electronic circuit design. This will be referred to as
   **FPGA software**.

-  **SKA Software** is **software** that is essential for the SKA
   Observatory to be supported and operated.

The inclusion of **firmware** into the **software** definition follows
ISO/IEEE conventions. The inclusion of **Hardware Description Language**
code development (i.e. **FPGA software**) into the **software**
definition is unusual, and only applies in this document. Occasionally
the word software is used in its ISO/IEEE sense (i.e. not including HDL
code development) and in these cases it is not written in bold italic
font. It is accepted that the use of **Hardware Description Language**
in the title of this document is not required according to the
definitions above, but it was included in the title for clarity
purposes.

Purpose of the document
-----------------------

This document outlines standards that are applicable to all **SKA
software**.

Scope of the document
---------------------

The scope of these standards includes all **SKA software** and the
infrastructure associated with it.

**SKA software** lies on a spectrum comprising:

1) **Off-the-shelf software**, which is **software** that was not
   written specifically for the SKAO. This includes, for example:

   a. Operating systems

   b. Compilers

   c. Database software

   d. Desktop applications

   e. FPGA development tools and IP cores.

2) **Derived software**, which is **software** that has some modules
   written or modified explicitly for the SKAO, but which also includes
   some modules that were originally developed for some other purpose.
   Examples include:

   a. Framework software such as the Tango control system.

   b. Business software such as procurement software which may be
      heavily customized for the SKAO.

   c. **Software** that has been written for a similar purpose for
      another telescope and has been adapted for use for the SKA
      Observatory.

3) **Bespoke software** is **software** that has been written
   specifically for the SKAO. This includes, for example:

   a. Control and monitoring software such as Tango device servers.

   b. Data-driven data processing **software** for SDP and the
      Non-Imaging processing **software**.

   c. Web based software with database backends for observation and user
      management.

   d. Much of the **FPGA software** for SKA-Low and CSP.

**Derived software** is a continuum that ranges all the way between pure
**off-the-shelf software** and pure **bespoke software**. And the
standards that are applicable are also a mixture of the standards for
the two extremes.

In the following, there are explicit standards that apply to
**off-the-shelf software** and **bespoke software**. In general, the
former will apply to the non-SKA (i.e. the **off-the shelf**) modules of
**derived software**, and the latter to SKA specific (i.e. the
**bespoke**) modules. Developers should make every effort to clearly
distinguish between the two types of modules within a **derived
software** system so, for example, it is possible to automatically
separate the two for metrics evaluation.

However, the area is complicated (for example, some open-source
off-the-shelf components may satisfy most of the **bespoke software**
requirements) and so these standards must be applied intelligently as
guidelines for **derived software**. In most cases a common-sense
approach can be taken.

References
==========

Applicable documents
--------------------

The following documents are applicable to the extent stated herein. In
the event of conflict between the contents of the applicable documents
and this document, **the applicable documents** shall take precedence.

1. SKA-GOV-0000086 SKA Observatory Intellectual Property Policy

Reference documents
-------------------

The following documents are referenced in this document. In the event of
conflict between the contents of the referenced documents and this
document, **this document** shall take precedence.

1.  ISO/IEC 12207:2013 Systems and software engineering – Software life
    cycle processes.

2.  Clement et al, `Documenting Software Architectures: Views and
    Beyond, Second
    Edition <http://resources.sei.cmu.edu/library/asset-view.cfm?assetid=30386>`__
    Addison-Wesley, 2011.

3.  ISO/IEC/IEEE 42010:2011(E), Systems and software engineering —
    Architecture description 2012.

4.  IEC 62682:2014 Management of alarms systems for the process
    industries.

5.  Semantic Versioning 2.0.0. http://semver.org/

6.  The SKA Developer Portal. https://developer.ska-telescope.org

7.  SKA-TEL-SKO-0001201 ENGINEERING MANAGEMENT PLAN

8.  SKA-TEL-SKO-0001065 Solution Intent Definition Document

9.  Rick Kazman, Mark Klein, Paul Clements, ATAM: Method for
    Architecture Evaluation, TECHNICAL REPORT CMU/SEI-2000-TR-004
    ESC-TR-2000-004

10. SKA-TEL-SKO-0001772 SKA Software Product Quality Assurance Plan

11. SKA-GOV-HR00028 Code of Ethics

Standards Applicable to all SKA Software
========================================

1. All **SKA software** shall have a copyright notice which is a
   description of who asserts the copyright over the **software**.

   a. Notes:

      i.  **Derived software** and **bespoke software** will normally be
          comprised of code modules which have a mixture of copyright
          attributions. Some code modules will have joint copyright, and
          others have sole copyright, but the codebase in its entirety
          will have a mixture.

      ii. Detailed guidelines on how to include Copyright information as
          part of **bespoke software** are published on the SKA
          developer portal [RD6] at :doc:`/projects/licensing`.

2. All **SKA software** shall have a **software license** which is a
   legal instrument governing the use or redistribution of **software**.

   a. Notes:

      i.   The **software license** shall be delivered as part of all
           software products.

      ii.  **Off-the-shelf software** will normally have licenses over
           which the SKA has no control.

      iii. **Derived software** may have a mixture of licenses.

      iv.  **Bespoke software** will normally have a permissive open
           source license.

      v.   Detailed guidelines on how to include License information in
           a **software** distribution are published on the SKA
           Developer Portal [RD6] :doc:`/projects/licensing`.

3. All **SKA Software** shall be documented. The only official
   documentation language accepted by SKA is the English language.

   a. Notes:

      i.   All **SKA software** documentation will include a user
           manual.

      ii.  **Bespoke software** and **Derived software** documentation
           will include developer documentation.

      iii. **Bespoke software** and **Derived software** shall contain
           inline code documentation. Inline code documentation shall be
           written in English.

      iv.  All documentation and code shall be written so as to abide by
           the SKA Code of Ethics [RD11].

4. The documentation associated with **SKA software** shall also be
   subject to a specific license unless it is covered by the **software
   license**.

5. All **software licenses** governing a body of **software** must be
   mutually compatible.

6. All **software licenses** for **SKA software** shall be agreed with
   the SKA Observatory prior to the **software** being adopted or
   developed.

   a. Notes:

      i.   The license shall be agreed with the SKA Head of Computing
           and Software or their delegate as agreed.

      ii.  The SKAO will always agree to a `3 clause BSD
           license <https://opensource.org/licenses/BSD-3-Clause>`__ for
           **software** (provided there are no compatibility issues) and
           will favour open-source permissive licenses with attribution
           since they minimize compatibility issues.

      iii. The SKAO will always agree to a `Creative Commons Attribution
           4.0 International
           License <http://creativecommons.org/licenses/by/4.0/>`__ for
           documentation (provided there are no compatibility issues).

      iv.  This permissive open source recommendation is in line with
           the SKAO IP policy [AD1].

      v.   It is understood that the IP licensing environment of **FPGA
           software** is often substantially different to that of the
           open source software environment, with many (or most)
           developments relying on IP (from the FPGA vendor, for
           example) that has more restrictive licensing. In accordance
           with this standard, use of this IP, and its associated
           license, must be agreed in writing with the SKA Observatory.

Standards applicable to Off-the-shelf software
==============================================

All **SKA Software** which is **off-the-shelf software** shall have:

1. A business case describing the requirements for the **software**, in
   comparison to other **software**.

2. A record of the evidence that demonstrates that the **software**
   meets these requirements.

3. A description of how the **software** will be supported during the
   expected lifetime of the **software**.

   1. Notes:

      1. The SKA Observatory has a predicted lifetime of 50 years, which
         is much longer than most **software** products and the
         companies that develop them. Hence this description may
         include: how many alternatives exist which also support the
         **software**\ ’s data products, escrow agreements and
         commercial soundness of the company. Support includes:

         1. Managing unexpected behaviour of the **software** that is
            incompatible with the SKA Observatory’s (possibly evolving)
            requirements.

         2. Managing the evolution of underlying systems, such as
            hardware and operating systems, that the **software**
            depends on.

         3. Managing changes to the existing supplier support
            arrangements (e.g. the original company being acquired, the
            product becoming not commercially viable etc.).

         4. provides a lifecycle plan including isolation and
            integration within the intended solution architecture, and
            the process for decommissioning and succession.

      2. **Software** shall be delivered inclusive of all necessary
         information to perform a full reconfiguration of the
         **software** product deployment and configuration. This
         includes original binary installation files; any scripts that
         support code packaging, deployment, database migration and
         environment provisioning; all project artefacts (deployment
         procedures, release notes, etc…); all configuration files; and
         any other scripts or configuration information required to
         create infrastructure that supports multiple services (e.g.
         enterprise service buses, database management systems, DNS zone
         files, configuration rules for firewalls, and other networking
         devices).

4. Evidence that the **software** has been developed to a standard of
   quality appropriate to the needs of the SKAO.

5. Documentation that is appropriate to the needs of the SKAO. The only
   accepted language for **software** documentation is English.

6. Where the **software** is expected to interoperate with other
   **software** packages, it shall expose integration points via a set
   of programmable APIs. Such interface shall be documented, accessible
   to SKA, and delivered as part of the **software**.

7. Where the **off-the-shelf software**\ is expected to interoperate
   with other **SKA Software,** an instance of the **software** shall be
   available for installation in the various Integration and
   qualification environments so that **SKA Software** can be tested
   against it during development and integration phases.

8. Been approved by the SKAO as to its fitness for purpose and included
   in a public register of approved **SKA Software**.

Standards applicable to derived software
========================================

As described in `Scope of the document <#_heading=h.4d34og8>`__ the
spectrum between **off-the-shelf software** and **bespoke software** is
a continuum and the application of off-the-shelf or bespoke standards
will be evaluated on a case by case basis.

It is anticipated that SKA will make use of a number of domain specific
open-source software packages, often developed in the context of the
larger astronomy software ecosystem. A model for collaboration shall be
established on a case by case basis, based on these criteria:

1. The compatibility of the license applied to **derived software**
   shall be evaluated.

2. Where an external open source software package is supported by a
   healthy community of developers, according to well established
   processes that enable collaboration, SKAO will encourage that
   interaction is carried on within the external software community.

3. Where a **software** package needs to be adopted by SKA and supported
   mainly by the SKA development activity, it is preferred that the
   **software** is transferred under the SKAO. A greater part of the
   **bespoke software** standards will be applied in this case, with
   exceptions defined based on the status of the package on a case by
   case basis.

Standards Applicable to Bespoke Software
========================================

Design
------

This section comprises standards relating to processes described by ISO
12207 [RD1], §7.1.2 (Requirements), §7.1.3 (Architecture) and §7.1.4
(Detailed Design). They complement any general System Engineering level
standards described in the Engineering Management Plan [RD7] applicable
to all SKA systems.

All **SKA Software** that is **bespoke software** shall have
documentation and models covering the following:

1. The requirements the **software** is intended to fulfil, in a way
   that can be traced to the higher-level SKA Requirements..

2. The **software** architecture used.

   a. Notes:

      i.   The **software architecture** must be documented as part of
           the SKA Solution Intent [RD8], published on the SKA
           Confluence website.

      ii.  The recommended reference for architecture documentation is
           “\ `Documenting Software Architectures: Views and Beyond,
           Second
           Edition <http://resources.sei.cmu.edu/library/asset-view.cfm?assetid=30386>`__\ ”
           (Clements et al, 2011) [RD2]. This book should be consulted
           for best practices on documenting views, styles and
           interfaces. The ISO 42010 [RD3] standard is also relevant.

      iii. The architecture documentation should include, at minimum

           1. System Overview, including a description of the
              architectural styles used.

           2. A set of views describing key features of the
              architecture, and the mapping between views.

           3. Interface Documentation or references to applicable
              Interface Control Documents for the major interfaces.

           4. Rationale justifying how the architecture satisfies the
              system quality attributes and architecturally significant
              functional requirements. Justification on the basis of
              models and evolutionary prototypes is highly recommended
              in many cases.

           5. A consideration as to whether there is any existing
              **software** that meets, or can be modified to meet, the
              requirements.

      iv.  Emphasis should be on clear, unambiguous diagrams with
           accompanying descriptions and tables.

      v.   Refer to Chapter 11 of Clements et al for a description of
           interface documentation. Interfaces that are language or
           framework specific may be best documented in a format
           appropriate to that language or framework (e.g. generated
           from comments and code in an evolutionary prototype).

3. Where a prototype **software** exists that informs the development,
   evidence that such prototype **software** satisfies the
   architecturally relevant requirements.

4. Detailed design of components.

   a. Note:

      i.  It is expected that a significant amount of the detailed
          design may be automatically generated from code and comments.
          Detailed design information that can be derived directly from
          source code repositories is published as part of the SKA
          developer portal [RD6] at :doc:`/tools/documentation`.

      ii. Detailed design documentation for **FPGA software** should
          include estimates of device utilization (DSPs, BRAMS, LUTs
          etc), details of clock rates and clocking domains and tracking
          of timing closure issues

The **software** design should be reviewed, and the reviews should
incorporate the following factors:

1. The SKAO is responsible for reviewing and agreeing all system
   requirements.

2. Specifications for the **software** will be accessible via the SKA
   Solution Intent Confluence Space:

   a. Notes

      i.   SKA Requirements will be accessible via linkage with the Jama
           contour tool.

      ii.  Non-functional requirements are part of the specifications.

      iii. The Architectural Decision Records (ADRs) are part of the
           specification. The related collection and analysis process is
           defined in the SKA developer portal [RD6] at doc:`/policies/decision-making`.

3. SKAO personnel should be involved in **software** architecture
   reviews.

4. The **software** architecture should be reviewed to demonstrate that
   it meets key requirements and provides sufficient detail for cost
   estimation and implementation.

   a. Notes:

      i. The Architecture Tradeoff Analysis Method [RD9] is a relevant
         process to be considered when executing **software**
         architecture reviews

5. Both the architecture and detailed design reviews shall carefully
   consider the requirements relating to the long lifetime of the SKA
   Observatory. This includes, for example:

   a. Portability of the system across multiple architectures and
      operating systems.

   b. Consideration of the life-cycle of all dependencies, including
      development tools and run-time dependencies.

   c. The need for the system to be compatible with version 6 of the
      Internet Protocol.

   d. The careful design of API’s and the need to exchange data by API’s
      rather than relying on environmental assumptions about file
      systems, for example.

6. Detailed design shall be reviewed:

   a. By someone in addition to the principal developer of the module
      being considered.

   b. In a manner appropriate to the significance of the module.

      i. Note:

         1. The significance of the code relates to the impact any
            changes to the design has on other parts of the system.

         2. The review process must not be overly bureaucratic.
            Development teams should be empowered to design and develop
            the code efficiently and modify the internal design when
            required.

Construction
------------

This section comprises standards relating to processes described by ISO
12207 (2008) §7.1.5 (Construction).

The construction of **SKA Software**\ *which is*\ **bespoke
software**\ is managed according to the SAFe framework, and it follows
the quality processes described in the SKA Software Product Quality
Assurance Plan [RD10].

The construction of all **SKA Software** which is **bespoke software**
shall include:

1.  The construction of all source code shall follow a defined
    documented process that is approved by the SKAO.

    a. Note:

       i. The process documentation shall include a workflow description
          that follows accepted best practices. For example, it is
          recommended that:

          1. Work management practices shall include the following:

             a. All work tasks shall be described in a ticketing system.

             b. Work tickets shall have a description of the task, an
                estimate of the resource required and amount of the task
                that has been completed.

             c. All code commits shall relate to a ticket in the
                ticketing system.

             d. The developing organisation shall be able to use the
                ticketing system to generate progress metrics.

          2. Code management practices shall include the following:

             a. With the exception of trivial cases (e.g. possibly
                minimal documentation changes) code must only be added
                to or merged with the default development branch by a
                merge-request-like [3]_ mechanism [RD6] (:doc:`/tools/git`).

             b. The merge request (or similar mechanism) must only be
                accepted after the code has been cleanly compiled and
                passes all appropriate tests. This process should be
                triggered automatically.

             c. Merge requests must only be accepted after the code
                changes have been reviewed by more than one developer
                (inclusive of the primary developer).

             d. Merge requests must only be accepted by suitably
                qualified individuals.

          3. Management of binary artefacts shall include the following:

             a. Binary artefacts such as container images and
                **software** packages are generated in a way that is
                automated, traceable, and reproducible. See :doc:`/tools/software-package-release-procedure` in [RD6] for details.

             b. Binary artefacts are made available during the
                development activity at relevant stages for integration
                purposes.

2.  All construction **software** development shall utilise an SKAO
    approved version control system.

    a. Note:

       i. The SKAO approved version control system is Git.

3.  All documentation, source code, **software** source code, firmware
    source code, HDL source code, unit tests, build scripts, deployment
    scripts, testing utilities and debugging utilities must reside in
    the version control system. More detailed guidance on what to
    include in each **software** repository can be found on the SKA
    developer portal [RD6] at :doc:`/projects/create-new-project`.

    a. Note:

       i. To the maximum extent everything stored in the version control
          system, including for example firmware source code, shall be
          stored in a portable/non-proprietary format.

4.  Release tags for code shall adhere to the Semantic Versioning 2.0.0
    specification [RD5].

5.  **Software** shall be written in an SKA approved language and adhere
    to SKA language specific style guides.

    a. Note:

       i.   The primary approved language shall be Python.

       ii.  Coding guidelines and standards for each programming
            language are maintained on the SKA developer portal [RD6] at :doc:`/tools/codeguides/`.

       iii. Use of other languages must be justified by, for example:

            1. Impossibility of running Python in the chosen run-time
               environment.

            2. Python doesn’t provide the necessary performance or a
               native language extension is not feasible.

       iv.  Many other languages are likely to have extensive usage. For
            example:

            1. C/C++ (for high performance computation on conventional
               CPU’s).

            2. Java (e.g. for business logic in web systems and
               **derived software**).

            3. VHDL (for FPGA development).

            4. CUDA (for GPU software).

            5. OpenCL (for software that targets both GPU and FPGAs)

            6. JavaScript (for Web client systems).

6.  SKAO employees must have access to the repository while the
    **software** is under development, be able to sign-up for
    notifications of commits and, if necessary, give feedback to the
    developers.

7.  Test **software** verifying the system **software** at multiple
    levels (from the complete system down to individual module unit
    tests). Tests shall include verifying specific requirements at
    different levels and, as far as practicable, be able to be run
    automatically.

    a. Note:

       i.   Tests shall be able to run in a continuous integration
            environment.

       ii.  The SKA testing policy and guidelines are published on the
            SKA developer portal [RD6] at :doc:`/policies/ska-testing-policy-and-strategy` and those shall be followed by
            software development teams.

       iii. For **software** targeting CPU’s this should include unit
            tests at the class, function or source file level to test
            basic functionality of methods (functions) with an agreed
            minimal coverage of at least 75%, as per the SKA Definition
            of Done [RD6] ( :doc:`/policies/definition-of-done` ). Unit tests created for fixing defects or
            making specific enhancements should be checked-in with a
            reference to the issue for which the tests were created.

       iv.  For **FPGA software** this should include:

            1. Each module shall be associated with a specific test
               bench.

            2. Modules shall undergo simulation with a predefined
               pass/fail criteria.

            3. Release builds shall be made up of verified functional
               blocks and handled in a scripted framework.

            4. Simulated and released code shall match the committed
               code. For example, committing the code shall not change
               register contents (even version numbers) in the source
               code.

8.  **Software** simulations/stubs/drivers/mocks for all major
    interfaces to enable sub-system and system level tests.

9.  Automated documentation generation - including, but not limited to
    parts of detailed design documentation.

    a. Note:

       i.   Automated documentation generation software is generally
            **off-the-shelf software** and so subject to the conditions
            in section 4.

       ii.  Not all documentation can be automatically generated, but it
            should be used wherever it is reasonably practicable.

       iii. The SKAO shall accept ReST format documentation generated
            using Sphinx.

10. A complete definition of other **software** (both off-the-shelf and
    bespoke) that the **software** requires to build and deploy.

11. Deployment scripts or configurations, which allow the **software**
    to be deployed cleanly and in as automated a fashion as is
    practicable, starting with a bare deployment environment.

    a. Note:

       i. For **FPGA software**, this means configuring an un-programmed
          FPGA device in the target SKA system. Deployment may require
          the use of the host-based software delivered as part of the
          control system. In that case, that software also needs to be
          delivered to SKA under the same conditions of the FPGA
          software.

12. The ability to log diagnostic information according to the Logging
    Standards described in the SKA developer portal [RD6] :doc:`/tools/logging-format`. 

13. The ability, dynamically at runtime, to suppress or select logging
    of messages at different severity levels on at least a per-process
    basis (and a per-thread basis or per class basis if appropriate).

14. Applications must observe the POSIX conventions for IO on the
    standard streams stdin(0), stdout(1), and stderr(2).

15. The use of process exit status codes must reserve 0 for success and
    treat any other value as an error condition.

16. Process must observe the POSIX conventions for responding to signals
    especially SIGTERM (terminate gracefully), SIGINT (interrupt and
    exit), and SIGHUP (terminate or reload).

17. The ability to log diagnostics at all major interfaces at a Debug
    severity level according to the Logging Standards described in the
    SKA developer portal [RD6] at :doc:`/tools/logging-format`.

18. Alarms, where applicable, shall be based on the IEC 62682 standard
    [RD4].

Acceptance and handover
-----------------------

This section comprises standards relating to processes described by ISO
12207 [RD1], §6.4.8 (Acceptance Support), §7.1.6 (Integration) and
§7.1.7 (Qualification).

The acceptance and handover of **SKA Software**\ *which is*\ **bespoke
software**\ is managed according to the SAFe framework, and it follows
the quality processes described in the SKA Software Product Quality
Assurance Plan [RD10].

**SKA software** which is **bespoke software** will only be accepted by
the SKAO after it has been appropriately integrated, verified and
validated.

1. The integration, verification, validation and acceptance of all
   source code shall follow a defined documented process that is
   approved by the SKAO.

2. This process must make clear, for all times during the handover:

   a. Who is responsible for making **software** changes.

   b. What the expected turnaround time for **software** changes is.

3. At the completion of the process all code shall have been:

   a. shown to pass appropriate, system, sub-system and unit level
      tests.

   b. shown to cleanly compile and/or build using an SKAO provided build
      environment.

   c. checked into an approved SKAO artefact repository.

4. **Software** shall be integrated, as far as possible, prior to the
   integration of other aspects of the system.

   a. Note:

      i.   Where possible, **software** shall be integrated
           continuously, starting from the earliest development stages
           [RD7].

      ii.  During the SKA construction, this means that it is intended
           for this to take place in advance of the SKA Array Release
           schedule.

      iii. The Continuous Integration pipeline will integrate and
           progressively promote software through increasingly stringent
           qualification environments [RD7].

5. When the SKAO takes over maintenance of the **software** the complete
   repository, including commit history, shall be delivered to the SKAO.

6. Where code requires specialised hardware for testing, provision of
   this hardware, or demonstrably equivalent hardware, shall be included
   as part of the handover. Such hardware must be demonstrated to be in
   good working, serviced condition and provided with documentation and
   relevant service-level arrangements.

Support Infrastructure
======================

To develop and integrate **software** the SKAO shall provide:

1. A central, globally visible, set of repositories that can be used by
   all SKA developers.

   a. Note:

      i.   SKA has chosen the Gitlab [4]_ platform to host and manage
           the source code repositories.

      ii.  Usage of software repositories from developers is regulated
           according to the processes described on the SKA developer
           portal [RD6].

      iii. These repositories will clearly define how to handle large
           binary data files.

2. A globally accessible website for the storage and access of
   documentation.

   a. Note

      i.  The SKA has chosen the Readthedocs [5]_ publishing platform to
          publicly make available all code documentation.

      ii. How to connect **software** repositories with the publishing
          platform is documented in the SKA developer portal [RD6] at :doc:`/tools/documentation`.

3. A continuous integration and test framework that is open to use by
   developers.

   a. Note:

      i.   The SKA has chosen the Gitlab platform to manage the
           Continuous Integration of **software** products. The SKA
           developer portal described the process to make use of this
           infrastructure.

      ii.  It is intended that this will include support for at least
           the 4 types of **bespoke software** described in the scope
           section (Tango, SDP and NIP data driven **software**, **FPGA
           software** and Web Applications).

      iii. The development of this will be done in conjunction with the
           pre-construction and construction consortia. The SKAO will
           serve as an overall coordinator.

4. Communication tools to manage the **software** development activity
   and to enable **software** developers to access expertise from all
   the **SKA** **software** developer community.

   a. Note:

      i.   SKA has chosen to adopt Jira [6]_ and Confluence [7]_
           collaboration tools to manage the software development
           activity. All contributors to SKA **software,** including
           manager and developers, will have an account on these
           platforms.

      ii.  SKA will provide an instant messaging and presence awareness
           platform. All contributors to **SKA** **software** , from
           managers to developers, will have an account on such
           platforms.

      iii. How to use the communication tools is documented as part of
           the SKA developer portal.

5. A list of approved **off-the-shelf software**.

   a. Note:

      i.   Corporate **off-the-shelf software** is approved for use by
           the SKA Head of IT and a list of available **software** is
           maintained on the SKA Confluence website.

      ii.  Developer-oriented **off-the-shelf software,** often referred
           to as *dependencies*, to be used in the development of
           **software** for the construction of the SKA telescope is
           approved for use by the SKA Lead Software Architect and a
           list of available **software** is maintained on the SKA
           Artefact Repository and published on the SKA developer
           portal.

      iii. The intention of this approved list is to aid
           standardisation.

.. [1]
   From Wikipedia entry for “Hardware Description Language”, retrieved
   25 January 2021.
   (https://en.wikipedia.org/wiki/Hardware_description_language)

.. [2]
   From ISO 12207[RD1],

.. [3]
   https://developer.skatelescope.org/en/latest/tools/git.html

.. [4]
   https://gitlab.com/ska-telescope/

.. [5]
   https://readthedocs.org

.. [6]
   https://jira.skatelescope.org

.. [7]
   https://confluence.skatelescope.org
