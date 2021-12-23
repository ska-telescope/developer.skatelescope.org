.. _deploy-skampi:

*************************
Deploy SKAMPI on Minikube
*************************

This tutorial is an arrangement of the workshop available "`So you want to deploy Skampi on Minikube? <https://confluence.skatelescope.org/pages/viewpage.action?pageId=159384439>`__".

The purpose of the workshop was to:

 * Understanding the motivation for standardising on Minikube, 
 * Deploying Minikube in a consistent way and
 * General help with running Skampi.

This page aims at the same goals. 

Before you begin
################

It is possible to deploy SKAMPI on many common used operating systems. 

In specific, for windows, please use `WSL2 <https://gitlab.com/ska-telescope/sdi/ska-cicd-deploy-minikube#wsl2>`__. 

For macos, please sort hyperkit out by following `these instructions <https://gitlab.com/ska-telescope/sdi/ska-cicd-deploy-minikube#macos>`__ and install hyperkit by running:

.. code-block::        
        :caption: Install hyperkit on macos      

        brew install hyperkit

For Linux, checkout the `ska-cicd-deploy-minikube <https://gitlab.com/ska-telescope/sdi/ska-cicd-deploy-minikube>`__, and run the following commands:

.. code-block::
        :caption: Install podman on linux

        git clone --recurse-submodules https://gitlab.com/ska-telescope/sdi/ska-cicd-deploy-minikube.git
        cd ska-cicd-deploy-minikube
        make minikube-install-podman

Why Kubernetes
##############

The only thing that holds an highly distributed project like SKA together are clear standards and APIs. Kubernetes (and, more in general, containerisation) provides a clear abstraction that enables developers to (cheaply) closely imitate production on the desktop for computing, network and storage.

Developers need a simple self-contained environment to support a fast and iterative software development workflow and `Minikube <https://minikube.sigs.k8s.io/docs/start/>`__ can solve this need because it is a local Kubernetes, focusing on making it easy to learn and develop for Kubernetes. 

Consistent minikube development environment
###########################################

There are many ways to setup Minikube and it is important to select one way for SKA so that we don't have divergence from the target platform. 

It is therefore crucial to have consistency in deployments including:

 * Network - not relevant on a single node (we don’t use NetworkPolicies either yet)
 * `StorageClass abstraction <https://kubernetes.io/docs/concepts/storage/storage-classes/>`__
 * Kubernetes Version - feature support
 * Auxillary tooling - kubectl, Helm, K9s - matched versions

It is also important so have support across desktop/laptop hardware/OS and in particular the target will be: 

 * macOS,
 * Linux and
 * Windows.

To help with all this, the System Team has created the repository `ska-cicd-deploy-minikube <https://gitlab.com/ska-telescope/sdi/ska-cicd-deploy-minikube>`_ that drives the cluster deployment process, and tracks upstream versions that are supported.

ska-cicd-deploy-minikube
************************

The main features provided by the `ska-cicd-deploy-minikube <https://gitlab.com/ska-telescope/sdi/ska-cicd-deploy-minikube>`_ repository are:

 * Pretested versions of Minikube, Kubernetes, and tools
 * Deploys on podman, docker, hyperkit, wsl2
 * Mounts local storage into virtual machine ready for access from Pods (/srv:/srv)
 * Loads SKA StorageClasses - emulates integration
 * Discovers and configures proxy settings (based on environment variables)
 * Provides verification tests (make minikube-test)
 * Proxy Ingress to host network adapter (Linux only)
 * Activates `key addons <https://minikube.sigs.k8s.io/docs/commands/addons/>`__ - Ingress Controller, Loadbalancer, logging, metrics

Deploy Minikube
###############

In order to deploy minikube in a local laptop, the first thing to do is to check the os dependencies at this `link <https://gitlab.com/ska-telescope/sdi/ska-cicd-deploy-minikube#os-variations>`__.

There are only few commands for installing minikube on a local environment which are listed below: 

.. code-block::
        :caption: Deploy Minikube and execute verification tests

        git clone --recurse-submodules https://gitlab.com/ska-telescope/sdi/ska-cicd-deploy-minikube.git
        cd ska-cicd-deploy-minikube
        make all
        make minikube-test 

