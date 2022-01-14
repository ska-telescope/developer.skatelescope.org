.. _git:

Working with GitLab
-------------------

About git
=========

Git is the version control system of choice used by SKA. Describing the basics
of how to use Git is out of the scope of this developer portal, but it is
fundamental that all developers contributing to SKA get familiar with Git and
how to use it. These online resources are a good starting point:

  * Learn git interactively: https://learngitbranching.js.org/
  * Official git reference at: https://git-scm.com/docs
  * Interactive Git cheatsheet: http://www.ndpsoftware.com/git-cheatsheet.html

GitLab as the Git repository manager
====================================

The SKA Software team have adopted the GitLab social coding platform as the main Git repository manager for its
CI/CD tools.

The following describes how to access the service, and how to setup the basic working environment to integrate with GitLab for the SKA.

Use institutional email
+++++++++++++++++++++++

Create a GitLab account using your **institutional email** address at
https://gitlab.com/users/sign_in. If you already have an account on
GitLab, you should have your institutional email added to your profile: click on
your user icon on the top right corner and select *Settings->Emails->Add email
address* .  It is recommended that 2FA (two-factor authentication) is enabled.  There are a variety of OTP (One Time Pin) applications available for mobile phones with instructions available:
https://docs.gitlab.com/ee/user/profile/account/two_factor_authentication.html.

Setup SSH key
+++++++++++++

