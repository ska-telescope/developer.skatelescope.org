.. _feature-flags-how-to:

####################
Feature Flag How-Tos
####################

This section contains practical, step-by-step guides for specific tasks related to implementing and managing feature flags within the SKAO context using GitLab/Unleash, Vault, Helm, and Kubernetes. These guides assume you have a basic understanding of feature flags, the development environment (Python/React), and the relevant deployment tools.

.. _howto-check-flag-python:

How To Check a Feature Flag in a Python Service
===============================================

**Goal:** Read the state of a specific feature flag within the Python application code to control its behaviour.

**Assumptions:**

*   You have installed the `UnleashClient` library (v5.x).
*   The `UnleashClient` has been initialised (see :ref:`howto-configure-python-client`).
*   You have a helper module (e.g., `my_app.feature_flags`) providing `is_feature_enabled(flag_name, context, fallback_value)`.
*   You know the name of the feature flag you want to check (e.g., `my-component-new-algorithm`).

**Steps:**

1.  **Import the Helper Function:**
    In the Python module where you need to make the decision:

    .. code-block:: python

       from my_app.feature_flags import is_feature_enabled
       import logging # Or the preferred logger

       logger = logging.getLogger(__name__)

2.  **Prepare Context (If Needed):**
    If the flag's evaluation depends on user ID, environment properties, etc., gather this information into a dictionary.

    .. code-block:: python

       def get_unleash_context(user_info=None, request_info=None):
           """Helper to build the context dictionary for Unleash."""
           context = {}
           if user_info and 'username' in user_info:
               context['userId'] = user_info['username']
           if request_info and 'ip_address' in request_info:
               context['remoteAddress'] = request_info['ip_address']

           # Add custom properties relevant to SKAO strategies
           properties = {}
           # Example: Get data centre from environment or config
           properties['dataCentre'] = os.getenv("DATA_CENTRE", "unknown")
           if user_info and 'role' in user_info:
               properties['userRole'] = user_info['role']

           if properties:
               context['properties'] = properties

           return context

3.  **Call `is_feature_enabled`:**
    Use an `if/else` statement to execute different code paths based on the flag's state. Provide the context dictionary if applicable, and always consider the fallback behaviour.

    .. code-block:: python

       def perform_calculation(input_data, user_info=None, request_info=None):
           """Performs a calculation, potentially using a new algorithm."""

           flag_name = "my-component-new-algorithm"
           context = get_unleash_context(user_info, request_info)

           # Check the flag, providing context and a safe fallback (False)
           if is_feature_enabled(flag_name, context=context, fallback_value=False):
               logger.info(f"Flag '{flag_name}' is ON. Using new calculation method.")
               result = _run_new_calculation(input_data)
           else:
               logger.info(f"Flag '{flag_name}' is OFF or check failed. Using standard calculation method.")
               result = _run_standard_calculation(input_data) # Fallback logic

           return result

       # --- Placeholder functions for the example ---
       def _run_new_calculation(data): return f"New result for {data}"
       def _run_standard_calculation(data): return f"Standard result for {data}"
       # --------------------------------------------

       # Example call
       output = perform_calculation("sample_data", user_info={'username': 'ugur', 'role': 'developer'})
       print(output)

**Outcome:** The Python code now dynamically changes its behaviour based on the state of the `my-component-new-algorithm` feature flag as evaluated by Unleash, using context if provided.

.. _howto-check-flag-react:

How To Check a Feature Flag in a React Application
==================================================

**Goal:** Conditionally render components or change behaviour in the React application based on a feature flag's state, using the Unleash Proxy.

**Assumptions:**

*   You have installed the `@unleash/proxy-client-react` library.
*   The application is wrapped in the `FlagProvider` (see :ref:`howto-configure-react-client`).
*   You know the name of the feature flag (e.g., `show-beta-dashboard-widget`).

**Steps:**

1.  **Import the Hook:**
    In the functional React component:

    .. code-block:: javascript

       import React from 'react';
       import { useFlag } from '@unleash/proxy-client-react';

