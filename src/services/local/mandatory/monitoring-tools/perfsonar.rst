.. _perfsonar:

Monitoring tools
================

perfSONAR
---------

perfSONAR is a collection of open source software for performing and 
sharing end-to-end network measurements. It consists of multiple tools 
brought together like a Swiss Army Knife.

perfSONAR includes numerous utilities responsible for carrying out the actual 
network measurements and form the foundational layer of perfSONAR. 
In general, you will not invoke these tools directly but instead use 
the pscheduler command from the scheduling layer to execute them. 

The default tools that come with perfSONAR include among others:

- owamp - A set of tools primarily used for measuring packet loss and one-way delay. 

It includes the command owping for single short-lived tests and the powstream command for long-running background tests.

- twamp - A tool primarily used for measuring packet loss and two-way delay. 

It has increased accuracy over tools like ping without the same clock synchronization requirements as OWAMP. The client tool is named twping and can be used to run against 

- iperf3 - A rewrite of the classic iperf tool used to measure network throughput and associated metrics.

- iperf2 - Also known as just iperf, a common tool used to measure network throughput that has been around for many years.

- nuttcp - Another throughput tool with some useful options not found in other tools.

- traceroute - The classic packet trace tool used in identifying network paths

- tracepath - Another path trace tool that also measures path MTU

- ping - The classic utility for determining reachability, round-trip time (RTT) and basic packet loss.


Deployment
----------

In order to deploy this tool you can do it in two ways:

- * Natively (debian/ubuntu) (recommended)
- * Docker

Automated script
^^^^^^^^^^^^^^^^

perfSONAR provides a script that will automatically perform the first two steps in Installation (Manual). 
You can install your choice of bundle with one of the commands below:

perfSONAR Toolkit:

.. code-block:: bash
    
    curl -s https://raw.githubusercontent.com/perfsonar/project/master/install-perfsonar | sh -s - toolkit

Manual
^^^^^^
Configure `apt` sources:

.. code-block:: bash

    curl -o /etc/apt/sources.list.d/perfsonar-release.list https://downloads.perfsonar.net/debian/perfsonar-release.list
    curl -s -o /etc/apt/trusted.gpg.d/perfsonar-release.gpg.asc https://downloads.perfsonar.net/debian/perfsonar-release.gpg.key

    ```Ubuntu only```. Additionnaly, if you’re running a stripped down Ubuntu installation, 
        you might need to enable the universe repository. This is done with the following command:
        .. code-block:: bash
            add-apt-repository universe


Then refresh the packages list so APT knows about the perfSONAR packages:

.. code-block:: bash

    apt update

Installation: 

.. code-block:: bash

    env OPENSEARCH_INITIAL_ADMIN_PASSWORD=perfSONAR123! apt install perfsonar-toolkit

During the installation process, you’ll be asked to choose a password for the pscheduler database.

You can start all the services by rebooting the host since all are configured to run by default. In order to check services status issue the following commands:

.. code-block:: bash

    service pscheduler-scheduler status
    service pscheduler-runner status
    service pscheduler-archiver status
    service pscheduler-ticker status
    service owamp-server status
    service perfsonar-lsregistrationdaemon status

If they are not running you may start them with appropriate service commands as a root user. For example:

.. code-block:: bash

    service pscheduler-scheduler start
    service pscheduler-runner start
    service pscheduler-archiver start
    service pscheduler-ticker start
    service owamp-server start
    service perfsonar-lsregistrationdaemon start

Note that you may have to wait a few hours for NTP to synchronize your clock before (re)starting owamp-server.

After installing the perfsonar-toolkit bundle, you can refer to the general perfSONAR 
configuration from https://docs.perfsonar.net/install_config_first_time.html


Docker
^^^^^^

Get the latest Docker image for perfSONAR:

.. code-block:: bash

    docker pull perfsonar/testpoint:systemd

This will download the latest built image of the perfsonar testpoint bundle. 
It includes a base Ubuntu 22.04 install and the perfsonar-testpoint packages. 
Once the image is downloaded and extracted, start up the container in the 
background by doing:

.. code-block:: bash

    docker run -td --name perfsonar-testpoint --net=host --tmpfs /run --tmpfs /run/lock --tmpfs /tmp -v /sys/fs/cgroup:/sys/fs/cgroup:rw --cgroupns host perfsonar/testpoint:systemd

Now you can connect to the running Docker image:

.. code-block:: bash

    docker exec -it <container ID from above> bash

At this point you will be at a bash prompt inside of the container, and may start running tests:

.. code-block:: bash

    pscheduler troubleshoot
    pscheduler task throughput --dest hostname


  