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

Please not that the installation of minikube may require the selection of images to be downloaded from docker.io or quay.io. Both repositories are good. 

There are other dependencies to install that can be installed by running the following commands:

.. code-block::
        :caption: Install host OS dependencies

        apt update
        apt install -y curl virtualenv git build-essential



Why Kubernetes
##############

The only thing that holds a highly distributed project like SKA together are clear standards and APIs. Kubernetes (and, more in general, containerization) provides a clear abstraction that enables developers to (cheaply) closely imitate production on the desktop for computing, network and storage.

Developers need a simple self-contained environment to support a fast and iterative software development workflow and `Minikube <https://minikube.sigs.k8s.io/docs/start/>`__ can solve this need because it is a local Kubernetes, focusing on making it easy to learn and develop for Kubernetes. 

Consistent minikube development environment
###########################################

There are many ways to setup Minikube and it is important to select one way for SKA so that we don't have divergence from the target platform. 

It is therefore crucial to have consistency in deployments including:

 * Network - not relevant on a single node (we don’t use NetworkPolicies either yet)
 * `StorageClass abstraction <https://kubernetes.io/docs/concepts/storage/storage-classes/>`__
 * Kubernetes Version - feature support
 * Auxillary tooling - kubectl, Helm, K9s - matched versions

It is also important to have support across desktop/laptop hardware/OS and in particular the target will be: 

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

.. code-block::
        :caption: Output of :code:`make all` command

        Minikube v1.24.0 already installed
        kubectl v1.22.4 already installed
        helm v3.7.1 already installed
        Installing k9s version v0.25.7
        % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                        Dload  Upload   Total   Spent    Left  Speed
        100   662  100   662    0     0   2228      0 --:--:-- --:--:-- --:--:--  2221
        100 15.1M  100 15.1M    0     0  10.5M      0  0:00:01  0:00:01 --:--:-- 23.0M
        yq 4.14.1 already installed
        make[1]: Entering directory '/home/matteo/ska-cicd-deploy-minikube'
        make[1]: Leaving directory '/home/matteo/ska-cicd-deploy-minikube'
        make[1]: Entering directory '/home/matteo/ska-cicd-deploy-minikube'
        Minikube status:
        * Profile "minikube" not found. Run "minikube profile list" to view all profiles.
        To start a cluster, run: "minikube start"
        Minikube not running, continuing...
        Using driver: docker with runtime: docker
        Extra ARGS set:
        Local mount: /srv:/srv
        * minikube v1.24.0 on Ubuntu 20.10 (vbox/amd64)
        * Using the docker driver based on user configuration
        ! Your cgroup does not allow setting memory.
        - More information: https://docs.docker.com/engine/install/linux-postinstall/#your-kernel-does-not-support-cgroup-swap-limit-capabilities
        * Starting control plane node minikube in cluster minikube
        * Pulling base image ...
        * Creating docker container (CPUs=2, Memory=4096MB) ...
        * Preparing Kubernetes v1.22.4 on Docker 20.10.8 ...
        - Generating certificates and keys ...
        - Booting up control plane ...
        - Configuring RBAC rules ...
        * Verifying Kubernetes components...
        - Using image ivans3/minikube-log-viewer:latest
        - Using image gcr.io/k8s-minikube/storage-provisioner:v5
        - Using image metallb/controller:v0.9.6
        - Using image metallb/speaker:v0.9.6
        - Using image k8s.gcr.io/metrics-server/metrics-server:v0.4.2
        - Using image k8s.gcr.io/ingress-nginx/kube-webhook-certgen:v1.1.1
        - Using image k8s.gcr.io/ingress-nginx/kube-webhook-certgen:v1.1.1
        - Using image k8s.gcr.io/ingress-nginx/controller:v1.0.4
        * Verifying ingress addon...
        * Enabled addons: default-storageclass, storage-provisioner, metallb, logviewer, metrics-server, ingress
        * Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
        Apply the standard storage classes
        kubectl apply -f ./scripts/sc.yaml
        storageclass.storage.k8s.io/nfs created
        storageclass.storage.k8s.io/nfss1 created
        storageclass.storage.k8s.io/block created
        storageclass.storage.k8s.io/bds1 created
        make[1]: Leaving directory '/home/matteo/ska-cicd-deploy-minikube'
        # must run the following again in make to get vars
        make[1]: Entering directory '/home/matteo/ska-cicd-deploy-minikube'
        Apply the metallb config map - prefix: 192.168.49
        configmap/config configured
        make[1]: Leaving directory '/home/matteo/ska-cicd-deploy-minikube'
        make[1]: Entering directory '/home/matteo/ska-cicd-deploy-minikube'
        make[2]: Entering directory '/home/matteo/ska-cicd-deploy-minikube'
        # Now setup the Proxy to the NGINX Ingress and APIServer, and any NodePort services
        # need to know the device and IP as this must go in the proxy config
        Installing HAProxy frontend to make Minikube externally addressable
        echo "MINIKUBE_IP: 192.168.49.2" && \
        echo "${HAPROXY_CONFIG}" | envsubst > /home/matteo/.minikube/minikube-nginx-haproxy.cfg; \
        export NODE_PORTS="80:80 443:443  "; \
        for i in ${NODE_PORTS}; do \
                export PORT=$(echo "$i" | sed 's/.*://'); echo "Adding proxy for NodePort ${PORT}"; echo "${ADD_HAPROXY_CONFIG}" | sed "s/XPORTX/${PORT}/g" >> /home/matteo/.minikube/minikube-nginx-haproxy.cfg ; \
        export PORTS="${PORTS} -p ${PORT}:${PORT} "; \
        done; \
        if [[ "docker" == "docker" ]]; then \
        sudo --preserve-env=http_proxy --preserve-env=https_proxy /usr/bin/docker run --name minikube-nginx-haproxy --net=minikube \
                -p 6443:6443 ${PORTS} \
                -v /home/matteo/.minikube/minikube-nginx-haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg \
                -d haproxy:2.4 -f /usr/local/etc/haproxy/haproxy.cfg; \
        else \
        sudo --preserve-env=http_proxy --preserve-env=https_proxy /usr/bin/docker run --name minikube-nginx-haproxy --sysctl net.ipv4.ip_unprivileged_port_start=0  \
                -p 6443:6443 ${PORTS} \
                -v /home/matteo/.minikube/minikube-nginx-haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg \
                -d haproxy:2.4 -f /usr/local/etc/haproxy/haproxy.cfg; \
        fi
        MINIKUBE_IP: 192.168.49.2
        Adding proxy for NodePort 80
        Adding proxy for NodePort 443
        8979249bbcc6d4c05c22e9e0d2f37576b9e364ea8a8ffd46048524e26ffa3478
        make[2]: Leaving directory '/home/matteo/ska-cicd-deploy-minikube'
        make[2]: Entering directory '/home/matteo/ska-cicd-deploy-minikube'
        Installing Docker Registry to integrate with Minikube
        b512a55f49f26107433655633d7e620ee7f544a53eaac66aedc325efc6d680fc
        make[2]: Leaving directory '/home/matteo/ska-cicd-deploy-minikube'
        make[1]: Leaving directory '/home/matteo/ska-cicd-deploy-minikube'
        make[1]: Entering directory '/home/matteo/ska-cicd-deploy-minikube'
        Minikube Installed: Yes!
        Helm Installed:     Yes!
        DRIVER:             docker
        RUNTIME:            docker
        CPUS:               2
        MEM:                4096
        OS_NAME:            linux
        OS_ARCH:            x86_64
        OS_BIN:             amd64
        EXE_DIR:            /usr/local/bin
        IPADDR:             193.204.1.149
        MINIKUBE_IP:        192.168.49.2
        HOSTNAME:           MATTDEV
        FQDN:               MATTDEV.local.net
        MOUNT_FROM:         /srv
        MOUNT_TO:           /srv
        PROXY_VERSION:      2.4
        PROXY_CONFIG:       /home/matteo/.minikube/minikube-nginx-haproxy.cfg
        MINIKUBE_VERSION:   v1.24.0
        KUBERNETES_VERSION: v1.22.4
        HELM_VERSION:       v3.7.1
        YQ_VERSION:         4.14.1
        INGRESS:            http://192.168.49.2
        USE_CACHE:
        CACHE_DATA:         /home/matteo/.minikube/registry_cache
        Minikube status:
        minikube
        type: Control Plane
        host: Running
        kubelet: Running
        apiserver: Running
        kubeconfig: Configured

        make[1]: Leaving directory '/home/matteo/ska-cicd-deploy-minikube'

