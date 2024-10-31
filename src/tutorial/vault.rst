.. _tutorial-vault:

Use Vaults secrets in Kubernetes
================================

Vault allows multiple ways of reading secrets - cli, the UI itself, :ref:`Gitlab <tutorial-vault-gitlab-integration>` or Kubernetes integrations - in order to give developers maximum flexibility while maintaining maximum security. To support Kubernetes native integrations, we previously provided **Vault Injector** and **Vault CSI Driver**, which have lots of shortcomings that sometimes make their use impractical, and are currently **deprecated** in SKAO.

In this tutorial, you'll learn how to setup Vault and synchronize secrets in Kubernetes from Vault using the `Vault Secrets Operator <https://developer.hashicorp.com/vault/tutorials/kubernetes/vault-secrets-operator>`_ - VSO - which is a direct replacement of the previous solutions whith a much richer featureset.

We will cover:

.. contents::
   :depth: 2
   :local:

Prerequisites
-------------

- :ref:`Minikube <tutorial-setup-minikube>` cluster up and running
- `Vault CLI <https://developer.hashicorp.com/vault/tutorials/getting-started/getting-started-install>`_
- `Stern <https://github.com/stern/stern/releases>`_

.. note::

   Run all commands from a shell in **ska-cicd-deploy-minikube** repository as we are using parts of it for this tutorial

Deploy Vault into Minikube
--------------------------

The first step we need to do is to have a working Kubernetes cluster with Vault. It is already part of the ska-cicd-deploy-minikube repository, but needs to be manually deployed:

.. code-block:: bash

   make all # Deploy the minikube cluster

   make vault-deploy
   make vault-ui-url # port forward to the local machine the Vault UI

Verify that Vault was deployed properly and you can access it. If you close the shell, you will lose the port-forwarding that is giving you access to the UI. To regain it, simply run `make vault-ui-url` again. To log into the UI, simply use the token `root`.

Create test KV engine and configure Kubernetes cluster access
-------------------------------------------------------------

We need to create and populate a test KV engine:

.. code-block:: bash

   eval $(make vault-cli-config)

   # Enable kv engine
   vault secrets enable -path=test-kv kv-v2
   vault secrets list

   # Write data to the kv engine
   vault kv put -mount=test-kv myservice/myapp username="admin" password="secretpassword"

   # Read data from the kv engine
   vault kv get test-kv/myservice/myapp

Now that we have a working Vault instance with test data, we need to configure the access from the Kubernetes cluster:

.. code-block:: bash

   make vault-k8s-integration

We can inspect the policy that this target created by doing:

.. code-block:: bash

   eval $(make vault-cli-config)
   vault policy read k8spolicy

Note that it doesn't have access to our **test-kv** engine. We will need to address that later.

Deploy the Vault Secrets Operator
---------------------------------

Now we need to deploy the **Vault Secrets Operator**. We can also then if the connection to Vault has been properly made:

.. code-block:: bash

   make vault-deploy-secrets-operator

   # Inspect the connection to Vault
   kubectl get vaultconnection default -n vault -o jsonpath='{.status}'

   # Inspect the connection to Vault
   kubectl get vaultauth default -n vault -o jsonpath='{.status}'

Next, we will be able to create Kubernetes objects - VaultStaticSecret - that will synchronize Vault secrets into Kubernetes secrets.

Create a VaultStaticSecret resource
-----------------------------------

After setting up the access between Kubernetes and Vault and having VSO configured properly, it is time to create a **VaultStaticSecret** resource. This resource allows Kubernetes to fetch static secrets from Vault and use them within the cluster.

Here is an example `VaultStaticSecret <https://developer.hashicorp.com/vault/docs/platform/k8s/vso/api-reference#vaultstaticsecret>`_ resource definition:

.. code-block:: bash

   kubectl apply -f - << EOF
   apiVersion: secrets.hashicorp.com/v1beta1
   kind: VaultStaticSecret
   metadata:
     name: test-secret
     namespace: default
   spec:
     refreshAfter: 10s
     path: myservice/myapp
     type: kv-v2
     mount: test-kv
     destination:
       name: myapp-secret
       create: true
   EOF

Note that the **destination** is set to `myapp-secret`, which will be the Kubernetes secret created. We can check the status of our vault secret by doing:

.. code-block:: bash

   kubectl describe vaultstaticsecret/test-secret

Which should throw:

.. code-block:: bash

   Events:
   Type     Reason            Age   From               Message
   ----     ------            ----  ----               -------
   Warning  VaultClientError  3s    VaultStaticSecret  Failed to read Vault secret: Error making API request.

   URL: GET http://192.168.49.97:8200/v1/test-kv/data/myservice/myapp
   Code: 403. Errors:

   * 1 error occurred:
      * permission denied

As we mentioned earlier, the policy `k8spolicy` didn't give access to our new KV engine, so we need to address that. To know more about policies, please visit Vault's `policy documentation <https://developer.hashicorp.com/vault/docs/concepts/policies>`_:

