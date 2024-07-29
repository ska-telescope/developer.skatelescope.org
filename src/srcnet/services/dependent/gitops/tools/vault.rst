.. _vault:

Vault
======

.. toctree::
  :maxdepth: 2
  :hidden:

.. _argocd_vault:

Installation of vault using ArgoCD
----------------------------------

Install vault by adding an ArgoCD `Application` resource. Ensure that the values in the `Application` manifest corresponds to your environment, such as the repository structure (`spec.sources.helm.valueFiles`) or any URLs that are used in the configuration. An example can be seen below:

.. code-block:: yaml

  apiVersion: argoproj.io/v1alpha1
  kind: Application
  metadata:
    name: vault
    namespace: argocd
  spec:
    project: default
    sources:
    - repoURL: https://helm.releases.hashicorp.com
      chart: vault
      targetRevision: 0.28.0
      helm:
        valueFiles:
        - '$argorepo/applications/vault/values.yaml'
    # We need to define this repo again using the multiple sources pattern.
    # This is necessary when using a values.yaml and a Helm chart that live on different repositories.
    # https://argo-cd.readthedocs.io/en/latest/user-guide/multiple_sources/#helm-value-files-from-external-git-repository
    # An alternative option would be to use an umbrella chart with the target helm chart as a dependency:
    # https://github.com/argoproj/argocd-example-apps/tree/master/helm-dependency
    - repoURL: https://gitlab.com/ska-telescope/src/ska-chsrc-gitops.git
      targetRevision: main
      ref: argorepo
      path: applications/vault
      directory:
        exclude: 'values.yaml'
    destination:
      server: https://kubernetes.default.svc
      namespace: vault
    syncPolicy:
      automated:
        prune: true
        selfHeal: true
      syncOptions:
      - CreateNamespace=true
    ignoreDifferences:
    - group: admissionregistration.k8s.io
      kind: MutatingWebhookConfiguration
      jqPathExpressions:
      - .webhooks[]?.clientConfig.caBundle

To provide a `values.yaml` file with custom values to the Vault installation, with the above `Application` setup, you can use a `values.yaml` file placed in the location `$argorepo/applications/vault/values.yaml`.

Initializing vault
------------------

When you have a new vault installation you need to initialize the vault. Take great care to store the unseal keys in a safe place. Anyone you share them with may be able to read every secret stored in vault. Moreover, if you lose these keys you will not be able to access the secrets stored in vault anymore.

.. code-block:: bash

  # Get the unseal keys and the initial root token
  vault operator init
  Unseal Key 1: ....
  ...
  
  # Run this 3 times with 3 keys
  vault operator unseal
  ...
  
  # Log in with the initial root token
  vault login


Enable Kubernetes authentication in Vault
-----------------------------------------

Enable the kv-v2 secrets engine (to use the newest secrets engine) and the kubernetes authentication method for Vault. Then connect Vault to the Kubernetes API server using the cluster-internal URL for the Kubernetes API server (`https://kubernetes.default.svc``).

.. code-block:: bash

  vault secrets enable -path=app kv-v2
  Success! Enabled the kv-v2 secrets engine at: app/
  
  vault auth enable kubernetes
  Success! Enabled kubernetes auth method at: kubernetes/
  
  vault write auth/kubernetes/config kubernetes_host="https://kubernetes.default.svc"
  Success! Data written to: auth/kubernetes/config

Creating a secret, policy and role in vault
-------------------------------------------

To create a secret in vault you need to add a secret with the keys and values you wish to store. In addition, you need to add a policy that applies to the path where the secret is stored. Finally, if you want to use the secret in Kubernetes using e.g. External Secrets Operator you need to create a vault role that connects an existing Kubernetes service account with the policy. Remember to ensure that the service account exists or create it in your Kubernetes cluster.

.. code-block:: bash

  # Create a secret in Vault
  vault kv put app/test clientsecret="...Secret goes here..."
  
  # Create a policy that applies to the above secret
  vault policy write test-policy - <<EOF
  > path "app/data/test" {
  >    capabilities = ["read"]
  > }
  > EOF
  Success! Uploaded policy: test-policy
  
  # Create a Vault role that binds a Kubernetes service account to a policy (and the policy will refer to the secret)
  vault write auth/kubernetes/role/test \
  >       bound_service_account_names=test \
  >       bound_service_account_namespaces=test \
  >       policies=test-policy \
  >       ttl=24h
  Success! Data written to: auth/kubernetes/role/test

To make this secret available in a Kubernetes cluster as a Kubernetes secret you will need an additional tool such as External Secrets Operator.