.. _merge-request:

Merge requests
++++++++++++++

When the story is ready for acceptance a Merge Request should be created on GitLab to
merge the story branch into the master branch. The Merge Request UI on GitLab includes a platform for the discussion threads, and indeed an important purpose of the Merge Request is to provide an online place for the team to discuss the changes and review the code before doing the actual merge.

It is recommended that A new Merge Request will include, among others, the following options:

* The Merge Request Title should always include the related JIRA issue id - this will be automatic following the above branching naming convention. You can add :code:`Draft` or :code:`Draft:` at the beginning of the Merge Request Title to automatically indicate that a Merge Request is not ready for merging just yet. Alternatively, you can use the Merge Request UI to mark the Merge Request as draft.
* Merge Request Description should include a concise, brief description about the issue.
* Add approval rules.
* Select one or more people for review (use the Reviewer field in the MR to differentiate between assignees and reviewers) and include anyone who has worked in the Merge Request.
* Delete source branch when Merge Request is accepted.
* Do not Squash commits when Merge Request is accepted.

At the moment the SKA organisation does not enforce approval rules, but it is recommended as good practice to involve other team members as assignees/reviewers for the Merge Request, and ensure that there is code review.

As part of best practices it is important to delete feature branches on merge or after merging them to keep your repository clean, showing only work in progress.
It is not recommended to squash commits submitted to the remote server, in particular if using GitLab and JIRA integration, so the enabling squash commits option should be left unchecked. However you can arrange your commits before pushing them to remote.
