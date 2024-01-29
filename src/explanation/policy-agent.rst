======================
Policy Agent
======================

The policy agent is a deployable service within a Kubernetes cluster that extends the capabilities of the Kubernetes API and implements custom behaviors.
Rather than constructing native Kubernetes resources and dealing with the coding, building, and management of webhooks code, the policy agent offers a more streamlined solution.
It dynamically applies behaviors based on static configurations, which are created as regular Kubernetes objects (each policy agent comes with its own Custom Resource Definitions).
These behaviors can be classified into three types:

- **Validation** - Verifies the conformity of objects (such as pods and services) submitted to the API.

- **Mutation** - Modifies objects submitted to the API..

- **Generation** - Generates new objects in response to the submission of other objects to the API.

Active Policies
--------------------
In order to mitigate risks and ensure that only authorized workloads are deployed, the following policies are enforced:

.. raw:: html

    <script src="https://cdn.jsdelivr.net/npm/js-yaml/dist/js-yaml.min.js"></script>
    <script src="src/_static/js/policies.js"></script>
    <div id="container"></div>

Developer Workflow
--------------------
When applying a change a cluster with an active policy, the developer will be informed if there is a conflict.

Examples:

- When applying a deployment which uses an unsigned image:

.. code-block:: bash

    kubectl apply -f deployment.yaml
    Error from server: error when creating "deployment.yaml": admission webhook "mutate.kyverno.svc-fail" denied the request:

    resource Deployment/default/hello-world-deployment was blocked due to the following policies

    artefact-skao-int-image-signature:
        autogen-artefact-skao-int-image-signature: 'failed to verify image artefact.skao.int/ska-cicd-k8s-tools-build-deploy:0.9.3:
            .attestors[0].entries[0]: failed to verify artefact.skao.int/ska-cicd-k8s-tools-build-deploy@sha256:0b9...1:
            no signature is associated with "artefact.skao.int/ska-cicd-k8s-tools-build-deploy@sha256:0b9...1",
            make sure the artifact was signed successfully'

- When applying an ingress change which contains a "host" field:

.. code-block:: bash

    kubectl apply -f ingress.yaml
    Error from server: error when creating "ingress.yaml": admission webhook "validate.kyverno.svc-fail" denied the request:

    resource Ingress/default/hello-world-ingress was blocked due to the following policies

    ingress-host-not-allowed:
        ingress-host-not-allowed: 'validation error: Failed to create Ingress resource:
            defining `host` is not allowed. rule ingress-host-not-allowed failed at path /spec/rules/0/host/'
