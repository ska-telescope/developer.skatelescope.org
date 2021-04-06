.. _monitoring-dashboards.rst:

Monitoring Dashboards
*********************

There are several dashboards that can be used to monitor the SKA infrastructure and projects' statuses. Depending on the k8s cluster used, please follow the appropriate section below:

EngageSKA syscore
=================

In order to access the dashboards, first you should add below lines to your `hosts` file. 
*Note that IP addresses of the dashboards are subject to change anytime. If there are any problems with the below dashboards please contact the system team.*


.. code::

    # hosts file ("/etc/hosts" for linux/unix, "%WINDIR%\System32\drivers\etc\hosts" for Windows)
    # Dashboards
    192.168.93.102 integration.engageska-portugal.pt
    192.168.93.102 tango.rest.integration.engageska-portugal.pt
    192.168.93.102 tangogql-proxy.integration.engageska-portugal.pt
    193.136.93.245 kibana.engageska-portugal.pt monitoring.engageska-portugal.pt


Some of the dashboards are password protected. To get the current passwords please contact the system team.



* `SKA Infrastructure <https://monitoring.engageska-portugal.pt/dashboards>`__: Monitoring metrics such as Kubernetes, GitLab Runners, Elasticstack, cadvisor etc.
* `Prometheus Alerts <https://alerts.engageska-portugal.pt/alerts>`__: Prometheus alerts for the core kubernetes cluster and infrastructure VMs
* `Kibana Logs <https://kibana.engageska-portugal.pt/app/logs>`__: Kibana Logs for the core cluster
* `Argos  <https://argos.engageska-portugal.pt/argos/dashboards>`__: Argos grafana dashboard for Testing purposes for the repositories test metrics such as coverage, number of executed tests, mean values etc. Note: this dashboard has only some repositories at the moment for prototyping


STFC Cluster
============

Some of the dashboards are password protected and maybe behind VPN access. To get the current passwords please contact the system team.

* `SKA Infrastructure <http://monitoring.skao.stfc:3000/login>`__: Monitoring metrics such as Kubernetes, GitLab Runners, Elasticstack, cadvisor etc.
* `Prometheus Alerts <http://monitoring.skao.stfc:9093/#/alerts>`__: Prometheus alerts for the core kubernetes cluster and infrastructure VMs
* `Kibana Logs <http://logging.skao.stfc:5601/app/logs/stream>`__: Kibana Logs for the core cluster
* `Argos  <https://argos.engageska-portugal.pt/argos/dashboards>`__: Argos grafana dashboard for Testing purposes for the repositories test metrics such as coverage, number of executed tests, mean values etc. Note: this dashboard has only some repositories at the moment for prototyping
