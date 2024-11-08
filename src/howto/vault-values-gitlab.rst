.. _how-vault-gitlab-helm:

Using Vault to supply Helm values in Gitlab CICD pipelines
**********************************************************

This page covers how we can leverage :ref:`Vault integration with Gitlab <tutorial-vault-gitlab-integration>` and the :ref:`Vault structure <explanation-vault-structure>` to efficiently pass values to the Helm chart installation command. We will use this `repository <https://gitlab.com/ska-telescope/ska-tango-charts>`_ as an example, but the changes done can be replicated to any SKAO repository. You can view the complete `Merge Request <https://gitlab.com/ska-telescope/ska-tango-charts/-/merge_requests/5>`_ for the full set of changes.

.. note::

   Currently Gitlab's `native` integration with Vault doesn't allow to specify a version. This can easily be overcome by implementing custom code to pull the secrets with a particular version and merge them in the supplied order. If you are interested in using this deployment and configuration management strategy, please reach out to the `System Team <https://skao.slack.com/archives/CEMF9HXUZ>`_.


Setting up configurations in Vault
----------------------------------

First, we should analyze what values we are currently being passed using Makefile arguments. This pipeline has two test jobs - deploy with and without the **SKA Tango Operator**. We will analyze both to demonstrate also how easy it is to setup a pipeline with jobs that have differing inputs. Lets look at the supplied values:

.. code-block:: yaml
   :caption: Values passed for the deployment without the operator

   USER-SUPPLIED VALUES:
   global:
     cluster_domain: techops.internal.skao.int
     device_server_port: 45450
     exposeAllDS: false
     exposeDatabaseDS: false
     minikube: false
     operator: false
     tango_host: tango-databaseds:10000

.. code-block:: yaml
   :caption: Values passed for the deployment without the operator

   USER-SUPPLIED VALUES:
   global:
     cluster_domain: techops.internal.skao.int
     device_server_port: 45450
     exposeAllDS: false
     exposeDatabaseDS: false
     minikube: false
     operator: true
     tango_host: tango-databaseds:10000

Note that the only difference is how we the `operator` flag is set. We can identify three types of configurations in these values:

- Datacentre/environment specific configurations:
    - cluster_domain: specific to the cluster the chart will be deployed to
    - exposeAllDS: configure LoadBalancer creation by default (e.g, it can quickly exhaust NodePorts in a cluster like the CICD cluster if set to true)
    - exposeDatabaseDS: same as `exposeAllDS`
    - minikube: Control if deploying to a minikube cluster or not
- Deployment strategy configurations:
    - operator: Specify if device server deployment is to be done with the SKA Tango Operator or not
- Application specific configurations:
    - tango_host: Target TANGO database address
    - device_server_port: Target Device Server port

Splitting the values, we end up with the following values files, that we can add to Vault:

#. Environment-specific values

    .. code-block:: yaml
       :caption: stfc-techops/production/default/values.yml@dev

       global:
         cluster_domain: techops.internal.skao.int
         exposeAllDS: false
         exposeDatabaseDS: false
         minikube: false

#. Application-specific values

    .. code-block:: yaml
       :caption: skao-team-system/ska-tango-charts/values.yml@dev

       global:
         tango_host: tango-databaseds:10000
         device_server_port: 45450

#. Deployment strategy values with the SKA Tango Operator

    .. code-block:: yaml
       :caption: shared/default/operator/values.yml@dev

       global:
         operator: true

#. Deployment strategy values without the SKA Tango Operator

    .. code-block:: yaml
      :caption: shared/default/no-operator/values.yml@dev

      global:
        operator: false


Modifying the Makefile and Gitlab pipeline definition
-----------------------------------------------------

It is a widespread pattern to supply Helm chart configurations using Makefile logic as switches (flags), as we currently use in ska-tango-charts repository:

