Setup Minikube for local development
====================================

`Kubernetes <https://kubernetes.io/>`_ is the SKAO's container orchestrator of choice, as it brings a full-featured clustering and resource orchestration solution. Running a Kubernetes cluster requires substantial computing power, making it unsuitable for most development scenarios. For that reason, there are several lightweight single-node implementations of Kubernetes available.
`Minikube <https://minikube.sigs.k8s.io/docs/>`_ is an open-source tool that allows you to run Kubernetes locally. It runs a single-node Kubernetes cluster inside a VM that can be powered by a container or other virtualization solutions, making it simple to setup and lightweight enough for most development machines.

We have created a `Minikube setup <https://gitlab.com/ska-telescope/sdi/ska-cicd-deploy-minikube>`_ with useful addons to power local development on Kubernetes. These addons include:

- **Developer Tools**: Common developer tools like **kubectl**, **k9s** and **helm**
- **Ingress/Load Balancer**: Load Balancer that exposes both HTTP (port 80) and HTTPS (port 443) ports on your host machine. This is helpful if you want to expose your cluster ingresses to the outside world
- **OCI Registry**: OCI Registry making to allow locally-built images to be used within the Minikube cluster
- **Metallb**: Allows to expose on a specific IP each of the Kubernetes **services** of type **LoadBalancer** by deploying `Metallb <https://metallb.universe.tf/>`_
- **Extdns**: External DNS server to expose the FQDNs (Fully Qualified Domain Name) of the Kubernetes LoadBalancer services supported by Metallb
- **DNS Configuration**: For **systemd-resolved** enabled Linux systems, automatically updates the DNS to resolve **svc.cluster.local** queries
- **Tango Operator**: Enables DeviceServer and DatabaseDS resources (CRDs) to be deployed to the cluster using the `SKA Tango Operator <https://gitlab.com/ska-telescope/ska-tango-operator>`_

These addons are packaged to try and mimic the setup and tools available in the SKAO development clusters. To know more about what can be changed an what make targets are available, please check :doc:`/reference/deploy-minikube-reference`.

Prerequisites
-------------

Head over to :doc:`/howto/install-oci-engines` where we show how to install one of the suggested engines before setting up the Minikube cluster. If you do not install the suggested OCI engine, you need to make changes in the Minikube setup below.

Getting started
---------------

Before we can create the cluster, we need an OCI engine running. :

1. Clone the repository:

   .. code-block:: bash

      git clone git@gitlab.com:ska-telescope/sdi/ska-cicd-deploy-minikube.git
      git submodule update --recursive --init

2. Create a customization file at the root directory of the repository:

   .. code-block:: bash

      touch PrivateRules.mak

3. Define the Minikube driver in **PrivateRules.mak**:
   
**Linux/WSL**

   .. code-block:: bash

      DRIVER=<podman,docker depending on the OCI engine you setup in the Prerequisites section>

**macOS**

.. note::
  Given the recent updates to the macOS platform, setting up Minikube in macOS is not fully functional. If you face any issues, raise a `support ticket <https://jira.skatelescope.org/servicedesk/customer/portal/166>`_. For Apple Silicon platforms, you must use **DRIVER=docker**. Note that currently, setting up the ExternalDNS service is **NOT** working. For encrypted filesystems, you must use **DRIVER=kvm2**. For more information, check the repository `README <https://gitlab.com/ska-telescope/developer.skatelescope.org/-/merge_requests/271>`_. 

4. Deploy the Minikube cluster and the bundled addons

   .. code-block:: bash

      make all

5. Inspect the cluster

   .. code-block:: bash

      kubectl get nodes

Checking the addons
-------------------

Now you have an operational Kubernetes cluster. If the installation make target ran successfuly, we've checked for you that the addons are correctly working. Now, lets test it ourselves.


Ingress/LoadBalancer
~~~~~~~~~~~~~~~~~~~~

We can use the already deployed SKA Tango Operator and query its metric server:

   .. code-block:: bash

      curl localhost:80/ska-tango-operator/metrics

Metallb
~~~~~~~

We can use the already deployed SKA Tango Operator and query its metric server, using the IP published by Metallb. Note that in the previous example, we've used the cluster ingress controller. Now we are talking directly to Metallb LoadBalancer instead:

   .. code-block:: bash

      SERVICE_IP=$(kubectl get svc -n ska-tango-operator ska-tango-operator-controller-manager-metrics-service -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
      curl $SERVICE_IP:8080/metrics  

ExternalDNS
~~~~~~~~~~~

To expose the service FQDNs that are Kubernetes services of type **LoadBalancer**, we've deployed ExternalDNS. To test that, you can query the built-in DNS server:

   .. code-block:: bash

      EXTDNS_IP=$(kubectl get svc -n extdns extdns-coredns -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
      dig @$EXTDNS_IP ska-tango-operator-controller-manager-metrics-service.ska-tango-operator.svc.cluster.local

Exposing Minikube to the outside world
--------------------------------------

To share an application with people and machines outside of your local network, there are applications that we can use to expose a local server. Most commonly used, we have `Ngrok <https://ngrok.com/>`_ or `Localtunnel <https://theboroer.github.io/localtunnel-www//>`_. Let's `set up Ngrok <https://ngrok.com/docs/getting-started/>`_ that first requires a free account. Afterwards, we can:

   .. code-block:: bash

      ngrok http 80

The details of the exposed port will be shown in the current shell:

    .. code-block:: bash

      ngrok                                                                                                                                                                                            (Ctrl+C to quit)                                                                                                                                                                                                                 Build better APIs with ngrok. Early access: ngrok.com/early-access

      Session Status                online
      Account                       pedroosorio.eeic@gmail.com (Plan: Free)
      Update                        update available (version 3.4.0, Ctrl-U to update)
      Version                       3.3.4
      Region                        Europe (eu)
      Latency                       -
      Web Interface                 http://127.0.0.1:4040
      Forwarding                    https://67f2-161-230-113-1.ngrok-free.app -> http://localhost:80

      Connections                   ttl     opn     rt1     rt5     p50     p90
                                    0       0       0.00    0.00    0.00    0.00

Without **closing** the shell, your cluster's ingress is now exposed - using HTTPS - under `https://67f2-161-230-113-1.ngrok-free.app`.

The same can be done, for instance, to expose any HTTP server in the cluster. If that is exported as a **Service** of type **LoadBalancer**, we can directly expose using:

   .. code-block:: bash

      ngrok http http://<loadbalancer ip>:<loadbalancer port>

To know more about the Minikube setup, please refer to the repository's `README <https://gitlab.com/ska-telescope/developer.skatelescope.org/-/merge_requests/271>`_.