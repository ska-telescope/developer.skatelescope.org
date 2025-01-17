.. _tutorial-vault:

Use Vaults secrets in Kubernetes
================================

Vault allows multiple ways of reading secrets - cli, the UI itself, :ref:`GitLab <tutorial-vault-gitlab-integration>` or Kubernetes integrations - in order to give developers maximum flexibility while maintaining maximum security.

.. note::

   **Vault Injector** and **Vault CSI Driver** are currently **deprecated** in SKAO, their support will be terminated by Sprint #2 of PI 25.

In this tutorial, you'll learn how to set up Vault and synchronise secrets in Kubernetes from Vault using the `Vault Secrets Operator <https://developer.hashicorp.com/vault/tutorials/kubernetes/vault-secrets-operator>`_ - VSO - which is a direct replacement of the previous solutions with a much richer featureset.

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

The first step we need to do is to have a working Kubernetes cluster with Vault. It is already part of the ska-cicd-deploy-minikube repository but needs to be manually deployed:

.. code-block:: bash
   :caption: Deploy the minikube cluster, Vault and VSO

   make all # Deploy the minikube cluster

   make vault-deploy
   make vault-ui-url # port forward the Vault UI to the local machine

Verify that Vault was successfully deployed and that you can access it. It should be noted that if the shell is closed then the port-forwarding will be lost and so will the access to the UI.
To regain it, simply run `make vault-ui-url` again.

Log in to the UI by using the token `root`.

Create test KV engine and configure Kubernetes cluster access
-------------------------------------------------------------

We need to create and populate a test KV engine:

.. code-block:: bash
   :caption: Add test data to Vault

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
   :caption: Integrate the cluster with Vault

   make vault-k8s-integration

We can inspect the policy that this target created by doing:

.. code-block:: bash
   :caption: Inspect the Kubernetes cluster Vault policy

   eval $(make vault-cli-config)
   vault policy read k8spolicy

Note that it doesn't have access to our **test-kv** engine. We will need to address that later.

Deploy the Vault Secrets Operator
---------------------------------

The next step is to deploy the **Vault Secrets Operator** followed by testing if the connection to Vault has been established:

.. code-block:: bash
   :caption: Inspect VSO resources

   make vault-deploy-secrets-operator

   # Inspect the connection to Vault
   kubectl get vaultconnection default -n vault -o jsonpath='{.status}'

   # Inspect the connection to Vault
   kubectl get vaultauth default -n vault -o jsonpath='{.status}'

Having achieved this we are able to start creating Kubernetes objects - VaultStaticSecret - that will synchronise Vault secrets into Kubernetes secrets.

Create a VaultStaticSecret resource
-----------------------------------

After setting up the access between Kubernetes and Vault and having VSO configured properly, it is time to create a **VaultStaticSecret** resource. This resource allows Kubernetes to fetch static secrets from Vault and use them within the cluster.

Here is an example of a `VaultStaticSecret <https://developer.hashicorp.com/vault/docs/platform/k8s/vso/api-reference#vaultstaticsecret>`_ resource definition:

.. code-block:: bash
   :caption: Create a VaultStaticSecret resource

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
   :caption: Inspect the status of the VaultStaticSecret resource

   kubectl describe vaultstaticsecret/test-secret

Which should output:

.. code-block:: bash
   :caption: Inspect the status of the VaultStaticSecret resource

   Events:
   Type     Reason            Age   From               Message
   ----     ------            ----  ----               -------
   Warning  VaultClientError  3s    VaultStaticSecret  Failed to read Vault secret: Error making API request.

   URL: GET http://192.168.49.97:8200/v1/test-kv/data/myservice/myapp
   Code: 403. Errors:

   * 1 error occurred:
      * permission denied

As we mentioned earlier, the policy `k8spolicy` doesn't provide access to our new KV engine, so we need to address that:

.. code-block:: bash
   :caption: Fix Kubernetes cluster auth policy

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

Once this policy update is applied we can describe our `vaultstaticsecret/test-secret` again:

.. code-block:: bash
   :caption: Inspect VaultStaticSecret resource status

   Status:
      Last Generation:  2
      Secret MAC:       bZM+H43B61LyiLqeeNQokhDVxfwnyjVNmeOCz9NFZGc=
   Events:
      Type    Reason         Age   From               Message
      ----    ------         ----  ----               -------
      Normal  SecretSynced   2s    VaultStaticSecret  Secret synced
      Normal  SecretRotated  2s    VaultStaticSecret  Secret synced

As soon as authentication to Vault is in place and the role VSO is using has the right set of permissions to access the secret, Vault was able to synchronise it.

To know more about policies, please visit Vault's `policy documentation <https://developer.hashicorp.com/vault/docs/concepts/policies>`_

Transform secrets
-----------------

You can verify that the secret was created in Kubernetes by running:

.. code-block:: bash
   :caption: Inspect created Kubernetes Secret

   kubectl get secret myapp-secret -o yaml

Note that the synchronised secret also has the **.raw** field, which contains the complete information on the Vault secret.

.. code-block:: bash
   :caption: Decode Kubernetes Secret

   kubectl get secret myapp-secret -o jsonpath='{.data._raw}' | base64 -d

Vault Secrets Operator introduces a `transformation <https://developer.hashicorp.com/vault/docs/platform/k8s/vso/secret-transformation>`_ feature that allows for active manipulation of data thus enabling the creation of more complex data fields based on secret data. We can also exclude and/or include fields in the synchronisation.

