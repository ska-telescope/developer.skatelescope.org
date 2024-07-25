.. _gitlab-cicd-settings:

***********************
GitLab Settings
***********************

This section provides an overview of configurable settings within the GitLab for groups and projects.
These settings allow to tailor project and group-level behaviours, optimise pipeline performance, manage security protocols and enhance software development processes.

The following tables categorise settings as either Mandatory (Non-Negotiable), Best Practice (Optional), or provide a Recommended State for each setting.
This format aims to guide aligning project's configuration with observatory standards and Best Practice, ensuring optimal setup for development and operational needs.

For further insights and a brief overview directly within the platform, you can also refer to the settings section on the GitLab interface.
This can provide practical context and help with navigating the settings in your own projects.


****************
Group Variables
****************

This section discusses the settings for variables that are applicable at the group level.
Group variables are shared across all projects under a group in GitLab, providing a convenient way to manage and apply configurations uniformly.
These variables can significantly streamline the setup of pipelines across multiple projects, ensuring consistency in environmental settings, credentials, and other configurations that are common across the group.

Understanding and correctly configuring these variables is crucial for maintaining efficiency and security at the group level.

**General Settings**
====================

These settings apply to the overall configuration of GitLab groups, impacting the fundamental operations and access controls.
They can be found under any group, for example:
`General Settings <https://gitlab.com/groups/ska-telescope/ska-tmc/-/edit>`__.

.. list-table:: General Settings: Requirements and States
   :widths: 60 15 25
   :header-rows: 1

   * - Setting
     - Requirement
     - State
   * - `Visibility Level <https://docs.gitlab.com/ee/user/public_access.html>`_
     - Mandatory
     - Public
   * - `Members cannot invite groups outside of SKAO and its subgroups <https://gitlab.com/ska-telescope>`_
     - Mandatory
     - Enabled
   * - `Group mentions are disabled <https://gitlab.com/ska-telescope>`_
     - Best Practice
     - Disabled
   * - `Email notifications <https://gitlab.com/ska-telescope>`_
     - Mandatory
     - Disabled
   * - `Wiki <https://docs.gitlab.com/ee/user/public_access.html>`_
     - Mandatory
     - Disabled
   * - `Large File Storage <https://gitlab.com/help/topics/git/lfs/index>`_
     - Mandatory
     - Enabled
   * - `Use GitLab Duo features <https://gitlab.com/help/user/ai_features>`_
     - Best Practice
     - Enabled; Enforce for all subgroups - Disabled
   * - `Roles allowed to create projects <https://docs.gitlab.com/ee/user/public_access.html>`_
     - Mandatory
     - No one
   * - `Roles allowed to create subgroups <https://docs.gitlab.com/ee/user/public_access.html>`_
     - Mandatory
     - Owners
   * - `Users can request access (if visibility is public or internal) <https://gitlab.com/ska-telescope>`_
     - Mandatory
     - Disabled
   * - `Users cannot be added to projects in this group <https://gitlab.com/ska-telescope>`_
     - Mandatory
     - Disabled
   * - `Customer relations is enabled <https://gitlab.com/ska-telescope>`_
     - Mandatory
     - Disabled

**Merge Request Settings**
==========================

These settings are specific to managing and configuring merge requests within GitLab groups, ensuring proper workflow and review processes.
They can be found under any group, for example:
`Merge Request Settings <https://gitlab.com/groups/ska-telescope/ska-tmc/-/settings/merge_requests>`__

.. list-table:: Merge Request Settings: Requirements and States
   :widths: 60 15 25
   :header-rows: 1

   * - Setting
     - Requirement
     - State
   * - `Pipelines must succeed <https://docs.gitlab.com/ee/user/project/merge_requests/>`_
     - Mandatory
     - Enabled
   * - `Skipped pipelines are considered successful <https://docs.gitlab.com/ee/user/project/merge_requests/>`_
     - Mandatory
     - Disabled
   * - `All threads must be resolved <https://docs.gitlab.com/ee/user/project/merge_requests/>`_
     - Best Practice
     - Enabled

**Repository Settings**
=======================

These settings pertain to the configuration and management of repositories in GitLab groups, affecting how code is stored, accessed, and managed.
They can be found under any group, for example:
`Repository Settings <https://gitlab.com/groups/ska-telescope/ska-tmc/-/settings/repository>`__.

