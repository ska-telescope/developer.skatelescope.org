.. _cert-manager:

Cert-manager
============

.. toctree::
  :maxdepth: 2
  :hidden:

Cert-manager is a tool for creating HTTPS/TLS certificates.

It is a prerequisite to have access to a DNS provider (either one you control manually or using external-dns), a certificate authority (CA) such as Let's Encrypt, and a working ingress configuration (e.g. ingress-nginx).

.. _helm_cert_manager:

Installation of cert-manager
----------------------------

For a basic helm installation of cert-manager:

.. code-block:: bash

    helm repo add jetstack https://charts.jetstack.io --force-update
    helm install \
        cert-manager jetstack/cert-manager \
        --namespace cert-manager \
        --create-namespace \
        --version v1.15.1 \
        --set crds.enabled=true

To set up a certificate issuer, for example Let's encrypt using ingress-nginx, create ClusterIssuer resources:

.. code-block:: yaml

    ---
    apiVersion: cert-manager.io/v1
    kind: ClusterIssuer
    metadata:
    name: letsencrypt-staging-issuer
    spec:
    acme:
        server: https://acme-staging-v02.api.letsencrypt.org/directory
        privateKeySecretRef:
        name: letsencrypt-dev
        solvers:
        - http01:
            ingress:
            ingressClassName: nginx
    ---
    apiVersion: cert-manager.io/v1
    kind: ClusterIssuer
    metadata:
    name: letsencrypt-prod-issuer
    spec:
    acme:
        server: https://acme-v02.api.letsencrypt.org/directory
        privateKeySecretRef:
        name: letsencrypt-prod
        solvers:
        - http01:
            ingress:
            ingressClassName: nginx

See this documentation for the most up-to-date documentation:

- `Setting up let's encrypt issuers <https://cert-manager.io/docs/tutorials/acme/pomerium-ingress/#configure-lets-encrypt-issuer>`_

Now you should be able to issue certificates, provided that you are using `external-dns` or that you have set up a DNS record for the domain you are issuing the certificate for. For example, to create a certificate for `harbor.dev.skach.org` the following certificate resource would need to be applied to the Kubernetes cluster (or added to a git repository if you are using GitOps tools such as ArgoCD or Flux).

.. code-block:: yaml

    apiVersion: cert-manager.io/v1
    kind: Certificate
    metadata:
    name: harbor.dev.skach.org
    namespace: harbor
    spec:
    dnsNames:
        - harbor.dev.skach.org
    secretName: harbor.dev.skach.org
    issuerRef:
        name: letsencrypt-prod-issuer
        kind: ClusterIssuer


.. _flux_cert_manager:

Installation of cert-manager using Flux Helm controller
-------------------------------------------------------

If you are using Flux as GitOps solution, these instructions can be used: 

- `Flux Helm controller installation of cert-manager <https://cert-manager.io/docs/installation/continuous-deployment-and-gitops/#using-the-flux-helm-controller>`_


