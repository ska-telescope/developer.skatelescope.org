==================================
Fundamental SKA Software Standards
==================================

These standards underpin all SKA software development. The canonical copy of this information is 
`held in eB <https://ska-aw.bentley.com/SKAProd/Search/QuickLink.aspx?n=SKA-TEL-SKO-0000661&t=3&d=&sc=Global&i=view>`_,
but the essential information is on this page, which is extracted from the eB document.

Standards Applicable to all SKA Software
========================================

1. All **SKA software** shall have a copyright notice which is a
   description of who asserts the copyright over the **software**.

   a. Notes:

      i. **Derived software** and **bespoke software** will normally be
         comprised of code modules which have a mixture of copyright
         attributions. Some code modules will have joint copyright, and
         others have sole copyright, but the codebase in its entirety
         will have a mixture.

2. All **SKA software** shall have a **software license** which is a
   legal instrument governing the use or redistribution of **software**.

   b. Notes:

      ii.  **Off-the-shelf software** will normally have licenses over
           which the SKA has no control.

      iii. **Derived software** may have mixture of licenses.

      iv.  **Bespoke software** will normally have a permissive open
           source license.

3. The documentation associated with **SKA software** shall also carry a
   license unless it is covered by the **software license**.

4. All **software licenses** governing a body of **software** must be
   mutually compatible.

5. All **software licenses** for **SKA software** shall be agreed with
   the SKA Organisation prior to the **software** being adopted or
   developed.

   c. Notes:

      v.    The SKA Organisation will always agree to a `3 clause BSD
            license <https://opensource.org/licenses/BSD-3-Clause>`__
            for **software** (provided there are no compatibility
            issues) and will favour open-source permissive licenses with
            attribution since they minimize compatibility issues.

      vi.   The SKA Organisation will always agree to a `Creative
            Commons Attribution 4.0 International
            License <http://creativecommons.org/licenses/by/4.0/>`__ for
            documentation (provided there are no compatibility issues).

      vii.  This permissive open source recommendation is significantly
            more permissive than the SKA IP policy [RD1] which only
            requires contributors to “grant non-exclusive, worldwide,
            royalty-free, perpetual, and irrevocable sub-licenses to
            other SKA Contributors to use those innovations and work
            products for SKA Project purposes only.”

      viii. It is understood that the IP licensing environment of **FPGA
            software** is often substantially different to that of the
            open source software environment, with many (or most)
            developments relying on IP (from the FPGA vendor, for
            example) that has more restrictive licensing. In accordance
            with this standard, use of this IP, and its associated
            license, must be agreed with the SKA Organisation.

Standards applicable to Off-the-shelf software
==============================================

All **SKA Software** which is **off-the-shelf software** shall have:

1. A business case describing the requirements for the **software**, in
   comparison to other **software**.

2. A record of the evidence that demonstrates that the **software**
   meets these requirements.

3. A description of how the **software** will be supported during the
   expected lifetime of the **software**.

   a. Notes:

      i. The SKA Observatory has a predicted lifetime of 50 years, which
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

4. Evidence that the **software** has been developed to a standard of
   quality appropriate to the needs of the SKA Organisation.

5. Documentation that is appropriate to the needs of the SKA
   Organisation.

6. Been approved by the SKA Organisation as to its fitness for purpose
   and included in a public register of approved **SKA Software**.

Standards Applicable to Bespoke Software
========================================

Design
------

This section comprises standards relating to processes described by ISO
12207 [RD1], §7.1.2 (Requirements), §7.1.3 (Architecture) and §7.1.4
(Detailed Design). They complement any general System Engineering level
standards (i.e. processes relating to ISO 15288 [RD2]) applicable to all
SKA systems.

All **SKA Software** that is **bespoke software** shall have
documentation, models and prototypes covering the following:

1. The requirements the **software** is intended to fulfil.

2. The **software** architecture used.

   a. Notes:

      i.   The **software** architecture is the primary deliverable at
           CDR. Detailed design is only required to the extent needed
           for reliable cost estimation.

      ii.  The recommended reference for architecture documentation is
           “\ `Documenting Software Architectures: Views and Beyond,
           Second
           Edition <http://resources.sei.cmu.edu/library/asset-view.cfm?assetid=30386>`__\ ”
           (Clements et al, 2011) [RD3]. This book should be consulted
           for best practices on documenting views, styles and
           interfaces. The ISO 42010 [RD4] standard is also relevant.

      iii. The architecture documentation should include, at minimum

           1. System Overview, including a description of the
              architectural styles used.

           2. A set of views describing key features of the
              architecture, and the mapping between views.

           3. Interface Documentation or references to applicable
              Interface Control Documents for the major interfaces.

           4. Rationale justifying how the architecture meets the
              requirements. Justification on the basis of models and
              evolutionary prototypes is highly recommended in many
              cases.

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