.. list-table:: Repository Settings: Requirements and States
   :widths: 60 15 25
   :header-rows: 1

   * - Setting
     - Requirement
     - State
   * - `Initial default branch name <https://docs.gitlab.com/ee/user/project/repository/>`_
     - Mandatory
     - main
   * - `Initial default branch protection <https://docs.gitlab.com/ee/user/project/repository/branches/>`_
     - Mandatory
     - Protected
   * - `Allowed to push to initial branch <https://docs.gitlab.com/ee/topics/git/>`_
     - Best Practice
     - No one
   * - `Allowed to merge to initial branch <https://docs.gitlab.com/ee/topics/git/>`_
     - Best Practice
     - No one
   * - `Allowed to force push <https://gitlab.com/help/topics/git/git_rebase#force-pushing>`_
     - Best Practice
     - Disabled
   * - `Require approval from code owners <https://docs.gitlab.com/ee/topics/git/>`_
     - Best Practice
     - Enabled
   * - `Allow developers to push to the initial commit <https://docs.gitlab.com/ee/topics/git/>`_
     - Best Practice
     - Disabled
   * - `Reject unverified users <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Disabled
   * - `Reject inconsistent user name <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Disabled
   * - `Reject unsigned commits <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Disabled
   * - `Reject commits that aren't DCO certified <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Disabled
   * - `Do not allow users to remove Git tags with git push <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Enabled
   * - `Check whether the commit author is a GitLab user <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Disabled
   * - `Prevent pushing secret files <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Enabled


**CI/CD  Settings**
===================

These settings are specific to managing and configuring CI/CD pipelines within GitLab groups, ensuring consistent and efficient workflows across multiple projects.
They can be found under any group, for example:
`CI/CD Settings <https://gitlab.com/groups/ska-telescope/ska-tmc/-/settings/ci_cd>`__.

.. list-table:: CI/CD Variables: Requirements and States
   :widths: 60 15 25
   :header-rows: 1

   * - Setting
     - Requirement
     - State
   * - `Variables <https://docs.gitlab.com/ee/ci/variables/index.html>`_
     - Mandatory
     - Passwords: Masked
   * - `Enable instance runners for this group <https://docs.gitlab.com/runner/>`_
     - Mandatory
     - Enabled
   * - `Allow projects and subgroups to override the group setting <https://docs.gitlab.com/runner/>`_
     - Mandatory
     - Disabled
   * - `Enable stale runner cleanup <https://gitlab.com/help/ci/runners/configure_runners#view-stale-runner-cleanup-logs>`_
     - Best Practice
     - Enabled
   * - `Allow members of projects and groups to create runners with runner registration tokens <https://docs.gitlab.com/runner/>`_
     - Mandatory
     - Disabled
   * - `Auto DevOps <https://docs.gitlab.com/ee/user/application_security/>`_
     - Mandatory
     - Disabled
   * - `Protected environments <https://docs.gitlab.com/ee/operations/metrics/dashboards.html>`_
     - Mandatory
     - production; Allowed to deploy: Developers


*****************
Project Variables
*****************

This section discusses the variables that are applicable at the project level.
Project variables are specific to each project in GitLab, providing a way to manage and apply configurations tailored to the needs of individual projects.
These variables can significantly streamline the setup of pipelines within a project, ensuring consistency in environmental settings, credentials, and other configurations that are specific to the project.

Understanding and correctly configuring these variables is crucial for maintaining efficiency and security at the project level.

**General Settings**
====================

These settings apply to the overall configuration of GitLab projects, impacting the fundamental operations and access controls.
They can be found under any project, for example:
`General Settings <https://gitlab.com/ska-telescope/developer.skatelescope.org/-/edit>`_ on developer.skatelescope.org.

