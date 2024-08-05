.. _xrootd:

xrootd
======

.. note::
    - Support: https://skao.slack.com/archives/C047DPDKRN0
    - Status: https://skao.slack.com/archives/C0243CKRR6G 

.. _manual_xrootd_webdav:

Pre-requisites
--------------

Configure your IAM A&A account and create a IAM client following :ref:`IAM <iam-rucio-storage-element>`.

Deployment
----------
Installation for Centos 7. Version XRooTD: 5.5.1

Update your CentOS 7 and install the EPEL repo

.. code-block:: bash

    [centos@xrootd ~]$ sudo yum update
    [centos@xrootd ~]$ sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm

Install xrootd-server packages

.. code-block:: bash

    [centos@xrootd ~]$ sudo yum install xrootd

xrootd user and group are created. This user needs to have access to the volume you wish to export.

.. code-block:: bash

    [centos@xrootd ~]$ cat /etc/passwd | grep xrootd
    xrootd:x:997:994:XRootD runtime user:/var/spool/xrootd:/sbin/nologin

.. note::
   Configs are in /etc/xrootd/, xrootd-<config>.cfg

Prepare volume/folder you wish to export

.. code-block:: bash

    [centos@xrootd ~]$ sudo mkdir /data
    [centos@xrootd ~]$ sudo chown xrootd:xrootd /data

**Prepare configuration file**

The config in this example will fire up a basic xrootd server, with no authentication, exporting the /data path on the node. The data will be available via the http protocol on port 80.

.. code-block:: bash

    vi /etc/xrootd/xrootd-http.cfg 

    # The export directive indicates which paths are to be exported. While the
    # default is '/tmp', we indicate it anyway to show you this directive.
    #
    #all.export /tmp
    all.export /data

    # The adminpath and pidpath variables indicate where the pid and various
    # IPC files should be placed
    #
    all.adminpath /var/spool/xrootd
    all.pidpath /run/xrootd

    # Load the http protocol, indicate that it should be served on port 80.
    # The socket bound to port 80 has to be preallocated by the systemd
    # xrdhttp.socket (requires systemd!).
    #
    # In order to enable the xrdhttp.socket run:
    #	systemctl enable xrdhttp@http.socket
    # In order to start the xrdhttp.socket run:
    #	systemctl start xrdhttp@http.socket
    #
    xrd.protocol XrdHttp:80 libXrdHttp.so
    # More configuration files can be added in /etc/xrootd/config.d/
    # For example /etc/xrootd/config.d/10-mygrid.cfg and
    # /etc/xrootd/config.d/98-mysite-specifics.cfg
    #
    continue /etc/xrootd/config.d/

Load http protocol, choose port and start service. The socket bound to port 80 has to be preallocated by the systemd xrdhttp.socket (it requires systemd).

.. code-block:: bash
    
    sudo systemctl enable xrdhttp@http.socket
    sudo systemctl start xrdhttp@http.socket
    sudo systemctl start xrootd@http 
    sudo systemctl status xrootd@http 

Test your basic deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^

In order to test the installation until this point, we will test if the service can access/download a file:

.. code-block:: bash

    [centos@xrootd ~]$ ls -lh /data/four.txt 
    -rw-r--r--. 1 xrootd xrootd 77 Jan 25 13:21 /data/four.txt
    [centos@xrootd ~]$ sudo cat /data/four.txt 
    This is the content for four.txt
    [centos@xrootd ~]$
    [centos@xrootd ~]$ curl http://localhost/data/four.txt
    This is the content for four.txt
    [centos@xrootd ~]$ 

Enabling SSL/TLS 
----------------

Get your certificates from your provider of choice (remember ownership and permissions on files) and update configuration file "/etc/xrootd/xrootd-http.cfg".

.. code-block:: bash

    # Config TLS
    xrd.tls /etc/grid-security/xrd/xrdcert.pem /etc/grid-security/xrd/xrdkey.pem
    xrd.tlsca certdir /etc/grid-security/certificates refresh 8h
    xrootd.tls capable all -data

.. note::
    
    Important: The "continue" directives in the xrootd-http.cfg file essentially stop reading after that line, meaning any configuration directives added below that are ignored! Add your config file edits above that line.

.. note::

    - The Xrootd framework can run multiple protocols in the same TCP port.
    - HTTP and HTTPS live in the same port.
    - Once a connection is given to XrdHTTP, it applies some heuristics to discriminate between http/https
    - Basically “if it’s not an ASCII HTTP request then try with SSL, otherwise fail” 

Test your SSL/TLS deployment

.. code-block:: bash

    [centos@xrootd ~]$ curl http://xrootd.e-commons.chalmers.se/data/four.txt
    This is the content for four.txt
    [centos@xrootd ~]$ sudo curl --cacert /etc/letsencrypt/live/xrootd.e-commons.chalmers.se/fullchain.pem https://xrootd.e-commons.chalmers.se:80/data/four.txt
    This is the content for four.txt
    [centos@xrootd ~]$

    vitlacil@macCarone ~ % curl --cacert xrootd.e-commons.chalmers.se.fullchain.pem https://xrootd.e-commons.chalmers.se:80/data/four.txt 
    This is the content for four.txt
    vitlacil@macCarone ~ %

Token-based authentication and authorisation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Installation of Token Tools: 

.. code-block:: bash

    [centos@xrootd ~]$  sudo cd /etc/yum.repos.d; wget https://repo.data.kit.edu//data-kit-edu-centos7.repo
    [centos@xrootd ~]$  sudo yum install oidc-agent

