.. _monitoring-dashboards.rst:

Monitoring Dashboards
*********************

There are several dashboards that can be used to monitor the SKA infrastructure and projects' statuses. Depending on the k8s cluster used, please follow the appropriate section below:

STFC Cluster
============

Some of the dashboards are password protected and maybe behind VPN access. To get the current passwords please contact the system team.

* `SKA Infrastructure <http://monitoring.skao.stfc:3000/login>`__: Monitoring metrics such as Kubernetes, GitLab Runners, Elasticstack, cadvisor etc.
* `Prometheus Alerts <http://monitoring.skao.stfc:9093/#/alerts>`__: Prometheus alerts for the core kubernetes cluster and infrastructure VMs
* `Kibana Logs <https://k8s.stfc.skao.int/kibana/app/logs/stream>`__: Kibana Logs for the core cluster
