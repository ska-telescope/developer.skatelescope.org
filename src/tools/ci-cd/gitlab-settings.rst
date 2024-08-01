.. _gitlab-settings:

***********************
GitLab Settings
***********************

This section provides an overview of configurable settings within the GitLab for groups and projects.
These settings allow to tailor project and group-level behaviours, optimise pipeline performance, manage security protocols and enhance software development processes.

The following tables categorise settings as either **Mandatory** (Non-Negotiable), **Best Practice** (Optional), or provide a **Recommended State** for each setting.
This format aims to guide the alignment of project's configuration with SKAO standards and best practices, ensuring optimal setup for development and operational needs.

All other settings not presented here as Mandatory are considered "Optional" and are pre-configured to align with SKAO principles as Best Practice.
This ensures that even default configurations adhere to our standards, simplifying the setup process and maintaining consistency across projects and groups.

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

.. list-table:: General Settings: Requirements, States, and Defaults
   :widths: 45 15 20 20
   :header-rows: 1

   * - Setting
     - Requirement
     - SKAO Required State
     - Default State

   * - **Mandatory Settings**
     - 
     - 
     -

   * - `Visibility Level <https://docs.gitlab.com/ee/user/public_access.html>`_
     - Mandatory
     - Public
     - Public

   * - `Members cannot invite groups outside of SKAO and its subgroups <https://gitlab.com/ska-telescope>`_
     - Mandatory
     - Enabled
     - Enabled

   * - `Email notifications <https://gitlab.com/ska-telescope>`_
     - Mandatory
     - Disabled
     - Enabled

   * - `Wiki <https://docs.gitlab.com/ee/user/public_access.html>`_
     - Mandatory
     - Disabled
     - Enabled

   * - `Large File Storage <https://gitlab.com/help/topics/git/lfs/index>`_
     - Mandatory
     - Enabled
     - Enabled

   * - `Roles allowed to create projects <https://docs.gitlab.com/ee/user/public_access.html>`_
     - Mandatory
     - No one
     - No one

   * - `Roles allowed to create subgroups <https://docs.gitlab.com/ee/user/public_access.html>`_
     - Mandatory
     - Owners
     - Owners

   * - `Users can request access (if visibility is public or internal) <https://gitlab.com/ska-telescope>`_
     - Mandatory
     - Disabled
     - Disabled

   * - `Users cannot be added to projects in this group <https://gitlab.com/ska-telescope>`_
     - Mandatory
     - Disabled
     - Disabled

   * - `Customer relations is enabled <https://gitlab.com/ska-telescope>`_
     - Mandatory
     - Disabled
     - Disabled

**Merge Request Settings**
==========================

These settings are specific to managing and configuring merge requests within GitLab groups, ensuring proper workflow and review processes.

.. list-table:: Merge Request Settings: Requirements, States, and Defaults
   :widths: 45 15 20 20
   :header-rows: 1

   * - Setting
     - Requirement
     - SKAO Required State
     - Default State

   * - **Mandatory Settings**
     - 
     - 
     -

   * - `Pipelines must succeed <https://docs.gitlab.com/ee/user/project/merge_requests/>`_
     - Mandatory
     - Enabled
     - Disabled

   * - `Skipped pipelines are considered successful <https://docs.gitlab.com/ee/user/project/merge_requests/>`_
     - Mandatory
     - Disabled
     - Disabled

   * - **Best Practice Settings**
     - 
     - 
     -

   * - `All threads must be resolved <https://docs.gitlab.com/ee/user/project/merge_requests/>`_
     - Best Practice
     - Enabled
     - Disabled

**Repository Settings**
=======================

These settings pertain to the configuration and management of repositories in GitLab groups, affecting how code is stored, accessed, and managed.