.. code-block::
        :caption: Output of :code:`make minikube-test` command

        export CLASS=nginx; \
        bash ./scripts/test-ingress.sh
        Check the Kubernetes cluster:
        Connecting using KUBECONFIG=

        Version Details:
        Client Version: version.Info{Major:"1", Minor:"22", GitVersion:"v1.22.4", GitCommit:"b695d79d4f967c403a96986f1750a35eb75e75f1", GitTreeState:"clean", BuildDate:"2021-11-17T15:48:33Z", GoVersion:"go1.16.10", Compiler:"gc", Platform:"linux/amd64"}
        Server Version: version.Info{Major:"1", Minor:"22", GitVersion:"v1.22.4", GitCommit:"b695d79d4f967c403a96986f1750a35eb75e75f1", GitTreeState:"clean", BuildDate:"2021-11-17T15:42:41Z", GoVersion:"go1.16.10", Compiler:"gc", Platform:"linux/amd64"}

        List nodes:
        NAME       STATUS   ROLES                  AGE     VERSION   INTERNAL-IP    EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION     CONTAINER-RUNTIME
        minikube   Ready    control-plane,master   2m48s   v1.22.4   192.168.49.2   <none>        Ubuntu 20.04.2 LTS   5.8.0-59-generic   docker://20.10.8

        Check the Ingress connection details:
        Ingress Controller LoadBalancer externalIP is: 192.168.49.2:80


        Show StorageClasses:
        NAME                 PROVISIONER                RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
        bds1                 k8s.io/minikube-hostpath   Delete          Immediate           false                  78s
        block                k8s.io/minikube-hostpath   Delete          Immediate           false                  78s
        nfs                  k8s.io/minikube-hostpath   Delete          Immediate           false                  78s
        nfss1                k8s.io/minikube-hostpath   Delete          Immediate           false                  78s
        standard (default)   k8s.io/minikube-hostpath   Delete          Immediate           false                  2m36s

        Next: show StorageClass details.

        Check Ingress Controller is ready:
        deployment.apps/ingress-nginx-controller condition met

        Deploy the Integration test:persistentvolume/pvtest created
        persistentvolumeclaim/pvc-test created
        configmap/test created
        service/nginx1 created
        deployment.apps/nginx-deployment1 created
        service/nginx2 created
        deployment.apps/nginx-deployment2 created
        ingress.networking.k8s.io/test created
        NAME                                READY   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS   IMAGES   SELECTOR
        deployment.apps/nginx-deployment1   0/3     3            0           1s    nginx        nginx    app=nginx1
        deployment.apps/nginx-deployment2   0/3     3            0           1s    nginx        nginx    app=nginx2

        NAME                                     READY   STATUS    RESTARTS   AGE   IP       NODE     NOMINATED NODE   READINESS GATES
        pod/nginx-deployment1-66cf976cc7-d87m7   0/1     Pending   0          1s    <none>   <none>   <none>           <none>
        pod/nginx-deployment1-66cf976cc7-dts5f   0/1     Pending   0          1s    <none>   <none>   <none>           <none>
        pod/nginx-deployment1-66cf976cc7-gjb22   0/1     Pending   0          1s    <none>   <none>   <none>           <none>
        pod/nginx-deployment2-6c7cf4ffb7-4shzz   0/1     Pending   0          1s    <none>   <none>   <none>           <none>
        pod/nginx-deployment2-6c7cf4ffb7-ghmsq   0/1     Pending   0          1s    <none>   <none>   <none>           <none>
        pod/nginx-deployment2-6c7cf4ffb7-n59jx   0/1     Pending   0          1s    <none>   <none>   <none>           <none>

        NAME             TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE   SELECTOR
        service/nginx1   ClusterIP   10.106.181.100   <none>        80/TCP    1s    app=nginx1
        service/nginx2   ClusterIP   10.107.243.128   <none>        80/TCP    1s    app=nginx2

        NAME                             CLASS    HOSTS           ADDRESS   PORTS   AGE
        ingress.networking.k8s.io/test   <none>   nginx1,nginx2             80      1s

        Next: Check deployment.
        Waiting for resources to deploy...
        deployment.apps/nginx-deployment1 condition met
        deployment.apps/nginx-deployment2 condition met
        service/nginx-deployment1 exposed
        NAME                                READY   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS   IMAGES   SELECTOR
        deployment.apps/nginx-deployment1   3/3     3            3           58s   nginx        nginx    app=nginx1
        deployment.apps/nginx-deployment2   3/3     3            3           58s   nginx        nginx    app=nginx2

        NAME                                     READY   STATUS    RESTARTS   AGE   IP            NODE       NOMINATED NODE   READINESS GATES
        pod/nginx-deployment1-66cf976cc7-d87m7   1/1     Running   0          58s   172.17.0.11   minikube   <none>           <none>
        pod/nginx-deployment1-66cf976cc7-dts5f   1/1     Running   0          58s   172.17.0.3    minikube   <none>           <none>
        pod/nginx-deployment1-66cf976cc7-gjb22   1/1     Running   0          58s   172.17.0.12   minikube   <none>           <none>
        pod/nginx-deployment2-6c7cf4ffb7-4shzz   1/1     Running   0          58s   172.17.0.10   minikube   <none>           <none>
        pod/nginx-deployment2-6c7cf4ffb7-ghmsq   1/1     Running   0          58s   172.17.0.9    minikube   <none>           <none>
        pod/nginx-deployment2-6c7cf4ffb7-n59jx   1/1     Running   0          58s   172.17.0.8    minikube   <none>           <none>

        NAME                        TYPE           CLUSTER-IP       EXTERNAL-IP     PORT(S)        AGE   SELECTOR
        service/nginx-deployment1   LoadBalancer   10.108.154.206   192.168.49.95   80:30278/TCP   1s    app=nginx1
        service/nginx1              ClusterIP      10.106.181.100   <none>          80/TCP         58s   app=nginx1
        service/nginx2              ClusterIP      10.107.243.128   <none>          80/TCP         58s   app=nginx2

        NAME                             CLASS    HOSTS           ADDRESS     PORTS   AGE
        ingress.networking.k8s.io/test   <none>   nginx1,nginx2   localhost   80      58s

        Next: perform write/read test.
        Perform write and then read test to/from shared storage -expected date stamp: Thu Dec 23 10:54:48 CET 2021

        echo "echo 'Thu Dec 23 10:54:48 CET 2021' > /usr/share/nginx/html/index.html" | kubectl -n ${NAMESPACE} exec -i $(kubectl get pods -l app=nginx1 -o name | head -1) -- bash

        Waiting for LoadBalancer ...
        Waiting for external IP
        Found external IP: 192.168.49.95

        Test Ingress -> Deployment: nginx1
        ----------------------------------------nginx1----------------------------------------
        no_proxy=192.168.49.2,localhost curl -s -H "Host: nginx1" http://192.168.49.2:80/
        curl Ingress for nginx1 rc: 0
        Received: Thu Dec 23 10:54:48 CET 2021 == Thu Dec 23 10:54:48 CET 2021 - OK

        Test Ingress -> Deployment: nginx2
        ----------------------------------------nginx2----------------------------------------
        no_proxy=192.168.49.2,localhost curl -s -H "Host: nginx2" http://192.168.49.2:80/
        curl Ingress for nginx2 rc: 0
        Received: Thu Dec 23 10:54:48 CET 2021 == Thu Dec 23 10:54:48 CET 2021 - OK


        Test metallb LoadBalancer
        ----------------------------------nginx-deployment1-----------------------------------
        no_proxy=192.168.49.2,localhost curl -s http://192.168.49.95/
        curl LoadBalancer rc: 0
        Received: Thu Dec 23 10:54:48 CET 2021 == Thu Dec 23 10:54:48 CET 2021 - OK

        Cleanup resources
        ingress.networking.k8s.io "test" deleted
        service "nginx-deployment1" deleted
        service "nginx1" deleted
        deployment.apps "nginx-deployment1" deleted
        service "nginx2" deleted
        deployment.apps "nginx-deployment2" deleted
        persistentvolumeclaim "pvc-test" deleted
        warning: deleting cluster-scoped resources, not scoped to the provided namespace
        persistentvolume "pvtest" deleted
        configmap "test" deleted
        Overall exit code is: 0


