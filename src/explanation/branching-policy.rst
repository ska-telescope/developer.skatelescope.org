.. _branching-policy:

Branching policy
================

The preference within the SKA is that a `feature branch workflow <https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow>`_ be adopted, however it is recognised that there are multiple workflows in use, and team requirements and composition vary.
Regardless of the adopted workflow employed, two concepts are important to the SKA way of using Git:

  1. The main branch of a repository shall always be stable, and tested.
  2. Short-Lived Branches: Merge into main as often as possible.
  3. Commit Message Prefix: All commit messages must start with the story Jira ID.

Stable means that the main branch shall always compile and build correctly,
and executing automated tests with success. Every time a main branch results
in a condition of instability, reverting to a condition of stability shall have
the precedence over any other activity on the repository.

The following sections discuss the two of the most common workflows:

* Trunk-based development
* Feature based branching

.. _trunk-based-development:

Trunk-based development
++++++++++++++++++++++++

Core "trunk" branch in SKA repositories, previously named "master", now named "main" by default.

Trunk-based development is a version control management practice where developers merge small, frequent updates to a core “trunk” or main branch.
Teams may adopt a particular Git workflow designated as Trunk-based development approach,
where each developer commits code into the main branch on a
daily basis. While this practice may seem counter intuitive, there is good evidence
in literature that it leads to a better performing system. Branches are
reduced to a minimum in this model, and the discipline of daily commits into
main greatly enhances the communication within the team and the modularity
of the software system under construction. The workflow follows these steps:

  * As a developer starts working on a story, all their commits related to the story shall contain the story Jira ID in the message. i.e. *AT-51 method stubs*
  * The developer continues working on their local main branch with multiple commits on the same story.
  * Each day the local main pulls the remote and incorporates changes from others.
  * The local main is tested successfully.
  * The local commits are pushed onto the remote main.
  * The CI pipeline is correctly executed on the remote main by the CI server.

Implemented correctly, this practice leads to having an integrated, tested,
working system at the end of each  development interval, that can be shipped
directly from the main branch.

However, this workflow relies on great discipline, and tends to suit small teams with a highly controlled work funnel that ensures work can be completed and tested on a daily iteration, with well defined and highly independent work packages.  There is no buffer against integration failures, so the discipline must extend to dropping all other tasks until the main branch is stable again should there be issues, which will have associated productivity costs against the entire team.

Feature based branching
+++++++++++++++++++++++

The SKA organisation advocates adopting a story-based branching model, often referred to as
**feature branching**. This workflow effectively leverages GitLab **Merge Requests** enabling code reviews and continuous branch testing, but it
is important to stress the importance of having short lived branches. It is easy to abuse this policy and have long living branches resulting in painful
merge activities and dead or stale development lines.
Bearing in mind that a *story* by definition is a piece of work a developer should conclude in the time of a sprint, the workflow should follow these steps:

* As a developer starts working from the **main** branch on a new story, they create a new branch.
* The new branch shall be named after the story, i.e. *at1-26-the-new-widget*.  Note: branch names are by convention all lower case.

.. code:: bash

  $ git clone git@gitlab.com:ska-telescope/ska-skampi.git
  $ cd ska-skampi
  $ git branch
  * main
  $ git checkout -b at1-26-the-new-widget
  $ git branch
  main
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
* A Merge Request is created on GitLab to merge the story branch into the main branch.  The above commit reponse shows a conveniently supplied URL to start this process.
* Reviewers interact with comments on the Merge Request until all conflicts are resolved and reviewers accept the Merge Request.
* The Merge Request is merged into Main.
* The CI pipeline is executed successfully on the main branch by the CI server.

There are some considerations with Feature Branching:

* continually branching and merging is an overhead for small teams and very short work packages where there is a high prevalence of one-commit to one-merge-request
* Discipline Required: Branches should be short-lived, and developers need to remember to delete them after use.
* stale and orphaned branches can pollute the repository
* Merge Conflicts: Developers must resolve merge conflicts with main before pushing changes, which can lead to a race to merge and avoid issues.

Long-lived release branches
+++++++++++++++++++++++++++

Long-lived release branches are branches in a software development project that are maintained over a longer period of time, typically several months to several years. 
These branches are used to develop and release stable versions, and are typically used in projects where frequent updates and changes are not necessary or desirable. 
Long-lived release branches are often used for software that is used in critical systems, where stability and reliability are paramount.


Alternate Strategy
++++++++++++++++++

Whenever a team deviates from one of the recommended policies, it is important
that the team captures its decision and publicly describe its policy,
discussing it with the rest of the community.

See a more detailed description of this workflow at https://docs.gitlab.com/ee/topics/gitlab_flow.html
