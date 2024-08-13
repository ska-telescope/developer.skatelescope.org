.. _committing-code:

Committing code
===============

When working on a development project, it is important to stick to these simple
commit rules:

* Work in feature branches where possible (see :ref:`branching-policy`)
* Commit early, commit often.
* Don't Commit Half-Done Work
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

Squashing commits
+++++++++++++++++

If you want to replace a series of small commits with a single commit or if you want to make their order more logical you can use an interactive rebase (git rebase -i) to squash multiple commits into one or reorder them. When squashing commits it is important to consider the following:

* Never rebase commits that have been pushed to a remote server.
* Never rebase commits authored by other people.

In general the squashing of commits is discouraged for SKA repositories.
