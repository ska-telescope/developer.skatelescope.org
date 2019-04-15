.. doctest-skip-all
.. _code-guide:

.. raw:: html

    <style>
        div .figborder p.caption {margin-top: 10px;}
    </style>

.. .. admonition:: The thing

..    You can make up your own admonition too.


**********************************
Container Orchestration Guidelines
**********************************

This section describes a set of standards, conventions and guidelines for deploying application suites on Container Orchestration technologies.

.. contents:: Table of Contents

Overview of Standards
=====================

These standards, best practices and guidelines are based on existing industry
standards and tooling.  The main references are:

* `Cloud Native Computing Foundation <https://www.cncf.io/>`_.
* `Docker v2 Registry API Specification <https://docs.docker.com/registry/spec/api/>`_.
* `Container Network Interface <https://github.com/containernetworking/cni>`_.
* `Container Storage Interface <https://github.com/container-storage-interface/spec>`_.
* `Open Container Initiative image specification <https://github.com/opencontainers/image-spec/releases/tag/v1.0.0>`_.
* `Open Container Initiative run-time specification <https://github.com/opencontainers/runtime-spec/releases/tag/v1.0.0>`_.

The standards are broken down into the following areas:

* Structuring application suites for orchestration - general guidelines for breaking up application suites for running in a container orchestration
* Defining and building cloud native application suites - resource definitions, configuration, platform resource integration
* Running cloud native application suites - execution, monitoring, logging, diagnostics, security considerations


Throughout this documentation, `Kubernetes <https://kubernetes.io/>`_ is used as the reference implementation with the canonical version being Kubernetes v1.14.1, however the aim is to target compliance with the OCI specifications so it is possible to substitute in alternative Container Orchestration solutions.

Cheatsheet
==========

A `Orchestration Guidelines CheatSheet`_ is provided at the end of this document as a quick guide to standards and conventions elaborated on throughout this document.


Structuring application suites for Orchestration
================================================


How does orchestration work
---------------------------

How does k8s work - mechanisms, abstraction layers, life-cycle management


Guidelines
==========


Adapting your application suite to K8s
- separation of concerns - application, configuration, resources, scaling, recovery, availability
- how to break up and link together
- how to integrate with resources
- how to schedule
- how to monitor - or advertise availability
- idempotency
- only expose ports that are actually needed

Use a service mesh model - Istio - maybe


Kubernetes primitives
---------------------

Pods
- container clusters
- sidecars
- sharing volumes, network, memory etc.
- use Deployments, StatefulSets, DaemonSets, Jobs - not bare Pods or Replication Controllers


Use of Services


Use of Ingress


Defining resources
Helm

Namespaces

separation of concerns
- resources
- values - volatile config
- data/config files
- template helper code

Keep Config in ConfigMaps

Keep secrets,passwords,keys in Secrets - or integrate secrets with 3rd party like Vault

Resources
- tight coupled set per file - eg: PV+PVC, Service+App, Ingress, Configs
- single Ingress per chart


Service definitions, and discovery - ClusterIP everything (no NodePort), External systems on ExternalName

Metadata: labels - so that an entire project can be found


Trusting images - upstream, and tags

resource reservations and constraints: mem/cpu, ephemeral storage, devices

specialised resource reservations

security context and non-root, RBAC, Network Policies, Pod Security Policies
Image security analysis, and provenance (signing)


Storage - definition, reclaim policies, rw-vs-ro

Scheduling constraints - affinity/anti-affinity rules
Use apply  - moving towards desired state etc.


Restarts - clean crashing (no internal restart)

Logging

Metrics

readyProbe, livenessProbe

initContainers

preStart/preStop



Deployment Patterns


Extending Kubernetes
- adminission Controllers
- CRD and operators
- device plugins
- storage plugins
- network plugins















***********************************
Orchestration Guidelines CheatSheet
***********************************

This section provides a condensed summary of the guidelines to be used as a checklist.


.. admonition:: Reference Implementation

   Throughout  `Kubernetes <https://kubernetes.io/>`_ is used as the reference implementation with the canonical version being Kubernetes v1.14.1.


Structuring application suites for orchestration
================================================