It is possible to personalize the installation by setting variables like :code:`MEM` (default 8192MB) or :code:`DRIVER` (default podman; the complete list of variable is available with the command :code:`make`). One way of doing this is to create a file called :code:`PrivateRules.mak` in the root folder of the ska-cicd-deploy-minikube repository. An example of content is the following: 

.. code-block::
        :caption: PrivateRules.mak file (set memory 4096MB and driver docker)

        MEM = 4096
        DRIVER = docker

Together with minikube, the pre-tested version of `k9s <https://github.com/derailed/k9s>`__, `kubectl <https://kubernetes.io/docs/reference/kubectl/cheatsheet/>`__ and `helm <https://helm.sh/>`__ will be installed. 

The installation process will give some information, for example the minikube ip, the version of the tools installed or the memory and cpus allocated to the minikube. 

Please note that the list of the storage classes installed includes: 

 * nfs and nfss1, aliases for network file system (type of storage) and
 * block and bds1 aliases for for block storage.

For the minikube installation, they map to host path while in the SKA k8s online cluster available on Gitlab they map to real storage (like `ceph <https://ceph.readthedocs.io>`__). 

The verification tests will checks the services and ingresses, the storage classes installed, the load balancer by installing a pod which write into a storage and retrieve the content from various different end points. 

Please check the section :ref:`Minikube Problems` for suggestions on how to solve common problems. 

Deploy SKAMPI
#############

Once Minikube is installed and working, it is possible to deploy SKAMPI with the following set of commands:

.. code-block::
        :caption: Deploy SKAMPI

        git clone --recurse-submodules https://gitlab.com/ska-telescope/ska-skampi.git
        cd ska-skampi
        helm repo add ska https://artefact.skao.int/repository/helm-internal # add SKA artefact repository to the helm repositories
        helm repo update
        make k8s-dep-update # update the dependency of chart ska-mid (default)
        make minikube-load-images K8S_CHARTS=charts/ska-mid/ # preload images for ska-mid chart (optional)
        pipenv shell # or other virtual environment (i.e. virtualenv venv && source venv/bin/activate)
        make k8s-install-chart K8S_CHART=ska-mid KUBE_NAMESPACE=ska-mid

In general, deploying Skampi can be hard since it requires many images (some large), the components launched are highly interdependent (TangoDB -> DatabaseDS -> Configuration Job -> a TANGO Device Server depends on the configuration job which depends on the DatabaseDS which depends on the TangoDB) and there are frequent timeout issues and race conditions.

These are complex issues, but caching and pre-loading container images can help (as shown in the code above). This can also be done with individual images with the following commands:

.. code-block::
        :caption: Preload ska-mid chart images
        
        # from ska-skampi folder
        make k8s-dep-update 
        make minikube-load-images K8S_CHARTS=charts/ska-mid/

.. code-block::
        :caption: Preload Individual images

        minikube image load <image>:<tag>

As alternative, it is possible to deploy SKAMPI using only helm: 

.. code-block::
        :caption: Alternative deploy SKAMPI

        kubectl create namespace ska-mid
        helm install test ska/ska-mid --version 0.8.2 --namespace ska-mid
        # to delete: helm uninstall test --namespace ska-mid

Checking SKAMPI
***************

In order to check SKAMPI, it is possible to run the following commands:

.. code-block::
        :caption: Check that Skampi is running - wait for all the Pods to be running

        make skampi-wait-all KUBE_NAMESPACE=ska-mid K8S_TIMEOUT=600s

.. code-block::
        :caption: Check with K9s - are all the Pods healty

        k9s --namespace ska-mid --command pods

.. code-block::
        :caption: Access the SKA landing page

        sensible-browser http://$(minikube ip)/ska-mid/start/

Testing SKAMPI
**************

In order to test SKAMPI, run the following commands: 

.. code-block::
        :caption: run the defined test cycle against Kubernetes

        make k8s-test KUBE_NAMESPACE=ska-mid K8S_TIMEOUT=600s

