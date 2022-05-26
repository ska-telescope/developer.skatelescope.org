.. _gpu-pipelines-workloads:

***************************
GPU Pipelines and Workloads
***************************
This section describes requirements and guidelines for deployment and testing of a new Python project using GPUs on GitLab.
The basic guidelines build upon those of the `Python Coding Guidelines <https://developer.skao.int/en/latest/tools/codeguides/python-codeguide.html>`_,
but are specific to the GPU environment and describe how to specify a GPU runner for the pipeline jobs
and how to deploy a workload on a GPU node in the cluster using a Kubernetes chart deployment.

.. contents:: Table of Contents

Running pipeline jobs on a GPU node
===================================
A template for a pipeline job on a GPU node is provided in the ``gitlab-ci/includes/gpu.gitlab-ci.yml`` location.
This template adds a new ``test`` stage to the pipeline job, which runs the workload on the GPU node.

In order to use this template add the following to your ``.gitlab-ci.yml`` file:

.. code-block:: yaml

    include:
        # GPU
      - project: 'ska-telescope/templates-repository'
        file: 'gitlab-ci/includes/gpu.gitlab-ci.yml'
        ref: $UPSTREAM_BRANCH
        variables:
            PYTHON_VARS_AFTER_PYTEST: "-m gpu"

You will probably also want to add the following to your ``.gitlab-ci.yml`` file, specifyng that the non-GPU pipeline tests should not be run in case you aren't using a GPU:

.. code-block:: yaml

    include:
        # Python
      - project: 'ska-telescope/templates-repository'
        file: 'gitlab-ci/includes/python.gitlab-ci.yml'


Alternatively, if you don't want to use the provided GPU template, any step on your pipeline can be configured to use the GPU node by adding the following to the step:

.. code-block:: yaml

    tags:
        - k8srunner-gpu-v100

The unit tests themselves should be marked with the ``gputest`` tag.

.. code-block:: python

    @pytest.mark.gputest
    def test_cuda():
        """A dummy test for a cuda function"""
        test = dummy.cuda_dummy_function()
        assert test == "cuda-function"

Deploying a workload on a GPU node
==================================
The `STENCIL <https://gitlab.com/ska-telescope/sdi/ska-cicd-stencil>`_ project provides a template deployment chart that can be used to deploy a workload on a GPU node.

All that's needed to deploy the existing chart is to issue the command:

.. code-block:: sh

    make k8s-install-chart


If you want to create your own chart that deploys a workload to a GPU node, you need to define the following besides the usual steps needed for a CPU workload:

On the ``values.yaml`` file:

.. code-block:: yaml

    # [...]
    image:
        repository: nvidia/cuda # The image to use
        tag: "11.0-base" # The tag to use if needed. Otherwise, leave the tag empty (i.e. "")

    # [...]
    resources:
        limits:
            nvidia.com/gpu: 1 # The maximum number of GPUs to use (this number is an integer and reserves a full physical device)
        requests:
            nvidia.com/gpu: 1 # The minimum number of GPUs to use (this number is an integer and reserves a full physical device)

    # [...]
    # The GPU nodes have a taint that prevents purely CPU workloads from being scheduled on the GPU nodes. This taint is removed by the following toleration:
    tolerations:
    - key: "nvidia.com/gpu"
        operator: "Equal"
        value: "true"
        effect: "NoExecute"

*NOTE: The GPU resources are scarce. Reserving 1 GPU uses a full physical device for your workload and can quickly exhaust the available GPU resources.*

On the ``deployment.yaml`` file:

.. code-block:: yaml

    # [...]
    spec:
        template:
            spec:
                runtimeClassName: "nvidia"

Under normal circumstances after the workload is finished, the container should be deleted. In case you need to manually remove the deployed chart, issue the following command:

.. code-block:: sh

    make k8s-uninstall-chart

Summary
=======

This basic template project is available on `GitLab <https://gitlab.com/ska-telescope/sdi/ska-cicd-stencil>`_. And demonstrates the following:

1) Provides functions and unit tests that run on a GPU worker node runner by calling the GPU gitlab CI/CD template.
2) Defines an example chart that deploys a workload to a GPU node.
