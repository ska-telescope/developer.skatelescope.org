
*******************
Incident Management
*******************

This section a set of guidelines for managing Incidents within the context of SKA Systems and Software.

.. contents:: Table of Contents


These guidelines are developed from the `Manageing Incidents <https://landing.google.com/sre/sre-book/chapters/managing-incidents/>`_ section of the Google SRE Book, and the GitLab `GitLab Incident management Handbook <https://about.gitlab.com/handbook/engineering/infrastructure/incident-management/>`_ .  They form the basis of an Incident Response Plan, that all teams should be familar with.

Incidents come in all shapes and sizes, therefore it follows that the response mounted to remediate the associated problems will be highly variable too.  The Incident Management practices outlined here are meant to serve as guidelines to developing good habits and practices around dealing with the unexpected.

Identifying an Incident
#######################

An **Incident** is defined as:

anomolous system conditions that lead to some form of service outage, unexpected system behaviour or degraded system performance that significantly impacts the delivery of correctly functioning services to the end user.

As a general rule of thumb, do not invoke a full response for something that is easily recognisable as taking 30 minutes to solve, and has limited impact.  However, if it will take longer to solve and/or has significant impact on your user community such as Nexus, Confluence or Jira then consider a more focused response.  It is better to declare an Incident and then find a simple fix for it than for something that appears minor at first glance to spiral out of control into a large problem due to things quickly unravelling.  The bottom line is to exercise common sense, and be willing to perfrom a Post Incident Review the process with external stakeholers to evaluate the problem and the process in the pursuit of relentless improvment.

Incident Workflow
#################

The following sections describe a framework for working through an incident, the roles and duties of key personnel involved, and the tools used for managing effective communications throughout.

Responding effectively to these kinds of issues is key to restoring degraded or lost service, and learning from the experience so that repeat occurances are eliminated or minimised.

Central to responding effectively is not just having a clearly defined plan for how to respond in emergency, but also rehersing and putting the plan into action.

These guidelines are written using Systems Team examples, however they are generally applicable and should be used by all teams within the SKA Project to when formulating and practicing their own Incident Response.
The overall incident workflow could be summarised in steps like below:

- Have a clear channel of communication with your user community
- Identify the problem and assemble the team and resources
- Incident Response
- Incident Reports & the Post Incident Review


Have a clear channel of communication with your user community
##############################################################

For all the services within your teams responsibility, have a well understood channel of communication for your users to notify them of problems with these services.  Triage reported issues, and put non-critical items that are cross-team related in the `backlog <https://jira.skatelescope.org/projects/SKB/summary>`_ (ensuring your user community knows this), or in your own teams project space (`System Team <https://jira.skatelescope.org/projects/ST/summary>`_), and identify those that are an Incident.
A common and well known communication channel for your user community means that they know how to get in touch with you, but also crucially they know how to find out about ongoing issues and service status.  This will help manage the flow and decemination of information as an Incident unfolds, and can save large amounts of time and confusion during the response through delivering a consistent message about the current state and the efforts to resolve it.

Use this channel of communication proactively.  Make sure that when an Incident has been identified, notifiy the affected user groups immediately with information about what the Incident is, when it occurred, what (if known) is being done about it, and any indication on how long or when the Incident will be resolved.  Proactive communication will save time in dealing with individual contact, and improve relations and confidence within your user community.  It is likely that if you have an engaged community, then they will be helping by letting you know when there are issues, so foster that feedback culture.

Communication should be based on the most convenient and readily monitored solution (email, phone, web page, slack, Zoom, carrier pigeon, etc.) used by the user community.  The Systems Team uses Slack for most communication with the following channels:

* The `#team-system-support <https://skao.slack.com/archives/CEMF9HXUZ>`_ channel for System Team specific services such as Nexus, ElasticStack, Prometheus, GitLab Runners, Kubernetes and OpenStack
* If the issue impacts on teams ability to do integration testing then it is `#proj-mvp <https://skao.slack.com/archives/CKBDRGCKB>`_
* For major outages that are likely to have impact project wide then consider making announcements in multiple related channels to capture all the affected user communities.

It may be necessary to use multiple forms of communication, and/or channels.  What spread of these channels is required will be part of the ongoing impact assessment as the Incident unfolds. It is also important to gather all the incident related to communication in one place so that it is shared and discussed from a central location. This may be a temporary slack channel linked to JIRA ticket as long as it is shared with other ways of communications to give/take updates on the incident.


Identify the problem and assemble the team and resources
########################################################

Identifying problems and how to handle them is largely dependent on the initial impact assessment.  Impact assessment is something that must be reevaluated at intervals (for instance, hourly) as the Incident unfolds and knowledge builds around the roadmap to resolution.

Agree a time limit on the initial response.  If it can be solved in 30 minutes by the subject matter expert with minimal impact then timebox this and strictly reevaluate the situation at the end of that time allocation.

In all other case (including the elapsed initial response) be prepared to gear up a full Incident response and get the process in motion.

