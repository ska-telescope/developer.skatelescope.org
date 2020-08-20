Onboarding: Welcome to the SKA developer community
**************************************************

Welcome! This page is designed to help people who have just started working on SKA software find out more about the Square Kilometre Array (SKA), the way the SKA project is being run, and how to develop software for the SKA.
This page consists of links to relevant information, and a suggested timeline to guide you.

If you're working in an SKA Agile Team, then your Scrum Master will assist you in getting involved in the daily development work of the SKA.

If you're working at the program or solution level, the Solution Engineer or your Release Train Engineer will take the lead.

If you're joining as a Scrum Master, either the team's existing Scrum Master or the Release Train Engineer will help you.

If you're an external contributor, then please look at the `SKA Code of Conduct <https://www.skatelescope.org/ska-organisation/ska-organisation-code-of-conduct-for-meetings/>`_ and the Contribution Guidelines for the GitLab project you intend to contribute to.

You may also wish to read through the relevant coding guidelines, testing policy, and some of the information on CI/CD.

Don't worry if many of the terms in the previous paragraphs don't make sense -- by the time you've covered all the material on this onboarding page, you will at least know where to look up such terms, even if you can't immediately give a definition!

This page shows you things to do (or try to do!) on your first day, then things to do in your first week, first month, and first three months. 
The list gets less prescriptive as time goes on -- we expect that you'll be working with your team to set goals, assess further training needs and so on.
You may want to print this out, and also take a copy of the `skills matrix spreadsheet <https://docs.google.com/spreadsheets/d/1aKpe-mbUdVUFIEMw5bQ1Uhs6CVmolKzIItm6-w_9r5o/edit?usp=sharing>`_, so that you can track what you've done and what remains to be done. 
Your Scrum Master may create JIRA tickets to help you and your team organise and track this work.
Your Scrum Master will usually be your first port of call when you have questions; you'll learn other ways of getting your questions answered as you go through the onboarding process. 



In this page, we talk about your Scrum Master doing various things -- if your onboarding isn't led by a Scrum Master, then this should be done by whoever is leading your onboarding. 

We welcome feedback on this page - please tell us what worked and what didn't! You can leave comments in the `#proj-onboarding <https://skasoftware.slack.com/archives/C016VGRJWVC>`_ slack channel, or you can contribute changes to the `developer.skatelescope <https://gitlab.com/ska-telescope/developer.skatelescope.org>`_ GitLab project, or you can mail the Solution Engineer or Release Train Engineers with feedback.

First Day
=========

This section is designed to get you up and running, with all the accounts you'll need and the main places to go to get further information.

.. note:: Scrum Master Action Needed!
   Scrum Masters: you should try to arrange accounts for new team members ahead of time, if you know they will be joining.
   You will also need to budget a fair amount of time to help new people integrate with your team; you may want to create stories or features to help with this!