.. list-table:: Repository Settings: Requirements, States, and Defaults
   :widths: 45 15 20 20
   :header-rows: 1

   * - Setting
     - Requirement
     - SKAO Required State
     - Default State

   * - **Mandatory Settings**
     - 
     - 
     -

   * - `Initial default branch name <https://docs.gitlab.com/ee/user/project/repository/>`_
     - Mandatory
     - main
     - main

   * - `Initial default branch protection <https://docs.gitlab.com/ee/user/project/repository/branches/>`_
     - Mandatory
     - Protected
     - Protected

   * - **Best Practice Settings**
     - 
     - 
     -

   * - `Allowed to push to initial branch <https://docs.gitlab.com/ee/topics/git/>`_
     - Best Practice
     - No one
     - Maintainers

   * - `Allowed to force push <https://gitlab.com/help/topics/git/git_rebase#force-pushing>`_
     - Best Practice
     - Disabled
     - Disabled

   * - `Require approval from code owners <https://docs.gitlab.com/ee/topics/git/>`_
     - Best Practice
     - Enabled
     - Disabled

   * - `Allow developers to push to the initial commit <https://docs.gitlab.com/ee/topics/git/>`_
     - Best Practice
     - Disabled
     - Disabled

   * - `Do not allow users to remove Git tags with git push <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Enabled
     - Disabled

**CI/CD  Settings**
===================

These settings are specific to managing and configuring CI/CD pipelines within GitLab groups, ensuring consistent and efficient workflows across multiple projects.

.. list-table:: CI/CD Variables: Requirements, States, and Defaults
   :widths: 45 15 20 20
   :header-rows: 1

   * - Setting
     - Requirement
     - SKAO Required State
     - Default State

   * - **Mandatory Settings**
     - 
     - 
     -

   * - `Variables <https://docs.gitlab.com/ee/ci/variables/index.html>`_
     - Mandatory
     - Passwords: Masked
     - Disabled

   * - `Enable instance runners for this group <https://docs.gitlab.com/runner/>`_
     - Mandatory
     - Enabled
     - Enabled

   * - `Allow projects and subgroups to override the group setting <https://docs.gitlab.com/runner/>`_
     - Mandatory
     - Disabled
     - Disabled

   * - `Auto DevOps <https://docs.gitlab.com/ee/user/application_security/>`_
     - Mandatory
     - Disabled
     - Disabled

   * - **Best Practice Settings**
     - 
     - 
     -

   * - `Protected environments <https://gitlab.com/help/ci/environments/deployment_approvals>`_
     - Best Practice
     - production; Allowed to deploy: Maintainers
     - Disabled

   * - `Enable stale runner cleanup <https://gitlab.com/help/ci/runners/configure_runners#view-stale-runner-cleanup-logs>`_
     - Best Practice
     - Enabled
     - Disabled


*****************
Project Variables
*****************

Project variables are specific to each project in GitLab, providing a way to manage and apply configurations tailored to the needs of individual projects.
These variables can significantly streamline the setup of pipelines within a project, ensuring consistency in environmental settings, credentials, and other configurations that are specific to the project.

Understanding and correctly configuring these variables is crucial for maintaining efficiency and security at the project level.

**General Settings**
====================

These settings apply to the overall configuration of GitLab projects, impacting the fundamental operations and access controls.

.. list-table:: General Settings: Requirements, States, and Defaults
   :widths: 45 15 20 20
   :header-rows: 1

   * - Setting
     - Requirement
     - SKAO Required State
     - Default State

   * - **Mandatory Settings**
     - 
     - 
     -

   * - `Visibility Level <https://docs.gitlab.com/ee/user/public_access.html>`_
     - Mandatory
     - Public
     - Public

   * - `Users can request access <https://gitlab.com/ska-telescope>`_
     - Mandatory
     - Disabled
     - Disabled

   * - `Issues <https://docs.gitlab.com/ee/user/project/issues/>`_
     - Mandatory
     - Disabled
     - Disabled

   * - `Security and compliance <https://docs.gitlab.com/ee/user/application_security/>`_
     - Mandatory
     - Only Project Members
     - Only Project Members

   * - **Best Practice Settings**
     - 
     - 
     -

   * - `Enable CVE ID requests in the issue sidebar <https://docs.gitlab.com/ee/user/project/issues/#cve-id>`_
     - Best Practice
     - Disabled
     - Enabled

   * - `Model experiments <https://docs.gitlab.com/ee/user/project/ml_experiments/>`_
     - Best Practice
     - Disabled
     - Enabled

**Repository Settings**
=======================

These settings pertain to the configuration and management of the repository, affecting how code is stored, accessed, and managed.

