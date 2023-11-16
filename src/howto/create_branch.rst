Create work branch
+++++++++++++++++++++++

Usualy work branches are created from the **main** repository branch, althouh they can be created from other working branches.
Regardless you should make sure you **pull** the latest changes from the branch you a branching from.

.. code:: bash

  git pull main

Then when creating a new branch, its name must be:

* prefixed with the story Jira id
* all lower case
* use the character **-** to separe words
  
i.e *abc-123-the-new-widget*

.. code:: bash

  git checkout -b abc-123-the-new-widget

At this point the branch exists only locally.
