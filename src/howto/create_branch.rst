.. _create-branch:

Create work branch
+++++++++++++++++++++++

Usually work branches are created from the **main** repository branch, although they can be created from other working branches.
Regardless you should make sure you **pull** the latest changes from the branch you are branching from.

.. code:: bash

  git pull main

Then when creating a new branch, its name must be:

* prefixed with the story Jira ID
* all lower case
* use the character **-** to separate words
  
i.e *abc-123-the-new-widget*

.. code:: bash

  git checkout -b abc-123-the-new-widget

At this point the branch exists only locally.

You can now make changes to your code and commit that changes.
When doing so, remember to always:

* Prefixed your commit message with the story JIRA ID.
* This Jira ID, by convention, should be all upper case and followed by the "**:**" character

.. code:: bash

  git add . # adds all changes to staging
  git commit -m "ABC-123: Add awesome code"

You can now :ref:`push-code-branch`.

.. code:: bash

  git push

And then you are ready to :ref:`create-merge-request`.