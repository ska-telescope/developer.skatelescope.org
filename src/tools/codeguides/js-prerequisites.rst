Prerequisites
=============

As a member of the SKAO, most of the standard requirements as a developer should already be covered via the `SKAO onboarding
process`_.  

.. _`SKAO onboarding process`: https://developer.skao.int/en/latest/getting-started/onboarding.html

As a JS developer you will need the following:

Account on gitlab
-----------------

This is done via https://gitlab.com/ where the standard sign up processes is completed and then passed 
to the System team in preparation for the next section

Access to the SKA gitlab account
--------------------------------

[https://gitlab.com/ska-telescope]

A request to submitted to the System team who will provide standard access

Access to git 
-------------

This should be appropriate for the OS in use, for example Git Bash for Windows [https://gitforwindows.org/]

.. tip:: Development OS

   Development within a Unix environment is recommended due to the need to be able to access and run 
   Python applications locally during development.  For Windows uses, this can be done via the use of WSL2

Access to node 
--------------

[https://nodejs.org/en/download/]

Alternatively the official Node docker image can be used. Instructions can be found on 
(https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image).

To confirm that node has been installed correctly run the following command from the prompt.

``node –-version``

.. tip:: NVM

   Version manager for node.js, designed to be installed per-user, and invoked per-shell. nvm works on 
   any POSIX-compliant shell (sh, dash, ksh, zsh, bash), in particular on these platforms: unix, macOS, and windows WSL.
   https://github.com/nvm-sh/nvm

Access to a package manager
---------------------------

Currently the SKAO recommends yarn for use.  Existing applications using npm are being replaced over time

[https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable]

To confirm that yarn has been installed correctly run the following command from the prompt.

``yarn –-version``