If on CentOS Stream 9, there are no built rpms of oidc-agent.
However, the oidc-agent github repo contains a rpm/oidc-agent.spec file that can be used to build it, roughly as follows:

.. code-block:: bash

    dnf config-manager --set-enabled crb
    yum-builddep rpm/oidc-agent.spec
    mkdir -p ~/rpmbuild/SOURCES # copy the oidc agent source in here; should be a .tar.gz that contains a directory named oidc-agent-4.5.2 with the repo sources inside.
    rpmbuild -ba rpm/oidc-agent.spec
    cd ~/rpmbuild/RPMS/x86_64 && dnf install --setopt=install_weak_deps=False oidc-agent-4.5.2-1.el9.x86_64.rpm oidc-agent-desktop-4.5.2-1.el9.x86_64.rpm oidc-agent-cli-4.5.2-1.el9.x86_64.rpm liboidc-agent4-4.5.2-1.el9.x86_64.rpm

Once installed, start oidc-agent :

.. code-block:: bash

    [centos@xrootd ~]$ eval $(oidc-agent)
    Agent pid 1897
    [centos@xrootd ~]$

In order to obtain a token a user needs a client to be registered. A new client is registered using the oidc-gen command, as follows:

.. code-block:: bash

    [centos@xrootd ~]$ oidc-gen --iss https://iam-escape.cloud.cnaf.infn.it/ --scope max --flow=device escape
    Registering Client ...
    Generating account configuration ...
    accepted
    Using a browser on any device, visit:
    https://iam-escape.cloud.cnaf.infn.it/device
    And enter the code: Y5TLJ6
    ############################### After interaction with ESCAPE IAM ####################### 
    https://iam-escape.cloud.cnaf.infn.it/device/approve should inform you that:
    oidc-agent:escape-xrootd.e-commons.chalmers.se

    The device has been approved.

    #####################################################################################

    Enter encryption password for account configuration 'escape': 
    Confirm encryption Password: 
    Everything setup correctly!
    [centos@xrootd ~]$ oidc-gen -l
    The following account configurations are usable: 
    escape
    [centos@xrootd ~]$

    [centos@xrootd ~]$ export AT=`oidc-token escape`
    [centos@xrootd ~]$ echo $AT
    eyJ<TOKEN...>.


Enabling token-based authN/Z for the WLCG IAM instance
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install the xrootd-scitokens plugin. This is for example part of the upstream XRootD yum repository.

.. code-block:: bash
    
    [centos@xrootd ~]$ sudo yum install xrootd-scitokens


Add the WLCG issuer to the list of the trusted issuers by the SciTokens library. This can be done by creating a configuration file e.g. at /etc/xrootd/scitokens.cfg with the following content (assuming xrootd should act as the xrootd user and files stored in the /data/grid):

.. code-block:: bash

    [Global] 
    onmissing = passthrough 

    [Issuer ESCAPE IAM] 
    issuer =  https://iam-escape.cloud.cnaf.infn.it/
    base_path = /data
    map_subject = false 
    default_user = xrootd

Note that the onmissing = passthrough part is needed to continue with other authorization libraries, such as the Macaroons library, and to continue with the evaluation of an authdb file (if used).

Extend your existing xrootd configuration file. To stack with the macaroons authentication library, you will need:

.. code-block:: bash

    ofs.authlib ++ libXrdAccSciTokens.so config=/etc/xrootd/scitokens.cfg
    ofs.authlib ++ libXrdMacaroons.so
    ofs.authorize 1
    # Pass the bearer token to the Xrootd authorization framework.
    http.header2cgi Authorization authz

.. note::

    The ++ is needed for stacking of the authorization libraries. If this is not needed, i.e. you only use one library, the ++ can be dropped. In case an acc.authdb file is used, authorization can be granted.
    
Example of configuration directives to add to /etc/xrootd/xrootd-http.cfg

.. code-block:: bash

    # Enable Security
    xrootd.seclib libXrdSec.so
    sec.level all compatible

    # More configuration files can be added in /etc/xrootd/config.d/
    # For example /etc/xrootd/config.d/10-mygrid.cfg and
    # /etc/xrootd/config.d/98-mysite-specifics.cfg

    # Authentication and Authorisation part
    ofs.authorize 1
    ofs.authlib ++ libXrdAccSciTokens.so config=/etc/xrootd/scitokens.cfg
    ofs.authlib ++ libXrdMacaroons.so
    acc.authdb /etc/xrootd/Authfile
    acc.audit deny
    acc.authrefresh 60

    # Pass the bearer token to the Xrootd authorization framework.
    http.header2cgi Authorization authz

    # Only for debugging (comment out after setup is done)
    scitokens.trace all
    ofs.trace all
    pfc.trace all
    xrd.trace all -sched
    pss.setopt DebugLevel 5

    # libXrdMacaroons expects all.sitename to be defined
    all.sitename CHSRC-RSE

Example of /etc/xrootd/scitokens.cf

.. code-block:: bash

    [Global]
    onmissing = passthrough
    # don't use https://wlcg.cern.ch/jwt/v1/any on production instances
    # audience = https://xrd.example.com:1094, https://wlcg.cern.ch/jwt/v1/any

    [Issuer ESCAPE IAM]
    issuer = https://iam-escape.cloud.cnaf.infn.it/
    base_path = /data
    map_subject = false
    default_user = xrootd



