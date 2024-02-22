.. _oci-signatures:

*******************************
OCI Images Signature Management
*******************************

Lets looks at the stages needed to **sign** and then to **verify** the signature of an OCI image. Please refer to the :ref:`Software Supply Chain <ssc>` to know more about it.

.. note::
    This guide is for knowledge sharing and should not be used to sign images by developers. CAR or the OCI image consumers that validate signatures will **not accept** self-signed certificates. Be sure to use the :ref:`pipeline machinery <ci-cd>` Gitlab templates and :ref:`makefile submodules <cicd-makefile>` guarantee your OCI images are properly signed when pushed to CAR and can be deployed to SKA Kubernetes clusters.

Signing OCI Images
------------------

We are using **notation** for image signing, which relies on a Private Key Infrastructure (PKI). Other solutions like `Cosign <https://docs.sigstore.dev/certificate_authority/certificate-issuing-overview/>`_ are capable of working with keyless signatures using a public ledger.

PKI setup
~~~~~~~~~

To generate the PKI to sign the images, we are going to setup a **CA**, an **intermediate CA** and a (leaf) **certificate** for signing. Afterwads, we can distribute the CA certificate to our systems, to validate the signature. We issue the leaf certificate from an intermediate so that we can control and rotate these certificates more often.

Using the CA OpenSSL configuration :download:`file <files/openssl.cnf>` do:

.. code-block:: bash

    # Generate CA
    mkdir -p root-ca/certs root-ca/crl root-ca/newcerts root-ca/private && touch root-ca/index.txt && echo 1000 > root-ca/serial
    openssl genrsa -aes256 -out ca.key 4096
    openssl req -config openssl.cnf -key ca.key -new -x509 -days 36500 -sha256 -extensions v3_ca -out ca.pem
    
    # Generate intermediate
    openssl genrsa -aes256 -out oci.interm.key 4096
    openssl req -config openssl.cnf -new -sha256 -key oci.interm.key -out oci.interm.csr # NOTE: Change Common Name
    openssl ca -config openssl.cnf -extensions v3_intermediate_ca -days 3650 -notext -md sha256 -in oci.interm.csr -out oci.interm.pem
    cat oci.interm.pem ca.pem > oci.chain.pem

Now we need to setup the signing certificate, using the intermediate OpenSSL configuration :download:`file <files/intermediate.openssl.cnf>`:

.. code-block:: bash

    # Generate leaf certificate
    mkdir -p intermediate-ca/certs intermediate-ca/crl intermediate-ca/newcerts intermediate-ca/private && touch intermediate-ca/index.txt && echo 1000 > intermediate-ca/serial
    openssl genrsa -aes256 -out oci.signer.key 4096
    openssl req -config intermediate.openssl.cnf -new -sha256 -key oci.signer.key -out oci.signer.csr
    openssl ca -config intermediate.openssl.cnf -extensions v3_signer -days 365 -notext -md sha256 -in oci.signer.csr -out oci.signer.pem
    cat oci.signer.pem oci.chain.pem > oci.fullchain.pem

Note that we can control the validity of each certificate to suit our needs.

Signing with Notation
~~~~~~~~~~~~~~~~~~~~~

First we need to `install <https://notaryproject.dev/docs/user-guides/installation/>`_ notation and setup the local environment:

.. code-block:: bash

    # Add the CA to the trust store
    mkdir -p ~/.config/notation/truststore/x509/ca/skao-oci
    cp ca.pem ~/.config/notation/truststore/x509/ca/skao-oci/skao-oci.pem
    notation certificate list
    
    # Add the key signing profile
    cp oci.signer.key ~/.config/notation/localkeys/
    cp oci.fullchain.pem ~/.config/notation/localkeys/
    
    cat << EOF > ~/.config/notation/signingkeys.json
    {
        "default": "skao-oci",
        "keys": [
            {
                "name": "skao-oci",
                "keyPath": "$HOME/.config/notation/localkeys/oci.signer.key",
                "certPath": "$HOME/.config/notation/localkeys/oci.fullchain.pem"
            }
        ]
    }
    EOF

    notation key ls

Now we can sign any image:

.. code-block:: bash

    notation sign <registry>/<image>:<tag> --key skao-oci

We can also verify if our image has signatures:

.. code-block:: bash

    notation ls <registry>/<image>:<tag>

Validating OCI Image signatures
-------------------------------

To validate the signature, we need to configure **notation's** validation policy:

.. code-block:: bash

    cat << EOF > ./policy.json
    {
        "version": "1.0",
        "trustPolicies": [
            {
                "name": "all",
                "registryScopes": [ "*" ],
                "signatureVerification": {
                    "level" : "strict"
                },
                "trustStores": [ "ca:skao-oci" ],
                "trustedIdentities": [
                    "*"
                ]
            }
        ]
    }
    EOF
    
    notation policy import ./policy.json

We can tailor this policy to only target specific images by chaning the **registryScopes** field. Finally, we can verify the signature:

.. code-block:: bash

    notation verify <registry>/<image>:<tag>

Policy Agent integration
------------------------

Having these signatures allows us to secure our Kubernetes clusters by introducing a signature verification policy, using our :ref:`policy agent <policy-agent>`. Currently we are only targetting our own images. In the future, it is expected that we allow only vetoed and signed third-party images to further increase the security of our systems.
