Reporting and Management of Bugs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. toctree::
    :maxdepth: 1
    :numbered:
    :hidden:

0 Introduction
===============

.. admonition:: Software Bug
   A Software Bug is an error, flaw or fault in a computer program of system that causes it to produce an incorrect or unexpected result, or to behave in unintended ways.

The purpose of this chapter is to outline the processes by which the SKA Project will report and track software bugs. After this introduction there is a brief description of how to report bugs, an outline of the bug triaging processes and lastly a description of the process for fixing bugs and the responsibilities of different stakeholders.

The SKA uses JIRA as its bug tracking system, for alignment with all software development processes.

1 Bug Reporting
===============

1.1 Categorising Bug Scope

To try and minimise the number of bug reports exposed to the whole project the SKA recognises two main types of bug, “system-level” bugs and “team-level” bugs. These are reported in different JIRA projects.

A team-level bug is one that is judged to affect only one team and also not affect the functionality of the SKA system as a whole. It would normally be discovered within that team during their testing (though of course team level bugs could be found by other teams).

A system-level bug is one that is judged to affect the wider SKA system beyond one team.

This section concentrates primarily on the processes for system-level bugs, with a few comments on team-level bugs.

1.2 Reporting the Bug
------------------------

System level bugs are reported in the `SKB JIRA Project <https://jira.skatelescope.org/projects/SKB/summary>`_. “SKB” stands for “SKA Bugs”.

When reporting a bug the reporter should aim to provide as much information as possible, both to allow others to reproduce the problem, and to help provide information that may be useful for tracing and fixing it.

The SKB project provides some key fields to aid the reporter.

=================== =================================================
JIRA Field          Use
=================== =================================================
Summary             Provide a brief summary of the bug
Description         Provide a more detailed description - include a brief statement of what you were doing when the bug arose and copies of the error messages.   
Environment         Enter the environment in use when the bug arose - there is a drop-down of suggestions or you may type your own.
Component/s         If you can identify in which software component the bug seems to arise then select from the drop-down or enter a new one. Note of course this may not be the root cause of the problem.
Steps to Reproduce  Write down what you did to produce in Steps to Reproduce. Provide as much information as possible for someone else to be able to follow.
Links to Log Files  Enter any links to log files if possible.
Affects Version/s   Select at least one of the choices in Affects Version/s or type in a new version (of the system you were running).
Severity            Provide your own estimates of the Severity. (See below)
Priority            Provide your own estimates of the Priority. (See below)
=================== =================================================

If there is more information you can provide (e.g. Linked Issues, suggested Collaborators who may be interested) please do.

You may not be or feel able to provide all of this information, but please try - the more information you can provide (while your memory is fresh) will help to reproduce and fix the problem.

Team-level bugs (not affecting wider system or other teams) should be reported in the relevant agile team’s JIRA project, using the issue type “bug”. The same guidelines for reporting may be used, but of course please tailor to the needs of your team.

Do I need to report a bug that I fixed as soon as I saw it? The SKA Project encourages bug fixing “on-the-fly”, i.e. without the need to enter a bug report JIRA ticket. However, “on-the-fly” means that any discovered bug should be fixed in the same sprint. If the bug will take longer to fix, or there is no time now then it should be reported.

The SKB JIRA Project also supports the reporting of incidents, by selecting the JIRA issue type of “Incident”. Incidents, when a bug has a more direct impact on stakeholders, should be reported in more or less the same way. There is more information on :doc:`Incident Management </policies/incident-management>`.
  

.. admonition:: TODO
     Add something on how this relates to the new Problem Reporting and Tracking System (PRTS) setup to report and track hardware issues.

2 Bug Triage
=============

.. admonition:: Triage
     The process of examining problems in order to decide which ones are the most serious and must be dealt with first.

In the SKA Project the process of triaging a bug report will assess and set values for