2.  **Call `useFlag`:**
    Use the hook inside the component to get the boolean state of the flag.

    .. code-block:: tsx

       function Dashboard() {
         const showBetaWidget = useFlag('show-beta-dashboard-widget');

         // ... rest of component setup ...

         return (
           <div>
             <h1>Dashboard</h1>
             <StandardWidget />

             {/* Conditionally render the BetaWidget */}
             {showBetaWidget && <BetaWidget />}

             {/* Alternative: Conditionally apply props or styles */}
             <UserProfileCard simplified={!showBetaWidget} />
           </div>
         );
       }

       // --- Placeholder components ---
       const StandardWidget = () => <div>Standard Widget Content</div>;
       const BetaWidget = () => <div style={{border: '2px dashed blue'}}>Beta Widget!</div>;
       const UserProfileCard = ({ simplified }) => (
         <div>User Profile {simplified ? '(Simplified)' : '(Full)'}</div>
       );

       export default Dashboard;

3.  **(Optional) Use `useVariant` for Configuration:**
    If the flag has variants defined in Unleash to provide configuration (e.g., different text or styles):

    .. code-block:: tsx

       import React from 'react';
       import { useVariant } from '@unleash/proxy-client-react';

       function CallToActionButton() {
         const buttonVariant = useVariant('main-call-to-action-button');

         // Default values if variant is disabled or payload is missing
         const buttonText = buttonVariant?.payload?.value || 'Learn More';
         const buttonColor = buttonVariant?.payload?.color || '#cccccc';

         return (
           <button style={{ backgroundColor: buttonColor, color: 'white', padding: '10px 15px' }}>
             {buttonText}
           </button>
         );
       }

**Outcome:** The React component now dynamically adjusts its rendering or behaviour based on the state or variant of the specified feature flag, as provided by the Unleash Proxy.

.. _howto-configure-python-client:

How To Configure a Python Service for Unleash (Helm/Env/VSO)
============================================================

**Goal:** Configure a Python application deployed via Helm in Kubernetes to connect to an Unleash API (GitLab or Proxy) using environment variables and securely inject the API token via Vault Secrets Operator (VSO).

**Assumptions:**

*   The Python application uses environment variables for configuration.
*   You have a Helm chart for the application.
*   Vault and VSO are operational in the cluster.
*   The Unleash server-side API token is stored in Vault.

**Steps:**

1.  **Store API Token in Vault:**
    Ensure the Unleash server-side API token is stored securely in Vault (e.g., at `secret/data/my-python-service/unleash` with key `api_token`).

2.  **Define `VaultSecret` Resource:**
    Create a `VaultSecret` manifest to instruct VSO to sync the token into a Kubernetes `Secret`.

    .. code-block:: yaml

       :caption: my-python-service-unleash-vaultsecret.yaml

       apiVersion: secrets.hashicorp.com/v1beta1
       kind: VaultSecret
       metadata:
         name: my-python-service-unleash-token-sync
         namespace: <the-app-namespace>
       spec:
         kubernetesSecret:
           secretName: my-python-service-unleash-token # Target K8s Secret name
           data:
             - secretKey: token      # Key within the K8s Secret
               vaultKey: api_token # Key within the Vault secret
         vaultSecret:
           path: secret/data/my-python-service/unleash # Path in Vault

3.  **Update Helm `values.yaml`:**
    Add an `unleash` section to the application's `values.yaml` to hold configuration, including references to the K8s secret managed by VSO.

    .. code-block:: yaml
        
       :caption: values.yaml (snippet)

       unleash:
         url: "http://gitlab.example.com/api/v4/feature_flags/unleash/123" # OR proxy URL
         appName: "my-python-service"
         environment: "staging" # Use Helm templating for dynamic env: {{ .Values.skao.environment }}
         refreshInterval: 15
         metricsInterval: 60
         # Reference the K8s secret managed by VSO
         apiTokenSecretName: "my-python-service-unleash-token"
         apiTokenSecretKey: "token"

       # Example of setting environment dynamically
       # skao:
       #   environment: "staging"