.. list-table:: Repository Settings: Requirements, States, and Defaults
   :widths: 45 15 20 20
   :header-rows: 1

   * - Setting
     - Requirement
     - SKAO Required State
     - Default State

   * - **Mandatory Settings**
     - 
     - 
     -

   * - `Initial default branch name <https://docs.gitlab.com/ee/user/project/repository/>`_
     - Mandatory
     - main
     - main

   * - **Best Practice Settings**
     - 
     - 
     -

   * - `Do not allow users to remove Git tags with git push <https://docs.gitlab.com/ee/user/project/repository>`_
     - Best Practice
     - Enabled
     - Disabled

**Merge Request Settings**
==========================

These settings are specific to managing and configuring merge requests within GitLab projects, ensuring proper workflow and review processes.

.. list-table:: Merge Request Settings: Requirements and States
   :widths: 45 15 20 20
   :header-rows: 1

   * - Setting
     - Requirement
     - SKAO Required State
     - Default State

   * - **Mandatory Settings**
     - 
     - 
     -

   * - `Merge commit <https://docs.gitlab.com/ee/user/project/merge_requests/merge_commit.html>`_
     - Mandatory
     - Enabled
     - Enabled

   * - `Squash commits when merging <https://docs.gitlab.com/ee/user/project/merge_requests/squash_commits.html>`_
     - Mandatory
     - Do not Allow
     - Allow

   * - `Enable "Delete source branch" option by default <https://docs.gitlab.com/ee/user/project/merge_requests/delete_source_branch.html>`_
     - Mandatory
     - Enabled
     - Enabled

   * - `Pipelines must succeed <https://docs.gitlab.com/ee/user/project/merge_requests/pipelines.html>`_
     - Mandatory
     - Enabled
     - Enabled

   * - `Skipped pipelines are considered successful <https://docs.gitlab.com/ee/user/project/merge_requests/pipelines.html#skipped-pipelines>`_
     - Mandatory
     - Disabled
     - Disabled

   * - `Prevent editing approval rules in merge requests <https://gitlab.com/help/user/project/merge_requests/approvals/settings>`_
     - Mandatory
     - Enabled
     - Disabled

   * - `Status checks must succeed <https://docs.gitlab.com/ee/user/project/merge_requests/status_checks.html>`_
     - Mandatory
     - Enabled
     - Enabled

   * - `Status checks <https://docs.gitlab.com/ee/user/project/merge_requests/status_checks.html>`_
     - Mandatory
     - Service name: Marvin
     - Service name: Marvin

   * - **Best Practice Settings**
     - 
     - 
     -

   * - `Automatically resolve merge request diff threads when they become outdated <https://docs.gitlab.com/ee/user/project/merge_requests/diff_threads.html>`_
     - Mandatory
     - Enabled
     - Disabled

   * - `Show link to create or view a merge request when pushing from the command line <https://docs.gitlab.com/ee/user/project/merge_requests/command_line.html>`_
     - Best Practice
     - Enabled
     - Enabled

   * - `All threads must be resolved <https://docs.gitlab.com/ee/user/project/merge_requests/threads.html>`_
     - Best Practice
     - Enabled
     - Enabled

   * - `Require an associated issue from Jira <https://docs.gitlab.com/ee/integration/jira/issues.html>`_
     - Best Practice
     - Enabled
     - Disabled

   * - `Prevent approvals by users who add commits <https://gitlab.com/help/user/project/merge_requests/approvals/settings>`_
     - Best Practice
     - Enabled
     - Disabled

   * - `Enable suggested reviewers <https://gitlab.com/help/user/project/merge_requests/reviews/index>`_
     - Best Practice
     - Enabled
     - Disabled

**CI/CD Settings**
==================

These settings are specific to managing and configuring CI/CD pipelines within individual GitLab projects.

.. list-table:: CI/CD Settings: Requirements, States, and Defaults
   :widths: 45 15 20 20
   :header-rows: 1

   * - Setting
     - Requirement
     - SKAO Required State
     - Default State

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

   * - `Protected environments <https://gitlab.com/help/ci/environments/deployment_approvals>`_
     - Best Practice
     - production; Allowed to deploy: Maintainers
     - Disabled

   * - `Git Shallow Clone <https://docs.gitlab.com/ee/ci/pipelines/settings.html#limit-the-number-of-changes-fetched-during-clone>`_
     - Best Practice
     - 50
     - 20

   * - `Timeout <https://docs.gitlab.com/ee/ci/pipelines/settings.html#set-a-limit-for-how-long-jobs-can-run>`_
     - Best Practice
     - 2h
     - 1h