It is possible to personalize the installation by setting variables like :code:`MEM` (default 8192MB) or :code:`DRIVER` (default podman; the complete list of variables is available with the command :code:`make`). One way of doing this is to create a file called :code:`PrivateRules.mak` in the root folder of the ska-cicd-deploy-minikube repository. An example of content is the following: 

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

The verification tests will check the services and ingresses, the storage classes installed, the load balancer by installing a pod which writes into a storage and retrieves the content from various different end points. 

Please check the section :ref:`Minikube Problems` for suggestions on how to solve common problems. 

Deploy SKAMPI
#############

Once Minikube is installed and working, it is possible to deploy SKAMPI with the following set of commands:

.. code-block::
        :caption: Clone SKAMPI and update helm

        git clone --recurse-submodules https://gitlab.com/ska-telescope/ska-skampi.git
        cd ska-skampi
        helm repo add ska https://artefact.skao.int/repository/helm-internal # add SKA artefact repository to the helm repositories
        helm repo update
        make k8s-dep-update # update the dependency of chart ska-mid (default)

An optional step to do before the real installation of SKAMPI is to download the container images. From the ska-cicd-deploy-minikube folder repository run the following command: 

.. code-block::
        :caption: Preload ska-mid chart images
        
        # from ska-cicd-deploy-minikube folder
        cd ../ska-cicd-deploy-minikube
        make minikube-load-images K8S_CHARTS=../ska-skampi/charts/ska-mid/

To avoid any conflicts with python create a virtual environment. 

Use poetry to create a virtual environment in the skampi project with the following commands:

.. code-block::

        cd ../ska-skampi
        poetry shell

If you don't have poetry you can create an virtual environenment with the following commands, make sure that your environment uses **python3.9**:
.. code-block::
        :caption: Create virtual environment
        
        # from ska-skampi folder
        cd ../ska-skampi
        virtualenv venv
        source venv/bin/activate



Finally install ska-mid with the following command: 

.. code-block::
        :caption: Install ska-mid of SKAMPI

        make k8s-install-chart K8S_CHART=ska-mid KUBE_NAMESPACE=ska-mid

.. code-block::
        :caption: Output of :code:`make k8s-install-chart` command

        k8s-dep-update: updating dependencies
        +++ Updating ska-mid chart +++
        Hang tight while we grab the latest from your chart repositories...
        ...Successfully got an update from the "elastic" chart repository
        ...Successfully got an update from the "ska" chart repository
        Update Complete. ⎈Happy Helming!⎈
        Saving 7 charts
        Downloading ska-tango-base from repo https://artefact.skao.int/repository/helm-internal
        Downloading ska-tango-util from repo https://artefact.skao.int/repository/helm-internal
        Downloading ska-tmc-centralnode from repo https://artefact.skao.int/repository/helm-internal
        Downloading ska-taranta from repo https://artefact.skao.int/repository/helm-internal
        Downloading ska-taranta-auth from repo https://artefact.skao.int/repository/helm-internal
        Downloading ska-dashboard-repo from repo https://artefact.skao.int/repository/helm-internal
        Deleting outdated charts
        namespace/ska-mid created
        install-chart: install ./charts/ska-mid/  release: test in Namespace: ska-mid with params: --set ska-tango-base.xauthority= --set global.minikube=true --set global.tango_host=databaseds-tango-base:10000 --set global.cluster_domain=cluster.local --set global.device_server_port=45450 --set ska-tango-base.itango.enabled=false --set ska-sdp.helmdeploy.namespace=integration-sdp --set ska-tango-archiver.hostname= --set ska-tango-archiver.dbname= --set ska-tango-archiver.port= --set ska-tango-archiver.dbuser= --set ska-tango-archiver.dbpassword=  --set ska-taranta.enabled=false
        helm upgrade --install test \
        --set ska-tango-base.xauthority="" --set global.minikube=true --set global.tango_host=databaseds-tango-base:10000 --set global.cluster_domain=cluster.local --set global.device_server_port=45450 --set ska-tango-base.itango.enabled=false --set ska-sdp.helmdeploy.namespace=integration-sdp --set ska-tango-archiver.hostname= --set ska-tango-archiver.dbname= --set ska-tango-archiver.port= --set ska-tango-archiver.dbuser= --set ska-tango-archiver.dbpassword=  --set ska-taranta.enabled=false \
        ./charts/ska-mid/  --namespace ska-mid; \
        rm -f gilab_values.yaml
        Release "test" does not exist. Installing it now.
        NAME: test
        LAST DEPLOYED: Thu Dec 23 11:19:53 2021
        NAMESPACE: ska-mid
        STATUS: deployed
        REVISION: 1
        TEST SUITE: None



In general, deploying Skampi can be hard since it requires many images (some large), the components launched are highly interdependent (TangoDB -> DatabaseDS -> Configuration Job -> a TANGO Device Server depends on the configuration job which depends on the DatabaseDS which depends on the TangoDB) and there are frequent timeout issues and race conditions.

