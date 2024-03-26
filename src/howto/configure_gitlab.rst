.. _configure-gitlab:

GitLab Configuration
====================================

The SKA Software team have adopted the GitLab social coding platform as the main Git repository manager for its CI/CD tools.

The following describes how to access the service, and how to set up the basic working environment to integrate with GitLab for the SKA.


SKA Observatory Repositories
++++++++++++++++++++++++++++

SKA Observatory can be found on GitLab at https://gitlab.com/ska-telescope.

Send a request in the System Team Support Center at https://jira.skatelescope.org/servicedesk/customer/portal/166 to link your account to the SKA Gitlab group.

Code Snippets
+++++++++++++

You can share code snippets (code blocks) within the SKA Observatory using the *ska-snippets* repository, and also you can always share code snippets with the project members using project level snippets *(If they are enabled)*

.. _gitlab-use-institutional-email:

Use institutional email
+++++++++++++++++++++++

Create a GitLab account using your **institutional email** address at https://gitlab.com/. If you already have an account on
GitLab, you should have your institutional email added to your profile. You can do this at https://gitlab.com/-/profile/emails and clicking the *Add new email* button.

It is recommended that 2FA (two-factor authentication) is enabled. See `Set up 2FA authentication`_ section for more details with instructions.

Set up SSH key
++++++++++++++

To enable `git+ssh` based authentication for clients, associate your ssh-key to your user at (https://gitlab.com/-/profile/keys).

Set up 2FA authentication
+++++++++++++++++++++++++

2FA (Two Factor Authentication) is a security feature that adds an extra layer of protection to your GitLab account. It requires you to enter a second piece of information (a pin code) in addition to your password when you log in. It's required by every SKAO GitLab user.

.. note:: 
    Follow the upstream Gitlab documentation to get the latest integration instructions here: https://docs.gitlab.com/ee/user/profile/account/two_factor_authentication.html

Prerequisites
-------------

The SKAO IT's recommended Authenticator is `Google Authenticator`_ as this can work seamlessly in locations where your mobile device has no mobile or network connectivity. 

The `Microsoft Authenticator`_ is also supported but by default this uses push notifications for Microsoft/Azure authentication, which will not work if your device has no mobile or network connectivity.

Alternatively, you can use `Aegis Authenticator`_, which is an open-source alternative with in-place encryiption to Google Authenticator and Microsoft Authenticator.

Both of the Google and Microsoft mobile apps are automatically installed on all SKAO iPhones and iPads.
To Setup and use Google Authenticator (preferred option), follow the guidance in this link: `Google Authenticator`_

.. note::
    *`Google Authenticator`_ has the option to sync your MFA codes to your Google Account - this is a security risk and should not be enabled. Make sure that sync is not turned on (cloud with a line through it, shown below) tapping on the icon turns this feature on or off.*

Steps
-----

Then, you can follow the below steps to enable 2FA on your GitLab account:


1. In GitLab:
    a. Access your `User settings <https://gitlab.com/user/settings>`__.
    b. Select Account.
    c. Select Enable Two-factor Authentication.

2. On your device (usually your phone):
    a. Install a compatible application as described above.
    b. In the application, add a new entry in one of two ways:
        - Scan the code displayed by GitLab with your device’s camera to add the entry automatically.
        - Enter the details provided to add the entry manually.

3. In GitLab:
    a. Enter the six-digit pin number from the entry on your device into Pin code.
    b. Enter your current password.
    c. Select Submit.

If you entered the correct pin, GitLab displays a list of recovery codes. Download them and keep them in a safe place.

.. important::
    **Please make sure to back up your recovery codes in a safe place. If you lose them, you won't be get access until a gitlab admin can reset it.**

    SKAO does not have the ability to reset your MFA codes as they are attached to gitlab.com itself.

Committing with 2FA enabled
+++++++++++++++++++++++++++

When 2FA is enabled, you can’t use your password to authenticate with Git over HTTPS or the GitLab API. You can use your SSH Key (as described in the `Set up SSH key`_ section) as the preferred method or a `personal access token <https://gitlab.com/profile/personal_access_tokens>`__ instead.

You can find more integration instructions for Personal Access Tokens `here <https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html>`__ such as `Git Credential Manager <https://gitcredentialmanager.com>`__ or  `Git Credential Oauth <https://git-credential-oauth.com>`__.

.. _Google Authenticator: https://google.com/authenticator
.. _Microsoft Authenticator: https://microsoft.com/authenticator
.. _Aegis Authenticator: https://getaegis.app/

Switching Git Repository to SSH
-------------------------------

To switch your Git repository to SSH, you need to update the remote URL of your repository. You can do this by running the following command in your terminal:

TL:DR; run the below command to switch your repository to from HTTPS to SSH:

.. code-block:: bash
    
    git remote set-url origin $(git remote get-url origin | sed -e 's/https:\/\/\(.*\)@\(.*\)\//git@\2:/' -e 's/https:\/\//git@/' -e 's/\/\//\//') && git remote -v

Steps:

1. List your current remote URL. `origin` is the default name for the remote repository but you may have something else so replace `origin` with the name of your remote repository in  further steps.

.. code-block:: bash

    $ git remote -v
    > origin  https://gitlab.com/ska-telescope/ska-snippets.git (fetch)
    > origin  https://gitlab.com/ska-telescope/ska-snippets.git (push)

2. Change the remote URL to the SSH URL. 

.. code-block:: bash

    $ git remote set-url origin git@gitlab.com/ska-telescope/ska-snippets.git

3. Verify that the remote URL has been updated:

.. code-block:: bash

    $ git remote -v
    > origin git@gitlab.com/ska-telescope/ska-snippets.git (fetch)
    > origin git@gitlab.com/ska-telescope/ska-snippets.git (push)