4.  **Update Helm Deployment Template:**
    Modify the Deployment (or StatefulSet/Job) template to inject the Unleash configuration as environment variables, mounting the API token from the VSO-managed secret.

    .. code-block:: jinja
       :caption: templates/deployment.yaml (snippet)

       # ... inside container spec ...
       env:
         - name: UNLEASH_URL
           value: {{ .Values.unleash.url | quote }}
         - name: UNLEASH_APP_NAME
           value: {{ .Values.unleash.appName | quote }}
         - name: UNLEASH_ENVIRONMENT
           value: {{ .Values.unleash.environment | quote }} # Or {{ .Values.skao.environment | quote }}
         - name: UNLEASH_REFRESH_INTERVAL
           value: {{ .Values.unleash.refreshInterval | quote }}
         - name: UNLEASH_METRICS_INTERVAL
           value: {{ .Values.unleash.metricsInterval | quote }}
         # Inject Instance ID (Pod name via Downward API)
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
         # ... other env vars ...

5.  **Implement Client Initialisation:**
    Ensure the Python code initialises the `UnleashClient` using these environment variables (see :ref:`howto-check-flag-python`, Step 4 Initialisation Code).

6.  **Deploy/Upgrade:**
    Deploy or upgrade the application using Helm. VSO will create/update the K8s secret, and the pod will start with the correct environment variables.

**Outcome:** The Python service is configured via Helm, securely receives its API token from Vault via VSO, and can connect to the specified Unleash API endpoint.

.. _howto-configure-react-client:

How To Configure a React Application for Unleash Proxy (Helm/Env/VSO)
=====================================================================

**Goal:** Configure a React application (like `ska-react-webapp-skeleton`) deployed via Helm/Nginx to connect to the Unleash Proxy, using the runtime `env.js` mechanism and securely injecting an optional proxy client key via VSO.

**Assumptions:**

*   The React app uses the `env.js` pattern from `ska-react-webapp-skeleton`.
*   You have a Helm chart for the React app deployment (Nginx serving static files).
*   Vault and VSO are operational.
*   The Unleash Proxy is running and accessible.
*   The *optional* proxy client key (if required by the proxy) is stored in Vault.

**Steps:**

1.  **Update `env_config` and `src/env.ts`:**
    Add `REACT_APP_UNLEASH_*` variables to `env_scripts/env_config` and update the types in `src/env.ts` (see :ref:`howto-check-flag-react`, Step 2 Configuration). Regenerate `src/env.ts` (`make dev-local-env`).

2.  **(If using Proxy Client Key) Store Key in Vault & Define `VaultSecret`:**
    If the proxy requires a client key:
    *   Store the key in Vault (e.g., `secret/data/my-react-app/unleash-proxy` key `proxy_client_key`).
    *   Define a `VaultSecret` resource to sync this key to a K8s secret (e.g., `my-react-app-unleash-proxy-key` with key `key`).

    .. code-block:: yaml
       :caption: my-react-app-unleash-proxy-key-vaultsecret.yaml (Example)

       apiVersion: secrets.hashicorp.com/v1beta1
       kind: VaultSecret
       metadata:
         name: my-react-app-unleash-proxy-key-sync
         namespace: <the-app-namespace>
       spec:
         kubernetesSecret:
           secretName: my-react-app-unleash-proxy-key # Target K8s Secret name
           data:
             - secretKey: key # Key within the K8s Secret
               vaultKey: proxy_client_key # Key within the Vault secret
         vaultSecret:
           path: secret/data/my-react-app/unleash-proxy # Path in Vault

    Apply this manifest.

