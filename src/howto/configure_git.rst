.. _configure-git:

Git Configuration
=================

.. _git-use-institutional-email:

Set Git institutional email address
+++++++++++++++++++++++++++++++++++

Set up Git so that it uses your institutional email account to sign commits,
this can be done in your global Git configuration:

.. code:: bash

  $ git config --global user.email "your@institutional.email"


Or you can configure the mail address on a project basis.

.. code:: bash

  $ cd your/git/project
  $ git config user.email "your@institutional.email"

.. _git-signing-commits:

Signing commits with GPG
++++++++++++++++++++++++

Developers are strongly encouraged to use a GPG key to sign Git commits.
The procedure for obtaining a GPG key and uploading it to the GitLab account is described at
https://docs.gitlab.com/ee/user/project/repository/gpg_signed_commits/, or go straight to uploading at https://gitlab.com/-/profile/gpg_keys.


The only difference from a non signed commit is the addition of the -S flag:

.. code:: bash

  $ git commit -S -m "My commit msg"

The passphrase of your GPG key will then be asked. To avoid having to type the -S flag every time a commit is made, Git can be configured to sign commits automatically:

.. code:: bash

  $ git config --global commit.gpgsign true


When working in a remote repository by ssh connection, you need to create new GPG key and add it as explained above or you can forward your existing gpg key to the remote machine following the instructions below.
This is known as `agent forwarding <https://wiki.gnupg.org/AgentForwarding>`__.

* Find your local socket: :code:`gpgconf --list-dir agent-extra-socket`
* Find your remote socket: :code:`gpgconf --list-dir agent-socket`
* Configure your SSH configuration file by adding the following line after your host settings: :code:`RemoteForward <socket_on_remote_box>  <extra_socket_on_local_box>`. Note that you need to reconnect to the remote machine to apply the changes.
* Add :code:`StreamLocalBindUnlink yes` into :code:`/etc/ssh/sshd_config` in the remote machine and restart the sshd service to close the gpg forwarding socket when closing the ssh connection.
