Create merge request
++++++++++++++++++++

Merge requests are open in GitLab and enable code reviews and continuous branch testing.
If the working branch doesn't have a merge request created, you will be presented with an url to open one.

.. code:: bash

  $ git push
  Enumerating objects: 5, done.
  Counting objects: 100% (5/5), done.
  Delta compression using up to 16 threads
  Compressing objects: 100% (2/2), done.
  Writing objects: 100% (3/3), 318 bytes | 318.00 KiB/s, done.
  Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
  remote: 
  remote: To create a merge request for abc-123-the-new-widget, visit:
  remote:   https://gitlab.com/ska-telescope/awesome-project/-/merge_requests/new?merge_request%5Bsource_branch%5D=abc-123-the-new-widget
  remote: 
  To gitlab.com:ska-telescope/awesome-project.git
  * [new branch]      abc-123-the-new-widget -> abc-123-the-new-widget
  Branch 'abc-123-the-new-widget' set up to track remote branch 'abc-123-the-new-widget' from 'origin'.

This merge request page can also be triggered in the *code -> merge request* option in GitLab.