These are complex issues, but caching and pre-loading container images can help (as shown in the code above). This can also be done with individual images with the following commands:

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
        :caption: Check with K9s if all the Pods are healthy

        k9s --namespace ska-mid --command pods # press ctrl-c to exit the tool

The http link to access the SKA landing page can be found by calling :code:`make skampi-links`. 

Testing SKAMPI
**************

In order to test SKAMPI, run the following commands: 

.. code-block::
        :caption: run the defined test cycle against Kubernetes

        make python-pre-test
        make k8s-test KUBE_NAMESPACE=ska-mid K8S_TIMEOUT=600s

.. code-block::
        :caption: Output of :code:`make k8s-test` command

        k8s-test: start test runner: test-runner-local -n ska-mid
        k8s-test: sending test folder: tar -cz  tests/
        ( cd /home/matteo/ska-skampi; tar -cz  tests/ \
        | kubectl run test-runner-local -n ska-mid --restart=Never --pod-running-timeout=600s --image-pull-policy=IfNotPresent --image=artefact.skao.int/ska-ser-skallop:2.9.1 --env=INGRESS_HOST=k8s.stfc.skao.int  -iq -- /bin/bash -o pipefail -c " mkfifo results-pipe && tar zx --warning=all && ( if [[ -f pyproject.toml ]]; then poetry export --format requirements.txt --output poetry-requirements.txt --without-hashes --dev; echo 'k8s-test: installing poetry-requirements.txt';  pip install -qUr poetry-requirements.txt; cd tests; else if [[ -f tests/requirements.txt ]]; then echo 'k8s-test: installing tests/requirements.txt'; pip install -qUr tests/requirements.txt; fi; fi ) && cd tests && export PYTHONPATH=:/app/src && mkdir -p build && ( make -s SKUID_URL=ska-ser-skuid-test-svc.ska-mid.svc.cluster.local:9870 KUBE_NAMESPACE=ska-mid HELM_RELEASE=test TANGO_HOST=databaseds-tango-base:10000 CI_JOB_TOKEN= MARK='not infra' COUNT=1 FILE='' SKA_TELESCOPE='SKA-Mid' CENTRALNODE_FQDN='ska_mid/tm_central/central_node' SUBARRAYNODE_FQDN_PREFIX='ska_mid/tm_subarray_node' OET_READ_VIA_PUBSUB=true JIRA_AUTH= CAR_RAW_USERNAME= CAR_RAW_PASSWORD= CAR_RAW_REPOSITORY_URL= TARANTA_USER=user1 TARANTA_PASSWORD=abc123 TARANTA_PASSPORT=abc123 KUBE_HOST=192.168.49.2   test ); echo \$? > build/status; pip list > build/pip_list.txt; echo \"k8s_test_command: test command exit is: \$(cat build/status)\"; tar zcf ../results-pipe build;" 2>&1 \
        | grep -vE "^(1\||-+ live log)" --line-buffered &); \
        sleep 1; \
        echo "k8s-test: waiting for test runner to boot up: test-runner-local -n ska-mid"; \
        ( \
        kubectl wait pod test-runner-local -n ska-mid --for=condition=ready --timeout=600s; \
        wait_status=$?; \
        if ! [[ $wait_status -eq 0 ]]; then echo "Wait for Pod test-runner-local -n ska-mid failed - aborting"; exit 1; fi; \
        ) && \
                echo "k8s-test: test-runner-local -n ska-mid is up, now waiting for tests to complete" && \
                (kubectl exec test-runner-local -n ska-mid -- cat results-pipe | tar --directory=/home/matteo/ska-skampi -xz); \
        \
        cd /home/matteo/ska-skampi/; \
        (kubectl get all,job,pv,pvc,ingress,cm -n ska-mid -o yaml > build/k8s_manifest.txt); \
        echo "k8s-test: test run complete, processing files"; \
        kubectl --namespace ska-mid delete --ignore-not-found pod test-runner-local --wait=false
        k8s-test: waiting for test runner to boot up: test-runner-local -n ska-mid
        pod/test-runner-local condition met
        k8s-test: test-runner-local -n ska-mid is up, now waiting for tests to complete
        k8s-test: installing tests/requirements.txt
        ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
        flake8 3.9.2 requires pycodestyle<2.8.0,>=2.7.0, but you have pycodestyle 2.6.0 which is incompatible.
        WARNING: Running pip as the 'root' user can result in broken permissions and conflicting behaviour with the system package manager. It is recommended to use a virtual environment instead: https://pip.pypa.io/warnings/venv
        KUBE_NAMESPACE: ska-mid
        pytest 6.2.5
        ============================= test session starts ==============================
        platform linux -- Python 3.9.6, pytest-6.2.5, py-1.10.0, pluggy-1.0.0 -- /usr/local/bin/python3.9
        cachedir: .pytest_cache
        metadata: {'Python': '3.9.6', 'Platform': 'Linux-5.8.0-59-generic-x86_64-with', 'Packages': {'pytest': '6.2.5', 'py': '1.10.0', 'pluggy': '1.0.0'}, 'Plugins': {'timeout': '2.0.2', 'xdist': '2.4.0', 'repeat': '0.9.1', 'cov': '2.12.1', 'ska-ser-skallop': '2.11.2', 'ordering': '0.6', 'bdd': '5.0.0', 'forked': '1.3.0', 'pycodestyle': '2.2.0', 'json-report': '1.4.1', 'pylint': '0.18.0', 'mock': '3.6.1', 'metadata': '1.11.0', 'pydocstyle': '2.2.0'}}
        rootdir: /app/tests, configfile: pytest.ini
        plugins: timeout-2.0.2, xdist-2.4.0, repeat-0.9.1, cov-2.12.1, ska-ser-skallop-2.11.2, ordering-0.6, bdd-5.0.0, forked-1.3.0, pycodestyle-2.2.0, json-report-1.4.1, pylint-0.18.0, mock-3.6.1, metadata-1.11.0, pydocstyle-2.2.0
        collecting ... collected 5 items / 1 deselected / 4 selected

        tests/integration/test_tango_basic.py::test_tangogql_service_available SKIPPED [ 25%]
        tests/integration/test_tango_basic.py::test_taranta_dashboard_services_available SKIPPED [ 50%]
        tests/integration/test_tango_basic.py::test_taranta_devices_service_available SKIPPED [ 75%]
        tests/integration/test_xray_upload.py::test_skampi_ci_pipeline_tests_execute_on_skampi PASSED [100%]

        ---------------- generated json file: /app/build/cucumber.json -----------------
        ------------------ generated xml file: /app/build/report.xml -------------------
        --------------------------------- JSON report ----------------------------------
        report saved to: build/report.json
        ============ 1 passed, 3 skipped, 1 deselected, 6 warnings in 1.47s ============
        test: status is (0)
        k8s_test_command: test command exit is: 0
        k8s-test: test run complete, processing files
        pod "test-runner-local" deleted
        k8s-test: the test run exit code is (0)
        k8s-post-test: Skampi post processing of core Skampi test reports with scripts/collect_k8s_logs.py
        Test file tests/smoke/test_mvp_clean.py not found locally! Check SKBX-000 classifier!
        Test file tests/acceptance/end_uses/maintain_telescope/switch_on_of_controller_elements/test_mvp_start_up.py not found locally! Check SKBX-000 classifier!
        Test file tests/smoke/test_devices.py not found locally! Check SKBX-002 classifier!
        Test file tests/smoke/test_devices.py not found locally! Check SKBX-002 classifier!
        Test file tests/smoke/test_landing_page_loads.py not found locally! Check SKBX-003 classifier!
        Test file tests/smoke/test_landing_page_loads.py not found locally! Check SKBX-003b classifier!
        Test file tests/smoke/test_logging_namespace.py not found locally! Check SKBX-004 classifier!
        Test file tests/smoke/test_logging_namespace.py not found locally! Check SKBX-005 classifier!
        Test file tests/smoke/test_validate_device_spec.py not found locally! Check SKBX-006 classifier!
        Test file tests/smoke/test_validate_device_spec.py not found locally! Check SKBX-006b classifier!
        Test file tests/acceptance/end_uses/conduct_observation/configure_scan/test_XR-13_A2-Test.py not found locally! Check SKBX-007 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/edit_subarray_resources/test_XR-13_A1.py not found locally! Check SKBX-007 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/configure_scan/test_XR-13_A2-Test.py not found locally! Check SKBX-007b classifier!
        Test file tests/acceptance/end_uses/conduct_observation/edit_subarray_resources/test_XR-13_A1.py not found locally! Check SKBX-007b classifier!
        Test file tests/acceptance/end_uses/conduct_observation/run_a_scan/test_XTP-1561.py not found locally! Check SKBX-008 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/run_a_scan/test_XTP-826.py not found locally! Check SKBX-009 classifier!
        Test file tests/acceptance/end_uses/monitor_observation/test_XTP-1772.py not found locally! Check SKBX-009 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/edit_subarray_resources/test_XTP-776_XTP-782.py not found locally! Check SKBX-009 classifier!
        Test file tests/smoke/test_mvp_clean.py not found locally! Check SKBX-010 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/edit_subarray_resources/test_XR-13_A1.py not found locally! Check SKBX-011 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/configure_scan/test_XR-13_A2-Test.py not found locally! Check SKBX-011 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/configure_scan/test_XR-13_A2-Test.py not found locally! Check SKBX-013 classifier!
        Test file tests/acceptance/end_uses/maintain_telescope/switch_on_of_controller_elements/test_mvp_start_up.py not found locally! Check SKBX-014 classifier!
        Test file tests/acceptance/end_uses/maintain_telescope/switch_on_of_controller_elements/test_mvp_start_up.py not found locally! Check SKBX-014b classifier!
        Test file tests/acceptance/end_uses/conduct_observation/edit_subarray_resources/test_XR-13_A1.py not found locally! Check SKBX-015 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/edit_subarray_resources/test_XR-13_A4-Test.py not found locally! Check SKBX-015 classifier!
        Test file tests/acceptance/end_uses/maintain_subarray/restart_aborted_subarray/test_XTP-1106.py not found locally! Check SKBX-015 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/run_a_scan/test_XTP-826.py not found locally! Check SKBX-015 classifier!
        Test file tests/acceptance/end_uses/monitor_observation/reset_an_aborted_observation/test_XTP-1096.py not found locally! Check SKBX-015 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/run_a_scan/test_XTP-1561.py not found locally! Check SKBX-015b classifier!
        Test file tests/acceptance/end_uses/conduct_observation/test_XTP-813.py not found locally! Check SKB-31 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/configure_scan/test_XR-13_A2-Test.py not found locally! Check SKBX-017 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/configure_scan/test_XR-13_A2-Test.py not found locally! Check SKBX-019 classifier!
        Test file tests/acceptance/end_uses/monitor_observation/reset_an_aborted_observation/test_XTP-1096.py not found locally! Check SKBX-020 classifier!
        Test file tests/smoke/test_mvp_clean.py not found locally! Check SKBX-024 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/test_XTP-813.py not found locally! Check SKBX-025a classifier!
        Test file tests/acceptance/end_uses/conduct_observation/test_XTP-813.py not found locally! Check SKBX-025b classifier!
        Test file tests/smoke/test_mvp_clean.py not found locally! Check SKBX-026 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/edit_subarray_resources/test_XR-13_A1.py not found locally! Check SKBX-027 classifier!
        Test file tests/acceptance/end_uses/maintain_telescope/switch_on_of_controller_elements/test_mvp_start_up.py not found locally! Check SKBX-027 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/edit_subarray_resources/test_XR-13_A1.py not found locally! Check SKBX-027b classifier!
        Test file tests/acceptance/end_uses/maintain_telescope/switch_on_of_controller_elements/test_mvp_start_up.py not found locally! Check SKBX-027b classifier!
        Test file tests/acceptance/end_uses/conduct_observation/edit_subarray_resources/test_XR-13_A1.py not found locally! Check SKBX-027c classifier!
        Test file tests/acceptance/end_uses/maintain_telescope/switch_on_of_controller_elements/test_mvp_start_up.py not found locally! Check SKBX-027c classifier!
        Test file tests/acceptance/end_uses/conduct_observation/configure_scan/test_XR-13_A2-Test.py not found locally! Check SKBX-027d classifier!
        Test file tests/acceptance/end_uses/conduct_observation/run_a_scan/test_XTP-826.py not found locally! Check SKBX-029 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/configure_scan/test_XR-13_A2-Test.py not found locally! Check SKBX-029b classifier!
        Test file tests/acceptance/end_uses/conduct_observation/run_a_scan/test_XTP-826.py not found locally! Check SKBX-029b classifier!
        Test file tests/acceptance/end_uses/conduct_observation/run_a_scan/test_XTP-1561.py not found locally! Check SKBX-029b classifier!
        Test file tests/acceptance/end_uses/conduct_observation/test_XTP-776_XTP-777-779.py not found locally! Check SKBX-029c classifier!
        Test file tests/acceptance/end_uses/maintain_telescope/switch_on_of_controller_elements/test_mvp_start_up.py not found locally! Check SKBX-030 classifier!
        Test file tests/acceptance/end_uses/monitor_observation/reset_an_aborted_observation/test_XTP-1096.py not found locally! Check SKBX-031 classifier!
        Test file tests/acceptance/end_uses/maintain_subarray/restart_aborted_subarray/test_XTP-1106.py not found locally! Check SKBX-031 classifier!
        Test file tests/acceptance/end_uses/monitor_observation/test_XTP-1772.py not found locally! Check SKBX-031 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/run_a_scan/test_XTP-826.py not found locally! Check SKBX-032 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/run_a_scan/test_XTP-1561.py not found locally! Check SKBX-033 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/configure_scan/test_XR-13_A2-Test.py not found locally! Check SKBX-033 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/run_a_scan/test_XTP-826.py not found locally! Check SKBX-033 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/configure_scan/test_XR-13_A2-Test.py not found locally! Check SKBX-034 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/configure_scan/test_XR-13_A2-Test.py not found locally! Check SKB-050 classifier!
        Test file tests/smoke/test_logging_namespace.py not found locally! Check SKBX-035 classifier!
        Test file tests/smoke/test_logging_namespace.py not found locally! Check SKBX-035b classifier!
        Test file tests/acceptance/end_uses/conduct_observation/edit_subarray_resources/test_XR-13_A1.py not found locally! Check SKBX-036 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/edit_subarray_resources/test_XR-13_A1.py not found locally! Check SKBX-037 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/configure_scan/test_XR-13_A2-Test.py not found locally! Check SKBX-038 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/configure_scan/test_XR-13_A2-Test.py not found locally! Check SKBX-038b classifier!
        Test file tests/acceptance/end_uses/monitor_observation/test_XTP-1772.py not found locally! Check SKBX-038b classifier!
        Test file tests/acceptance/end_uses/maintain_telescope/switch_on_of_controller_elements/test_XTP-776_XTP-780-781.py not found locally! Check SKBX-039 classifier!
        Test file tests/smoke/test_validate_device_spec.py not found locally! Check SKBX-040 classifier!
        Test file tests/smoke/test_validate_device_spec.py not found locally! Check SKBX-040 classifier!
        Test file tests/smoke/test_mvp_clean.py not found locally! Check SKBX-043 classifier!
        Test file tests/acceptance/end_uses/conduct_observation/test_XTP-776_XTP-777-779.py not found locally! Check SKBX-047 classifier!
        Test file tests/smoke/test_validate_bdd_tests.py not found locally! Check SKBX-049 classifier!
        Test file tests/acceptance/integration/test_XTP-1079.py not found locally! Check SKBX-050 classifier!
        Test file tests/smoke/test_mvp_clean.py not found locally! Check SKBX-053 classifier!
        Obtaining logs from 9 pods on namespace ska-mid...
        centralnode-01-0: 15xINFO, 3xDEBUG, 6453xERROR
        ... 7513 lines read
        Obtaining events from namespace ska-mid...
        ... 138 events: 126xNormal, 12xWarning
        Obtaining logs from 0 pods on namespace integration-sdp...
        ... 0 lines read
        Obtaining events from namespace integration-sdp...
        ... 0 events:
        Pretty-printing to build/k8s_pretty.txt...
        Dumping JSON to build/k8s_dump.txt...
        Writing test report to build/k8s_tests.txt...

