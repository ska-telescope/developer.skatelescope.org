.. _external-secrets-operator:

External Secrets Operator
=========================

.. toctree::
  :maxdepth: 2
  :hidden:

External Secrets Operator is used in combination with vault. If you wish to follow the below guide for using External Secrets Operator with vault, please ensure that vault is installed and configured in your Kubernetes cluster.

.. _helm_external_secrets_operator:

Installation of External Secrets Operator
-----------------------------------------
External Secrets Operator can be installed using Helm as follows:

.. code-block:: bash

    helm repo add external-secrets https://charts.external-secrets.io
    helm install external-secrets external-secrets/external-secrets -n external-secrets --create-namespace

After the installation, ensure that it is ready to use by listing the pods and ensuring that they are running:

.. code-block:: bash

    kubectl get pods -n external-secrets
    NAME                                                READY   STATUS    RESTARTS      AGE
    external-secrets-7f9f5fd4d6-6zld6                   1/1     Running   2 (27h ago)   19d
    external-secrets-cert-controller-7b795c658b-26hmt   1/1     Running   1 (27h ago)   19d
    external-secrets-webhook-576774cb7c-g2dwq           1/1     Running   1 (27h ago)   19d

Using External Secrets Operator with vault
------------------------------------------
The aim of this documentation is to show how to access a secret from vault in a Kubernetes cluster. It is a prerequisite to have vault installed and working, that the Kubernetes service account exists, and that the secret is set up in vault with a path, policy, key, and value.

Create a ClusterRoleBinding that gives your existing service account (e.g. `test`) access to vault.

.. code-block:: yaml

    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRoleBinding
    metadata:
    name: vault-access-rolebinding
    roleRef:
    kind: ClusterRole
    name: system:auth-delegator
    apiGroup: rbac.authorization.k8s.io
    subjects:
    - kind: ServiceAccount
        name: test
        namespace: test

Create a SecretStore resource that gives your existing service account (e.g. `test`) access to vault. You may need to change the commented values in the below example depending on how your vault instance is set up.

.. code-block:: yaml

    apiVersion: external-secrets.io/v1beta1
    kind: SecretStore
    metadata:
    name: vault-backend
    namespace: test
    spec:
    provider:
        vault:
            # Address of your vault instance within the Kubernetes cluster
            server: "http://vault.vault.svc.cluster.local:8200"
            path: "app"
            version: "v2"
            auth:
                kubernetes:
                # Path where the Kubernetes authentication backend is mounted in your vault setup
                mountPath: "kubernetes"
                # A required field containing the vault Role to assume.
                role: "test"
                # Optional service account field containing the name
                # of a kubernetes ServiceAccount
                serviceAccountRef:
                    name: "test"

Create an ExternalSecret manifest that refers to the SecretStore above. The target is the name of the secret that will be created and the secretKey is the name of the key that will appear inside the created secret. The key is the path to the secret in vault and the property is the key within the secret inside vault.

.. code-block:: yaml

    apiVersion: external-secrets.io/v1beta1
    kind: ExternalSecret
    metadata:
    name: test
    namespace: test
    spec:
    refreshInterval: "15s" # time to sync from vault
    secretStoreRef:
        name: vault-backend # name of the SecretStore you created
        kind: SecretStore
    target:
        name: this-secret-is-from-vault # name that the secret will have in the Kubernetes cluster
        creationPolicy: Owner # create secret if not exists
    data:
        - secretKey: clientkey-from-vault # key that the secret will contain in the Kubernetes cluster
        remoteRef:
            key: app/data/test # path to secret in vault
            property: clientsecret # key in the vault secret

Inspect the secret in Kubernetes to ensure that it was created properly. Based on the ExternalSecret configuration a secret was created with the name `this-secret-is-from-vault` and the data contains the key `clientkey-from-vault`. The value of the secret should be the same value as in the secret stored in vault.

.. code-block:: bash

    kubectl describe secret -n test
    Name:         this-secret-is-from-vault
    Namespace:    test
    Labels:       reconcile.external-secrets.io/created-by=dba9473717534a2fdbc767b24224952b
    Annotations:  reconcile.external-secrets.io/data-hash: 3be9022b909020a93ed761d550affbfb
    
    Type:  Opaque
    
    Data
    ====
    clientkey-from-vault:  3 byte