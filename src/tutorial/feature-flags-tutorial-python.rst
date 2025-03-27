.. _feature-flags-tutorial-python:

#####################################
Feature Flags with Unleash Python SDK
#####################################

Introduction
------------

This tutorial guides you through integrating feature flags into the ``ska-tango-examples`` project using the Unleash_ Python SDK v5.0. Feature flags (or feature toggles) allow you to modify system behaviour without changing code and redeploying. *Note that ska-tango-examples is chosen as an example project, but the same principles apply to any project.* This is useful for:

*   Gradual/Compatible rollouts of new features.
*   A/B testing different implementations.
*   Enabling/disabling features for specific users, environments, or data centres.
*   Quickly disabling problematic features ("kill switch").

We will focus on setting up the Unleash client in a configurable way suitable for deployments across multiple data centres.

.. _Unleash: https://www.getunleash.io/

Prerequisites
-------------

*   Python 3.10 or later (as specified in ``pyproject.toml``).
*   Poetry for dependency management. If you are using a different package manager, you will need to adjust the ``pyproject.toml`` file accordingly and use the equivalent commands to install the dependencies for the rest of the tutorial.
*   Docker and a container registry (like the SKAO CAR).
*   Helm (v3) and a Kubernetes cluster (like Minikube or an SKAO cluster).
*   Access to an Unleash Server instance (either self-hosted, proxy or GitLab Feature Flags). You will need:
    *   The Unleash server URL.
    *   A Client-side API token.

Installation
------------

Add the Unleash Python SDK as a dependency to the project using Poetry.

.. code-block:: bash

   poetry add UnleashClient

This will update the ``pyproject.toml`` and ``poetry.lock`` files. Ensure you commit these changes.

Configuration
-------------

To support multiple deployment environments (e.g., different data centres, staging vs. production), we should make the Unleash client configuration customisable, preferably via environment variables.

Key configuration parameters include:

*   **UNLEASH_URL**: The URL of the Unleash API server.
*   **UNLEASH_APP_NAME**: A name identifying the application (e.g., ``ska-tango-examples``).
*   **UNLEASH_ENVIRONMENT**: The current environment (e.g., ``development``, ``staging``, ``production``, ``data-centre-1``). This should match an environment defined in the Unleash server.
*   **UNLEASH_INSTANCE_ID**: A unique identifier for this specific instance of the application (useful for stickiness and metrics). Can be hostname or pod name.
*   **UNLEASH_API_TOKEN**: The client-side API token for authentication.
*   **UNLEASH_REFRESH_INTERVAL**: How often (in seconds) the client fetches updated flag definitions (default: 15).
*   **UNLEASH_METRICS_INTERVAL**: How often (in seconds) the client sends usage metrics to the server (default: 60). It's advised to set ``disable_metrics=False`` in the client initialisation to disable metrics collection.
*   **UNLEASH_CUSTOM_STRATEGIES**: (Optional) Path to a file defining custom activation strategies.

These can be set directly in the deployment environment (e.g., Kubernetes ConfigMaps or Secrets) or loaded from a ``.env`` file during local development.

Dockerfile Configuration
------------------------

While you *can* set default values using the ``ENV`` instruction in the ``Dockerfile``, it's generally **not recommended** for configuration that changes between environments or for sensitive data like API tokens. Defaults are mainly useful for local development or non-sensitive, rarely changing parameters.