The above commands will start a new pod in the target namespace to run the tests against a deployed environment in the same way that python-test runs in a local context. The default configuration runs pytest against the tests defined in ./tests. By default, this will pickup any pytest specific configuration set in pytest.ini, setup.cfg etc. located in ./tests.

The result of the command will log the specific command executed, the requirements installed, the tests output and the classification of the tests. 

It is also possible to run component tests by running the below command:

.. code-block::
        :caption: iterate over Skampi component tests defined as make targets

        make skampi-component-tests KUBE_NAMESPACE=ska-mid K8S_TIMEOUT=600s

The above command introspects the Makefile looking for targets starting with skampi-test-* and then executes them in sorted order.

Cleaning up SKAMPI
******************

.. code-block::
        :caption: Teardown an instance of SKAMPI a specified Kubernetes Namespace

        make k8s-uninstall-chart KUBE_NAMESPACE=ska-mid

Useful commands
***************

There are a number of basic commands that can help in Understanding what's happening in a k8s deployment. 

.. code-block::
        :caption: kubectl useful commands

        kubectl get svc -n ska-mid # list services of namespace ska-mid
        kubectl get pod -n ska-mid # list pods of namespace ska-mid
        kubectl describe pod -n ska-mid <name-of-pod> # describe a pod in namespace ska-mid
        kubectl logs -n ska-mid <name-of-pod> # get logs of a pod in namespace ska-mid

k9s is also a very useful tool that enables to use kubectl without knowing all the detail of the specific command. More information on this tool can be found at `k9s documentation page <https://k9scli.io/>`__ and in particular it can be useful to check the `commands page <https://k9scli.io/topics/commands/>`__. 

.. code-block::
        :caption: Makefile useful commands

        make k8s-watch # watch the pod's status
        make k8s-wait # wait for all jobs to be completed or all pods to be running

.. _Minikube Problems:

Minikube Problems
#################

Use Cache
*********

It is possible to configure a local cache by running the following command:

.. code-block::
        :caption: Use a intermediate cache based on nginx

        make all USE_CACHE=yes

This will create a local cache of images that are pulled so that the second time you make a deployment in Minikube, the cache will respond without going to the upstream image registry. This is currently configured to cache:

 * docker.io
 * gcr.io
 * k8s.gcr.io
 * quay.io
 * registry.gitlab.com
 * docker.elastic.co

This will help work around pull throttling introduced by Docker Hub (https://docs.docker.com/docker-hub/download-rate-limit/), but will also speed up your deployments, as the cache can be maintained between re/installs of Minikube.

Local build
***********

The `ska-cicd-deploy-minikube <https://gitlab.com/ska-telescope/sdi/ska-cicd-deploy-minikube>`_ install a container for a docker registry which expose port 5000 on localhost. While building a new container image, it is important to push to localhost:5000 and pull from $(minikube ip):5000/. To avoid this evaluate the docker environment by running the following command: 

.. code-block::
        :caption: for local build

        eval $(minikube docker_env) # for docker
        eval $(minikube podman-env) # for podman


Other problems
**************

If there's a corporate firewall, it is important to check the variables that can be set for `vpn and proxy <https://minikube.sigs.k8s.io/docs/handbook/vpn_and_proxy/>`__ in minikube.

When deploying minikube, consider to allocate the maximum possible memory and cpu and set the MEM and/or CPUS options of the `ska-cicd-deploy-minikube <https://gitlab.com/ska-telescope/sdi/ska-cicd-deploy-minikube>`_ repository. 

If there network or deployment related issues, try running make minikube-test to expose where things breakdown.

Remember that it is possible to use a PrivateRules.mak file to hold any personal preferences (like MEM/CPUS/DRIVER variables).

Docker rate limiting
********************

Docker implemented rate limiting in November, 2020 so if there is a share of network with other users, it is possible to get messages like: Failed to pull image … desc = Error response from daemon: toomanyrequests: You have reached your pull rate limit.

In this case it is possible to try the Minikube `registry-creds addon <https://minikube.sigs.k8s.io/docs/handbook/registry/>`__.

The docker registry server url would be at https://registry-1.docker.io.

