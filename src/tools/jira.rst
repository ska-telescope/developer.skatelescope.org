Working with Jira
=================

.. todo::
   - Add about Jira
   - 

`Gitlab to Jira Integration`_:
------------------------------

-  **Mention a Jira issue ID** in a commit message or MR (merge
   request).

   -  GitLab hyperlinks to the Jira issue.

   -  The Jira issue adds an issue link to the commit/MR in GitLab.

   -  The Jira issue adds a comment reflecting the comment made in
      GitLab, the comment author, and a link to the commit/MR in GitLab,
      unless this commenting to Jira is `disabled`_.

   -  Example: ``some text SKA-34 some other text``

-  **Mention that a commit or MR ‘closes’, ‘resolves’, or ‘fixes’ a Jira
   issue ID**. When the commit is made on the project’s default branch
   (usually master) or the change is merged to the default branch:

   -  GitLab’s merge request page displays a note that it “Closed” the
      Jira issue, with a link to the issue. (Note: Before the merge, an
      MR will display that it “Closes” the Jira issue.)

   -  The Jira issue shows the activity and the Jira issue is closed, or
      otherwise transitioned.

   -  Example:
      ``some text closes/resolves/fixes SKA-34 some other text``

**Also**, You can:

-  comment on issues

-  record time tracking information against issues

-  transition issues to any status defined in the Jira Software
   project's workflow.

If you follow the following format while writing your commit message:

``<ignored text> <ISSUE_KEY> <ignored text> #<COMMAND> <optional COMMAND_ARGUMENTS>``

Commands:

-   **comment:** you can add a comment to Jira issue.

   -  Syntax:
      ``<ignored text> ISSUE_KEY <ignored text> #comment <comment_string>``

   -  Example: ``SKA-34 #comment corrected indent issue``

-  **time:** you can track time.

   -  Syntax:
      ``<ignored text> ISSUE_KEY <ignored text> #time <value>w <value>d <value>h <value>m <comment_string>``

   -  | Example: ``SKA-34 #time 1w 2d 4h 30m Total work logged``
      | Log 1 week 2 days 4 hours and 30 minutes in the Work Log tab of
        the issue SKA-34 and add the comment 'Total work logged'

-  **workflow transition:** Transitions a JIRA Software issue to a
   particular workflow state.

   -  Syntax: <ignored text> ISSUE_KEY <ignored text> #<transition_name>
      <comment_string>

   -  | Example: ``SKA-34 #ready-for-acceptance finished the work``
      | transition the SKA-34 jira issue to READY FOR ACCEPTANCE state
        and add 'finished the work' comment) or
        ``SKA-34 #ready finished the work`` ( if there is no ambiguity
        in the transition state, you can use transition state before the
        first space, if there is ambiguity such as 'START WORK' and
        'START REVIEW PROCESS' states, you can use hyphens (#start-work
        or #start-review)

`Jira to Gitlab Integration`_:
------------------------------

A Development Panel is added automatically to any Jira issues referred
by its ID in:

-  branch names

-  commit messages

-  merge request titles

in Gitlab and you will be able to see the linked ``branches``,
``commits``, and ``merge requests`` when entering a Jira issue (inside 
the Jira issue, merge requests will be called “pull requests”).

.. _figure-1-jira-dev-panel:

.. figure:: media/jira_dev_panel.png
   :scale: 60%
   :alt: Example Jira Development Panel
   :align: center
   :figclass: figborder

   Jira Development Panel.


.. _Gitlab to Jira Integration: https://docs.gitlab.com/ee/user/project/integrations/jira.html
.. _disabled: https://docs.gitlab.com/ee/user/project/integrations/jira.html#disabling-comments-on-jira-issues
.. _Jira to Gitlab Integration: https://docs.gitlab.com/ee/integration/jira_development_panel.html