.. code-block:: bash

   # In Dockerfile

   # ... (previous build stages) ...

   FROM artefact.skao.int/ska-python:0.1.1

   # Adding the virtualenv binaries to the PATH
   ENV VIRTUAL_ENV=/app/.venv
   ENV PATH="$VIRTUAL_ENV/bin:$PATH"

   COPY --from=build ${VIRTUAL_ENV} ${VIRTUAL_ENV}
   COPY --from=tools /usr/local/bin/retry /usr/local/bin/retry
   COPY --from=tools /usr/local/bin/wait-for-it.sh /usr/local/bin/wait-for-it.sh
   COPY src /app/src

   # Add source code and venv packages to PYTHONPATH
   ENV PYTHONPATH="/app/src:app/.venv/lib/python3.10/site-packages/:${PYTHONPATH}"

   # --- Unleash Configuration ---
   # Set defaults (optional, prefer runtime injection via Helm/K8s)
   ENV UNLEASH_APP_NAME="ska-tango-examples"
   ENV UNLEASH_ENVIRONMENT="development"
   # ENV UNLEASH_URL="http://your-default-unleash-url/api" # Example default
   # ENV UNLEASH_REFRESH_INTERVAL="15"
   # ENV UNLEASH_METRICS_INTERVAL="60"

   # --- IMPORTANT ---
   # DO NOT set UNLEASH_API_TOKEN here. Inject it securely at runtime.
   # UNLEASH_URL, UNLEASH_ENVIRONMENT, UNLEASH_INSTANCE_ID should ideally
   # also be set at runtime for flexibility across deployments.

   # ... (rest of Dockerfile) ...

The primary way to configure the running container will be through Kubernetes manifests, managed by Helm.

Helm Chart Configuration
------------------------

We will manage the Unleash configuration within the ``ska-tango-examples`` Helm chart.

1.  **Define Values in `values.yaml`**:
    Add a section to ``charts/ska-tango-examples/values.yaml`` to hold Unleash configuration.

    .. code-block:: yaml

       # charts/ska-tango-examples/values.yaml

       # ... (other values) ...

       unleash:
         # URL of the Unleash server API
         url: "http://unleash.ska-tango-examples.svc.cluster.local:4242/api" # Example internal K8s service URL
         # Application name registered in Unleash
         appName: "ska-tango-examples"
         # Environment name (should match Unleash environment)
         environment: "development"
         # Refresh interval in seconds
         refreshInterval: 15
         # Name of the Kubernetes secret containing the API token
         apiTokenSecretName: "ska-tango-examples-unleash-token"
         # Key within the Kubernetes secret that holds the token
         apiTokenSecretKey: "token"

2.  **Manage the API Token Secret using Vault Secrets Operator**:
    The API token should be stored securely in HashiCorp Vault. The Vault Secrets Operator (VSO) will be responsible for syncing this token into a standard Kubernetes ``Secret`` within the application's namespace.
 
    You need to define a ``VaultSecret`` custom resource in Kubernetes. This resource tells VSO:
    *   Which path in Vault contains the Unleash API token (e.g., ``secret/data/ska-tango-examples/unleash``).
    *   Which key within that Vault path holds the token (e.g., ``api_token``).
    *   What to name the Kubernetes ``Secret`` that VSO will create/manage (this should match ``unleash.apiTokenSecretName`` from the ``values.yaml``, e.g., ``ska-tango-examples-unleash-token``).
    *   What key to use within the managed Kubernetes ``Secret`` (this should match ``unleash.apiTokenSecretKey`` from the ``values.yaml``, e.g., ``token``).
 
    Example ``VaultSecret`` resource (this definition might exist elsewhere in your infrastructure configuration):

    .. code-block:: yaml

       apiVersion: secrets.hashicorp.com/v1beta1
       kind: VaultSecret
       metadata:
         name: ska-tango-examples-unleash-token-sync # Name for the VSO resource itself
         namespace: <the-target-namespace> # The namespace where your app runs
       spec:
         # vaultConnectionRef: vault-connection # Optional: Reference to Vault connection details if needed
         kubernetesSecret:
           secretName: ska-tango-examples-unleash-token # K8s secret VSO manages (matches values.yaml)
           secretType: Opaque
           data:
             - secretKey: token      # Key in the K8s secret (matches values.yaml)
               vaultKey: api_token # Key in the Vault secret data
         vaultSecret:
           path: secret/data/ska-tango-examples/unleash # Example Vault path (KV v2)
           secretEngine: kv-v2 # Assuming KV v2 engine

    .. warning::
       Ensure the actual token is securely stored *only* in Vault. The ``VaultSecret`` resource itself does not contain the sensitive token.

