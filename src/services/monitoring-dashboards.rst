.. _monitoring-dashboards.rst:

=========================
Monitoring Dashboards
=========================

There are several dashboards that can be used to monitor the SKA infrastructure and projects' statuses.

In order to access the dashboards, first you should add below lines to your `hosts` file. 
*Note that IP addresses of the dashboards are subject to change anytime. If there are any problems with the below dashboards please contact the system team.*


.. code-block::

    # hosts file ("/etc/hosts" for linux/unix, "%WINDIR%\System32\drivers\etc\hosts" for Windows)
    # Dashboards
    192.168.93.102 integration.engageska-portugal.pt
    192.168.93.102 tango.rest.integration.engageska-portugal.pt
    192.168.93.102 grafana.integration.engageska-portugal.pt
    192.168.93.102 tangogql-proxy.integration.engageska-portugal.pt
    192.168.93.26:3000 alerts.engageska-portugal.pt
    193.136.93.245 kibana.engageska-portugal.pt monitoring.engageska-portugal.pt


Some of the dashboards are password protected. To get the current passwords please contact the system team.


* `SKA Infrastructure <https://monitoring.engageska-portugal.pt/dashboards>`__: Monitoring metrics such as Kubernetes, GitLab Runners, Elasticstack, cadvisor etc.
* `Tango Devices <http://grafana.integration.engageska-portugal.pt/dashboards>`__: Example grafana dashboards for Tango Devices, attributes, states , databases etc.
* `Prometheus Alerts <https://alerts.engageska-portugal.pt/alerts>`__: Prometheus alerts for the core kubernetes cluster and infrastructure VMs
* `Kibana Logs <https://kibana.engageska-portugal.pt/app/logs>`__: Kibana Logs for the core cluster
* `Webjive <http://integration.engageska-portugal.pt/testdb/devices>`__: Webjive dashboard for the Tango Devices
* `Argos  <https://argos.engageska-portugal.pt/argos/dashboards>`__: Argos grafana dashboard for Testing purposes for the repositories test metrics such as coverage, number of executed tests, mean values etc. Note: this dashboard has only some repositories at the moment for prototyping