The above commands will start a new pod in the target namespace to run the tests against a deployed environment in the same way that python-test runs in a local context. The default configuration runs pytest against the tests defined in ./tests. By default, this will pickup any pytest specific configuration set in pytest.ini, setup.cfg etc. located in ./tests.

The result of the command will log the specific command executed, the requirements installed, the tests output and the classification of the tests. 

It is also possible to run component tests by running the below command:

.. code-block::
        :caption: iterate over Skampi component tests defined as make targets

        make skampi-component-tests KUBE_NAMESPACE=ska-mid K8S_TIMEOUT=600s

.. code-block::
        :caption: Output of :code:`make skampi-component-tests` command

        Collecting junitparser
        Downloading junitparser-2.3.0-py2.py3-none-any.whl (10 kB)
        Processing /home/matteo/.cache/pip/wheels/8e/70/28/3d6ccd6e315f65f245da085482a2e1c7d14b90b30f239e2cf4/future-0.18.2-py3-none-any.whl
        Installing collected packages: future, junitparser
        Successfully installed future-0.18.2 junitparser-2.3.0
        skampi-component-tests: copying old build files to previous
        skampi-component-tests: Running test in Component: skampi-test-01centralnode
        make[1]: Entering directory '/home/matteo/ska-skampi'
        make[2]: Entering directory '/home/matteo/ska-skampi'
        skampi-k8s-test: start test runner: test-skampi-test-01centralnode -n ska-mid
        skampi-k8s-test: sending test folder: tar -cz tests/
        ( cd /home/matteo/ska-skampi; tar --exclude tests/integration  --exclude tests/resources  --exclude tests/unit  --exclude tests/conftest.py  --exclude tests/pytest.ini -cz tests/ \
        | kubectl run test-skampi-test-01centralnode -n ska-mid --restart=Never --pod-running-timeout=600s --image-pull-policy=IfNotPresent --image=artefact.skao.int/ska-tmc-centralnode:0.3.5 --env=INGRESS_HOST=k8s.stfc.skao.int  -iq -- /bin/bash -o pipefail -c " mkfifo results-pipe && tar zx --warning=all && ( if [[ -f pyproject.toml ]]; then poetry export --format requirements.txt --output poetry-requirements.txt --without-hashes --dev; echo 'k8s-test: installing poetry-requirements.txt';  pip install -qUr poetry-requirements.txt; cd tests; else if [[ -f tests/requirements.txt ]]; then echo 'k8s-test: installing tests/requirements.txt'; pip install -qUr tests/requirements.txt; fi; fi ) && cd tests && export PYTHONPATH=:/app/src && mkdir -p build && ( make -s SKUID_URL=ska-ser-skuid-test-svc.ska-mid.svc.cluster.local:9870 KUBE_NAMESPACE=ska-mid HELM_RELEASE=test TANGO_HOST=databaseds-tango-base:10000 CI_JOB_TOKEN= MARK='SKA_mid and acceptance' COUNT=1 FILE='' SKA_TELESCOPE='SKA-Mid' CENTRALNODE_FQDN='ska_mid/tm_central/central_node' SUBARRAYNODE_FQDN_PREFIX='ska_mid/tm_subarray_node' OET_READ_VIA_PUBSUB=true JIRA_AUTH= CAR_RAW_USERNAME= CAR_RAW_PASSWORD= CAR_RAW_REPOSITORY_URL= TARANTA_USER=user1 TARANTA_PASSWORD=abc123 TARANTA_PASSPORT=abc123 KUBE_HOST=192.168.49.2   test ); echo \$? > build/status; pip list > build/pip_list.txt; echo \"k8s_test_command: test command exit is: \$(cat build/status)\"; tar zcf ../results-pipe build;" 2>&1 \
        | grep -vE "^(1\||-+ live log)" --line-buffered &); \
        sleep 1; \
        echo "skampi-k8s-test: waiting for test runner to boot up: test-skampi-test-01centralnode -n ska-mid"; \
        ( \
        kubectl wait pod test-skampi-test-01centralnode -n ska-mid --for=condition=ready --timeout=600s; \
        wait_status=$?; \
        if ! [[ $wait_status -eq 0 ]]; then echo "Wait for Pod test-skampi-test-01centralnode -n ska-mid failed - aborting"; exit 1; fi; \
        ) && \
                echo "skampi-k8s-test: test-skampi-test-01centralnode -n ska-mid is up, now waiting for tests to complete" && \
                (kubectl exec test-skampi-test-01centralnode -n ska-mid -- cat results-pipe | tar --directory=/home/matteo/ska-skampi -xz); \
        \
        cd /home/matteo/ska-skampi/; \
        (kubectl get all,job,pv,pvc,ingress,cm -n ska-mid -o yaml > build/k8s_manifest.txt); \
        echo "skampi-k8s-test: test run complete, processing files"; \
        kubectl --namespace ska-mid delete --ignore-not-found pod test-skampi-test-01centralnode --wait=false
        skampi-k8s-test: waiting for test runner to boot up: test-skampi-test-01centralnode -n ska-mid
        pod/test-skampi-test-01centralnode condition met
        skampi-k8s-test: test-skampi-test-01centralnode -n ska-mid is up, now waiting for tests to complete
        k8s-test: installing poetry-requirements.txt
        ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
        sphinx-autobuild 2021.3.14 requires colorama, which is not installed.
        KUBE_NAMESPACE: ska-mid
        pytest 6.2.5
        PyTango 9.3.3 (9, 3, 3)
        PyTango compiled with:
        Python : 3.7.3
        Numpy  : 1.19.2
        Tango  : 9.3.4
        Boost  : 1.67.0

        PyTango runtime is:
        Python : 3.7.3
        Numpy  : 1.17.2
        Tango  : 9.3.4

        PyTango running on:
        uname_result(system='Linux', node='test-skampi-test-01centralnode', release='5.8.0-59-generic', version='#66-Ubuntu SMP Thu Jun 17 00:46:01 UTC 2021', machine='x86_64', processor='')

        ============================= test session starts ==============================
        platform linux -- Python 3.7.3, pytest-6.2.5, py-1.11.0, pluggy-1.0.0 -- /usr/bin/python3
        cachedir: .pytest_cache
        metadata: {'Python': '3.7.3', 'Platform': 'Linux-5.8.0-59-generic-x86_64-with-debian-10.10', 'Packages': {'pytest': '6.2.5', 'py': '1.11.0', 'pluggy': '1.0.0'}, 'Plugins': {'forked': '1.3.0', 'bdd': '5.0.0', 'json-report': '1.4.1', 'xdist': '2.4.0', 'mock': '3.6.1', 'metadata': '1.11.0', 'repeat': '0.9.1', 'cov': '2.12.1', 'pycodestyle': '2.2.0', 'pylint': '0.18.0', 'pydocstyle': '2.2.0'}}
        rootdir: /app/tests, configfile: pytest.ini
        plugins: forked-1.3.0, bdd-5.0.0, json-report-1.4.1, xdist-2.4.0, mock-3.6.1, metadata-1.11.0, repeat-0.9.1, cov-2.12.1, pycodestyle-2.2.0, pylint-0.18.0, pydocstyle-2.2.0
        collecting ...
        2021-12-23T10:40:40.620Z|DEBUG|MainThread|__init__|parse.py#837||format 'a CentralNode device' -> 'a CentralNode device'
        2021-12-23T10:40:40.621Z|DEBUG|MainThread|__init__|parse.py#837||format 'I call the command {command_name}' -> 'I call the command (?P<command_name>.+?)'
        2021-12-23T10:40:40.622Z|DEBUG|MainThread|__init__|parse.py#837||format 'the command is queued and executed in less than {seconds} ss' -> 'the command is queued and executed in less than (?P<seconds>.+?) ss'
        collected 189 items / 183 deselected / 6 selected

        tests/acceptance/test_central_node.py::test_ability_to_run_commands_on_central_node[Off] <- ../../home/tango/.local/lib/python3.7/site-packages/pytest_bdd/scenario.py PASSED [1/6]
        tests/acceptance/test_central_node.py::test_ability_to_run_commands_on_central_node[Standby] <- ../../home/tango/.local/lib/python3.7/site-packages/pytest_bdd/scenario.py PASSED [2/6]
        tests/acceptance/test_central_node.py::test_ability_to_run_commands_on_central_node[StartUpTelescope] <- ../../home/tango/.local/lib/python3.7/site-packages/pytest_bdd/scenario.py PASSED [3/6]
        tests/acceptance/test_central_node.py::test_ability_to_run_commands_on_central_node[StandByTelescope] <- ../../home/tango/.local/lib/python3.7/site-packages/pytest_bdd/scenario.py PASSED [4/6]
        tests/acceptance/test_central_node.py::test_ability_to_run_commands_on_central_node[TelescopeStandby] <- ../../home/tango/.local/lib/python3.7/site-packages/pytest_bdd/scenario.py PASSED [5/6]
        tests/acceptance/test_central_node.py::test_monitor_telescope_components <- ../../home/tango/.local/lib/python3.7/site-packages/pytest_bdd/scenario.py PASSED [6/6]

        ---------------- generated json file: /app/build/cucumber.json -----------------
        ------------ generated xml file: /app/build/reports/unit-tests.xml -------------
        --------------------------------- JSON report ----------------------------------
        report saved to: build/reports/report.json

        ----------- coverage: platform linux, python 3.7.3-final-0 -----------
        Name                                                            Stmts   Miss Branch BrPart  Cover
        -------------------------------------------------------------------------------------------------
        src/ska_tmc_centralnode/__init__.py                                 7      0      0      0   100%
        src/ska_tmc_centralnode/central_node.py                           219    140     34      0    31%
        src/ska_tmc_centralnode/central_node_low.py                        61     28      4      1    52%
        src/ska_tmc_centralnode/central_node_mid.py                       113     50      6      1    54%
        src/ska_tmc_centralnode/commands/__init__.py                        0      0      0      0   100%
        src/ska_tmc_centralnode/commands/abstract_command.py              256    226     96      0     9%
        src/ska_tmc_centralnode/commands/assign_resources_command.py      135    123     64      0     6%
        src/ska_tmc_centralnode/commands/release_resources_command.py      72     64     32      0     8%
        src/ska_tmc_centralnode/commands/stow_antennas_command.py          53     43     22      0    13%
        src/ska_tmc_centralnode/commands/telescope_off_command.py          82     72     26      0     9%
        src/ska_tmc_centralnode/commands/telescope_on_command.py           54     46     10      0    12%
        src/ska_tmc_centralnode/commands/telescope_standby_command.py      82     72     26      0     9%
        src/ska_tmc_centralnode/dev_factory.py                             17      8      6      0    39%
        src/ska_tmc_centralnode/exceptions.py                              11      3      0      0    73%
        src/ska_tmc_centralnode/input_validator.py                         62     49     14      0    17%
        src/ska_tmc_centralnode/manager/__init__.py                         0      0      0      0   100%
        src/ska_tmc_centralnode/manager/adapters.py                        66     32     10      0    45%
        src/ska_tmc_centralnode/manager/aggregators.py                    163    143     98      0     8%
        src/ska_tmc_centralnode/manager/command_executor.py                55     39      6      0    26%
        src/ska_tmc_centralnode/manager/component_manager.py              184    142     60      0    17%
        src/ska_tmc_centralnode/manager/event_receiver.py                  61     47     16      0    18%
        src/ska_tmc_centralnode/manager/monitoring_loop.py                 86     67     24      0    17%
        src/ska_tmc_centralnode/model/__init__.py                           0      0      0      0   100%
        src/ska_tmc_centralnode/model/component.py                        236    179     84      0    18%
        src/ska_tmc_centralnode/model/enum.py                               5      0      2      0   100%
        src/ska_tmc_centralnode/model/input.py                            159    116     70      0    19%
        src/ska_tmc_centralnode/model/op_state_model.py                    19      9      2      0    48%
        src/ska_tmc_centralnode/release.py                                 10      0      0      0   100%
        -------------------------------------------------------------------------------------------------
        TOTAL                                                            2268   1698    712      2    19%
        Coverage HTML written to dir build/reports/htmlcov
        Coverage XML written to file build/reports/code-coverage.xml

        ====================== 6 passed, 183 deselected in 6.21s =======================
        test: status is (0)
        k8s_test_command: test command exit is: 0
        skampi-k8s-test: test run complete, processing files
        pod "test-skampi-test-01centralnode" deleted
        skampi-k8s-test: the test run exit code is (0)
        make[2]: Leaving directory '/home/matteo/ska-skampi'
        make[1]: Leaving directory '/home/matteo/ska-skampi'
        skampi-component-tests: result for Component: skampi-test-01centralnode is (0)
        skampi-component-tests: process reports for Component: skampi-test-01centralnode

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
        :caption: list services of namespace ska-mid 

        $ kubectl get svc -n ska-mid
        NAME                             TYPE           CLUSTER-IP       EXTERNAL-IP     PORT(S)                         AGE
        centralnode-01                   NodePort       10.111.138.249   <none>          45450:32502/TCP                 22m
        databaseds-tango-base            NodePort       10.103.187.147   <none>          10000:31476/TCP                 22m
        databaseds-tango-base-external   LoadBalancer   10.111.7.246     192.168.49.95   10000:32488/TCP                 22m
        ska-landingpage                  ClusterIP      10.103.68.128    <none>          80/TCP                          22m
        ska-tango-base-tango-rest        NodePort       10.96.137.62     <none>          8080:30690/TCP                  22m
        ska-tango-base-tangodb           NodePort       10.99.156.238    <none>          3306:30200/TCP                  22m
        ska-tango-base-vnc-gui           NodePort       10.100.93.121    <none>          5920:32169/TCP,6081:31811/TCP   22m
        tangotest-test                   NodePort       10.97.123.232    <none>          45450:31346/TCP                 22m

