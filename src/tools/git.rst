Git
---

Git is the version control system of choice used by SKA. Describing the basics
of how to use git is out of the scope of this developer portal, but it is
fundamental that all developers contributing to SKA get familiar with git and
how to use it. These online resources are a good starting point:

  * Learn git interactively: https://learngitbranching.js.org/
  * Official git reference at: https://git-scm.com/docs
  * Interactive Git cheatsheet: http://www.ndpsoftware.com/git-cheatsheet.html

Branching policy
================

Albeit the SKA organisation does not want to be prescriptive about git
workflows, two concepts are important to the SKA way of using GIT:

  1. The master branch of a repository shall always be stable.
  2. Branches shall be short lived, merging into master as often as possible.

Stable means that the master branch shall always compile and build correctly,
and executing automated tests with success. Every time a master branch results
in a condition of instability, reverting to a condition of stability shall have
the precedence over any other activity on the repository.

Master based development
++++++++++++++++++++++++

We suggest teams to start developing adopting a master-based development
approach, where each developer commits code into the master branch at least
daily. While this practice may seem counter intuitive, there is good evidence
in literature that it leads to a better performing system. Branches are
reduced to a minimum in this model, and the discipline of daily commits into
master greatly enhances the communication within the team and the modularity
of the software system under construction. The workflow follows these steps:

  * As a developer starts working on a story, all his commits related to the story shall contain the story Jira ID in the message. i.e. *AT-51 method stubs*
  * The developer continues working on his local master branch with multiple commits on the same story.
  * Each day the local master pulls the remote and incorporates changes from others.
  * The local master is tested successfully.
  * The local commits are pushed onto remote.
  * The CI pipeline is correctly executed on the remote master by the CI server.

Implemented correctly, this practice leads to having an integrated, tested,
working system at the end of each  development interval, that can be shipped
directly from our master branch with the click of a button.

Story based branching
+++++++++++++++++++++

We support adopting a story-based branching model, often referred to as
**feature branching**. Bearing in mind that a *story* by definition is some
piece of work a developer should conclude in the time of a sprint, the workflow
would follow these steps:

  * As a developer starts working on a new story she creates a new branch.
  * The new branch shall be named as the story, i.e. *story-AT1-26*.
  * All the commit messages contributing to the development of the story begin with the story ID, i.e. *AT1-26 basic testing*.
  * The developer makes sure that all tests execute correctly on his local story branch.
  * When the story is ready for acceptance the developer pushes the story branch upstream.
  * A pull request is created to merge the story branch into the master branch.
  * The CI pipeline is executed successfully by the CI server on the pull request.
  * Reviewers interact with comments on the pull request up to its acceptance.
  * Pull request is merged into Master.
  * The CI pipeline is executed successfully on the master branch by the CI server.

Whenever a team deviates from one of the recommended policy, it is important
that the team captures its decision and publicly describe its policy,
discussing it with the rest of the community.

Github
------