.. list-table:: General Settings: Requirements and States
   :widths: 60 15 25
   :header-rows: 1

   * - Setting
     - Requirement
     - State
   * - `Visibility Level <https://docs.gitlab.com/ee/user/public_access.html>`_
     - Mandatory
     - Public
   * - `Users can request access <https://gitlab.com/ska-telescope>`_
     - Mandatory
     - Disabled
   * - `Issues <https://docs.gitlab.com/ee/user/project/issues/>`_
     - Mandatory
     - Disabled
   * - `Enable CVE ID requests in the issue sidebar <https://docs.gitlab.com/ee/user/project/issues/#cve-id>`_
     - Best Practice
     - Disabled
   * - `Repository <https://docs.gitlab.com/ee/user/project/repository/>`_
     - Best Practice
     - Everyone with access
   * - `Merge requests <https://docs.gitlab.com/ee/user/project/merge_requests/>`_
     - Best Practice
     - Everyone with access
   * - `Forks <https://docs.gitlab.com/ee/user/project/forks/>`_
     - Best Practice
     - Everyone with access
   * - `Git Large File Storage (LFS) <https://docs.gitlab.com/ee/topics/git/lfs/>`_
     - Best Practice
     - Everyone with access
   * - `CI/CD <https://docs.gitlab.com/ee/ci/>`_
     - Best Practice
     - Everyone with access
   * - `Container registry <https://docs.gitlab.com/ee/user/packages/container_registry/>`_
     - Best Practice
     - Everyone with access
   * - `Analytics <https://docs.gitlab.com/ee/user/analytics/>`_
     - Best Practice
     - Everyone with access
   * - `Requirements <https://docs.gitlab.com/ee/user/requirements/>`_
     - Best Practice
     - Everyone with access
   * - `Security and compliance <https://docs.gitlab.com/ee/user/application_security/>`_
     - Mandatory
     - Only Project Members
   * - `Wiki <https://docs.gitlab.com/ee/user/project/wiki/>`_
     - Best Practice
     - Everyone with access
   * - `Snippets <https://docs.gitlab.com/ee/user/snippets/>`_
     - Best Practice
     - Everyone with access
   * - `Package registry <https://docs.gitlab.com/ee/user/packages/>`_
     - Best Practice
     - Everyone with access
   * - `Model experiments <https://docs.gitlab.com/ee/user/project/ml_experiments/>`_
     - Best Practice
     - Disabled
   * - `Model registry <https://docs.gitlab.com/ee/user/project/ml_model_registry/>`_
     - Best Practice
     - Everyone with access
   * - `Pages <https://docs.gitlab.com/ee/user/project/pages/>`_
     - Best Practice
     - Everyone with access
   * - `Monitor <https://docs.gitlab.com/ee/user/project/operations/#monitor>`_
     - Best Practice
     - Everyone with access
   * - `Environments <https://docs.gitlab.com/ee/ci/environments/>`_
     - Best Practice
     - Everyone with access
   * - `Feature flags <https://docs.gitlab.com/ee/user/project/feature_flags/>`_
     - Best Practice
     - Everyone with access
   * - `Infrastructure <https://docs.gitlab.com/ee/user/project/infrastructure/>`_
     - Best Practice
     - Everyone with access
   * - `Releases <https://docs.gitlab.com/ee/user/project/releases/>`_
     - Best Practice
     - Everyone with access
   * - `Enable email notifications <https://docs.gitlab.com/ee/user/project/settings/#email-notifications>`_
     - Best Practice
     - Enabled
   * - `Include diff previews <https://docs.gitlab.com/ee/user/project/settings/#email-notifications>`_
     - Best Practice
     - Enabled
   * - `Show default emoji reactions <https://docs.gitlab.com/ee/user/project/settings/#emoji-reactions>`_
     - Best Practice
     - Enabled
   * - `Warn about Potentially Unwanted Characters <https://docs.gitlab.com/ee/user/project/settings/#unwanted-characters>`_
     - Best Practice
     - Enabled
   * - `CI/CD Catalog project <https://docs.gitlab.com/ee/user/group/epics/index.html#ci-cd-catalog>`_
     - Best Practice
     - Disabled

**Repository Settings**
=======================

These settings pertain to the configuration and management of repositories in GitLab projects, affecting how code is stored, accessed, and managed.
They can be found under any project, for example:
`CI/CD Settings <https://gitlab.com/ska-telescope/developer.skatelescope.org/-/settings/repository>`_ on developer.skatelescope.org.

.. list-table:: Repository Settings: Requirements and States
   :widths: 60 15 25
   :header-rows: 1

   * - Setting
     - Requirement
     - State
   * - `Initial default branch name <https://docs.gitlab.com/ee/user/project/repository/>`_
     - Mandatory
     - main
   * - `Auto-close referenced issues on default branch <https://gitlab.com/help/user/project/issues/managing_issues#closing-issues-automatically>`_
     - Best Practice
     - Enabled
   * - `Reject unverified users <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Disabled
   * - `Reject inconsistent user name <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Disabled
   * - `Reject unsigned commits <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Disabled
   * - `Reject commits that aren't DCO certified <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Disabled
   * - `Do not allow users to remove Git tags with git push <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Enabled
   * - `Check whether the commit author is a GitLab user <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Disabled
   * - `Prevent pushing secret files <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Enabled
   * - `Protected branches <https://gitlab.com/help/user/project/protected_branches>`_
     - Best Practice
     - Branch: main
       - Allowed to merge: Developers + Maintainers
       - Allowed to push and merge: No one
       - Allowed to force push: Disabled
       - Code owner approval: Disabled

