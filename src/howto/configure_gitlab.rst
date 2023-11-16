GitLab Configuration
====================================

The SKA Software team have adopted the GitLab social coding platform as the main Git repository manager for its CI/CD tools.

The following describes how to access the service, and how to setup the basic working environment to integrate with GitLab for the SKA.

.. _git-use-institutional-email:

Use institutional email
+++++++++++++++++++++++

Create a GitLab account using your **institutional email** address at https://gitlab.com/. If you already have an account on
GitLab, you should have your institutional email added to your profile. You can do this at https://gitlab.com/-/profile/emails and clicking the *Add new email* button.

It is recommended that 2FA (two-factor authentication) is enabled. There are a variety of OTP (One Time Pin) applications available for mobile phones with instructions available:
https://docs.gitlab.com/ee/user/profile/account/two_factor_authentication.html.

Setup SSH key
+++++++++++++

To enable `git+ssh` based authentication for clients, associate your ssh-key to your user at (https://gitlab.com/-/profile/keys).

SKA Organization
++++++++++++++++

SKA Organization can be found on GitLab at https://gitlab.com/ska-telescope.

Send a request in the System Team Support Center at https://jira.skatelescope.org/servicedesk/customer/portal/166 to link your account to the SKA Gitlab group.

Code Snippets
+++++++++++++

You can share code snippets (code blocks) within the SKA Organization using the *ska-snippets* repository, and also you can always share code snippets with the project members using project level snippets *(If they are enabled)*
