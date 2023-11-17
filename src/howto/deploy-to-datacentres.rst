****************************
Deploying to Multiple SKAO Clusters
****************************

This guide is designed for developers working with the Square Kilometre Array Observatory (SKAO) and outlines the process of configuring repositories and deploying applications to various K8s clusters within SKAO, each serving different purposes.

Deploy to K8s Clusters
======================

SKAO utilizes GitLab runners for deploying charts to Kubernetes (K8s) clusters. The deployment destination of your jobs, and consequently the installation of your charts, depends on the GitLab runners configured in the `.gitlab-ci.yml` file. To specify a particular runner, set the **tags** field within each job. If no specific runner is designated, the default runner used is **k8srunner**. For instance, to deploy in the PSI-MID cluster, use the following configuration:

Runner for PSI-MID
------------------

.. code-block::

    image: $SKA_K8S_TOOLS_BUILD_DEPLOY

    stages:
    - lint
    - build
    - test
    - deploy
    - integration
    - staging
    - join-reports
    - pages
    - publish
    - scan

    k8s-test-no-operator:
        tags:
            - k8srunner-psi-mid
        extends: k8s-test
        variables:
            KUBE_NAMESPACE: 'ci-$CI_PROJECT_NAME-$CI_COMMIT_SHORT_SHA-no-op'
            SKA_TANGO_OPERATOR: 'false'
        artifacts:
            name: "$CI_PROJECT_NAME-$CI_JOB_ID"
            paths:
            - "build/"
            reports:
            junit: build/report.xml
            when: always
        environment:
            name: test/$CI_COMMIT_REF_SLUG-no-op
            on_stop: stop-k8s-test-no-operator
            auto_stop_in: 1 minute
        rules:
            - exists:
                - tests/**/*

    .
    .
    .

A comprehensive list of all available runners is accessible at `https://gitlab.com/groups/ska-telescope/-/runners?status[]=ONLINE`.

Debug Clusters
==============

To diagnose issues within the cluster pods, developers should utilize `kibana <https://k8s.stfc.skao.int/kibana/app/logs/>`. Select the appropriate datacentre by setting the **ska.datacentre** variable as shown:

.. figure:: images/logging/kibana-datacentre-logs.png
   :scale: 60%
   :alt: Kibana interface demonstrating how to use the ska.datacentre variable for filtering logs specific to a datacentre.
   :align: center
   :figclass: figborder

|

Monitor Clusters
================

Monitoring the status and health of different clusters is crucial. Developers can access https://k8s.stfc.skao.int/grafana/ for comprehensive dashboards with varied information about the clusters. For example, the dashboard `kubernetes-compute-resources-node-pods <https://k8s.stfc.skao.int/grafana/d/200ac8fdbfbb74b39aff88118e4d1c2c/kubernetes-compute-resources-node-pods?orgId=1&refresh=10s&from=now-6h&to=now>`_ allows you to switch between different datacentres using the Grafana variable 'cluster' at the top of the dashboards, as illustrated below:

.. figure:: images/monitoring/grafana-datacentres-variable.JPG
   :scale: 60%
   :alt: Grafana interface showcasing the functionality to switch between clusters using the Grafana variable 'cluster'.
   :align: center
   :figclass: figborder