.. code-block:: bash

   eval $(make vault-cli-config)
   vault policy read k8spolicy >> /tmp/k8spolicy.hcl
   cat <<EOF >> /tmp/k8spolicy.hcl
   # Permissions for our test kv engine
   path "test-kv/*" {
     capabilities = ["read", "list"]
   }
   EOF
   vault policy write k8spolicy /tmp/k8spolicy.hcl
   rm /tmp/k8spolicy.hcl

Now, if we can describe again our `vaultstaticsecret/test-secret`:

.. code-block:: bash

   Status:
      Last Generation:  2
      Secret MAC:       bZM+H43B61LyiLqeeNQokhDVxfwnyjVNmeOCz9NFZGc=
   Events:
      Type    Reason         Age   From               Message
      ----    ------         ----  ----               -------
      Normal  SecretSynced   2s    VaultStaticSecret  Secret synced
      Normal  SecretRotated  2s    VaultStaticSecret  Secret synced

Now Vault was able to synchornize the secret after authentication to the cluster is in place and the role that VSO is using has permissions to access the secret we are looking for.

Transform secrets
-----------------

You can verify that the secret was created in Kubernetes by running:

.. code-block:: bash

   kubectl get secret myapp-secret -o yaml

Note that the synchronized secret also has the **.raw** field, which contains the complete information on the Vault secret.

.. code-block:: bash

   kubectl get secret myapp-secret -o jsonpath='{.data._raw}' | base64 -d

Vault Secrets Operator introduces a `transformation <https://developer.hashicorp.com/vault/docs/platform/k8s/vso/secret-transformation>`_ feature that allows active manipulation of data. This allows to create more complex data fields based on secret data. We can also exclude and/or include fields in the synchronization.

Lets configure our VaultStaticSecret to exclude the `.raw` and `password` fields. Also, we want to add a field named `basicAuth` to be the `basic authentication <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization#basic_authentication>`_ representation of the username and password:

.. code-block:: bash

   kubectl apply -f - << EOF
   apiVersion: secrets.hashicorp.com/v1beta1
   kind: VaultStaticSecret
   metadata:
     name: test-secret
     namespace: default
   spec:
     refreshAfter: 10s
     path: myservice/myapp
     type: kv-v2
     mount: test-kv
     destination:
       name: myapp-secret
       create: true
       overwrite: true
       labels:
         skao.int/tutorial: secrets
       transformation:
         excludeRaw: true
         excludes:
           - password
         templates:
           basicAuth:
             text: >-
               {{- b64enc (printf "%s:%s" (get .Secrets "username") (get .Secrets "password")) -}}
   EOF

We can now see the `password` and `.raw` fields are no longer present. We can also validate the `basicAuth` field:

.. code-block:: bash

   kubectl get secret myapp-secret -o yaml
   kubectl get secret myapp-secret -o jsonpath='{.data.basicAuth}' | base64 -d | base64 -d

Automatic secret synchronization
--------------------------------

Picking on the previous example, we can experiment changing the password in Vault, and see the synchornization happening in real time. We can do that using a simple pod running a bash script. Note that in Kubernetes, secrets mounted as volumes are **automatically updated**, while environment variables are not:

.. code-block:: bash

   kubectl apply -f - << EOF
   apiVersion: v1
   kind: Pod
   metadata:
     name: myapp-pod
   spec:
     containers:
       - name: myapp-container
         image: bash
         command: ["/usr/local/bin/bash", "-c"]
         args:
           - |
             counter=0;
             while true;
             do
               echo -e "\$counter | basicAuth=\$(cat /etc/myapp-secret/basicAuth | base64 -d)";
               ((counter++))
               sleep 1;
             done
         volumeMounts:
           - name: myapp-secret-volume
             mountPath: "/etc/myapp-secret"
             readOnly: true
     volumes:
       - name: myapp-secret-volume
         secret:
           secretName: myapp-secret
   EOF

Using three shells, one can observe the pod's logs, the state of the secret and change the value in Vault:

.. code-block:: bash

   # Shell #1: Change value in Vault
   eval $(make vault-cli-config)
   vault kv put -mount=test-kv myservice/myapp username="<username>" password="<password>"

   # Shell #2: Watch the secret
   watch "kubectl get secret myapp-secret -o jsonpath='{.data.basicAuth}' | base64 -d | base64 -d"

   # Shell #3: Watch logs
   kubectl logs -f myapp-pod

You might notice that, even though the secret has been updated, it is not propagated right away to the pod. Depending on the cluster setup, this can take some minutes to happen.

Secrets live update and deployment rollout
------------------------------------------

To overcome the time it might take for the secret to update in the actual pod, we can use VaultStaticSecret `rolloutRestartTargets` to automatically rollout an update to a resource of type `Deployment`, `DaemonSet`, `StatefulSet`.