To enable `git+ssh` based authentication for clients, associate your ssh-key to your user at *Settings->SSH keys* (https://gitlab.com/profile/keys).

SKA Organization
++++++++++++++++

SKA Organization can be found on GitLab at https://gitlab.com/ska-telescope.
Send a request to the System Team on Slack (*team-system-support* channel) to link your account to the SKA Gitlab group, and assist with creation of repositories and integrating CI.

Code Snippets
+++++++++++++

You can share code snippets (code blocks) within the SKA Organization using the *ska-snippets* repository, and also you can always share code snippets with the project members using project level snippets *(If they are enabled)*

.. _committing-code:

Committing code
===============

When working on a development project, it is important to stick to these simple
commit rules:

* Work in feature branches where possible (see :ref:`branching-policy`)
* Commit early, commit often.
* Have the **Jira story ID** at the beginning of your commit messages. (You can also use Gitlab and JIRA integration defined in :doc:`/tools/jira`)
* Git logs shall be human readable in sequence, describing the development activity.
* Use imperative forms in the commit message:

.. code:: bash

  ST-320 make fluentd,kibana,elasticsearch optional

  * add a pipeline example for disabling ELK
  * add enabled checks
  * filebeat,journalbeat support added to clusters

  # Please enter the commit message for your changes. Lines starting
  # with '#' will be ignored, and an empty message aborts the commit.
  #
  # Date:      Tue May 12 11:24:17 2020 +1200
  #
  # On branch st-320-swap-out-fluentd
  # Your branch is up-to-date with 'origin/st-320-swap-out-fluentd'.


You can find additional information on how to write a good commit message `here <https://chris.beams.io/posts/git-commit/>`__.

Configure Git
=============

Set Git institutional email address
+++++++++++++++++++++++++++++++++++

Setup Git so that it uses your institutional email account to sign commits,
this can be done in your global Git configuration:

.. code:: bash

  $ git config --global user.email "your@institutional.email"


Or you can configure the mail address on a project basis.

.. code:: bash

  $ cd your/git/project
  $ git config user.email "your@institutional.email"

Signing commits with GPG
++++++++++++++++++++++++

Developers are strongly encouraged to use a GPG key to sign Git commits.
The procedure for
obtaining a GPG key and uploading it to the GitLab account is described at
https://docs.gitlab.com/ee/user/project/repository/gpg_signed_commits/, or got straight to uploading at https://gitlab.com/profile/gpg_keys.


The only difference from a non signed commit is the addition of the -S flag:

.. code:: bash

  $ git commit -S -m "My commit msg"

The passphrase of your GPG key will then be asked. To avoid having to type the -S flag every time a commit is made, Git can be configured to sign commits automatically:

.. code:: bash

  $ git config --global commit.gpgsign true


When working in a remote repository by ssh connection, you need to create new GPG key and add it as explained above or you can forward your existing gpg key to the remote machine following the instructions below.
You can find more information `here <https://wiki.gnupg.org/AgentForwarding>`__.

* Find your local socket: :code:`gpgconf --list-dir agent-extra-socket`
* Find your remote socket: :code:`gpgconf --list-dir agent-socket`
* Configure your SSH configuration file by adding the following line after your host settings: :code:`RemoteForward <socket_on_remote_box>  <extra_socket_on_local_box>`. Note that you need to reconnect to the remote machine to apply the changes.
* Add :code:`StreamLocalBindUnlink yes` into :code:`/etc/ssh/sshd_config` in the remote machine and restart the sshd service to close the gpg forwarding socket when closing the ssh connection.


Squashing commits
+++++++++++++++++

If you want to replace a series of small commits with a single commit or if you want to make their order more logical you can use an interactive rebase (git rebase -i) to squash multiple commits into one or reorder them. When squashing commits it is important to consider the following:

* You should never rebase commits you have pushed to a remote server.
* You should also never rebase commits authored by other people.

In general the squashing of commits is discouraged for SKA repositories.

.. _branching-policy:

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

.. _merge-request:

Merge requests
++++++++++++++

When the story is ready for acceptance a Merge Request should be created on GitLab to
merge the story branch into the master branch. The Merge Request UI on GitLab includes a platform for the discussion threads, and indeed an important purpose of the Merge Request is to provide an online place for the team to discuss the changes and review the code before doing the actual merge.

It is recommended that A new Merge Request will include, among others, the following options:

* The Merge Request Title should always include the related JIRA issue id - this will be automatic following the above branching naming convention. You can add :code:`Draft` or :code:`Draft:` at the beginning of the Merge Request Title to automatically indicate that a Merge Request is not ready for merging just yet. Alternatively, you can use the Merge Request UI to mark the Merge Request as draft.
* Merge Request Description should include a concise, brief description about the issue.
* Add approval rules.
* Select one or more people for review (use the Reviewer field in the MR to differentiate between assignees and reviewers) and include anyone who has worked in the Merge Request.
* Delete source branch when Merge Request is accepted.
* Do not Squash commits when Merge Request is accepted.

At the moment the SKA organisation does not enforce approval rules, but it is recommended as good practice to involve other team members as assignees/reviewers for the Merge Request, and ensure that there is code review.

As part of best practices it is important to delete feature branches on merge or after merging them to keep your repository clean, showing only work in progress.
It is not recommended to squash commits submitted to the remote server, in particular if using GitLab and JIRA integration, so the enabling squash commits option should be left unchecked. However you can arrange your commits before pushing them to remote.

.. _merge-settings-maintainers:

*Gitlab MR Settings for Project Maintainers*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are more additional settings in GitLab that only project maintainers could tune. The following settings are configured for the developer portal itself and they are the recommended settings for the projects in the SKA organisation. Normally, these settings would not be needed to change.

.. _figure-gitlab-mergerequest-settings:

.. figure:: images/gitlab-mergerequest-settings.png
   :scale: 80%
   :alt: GitLab Merge Request Settings, showing the default settings for SKA Organisation projects
   :align: center
   :figclass: figborder

   GitLab Merge Request Settings.


Note that the System team may from time to time batch update all of the SKA projects' settings as to confirm with the policies and recommendations.

Merge Request Quality Checks
============================

To ensure the guidelines and policies described in this Developer Portal are followed for a consistent and robust development/security/review and  Software Quality Assurance processes for SKA repositories, there are a series of automated checks in place.
The result of the checks are reported back to the developers in the main Merge Request page on GitLab.
It is advised to look for this comment and respond to any issue arisen.

A check is either a:

* Failure (🚫): The Merge Request is violating the SKA guidelines and it should be fixed by following the mitigation defined in the check

  * Example
  
    * Branch name should start with a lowercase Jira Ticket ID - see :ref:`branching-policy`

* Warning (⚠): The Merge Request is following anti patterns/non-advised guidelines/policies and it would be better if it is fixed by the mitigation defined in the check

  * Example
  
    * Docker-Compose commands found on the repository

* Information (📖): You should be aware of the information conveyed in this Merge Request quality check message
  
  * Example
  
    * The merge request does not present documentation changes

Each check has a brief description that explains what it does and a mitigation/explanation (depending on check type) which gives detailed information about the check and how to fix it or explains its findings more. You can find a list of each check below.

Workflow
++++++++

When a new Merge Request is created, a webhook triggers the SKA MR Service to carry out the checks described below and **Marvin the Paranoid Android** (*username: marvin-42*) happily reports back to the Merge Request by adding a comment (probably the first comment). The comment includes a table (like the example below) with each check and associated information.

For the subsequent changes pushed to the Merge Request, the comment is updated to reflect the latest status of the Merge Request.

.. figure:: images/marvin-check-table.png
   :scale: 80%
   :alt: Marvin Merge Request Settings
   :align: center
   :figclass: figborder

   Marvin's Check Table.

*Automatic Fixing of Merge Request Settings*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

While the checks are being processed, several settings in the Project and the Merge Request that triggered the checks will be automatically fixed. These fixes include:

* Disabling 'squash commits when merge request is accepted'.

* Enabling 'delete source branch when merge request is accepted'.

* Enabling 'automatically resolve mr diff discussions'.

* Enabling 'remove all approvals when new commits are pushed'.

* Enabling 'pipelines must succeed'.

* Enabling 'delete source branch option by default'.

* Enabling 'show link to create/view MR when pushing from the command line'.

In addition to the above automatic fixes, there is a clickable Fix link next to each supported Merge Request Settings message, clicking on it will trigger Marvin to attempt to fix that setting if the triggering user is authenticated.

Only users that are assigned to the Merge Request can trigger this automatic setting fix feature.

*Marvin Approval*
^^^^^^^^^^^^^^^^^

Marvin after creating the table will verify if there is any checks under the failure category failed, if so Marvin does not approve the MR, and in the case that that MR was already approved before by him he unapproves it. 
If none of the checks under the failure category failed Marvin will approve the MR.

Checks
++++++

+------------+-----------------------+------------------------------------------------------------------------------------------+
| Type       | Description           | Mitigation Strategy                                                                      |
+============+=======================+==========================================================================================+
| Warning    | Docker-Compose        | Please remove docker-compose from following files:                                       |
|            | Usage                 |     *  At file: <file_location> on line <line_number>                                    |
|            | Found                 |     *  At file: <file_location> on line <line_number>                                    |
+------------+-----------------------+------------------------------------------------------------------------------------------+
| Failure    | Missing Jira Ticket   | Branch name should start with a lowercase Jira ticket id                                 |
|            | In Branch Name        |                                                                                          |
+------------+-----------------------+------------------------------------------------------------------------------------------+
| Failure    | Missing Jira Ticket   | Following commit messages violate :ref:`committing-code`                                 |
|            | in commits            |      *   <commit-hash>                                                                   |
|            |                       |      *   <commit-hash>                                                                   |
+------------+-----------------------+------------------------------------------------------------------------------------------+
| Failure    | Missing Jira Ticket ID| Title should include a valid Jira ticket id                                              |
|            | in MR Title           |                                                                                          |
+------------+-----------------------+------------------------------------------------------------------------------------------+
| Failure    | Wrong Merge           | Reconfigure Merge Request Settings according to :ref:`merge-request`                     |
|            | Request Setting       |                                                                                          |
|            |                       | MR Settings Checks(You may need Maintainer rights to change these):                      |
|            |                       |    * You should assign one or more people as reviewer(s)                                 |
|            |                       |    * There should be at least 1 approval required                                        |
|            |                       |    * Please uncheck Squash commits when Merge Request is accepted.                       |
|            |                       |    * Please check Delete source branch when merge request is accepted.                   |
|            |                       | Project Settings Checks(You may need Maintainer rights to change these):                 |
|            |                       |    * Pipelines must succeed should be checked                                            |
|            |                       |    * Remove all approvals when commits are added to the source branch should be checked  |
|            |                       |    * Prevent approval of MR by the author should be checked                              |
|            |                       |    * Automatically resolve mr diff discussions should be checked                         |
|            |                       |    * Prevent editing approval rules in merge requests should be checked                  |
|            |                       |    * Enable Delete source branch option by default should be checked                     |
|            |                       |    * Merge Method should be Merge Commit                                                 |
|            |                       |    * Show link to create/view MR when pushing from the command line should be checked    |
+------------+-----------------------+------------------------------------------------------------------------------------------+
| Failure    | Missing Assignee      |  Please assign at least one person for the MR                                            |
+------------+-----------------------+------------------------------------------------------------------------------------------+
|Information | Documentation Changes | This MR doesn't introduce any documentation changes. Please consider                     |
|            |                       | updating documentation to reflect your changes                                           |
+------------+-----------------------+------------------------------------------------------------------------------------------+
|Failure     | Read The Docs         | Please integrate this project with ReadtheDocs following the guidelines:                 |
|            | Integration           |  *  Please set up docs/ folder for sphinx documentation build following the guidelines   |
|            |                       |  *  Please add this project as a subproject on Read the Docs following the guidelines    |
|            |                       |  *  Please import your project into Read the Docs                                        |
+------------+-----------------------+------------------------------------------------------------------------------------------+
| Failure    | Pipeline Checks       | Please create a `pipeline </en/latest/tools/ci-                                          |
|            |                       | cd.html>`_  on this Merge Request or please add the following jobs:                      |
|            |                       |                                                                                          |
|            |                       |   *  `ci-metrics  </en/lat                                                               |
|            |                       |      est/tools/ci-cd/continuous-integration.html?highlight=post_step.yml#automated       |
|            |                       |      -collection-of-ci-health-metrics-as-part-of-the-ci-pipeline>`_                      |
|            |                       |   *  `helm-publish  </en/                                                                |
|            |                       |      latest/tools/software-package-release-procedure.html?highlight=helm_publish.yml     |
|            |                       |      #package-and-publish-helm-charts-to-the-skao-helm-chart-repository>`_               |
+------------+-----------------------+------------------------------------------------------------------------------------------+
| Warning    | Non-compliant License | Please update the license information according to                                       |
|            | Information           | :doc:`/projects/licensing`                                                               |
+------------+-----------------------+------------------------------------------------------------------------------------------+
| Warning    | Missing Test Coverage | This Project is missing test coverage Please have a look at the following `page <https   |
|            |                       | ://developer.skatelescope.org/en/latest/tools/ci-cd/continuous-integration.html?hig      |
|            |                       | hlight=coverage#automated-collection-of-ci-health-metrics-as-part-of-the-ci-pipeline)>`_ |
+------------+-----------------------+------------------------------------------------------------------------------------------+

Docker-Compose Found
^^^^^^^^^^^^^^^^^^^^
This check is to warn users that they using Docker-Compose in their project. This will make it easier to remove Docker-Compose from the projects as it shouldn't be used anymore (creates issues with the underlying
networks). To avoid this warning, the user needs to remove Docker-Compose from the project.  The details of the files involved can be seen in the warning message under the Mitigation Strategy column along with the line numbers where Docker-Compose is found.

