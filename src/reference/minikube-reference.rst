Deploy Minikube Reference
=========================

Looking into the `Minikube setup <https://gitlab.com/ska-telescope/sdi/ska-cicd-deploy-minikube>`_ repository, we can find the following useful variables:

- ``BIN_DIR``: Directory where the Minikube DRIVER is installed
- ``EXE_DIR``: Directory where Minikube and tools (e.g., kubectl, helm) are installed
- ``DRIVER``: Driver used to spin up the VM where Minikube runs. Defaults to **podman** on Linux/WSL and **hyperkit** on macOS. For Apple Sillicon, use **docker**
- ``RUNTIME``: OCI engine used within the VM. Defaults to **docker**
- ``NODES``: Number of (VM) Nodes for Minikube to create and join to the cluster
- ``CPUS``: Number of (v)CPUs to allocate to Minikube
- ``MEM``: Amount of RAM in MB to allocate to Minikube
- ``MINIKUBE_VERSION``: Minikube version to install
- ``KUBERNETES_VERSION``: Kubernetes version to create the Minikube cluster
- ``HELM_VERSION``: Helm version to install
- ``HELMFILE_VERSION``: Helmfile version to install
- ``K9S_VERSION``: K9s version to install
- ``YQ_VERSION``: YQ version to install
- ``METALLB_VERSION``: Metallb version to deploy
- ``SKA_TANGO_OPERATOR_ENABLED``: Flag to do or skip the SKA Tango Operator deployment
- ``SKA_TANGO_OPERATOR_VERSION``: SKA Tango Operator version to deploy

Also, the following make targets are available:

- ``all``: Set up the environment and deploy the Minikube cluster with all the addons
- ``minikube-vars``: List public variables and Minikube status
- ``minikube-setup``: Install command-line tools for Minikube
- ``minikube-install``: Install Minikube and configure the Kubernetes cluster by installing StorageClasses, Metallb, ExternalDNS and other addons
- ``minikube-clean``: Delete the Minikube cluster and associated resources
- ``minikube-tools``: Install the Ingress/Load Balancer (``minikube-haproxy``) to expose HTTP and HTTPS ingress ports on the host and the OCI registry (``minikube-registry``)
- ``minikube-storage-classes``: Sets up StorageClasses to support the creation of PVCs
- ``minikube-metallb-config``: Configures Metallb to expose LoadBalancer Services in separate interfaces
- ``minikube-tango-operator``: Deploys the SKA Tango Operator to enable the deployment of DeviceServer and DatabaseDS (CRDs)
- ``minikube-extdns``: Deploys the ExternalDNS server to expose the names of LoadBalancer services to the host
- ``minikube-update-dns``: Updates the host DNS with the configurations to use ExternalDNS for **svc.cluster.local** queries
