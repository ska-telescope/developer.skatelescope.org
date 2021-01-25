.. _policies:

SKA developer community decision making process
-----------------------------------------------

.. note::

  This page reports the main outcome of `ADR-1 <https://confluence.skatelescope.org/display/SWSI/ADR-1+Architectural+Decision+Process>`_ . More detailed discussion happened on confluence and jira as described below. 

**Everyone** in the SAFe development teams is empowered and encouraged to reason about the architecture of the system, and to make decisions about it.

An **Architectural Decision Record**  (ADR from now on) captures one single architectural decision, defining its scope, the rationale behind it, and its architectural relevance.

A process is defined and here described to raise, discuss, and form a consensus around a decision. The process is driven by the SKA Lead Software Architect, together with the architect of the specific subsystems. Everyone in the SAFe teams can participate in the process, and it is expected that the Architecture Community of Practice plays a major role, keeping a constant involvement.
Architectural relevance

There is endless literature about what is architecture and what is not architecture in the software world. It is very hard to have a consistent definition, and it also depends on the point of view of the reader.

There are many reasons for a decision to be considered architectural in the SKA software project:

* A decision impacts several sub-systems. **All ICD changes** fall into this category.
* A decision impacts several development teams. All decisions about standardisation around common practices fall into this category.
* A decision has a significant impact on one or several quality attributes of the system. This could for instance be performance, maintainability, security etc.
* A decision deviates from the current **Software Architecture Documentation**.
* The detailed design of a sub-system can certainly be seen as an architectural activity. It is certainly encouraged to share doubts and concerns about the design of a sub-system in the form of an ADR in order to bootstrap a wider conversation.

An ADR can also be opened in the absence of a crucial decision, or a gap in the system design, where the missing decision is an impediment in the proceeding of the development activity.
ADR approval process

The process works as follows:

#. **An architectural decision gets opened**

   - **Everyone** can create a Jira issue in the **ADR** project at: https://jira.skatelescope.org/projects/ADR
   - At this point it should at least have a summary and a description with enough information.
   - It is encouraged that ADRs contain a **proposed decision**. Basically describing a proposal of how a (sub)system shall be implemented.
   - The ADR is assigned to the relevant stakeholder to manage its progress. This will usually be someone within the Architecture CoP.

#. **The decision will be analysed.** At this stage alternatives (which might be simply yes/no) and their impact on the system should be developed and analysed. This should generally involve talking to possibly impacted teams and stakeholders, looking to build consensus. 

   - The decision might be **discarded** at this stage for many different reasons. This does not mean that the propsed implementation is not proceeding, just that it is not documented as an ADR. 
   - A slot in the next available **Architecture synch** meeting will be used to socialise the newly created ADR and discuss the related proposals. **Everyone** is welcome to attend.
   - A new confluence page is created using the ADR template in the Solution Intent Home to record in depth analysis of the architectural issue.

#. (**The decision might escalate to an ECP.** If it turns out that the decision would have impact beyond the software systems, an ECP needs to get raised, which might in some cases block the analysis of the decision.)
#. **The decision is made.** A conclusion is selected and actions for communicating the decision are identified. From this point on the decision can be used in development.

   - The ADR Jira issue and confluence page are updated, clearly capturing the decision.
   - A slot in the next available Architecture synch meeting will be used to socialise the decision and the related impacts.
   - Outcoming actions are not to be registered as part of the decision, but they should be linked to the ADR in the form of Jira issues in other projects whenever it is possible. These might be:

     - Documents to be updated.
     - Communications to key stakeholders.
     - If **any item under configuration** control is affected by this decision an **ECP must be raised** accordingly.
     - Stories or Features in the development backlogs implementing the decision.
	