::

   MINIKUBE ?= true ## Minikube or not
   TANGO_HOST ?= tango-databaseds:10000
   TANGO_SERVER_PORT ?= 45450
   CLUSTER_DOMAIN ?= cluster.local
   SKA_TANGO_OPERATOR ?= false

   K8S_CHART_PARAMS ?= --set global.minikube=$(MINIKUBE) \
     --set global.exposeDatabaseDS=$(MINIKUBE) \
     --set global.exposeAllDS=$(MINIKUBE) \
     --set global.tango_host=$(TANGO_HOST) \
     --set global.device_server_port=$(TANGO_SERVER_PORT) \
     --set global.operator=$(SKA_TANGO_OPERATOR) \
     --set global.cluster_domain=$(CLUSTER_DOMAIN)

This is an inefficient pattern, as it highly reduces the readability and predictability of the supplied values. We have the defaults in the Makefile, and then we need to trace the logic we might implement to set these variables, as well as the value of a particular environment variable at that time, for the specific job in the pipeline. The maintainability and usability of a chart that needs a Makefile to be deployed is severely **degraded**. In the pipeline, we install the chart using:

.. code-block:: bash
   :caption: Command using switches passed in the Makefile

   $ helm upgrade --install test \
     --set global.minikube=false \
     --set global.exposeDatabaseDS=false \
     --set global.exposeAllDS=false \
     --set global.tango_host=tango-databaseds:10000 \
     --set global.device_server_port=45450 \
     --set global.operator=false \
     --set global.cluster_domain=techops.internal.skao.int \
     ./charts/ska-tango-umbrella/ \
     --namespace ci-ska-tango-charts-9c805bda-no-op

This `train` of switches can quickly grow, as well as the internal logic in the Makefile that make them up. It is also difficul to establish a precedence of values without reading the complete Makefile. We can adapt it to use the values files we are created previously:

::

   ifneq ($(K8S_VALUES_FILES),)
   K8S_CHART_PARAMS ?= $(foreach f,$(K8S_VALUES_FILES),-f $(f))
   endif

On the pipeline, we set:

.. code-block:: yaml
   :caption: CICD pipeline changes

   k8s-test:
     variables:
       KUBE_NAMESPACE: 'ci-$CI_PROJECT_NAME-$CI_COMMIT_SHORT_SHA'
       K8S_VALUES_FILES: "${ENVIRONMENT_VALUES} ${DEP_STRATEGY_VALUES} ${APP_VALUES}"
     id_tokens:
       VAULT_ID_TOKEN:
         aud: https://gitlab.com
     secrets:
       ENVIRONMENT_VALUES:
         vault: ${CLUSTER_DATACENTRE}/${CLUSTER_ENVIRONMENT}/default/values.yml@dev
         file: true
       DEP_STRATEGY_VALUES:
         vault: shared/default/operator/values.yml@dev
         file: true
       APP_VALUES:
         vault: skao-team-system/ska-tango-charts/values.yml@dev
         file: true

   k8s-test-no-operator:
     variables:
       KUBE_NAMESPACE: 'ci-$CI_PROJECT_NAME-$CI_COMMIT_SHORT_SHA-no-op'
       K8S_VALUES_FILES: "${ENVIRONMENT_VALUES} ${DEP_STRATEGY_VALUES} ${APP_VALUES}"
     id_tokens:
       VAULT_ID_TOKEN:
         aud: https://gitlab.com
     secrets:
       ENVIRONMENT_VALUES:
         vault: ${CLUSTER_DATACENTRE}/${CLUSTER_ENVIRONMENT}/default/values.yml@dev
         file: true
       DEP_STRATEGY_VALUES:
         vault: shared/default/no-operator/values.yml@dev
         file: true
       APP_VALUES:
         vault: skao-team-system/ska-tango-charts/values.yml@dev
         file: true

It becomes very clear what we are going to supply and the order of precedence. Note that the only change we are making between the two jobs for the values files is the path we reading from for `DEP_STRATEGY_VALUES` to enable or disable the operator. Looking at the `pipeline <https://gitlab.com/ska-telescope/ska-tango-charts/-/pipelines/1532315319>`__ (e.g., for the **no operator** job), the code becomes cleaner:

.. code-block:: bash
   :caption: Command and user-supplied values when using `K8S_VALUES_FILES`
   
   $ helm upgrade --install test \
     -f /builds/ska-telescope/ska-tango-charts.tmp/ENVIRONMENT_VALUES \
     -f /builds/ska-telescope/ska-tango-charts.tmp/DEP_STRATEGY_VALUES \
     -f /builds/ska-telescope/ska-tango-charts.tmp/APP_VALUES \
     ./charts/ska-tango-umbrella/ \
     --namespace ci-ska-tango-charts-db00c1fe-no-op

   $ helm get values test -n ci-ska-tango-charts-db00c1fe-no-op
   USER-SUPPLIED VALUES:
   global:
     cluster_domain: techops.internal.skao.int
     device_server_port: 45450
     exposeAllDS: false
     exposeDatabaseDS: false
     minikube: false
     operator: false
     tango_host: tango-databaseds:10000

These inputs match the ones provided and are very much predictable and easy to understand. If we want to have dynamic values in the values files, we should always make sure they are related to the current context and not involving logic (e.g., if namespace starts with `dev`, set ten different flags). Lets look at an example:

.. code-block:: yaml
   :caption: Contextual values file: shared/default/context/values.yml@dev

   global:
     context:
       gitlab:
         author: ${CI_COMMIT_AUTHOR}
         ref: ${CI_COMMIT_REF_NAME}
         commit: ${CI_COMMIT_SHA}
         pipelineId: ${CI_PIPELINE_ID}
         projectId: ${CI_PROJECT_ID}
         project: ${CI_PROJECT_PATH}
       kubernetes:
         datacentre: ${CLUSTER_DATACENTRE}
         environment: ${CLUSTER_ENVIRONMENT}
         namespace: ${KUBE_NAMESPACE}

We would need to refactor our Makefile to call the environment substitution tool inline:

::

   ifneq ($(K8S_VALUES_FILES),)
   K8S_CHART_PARAMS ?= $(foreach f,$(K8S_VALUES_FILES),-f <(envsubst < $(f)))
   endif

This will call the **envsubst** that replaces environment variables in files. Again, inspecting the `pipeline <https://gitlab.com/ska-telescope/ska-tango-charts/-/pipelines/1532348364>`_ (e.g., for the **no operator** job), the code becomes cleaner:

.. code-block:: bash
   :caption: Command and user-supplied values when using `K8S_VALUES_FILES`

   $ helm upgrade --install test \
     -f <(envsubst < /builds/ska-telescope/ska-tango-charts.tmp/ENVIRONMENT_VALUES) \
     -f <(envsubst < /builds/ska-telescope/ska-tango-charts.tmp/CONTEXT_VALUES) \
     -f <(envsubst < /builds/ska-telescope/ska-tango-charts.tmp/DEP_STRATEGY_VALUES) \
     -f <(envsubst < /builds/ska-telescope/ska-tango-charts.tmp/APP_VALUES) \
     ./charts/ska-tango-umbrella/ \
     --namespace ci-ska-tango-charts-ff1fdcee-no-op

   $ helm get values test -n ci-ska-tango-charts-ff1fdcee-no-op
   USER-SUPPLIED VALUES:
   global:
     cluster_domain: techops.internal.skao.int
     context:
       gitlab:
         author: Pedro Osório Silva <pedroosorio.eeic@gmail.com>
         commit: ff1fdcee3636d03e605643d37bc51a31c846b6b1
         pipelineId: 1532348364
         project: ska-telescope/ska-tango-charts
         projectId: 61564537
         ref: st-2137-demo-vault-value-injection
       kubernetes:
         datacentre: stfc-techops
         environment: production
         namespace: ci-ska-tango-charts-ff1fdcee-no-op
     device_server_port: 45450
     exposeAllDS: false
     exposeDatabaseDS: false
     minikube: false
     operator: false
     tango_host: tango-databaseds:10000

This pattern makes it possible to have predefined datacentre/environment-specific values and enables good practice configurations to be re-used by different Helm charts, as setting **global.minikube**, **global.cluster_domain** and perhaps add default **labels** or **annotations** to track the provenance of a deployment to its pipeline or job. More than that, it enables the **sharing** nature of the :ref:`Vault structure <explanation-vault-structure>` without using a third-party service like a `GitOps Kubernetes Operator <https://docs.gitlab.com/ee/user/clusters/agent/gitops.html>`_. If you are interested in using this deployment and configuration management strategy, please reach out to the `System Team <https://skao.slack.com/archives/CEMF9HXUZ>`_.