Once the problem/s is identified, then line up the team and resources that will mount the response.  It is crucial that no one other than the assigned resources work on the resolution - there must be no conflict or miscommunication about what is happening, or what steps are being carried out to resolve the Incident - there is to be no "Freelancing" on the problem.


Incident Response
#################

* Tackle the immediate problem/s i.e. restore service whether it is fixing the failing system or enacting the recovery/fail over plan. Preserve the evidence of any system components involved in order to support the Post Incident Review.

* Apply separation of responsibilities and actions - having clearly defined roles and responsibilities during an Incident limits the chances of confusion as to who is doing what and frees the Ops lead (the technical or expert lead) up to concentrate on creating and delivering the solution for resolving the Incident issues.

* Command - a clear structure of authority and responsibility means that the Ops Team (the subject matter experts) can focus on solving the problems, and freeing them from managing logistical issues.

* Operations work - the Ops Team are solely responsible for making changes to the system to correct the situation.  This includes ensuring any other conflicting system support activities are halted as coordinated by the Incident Commander.

* Live Incident State Document - Create a Jira ticket that is periodically (half hourly) updated with a distilation of how the Incident unfolds from identifaction to resolution.  The ticket is closed out only when the Post Incident Review is concluded linking to the Incident `Post Incident Review <https://confluence.skatelescope.org/display/SE/Software+Incidents+and+Management>`_ Confluence document.

* Communication - after the initial Incident appraisal, breakout a new slack channel (and link to it as appropriate) to compartmentalise the conversation around the response, and to create a chronological record of how the Incident unfolds from identification through to resolution.  Cross link to any other communication channels to create as complete a picture as possible of what is happening.  This also forms a virtual Incident Command Post for the Incident response team to gather round.  This can be augmented with a dedicated Zoom Room published in the channel, but it must be backed up with written in channel notes that track decisions, and discoveries.

* Planning - track the changes made to the system, triage what are filed as bug reports, and what needs to be unwound (and how) during post-incident clean up.

* Clear, Live Handoff - long running Incidents may require resolution over multiple shifts and days.  There must be a coherrent handing over of  at shift boundaries

* Cleanup - organise the removal of temporary measures, and reverting services and system management to standard operational practices.  Ensure that all relevent data is preserved and offloaded to safe storage.

* Post Incident Review - when the Incident is over, perform a Post Incident Review to understand what went wrong and what corrective measures should be put in place to reduce/eliminate further occurances.


Roles
#####

The roles separate the responsibilities for the mounted response to the Incident.  The roles are inherently scalable, meaning that an individual may fulfil more than one role (the Commander, Comms, and Planning roles are typically combined), and most roles can be inhabited by more than one person, however the Ops Lead role must always be separated from the remaining roles as it is critical that the Ops Lead is freed from all other responsibilities (and distractions) in order to concentrate on solving the problems at hand and it is coordinating a team across disciplines, offices and timezones to mount an effective response.

All people assigned to the Incident treat the response as the highest priority task in their schedule.

* Incident Commander - is the person in charge of the response to an incident, with the responsibility and authority for organising the response team, and other resources (even hardware) and directing the high level strategy.  The Incident Commander organises the resourcing of other team members, assigning roles and handles the liason between the Ops team members and other internal or external stake holders.  The Incident Commander ensures that there is complete separation of responsibilities so that there is no risk of overlap or confusion around inflight tasks.  The Incident Commander is the sole maintainer of the Live Incident State Document and is the authority on the current state of the operation.

* Ops Lead - is the lead technical or subject matter expert evaluating the Incident, diagnosing the issues, formulating the response.  Ops in this sense, is Operation Support for the system/solution/environment context where the Incident is taking place.

* Ops Team Member and/or Subject Matter Experts (sourced from other teams where necessary) provides support for the Ops Lead and follows the Ops Leads direction for working through the problem resolution.

* Comms - formulates and executes the plan for communication of the Incident and response to the affected user community, and the public message if required.

* Planner - supports Ops by tracking changes being made (system divergence that can evolve due to emergency action), filing bug reports, plotting the path for any system state cleanup required.

* Post Incident Review Team - stake holders including user community representatives, and the Incident Response Team.


Supporting Resources
####################

Throughout the Incident Response, there maybe additional resources required ranging from Subject Matter Experts to Hardware, coffee and pizza.  Ensure that there are contact details, processes and procedures in place to source these in advance.


Preparation, Planning and Practice
##################################

Relative to your team, the Incident Response Plan is only as effective as it is workable and relevant.  The operation of the plan needs to be tested, and your team needs to practice fulfilling the various roles in the plan so that when it needs to swing into action all players understand what needs to happen and can purely focus on the problem at hand.


Incident Reports & the Post Incident Review
###########################################

When the Incident is over, gather the Post Incident Review Team and follow the SKA `Post Incident Review <https://confluence.skatelescope.org/display/SE/Software+Incidents+and+Management>`_ process. To capture the relevant stakeholders and information fresh before they disperse it is important to finish the Post Incident Review as soon as possible so all details of the incident are accurately logged and documented.

