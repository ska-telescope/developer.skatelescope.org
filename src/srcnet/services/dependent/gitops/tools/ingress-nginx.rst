.. _ingress-nginx:

Ingress-nginx
=============

.. toctree::
  :maxdepth: 2
  :hidden:

Ingress-nginx controller is an ingress controller that will create Ingress resources to control how services can be accessed in a Kubernetes cluster. There are also other ingress controllers such as Istio, Traefik or Emissary-ingress. For a complete list, see:

- `List of ingress controllers <https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/>`_

Below is a link to the official documentation for ingress-nginx controller. Note that there is also a project called nginx-ingress but it is a different tool.

- `Ingress-nginx documentation <https://kubernetes.github.io/ingress-nginx/>`_

Note that the ingress-nginx installation may depend on how your underlying infrastructure is set up. For example, if your Kubernetes cluster is running on top of OpenStack, you would need OpenStack Cloud Controller Manager installed so that a new Nginx ingress can trigger the creation of an Octavia ingress in Openstack. For a complete list of different supported installation methods categorized by underlying infrastructure, see here:

- `Ingress-nginx installation options <https://kubernetes.github.io/ingress-nginx/deploy/#contents>`_

.. _helm_ingress_nginx:

Installation of ingress-nginx
-----------------------------
To install ingress-nginx using Helm, please follow the up-to-date instructions here:

- `Ingress-nginx installation <https://kubernetes.github.io/ingress-nginx/deploy/#quick-start>`_