.. code-block::
        :caption: list pods of namespace ska-mid

        $ kubectl get pod -n ska-mid
        NAME                                         READY   STATUS      RESTARTS      AGE
        centralnode-01-0                             1/1     Running     4 (19m ago)   22m
        centralnode-config--1-h697x                  0/1     Completed   0             22m
        databaseds-tango-base-0                      1/1     Running     2 (21m ago)   22m
        ska-landingpage-685d6b54f6-mzpdt             1/1     Running     0             22m
        ska-tango-base-tango-rest-78fb595ffb-nml5v   1/1     Running     0             22m
        ska-tango-base-tangodb-0                     1/1     Running     0             22m
        ska-tango-base-vnc-gui-0                     1/1     Running     0             22m
        tangotest-config--1-dp6b8                    0/1     Completed   0             22m
        tangotest-test-0                             1/1     Running     0             22m


.. code-block::
        :caption: describe a pod in namespace ska-mid

        $ kubectl describe pod -n ska-mid ska-tango-base-tangodb-0
        Name:         ska-tango-base-tangodb-0
        Namespace:    ska-mid
        Priority:     0
        Node:         minikube/192.168.49.2
        Start Time:   Thu, 23 Dec 2021 11:20:06 +0100
        Labels:       app=ska-tango-images
                component=tangodb
                controller-revision-hash=ska-tango-base-tangodb-675fdfbb66
                domain=tango-configuration
                function=tango-device-configuration
                intent=production
                statefulset.kubernetes.io/pod-name=ska-tango-base-tangodb-0
        Annotations:  app.gitlab.com/app: skampi
                app.gitlab.com/env: ska
                skampi: true
        Status:       Running
        IP:           172.17.0.12
        IPs:
        IP:           172.17.0.12
        Controlled By:  StatefulSet/ska-tango-base-tangodb
        Containers:
        tangodb:
        Container ID:   docker://f933728a394fca3534801d6cdd98ca8ba6b913d6029b262344cab99be6856aa3
        Image:          artefact.skao.int/ska-tango-images-tango-db:10.4.14
        Image ID:       docker://sha256:a8319068d382e8d8deed7fea2c14398e3215895edef38b7bef9a8b8a4d5a6f9d
        Port:           3306/TCP
        Host Port:      0/TCP
        State:          Running
        Started:      Thu, 23 Dec 2021 11:20:25 +0100
        Ready:          True
        Restart Count:  0
        Limits:
        cpu:                200m
        ephemeral-storage:  2Gi
        memory:             256Mi
        Requests:
        cpu:                100m
        ephemeral-storage:  1Gi
        memory:             256Mi
        Environment:
        MYSQL_ROOT_PASSWORD:         secret
        MYSQL_DATABASE:              tango
        MYSQL_USER:                  tango
        MYSQL_PASSWORD:              tango
        MYSQL_ALLOW_EMPTY_PASSWORD:  1
        Mounts:
        /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-rkbth (ro)
        Conditions:
        Type              Status
        Initialized       True
        Ready             True
        ContainersReady   True
        PodScheduled      True
        Volumes:
        kube-api-access-rkbth:
        Type:                    Projected (a volume that contains injected data from multiple sources)
        TokenExpirationSeconds:  3607
        ConfigMapName:           kube-root-ca.crt
        ConfigMapOptional:       <nil>
        DownwardAPI:             true
        QoS Class:                   Burstable
        Node-Selectors:              <none>
        Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                                node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
        Events:
        Type    Reason     Age   From               Message
        ----    ------     ----  ----               -------
        Normal  Scheduled  22m   default-scheduler  Successfully assigned ska-mid/ska-tango-base-tangodb-0 to minikube
        Normal  Pulled     22m   kubelet            Container image "artefact.skao.int/ska-tango-images-tango-db:10.4.14" already present on machine
        Normal  Created    22m   kubelet            Created container tangodb
        Normal  Started    22m   kubelet            Started container tangodb

