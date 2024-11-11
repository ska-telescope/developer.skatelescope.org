.. _tutorial-vault-gitlab-integration:

******************************
GitLab CI/CD Vault Integration
******************************

GitLab CI/CD can integrate with HashiCorp Vault using **OIDC** (OpenID Connect) with seamless authentication for secret retrieval. This method allows GitLab jobs to authenticate with Vault securely without additional service tokens or passwords. For more information, check how `ID tokens <https://docs.gitlab.com/ee/ci/secrets/convert-to-id-tokens.html>`_ are used. To be able to use GitLab's integration, we will use the production Vault instance and not a local one.
By default, GitLab has the same access level as all SKAO developers: **read** access to the **dev** and **kv** KV engines in Vault. Having that in mind, we will use one of these KV engines in our tutorial instructions.

In this tutorial you will learn how to create jobs in your GitLab CI/CD pipeline that retrieve configurations from Vault and how to inject them as **files** or **environment variables**.

We will cover:

.. contents::
   :depth: 2
   :local:

Prerequisites
-------------
- An existing project in SKAO's GitLab group
- SKAO Developer membership in GitLab (belonging to a Team in `GitLab <https://gitlab.com/groups/ska-telescope/ska-dev>`_ is optional but preferred)
- Being able to log in to `Vault <https://vault.skao.int>`_
- `Vault CLI <https://developer.hashicorp.com/vault/tutorials/getting-started/getting-started-install>`_

Creating a secret in Vault's dev KV engine
------------------------------------------

.. note::

   Replace `<team>` with your team's slug at https://gitlab.com/groups/ska-telescope/ska-dev. If your team doesn't have a GitLab group, please reach out to the System Team via `STS <https://jira.skatelescope.org/servicedesk/customer/portal/166>`_. Optionally you can use `skao-team-system` and **skip** the writing commands.


For this first step, you can do it through the `UI <https://vault.skao.int/ui/vault/secrets/dev/kv/list>`_ or, preferably, you can do it using the CLI:

.. code-block:: bash
   :caption: Add test data to Vault

   export VAULT_ADDR=https://vault.skao.int
   export VAULT_TOKEN=$(vault login -address=${VAULT_ADDR} -field=token -no-store -method=oidc role=developer)
   
   # Check that the Vault token is properly set up
   vault token lookup

   # Write some test data to Vault, both env and file
   curl -s https://gitlab.com/ska-telescope/ska-tango-examples/-/raw/master/charts/ska-tango-examples/values.yaml\?ref_type\=heads\&inline\=false | vault kv put -mount=dev <team>/vault-tutorial env="super secret environment variable" file=-

Vault is already integrated with GitLab, so we don't need to worry about setting that up. If you want to do that on your own, you can follow `GitLab's guide <https://docs.gitlab.com/ee/ci/secrets/hashicorp_vault.html>`_.

Using Vault secrets in GitLab CI/CD pipelines
---------------------------------------------

Now that we have data and GitLab's access is provisioned, we simply need to define a job in GitLab - using the `.gitlab-ci.yml` file - to be able to grab secrets from Vault. Note that secrets injected from Vault as environment variables or files are **masked** for security purposes:

.. code-block:: yaml
   :caption: Add test stage to your pipeline

   stages:
     - test-vault
     ...

Having a stage to run on, we can set up a job to expose a secret as an environment variable:

.. code-block:: yaml
   :caption: Gitlab job using a secret as an environment variable

   vault-secret-env:
     stage: test-vault
     variables:
       VAULT_SERVER_URL: https://vault.skao.int # GitLab URL
       VAULT_AUTH_PATH: jwt # GitLab auth method
       VAULT_AUTH_ROLE: developer # GitLab auth method's role
     id_tokens:
       VAULT_ID_TOKEN:
         aud: https://gitlab.com # bound_audiences in GitLab's `VAULT_AUTH_ROLE` of `VAULT_AUTH_PATH` auth method
     secrets:
       TEST:
         vault: <team>/vault-tutorial/env@dev
         file: false
     script:
       - echo "Secret is '$TEST'"

By default, secrets are mounted into files where the path to the file is the value of the environment variable. In this case, `TEST` would point to the path containing the secret at `dev/<your team>/vault-tutorial/env`. It is common practice - although strongly advised against - to modify Helm values on installation using environment variables in the repository's Makefile.
With this approach you can securely inject secrets from Vault into your deployment, as the secrets get exposed as an environment variables.

If you are going to use the secrets in Kubernetes, we strongly advise to use Kubernetes secrets. To know more about it, please check out the tutorial that covers :ref:`Vault in Kubernetes <tutorial-vault>`.

If you still want to use secrets in the deployment directly, a better way lies in using files - for instance - to be passed as `values.yml` to `make k8s-install-chart`. If we use files directly, we can at least have an idea of what the injected values were by comparing the job date and looking for the version of the secret in Vault that was in place at that point in time.

If you are interested, you can do a deep dive on how to implement :ref:`Vault helm values injection <how-vault-gitlab-helm>`.

Lets look at an example of file usage:

.. code-block:: yaml
   :caption: Gitlab job using a secret as a file

   vault-secret-file:
     stage: test-vault
     variables:
       VAULT_SERVER_URL: https://vault.skao.int # GitLab URL
       VAULT_AUTH_PATH: jwt # GitLab auth method
       VAULT_AUTH_ROLE: developer # GitLab auth method's role
       SOME_VAR: file
     id_tokens:
       VAULT_ID_TOKEN:
         aud: https://gitlab.com # bound_audiences in GitLab's `VAULT_AUTH_ROLE` of `VAULT_AUTH_PATH` auth method
     secrets:
       TEST:
         vault: <team>/vault-tutorial/${SOME_VAR}@dev
     script:
       - cat $TEST
       - echo "We could use it as 'VALUES_PATH=$TEST make k8s-install-chart'"

Note that we are using environment variables to create the Vault path we are reading, which gives us full flexibility on setting up a base job and inherit from it. With that in mind, it becomes very simple to design a pipeline (and Makefile) with multiple deployment jobs that can have radically different configurations, just by providing a different `values.yml` per environment.
