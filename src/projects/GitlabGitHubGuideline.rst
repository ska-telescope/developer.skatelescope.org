How to import a project from GitHub
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

GitLab CI/CD can be used with GitHub or any other Git server. Instead of
moving your entire project to GitLab, you can connect your external
repository to get the benefits of GitLab CI/CD (documentation pages for
github can be found
`here <https://docs.gitlab.com/ee/ci/ci_cd_for_external_repos/github_integration.html>`__).

After the
`registration <https://gitlab.com/users/sign_in#register-pane>`__, the
home page allows for the creation of a new project (see image below).

|image0|

The new project page allows to create a project (CI/CD) from an external
repository.

|image1|

The step-by-step procedure is the following:

1. Select the option “\ Repo by URL\ ”,
2. Write the repository url (i.e. https://github.com/ska-telescope/ska-skeleton.git),
3. Select a project name (for instance ska-skeleton-ci),
4. Select the correct ska group (i.e. ska-telescope),
5. Select/write a project slug (URL-friendly version of a repository name) and
6. Insert a project description.

|image2|

It is also possible to set the `visibility of the
project <https://gitlab.com/help/public_access/public_access>`__ (the
default is public).

Connecting an external repository will set up repository
`mirroring <https://docs.gitlab.com/ee/workflow/repository_mirroring.html>`__
(it is indicated in the GitLab project home page) and create a
lightweight project where issues, merge requests, wiki, and snippets
disabled.

|image3|

Concerning mirroring, it is important to note the following points:

-  Once you activate the pull mirroring feature, the mirror will be inserted into a queue. A scheduler will start every minute and schedule a fixed amount of mirrors for update, based on the configured maximum capacity.

   -  If the mirror successfully updates it will be enqueued once again with a small backoff period.

   -  If the mirror fails (eg: branch diverged from upstream), the project's backoff period will be penalized each time it fails up to a maximum amount of time

-  You should not push commits directly to the repository on GitLab. Instead, any commits should be pushed to the upstream repository. Changes pushed to the upstream repository will be pulled into the GitLab repository, either:

   -  Automatically within a certain period of time.

   -  When a forced update is initiated.

The update can be forced with the specific button in the repository settings:

|image4|

To enable the Gitlab automation, it is needed to insert a
`configuration
file <https://docs.gitlab.com/ee/ci/yaml/README.html>`__. An example of
it can be found
`here <https://github.com/ska-telescope/ska-skeleton/blob/master/.gitlab-ci.yml>`__.
Once the file is created, it is possible to run the CI pipeline manually
(creating a pipeline) or with a commit in github as soon as the
mirroring finishes. The following pipeline was created manually pressing
the button “Run pipeline” on a specific branch (i.e. master).

|image5|

The pipeline will run with a shared runner made available from GitLab.
It is also possible to assign specific ska runner to the project (by adding the `tags <https://docs.gitlab.com/ee/ci/yaml/README.html#tags>`. To do
that the option must be enabled:

|image6|

.. |image0| image:: media/image1.png
   :width: 6.27083in
   :height: 0.83333in
.. |image1| image:: media/image6.png
   :width: 6.27083in
   :height: 3.86111in
.. |image2| image:: media/image4.png
   :width: 6.27083in
   :height: 4.27778in
.. |image3| image:: media/image5.png
   :width: 6.27083in
   :height: 5.25000in
.. |image4| image:: media/image3.png
   :width: 6.27083in
   :height: 4.47222in
.. |image5| image:: media/image2.png
   :width: 6.27083in
   :height: 2.88889in
.. |image6| image:: media/image7.png
   :width: 6.27083in
   :height: 4.63889in
