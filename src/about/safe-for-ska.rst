*************
SAFe® for SKA
*************

As software developers, we'd like to use Lean and `Agile <https://agilemanifesto.org/>`_ processes. 
However, Agile was designed for relatively small teams (5-12 people), specifically for teams which have a great deal of autonomy. 
How can we work in an Agile-like way, when we have over 100 developers in countries all over the world, and also there are parts of our organisation that don't work in an Agile way?

We've picked SAFe® - the `Scaled Agile Framework® <https://www.scaledagileframework.com/>`_ - to help us scale up SKA software development. 
We offer training in SAFe® to all new teams and team members.  
All of the material on this page is based on the practices described on https://www.scaledagileframework.com/, customised for how we work in the SKA.

SKA Software Product Quality Assurance Plan
###########################################

The SKAO Software Product Quality Assurance Plan describes how the SAFe framework has been adopted and implemented by SKAO 
in adherence with SKAO Product Quality Assurance Plan requirements. 
It also details the related activities and responsibilities that apply to agile teams contracted. 

* :doc:`/policies/sw-quality-assurance`

The SKA Software Organisation
#############################

We split our software developers into Agile Teams, with a Scrum Master (SM) and a Product Owner (PO). 
An Agile team is relatively small, perhaps 5-12 developers, and ideally team members should have the skills to implement a working software package - so the team is ideally cross-disciplinary, though one can bring in experts for particular pieces of work. 
The Product Owner helps guide what work is done, and the Scrum Master coaches the team to improve how the work is done.

Because we're a large organisation, with 16 teams, we're split into three Agile Release Trains (ARTs - an Agile Release Train is a way of grouping teams together based on a common theme): Data Processing (DP), Observation Management and Controls (OMC), and Services. 
For more on the work undertaken by the various ARTs, have a look at `A tour of SKA SAFe processes to improve the context-awareness of our teams and collaborators <https://confluence.skatelescope.org/display/SE/A+tour+of+SKA+SAFe+processes+to+improve+the+context-awareness+of+our+teams+and+collaborators>`_. 

Each ART has a Program Team, made up of  Product Managers, Software Architects, and other stakeholders. 
The Product Managers fill a similar role to the Product Owners, but at the level of the ART, rather than the team. 
Software Architects guide the design of the system, when that can't be decided at the team level (perhaps because the decision impacts many teams). 
Each ART Program Team also has a Release Train Engineer (RTE), who is to the train what the Scrum Master is to the team - a coach on SAFe practices, to help the work go more smoothly.

There is also a Solution Team, which co-ordinates the efforts of the ARTs. 
This team consists of the Solution Train Engineer (like the RTE), the Solution Architect, the Solution Manager and Service Manager. 
Their job is to guide what work is done and how the work is done for the whole SKA software solution.

The Processes
#############

To work out what we're doing, and to keep the release trains aligned, heading towards our common goals and deadlines, we use Program Increments (PIs). 
PIs are around 3 months long, and usually consist of five lots of two-week sprints, followed by a three week Innovation and Planning sprint. 
During the Innovation and Planning Sprint, a 4-5 day planning event is held, in which the teams assemble to plan out the work for the next PI. 
Before the Covid-19 pandemic, the teams often literally assembled in one place; we now have 100% online planning events, and we will probably continue to have extensive online support using `Miro <https://confluence.skatelescope.org/display/SE/Miro+PI+planning+board+usage+overview>`_, even once a majority of developers can travel again.

During the PI planning event, teams decide to implement Features - the Features we'd like our software to have, based on the Program Backlog that's been discussed by the Program and Solution teams, and by the Agile teams in various workshops. 
The Program Backlog (containing Features ready for implementation) is chosen to align with the Solution and ART goals for the PI (i.e. what the SKA would like to work towards), and the Features are defined in `JIRA <https://confluence.skatelescope.org/display/SE/Jira+and+Confluence+Usage+Guidelines>`_. 
All ARTs plan simultaneously, though each ART defines its own plan, and cross-team and cross-ART collaboration is encouraged - and of course it's required to implement some Features. 
(Cross-ART Features are known as Capabilities.)

Once the teams have decided which Features to work on, they do some work to check that the work is feasible to do in the five sprints of the PI, often by defining stories in JIRA, and estimating how long those stories will take using a points-based system.  
Then the teams define objectives: a definition of what they'd like to achieve this PI. 
Each objective is given a business value (BV) figure, which expresses the value of this objective to the SKA. 
This figure can then be used by the teams to guide their internal decisions. 
The teams present their plan to the ART management, commit to their objectives, and participate in a confidence vote, assessing their confidence in the plan. 
The ART management then decides whether or not to accept the plan. 
Finally, all of the ART participates in a confidence vote on the overall plan of all the teams.

The SAFe processes are there to help deliver a predictable amount of business value, so management aren't surprised by what's happening at the team level. 
During the PI, there are a number of way of checking that work is progressing as planned. 
There are weekly sync meetings for the two ARTs. 
Most teams run two-week sprints, starting with detailed planning, based off the preliminary plan made during PI planning. 
The sprint ends with a review and retrospective, to allow teams to learn from what happened in the sprint, so they can maintain what's good and try to improve things that went badly. 
Teams have stand-ups - short meetings held on a frequent basis (often daily, sometimes less often). 
Because many teams are distributed, these are sometimes text-only stand-ups held in Slack, rather than a video call. 
In any case, they are frequent meetings so that the Scrum Master knows of any major hold-ups, and perhaps do something about some of those problems. 
The ART program teams also follow these practices.

The other way of getting information on what the teams are doing is via demos. 
Teams demo completed Features, or Features which need feedback from a wider range of stakeholders. 
These can be small demos to the team and key stakeholders, or larger System demos to the ART or to the whole of the SKA Software Solution organisation at a PI demo. 
There is usually at least one System demo in each ART each sprint, and at least one PI demo per PI. 
The demos show how we value working code, one of the key Agile values. 
And we will often hold discussion workshops to work on particular Features.

At the end of the PI, teams' progress towards their objectives is assessed. 
This happens during the PI as objectives are completed, and continues into the Innovation and Planning sprint. 
The Innovation and Planning sprint is when teams can try out new ideas, get involved in hackathons, and generally work on things that don't fit into the priorities for a PI.
During the Innovation and Planning sprint, there is also a review and retrospective event for everyone involved in SKA software. 
Just as reviews and retrospectives at the team levels allow the team to improve, the review and retrospective for the SKA Software organisation allows us to seek improvements, using the scientific method of formulating a hypothesis ("If we do X, we will improve Y"), performing the experiment (implementing X), and measuring the outcome (looking at our metrics to see if Y is improved).

This is a very brief introduction to SKA SAFe®. 
We strongly encourage people working on SKA Software to take the SAFe® for Teams training that's offered. 
You may notice a heavy emphasis on meetings and communication. 
SAFe® makes the cost of working in a large distributed project extrinsic. 
When you can't just pop down the corridor for a chat, or even expect someone to be awake for a video call, you have to provide and use more formal methods to ensure that information gets to the people who need it.

If you have any questions about SAFe® at SKA, have a look at our [Questions](https://confluence.skatelescope.org/questions), or contact Ray Brederode, our Solution Train Engineer.

