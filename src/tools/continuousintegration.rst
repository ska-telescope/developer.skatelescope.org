.. _CI:

======================
Continuous Integration
======================

Configuring a CI pipeline
-------------------------

To enable the Gitlab automation, it is needed to insert a
`configuration
file <https://docs.gitlab.com/ee/ci/yaml/README.html>`__ that must be placed in the root of the repository and called ".gitlab-ci.yml". It mainly contains definitions of how your project should be built. An example of
it can be found within the project "ska-python-skeleton" available
`here <https://github.com/ska-telescope/ska-python-skeleton/blob/master/.gitlab-ci.yml>`__.
Once the file is in the root directory, it is possible to run the CI pipeline manually
(creating a pipeline) or with a commit in github as soon as the
mirroring finishes. The following pipeline was created manually pressing
the button “Run pipeline” on a specific branch (i.e. master).

|image5|

Using a specific executor
-------------------------

The pipeline by default will run with a shared runner made available from GitLab.
It is also possible to assign specific ska runner to the project (by adding the `tags <https://docs.gitlab.com/ee/ci/yaml/README.html#tags>`__). 
To do that the option must be enabled:

|image6|

The EngageSKA cluster located at the Datacenter of Institute of Telecommunication (IT) in Aveiro provides some virtual machines available adding the tag "engageska" or "docker-executor" as shown `here <https://github.com/ska-telescope/ska-python-skeleton/blob/master/.gitlab-ci.yml>`__.

CI pipeline stage descriptions
------------------------------

.. caution:: This section is a work in progress

The CI/CD pipeline will ensure that software projects are packaged, tested and released in a consistent and predictable manner.
SKA Pipelines are viewable and executable at https://gitlab.com/ska-telescope

General Notes
_____________
- Every commit could potentially trigger a pipeline build. There may be different rules applied to determine which stages are executed in the pipeline based on factors like the branch name.

    - E.g Every commit in a feature branch may trigger the “Lint” stage, but not a slow test suite.
- When doing a release with a git tag, the full pipeline will be run.
- Every pipeline job is associated with its git commit (including tag commits).
- Try and have the stages complete as fast as possible.

    - In some cases it may be possible to parallelize jobs. For example, unit tests and static analysis could be run in parallel.
- All projects must include all the stages listed below.
- Project dependencies must be stored in, and made available from the SKA software repository.
- All tests must pass on the “master” branch and should be kept stable.

Stages
______
Build
"""""
The build stage packages/compiles the software project into distributable units of software.
The project will be checked out at the git commit hash. This specific version of the code must then be built. Failing the build stage will stop the further steps from being executed. Where possible Semantic Versioning should be used.
To create a release a git tag should be used. `See Release Procedure <http://developer.skatelescope.org/en/latest/development/python_package_release_procedure.html>`_.

Input
  Git commit hash

Output
  A distributable unit of software. E.g .deb .whl .jar or docker image.
  These must be stored as part of the artifacts and will then be available to subsequent jobs.
  One could also store metadata together with the artefact, such as a hash of the binary artefact. This should be provided by our artefact registry.


Linting
"""""""
The static analysis stage does static code analysis on the source code such as Linting.

Input
  None

Output
  Quality analysis results in JUnit format.

Test
""""
The test stage must install/make use of the packages created during the build stage and execute tests on the installed software. Tests should be grouped into Fast / Medium / Slow / Very Slow categories.

Input
  The output from the Build stage. E.g .deb or .whl or docker image.
  Input could also consist of test data or environment.

Output
  - The results of the tests in JUnit format. These need to be added to the artifacts.
    `See Gitlab Test Reports <https://docs.gitlab.com/ee/ci/junit_test_reports.html>`_.
  - Coverage metrics in JUnit format.

Test types
++++++++++

.. todo::
   - Further define components to be mocked or not
   - Further define smoke/deployments tests

Unit tests
  The smallest possible units/components are tested in very fast tests. Each test should complete in milliseconds.