3.  **Update Helm `values.yaml`:**
    Add an `unleashProxy` section to the React app's `values.yaml`.

    .. code-block:: yaml
       :caption: values.yaml (snippet for React app)

       unleashProxy:
         url: "http://unleash-proxy.<proxy-ns>.svc.cluster.local:3000/proxy"
         appName: "my-react-app"
         environment: "staging" # Or {{ .Values.skao.environment }}
         refreshInterval: 30
         disableMetrics: false
         clientKey:
           enabled: false # Set true if proxy requires a key
           # Reference the K8s secret managed by VSO (if enabled: true)
           secretName: "my-react-app-unleash-proxy-key"
           secretKey: "key"

4.  **Update Helm Nginx Deployment Template:**
    Modify the Nginx container spec in the Helm template (e.g., `templates/nginx.yaml`) to:
    *   Inject `REACT_APP_UNLEASH_*` environment variables.
    *   Mount the proxy client key from the VSO-managed secret *if* `clientKey.enabled` is true.
    *   **Override `command`/`args` to run `env_config.sh` before starting Nginx.**

    .. code-block:: yaml
       :caption: templates/nginx.yaml (snippet)

       # ... inside container spec ...
       env:
         - name: REACT_APP_UNLEASH_PROXY_URL
           value: {{ .Values.unleashProxy.url | quote }}
         - name: REACT_APP_UNLEASH_APP_NAME
           value: {{ .Values.unleashProxy.appName | quote }}
         - name: REACT_APP_UNLEASH_ENVIRONMENT
           value: {{ .Values.unleashProxy.environment | quote }} # Or {{ .Values.skao.environment | quote }}
         - name: REACT_APP_UNLEASH_REFRESH_INTERVAL
           value: {{ .Values.unleashProxy.refreshInterval | quote }}
         - name: REACT_APP_UNLEASH_DISABLE_METRICS
           value: {{ .Values.unleashProxy.disableMetrics | quote }}
         # Inject Client Key from Secret if enabled
         {{- if .Values.unleashProxy.clientKey.enabled }}
         - name: REACT_APP_UNLEASH_CLIENT_KEY
           valueFrom:
             secretKeyRef:
               name: {{ .Values.unleashProxy.clientKey.secretName }}
               key: {{ .Values.unleashProxy.clientKey.secretKey }}
         {{- else }}
         - name: REACT_APP_UNLEASH_CLIENT_KEY
           value: "" # Default empty if not enabled
         {{- end }}
       # Override command to generate env.js then start nginx
       command: ["/bin/sh", "-c"]
       args:
         - |
           echo "Generating env.js from environment variables..."
           # Adjust paths if the Dockerfile structure differs
           ENV_TYPE_FILE=/app/env_scripts/env_config \
           ENV_JS_OUTPUT_LOCATION=/usr/share/nginx/html/env.js \
           bash /app/env_scripts/env_config.sh js
           echo "Starting Nginx..."
           nginx -g 'daemon off;'
       # ... probes, resources ...

5.  **Implement Client Initialisation (React Context):**
    Ensure the React code initialises the `FlagProvider` using the runtime `env` object (see :ref:`howto-check-flag-react`, Step 4 Initialisation Code).

6.  **Deploy/Upgrade:**
    Deploy or upgrade the application using Helm. The Nginx pod will start, generate `env.js` with runtime values (including the potentially secret client key), and serve the React app, which then configures the Unleash client.

**Outcome:** The React application is configured via Helm, connects to the specified Unleash Proxy, and securely receives its proxy client key (if needed) from Vault via VSO through the runtime `env.js` file.

.. _howto-deploy-proxy:

How To Configure and Deploy the Unleash Proxy (Helm/VSO)
========================================================

**Goal:** Deploy the `unleashorg/unleash-proxy` as a service in Kubernetes using Helm, configured to connect to the GitLab Unleash API using a token managed by Vault/VSO.

**Assumptions:**

*   Helm, kubectl, Kubernetes cluster access.
*   Vault and VSO are operational.
*   A GitLab API token (`read_api` scope) is stored in Vault.

**Steps:**