Lets configure our VaultStaticSecret to exclude the `.raw` and `password` fields. Also, we want to add a field named `basicAuth` to be the `basic authentication <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization#basic_authentication>`_ representation of the username and password:

.. code-block:: bash
   :caption: Use tranformation to exclude fields and create a new field

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
   :caption: Inspect transformed secret

   kubectl get secret myapp-secret -o yaml
   kubectl get secret myapp-secret -o jsonpath='{.data.basicAuth}' | base64 -d | base64 -d

Automatic secret synchronisation
--------------------------------

.. _tutorial-vault-secret-sync:

Picking up on the previous example, we can try changing the password in Vault, and see the synchronisation happening in real time. We can do that using a simple pod running a bash script. Note that in Kubernetes, secrets mounted as volumes are **automatically updated**, while environment variables are not:

.. code-block:: bash
   :caption: Create pod that consumes the secret

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
   :caption: Update the secret in Vault and monitor synchronisation

   # Shell #1: Change value in Vault
   eval $(make vault-cli-config)
   vault kv put -mount=test-kv myservice/myapp username="<username>" password="<password>"

   # Shell #2: Watch the secret
   watch "kubectl get secret myapp-secret -o jsonpath='{.data.basicAuth}' | base64 -d | base64 -d"

   # Shell #3: Watch logs
   kubectl logs -f myapp-pod

You might notice that, even though the secret has been updated, it is not propagated right away to the pod. Depending on the cluster setup, this can take some minutes to happen.

Pinning a secret's version
--------------------------

With Vault Secrets Operator and VaultStaticSecret, we can set the `version <https://developer.hashicorp.com/vault/docs/platform/k8s/vso/api-reference#vaultstaticsecret>`_ field to use a specific **version** in Vault. This ensures that we are using consistent inputs and we can control when these secrets get updated. 

.. code-block:: bash
   :caption: Pinning a secret version

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
     version: 3
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

Secrets live update and deployment rollout
------------------------------------------

To overcome the time it might take for the secret to update in the actual pod, we can use VaultStaticSecret `rolloutRestartTargets` to automatically roll out an update to a resource of type `Deployment`, `DaemonSet`, `StatefulSet`.

Together with VSO's automatic synchronisation, this can be used to implement :ref:`automatic secret rotation <how-vault-secret-rotation>`, for instance, to address leaked secrets.

.. code-block:: bash
   :caption: Create deployment that consumes the secret

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
   :caption: Configure automatic rollout for deployment

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

Again, using two shells, we can observe the deployment's logs and change the value in Vault. To facilitate seeing the logs of multiple pods in a deployment, we can use `stern <https://github.com/stern/stern/releases>`_:

.. code-block:: bash
   :caption: Update the secret in Vault and monitor synchronisation

   # Shell #1: Change value in Vault
   eval $(make vault-cli-config)
   vault kv put -mount=test-kv myservice/myapp username="<username>" password="<password>"

   # Shell #3: Watch logs
   stern -l app=myapp -t --since 1m

As we can see, after a few seconds (at most the VaultStaticSecret's `refreshAfter`) of us changing the secret in Vault, there is a new pod for our deployment getting created. This pod will have the latest contents of the secret.

Remember that, since we can mount secrets as volumes (essentially files) in pods, we can use Vault to inject full configuration files and automatically rotate workloads when those change.

Using secrets with TANGO Devices
--------------------------------

Now that we've covered the essentials of setting up and working with Vault and Kubernetes in generic terms, we can cover how we can do it with TANGO Devices.

In SKAO deployments, `ska-tango-util <https://gitlab.com/ska-telescope/ska-tango-charts/-/tree/main/charts/ska-tango-util?ref_type=heads>`_ chart is used as a template chart to deploy all the required components of a TANGO device in Kubernetes, regardless of the use of the `SKA Tango Operator <https://gitlab.com/ska-telescope/ska-tango-operator>`_. The deployment has the following stages:

#. Configure the Device Server with the TANGO Database
#. Wait for dependencies to start the Device Server
#. Run the Device Server

With the SKA TANGO Operator enabled, the Operator itself takes care of the first two steps. If not, ska-tango-util will create - per Device Server - a Kubernetes **job** to handle the configuration and another to handle dependencies. The recommended way of deploying is using the operator, as it is does things optimally,
severely improving the deployment's reliability and reducing deployment times. 


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
   :caption: Configure TANGO device to read secret from Vault

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

We can add a `secrets` entry per device server, letting you inject secret keys in Vault as environment variables in the Device Server. We can also set the `transform` field. Note that we need to add the transformation expression as **{{`<transformation expression>`}}** so that Helm doesn't template it:

.. code-block:: yaml
   :caption: Adding a secret with transformation

   secrets:
   - secretPath: dev/skao-team-system/vault-tutorial
     env:
     - secretKey: env
       envName: TEST
       default: "minikube-case"
       transform: >-
         {{`{{ printf "some-secret: %s" (get .Secrets "test_key") }}`}}

In the future, we expect to provide more functionality, such as allowing to mount secrets as files or specifying the secret **version** in Vault. Please refer to the `TANGO examples <https://gitlab.com/ska-telescope/ska-tango-examples>`_ for up-to-date and more in depth examples.
