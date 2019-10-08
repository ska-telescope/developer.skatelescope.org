=====================================
Transition your GitHub Repo to GitLab
=====================================

The SKA Software team decided to move from GitHub to the GitLab platform
as the main git-repository manager for its CI/CD tools. 
This page is a simple walk-through of all the steps you have to do for this switch.

Create GitLab Account
=====================

The fist step is the more obvious and the simplest one. You just have to go to https://gitlab.com/users/sign_in
in your favorite browser and create a new account. For that, you have two main options: 

1. Create an account with an email of your choice;
2. Sign in with GitHub Credentials to automatically have the same account information on the new profile. (Recommended)


Developers
===========

In the local development you must update the git files of each project to the new GitLab repository.
Therefore, you only have to write this in the terminal inside the project directory:

.. code:: bash

  $ git remote set-url origin https://gitlab.com/ska-telescope/*project*.git

To check if everything went smoothly, type the command below and check if the both links 
are the same as the GitLab repo link that you just typed.

.. code:: bash

  $ git remote -v

And it's done! You can now do everything that you are authorized to do on this GitLab repository.

Project Owners
==================

Create GitLab Project
---------------------------

*insert here Create Repository doc page link of Adriaan*

Mirror Repository
-----------------

.. _figure-1-person-token:

.. figure:: github_personal_token_2.png
   :scale: 40%
   :alt: GitHub Personal Token
   :align: center
   :figclass: figborder


   Get GitHub Personal Token.

.. _figure-2-mirror-setup:

.. figure:: gitlab-setup-mirror.png
   :scale: 40%
   :alt: GitLab Mirror Setup
   :align: center
   :figclass: figborder


   The GitLab mirror setup.

.. _figure-2-mirror-dashboard:

.. figure:: gitlab-mirror-successful.png
   :scale: 40%
   :alt: GitLab Mirror Dashboard
   :align: center
   :figclass: figborder


   GitLab Mirror Dashboard.


Create token
Get username, group ID and project ID
gitlab settings > repository > https://<your_github_username>@github.com/<your_github_group>/<your_github_project>.git.

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


Differences Between GitHub and GitLab
--------------------------------------

Since both GitHub and GitLab are built on top of Git, there are very few differences between the two systems. The first obvious difference is that GitLab has merge requests instead of pull requests. The function is pretty much identical, and the UI is pretty similar. GitLab provide an extensive tutorial on `merge requests
<https://docs.gitlab.com/ee/user/project/merge_requests/>`_.

The other major difference is that GitLab provides automatic `Continuous Integration Pipelines
<https://docs.gitlab.com/ee/ci/>`_. If you have already used Jenkins, you'll find it pretty similar. There is an `SKA guide to CI <../continuousintegration.html>`_.