Missing Jira Ticket In Branch Name
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This check warns users from raising a Merge Request without A Jira ticket ID in the branch name. This will make every branch identifiable with its Jira ticket. The level of this check is a failure, and to avoid it users should follow the steps listed in :ref:`master-based-development`.

Missing Jira Ticket in commits
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This check warns users of any commit that was made without using a Jira ticket ID in it's message. Having the Jira ticket ID at the beginning of your commit messages is one of the basic rules listed at :ref:`committing-code`. The Jira Ticket ID in the commit messages are used by the developers to keep track of the changes made on the ticket through JIRA, and is a key part of the Software Quality Assurance programme.

Missing Jira Ticket ID in MR Title
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This check warns users from raising a Merge Request without A Jira ticket ID in Merge Request title. This will make every Merge Request identifiable with its Jira ticket (through the GitLab/Jira integration). The level of this check is a failure, and to avoid it users should include a valid Jira ticket id in title of the Merge Request.

Wrong Merge Request Setting
^^^^^^^^^^^^^^^^^^^^^^^^^^^
This check warns users from merging their branch without the Merge Request being configured with the right settings. The level of this check is a failure, and to avoid it the Merge Request should be configured as listed in :ref:`merge-request`. Some of the settings can only be changed by the maintainers.  These settings are listed in :ref:`merge-settings-maintainers`.

Missing Assignee in MR
^^^^^^^^^^^^^^^^^^^^^^
This check warns users that no one was assigned to the Merge Request. The level of this check is failure. To avoid it at least one assignee must be added to the MR.

Documentation Changes
^^^^^^^^^^^^^^^^^^^^^^
This check warns users that this MR doesn't introduce any documentation changes. The level of this check is information. No action is needed, some MR may not require to update documentation, it is just a gentle warning that a documentation update might be missing.

Read The Docs Integration
^^^^^^^^^^^^^^^^^^^^^^^^^
This check warns users that this project does not follow the guidelines for succesfull Read The Docs Integration. The level of this check is failure. To avoid it, three checks must pass. The project needs to have set up docs/ folder for sphinx documentation, it also needs to be added as a subproject on Read the Docs. Finally webhooks need to be set up so that the project is imported your into Read the Docs.

Pipeline Checks
^^^^^^^^^^^^^^^
This check warns users from merging their Merge Request without having a pipeline with the needed jobs like post_step.yml and build_push.yml. Including build_push.yml guarantees that container scanning job is included in your pipelines. The level of this check is a failure, and to avoid it 2 steps may be needed. The first one is to create a pipeline (i.e. add .gitlab-ci.yml) if there is not one created yet. The second one can only be done after the first one, and it consists on including the jobs that are listed on the mitigation strategy column (i.e. helm-publish) in the created pipeline. How to add the jobs to the pipeline is explained on the developer portal (job name as hyperlink).

Non-compliant License Information
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This check warns users if license in their project is not compatible with SKA approved license so that the quality of the software is improved and compliance is ensured with the SKA standards. This does not apply to projects in the 'External' project.

Missing Test Coverage
^^^^^^^^^^^^^^^^^^^^^
This check warns users if test coverage is missing, by verifying if the file code-coverage.xml exists in the .post job (create-ci-metrics). To avoid it make sure your tests are exporting a build/reports/code-coverage.xml file, or simply use the `make submodule targets <https://gitlab.com/ska-telescope/sdi/ska-cicd-makefile>`_.