1.  **Store GitLab Token in Vault:**
    Ensure the GitLab `read_api` token is in Vault (e.g., `secret/data/unleash-proxy/gitlab` key `api_token`).

2.  **Create `VaultSecret` for GitLab Token:**
    Define and apply a `VaultSecret` resource to sync the GitLab token into a K8s secret (e.g., `gitlab-unleash-api-token`) in the namespace where the proxy will run. (See example in :ref:`howto-configure-python-client`, Step 2).

3.  **Prepare Helm Chart/Values for Unleash Proxy:**
    Use a generic Helm chart or create a simple one containing a Deployment and Service. Configure `values.yaml`.

    .. code-block:: yaml
       :caption: unleash-proxy-values.yaml (Example)

       replicaCount: 2
       image:
         repository: unleashorg/unleash-proxy
         tag: "v1.4.9" # Use specific version
         pullPolicy: IfNotPresent
       service:
         type: ClusterIP
         port: 3000 # Internal proxy port
       # Environment variables for the proxy container
       env:
         # URL to GitLab Unleash API endpoint for YOUR project
         UNLEASH_URL: "https://gitlab.com/api/v4/feature_flags/unleash/YOUR_PROJECT_ID"
         LOG_LEVEL: "info"
         # Define the keys the clients will use to authenticate with THIS proxy
         UNLEASH_PROXY_CLIENT_KEYS: "frontend-key-abc,backend-key-xyz"
         # Optional: Specify environment(s) proxy should fetch flags for
         # UNLEASH_ENVIRONMENT: "production,staging"
       # Mount the GitLab token from the VSO-managed secret
       envFromSecrets:
         - secretRef:
             name: gitlab-unleash-api-token # Must match VaultSecret definition
       # ... resources, probes ...

    *   **Replace `YOUR_PROJECT_ID`**.
    *   Define `UNLEASH_PROXY_CLIENT_KEYS` - these are the "passwords" the apps use to talk to the proxy.

4.  **Deploy the Proxy using Helm:**

    .. code-block:: bash

       helm install unleash-proxy <path-to-proxy-chart> \
         -f unleash-proxy-values.yaml \
         -n <proxy-namespace>

5.  **Verify Proxy Health:**
    Check the proxy logs and access its health endpoint (usually `/proxy/health`) via port-forwarding or an Ingress if configured.

**Outcome:** The Unleash Proxy is running, configured to fetch flags from the GitLab project using a secure token, and ready to serve flag evaluations to client applications authenticating with the defined client keys.

.. _howto-manage-environments:

How To Manage Flag States Across Environments in GitLab
=======================================================

**Goal:** Configure a feature flag in GitLab to have different states or rollout strategies for different deployment environments (e.g., `development`, `staging`, `production`).

**Assumptions:**

*   You have access to the GitLab project where flags are managed.
*   The GitLab project has Environments defined (matching the deployment targets).
*   The application clients are configured to report their current environment.

**Steps:**

1.  **Navigate to Feature Flags:**
    In the GitLab project, go to **Deploy -> Feature Flags**.

2.  **Select or Create a Flag:**
    Click on the flag you want to configure or create a new one.

3.  **Configure Strategies per Environment:**
    *   Scroll down to the **Strategies** section.
    *   Click **Add strategy**.
    *   **Choose Strategy Type:** Select the desired strategy (e.g., `All users`, `Percent of users`, `User IDs`).
    *   **Configure Strategy Parameters:** Fill in the required details (e.g., percentage, user IDs).
    *   **Select Environments:** In the **Environments** dropdown, **select only the specific environment(s)** where this particular strategy should apply (e.g., select `staging`).
    *   Click **Create strategy**.

4.  **Repeat for Other Environments:**
    Add more strategies, scoping each one to different environments as needed.

    *   **Example:**
        *   Strategy 1: Type `All users`, Environments: `development`, `staging`.
        *   Strategy 2: Type `Percent of users`, Percentage `20%`, Stickiness `userId`, Environments: `production`.
        *   Strategy 3 (Optional Default): Type `All users`, Percentage `0%` (effectively off), Environments: `*` (All environments - acts as a default if no specific environment strategy matches). *Use with caution.*

