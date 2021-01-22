Getting Started
===============

I want to..
--------------------------

Add a new project to SKA organisation
`````````````````````````````````````

* Our project details can be found in the section about how to :ref:`create-new-project`.

Develop a Tango device
``````````````````````

* A sample PyTango device project that can be forked can be found at `<https://gitlab.com/ska-telescope/tango-example/>`_
* Documentation for it can be found at `<https://developer.skatelescope.org/projects/tango-example/en/latest/?badge=latest>`_

Containerise my solution
````````````````````````

Our containerisation standards can be found in the `containerisation <https://developer.skatelescope.org/en/latest/development/containerisation-standards.html#container-standards-cheatsheet>`_ section.

* Verify Docker installation
   * `Docker installation instructions <https://docs.docker.com/install/linux/docker-ce/ubuntu>`_:

.. code:: bash

  $ docker -v

    Docker version 1.7.0, build 0baf609

.. _verify-k8s:

Incorporate my project into the integration environment
``````````````````````````````````````````````````````````

We use Kubernetes as orchestration layer - refer to our :ref:`Orchestration Guidelines <orchestration-guide>`.

Once a project is ready to form part of the integrated solution, we need to verify that all prerequisites are installed and working properly.

* Verify kubectl installation
    * `kubectl installation instructions <https://kubernetes.io/docs/tasks/tools/install-kubectl/>`_.

.. code:: bash

  $ kubectl version

    Client Version: version.Info{Major:"1", Minor:"15", GitVersion:"v1.15.1", GitCommit:"4485c6f18cee9a5d3c3b4e523bd27972b1b53892",
    GitTreeState:"clean", BuildDate:"2019-07-18T09:18:22Z", GoVersion:"go1.12.5", Compiler:"gc", Platform:"linux/amd64"}
    The connection to the server localhost:8080 was refused - did you specify the right host or port?

* Verify Minikube installation
    * `Minikube installation instructions <https://kubernetes.io/docs/tasks/tools/install-minikube/>`_.

.. code:: bash

  $ minikube

    Minikube is a CLI tool that provisions and manages single-node Kubernetes clusters optimized for development workflows...

* Launch Kubernetes.
    * Look out for `kubectl is now configured to use "minikube"` near the end:

.. code:: bash

  $ sudo -E minikube start --vm-driver=none --extra-config=kubelet.resolv-conf=/var/run/systemd/resolve/resolv.conf

  😄  minikube v0.34.1 on linux (amd64)
  🤹  Configuring local host environment ...

  ⚠️  The 'none' driver provides limited isolation and may reduce system security and reliability.
  ⚠ ️  For more information, see:
  👉  https://gitlab.com/kubernetes/minikube/blob/master/docs/vmdriver-none.md

  ⚠️  kubectl and minikube configuration will be stored in /home/ubuntu
  ⚠️  To use kubectl or minikube commands as your own user, you may
  ⚠️  need to relocate them. For example, to overwrite your own settings:

    ▪ sudo mv /home/ubuntu/.kube /home/ubuntu/.minikube $HOME
    ▪ sudo chown -R $USER /home/ubuntu/.kube /home/ubuntu/.minikube

 💡  This can also be done automatically by setting the env var CHANGE_MINIKUBE_NONE_USER=true
 🔥  Creating none VM (CPUs=2, Memory=2048MB, Disk=20000MB) ...
 📶  "minikube" IP address is 192.168.86.29
 🐳  Configuring Docker as the container runtime ...
 ✨  Preparing Kubernetes environment ...
    ▪ kubelet.resolv-conf=/var/run/systemd/resolve/resolv.conf
 🚜  Pulling images required by Kubernetes v1.13.3 ...
 🚀  Launching Kubernetes v1.13.3 using kubeadm ...
 🔑  Configuring cluster permissions ...
 🤔  Verifying component health .....
 💗  kubectl is now configured to use "minikube"
 🏄  Done! Thank you for using minikube

Test that the connectivity in the cluster works

.. code:: bash

  $ kubectl get pods -n kube-system
  NAME                               READY   STATUS    RESTARTS   AGE
  coredns-86c58d9df4-5ztg8           1/1     Running   0          3m24s
  ...


* Verify Helm installation
    * `Helm installation instructions <https://helm.sh/docs/intro/install/>`_

.. code:: bash

  $ helm version
  version.BuildInfo{Version:"v3.1.2", GitCommit:"d878d4d45863e42fd5cff6743294a11d28a9abce", GitTreeState:"clean", GoVersion:"go1.13.8"}

  ...

.. note:: 
  Until recently, we have been using Helm 2 in all our Ansible Playbooks for provisioning machines and development environments. Helm 2 used Tiller as a deployment service, and would be started in your environment by running the ``helm init`` command. **This is no longer the case with Helm 3.** `More info here <https://dev.to/ridaehamdani/some-changes-between-helm-v2-and-helm-v3-that-you-should-know-32ga>`_ .

  Use this `ansible playbook <https://developer.skatelescope.org/projects/ansible-playbooks/en/latest/playbooks/upgrade_helm.html>`_ to upgrade your existing Helm 2 to Helm 3.


Once Helm is installed, develop a helm chart for the project. Refer to `Helm instructions <https://developer.skatelescope.org/en/latest/development/orchestration-guidelines.html#templating-the-application>`_ for guidelines.

.. _Helm Chart Repository: https://nexus.engageska-portugal.pt/#browse/browse:helm-chart
.. _SKAMPI: https://gitlab.com/ska-telescope/skampi

Install Helm charts from our own repository
```````````````````````````````````````````

The SKAMPI_ repository is in essence a configuration management repository, which basically just consists of a number of Helm charts and instructions for installing them on a kubernetes cluster.

Installing Helm charts from our own `Helm Chart Repository`_ is another option, specifically that enables installing different charts during run-time.

To add the SKA Helm chart repo to your local Helm, simply run

.. code:: bash

 $ helm repo add skatelescope https://nexus.engageska-portugal.pt/repository/helm-chart

Working with the Helm chart repository, including how to package and upload charts to our repository, is described :ref:`here in detail <helm_chart_repo>`.

Deploy the TMC prototype and Webjive in kubernetes
```````````````````````````````````````````````````

The integration gitlab repository can be found at `<https://gitlab.com/ska-telescope/skampi>`_.

Documentation on deployment can be found at `<https://developer.skatelescope.org/projects/skampi/en/latest/README.html>`_

Add the helm chart to the skampi repository: `Integration instructions <https://developer.skatelescope.org/en/latest/development/orchestration-guidelines.html#integrating-a-chart-into-the-skampi-repo>`_.

* Verify k8s integration
    * Launch the integration environment

.. code:: bash

  $  make deploy_all KUBE_NAMESPACE=integration

and verify that the pods are able to startup without any errors

.. code:: bash

  $ watch kubectl get all,pv,pvc,ingress -n integration

  Every 2.0s: kubectl get all,pv,pvc -n integration           osboxes: Fri Mar 29 09:25:05 2019

  NAME                                          READY   STATUS             RESTARTS   AGE
  pod/databaseds-integration-tmc-webui-test-0   1/1     Running            3          117s
  pod/rsyslog-integration-tmc-webui-test-0      1/1     Running            0          117s
  podtangodb-integration-tmc-webui-test-0      1/1     Running            0          117s
  pod/tangotest-integration-tmc-webui-test      1/1     Running            2          117s
  pod/tmcprototype-integration-tmc-webui-test   4/5     CrashLoopBackOff   2          117s
  pod/webjive-integration-tmc-webui-test-0      4/4     Running            0          117s
  ...