.. code-block::
        :caption: logs of a pod in namespace ska-mid

        $ kubectl logs -n ska-mid ska-tango-base-tangodb-0 --tail 10
        2021-12-23 10:21:35 0 [Note] InnoDB: Loading buffer pool(s) from /var/lib/mysql/ib_buffer_pool
        2021-12-23 10:21:35 0 [Note] Plugin 'FEEDBACK' is disabled.
        2021-12-23 10:21:35 0 [Warning] You need to use --log-bin to make --expire-logs-days or --binlog-expire-logs-seconds work.
        2021-12-23 10:21:35 0 [Note] Server socket created on IP: '0.0.0.0'.
        2021-12-23 10:21:35 0 [Note] Server socket created on IP: '::'.
        2021-12-23 10:21:35 0 [Warning] 'proxies_priv' entry '@% root@ska-tango-base-tangodb-0' ignored in --skip-name-resolve mode.
        2021-12-23 10:21:35 0 [Note] InnoDB: Buffer pool(s) load completed at 211223 10:21:35
        2021-12-23 10:21:35 0 [Note] mysqld: ready for connections.
        Version: '10.6.4-MariaDB-1:10.6.4+maria~focal'  socket: '/run/mysqld/mysqld.sock'  port: 3306  mariadb.org binary distribution
        2021-12-23 10:21:35 3 [Warning] Aborted connection 3 to db: 'unconnected' user: 'unauthenticated' host: '172.17.0.1' (This connection closed normally without authentication)

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

For Linux and WSL2, it is possible to configure a local cache by running the following command:

.. code-block::
        :caption: Use a intermediate cache based on nginx

        # from ska-cicd-deploy-minikube folder
        cd ska-cicd-deploy-minikube
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