3.  **Inject Environment Variables in Helm Template**:
    Modify the Helm template that defines the Tango device server deployments to inject the configuration as environment variables. Since we are using ``ska-tango-util``, this likely involves the ``ska-tango-util.multidevice-job.tpl`` helper or similar templates that render the Deployment/StatefulSet/Job. You need to add an ``env`` section to the container definition.

    Let's assume the relevant part of the template looks something like this:

    .. code-block:: bash

       {# ... inside the container spec ... #}
       env:
         # --- Add Unleash Environment Variables ---
         - name: UNLEASH_URL
           value: {{ .Values.unleash.url | quote }}
         - name: UNLEASH_APP_NAME
           value: {{ .Values.unleash.appName | quote }}
         - name: UNLEASH_ENVIRONMENT
           value: {{ .Values.unleash.environment | quote }}
         - name: UNLEASH_REFRESH_INTERVAL
           value: {{ .Values.unleash.refreshInterval | quote }}
         # Inject Instance ID (e.g., using Pod name via Downward API)
         - name: UNLEASH_INSTANCE_ID
           valueFrom:
             fieldRef:
               fieldPath: metadata.name
         # Inject API Token from Secret
         - name: UNLEASH_API_TOKEN
           valueFrom:
             secretKeyRef:
               name: {{ .Values.unleash.apiTokenSecretName }}
               key: {{ .Values.unleash.apiTokenSecretKey }}
       {# ... (rest of container spec) ... #}

    .. note::
       *   The `UNLEASH_INSTANCE_ID` is set using the Kubernetes Downward API to automatically use the Pod's name, ensuring uniqueness.
       *   The `UNLEASH_API_TOKEN` is securely injected from the specified Kubernetes secret.

4.  **Deploy/Upgrade**:
    Deploy or upgrade the Helm release using the updated chart and values.

    .. code-block:: bash

       # Example using make, assuming values are set correctly
       make k8s-install-chart # or make k8s-upgrade-chart

       # Or using helm directly
       helm upgrade --install <release-name> charts/ska-tango-examples \
         --namespace <your-namespace> \
         --values charts/ska-tango-examples/values.yaml \
         # Add --set options if needed, e.g.:
         # --set unleash.url="https://prod-unleash.example.com/api" \
         # --set unleash.environment="production"

Initialisation
--------------

The Unleash client needs to be initialised once when the application (or relevant part of it) starts. For Tango devices, this could be done within the device's ``init_device`` method, but care must be taken to avoid re-initialising unnecessarily or creating multiple clients. A better approach might be a shared utility module or a singleton pattern.

Here's an example of how to initialise the client using environment variables:

.. code-block:: python

   # src/ska_tango_examples/feature_flags.py (New file)

   import os
   import logging
   from UnleashClient import UnleashClient
   from UnleashClient.strategies import Strategy

   # Optional: Define custom strategies if needed
   # class MyCustomStrategy(Strategy):
   #     def load_provisioning(self) -> list:
   #         return [x.strip() for x in self.parameters["userIds"].split(',')]
   #
   #     def apply(self, context: dict = None) -> bool:
   #         """ Custom strategy application logic """
   #         if "userId" in context:
   #             return context["userId"] in self.parameters["userIds"]
   #         else:
   #             return False
   #
   # custom_strategies = {"myCustomStrategy": MyCustomStrategy}

   logger = logging.getLogger(__name__)

   # Global variable to hold the client instance
   _unleash_client = None

   def initialise_feature_flags():
       """
       Initialises the Unleash client using environment variables.
       Ensures only one client is initialised (singleton-like).
       """
       global _unleash_client
       if _unleash_client and _unleash_client.is_initialized:
           logger.info("Unleash client already initialised.")
           return _unleash_client

       # Read configuration from environment variables
       unleash_url = os.getenv("UNLEASH_URL", "http://localhost:4242/api") # Default for local dev
       unleash_app_name = os.getenv("UNLEASH_APP_NAME", "ska-tango-examples")
       unleash_environment = os.getenv("UNLEASH_ENVIRONMENT", "development")
       unleash_instance_id = os.getenv("UNLEASH_INSTANCE_ID", "not-set")
       unleash_api_token = os.getenv("UNLEASH_API_TOKEN", "default:development.unleash-insecure-api-token") # Example insecure token
       unleash_refresh_interval = int(os.getenv("UNLEASH_REFRESH_INTERVAL", 15))
       # Add custom strategies if defined:
       # strategies = custom_strategies

       headers = {"Authorization": f"{unleash_api_token}"}

       try:
           logger.info(f"Initialising Unleash client for app '{unleash_app_name}' in env '{unleash_environment}' connecting to {unleash_url}")
           _unleash_client = UnleashClient(
               url=unleash_url,
               app_name=unleash_app_name,
               environment=unleash_environment,
               instance_id=unleash_instance_id,
               refresh_interval=unleash_refresh_interval,
               metrics_interval=unleash_metrics_interval,
               custom_headers=headers,
               # strategies=strategies # Uncomment if using custom strategies
           )
           _unleash_client.initialize_client()
           logger.info("Unleash client initialised successfully.")
       except Exception as e:
           logger.error(f"Failed to initialise Unleash client: {e}", exc_info=True)
           # Depending on requirements, you might want to raise the exception
           # or handle it gracefully (e.g., all flags default to off).
           _unleash_client = None # Ensure client is None if init fails

       return _unleash_client

   def get_feature_flag_client():
       """
       Returns the initialised Unleash client instance.
       Initialises it if it hasn't been already.
       """
       if _unleash_client is None or not _unleash_client.is_initialized:
           return initialise_feature_flags()
       return _unleash_client

   def is_feature_enabled(feature_name: str, context: dict = None, fallback_value: bool = False) -> bool:
       """
       Checks if a feature flag is enabled.

       :param feature_name: The name of the feature flag.
       :param context: Optional context for evaluation (e.g., {'userId': '...', 'properties': {'datacenter': '...'}}).
       :param fallback_value: The value to return if the client isn't initialised or the flag check fails.
       :return: True if the feature is enabled, False otherwise.
       """
       client = get_feature_flag_client()
       if client:
           try:
               enabled = client.is_enabled(feature_name, context=context, fallback_value=fallback_value)
               logger.debug(f"Feature flag '{feature_name}' evaluation result: {enabled}")
               return enabled
           except Exception as e:
               logger.error(f"Error checking feature flag '{feature_name}': {e}", exc_info=True)
               return fallback_value
       else:
           logger.warning(f"Unleash client not initialised. Falling back for feature '{feature_name}'.")
           return fallback_value

.. note::
   The ``initialise_feature_flags`` function should be called early in the application's lifecycle. The ``get_feature_flag_client`` provides a way to access the client instance, and ``is_feature_enabled`` is the primary function you'll use to check flags. The fallback mechanism ensures the application doesn't crash if Unleash is unavailable.

Basic Usage
-----------

To check if a feature is enabled, use the ``is_feature_enabled`` helper function. Note that the ``is_feature_enabled`` function is a wrapper around the ``client.is_enabled`` method as a convenience.

.. code-block:: python

   from ska_tango_examples.feature_flags import is_feature_enabled

   # Example within a Tango device command or method
   def some_method(self):
       if is_feature_enabled("use-new-algorithm"):
           self.logger.info("Using the new algorithm.")
           # ... execute new code path ...
       else:
           self.logger.info("Using the old algorithm.")
           # ... execute old code path ...

Contextual Usage
----------------

Unleash allows targeting flags based on context (user ID, session ID, remote address, custom properties like data centre).

.. code-block:: python

   from ska_tango_examples.feature_flags import is_feature_enabled

   def handle_request(self, user_id, data_centre):
       context = {
           "userId": user_id,
           "properties": {
               "dataCentre": data_centre
           }
       }

       if is_feature_enabled("beta-feature-x", context=context):
           self.logger.info(f"User {user_id} in {data_centre} gets beta feature X.")
           # ... enable feature ...
       else:
           self.logger.info(f"User {user_id} in {data_centre} does not get beta feature X.")
           # ... standard behaviour ...

Integration Example
-------------------

Let's consider integrating this into the ``Motor`` device (``src/ska_tango_examples/basic_example/Motor.py``).

1.  **Import**: Add `from ska_tango_examples.feature_flags import initialise_feature_flags, is_feature_enabled` at the top.
2.  **Initialise**: Call `initialise_feature_flags()` within the `init_device` method of the `Motor` class.

    .. code-block:: python

       # Inside Motor class
       def init_device(self):
           """Initialises the attributes and properties of the Motor."""
           super().init_device()
           # PROTECTED REGION ID(Motor.init_device) ENABLED START #
           self.logger = logging.getLogger(__name__)
           self.logger.info("set_change_event on PerformanceValue")
           self.set_change_event("PerformanceValue", False, True)
           self._dev_factory = DevFactory()
           self.powerSupply = None

           # Initialise Unleash Client
           initialise_feature_flags()
           # PROTECTED REGION END #    //  Motor.init_device

3.  **Use Flag**: Modify a command, for example, `TurnOn`, to behave differently based on a flag.

    .. code-block:: python

       # Inside Motor class
       @command()
       @DebugIt()
       def TurnOn(self):
           # PROTECTED REGION ID(Motor.TurnOn) ENABLED START #
           try:
               power_state = self.powerSupply.state()
               if power_state != DevState.ON:
                   # Check a feature flag before turning on the power supply maybe?
                   if is_feature_enabled("motor-requires-gentle-startup"):
                       self.logger.info("Performing gentle power supply startup sequence.")
                       # Add specific logic here, e.g., ramp up voltage slowly
                       # For now, just log and proceed as normal for demo
                       self.powerSupply.turn_on() # Assuming turn_on handles it, or call specific ramp command
                   else:
                       self.logger.info("Performing standard power supply startup.")
                       self.powerSupply.turn_on()

           except Exception as ex:
               self.logger.info("No power state or error during TurnOn: %s", ex)
               # Decide if the motor state should reflect this failure
               self.set_state(DevState.FAULT)
               return # Or raise exception

           self.set_state(DevState.ON)
           # PROTECTED REGION END #    //  Motor.TurnOn

Advanced Topics
---------------

*   **Custom Strategies**: Implement custom logic for activating flags beyond the built-in strategies. See the commented-out example in the initialisation code.
*   **Variants**: Use flags to return different configurations (e.g., strings, JSON) instead of just boolean on/off. Use ``client.get_variant()``.
*   **Metrics**: The client automatically sends metrics. Ensure the Unleash server is configured to receive them if needed.
*   **Impression Data**: Track *why* a flag was enabled/disabled for a user (requires Unleash v4.3+). Enable with ``impression_data=True`` during client initialisation.
*   **Bootstrapping**: Provide initial flag states for faster startup or offline scenarios.

Best Practices
--------------

*   **Graceful Degradation**: Always provide a default behaviour (using `fallback_value` or checking `client.is_initialized`) in case the Unleash server is unreachable or the client fails to initialise.
*   **Logging**: Log feature flag decisions, especially when behaviour changes, to aid debugging.
*   **Clean Up**: Regularly remove flags from the code once features are fully rolled out or deprecated.
*   **Naming Conventions**: Use clear, descriptive names for the feature flags.
*   **Security**: Manage API tokens securely using Kubernetes secrets or other secure mechanisms. Do not hardcode them or commit them to version control.
*   **Vault Integration**: Ensure VSO has the correct permissions (Vault policies, Kubernetes service account roles) to read the specified Vault path and manage secrets in the target namespace.

Conclusion
----------

You have now learned how to install, configure, initialise, and use the Unleash Python SDK v5.0(v6.0 is not yet supported by GitLab) within the ``ska-tango-examples`` project, including configuration via Docker and Helm, leveraging the Vault Secrets Operator for secure API token management. By using environment variables and VSO-managed Kubernetes secrets, this setup is suitable for multi-data centre deployments. Feature flags provide powerful control over application behaviour, enabling safer releases and more flexible operations.