At the present time SKB bugs that are in the Status “TODO” are triaged by someone in the management teams as soon as possible if they seem (or are labelled) Critical and if they are noticed. However, there is no need to wait: All teams and team members are encouraged to triage bugs themselves if they feel able. Otherwise remaining SKB bugs in the “TODO” state are triaged at the Bi-weekly Release Management Forum.

2.1 Values and meanings for Severity and Priority
--------------------------------------------------
=================== =================================================
Severity            Meaning
=================== =================================================
Critical            Critical loss of functionality or data, no work-around exists.
Major               Major loss of functionality or data, possible work-around exists.  
Minor               Minor loss of functionality or data.
Trivial             No loss of functionality or data.
=================== =================================================

=================== =================================================
Priority            When a fix should be sought
=================== =================================================
Highest             Now
High                Next sprint
Medium              Next 3-4 sprints
Low                 Next 6. Months (1-2 Programme Increments)
Lowest              Who knows
=================== =================================================

.. important:: Security Issues
     Security Issues will normally be classified as Critical - there is a potential for a critical loss of functionality and/or data.


Some of the possible extreme combinations here (e.g. a Critical bug of Lowest priority) will seem unlikely, though it may be possible to understand some apparently contradictory combinations where work-arounds are available and it is clear the bug may take a while to fix and/or will be fixed in a later release. These judgements should be part of the triage process.

Note that there is a `JIRA Bug Dashboard <https://jira.skatelescope.org/secure/Dashboard.jspa?selectPageId=14101>`_, which shows both SKB and team-level bugs.


3 Processing a Bug
===================

3.1 Workflow
---------------

All SKB bugs are created in an initial status of “TODO”, with no Assignee. During the triage process the bug will be given an assignee and the status updated to “Assigned”. At some point work on investigating and fixing the bug will begin, at which point its status should be changed to “In Progress”. When the bug is believed to be fixed the status should be changed to “Ready for Acceptance”. Lastly, when someone has verified the fix the status should be set to “Done”.

There is also a “Discarded” status for reports that can no longer be reproduced, or are found not to be bugs, or for any other reason. Note that if a bug report is deemed to be a duplicate of another then it may be moved to “Discarded” but a link to the duplicate report should be added. In all cases when moving to Discarded a reason should be provided as a comment.

Lastly there is a “Blocked” status that may be used if work on a fix cannot proceed for some reason - again a reason should be provided as a comment.

.. admonition:: Basic Workflow
   “TODO” -> “Assigned” -> “In Progress” -> “Ready for Acceptance” -> “Done”

The flow is not constrained - any status may be chosen at any time.

3.2 Assignee Responsibilities
--------------------------------

The assignee of an SKB bug has a number of key responsibilities:
  # Ensuring that a bug has a team (or teams) assigned to fix it (use the Agile Team(s) field for this);
  # Assessing and modifying priority and severity if needed;
  # Tracking progress of the fix;
  # Providing or seeking help and advice (the Collaborator(s) field may be used);
  # Accepting the fix or identifying another to accept (this could be the reporter);
  # Re-assigning the ticket as needed to facilitate the above.

Remember anyone may be an assignee (see above).

As for reporting, the above may be useful guidance for Team-level bugs, but the actual process is left up to each individual team.


4 Fixing a Bug
===============

Approaches to fixing bugs are found under :doc:`Testing Strategy </policies/ska-testing-policy-and-strategy.html#bug-management>`.


5 Comments and Open Issues
=============================

  * Committing “on-the-fly” fixes: Marvin requires a ticket number. One possible suggestion:
      * Use the story ticket you are working on if the bug relates to the same feature/story;
  * For team-level bugs the “bug” type does not have Story Points so time spent cannot be tracked or accounted for.
      * Could create a related “story” to fix the bug
      * We may also change this.
  * Can we use gitlab issues? This is problematic as we wish to track everything in JIRA. Ideas will be considered.
  * Should we rename the SKB project?


