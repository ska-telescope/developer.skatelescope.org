.. _minikube: https://kubernetes.io/docs/setup/learning-environenment/minikube

=======================================
Verifying the k8s installation on Linux
=======================================

As part of our efforts to provide developers with an easy way for them to integrate
their TANGO devices into the `kubernetes integration <https://github.com/ska-telescope/k8s-integration>`_
enviroment we have detailed some few steps a developer will need to execute in order to ensure that kubernetes
was installed properly and that they are able to startup the helm chart.


Docker
------

The developer has to make sure that docker is installed on their machine, instructions on how to install integrate
it can be found `here <https://docs.docker.com/install/linux/docker-ce/ubuntu>`_ . To confirm that the installation
was a success, the developer can run the following shell command:

.. code:: bash

  $ docker -v

    Docker version 1.7.0, build 0baf609

Minikube
--------

The generic installation instructions are available at https://kubernetes.io/docs/tasks/tools/install-minikube/. Minikube
requires that you have kubectl installed.

.. code:: bash

  $ kubectl version

    Client Version: version.Info{Major:"1", Minor:"15", GitVersion:"v1.15.1", GitCommit:"4485c6f18cee9a5d3c3b4e523bd27972b1b53892",
    GitTreeState:"clean", BuildDate:"2019-07-18T09:18:22Z", GoVersion:"go1.12.5", Compiler:"gc", Platform:"linux/amd64"}
    The connection to the server localhost:8080 was refused - did you specify the right host or port?

.. code:: bash

  $ minikube

    Minikube is a CLI tool that provisions and manages single-node Kubernetes clusters optimized for development workflows...

Once you confirm that minikube has been installed properly then check if you can start up properly:

.. code:: bash   

  $ sudo -E minikube start --vm-driver=none --extra-config=kubelet.resolv-conf=/var/run/systemd/resolve/resolv.conf

  😄  minikube v0.34.1 on linux (amd64)
  🤹  Configuring local host environment ...

  ⚠️  The 'none' driver provides limited isolation and may reduce system security and reliability.
  ⚠ ️  For more information, see:
  👉  https://github.com/kubernetes/minikube/blob/master/docs/vmdriver-none.md

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


Helm
----

.. code:: bash

  $ helm 

  The Kubernetes package manager

  To begin working with Helm, run the 'helm init' command:

	    $ helm init
  ...


k8s-integration
---------------

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