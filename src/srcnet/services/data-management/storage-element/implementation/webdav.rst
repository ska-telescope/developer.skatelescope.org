.. _webdav:

WebDav
======

.. toctree::
  :maxdepth: 2
  :caption: Implementations for the Storage Elements
  :hidden:
  

WebDAV is a protocol for file management and is an integral part of scientific 
data management when working with Rucio. 
It offers scalable storage solutions and streamlined data access, enhancing 
management and supporting efficient scientific workflows within the 
Rucio RSE ecosystem.

To install your Rucio RSE with the WebDav protocol it is recommended to use the StormWebDav.

Manual installation of StoRM-webdav Rocky Linux 9
-------------------------------------------------

Install packages and add user for `storm-webdav`:

.. code-block:: bash

    sudo yum -y install epel-release redhat-lsb-core wget git tar && \\ 
    sudo yum update -y && \\ 
    sudo yum install -y yum-utils gfal2-all davix attr acl sudo && \\ 
    sudo echo '%wheel ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers && \\
    sudo rpm --import http://repository.egi.eu/sw/production/umd/UMD-RPM-PGP-KEY && \\ 
    sudo yum install -y http://repository.egi.eu/sw/production/umd/4/centos7/x86_64/updates/umd-release-4.1.3-1.el7.centos.noarch.rpm && \\
    sudo adduser --uid ${STORM_USER_UID} storm && \\ 
    sudo usermod -a -G wheel storm && \\
    sudo yum-config-manager --add-repo https://repo.cloud.cnaf.infn.it/repository/storm/nightly/storm-nightly-centos7.repo && \\ 
    sudo yum install -y storm-webdav voms-clients-java jq &&  \\
    sudo yum clean all

Then, get the `storm-webdav` package that is compatible with CentOS flavours:

.. code-block:: bash

    curl https://repo.cloud.cnaf.infn.it/repository/storm-rpm-stable/centos7/storm-webdav-1.4.2-1.el7.noarch.rpm --output storm-webdav-1.4.2-1.el7.noarch.rpm

Install this package manually:

.. code-block:: bash

    sudo yum localinstall -y storm-webdav-1.4.2-1.el7.noarch.rpm

Once installed, proceed with the SSL certificates installation. To do it, include your certificates within ```/etc/grid-security/storm-webdav/``` with the following names:

- ```hostcert.pem``` - `SSL Certificates chain`
- ```hostkey.pem``` - `SSL Private Key`


Create a ```storm-webdav``` properties files within ```/etc/storm/webdav/sa.d/storm-webdav-sa.properties```:

.. code-block:: bash
    
    sudo vi /etc/storm/webdav/sa.d/storm-webdav-sa.properties


.. note::
   At this point, you should have your storage backend set up, connected and ready for use, having a folder that will be used to store the Rucio RSE data. In this installation we are using ```/storage/dteam/disk``` as data folder.


Modify the next configuration variables in this file ```/etc/storm/webdav/sa.d/storm-webdav-sa.properties```:

.. code-block:: bash
    
    name=<Name of the Storage webdav>
    rootPath=<Path to the folder where Rucio will store its data>
    accessPoints=<Initial access point folder>
    orgs=<URL of the IAM provider>

    anonymousReadEnabled=false
    voMapEnabled=false

    orgsGrantReadPermission=true
    orgsGrantWritePermission=true
    wlcgScopeAuthzEnabled=true

The next example use ```/storage/dteam/disk``` as datafolder and ```/disk``` as startup folder for the data. Then the IAM A&A service used here is ```https://iam-escape.cloud.cnaf.infn.it/```.

.. code-block:: bash
    
    name=dteam-disk
    rootPath=/storage/dteam/disk
    accessPoints=/disk
    orgs=https://iam-escape.cloud.cnaf.infn.it/

    anonymousReadEnabled=false
    voMapEnabled=false

    orgsGrantReadPermission=true
    orgsGrantWritePermission=true
    wlcgScopeAuthzEnabled=true

Then, lets configure the IAM A&A client for ```storm-webdav```. To do it, edit the next file:

.. code-block:: bash
    
    sudo vi /etc/storm/webdav/config/application.ym

Include the next, changing ```client-name```, ```client-id``` and ```client-secret``` with the client your previously created in the preliminary step :doc:`../../../iam-client-configuration/iam-client-configuration`. Maintaing the ```issuer``` and ```issuer-uri``` as follows: 

.. code-block:: bash

    oauth:
    enable-oidc: true
    issuers:
        - name: escape
        issuer: https://iam-escape.cloud.cnaf.infn.it/
    spring:
    security:
        oauth2:
        client:
            provider:
            escape:
                issuer-uri: https://iam-escape.cloud.cnaf.infn.it/
            registration:
            escape:
                provider: escape
                client-name: <YOUR_CLIENT_NAME>
                client-id: <YOUR_CLIENT_ID>
                client-secret: <YOUR_CLIENT_SECRET>
                scope:
                - openid
                - profile
                - wlcg.groups
    storm:
    voms:
        trust-store:
        dir: ${STORM_WEBDAV_VOMS_TRUST_STORE_DIR:/etc/grid-security/certificates}

The next step is to configure the ```storm-webdav``` web service. Edit the next file:

.. code-block:: bash
    
    sudo vi /etc/systemd/system/storm-webdav.service.d/storm-webdav.conf

And complete it the values to fit it to your computing environment and web preferences, taking into account the following *critical* parameters:

