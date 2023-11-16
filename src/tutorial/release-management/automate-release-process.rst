===================================================
How to Automate the Release Process Using Templates
===================================================

This guide will walk you through the steps to automate the release process of your software package using GitLab CI/CD templates.

Prerequisites
=============

- You have a GitLab account and a project repository where your software package is hosted.
- You have setup the `ska-cicd-makefile` as a submodule in your project. If not, add it as a submodule to your project using the following command: `git submodule add https://gitlab.com/ska-telescope/sdi/ska-cicd-makefile.git .make`. If you are working with an existing repository make sure the submodule is checked out using the following command: `git submodule update --init`

   
Steps
=====

1. **Include the Release Makefile in Your Repo Makefile**

   Open your `Makefile` file and include the release support from the `ska-cicd-makefile` repository.

   .. code-block:: bash

      -include .make/release.mk

This will add supporting scripts for changelog generation using `git-chglog` and `GitLab release pages <https://docs.gitlab.com/ee/user/project/releases/>`__.
A Jira ticket is added to the release notes to enable other teams to refer to the documentation related to process and implementation of git-changelog.

2. **Include the Release Template in Your GitLab CI/CD Configuration**

   Open your `.gitlab-ci.yml` file and include the release template from the `templates-repository` project:

   .. code-block:: yaml

      include:
        - project: 'ska-telescope/templates-repository'
          file : 'gitlab-ci/includes/release.gitlab-ci.yml'

   This will add changelog generation and release note publishing mechanism (to #artefact-releases slack channel and as a Gitlab Release) support into the project.

3. **Customize the Release Process (Optional)**

   Developers are strongly encouraged to use the default template to ensure that similar practices are followed in all SKA repositories, but if any departures from standard procedures are required the process can be customized. 
   You can learn about the variables and how to override them by running `make help release` or `make long-help release`.

4. **Commit and Push Your Changes**

   Commit your changes to the `.gitlab-ci.yml` and `Makefile` files and push them to your GitLab repository.

5. **Trigger the Release Process**

   The release process is now automated and will be triggered whenever a new tag is pushed to the repository. You can create and push a new major, minor or patch version using the following below steps.


How to Make a Release
---------------------------

This guide provides practical steps on how to make a patch release using the provided Makefile. For making major or minor version, the equiavelent commands should be used.

1. **Create a JIRA issue and the branch**
   
   **1st**: Create a new issue on the `Release Management <https://jira.skatelescope.org/projects/REL/summary>`_ Jira Project with a summary of your release, and set it to "IN PROGRESS".

   **2nd**: Create and checkout a new `rel-XXX-release-v-1-2-2` branch (where `REL-XXX` is your Jira issue.)

2. **Check the Current Version**

   Before making a patch release, you should check the current version of your project. You can do this by running the following command:

   .. code-block:: bash

      make show-version

   This command will display the current version of your project.

3. **Bump the Version**

   Choose which bump version you want to use:

    - bump-major-release
    - bump-minor-release
    - bump-patch-release
  
   Run for example ``make bump-patch-release``, if for example .release was ``1.2.1`` it will be moved to ``1.2.2``.
   To increment the patch level of your project's version, you can use the `bump-patch-release` target. Run the following command:

   .. code-block:: bash

      make bump-patch-release

   This command will increment the patch level of the current version and update the `.release` file.

4. **Set the Release**

   To set the version for different kind of artefacts, run `make set-release` target. This command will update the different versions of artefact types with an interactive prompt for you to follow.

  * If you have helm charts on your project it will automatically run ``make helm-set-release`` which will set all charts to - following the example - version ``1.2.2``, as well as update the version on the charts' dependencies
  * If you have python packages on your project it will automatically run ``make python-set-release``. This will set pyproject.toml to - following the example - version ``1.2.2``;
  * The ``release`` variable in your ``docs/conf.py`` will also be automatically updated according to the version in .release, confirm if this is the correct version for the documentation;
 
   Make any other manual changes that are necessary to bump the version. For example:

  * Updating your python package's ``__version__`` attribute;
  * Updating python tests that check the version;
  * Manually updating a human-readable ``CHANGELOG`` file.

5. **Create a Git Tag**

   After bumping the patch version, you should create a git tag for the new version. By this point you'll also require a JIRA ticket to link your release. 
   The following target will ask you for the ticket as a prompt. This can be skipped by setting `AUTO_RELEASE` variable.
   
   .. code-block:: bash

      make create-git-tag

   This command will create a git tag for the new version.

6. **Push the Git Tag**

   Finally, you should push the new git tag to your remote repository. You can do this by running the following command:

   .. code-block:: bash

      make push-git-tag

   This command will push the new git tag to your remote repository triggering the release process.

   *Note:* This final step will push the release tag direct to the main branch, so this step can only be performed by a repository maintainer. It is possible, instead, to push the tag onto your branch immediately before it is merged. In this case, it is very important that the tag is pushed to the branch only after the MR has been approved and no further commits will be made to it.

That's it! You have successfully made a patch release for your project.
Your release process is now automated. Whenever a new tag is pushed to the repository, the release process will be triggered, and the release notes will be generated and published automatically.

Release results
===============

After the tagged pipeline finishes, the new release generated with the git-chglog will be appended to the tag in the gitlab project, an example of the release notes can be seen `here <https://gitlab.com/ska-telescope/templates/ska-raw-skeleton/-/releases/0.0.1>`_. And the Jira ticket (preferable one created on the `Release Management <https://jira.skatelescope.org/projects/REL/summary>`_ Jira Project) that is present on the commit message that triggered the tag pipeline will be updated with links to the gitlab release page.

If you have included the file ``gitlab-ci/includes/release.gitlab-ci.yml`` Marvin should also publish a message on this `channel <https://skao.slack.com/archives/C02NW62R0SE>`_ announcing the release.