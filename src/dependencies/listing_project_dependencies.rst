Listing Project Dependencies
----------------------------

Principles
==========

All the dependencies that extraneous to the *base system* should be listed by
every project maintainer. These dependencies should not only comprise of the
OS level packages, but also of the specific tooling used by the package
(i.e PyPI packages in a Python base project, npm packages in a node.js
project).

The expected dependencies lists for a Python based project are specified in
:doc:`base_dev_env`.

Using the *dependencies-manager* tool to extract project dependencies
=====================================================================

The `dependencies-manager <https://github.com/ska-telescope/dependencies-manager>`__
tool was created on the `ska-telescope <https://github.com/ska-telescope>`__
repository in order to help extracting and maintaining a dependency list for
any project.

It works by creating a clean docker container with only the *base system*
installed. It then clones a specific SKA's project repository follows its
initial setup steps and compares the resulting system's dependencies with the
original *base system*.

The process of defining the setup steps for each specific project and
exporting its dependencies to a file should be carried out by each project
maintainer and can be accomplished by editing the ``get-deps.sh`` file
following the steps described next using as base the example from the
`ska-telescope` repository.

Define the variables specific for your project
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Start by setting some variables for your project's *url* and *directory name*
as ``PROJECT_dir`` and ``PROJECT_REPO_url``:

.. code-block:: bash
  :linenos:
  :emphasize-lines: 1,2

  PROJECT_dir=""
  PROJECT_REPO_url=""

Update the variables for script usage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Next copy and uncomment the ``PROJECT`` section of the ``get-deps.sh`` file
and change the respective variable names for ``PROJECT_dir`` and
``PROJECT_REPO_url``.

.. code-block:: bash
  :emphasize-lines: 2-
  :linenos:

  # PROJECT -----------------------------------------------------------------------------------------------------------------------------------
  working_dir=${PROJECT_dir}
  working_url=${PROJECT_REPO_url}

Specify the steps needed to setup your specific project
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now the most complex part, you need to specify the specific setup for your
project. In this example from the *ska-telescope* project we only need to
install the PyPI Python dependencies using ``pipenv install`` in line 9
since those are our only dependencies. Your project might differ since you
might need to install OS level packages or some specific tool (i.e. *npm*)
packages.

.. code-block:: bash
  :emphasize-lines: 9
  :linenos:

  ## get dependencies
  echo "[+] Parsing ${working_dir} project"
  rm -rf ${PWD}/dependencies/${working_dir}
  mkdir -p ${PWD}/dependencies/${working_dir}
  docker run --name python_bash -v ${PWD}/dependencies/${working_dir}:/tmp/dependencies/ -v ${PWD}/.utils/:/tmp/utils/ --rm -t spsr /bin/bash -c \
      "rm -rf /tmp/repo && \
      git clone ${working_url} /tmp/repo && \
      cd /tmp/repo && \
      pipenv install && \
      /tmp/utils/get-lib_deps.sh && \
      /tmp/utils/get-pipenv_deps.sh && \
      /tmp/utils/get-system_deps.sh"

Run the needed dependency extraction scripts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The *dependencies-manager* project is prepared to extract installed libraries,
system packages and Python packages. If these are all you need for your project
you can just skip this step. Otherwise you need to extract the packages using
your own tools. And update lines 10-12 on the following code.

.. code-block:: bash
  :emphasize-lines: 10-12
  :linenos:

  ## get dependencies
  echo "[+] Parsing ${working_dir} project"
  rm -rf ${PWD}/dependencies/${working_dir}
  mkdir -p ${PWD}/dependencies/${working_dir}
  docker run --name python_bash -v ${PWD}/dependencies/${working_dir}:/tmp/dependencies/ -v ${PWD}/.utils/:/tmp/utils/ --rm -t spsr /bin/bash -c \
      "rm -rf /tmp/repo && \
      git clone ${working_url} /tmp/repo && \
      cd /tmp/repo && \
      pipenv install && \
      /tmp/utils/get-lib_deps.sh && \
      /tmp/utils/get-pipenv_deps.sh && \
      /tmp/utils/get-system_deps.sh"

Compare the extracted dependencies with the base dependencies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Once again, if your project is only relying on installed libraries, system packages
or Python packages, nothing needs to be altered. Otherwise you must update the
diff routines in the following code block for your specific purtposes.

.. code-block:: bash
  :emphasize-lines: 2-
  :linenos:

  ## get installed dependencies on top of base
  diff ${PWD}/dependencies/base/system_deps.txt ${PWD}/dependencies/${working_dir}/system_deps.txt | perl -lne 'if(/^[<>]/){s/^..//g;print}' > ${PWD}/dependencies/${working_dir}/system_deps_diff.txt
  echo "package, version" > ${PWD}/dependencies/${working_dir}/system_deps_diff.csv
  diff ${PWD}/dependencies/base/system_deps.csv ${PWD}/dependencies/${working_dir}/system_deps.csv perl -lne 'if(/^[<>]/){s/^..//g;print}' >> ${PWD}/dependencies/${working_dir}/system_deps_diff.csv
  diff ${PWD}/dependencies/base/lib_deps.txt ${PWD}/dependencies/${working_dir}/lib_deps.txt perl -lne 'if(/^[<>]/){s/^..//g;print}' > ${PWD}/dependencies/${working_dir}/lib_deps_diff.txt

Update the documentation with the dependencies for a specific project
=====================================================================

After extracting the dependencies for a project you need to setup a document
in `developer.skatelescope.org <https://github.com/ska-telescope/developer.skatelescope.org>`__
listing those dependencies.

If you are using the `dependencies-manager <https://github.com/ska-telescope/dependencies-manager>`__
tool, after running the script and pushing it upstream, the `developer.skatelescope.org <https://github.com/ska-telescope/developer.skatelescope.org>`__
can be set such that the dependencies are automatically updated in the
documentation. In order to do so, create a file
``./src/dependencies/PROJECT_NAME`` and set a link to the respective
dependencies url under the `dependencies-manager <https://github.com/ska-telescope/dependencies-manager>`__
repository (**remember to use the link to the RAW file**). Use
``./src/dependencies/ska-skeleton`` as basis and adapt to your own project
in case your dependencies go beyond libraries, system packages and Python
packages.
