.. _argocd:

ArgoCD
============

.. toctree::
  :maxdepth: 2
  :hidden:

ArgoCD is one of the available and popular GitOps tools used to manage services deployed in a Kubernetes cluster. It supports several important features, such as deployment environments, single sign-on, deployment rollbacks, a dashboard to monitor deployment statuses and much more.

.. _manual_argocd:

Installation of argocd
----------------------
As ArgoCD is a fundamental tool that will be used for managing other applications it can be installed manually. It is possible to use other tools to deploy ArgoCD however those are not explored in this documentation.

Follow the latest documentation to install ArgoCD see here:

- `ArgoCD getting started <https://argo-cd.readthedocs.io/en/stable/getting_started/>`_

SKA-IAM configuration
---------------------
To setup SKA-IAM logins via sso we can apply some changes on Kubernetes resources. In the argocd namespace, you need to configure 2 configmaps as seen below.

In the `argocd-cm` configmap, the url needs to match the hostname.

.. code-block:: yaml

  data:
    oidc.config: |
      name: ska-iam
      issuer: https://ska-iam.stfc.ac.uk/
      clientID: <client_id>
      clientSecret: <client_secret>
    url: https://<external-argocd-url>/

In the `argocd-rbac-cm configmap` the roles and group need to be set up as seen below. If you are using this setup for a different site than CHSRC, remember to use a suitable group and role that is managed by your site from the SKA-IAM.

.. code-block:: yaml

  data:
    policy.csv: |
      p, role:ska-admin, applications, create, */*, allow
      p, role:ska-admin, applications, update, */*, allow
      p, role:ska-admin, applications, delete, */*, allow
      p, role:ska-admin, applications, sync, */*, allow
      p, role:ska-admin, applications, override, */*, allow
      p, role:ska-admin, applications, action/*, */*, allow
      p, role:ska-admin, applications, *, */*, allow
      p, role:ska-admin, applicationsets, get, */*, allow
      p, role:ska-admin, applicationsets, create, */*, allow
      p, role:ska-admin, applicationsets, update, */*, allow
      p, role:ska-admin, applicationsets, delete, */*, allow
      p, role:ska-admin, certificates, create, *, allow
      p, role:ska-admin, certificates, update, *, allow
      p, role:ska-admin, certificates, delete, *, allow
      p, role:ska-admin, clusters, create, *, allow
      p, role:ska-admin, clusters, update, *, allow
      p, role:ska-admin, clusters, delete, *, allow
      p, role:ska-admin, repositories, create, *, allow
      p, role:ska-admin, repositories, update, *, allow
      p, role:ska-admin, repositories, delete, *, allow
      p, role:ska-admin, projects, create, *, allow
      p, role:ska-admin, projects, update, *, allow
      p, role:ska-admin, projects, delete, *, allow
      p, role:ska-admin, accounts, update, *, allow
      p, role:ska-admin, gpgkeys, create, *, allow
      p, role:ska-admin, gpgkeys, delete, *, allow
      p, role:ska-admin, exec, create, */*, allow
      g, src/chsrc/admins, role:ska-admin

    policy.default: ""


This will enable SKA-IAM logins with admin access for members of `src/chsrc/admins`. All other users will still be able to login (this is an ArgoCD limitation), but they will not have access to read or write anything.