3. Detailed design of components.

   b. Note:

      vi.  It is expected that a significant amount of the detailed
           design may be automatically generated from code and comments.

      vii. Detailed design documentation for **FPGA software** should
           include estimates of device utilization (DSPs, BRAMS, LUTs
           etc), details of clock rates and clocking domains and
           tracking of timing closure issues

The **software** design should be reviewed and the reviews should
incorporate the following factors:

1. The SKA Organisation is responsible for L1 requirements and must
   agree and review all L2 and L3 requirements.

2. The SKA Organisation personnel should be involved in **software**
   architecture reviews

3. The **software** architecture should be reviewed to demonstrate that
   it meets key requirements and provides sufficient detail for cost
   estimation and implementation.

4. Both the architecture and detailed design reviews shall carefully
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

5. Detailed design shall be reviewed:

   e. By someone in addition to the principal developer of the module
      being considered.

   f. In a manner appropriate to the significance of the module.

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

The construction of all **SKA Software** which is **bespoke software**
shall include:

1.  The construction of all source code shall follow a defined
    documented process that is approved by the SKA Organisation.

    a. Note:

       i.  The Software Engineering Institute Personal Software Process
           and Team Software Process are relevant processes.

       ii. The process documentation shall include a workflow
           description that follows accepted best practices. For
           example, it is recommended that:

           1. Work management practices shall include the following:

              a. All work tasks shall be described in a ticketing
                 system.

              b. Work tickets shall have a description of the task, an
                 estimate of the resource required and amount of the
                 task that has been completed.

              c. All code commits shall relate to a ticket in the
                 ticketing system.

              d. The developing organisation shall be able to use the
                 ticketing system to generate progress metrics.

           2. Code management practices shall include the following:

              e. With the exception of trivial cases (e.g. possibly
                 documentation changes) code must only be added to or
                 merged with the main development branch by a
                 pull-request-like mechanism.

              f. The pull request (or similar mechanism) must only be
                 accepted after the code has been cleanly compiled and
                 passes all appropriate tests. This process should be
                 triggered automatically.

              g. Pull requests must only be accepted after the code
                 changes have been reviewed by more than one developer
                 (inclusive of the primary developer).

              h. Pull requests must only accepted by suitably qualified
                 individuals.

2.  All construction **software** development shall utilise an SKA
    Organisation approved version control system.

    b. Note:

       iii. The SKA Organisation approved version control system is Git.

3.  All documentation, source code, software source code, firmware
    source code, HDL source code, unit tests, build scripts, deployment
    scripts, testing utilities and debugging utilities must reside in
    the version control system.

4.  Release tags for code shall adhere to the Semantic Versioning 2.0.0
    specification [RD8].

5.  **Software** shall be written in an SKA approved language and adhere
    to SKA language specific style guides.

    c. Note:

       iv.  The primary approved language shall be Python.

       v.   The coding standards for Python will be adapted from the
            `LSST DM code style
            guides <https://developer.lsst.io/coding/intro.html>`__
            [RD7].

       vi.  Use of other languages must be justified by, for example:

            3. Impossibility of running Python in the chosen run-time
               environment.

            4. Python doesn’t provide the necessary performance.

       vii. Many other languages are likely to have extensive usage. For
            example:

            5.  C/C++ (for high performance computation on conventional
                CPU’s).

            6.  Java (e.g. for business logic in web systems and
                **derived software**).

            7.  VHDL (for FPGA development).

            8.  CUDA (for GPU software).

            9.  OpenCL (for software that targets both GPU and FPGAs)

            10. JavaScript (for Web client systems).

6.  SKA Organisation employees must have access to the repository while
    the **software** is under development, be able to sign-up for
    notifications of commits and, if necessary, give feedback to the
    developers.

7.  Test **software** verifying the system **software** at multiple
    levels (from the complete system down to individual module unit
    tests). Tests shall include verifying specific requirements at
    different levels and, as far as practicable, be able to be run
    automatically.

    d. Note:

       viii. Tests shall be able to run in a continuous integration
             environment.

       ix.   For software targeting CPU’s this should include unit tests
             at the class, function or source file level to test basic
             functionality of methods (functions) with an agreed minimal
             coverage (between 75 and 90%). Unit tests created for
             fixing defects or making specific enhancements should be
             checked-in with a reference to the issue for which the
             tests were created.

       x.    For **FPGA software** this should include:

             11. Each module shall be associated with a specific test
                 bench.

             12. Modules shall undergo simulation with a predefined
                 pass/fail criteria.

             13. Release builds shall be made up of verified functional
                 blocks and handled in a scripted framework.

             14. Simulated and released code shall match the committed
                 code. For example, committing the code shall not change
                 register contents (even version numbers) in the source
                 code.

