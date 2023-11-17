Push code and branch
+++++++++++++++++++++++

Rememeber that all commits must have the story Jira Id prefixed in the git commit message:

.. code:: bash

  git add . # adds all staged changes
  git commit -m "abc-123-add-awesome-code"

When you are ready, you can **push** your code to the remote repository in gitlab.
If your team is using a main-branch-policy its a good practice to only push your code when it passes all the tests (if that's the case).

.. code:: bash

  git push

If the branch has not been previously pushed to gitlab a message will appear in the command output
that will provide the command to do this.

.. code:: bash

  $ git push
  fatal: The current branch abc-123-the-new-widget has no upstream branch.
  To push the current branch and set the remote as upstream, use

      git push --set-upstream origin abc-123-the-new-widget