5.  **Activate the Flag:**
    Ensure the main toggle switch for the feature flag itself is set to **Active**. Strategies only apply if the flag is active.

**Outcome:** The feature flag will now evaluate differently based on the `environment` context provided by the connecting Unleash client (or proxy), activating according to the rules defined for that specific GitLab environment.

.. _howto-compatibility-userid:

How To Manage Interface Compatibility using User IDs
====================================================

**Goal:** Use feature flags with the "User IDs" strategy to manage breaking changes or new versions of an interface (e.g., API, data format) provided by one component while different consuming components migrate at their own pace.

**Scenario:** Component `Service-A` is introducing v2 of its API. `Client-X` and `Client-Y` currently use v1. You want `Service-A` to serve v2 only to clients that explicitly declare compatibility, while continuing to serve v1 to others.

**Assumptions:**

*   You have feature flags configured for `Service-A` (see :ref:`howto-configure-python-client`).
*   Each client component (`Client-X`, `Client-Y`, etc.) has a unique, predictable identifier string that `Service-A` can determine when receiving a request (e.g., from an authenticated service name, a specific HTTP header, or part of the request payload). This identifier will be used as the `userId` in the Unleash context.
*   You have access to manage feature flags in the relevant GitLab project.

**Steps:**

1.  **Define Client Identifiers:**
    Establish unique, consistent string identifiers for each client component that interacts with `Service-A`. Examples:
    *   `client-x-production`
    *   `client-y-staging`
    *   `data-processor-integration`
    *   `react-skeleton-prod`

2.  **Implement Flag Check in Server (`Service-A`):**
    In `Service-A`, before processing a request or generating a response, check a feature flag (e.g., `service-a-use-api-v2`). Use the *client's identifier* as the `userId` in the Unleash context.

    .. code-block:: python
       :caption: Example in Service-A (Python)

       from my_app.feature_flags import is_feature_enabled
       import logging

       logger = logging.getLogger(__name__)

       def handle_api_request(request_data, client_identifier):
           """Handles request, choosing API version based on client ID."""

           flag_name = "service-a-use-api-v2"
           context = {"userId": client_identifier} # Use the client's unique ID

           # Check flag with client ID as context, fallback to False (v1)
           if is_feature_enabled(flag_name, context=context, fallback_value=False):
               logger.info(f"Client '{client_identifier}' requested API v2 via flag '{flag_name}'.")
               response = _process_request_v2(request_data)
           else:
               logger.info(f"Client '{client_identifier}' defaults to API v1 for flag '{flag_name}'.")
               response = _process_request_v1(request_data) # Fallback to old version

           return response

       # --- Placeholder functions ---
       def _process_request_v1(data): return {"version": 1, "data": f"Processed v1: {data}"}
       def _process_request_v2(data): return {"version": 2, "payload": f"Processed v2: {data}"}
       # ---------------------------

       # Example usage (how client_identifier is obtained depends on your architecture)
       # client_id = get_client_id_from_request_header(request)
       # result = handle_api_request(request.json, client_id)

3.  **Configure Flag Strategy in GitLab:**
    *   Navigate to **Deploy -> Feature Flags** in the GitLab project managing flags for `Service-A`.
    *   Create a new flag named `service-a-use-api-v2`. Ensure it's **Active**.
    *   Add a strategy:

        *   **Type:** `User IDs`
        *   **User IDs:** Initially, leave this list **empty** or add only known-compatible clients (e.g., `internal-test-client`). This ensures all existing clients continue to receive the v1 API by default (as the flag evaluates to `False` for them).
        *   **Environments:** Scope this strategy to the relevant environment(s) (e.g., `staging`, `production`).