Component tests
  Individual components are tested.

Integration/Interface tests
  Components are no longer being mocked, but the interactions between them are tested.
  If a component is a docker image, the image itself should be verified along with its expected functionality.

Deployment tests
  Tests that software can be deployed as expected and once deployed, that it behaves as expected.

Configuration tests
  Multiple combinations of software and hardware are tested.

System tests
  The complete solution, integrated hardware and software is tested. There tests ensure that the system requirements are met.




Publish
"""""""
Once the build and test stages have completed successfully the output from the build stage is uploaded to the SKA software repository. This stage may only be applicable on git tag commits for full releases in certain projects.

Input
  The output from the Build stage. .deb or .whl for example. This could also include docker images.

Output
  The packages are uploaded to the SKA software repository.



Pages
"""""
This is a gitlab stage publishes the results from the stages to Gitlab

Input
  The JUnit files generated in each pipeline stage.

Output
  The generated HTML containing the pipeline test results.

Documentation
"""""""""""""
Currently the documentation is generated by the “readthedocs” online service.
The list of SKA projects available `here <http://developer.skatelescope.org/en/latest/projects/list.html>`_.
The project documentation will be updated and accessible at the following URL
\https://developer.skatelescope.org/projects/<PROJECT>
E.g `lmc-base-classes <https://developer.skatelescope.org/projects/lmc-base-classes>`_

Input
  A `docs` folder containing the project documentation.

Output
  The generated HTML containing the latest documentation.


Using environment variables in the CI pipeline to upload to Nexus
------------------------------------------------------------------

There are several environment variables available in the CI pipeline that should be used when uploading Python packages and Docker images to Nexus.
This will make these packages available to the rest of the SKA project.

Python Modules
______________

The Nexus PYPI destination as well as a username and password is avialable.
For a reference implementation see the `lmc-base-classes .gitlab-ci.yaml <https://github.com/ska-telescope/lmc-base-classes/blob/master/.gitlab-ci.yml>`_

Note the following:
 - The Nexus `PYPI_REPOSITORY_URL <https://nexus.engageska-portugal.pt/repository/pypi/>`_ is where the packages will be uploaded to.
 - `twine` uses the local environment variables (`TWINE_USERNAME`, `TWINE_PASSWORD`) to authenticate the upload, therefore they are defined in the `variables` section.

.. code-block:: yaml

  publish to nexus:
    stage: publish
    tags:
      - docker-executor
    variables:
      TWINE_USERNAME: $TWINE_USERNAME
      TWINE_PASSWORD: $TWINE_PASSWORD
    script:
      # check metadata requirements
      - scripts/validate-metadata.sh
      - pip install twine
      - twine upload --repository-url $PYPI_REPOSITORY_URL dist/*
    only:
      variables:
        - $CI_COMMIT_MESSAGE =~ /^.+$/ # Confirm tag message exists
        - $CI_COMMIT_TAG =~ /^((([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$/ # Confirm semantic versioning of tag



Docker images
_____________

The Nexus Docker registery host and user is available.
For a reference implementation see the `SKA docker gitlab-ci.yml <https://github.com/ska-telescope/ska-docker/blob/master/.gitlab-ci.yml>`_

Note the following:
 - The `DOCKER_REGISTRY_USER` corresponds to the folder where the images are uploaded, hence the `$DOCKER_REGISTRY_FOLDER` is used.

.. code-block:: yaml

  script:
  - cd docker/tango/tango-cpp
  - make DOCKER_BUILD_ARGS="--no-cache" DOCKER_REGISTRY_USER=$DOCKER_REGISTRY_FOLDER DOCKER_REGISTRY_HOST=$DOCKER_REGISTRY_HOST build
  - make DOCKER_REGISTRY_USER=$DOCKER_REGISTRY_FOLDER DOCKER_REGISTRY_HOST=$DOCKER_REGISTRY_HOST push


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
.. |image7| image:: media/image0.png