**Merge Request Settings**
==========================

These settings are specific to managing and configuring merge requests within GitLab projects, ensuring proper workflow and review processes.
They can be found under any project, for example:
`CI/CD Settings <https://gitlab.com/ska-telescope/developer.skatelescope.org/-/settings/merge_requests>`_ on developer.skatelescope.org.


.. list-table:: Merge Request Settings: Requirements and States
   :widths: 60 15 25
   :header-rows: 1

   * - Setting
     - Requirement
     - State
   * - `Merge commit <https://docs.gitlab.com/ee/user/project/merge_requests/merge_commit.html>`_
     - Mandatory
     - Enabled
   * - `Enable merged results pipelines <https://docs.gitlab.com/ee/ci/merge_request_pipelines.html>`_
     - Best Practice
     - Enabled
   * - `Enable merge trains <https://docs.gitlab.com/ee/ci/merge_trains.html>`_
     - Best Practice
     - Enabled
   * - `Allow skipping the merge train <https://docs.gitlab.com/ee/ci/merge_trains.html#skipping-the-merge-train>`_
     - Best Practice
     - Disabled
   * - `Automatically resolve merge request diff threads when they become outdated <https://docs.gitlab.com/ee/user/project/merge_requests/diff_threads.html>`_
     - Best Practice
     - Enabled
   * - `Show link to create or view a merge request when pushing from the command line <https://docs.gitlab.com/ee/user/project/merge_requests/command_line.html>`_
     - Best Practice
     - Enabled
   * - `Enable "Delete source branch" option by default <https://docs.gitlab.com/ee/user/project/merge_requests/delete_source_branch.html>`_
     - Mandatory
     - Enabled
   * - `Squash commits when merging <https://docs.gitlab.com/ee/user/project/merge_requests/squash_commits.html>`_
     - Best Practice
     - Do not Allow
   * - `Pipelines must succeed <https://docs.gitlab.com/ee/user/project/merge_requests/pipelines.html>`_
     - Mandatory
     - Enabled
   * - `Skipped pipelines are considered successful <https://docs.gitlab.com/ee/user/project/merge_requests/pipelines.html#skipped-pipelines>`_
     - Mandatory
     - Disabled
   * - `All threads must be resolved <https://docs.gitlab.com/ee/user/project/merge_requests/threads.html>`_
     - Best Practice
     - Enabled
   * - `Status checks must succeed <https://docs.gitlab.com/ee/user/project/merge_requests/status_checks.html>`_
     - Mandatory
     - Enabled
   * - `Require an associated issue from Jira <https://docs.gitlab.com/ee/integration/jira/issues.html>`_
     - Best Practice
     - Enabled
   * - `Status checks <https://docs.gitlab.com/ee/user/project/merge_requests/status_checks.html>`_
     - Mandatory
     - Service name: Marvin
       - API: [please-look-at-failures-in-marvin-table-below](https://please-look-at-failures-in-marvin-table-below.dummy-url.status)
       - Target branches: All branches
   * - `Prevent approvals by users who add commits <https://gitlab.com/help/user/project/merge_requests/approvals/settings>`_
     - Best Practice
     - Enabled
   * - `Prevent editing approval rules in merge requests <https://gitlab.com/help/user/project/merge_requests/approvals/settings>`_
     - Best Practice
     - Enabled
   * - `Require user re-authentication (password or SAML) to approve <https://gitlab.com/help/user/project/merge_requests/approvals/settings>`_
     - Best Practice
     - Disabled
   * - `Enable suggested reviewers <https://gitlab.com/help/user/project/merge_requests/reviews/index>`_
     - Best Practice
     - Enabled

**CI/CD Settings**
==================

These settings are specific to managing and configuring CI/CD pipelines within individual GitLab projects.
They allow for tailored automation, build, and deployment processes that meet the specific needs of each project, while still adhering to broader observatory standards and Best Practice.
These settings can be found under any project, for example:
`CI/CD Settings <https://gitlab.com/ska-telescope/developer.skatelescope.org/-/settings/ci_cd>`_ on developer.skatelescope.org.

.. list-table:: CI/CD Settings: Requirements, States, and Defaults
   :widths: 45 15 20 20
   :header-rows: 1

   * - Setting
     - Requirement
     - SKAO Required State
     - Gitlab Default State

   * - **Mandatory Settings**
     - 
     - 
     -

   * - `Public Pipelines <https://docs.gitlab.com/ee/ci/pipelines/settings.html#change-which-users-can-view-your-pipelines>`_
     - Mandatory
     - Enabled
     - Enabled

   * - `Auto-cancel Redundant Pipelines <https://docs.gitlab.com/ee/ci/pipelines/settings.html#prevent-outdated-deployment-jobs>`_
     - Mandatory
     - Enabled
     - Enabled

   * - `CI/CD Configuration File <https://docs.gitlab.com/ee/ci/pipelines/settings.html#specify-a-custom-cicd-configuration-file>`_
     - Mandatory
     - Default
     - Default

   * - `Git Strategy <https://docs.gitlab.com/ee/ci/pipelines/settings.html#choose-the-default-git-strategy>`_
     - Mandatory
     - git fetch
     - git fetch

   * - `Default to Auto DevOps pipeline <https://docs.gitlab.com/ee/topics/autodevops/stages.html#auto-devops-base>`_
     - Mandatory
     - Disabled
     - Disabled

   * - `Protected Environments <https://docs.gitlab.com/ee/ci/environments/deployment_approvals.html>`_
     - Mandatory
     - production; Allowed to deploy: Developers 
     - Disabled

   * - `Keep artifacts from most recent successful jobs <https://gitlab.com/help/ci/jobs/job_artifacts#keep-artifacts-from-most-recent-successful-jobs>`_
     - Mandatory
     - Enabled
     - Enabled

   * - `Variables <https://docs.gitlab.com/ee/ci/variables/index.html>`_
     - Mandatory
     - Passwords: Masked
     - Disabled

   * - `Job token permissions <https://gitlab.com/help/ci/jobs/ci_job_token#control-job-token-access-to-your-project>`_
     - Mandatory
     - Only this project and any groups and projects in the allowlist
     - Only this project and any groups and projects in the allowlist

   * - **Best Practice Settings**
     - 
     - 
     -

   * - `Prevent Outdated Deployment Jobs <https://docs.gitlab.com/ee/ci/pipelines/settings.html#prevent-outdated-deployment-jobs>`_
     - Best Practice
     - Enabled
     - Enabled

   * - `Allow job retries for rollback deployments <https://gitlab.com/help/ci/environments/deployment_safety#job-retries-for-rollback-deployments>`_
     - Best Practice
     - Enabled
     - Enabled

   * - `Use Separate Caches for Protected Branches <https://docs.gitlab.com/ee/ci/caching/index.html#cache-key-names>`_
     - Best Practice
     - Enabled
     - Enabled

   * - `Minimum Role Required to Cancel a Pipeline or Job <https://docs.gitlab.com/ee/ci/pipelines/settings.html#set-minimum-role-required-to-cancel-a-pipeline-or-job>`_
     - Best Practice
     - Developer
     - Developer

   * - `Git Shallow Clone <https://docs.gitlab.com/ee/ci/pipelines/settings.html#limit-the-number-of-changes-fetched-during-clone>`_
     - Best Practice
     - 50
     - 20

   * - `Timeout <https://docs.gitlab.com/ee/ci/pipelines/settings.html#set-a-limit-for-how-long-jobs-can-run>`_
     - Best Practice
     - 2h
     - 1h

   * - `Runners <https://docs.gitlab.com/runner/>`_
     - Best Practice
     - Instance and Group runners enabled
     - Instance and Group runners enabled

   * - `Pipeline trigger tokens <https://gitlab.com/help/ci/triggers/index>`_
     - Best Practice
     - Empty
     - Empty

   * - `Enable automatic rollbacks  <https://gitlab.com/help/ci/environments/index#auto-rollback>`_
     - Best Practice
     - Disabled
     - Disabled

   * - `Deploy freezes  <https://gitlab.com/help/user/project/releases/index#prevent-unintentional-releases-by-setting-a-deploy-freeze>`_
     - Best Practice
     - Disabled
     - Disabled