4.  **Client Migration:**
    *   As `Client-X` is updated to support API v2, test it thoroughly (potentially against a `staging` version of `Service-A` where its ID is added to the `staging` environment strategy).
    *   Once `Client-X` is ready for production API v2:

        *   Edit the `service-a-use-api-v2` flag strategy for the `production` environment in GitLab.
        *   Add the production identifier for `Client-X` (e.g., `client-x-production`) to the **User IDs** list.
        *   Save the strategy.

    *   `Service-A` will now start serving the v2 API *only* to requests identified as coming from `client-x-production`. Other clients (`Client-Y`, etc.) will still receive the v1 API.
    *   Repeat this process for `Client-Y` and any other clients as they become compatible.

5.  **Handling Unknown Clients:**
    The `fallback_value=False` in `is_feature_enabled` ensures that any client whose identifier is *not* in the GitLab User IDs list will automatically receive the old (v1) behaviour.

6.  **Cleanup:**
    Once *all* relevant clients have been migrated to use API v2 and are stable:
    *   Remove the feature flag check from `Service-A`'s code, leaving only the v2 logic.
    *   Remove the v1 processing logic (`_process_request_v1`).
    *   Remove associated tests for the v1 path.
    *   Deploy the updated `Service-A`.
    *   Delete the `service-a-use-api-v2` flag definition from GitLab.

**Outcome:** `Service-A` can safely introduce breaking changes by serving the new interface only to explicitly listed compatible clients, identified by their unique `userId`. This allows clients to migrate independently without causing system-wide failures.

**Considerations:**

*   **Client Identification:** The reliability of this pattern depends on accurately and consistently identifying the calling client within `Service-A`. This might involve inspecting authentication tokens (like JWTs containing a service name), specific HTTP headers, or other mechanisms established between the services.
*   **Communication:** Clear communication between the teams managing `Service-A` and the client teams is essential to coordinate testing and migration onto the User IDs list.
*   **Naming:** Use descriptive client identifiers and flag names.


.. _howto-remove-flag:

How To Safely Remove a Feature Flag
===================================

**Goal:** Remove the technical debt associated with a feature flag after its corresponding feature is fully rolled out and stable, or has been abandoned.

**Assumptions:**

*   The feature controlled by the flag is stable at 100% rollout in all relevant environments OR the decision has been made to permanently disable and remove it.
*   You have access to the application codebase and the GitLab project where the flag is defined.

**Steps:**

1.  **Confirm Flag Status:**
    Verify that the flag is enabled (or intended to be permanently disabled) for 100% of the target audience in all relevant environments (especially production) and has been stable for an appropriate period.

2.  **Remove Flag Logic from Code:**
    *   Identify all code locations where the flag is checked (`is_feature_enabled`, `useFlag`, etc.).
    *   Remove the conditional logic (`if/else`).
    *   **If the feature is kept:** Delete the code path corresponding to the *disabled* state (the old logic/fallback). Keep only the code path for the *enabled* state.
    *   **If the feature is abandoned:** Delete the code path corresponding to the *enabled* state (the new logic). Keep only the code path for the *disabled* state (which now becomes the permanent logic).
    *   Remove any unused imports related to the flag check.

3.  **Remove Related Tests:**
    *   Identify unit, integration, or end-to-end tests that specifically targeted the code path being removed.
    *   Delete or refactor these tests as they are no longer relevant.
    *   Ensure remaining tests cover the permanent code path adequately.

4.  **Commit and Push Code Changes:**
    Commit the code and test changes with a clear message indicating the removal of the specific feature flag.

5.  **Deploy Code Changes:**
    Merge the changes and deploy the updated application through the standard CI/CD pipeline to all environments (staging, production).

6.  **Delete Flag Definition from GitLab:**
    *   **After** the code changes have been successfully deployed and verified in production:
    *   Navigate to **Deploy -> Feature Flags** in the GitLab project.
    *   Find the feature flag you removed from the code.
    *   Click the **Delete** button (often represented by a trash can icon) for the flag. Confirm the deletion.

**Outcome:** The feature flag is completely removed from both the codebase and the configuration system, reducing complexity and technical debt.
