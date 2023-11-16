Branching policy
================

The preference within the SKA is that a `feature branch workflow <https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow>`_ be adopted, however it is recognised that there are multiple workflows in use, and team requirements and composition vary.
Regardless of the adopted workflow employed, two concepts are important to the SKA way of using Git:

  1. The master branch of a repository shall always be stable, and tested.
  2. Branches shall be short lived, merging into master as often as possible.

Stable means that the master branch shall always compile and build correctly,
and executing automated tests with success. Every time a master branch results
in a condition of instability, reverting to a condition of stability shall have
the precedence over any other activity on the repository.

The following sections discuss the two of the most common workflows:

* Master or trunk based development
* Feature based branching

.. _master-based-development:

Master based development
++++++++++++++++++++++++

Teams may adopt a particular Git workflow designated as Master based development approach,
where each developer commits code into the master branch on a
daily basis. While this practice may seem counter intuitive, there is good evidence
in literature that it leads to a better performing system. Branches are
reduced to a minimum in this model, and the discipline of daily commits into
master greatly enhances the communication within the team and the modularity
of the software system under construction. The workflow follows these steps:

  * As a developer starts working on a story, all their commits related to the story shall contain the story Jira ID in the message. i.e. *AT-51 method stubs*
  * The developer continues working on their local master branch with multiple commits on the same story.
  * Each day the local master pulls the remote and incorporates changes from others.
  * The local master is tested successfully.
  * The local commits are pushed onto the remote master.
  * The CI pipeline is correctly executed on the remote master by the CI server.

Implemented correctly, this practice leads to having an integrated, tested,
working system at the end of each  development interval, that can be shipped
directly from the master branch.

However, this workflow relies on great discipline, and tends to suit small teams with a highly controlled work funnel that ensures work can be completed and tested on a daily iteration, with well defined and highly independent work packages.  There is no buffer against integration failures, so the discipline must extend to dropping all other tasks until the master branch is stable again should there be issues, which will have associated productivity costs against the entire team.

Feature based branching
+++++++++++++++++++++++

The SKA organisation advocates adopting a story-based branching model, often referred to as
**feature branching**. This workflow effectively leverages GitLab **Merge Requests** enabling code reviews and continuous branch testing, but it
is important to stress the importance of having short lived branches. It is
easy to abuse this policy and have long living branches resulting in painful
merge activities and dead or stale development lines.
Bearing in mind that a *story* by definition is a
piece of work a developer should conclude in the time of a sprint, the workflow
should follow these steps:

* As a developer starts working from master on a new story, they create a new branch.
* The new branch shall be named after the story, i.e. *at1-26-the-new-widget*.  Note: branch names are by convention all lower case.

.. code:: bash

  $ git clone git@gitlab.com:ska-telescope/ska-skampi.git
  $ cd ska-skampi
  $ git branch
  * master
  $ git checkout -b at1-26-the-new-widget
  $ git branch
  master
  * at1-26-the-new-widget

* All the commit messages contributing to the development of the story begin with the story ID, i.e. *AT1-26 - basic testing*.
* The developer makes sure that all tests execute correctly on their local story branch.
* When the story is ready for acceptance the developer pushes the story branch upstream.

.. code:: bash

  $ git push -u origin at1-26-the-new-widget
  Enumerating objects: 48, done.
  Counting objects: 100% (48/48), done.
  Delta compression using up to 12 threads
  Compressing objects: 100% (23/23), done.
  Writing objects: 100% (25/25), 4.80 KiB | 614.00 KiB/s, done.
  Total 25 (delta 14), reused 0 (delta 0)
  remote:
  remote: To create a merge request for at1-26-the-new-widget, visit:
  remote:   https://gitlab.com/ska-telescope/ska-skampi/-/merge_requests/new?merge_request%5Bsource_branch%5D=at1-26-the-new-widget
  remote:
  To gitlab.com:ska-telescope/ska-skampi.git
  * [new branch]      at1-26-the-new-widget -> at1-26-the-new-widget
  Branch 'at1-26-the-new-widget' set up to track remote branch 'at1-26-the-new-widget' from 'origin'.

* The branch CI pipeline is automatically triggered.
* A Merge Request is created on GitLab to merge the story branch into the master branch.  The above commit reponse shows a conveniently supplied URL to start this process.
* Reviewers interact with comments on the Merge Request until all conflicts are resolved and reviewers accept the Merge Request.
* The Merge Request is merged into Master.
* The CI pipeline is executed successfully on the master branch by the CI server.

There are some considerations with Feature Branching:

* continually branching and merging is an overhead for small teams and very short work packages where there is a high prevalence of one-commit to one-merge-request
* branching requires discipline in that they should be short lived and developers need to remember to delete them after use
* stale and orphaned branches can pollute the repository
* developers must resolve merge conflicts with master before pushing changes, so there can be a race to merge to avoid these issues


Alternate Strategy
++++++++++++++++++

Whenever a team deviates from one of the recommended policies, it is important
that the team captures its decision and publicly describe its policy,
discussing it with the rest of the community.

See a more detailed description of this workflow at https://docs.gitlab.com/ee/topics/gitlab_flow.html
