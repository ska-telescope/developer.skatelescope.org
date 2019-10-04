=====================================
Transition your Github Repo to Gitlab
=====================================

Create Gitlab Account
=====================

..
  gitlab.com > create account

Project Members
===================

In the local development you must update the git files of each project to the new Gitlab repository.
Therefore, you only have to write this in the terminal inside the project directory:

.. code:: bash

  $ git remote set-url https://gitlab.com/ska-telescope/*project*.git


Project Owners
==================

Create Gitlab Project
---------------------------

  
..
  gitlab.com > new project >  import project > github > login > select the project you want to import


Mirror Repository
-----------------

..
  For an existing project, you can set up push mirroring as follows:

  Navigate to your project’s Settings > Repository and expand the Mirroring repositories section.
  Enter a repository URL.
  Select Push from the Mirror direction dropdown.
  Select an authentication method from the Authentication method dropdown, if necessary.
  Check the Only mirror protected branches box, if necessary.
  Click the Mirror repository button to save the configuration.
.. 
  Setting up a push mirror from GitLab to GitHub
  To set up a mirror from GitLab to GitHub, you need to follow these steps:

  Create a GitHub personal access token with the public_repo box checked.
  Fill in the Git repository URL field using this format: https://<your_github_username>@github.com/<your_github_group>/<your_github_project>.git.
  Fill in Password field with your GitHub personal access token.
  Click the Mirror repository button.
  The mirrored repository will be listed. For example, https://*****:*****@github.com/<your_github_group>/<your_github_project>.git.

  The repository will push soon. To force a push, click the appropriate button.

Read-Only GitHub Project
---------------------------

 ..
  https://help.github.com/en/articles/repository-permission-levels-for-an-organization

  
Local Development
------------------

In the local development you must update the git files of each project to the new Gitlab repository.
Therefore, you only have to write this in the terminal inside the project directory:

.. code:: bash

  $ git remote set-url https://gitlab.com/ska-telescope/*project*.git

Differences Between GitHub and GitLab
--------------------------------------

Since both GitHub and GitLab are built on top of Git, there are very few differences between the stwo systems. The first obvious difference is that GitLab has merge requests instead of pull requests. The function is pretty much identical, and the UI is pretty similar. GitLab provide an extensive tutorial on `merge requests
<https://docs.gitlab.com/ee/user/project/merge_requests/>`_.

The other major difference is that GitLab provides automatic `Continuous Integration Pipelines
<https://docs.gitlab.com/ee/ci/>`_. If you have already used Jenkins, you'll find it pretty similar. There is an SKA guide to CI_.

.. _continuousintegration:
