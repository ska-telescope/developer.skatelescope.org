.. _external-dns:

External-dns
============

.. toctree::
  :maxdepth: 2
  :hidden:

External-dns is a tool for managing DNS records connected to ingresses within a Kubernetes cluster. It is useful on its own or combined together with an ingress (e.g. nginx-ingress) and a certificate issuing tool (e.g. cert-manager). It supports several DNS providers as seen below.

.. _helm_external_dns:

Installation of external-dns
-----------------------------
The external-dns repository provides documentation for how to set up external-dns depending on your cluster and existing infrastructure. Please see here for the most up-to-date documentation:

- `External-dns installation <https://github.com/kubernetes-sigs/external-dns?tab=readme-ov-file#running-externaldns>`_