- ```STORM_WEBDAV_HOSTNAME_0``` must match with the hostname of your node.
- ```STORM_WEBDAV_HTTPS_PORT``` and ```STORM_WEBDAV_HTTP_PORT``` according to your preferences.
- ```STORM_WEBDAV_CERTIFICATE_PATH``` and ```STORM_WEBDAV_PRIVATE_KEY_PATH``` pointing to the folder with the SSL private key and SSL Certs chain. 

.. code-block:: bash

    [Service]
    Environment="STORM_WEBDAV_USER=storm"
    Environment="STORM_WEBDAV_JVM_OPTS=-Xms1024m -Xmx1024m"
    Environment="STORM_WEBDAV_SERVER_ADDRESS=0.0.0.0"
    Environment="STORM_WEBDAV_HOSTNAME_0=test-rockylinux.novalocal"
    Environment="STORM_WEBDAV_HTTPS_PORT=8443"
    Environment="STORM_WEBDAV_HTTP_PORT=8085"
    Environment="STORM_WEBDAV_CERTIFICATE_PATH=/etc/grid-security/storm-webdav/hostcert.pem"
    Environment="STORM_WEBDAV_PRIVATE_KEY_PATH=/etc/grid-security/storm-webdav/hostkey.pem"
    Environment="STORM_WEBDAV_TRUST_ANCHORS_DIR=/etc/grid-security/certificates"
    Environment="STORM_WEBDAV_TRUST_ANCHORS_REFRESH_INTERVAL=86400"
    Environment="STORM_WEBDAV_MAX_CONNECTIONS=300"
    Environment="STORM_WEBDAV_MAX_QUEUE_SIZE=900"
    Environment="STORM_WEBDAV_CONNECTOR_MAX_IDLE_TIME=30000"
    Environment="STORM_WEBDAV_SA_CONFIG_DIR=/etc/storm/webdav/sa.d"
    Environment="STORM_WEBDAV_JAR=/usr/share/java/storm-webdav/storm-webdav-server.jar"
    Environment="STORM_WEBDAV_LOG=/var/log/storm/webdav/storm-webdav-server.log"
    Environment="STORM_WEBDAV_OUT=/var/log/storm/webdav/storm-webdav-server.out"
    Environment="STORM_WEBDAV_ERR=/var/log/storm/webdav/storm-webdav-server.err"
    Environment="STORM_WEBDAV_LOG_CONFIGURATION=/etc/storm/webdav/logback.xml"
    Environment="STORM_WEBDAV_ACCESS_LOG_CONFIGURATION=/etc/storm/webdav/logback-access.xml"
    Environment="STORM_WEBDAV_VO_MAP_FILES_ENABLE=false"
    Environment="STORM_WEBDAV_VO_MAP_FILES_CONFIG_DIR=/etc/storm/webdav/vo-mapfiles.d"
    Environment="STORM_WEBDAV_VO_MAP_FILES_REFRESH_INTERVAL=21600"
    Environment="STORM_WEBDAV_TPC_MAX_CONNECTIONS=50"
    Environment="STORM_WEBDAV_TPC_MAX_CONNECTIONS_PER_ROUTE=25"
    Environment="STORM_WEBDAV_TPC_VERIFY_CHECKSUM=false"
    Environment="STORM_WEBDAV_TPC_TIMEOUT_IN_SECS=30"
    Environment="STORM_WEBDAV_TPC_TLS_PROTOCOL=TLSv1.2"
    Environment="STORM_WEBDAV_TPC_REPORT_DELAY_SECS=5"
    Environment="STORM_WEBDAV_TPC_ENABLE_TLS_CLIENT_AUTH=false"
    Environment="STORM_WEBDAV_TPC_PROGRESS_REPORT_THREAD_POOL_SIZE=4"
    Environment="STORM_WEBDAV_AUTHZ_SERVER_ENABLE=false"
    Environment="STORM_WEBDAV_REQUIRE_CLIENT_CERT=false"
    Environment="STORM_WEBDAV_USE_CONSCRYPT=false"
    Environment="STORM_WEBDAV_TPC_USE_CONSCRYPT=false"
    Environment="STORM_WEBDAV_ENABLE_HTTP2=false"


Finally, restart the ```storm-webdav``` to apply the changes:

.. code-block:: bash

    sudo systemctl stop storm-webdav
    sudo systemctl start storm-webdav
    sudo systemctl status storm-webdav


.. important:: Adding the recent created Rucio RSE to the SKA Rucio Platform

     The last configuration step is to contact the `SKA Rucio Platform <https://skao.slack.com/archives/C047DPDKRN0>`_ team to to include this new Rucio RSE to the SKA Rucio Platform.



Containerised instance of StoRM-webdav
--------------------------------------

This deployment is based on docker containers. To start with this
installation procedure, first clone the next repository:

.. code-block:: bash

    git clone https://gitlab.com/ska-telescope/src/ska-src-storm-webdav.git
    cd ska-src-storm-webdav


Build the container image:

.. code-block:: bash

    docker build -t storm-webdav:v1 .

Once built, run this container image with the following 
environments variables:


.. code-block:: bash

    docker run ...


Helm package of StoRM-WebDav on kubernentes
-------------------------------------------

For an installation on a kubernentes cluster follow the next steps:

- `Helm package for StoRM-WebDav <https://gitlab.com/ska-telescope/src/ska-src-storm-webdav>`_
