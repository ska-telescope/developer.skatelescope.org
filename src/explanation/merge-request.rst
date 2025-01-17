.. _merge-request:

Merge request
+++++++++++++

When a story is ready for acceptance a Merge Request should be created on GitLab to
merge the story branch into the main branch. The Merge Request UI on GitLab includes a platform for the discussion threads, and indeed an important purpose of the Merge Request is to provide an online place for the team to discuss the changes and review the code before doing the actual merge.

It is recommended that a new Merge Request will include, among others, the following options:

* The Merge Request Title must include the related JIRA issue id - this will be automatic following the above branching naming convention. 
* Add :code:`Draft` or :code:`Draft:` at the beginning of the Merge Request Title to indicate that a Merge Request is not ready for merging just yet. Alternatively, you can use the Merge Request UI to mark the Merge Request as draft.
* Merge Request Description should include a concise, brief description about the issue.
* Add approval rules.
* For assignee, select all people that worked in this branch.
* For reviewers. select one or more people to review the work done in the branch. (Group assignment can be done in the description field by typing: /assign_reviewer @... and searching for a team group name. After saving the description the users of the group will be added as reviewers.)
* Delete source branch when Merge Request is accepted.
* Do not Squash commits when Merge Request is accepted.

It is important to delete feature branches on merge or after merging them to keep your repository clean, showing only work in progress.
It is not recommended to squash commits submitted to the remote server, in particular if using GitLab and JIRA integration, so the enabling squash commits option should be left unchecked. However you can arrange your commits before pushing them to remote.
