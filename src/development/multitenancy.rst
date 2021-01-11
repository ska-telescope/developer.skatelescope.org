.. _`Multitenancy`:

Multitenancy
************

The SKA adopts Kubernetes as the orchestration layer. The Kubernetes Clusters Managed by the Systems Team serve multiple projects and can host multiple deployments of the some project at the same time. Those clusters are thus configured to ensure that each job runs isolated from the others and that the cluster resources are fairly allocated among the different jobs. This is what is called multitenancy.

An important characteristic of a Namespace in a Kubernetes Cluster is that it is isolated from other Namespaces in the cluster. This means that you can isolate each separate job and its Kubernetes resources by deploying to a different namespace. You can thus restrict API access, constrain resource usage, and specify what containers are allowed to do for that particular job. Currently multitenancy is implemented only in the SKAMPI pipelines, but the scripts developed can be easily adapted for use with other pipelines. 


Access Pipeline Namespaces
==========================

Multitenancy allows for the owners of a given job  to investigate any problems and test things using the namespace that it was assigned in the Engage Cluster without worrying that the performance of other jobs running in the cluster is affected. For that you only need to retrieve the kubeconfig file that is generated automatically by the pipeline (currently only for SKAMPI pipelines).

You'll see a ``curl`` in the pipeline output towards the end:

::

 Example:
 
 You can get the kubeconfig file from the url: 
 "https://nexus.engageska-portugal.pt/repository/k8s-ci-creds/k8s-ci-ci-test-svc-skampi-st-559-publish-credentials-12e1c424-ci-test-skampi-st-559-publish-credentials-12e1c424-low-conf" 
 with the following command into your current directory in a file called KUBECONFIG:
	curl https://nexus.engageska-portugal.pt/repository/k8s-ci-creds/k8s-ci-ci-test-svc-skampi-st-559-publish-credentials-12e1c424-ci-test-skampi-st-559-publish-credentials-12e1c424-low-conf --output KUBECONFIG

This kubeconfig file is auto-generated to easily access the namespace created for the pipeline. Once this file is copied to your local machine, and the adequate enviroment variables are set you should be able to access the namespace within the kubernetes cluster.

How it works
------------

This is enabled with adding ``create_k8s_creds_after_script`` to the ``after_script`` in the ``test low`` and ``test mid`` pipeline jobs. You can also include this script in other jobs as well. Note that ``SERVICE_ACCOUNT`` and ``KUBE_NAMESPACE`` variables must be set in your local environment.

Assumptions/Additional Notes
----------------------------


* ``SERVICE_ACCOUNT`` and ``KUBE_NAMESPACE`` variables must be set.
* ``CI_PROJECT_NAME`` and ``CI_COMMIT_BRANCH`` variables must be accessible. Note: These are already available in gitlab pipelines.
* The namespaces are deleted 24 hours after they are created
* The namespaces are deleted if there is recent commit on the branch (The previous namespaces for the same branch/MR are deleted) so that there is only one namespace which is pointing to the recent commit in the branch
* Kubernetes namespaces **must** start with ``ci-test-<project_name>-<branch_name>-*`` since same namespaces for the previous commits are deleted! Note: It doesn't check whether your namespace name is following the above naming!
* The URL to access the kubeconfig is only valid for 24 hours
* The script uses jq to parse json from kubernetes so you may include ``create_k8s_creds_dependencies`` in the ``before_script`` part. (See ``test low/mid on demand`` job definitions for a full example)

