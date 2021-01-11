.. _`Multitenancy`:

Multitenancy
************

The SKA adopts Kubernetes as the orchestration layer. The Kubernetes Clusters Managed by the Systems Team serve multiple projects and can host multiple deployments of the some project at the same time. Those clusters are thus configured to ensure that each job runs isolated from the others and that the cluster resources are fairly allocated among the different jobs. This is what is called multitenancy.

Multitenancy implemented at the Namespace level
===============================================

An important characteristic of a Namespace in a Kubernetes Cluster is that it is isolated from other Namespaces in the cluster. This means that you can isolate each separate job and its Kubernetes resources by deploying to a different Namespace. Within a given Namespace we constrain resource usage by defining Limit Ranges and Resource Quotas.

A Resource Quota constrains aggregate resource usage. It can limit:

* the quantity of objects that can be created in a namespace by type
* the total amount of compute resources available in that namespace including:

  * total cpu 
  * total memory
  * total ephemeral storage

An example of the content of a ``yaml`` file defining Resource Quotas is:

::

 apiVersion: v1
 kind: ResourceQuota
 metadata:
   name: compute-resources
 spec:
   hard:
     pods: "250"
     requests.cpu: 12000m
     requests.memory: 16Gi
     requests.ephemeral-storage: 25Gi
     limits.cpu: 24000m
     limits.memory: 32Gi
     limits.ephemeral-storage: 50Gi

Enabling a Resource Quota in a namespace means that users **must** specify requests and limits for all the containers inside the pods deployed in that Namespace. If requests or limits are not defined in the Helm Charts used for deployment, we can nonetheless prevent the quota system from rejecting pod creation by specifying default values at the container level, the Limit Ranges. An example of the content of a ``yaml`` file defining Limit Ranges for a Namespace is:

::

 apiVersion: v1
 kind: LimitRange
 metadata:
   name: limit-range
 spec:
   limits:
   - default:
       memory: 256Mi
       cpu: 200m
       ephemeral-storage: 256Mi
     defaultRequest:
       memory: 64Mi
       cpu: 65m
       ephemeral-storage: 256Mi
     type: Container

If requests and limits are defined in the Helm Charts used for deployment they will override the values in the Limit Ranges for those containers.

Currently in the Kubernetes Clusters maintained by the Systems Team multitenancy is implemented only in the SKAMPI pipelines, but the scripts developed for the SKAMPI project can be easily adapted for use with other pipelines. Multitenancy is implemented for SKAMPI not only in the *permanent* namespaces used to run the integration and staging environments, but also on the temporary pipelines used in feature branch development. 


Access Pipeline Namespaces
==========================

Branch pipelines in the Kubernetes Clusters maintained by the System Team are short lived; they are erased after 24 hours. Also, they are named automatically and as such users must be aware of the naming scheme. The name for the pipeline Namespace is of the form ``ci-<project name>-<branch name>``. For SKAMPI a ``-low`` or a ``-mid`` is appended at the end of the name depending on the telescope. For example, for a SKAMPI project branch named *at-51* and for a deployment involving  the MID telescope the corresponding Namespace name would be ``ci-skampi-at-51-mid``. We note that it is important to keep branch names reasonably short since Kubernates truncates Namespace names at 63 characters.

Multitenancy of the branch pipelines allows for the owners of a given job to access logs, investigate problems, test things, without worrying that the performance of other jobs running in the cluster is affected. In order to achieve this users need to be able to retrieve a kubeconfig file giving access to the cluster. Such a file is generated automatically by the pipelines running on SKAMPI  providing access only to the namespace specific for that pipeline, thus assuring that users will not interfere with other jobs running in the cluster.

Retrieving the kubeconfig file is easy, you'll see a ``curl`` in the job output in gitlab towards the end:

::

 Example:
 
 You can get the kubeconfig file from the url: 
 "https://nexus.engageska-portugal.pt/repository/k8s-ci-creds/ci-skampi-st-559-publish-credentials-low" 
 with the following command into your current directory in a file called KUBECONFIG:
	curl https://nexus.engageska-portugal.pt/repository/k8s-ci-creds/ci-skampi-st-559-publish-credentials-low --output KUBECONFIG

Once this file is copied to your local machine, and the adequate enviroment variables are set you should be able to access the namespace within the kubernetes cluster. A more detailed description on how this is implemented in the pipeline and how it works is found in the README file at the SKAMPI project repository 
https://gitlab.com/ska-telescope/skampi/-/blob/master/README.md


Assumptions/Additional Notes
----------------------------


* ``SERVICE_ACCOUNT`` and ``KUBE_NAMESPACE`` variables must be set.
* ``CI_PROJECT_NAME`` and ``CI_COMMIT_BRANCH`` variables must be accessible. Note: These are already available in gitlab pipelines.
* The namespaces are deleted 24 hours after they are created hence the kubeconfig is only valid for 24 hours
* The namespaces are deleted if there is a recent commit on the branch; the previous namespaces for the same branch/MR are deleted so that there is only one namespace which is pointing to the recent commit in the branch

