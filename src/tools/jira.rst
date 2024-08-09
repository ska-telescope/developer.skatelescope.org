Working with Jira
=================

.. todo::
   - Add info about Jira, ticket types, workflows etc.

GitLab to Jira Integration
--------------------------

If you mention a Jira Issue ID in a GitLab commit message or merge request (MR), the following happens:

- GitLab hyperlinks the issue for easy navigation
- The Jira issue gets an issue link to the commit/MR
- The Jira issue receives a comment reflecting the GitLab comment, author, and a link to the commit/MR (if enabled)

  *Example Commit Message:* `SKA-34 added gitlab-jira integration`


If you mention that **a commit or MR ‘closes’, ‘resolves’, or ‘fixes’ a Jira issue ID**, then:

- GitLab’s merge request page displays a note that it “Closed” the Jira issue, with a link to the issue. 
- Before the merge, an MR will display that it "Closes" the Jira issue
- The Jira issue transitions to ``READY FOR ACCEPTANCE`` status (if applicable)

  *Example Commit Message:* ``SKA-34 closes``

Additionally, you can:
 
- Add comments to Jira issues
- Track time
- Transition Jira issue states directly from GitLab commits
 
Learn more about these features in `Jira Smart Commits`_.

*More info could be found at* |gitlab-jira-integration-link|_

Jira to GitLab Integration
--------------------------

A Development Panel is automatically added to any Jira issue that is referred to
by its ID in:

-  Branch names

-  Commit messages

-  Merge request titles in Gitlab

Inside the Jira issue, you will be able to see the linked ``branches``,
``commits``, and ``merge requests``(called "pull requests" in Jira)
 
This integration allows for easy tracking and visibility of GitLab development work related to specific Jira issues.


.. _figure-1-jira-dev-panel:

.. figure:: images/jira-dev-panel.png
   :scale: 60%
   :alt: Example Jira Development Panel, on the right of the usual issue screen, showing the number of branches, commits and pull requests (with status)
   :align: center
   :figclass: figborder

   Jira Development Panel.

*More info could be found at* |jira-development-panel-link|_

.. _gitlab-jira-integration-link: https://docs.gitlab.com/ee/user/project/integrations/jira.html
.. |gitlab-jira-integration-link| replace:: *GitLab to Jira Integration*
.. _Jira Smart Commits: https://confluence.atlassian.com/fisheye/using-smart-commits-960155400.html
.. _disabled: https://docs.gitlab.com/ee/user/project/integrations/jira.html#disabling-comments-on-jira-issues
.. _jira-development-panel-link: https://docs.gitlab.com/ee/integration/jira_development_panel.html
.. |jira-development-panel-link| replace:: *Jira to GitLab Integration* 