* Get SKA accounts. You should set up these accounts with your institutional email address. Please provide this email address to your Scrum Master if they don't have it already! You'll need the following accounts:

  * `JIRA <https://jira.skatelescope.org>`_ and `Confluence <https://confluence.skatelescope.org>`_ login (both sites are configured to authenticate you with the same username and password).
  * `Slack <https://skasoftware.slack.com>`_
  * Google Drive. You may need to create an account associated with your institutional email address. This makes it easier for us to know who is using that Google account.
  * `GitLab <https://gitlab.com/>`_ (If you're not going to be contributing code or documentation, this step may be omitted or postponed.) Please make sure your institutional email address is associated with your GitLab ID if you've already got a GitLab account. See https://developer.skatelescope.org/en/latest/tools/git.html#use-institutional-email for instructions on how to do this.

Now you've got some accounts, you should log in to:

* JIRA. JIRA is a ticket tracking system; we use it to organise the SKA software work.
* Confluence. This is the SKA's internal wiki. You may want to look at the `Software Engineering <https://confluence.skatelescope.org/display/SE/Software+Engineering>`_ pages. 
* Slack - visit your team channel! You will be added to the SKA's default slack channels: #announcements and #rand-chats. Reading the 'Pinned' items on the #announcements channel will help you in using the SKA Slack workspace more effectively. 
 
You should read the `SKA Code of Conduct <https://www.skatelescope.org/ska-organisation/ska-organisation-code-of-conduct-for-meetings/>`_.
The SKA is an inclusive organisation, and we want to make sure that everyone is respected and has a pleasant experience working for SKA.
We therefore have a Code of Conduct, and reading, understanding, and adhering to that Code is a key part of your onboarding and your future work at SKA.

And you should visit the `developer portal <https://developer.skatelescope.org/>`_! (You may be reading this on the developer portal; this is a reminder to Scrum Masters that they should provide you with the link!

First Week
==========

This week is about providing you with some context about the project, and working out what your immediate training needs are. You will learn more about the SKA in the following weeks and months: some of this is just a brief introduction.
You can use the links provided here as a way to find information in the future, should you wish to revisit some of this material.

Information about the SKA
-------------------------

* What is the SKA?

  * Have a look at the `SKA website <https://skatelescope.org>`_.
  * Read `about the SKA and its history <https://confluence.skatelescope.org/download/attachments/113803312/DG%20SKA%20Induction%206%20May2020.pptx?version=1&modificationDate=1595231195850&api=v2>`_.

* How does the SKA operate? How is it meant to work?
 
  * Read `these slides <https://confluence.skatelescope.org/download/attachments/113803312/SKA_Programmes_Induction_v2020.1.pdf?version=1&modificationDate=1595231309607&api=v2>`_ on the SKA operational programme.

* What is Radio Astronomy?
 
  * Our Project Scientist, Robert Laing, recorded `some lectures <https://confluence.skatelescope.org/display/SE/Lectures+on+Radio+Interferometry?src=contextnavpagetreemode>`_. We suggest that you listen to the first and possibly the second lecture now. If you're interested or need to know more about radio interferometry, you can look at the other lectures in the next few months. Or come back later on -- you may discover a need to know more about how radio telescopes work in a few years!

* What is SAFe? 
 
  * This is a very good question! We have some slides to tell you `what SAFe is <https://confluence.skatelescope.org/download/attachments/113803312/SKA%20SAFe%20Introduction%20-%20July%2020.pptx?version=1&modificationDate=1595231478869&api=v2>`_. 
  * You should also visit the `Training Events <https://confluence.skatelescope.org/display/SE/Training+Events>`_ Confluence page, and discover when the next appropriate SAFe training sessions will happen. You will probably want to attend the SAFe for Teams training, but please discuss this with your Scrum Master. The training could happen at any point in the next three months, and some of it will be revision of what you've learnt from reading the slides.

* What are we building? 
  * The `Solution Intent <https://confluence.skatelescope.org/display/SWSI>`_ Confluence pages describe the software architecture of the SKA. It also describes the direction in which we intend the architecture to evolve. We suggest you look at the top-level views, and then look at the specific views for the part of the system that your team is working on. Again, at this stage, you're only looking at a small section of the information. You can return later to get a better idea of the wider context. Your Scrum Master will help you identify the relevant pages.

* How are we building it?

  * We have a guide to the `way SKA currently works to develop software <https://confluence.skatelescope.org/display/SE/Improving+the+context-awareness+of+our+teams+and+collaborators>`_. This tells you a bit about what teams we have and what we are doing. 
  * You'll also want to look at the `Operations Context <https://confluence.skatelescope.org/display/SWSI/Operations+Context>`_, to find out how the software fits in to the operational environment of the running telescope.
  * Check out the `timeline <https://confluence.skatelescope.org/display/SE/Bridging+Vision+and+Roadmap#BridgingVisionandRoadmap-SolutionRoadmapTowardsT%E2%82%80>`_ of the software project, so you know roughly what the SKA is planning to do when, and where we are in the process of building a world-leading Radio Astronomy Observatory.
  * Coming soon: the SKA Software Security policy!
 
  * We encourage you to use ssh to push your changes GitLab. GitLab tells you how to `set up ssh keys <https://docs.gitlab.com/ee/ssh/>`_.
  * We also expect you to sign your commits. GitLab provides instructions on `how to create a GPG key and use it to sign your commits <https://docs.gitlab.com/ee/user/project/repository/gpg_signed_commits/>`_. 
    If you already have a GPG key, the same page tells you how to associate it with your GitLab account. 

* Finally, there's a `Glossary <https://confluence.skatelescope.org/display/GLOS/Glossary>`_. This lists many of the terms and acronyms in use in SKA. Also, don't be afraid to ask your team on Slack, or ask questions in meetings if you don't understand. 

Information about People
------------------------

Your Scrum Master should introduce you to your team, and other people you'll meet in the course of your work.
You can find out about the `people who work for the SKA Organisation <https://www.skatelescope.org/skao-staff/>`_ from the SKA website. 
You'll find out more about the people working on the software later on.

Socialising
^^^^^^^^^^^
You'll get to know people a bit through the various meetings SKA holds, and your own institution probably has some social events that you can participate in. For SKA, we currently have the #social-boardgames slack channel, the #rand-chats channel, and a lunchtime speaker series.

Information about your Team
---------------------------

Your Scrum Master should give you links to:

* Your team's Google Drive space
* Your team's Confluence area. Each team has a space in Confluence. All of the teams are listed in the `Agile Release Train <https://confluence.skatelescope.org/display/SE/Agile+Release+T,rains>`_ pages.
* Key SKA `Confluence Calendars <https://confluence.skatelescope.org/calendar/mycalendar.action>`_ and `instructions on how to copy them to your own calendar <https://confluence.skatelescope.org/display/SC/SKA+Calendar+Home>`_.
* The main Slack channels in use. You should join your team's slack channel. We also suggest that you join some of the help channels (they all start #help-) , #announcements, #system-demos-buzz and #rand-chats. You may find other channels to join later on!

If you are not employed by the SKA Organisation, you'll probably want to set up a Zoom account.
While you *can* use Zoom from your web browser, we use Zoom so much that you'll probably find it easier to `have your own account <https://zoom.us/freesignup>`_.
We also sometimes use Slack for conversations between individuals, but most major SKA events are conducted using Zoom.

If you are employed by the SKA Organisation, you may have a Zoom account associated with your SKA email address. 
The SKA IT team should be able to assist. 

We also recommend that you set up a Miro account. You can use it as a guest for many applications, but it's sometimes useful to sign up with your institutional email address. 
If you are a new Scrum Master or Product Owner, you will definitely need a Miro account!
You can familiarise yourself with Miro by playing in `this sandbox <https://miro.com/app/board/o9J_kvL9C7w=/>`_.

Training
--------
This may be the first time you've used JIRA or Confluence. Both of these have extensive help pages, which can be accessed by clicking on the question mark in the top right of the screen.
The links change every time the software is updated, but the question mark icon will always link to the latest version.
As a rough guide, you should be comfortable editing and creating new Confluence pages, and creating and updating JIRA tickets.
If you're not, then spend some time with the documentation.
SKA Confluence has a dedicated `Demonstration space <https://confluence.skatelescope.org/display/TS/Demonstration+space>`_ for you to test things out. 

If you've already used JIRA or Confluence before, we recommend reading the `JIRA and Confluence Usage Guidelines <https://confluence.skatelescope.org/display/SE/Jira+and+Confluence+Usage+Guidelines>`_ to find out how we're using them specifically in the SKA.
It's also worth talking to your Scrum Master to find out how your team is using JIRA and Confluence. 
In general, developers are empowered to raise issues, but there is then a process to prioritise that activity, so that we're working on the most critical issues first.
But that's just common sense.

You'll probably have a lot of questions at this point.
Your Scrum Master is your first port of call, but they may also encourage you to talk to someone else on the team, or someone else in the SKA.
If you're having trouble with particular tools, the slack help channels may be of use as well.

First Month
===========
This month is about getting you to the stage where you're able to contribute to your team's work. 
In each subsection, items are approximately ordered by priority, so things earlier in the list should usually be done before things later in the list.

First of all, you should familiarise yourself with the `SKA Definition of Done <https://developer.skatelescope.org/en/latest/development_practices/definition_of_done.html>`_. 

Understanding more about the SKA
--------------------------------

* Have a look at the SKA organisation chart (it's linked on the bottom of the right-hand sidebar on the `staff page <https://www.skatelescope.org/skao-staff/>`_, and find out where you fit in.
* Find out about your ART (Agile Release Train). An overview of the `structure <https://confluence.skatelescope.org/display/SE/Agile+Release+Trains>`_ will give a general picture. Then you should look at one or other of

  * the `DP ART <https://confluence.skatelescope.org/x/CXx0B>`_
  * the `OMC ART <https://confluence.skatelescope.org/x/nH10B>`_.
  * Have a look at the pages on `Program Increment and Cadence <https://confluence.skatelescope.org/display/SE/Program+Increments+%28PIs%29+and+cadence>`_; they will tell you about the regular planning and evaluation cycles of the SKA.
  * And look at the `operational flow <https://confluence.skatelescope.org/display/SE/Observation+Management+and+Controls+Agile+Release+Train?preview=/74743196/74743245/OperationalFlow-v2.pdf>`_. The goal here is to find out where your team fits in the organisation, but with a bit more detail than we had time for in week one.

* Look at the `Module Decomposition <https://confluence.skatelescope.org/display/SWSI/Views%3A+Module>`_ of the SKA, and learn how this maps to the different `GitLab project <https://developer.skatelescope.org/en/latest/projects/list.html>`_.
* Read the `Architectural Decision Process <https://developer.skatelescope.org/en/latest/community/decision_making.html>`_. This process is how we can change and update our architecture, as we find out more about the system we're implementing, or as we need to adopt new technology.  All developers are able to reason about the architecture of the system; you'll need to know the process.

What are your skills?
---------------------
Now you know more about what your team does, and where it fits in the organisation, we suggest you look at the `SKA skills matrix <https://docs.google.com/spreadsheets/d/1aKpe-mbUdVUFIEMw5bQ1Uhs6CVmolKzIItm6-w_9r5o/edit?usp=sharing>`_.
You'll now work out with your Scrum Master which skills you need to do your job.
We recommend taking a copy of the skills spreadsheet and putting it in your team area in Google Drive.

The skills are approximately grouped by difficulty and how frequently you might need to do the activity.
The "Advanced" sections often require using different skills together to produce the desired result.
Then assess whether you need to do some training or learning so that you can do your work confidently.
Your Scrum Master may create some JIRA tickets to help manage this.
You can return to this matrix at various points in your SKA work, to use it as a guide when you need to learn new topics.

The skill gradation is only approximate.
Some frequently-needed activities may be classed in the "basic" section of the skills matrix, even if they're conceptually a bit more difficult, simply because we expect you'll need to use them very frequently to work in that area. 
The more advanced tasks may require knowledge across multiple domains. 
We've tried to arrange these topics in a moderately logical order, leading from skills everyone needs, through to more specific and/or complex skills that may not be needed by everyone.
Then there are a few sections on general programming skills.
This arrangement can only be approximate; there are many ways to arrange this, and the order in which you tackle these is something you should discuss with your Scrum Master.
We do recommend that everyone makes sure they can do the basic tasks in JIRA, Confluence, and Zoom.

You should work through the skills specified by your Scrum Master, and see wheter you can do the associated activity. 
Even if you can do the activity, you may need to do some reading to find out how the SKA does things.
You can also sign up for training on the `Confluence training pages <https://confluence.skatelescope.org/display/SE/Training>`_.

Suggested Activities
--------------------
These are some things we think you might want to do.
Discuss this with your Scrum Master to see which ones are most appropriate for you.

* Join a Community of Practice (CoP). CoPs span the two Agile Release Trains (ARTs), and are a good way of sharing expertise, connecting with the wider community and making a contribution.
* Continue watching the `Radio Interferometry lectures <https://confluence.skatelescope.org/display/SE/Lectures+on+Radio+Interferometry>`_.
* Get involved in a team's feature. This may be as a developer, reviewer, tester, by shadowing a Feature owner, helping with a demo, or something else!
* Learn about (or get!) access to the `EngageSKA Cluster <https://developer.skatelescope.org/en/latest/services/ait_performance_env.html>`_, or `access to HPC facilities <https://confluence.skatelescope.org/display/SE/HPC+access>`_ for testing, prototyping and performance testing. People on the DP ART are more likely to need to access the HPC facilities for performance testing; most developers will need to be aware of how the EngageSKA cluster is used for testing. You may also need to arrange access to the `SKA Data Store <https://confluence.skatelescope.org/display/SE/Working+with+Google+Cloud+Platfom+%28GCP%29+storage>`_.
* Create or amend some SKA documentation, whether on the Developer Portal, Confluence, or in a specific GitLab project.
* Attend a system demo. You can find out more about demos in the #system-demos-buzz Slack channel, or in the `Demos <https://confluence.skatelescope.org/pages/viewpage.action?pageId=68715218>`_ pages in Confluence.
* Sign up for some SKA-organised training. We expect that you'll need to attend some SAFe training; now is a good time to sign up!
* Watch some parts of videos of recent demos that describe the part of the system you're working on; your Scrum Master should be able to recommend suitable demos.

Suggested activities for new developers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This section is primarily aimed at new developers. 
Your Scrum Master may create tickets in JIRA; this will help you get used to managing your work via JIRA if this is new to you.

* Commit to an SKA project on GitLab. This may be as simple as fixing a typo in some documentation. We recommend that projects, especially projects where we expect external people to contribute, keep a list of easy issues to fix, as they're a good way in to a project. You'll need to look at `how to branch your code <https://developer.skatelescope.org/en/latest/tools/git.html#branching-policy>`_. That page will tell you how to name your branch. 
* Create a Merge Request (MR) on GitLab. You'll need to do that if you've committed a change!
  
  * Include the JIRA ticket number in the commit
  * Write a good `commit message <https://developer.skatelescope.org/en/latest/tools/git.html#committing-code>`_!

* Review someone else's code on GitLab.
* Read your team's documentation for the main project you're working on.

Suggested activities for other roles
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Scrum Masters: lead a stand up, then a review and retrospective session, and a planning meeting!

Product Owners: create new tickets for your team.
Remember that we want measureable outcomes, and the Definition of Done.

Members of the Solution or Program Management: attend feature development workshops as soon as you can.
Also talk to the teams, and find out what they think they're doing.

First Three Months
==================
These months are about filling out your knowledge of the project. 
Because some things happen on a 3-monthly cycle in the SKA, some of these events may be earlier or later in your onboarding. 
There will probably be training opportunities during the first 1-3 months, so some may technically happen in your first month if that's when the training is offered. We hope they're useful whenever they happen.

The training events and the suggested reading also provide an opportunity to revisit some of the topics you looked at in your first week or month, but now you'll have more context, and you can dive into a bit more detail.

Remember that we have `training pages on Confluence <https://confluence.skatelescope.org/display/SE/2020-07-09+Introduction+to+SAFe>`_!

* Attend an SKA Onboarding session.
* Attend SAFe for Teams training.
* Give a demo or lightning talk!
* Learn about `ECPs (Engineering Change Proposals) <https://confluence.skatelescope.org/pages/viewpage.action?pageId=5767262>`_. These are often required for major architectural changes, so it's useful to understand the purpose and process of ECPs.
* Continue with your training plan, using the skills matrix!
* Make sure you know where to get help. This was covered in week one, but some revision may be helpful.
* Have a look at the various `Monitoring Dashboards <https://developer.skatelescope.org/en/latest/services/monitoring-dashboards.html>`_ for the EngageSKA Cluster, so you can see what things look like when our prototype is running, and what data we are collecting about it.
* Learn about the SKA naming conventions for code, repositories, containers, etc. We need to make our code and the artefacts built from it easy to understand, so we have some standards to adhere to, and some recommendations.

This is the end of your formal onboarding! 
We hope that you've now got an idea of what the SKA is, what we're doing, and how you fit in.
We hope that you've started making contributions to your team, and that you know some people in SKA who can help you out.
We hope that you've learnt a lot, and that you've now got enough information to know where to go to learn more or get more training in the future.

We hope that you enjoy working with us!
  