.. code-block:: bash


   # Delete previous pod
   kubectl delete pod myapp-pod

   # Create deployment
   kubectl apply -f - << EOF
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: myapp-deployment
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: myapp
     template:
       metadata:
         labels:
           app: myapp
       spec:
         containers:
           - name: myapp-container
             image: bash
             command: ["/usr/local/bin/bash", "-c"]
             args:
               - |
                 counter=0;
                 while true;
                 do
                   echo -e "\$counter | basicAuth=\$(cat /etc/myapp-secret/basicAuth | base64 -d)";
                   ((counter++))
                   sleep 1;
                 done
             volumeMounts:
               - name: myapp-secret-volume
                 mountPath: "/etc/myapp-secret"
                 readOnly: true
         volumes:
           - name: myapp-secret-volume
             secret:
               secretName: myapp-secret
   EOF

Now, we can patch our `VaultStaticSecret` accordingly so that it does a rollout on our deployment upon an update of the secret:

.. code-block:: bash

   kubectl apply -f - << EOF
   apiVersion: secrets.hashicorp.com/v1beta1
   kind: VaultStaticSecret
   metadata:
     name: test-secret
     namespace: default
   spec:
     refreshAfter: 10s
     path: myservice/myapp
     type: kv-v2
     mount: test-kv
     rolloutRestartTargets:
       - kind: Deployment
         name: myapp-deployment
     destination:
       name: myapp-secret
       create: true
       overwrite: true
       labels:
         skao.int/tutorial: secrets
       transformation:
         excludeRaw: true
         excludes:
           - password
         templates:
           basicAuth:
             text: >-
               {{- b64enc (printf "%s:%s" (get .Secrets "username") (get .Secrets "password")) -}}
   EOF

Again, using two shells, we can observe the deployment's logs and change the value in Vault. To facilitate viewing the logs of multiple pods in a deployment, we can use `stern <https://github.com/stern/stern/releases>`_:

.. code-block:: bash

   # Shell #1: Change value in Vault
   eval $(make vault-cli-config)
   vault kv put -mount=test-kv myservice/myapp username="<username>" password="<password>"

   # Shell #3: Watch logs
   stern -l app=myapp -t --since 1m

As we can see, after a few seconds (at most, the VaultStaticSecret's `refreshAfter`) of us changing the secret in Vault, there is a new pod for our deployment getting created. This pod, will have the latest contents of the secret. Remember that, since we can mount secrets as volumes (essentially files) in pods, we can use Vault to inject full configuration files and automatically rotate workloads when those change.

Using secrets with TANGO Devices
--------------------------------

Now that we've covered the essentials of setting up and working with Vault and Kubernetes in generic terms, we can cover how we can do it with TANGO Devices. In SKAO deployments, `ska-tango-util <https://gitlab.com/ska-telescope/ska-tango-charts/-/tree/main/charts/ska-tango-util?ref_type=heads>`_ chart is used as a template chart to deploy all the required components of a TANGO device in Kubernetes, regardless of the use of the `SKA Tango Operator <https://gitlab.com/ska-telescope/ska-tango-operator>`_. The deployment has the following stages:

#. Configure the Device Server with the TANGO Database
#. Wait for dependencies to start the Device Server
#. Run the Device Server

With the SKA TANGO Operator enabled, the Operator itself takes care of the first two steps. If not, ska-tango-util will create - per Device Server - a Kubernetes **job** to handle the configuration and another to handle dependencies. The recommended way of deploying is using the operator, as it is does things optimally, severely improving the deployment reliability and reducing deployment times. 


Typically, a chart with device servers is composed by:

::

   ├── Chart.yaml
   ├── data
   │   ├── someDevice.yaml
   │   └── ...
   ├── templates
   │   ├── deviceservers.yaml
   ...

Where the `templates/deviceservers.yaml` will use the templates in `ska-tango-util` to generate the Kubernetes resources required to run a Device Server. In the `data` directory, we find the definitions of the device servers themselves. Lets look at an example **device server**:

.. code-block:: yaml

   instances: ["test"]
   entrypoints:
     - name: "someclass.SomeClass"
       path: "/app/src/someclass.py"
   server:
     instances:
       - name: "test"
         classes:
         - name: "SomeClass"
           devices:
           - name: "test/someclass/1"
             properties:
             - name: "deviceProperty"
               values:
               - "test"
   class_properties:
     - name: "SomeClass"
       properties:
         - name: "aClassProperty"
           values: ["10", "20"]
         - name: "anotherClassProperty"
           values: ["test", "test2"]
   secrets:
   - secretPath: dev/skao-team-system/vault-tutorial
     env:
     - secretKey: env
       envName: TEST
       default: "minikube-case"

We can add a `secrets` entry per device server, letting you inject secret keys in Vault as environment variables in the Device Server. In the future, we expect to provide more functionality to leverage VSO's **transform** and to allow mounting secrets as files. Please refer to the `TANGO examples <https://gitlab.com/ska-telescope/ska-tango-examples>`_ for up-to-date and more in depth examples.
