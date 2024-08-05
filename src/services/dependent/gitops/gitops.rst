.. _gitops:


.. note::
    - Support: TBC

GitOps
======

GitOps is a methodology for deploying services and maintaining a state using a git repository as source of truth. It can be seen as a further evolution of DevOps where one of the main points is to use git to automatize as much as possible of the deployment lifecycle of an application or service.

This guide is initially based on how CHSRC has set up their infrastructure, but it can be used as an example or help for another SRC site to choose tools that fit their cluster. It is also meant to evolve as other sites adopt GitOps technologies and make choices that fit their infrastructure.

The assumed prerequisite for this guide is a working Kubernetes cluster. It is not mandatory to deploy all tools, some may also be provided to you if you are using an external Kubernetes cluster provided by a third party. This guide provides an example of a minimal setup. However, due to differences in national infrastructures, it is likely that the basic setup will differ between SRC sites. Once a site is able to deploy services using ArgoCD or Flux, those service deployment manifests can be shared among sites.

An example of the CHSRC GitOps setup using ArgoCD can be seen here:

* https://gitlab.com/ska-telescope/src/ska-chsrc-gitops

Supported tools that can be part of a GitOps setup include:

.. toctree::
  :maxdepth: 1
  :glob:

  tools/*

Some options are listed below:

.. list-table::
   :header-rows: 1

   * - Technology
     - Deployment Methods
   * - GitOps: ArgoCD
     - | :ref:`Manual <argocd>`
   * - Certificates: cert-manager
     - | :ref:`Helm <helm_cert_manager>`
       | :ref:`Flux <flux_cert_manager>`
   * - DNS: external-dns
     - | :ref:`Argocd <helm_external_dns>`
   * - Ingress: ingress-nginx
     - | :ref:`Helm <helm_ingress_nginx>`
   * - Secrets management: external secrets operator
     - | :ref:`Helm <helm_external_secrets_operator>`
   * - Secrets storage: vault
     - | :ref:`Argocd <argocd_vault>`

   

   