8.  **Software** simulations/stubs/drivers/mocks for all major
    interfaces to enable sub-system and system level tests.

9.  Automated documentation generation - including, but not limited to
    parts of detailed design documentation.

    e. Note:

       xi.   Automated documentation generation software is generally
             **off-the-shelf software** and so subject to the conditions
             in section 4.

       xii.  Not all documentation can be automatically generated, but
             it should be used wherever it is reasonably practicable.

       xiii. The SKA Organisation shall accept ReST format documentation
             generated using Sphinx.

10. A complete definition of other **software** (both off-the-shelf and
    bespoke) that the **software** requires to build and deploy.

11. Deployment scripts or configurations, which allow the **software**
    to be deployed cleanly and in as automated a fashion as is
    practicable, starting with a bare deployment environment.

    f. Note:

       xiv. For **FPGA software**, this means configuring an
            un-programmed FPGA device in the target SKA system.
            Deployment may require the use of the host based software
            delivered as part of the LMC system.

12. The ability to log diagnostic information using :doc:`logging-format`.

13. The ability, dynamically at runtime, to suppress or select logging
    of messages at different Syslog severity levels on at least a
    per-process basis (and a per-thread basis or per class basis if
    appropriate).

14. The ability to log diagnostics at all major interfaces at a RFC 5424
    Debug severity level.

15. Alarms, where applicable, shall be based on the IEC 62682 standard
    [RD6].

Acceptance and handover
-----------------------

This section comprises standards relating to processes described by ISO
12207 [RD1], §6.4.8 (Acceptance Support), §7.1.6 (Integration) and
§7.1.7 (Qualification).

**SKA software** which is **bespoke software** will only be accepted by
the SKA Organisation after it has been appropriately integrated and
validated.

1. The integration, validation and acceptance of all source code shall
   follow a defined documented process that is approved by the SKA
   Organisation.

2. This process must make clear, for all times during the handover:

   a. Who is responsible for making **software** changes.

   b. What the expected turnaround time for **software** changes is.

3. At the completion of the process all code shall have been:

   c. shown to pass appropriate, system, sub-system and unit level
      tests.

   d. shown to cleanly compile and/or build using an SKA Organisation
      provided build environment.

   e. checked into an approved SKA Organisation acceptance repository.

4. **Software** shall be integrated, as far as possible, prior to the
   integration of other aspects of the system.

   f. Note:

      i.  During the SKA construction, this means that it is intended
          for this to take place in advance of the SKA Array Release
          schedule.

      ii. The intention is that this will be done by a series of
          integration “Challenges” which predate integration at an ITF,
          and continue through the array release period.

5. During the handover period, there shall be a 'bug fix' workflow
   defined that is streamlined to allow critical fixes to be deployed
   quickly.

6. When the SKA Organisation takes over maintenance of the **software**
   the complete repository, including commit history, shall be delivered
   to the SKA Organisation.

7. Where code requires specialised hardware for testing, provision of
   this hardware, or demonstrably equivalent hardware, shall be included
   as part of the handover.

Support Infrastructure
======================

To develop and integrate **software** the SKA Organisation shall
provide:

1. A central, globally visible, set of repositories that can be used by
   any SKA developers.

   a. Note:

      i. These repositories will clearly define how to handle large
         binary data files.

2. A globally accessible website for the storage and access of
   documentation.

3. A continuous integration and test framework that is open to use by
   developers.

   b. Note:

      ii.  It is intended that this will include support for at least
           the 4 types of **bespoke software** described in the scope
           section (Tango, SDP and NIP data driven **software**, **FPGA
           software** and Web Applications).

      iii. The development of this will be done in conjunction with the
           pre-construction and construction consortia. The SKA
           Organisation will serve as an overall coordinator.

4. Communication tools to enable **software** developers to access
   expertise from all the SKA **software** developer community.

   c. Note:

      iv. This will include issue tracking, discussion fora etc.

5. A list of approved **off-the-shelf software**.

   d. Note:

      v.  To add **software** to this approved list, please email
          details of the **software**, the justification for its use,
          and the scope of its usage to the Head of Computing and
          Software at the SKA Organisation.

      vi. The intention of this approved list is to aid standardisation.

