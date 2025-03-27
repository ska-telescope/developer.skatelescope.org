.. _feature-flags-how-to:

#############
How-To Guides
#############

This section provides step-by-step instructions for common tasks related to implementing and managing feature flags.

.. _feature-flags-howto-python:

=======================================
How-To: Implement Flags (Python)
=======================================

This guide shows how to use the Unleash Client SDK for Python.

Prerequisites
-------------

*   Python 3.x installed.
*   Access to an Unleash-compatible API (GitLab Feature Flags endpoint or an Unleash Proxy).
*   Required configuration: Unleash API URL, Instance ID, and API Token (or Client Key if using Proxy). These are typically injected via environment variables.

Steps
-----

1.  **Install the Client Library:**

    .. code-block:: bash

       pip install UnleashClient

2.  **Initialize the Client:**
    Initialize the client early in your application's startup process. It's often best practice to create a singleton instance.

    .. code-block:: python

       import os
       from UnleashClient import UnleashClient
       from UnleashClient.strategies import Strategy

       # Example custom strategy (Optional)
       class UserIsSKADeveloper(Strategy):
           def load_provisioning(self) -> list:
               return [x.strip() for x in self.parameters["userIds"].split(',')]

           def apply(self, context: dict = None) -> bool:
               """ Custom strategy application """
               if "user_id" in context:
                   return context["user_id"] in self.load_provisioning()
               return False

       # Configuration - Ideally from environment variables or config file
       UNLEASH_URL = os.environ.get("UNLEASH_URL", "http://localhost:4242/api") # URL of Proxy or GitLab
       UNLEASH_INSTANCE_ID = os.environ.get("UNLEASH_INSTANCE_ID", "default-instance")
       UNLEASH_API_TOKEN = os.environ.get("UNLEASH_API_TOKEN", "default:development.secret") # Use appropriate token/key
       APP_NAME = os.environ.get("APP_NAME", "my-ska-app")
       ENVIRONMENT = os.environ.get("SKA_DEPLOYMENT_ENV", "development") # e.g., 'production', 'staging'

       # Custom strategies dictionary (Optional)
       custom_strategies = {
           "UserIsSKADeveloper": UserIsSKADeveloper
       }

       # Initialize client
       # Note: Use header 'Authorization' for GitLab API token,
       # or potentially a different header/key if proxy requires it.
       headers = {"Authorization": UNLEASH_API_TOKEN}

       unleash_client = UnleashClient(
           url=UNLEASH_URL,
           app_name=APP_NAME,
           environment=ENVIRONMENT,
           instance_id=UNLEASH_INSTANCE_ID,
           custom_headers=headers,
           custom_strategies=custom_strategies # Add custom strategies if needed
       )

       # Initialize client (starts background polling thread)
       unleash_client.initialize_client()

       # Ensure shutdown hook if possible
       # e.g., in Flask/Django app context teardown or via atexit
       # import atexit
       # atexit.register(unleash_client.destroy)

3.  **Check Feature Flag Status:**
    Use the `is_enabled` method to check if a feature is active. Provide context (like user ID, session ID) for strategies that require it.

    .. code-block:: python

       def get_user_data(user_id):
           # Example context
           context = {
               "userId": user_id,
               "sessionId": "some_session_id", # If relevant
               # Add other relevant context properties
           }

           if unleash_client.is_enabled("new-data-processing-algorithm", context=context):
               # Use the new algorithm
               result = process_data_new(user_id)
               print(f"User {user_id} used NEW algorithm.")
           else:
               # Use the old algorithm (fallback)
               result = process_data_old(user_id)
               print(f"User {user_id} used OLD algorithm.")

           # Always provide a default/fallback value if the flag check fails
           # The 'fallback_function' parameter can simplify this
           # is_enabled("flag-name", context=context, fallback_function=my_fallback_logic)

           return result

       # Example usage
       user_data = get_user_data("ugur")

4.  **Handling Initialization and Errors:**
    The client fetches flags in the background. It might take a moment after `initialize_client()` for flags to be available. The `is_enabled` method will typically return `False` (or use the fallback) if the client isn't ready or encounters an error. Check logs for details.

Best Practices
--------------
*   **Centralized Initialization:** Initialize the client once.
*   **Environment Variables:** Load configuration (URL, token, instance ID) from the environment. Use Helm to inject these.
*   **Context:** Pass relevant context (`userId`, `sessionId`, `remoteAddress`, custom properties) to `is_enabled` for strategy evaluation.
*   **Fallback Behavior:** Always code a default behavior for when a flag is `False` or if the check fails.
*   **Logging:** The client library has logging; configure it appropriately.
*   **Shutdown:** Call `unleash_client.destroy()` on application shutdown to stop background threads gracefully.


.. _feature-flags-howto-react:

=======================================
How-To: Implement Flags (React)
=======================================

This guide shows how to use an Unleash Client SDK within a React application. We'll use the `@unleash/proxy-client-react` library, designed to work with the Unleash Proxy.

Prerequisites
-------------

*   Node.js and npm/yarn installed.
*   A React application set up.
*   An Unleash Proxy running and accessible from the frontend.
*   Required configuration: Unleash Proxy URL, Client Key (safe to expose in frontend), App Name, User ID (optional but recommended).

Steps
-----

1.  **Install the Client Library:**

    .. code-block:: bash

       npm install @unleash/proxy-client-react
       # or
       yarn add @unleash/proxy-client-react

2.  **Configure and Wrap Your App with the Provider:**
    Set up the configuration and wrap your root component (or a relevant part of your component tree) with `FlagProvider`.

    .. code-block:: javascript
       :caption: src/index.js or src/App.js

       import React from "react";
       import ReactDOM from "react-dom/client";
       import { FlagProvider } from "@unleash/proxy-client-react";
       import App from "./App"; // Your main application component

       // Configuration - Ideally from environment variables or a config file
       // These are typically set during the build process or via runtime config
       const unleashConfig = {
         url: process.env.REACT_APP_UNLEASH_PROXY_URL || "http://localhost:3000/proxy", // URL of your Unleash Proxy
         clientKey: process.env.REACT_APP_UNLEASH_CLIENT_KEY || "proxy-client-key", // Client key for the proxy
         refreshInterval: 15, // How often (in seconds) to fetch flag updates
         appName: process.env.REACT_APP_NAME || "my-ska-react-app",
         environment: process.env.REACT_APP_SKA_ENV || "development",
         // You might dynamically set userId, sessionId based on logged-in user
         // userId: getUserIdFromAuth(),
       };

       const root = ReactDOM.createRoot(document.getElementById("root"));
       root.render(
         <React.StrictMode>
           <FlagProvider config={unleashConfig}>
             <App />
           </FlagProvider>
         </React.StrictMode>
       );

3.  **Use Flags in Components:**
    Use the `useFlag` or `useFlagsStatus` hooks to check flag status, or the `Flags` component for conditional rendering.

    *   **Using `useFlag` Hook:**

        .. code-block:: javascript
           :caption: src/components/MyComponent.js

           import React from "react";
           import { useFlag } from "@unleash/proxy-client-react";

           function MyComponent() {
             const showNewFeature = useFlag("new-frontend-feature");
             const enableBetaButton = useFlag("beta-button-feature");

             return (
               <div>
                 <h1>My Component</h1>
                 {showNewFeature ? (
                   <p>Showing the awesome new feature!</p>
                 ) : (
                   <p>Showing the standard content.</p>
                 )}

                 {enableBetaButton && (
                   <button onClick={() => alert("Beta!")}>Beta Button</button>
                 )}
               </div>
             );
           }

           export default MyComponent;

    *   **Using `Flags` Component:**

        .. code-block:: javascript
           :caption: src/components/AnotherComponent.js

           import React from "react";
           import { Flags } from "@unleash/proxy-client-react";

           function AnotherComponent() {
             return (
               <div>
                 <h2>Another Component</h2>
                 <Flags flags={["new-layout", "experimental-chart"]}>
                   {({ flags }) => (
                     <>
                       {flags["new-layout"]?.enabled ? (
                         <div>Using the new layout!</div>
                       ) : (
                         <div>Using the old layout.</div>
                       )}

                       {flags["experimental-chart"]?.enabled && (
                         <div>Displaying experimental chart...</div>
                       )}
                     </>
                   )}
                 </Flags>
               </div>
             );
           }

           export default AnotherComponent;

4.  **Updating Context (e.g., User Login):**
    If user context (like `userId`) changes after initialization (e.g., user logs in), use the `useUnleashContext` hook to update it.

    .. code-block:: javascript
       :caption: src/components/UserProfile.js

       import React, { useEffect } from "react";
       import { useUnleashContext } from "@unleash/proxy-client-react";
       import { useAuth } from "./AuthContext"; // Your auth context

       function UserProfile() {
         const updateContext = useUnleashContext();
         const { user } = useAuth(); // Get user info from your auth system

         useEffect(() => {
           if (user) {
             console.log("Updating Unleash context with user:", user.id);
             updateContext({ userId: user.id });
           }
           // Optional: Clear context on logout if needed
           // else { updateContext({ userId: undefined }); }
         }, [user, updateContext]);

         return <div>User Profile Page {user ? `for ${user.id}` : ""}</div>;
       }

       export default UserProfile;


Best Practices
--------------
*   **Use the Proxy:** Always connect the React client to the Unleash Proxy, not directly to GitLab, for performance and security.
*   **Configuration:** Manage Unleash configuration (URL, client key) via build-time environment variables (`REACT_APP_*`) or a runtime configuration fetching mechanism.
*   **Dynamic Context:** Update the Unleash context when user information changes.
*   **Loading State:** Be aware that flags might not be available immediately on load. The hooks/components handle this reasonably well, but consider UI implications (e.g., showing a loader or default content). The `useFlagsStatus` hook can provide readiness state.
*   **Fallback:** Ensure your UI gracefully handles the case where a flag is disabled.


.. _feature-flags-howto-environments:

===========================================================
How-To: Use Flags Across Environments (Dev, Staging, Prod)
===========================================================

Feature flags shine when managing releases across different deployment environments. GitLab and Unleash provide mechanisms to control flag states and strategies independently for environments like development, staging, and production.

Prerequisites
-------------

*   GitLab project with environments defined (e.g., `development`, `staging`, `production`). These often correspond to Kubernetes namespaces or specific deployment targets.
*   Application configured to report its current environment to the Unleash client.
*   Unleash Proxy (recommended) configured to fetch flags for specific environments if needed, or clients configured per environment.

Steps
-----

1.  **Define Environments in GitLab:**
    Ensure your deployment process correctly associates deployments with GitLab Environments. This is often handled by CI/CD jobs (e.g., using the `environment:` keyword in `.gitlab-ci.yml`).

2.  **Configure Flags per Environment in GitLab UI:**
    *   Navigate to your project's **Deploy -> Feature Flags**.
    *   Select or create a feature flag.
    *   Within the flag's configuration, you'll see sections for different **Strategies**. You can add multiple strategies.
    *   Crucially, each strategy can be **scoped to specific GitLab Environments**.
    *   **Example Scenario:** Gradually roll out `new-feature` in `production` while having it fully enabled in `staging`.
        *   Add a strategy: Type `Gradual rollout`, Percentage `10%`, Stickiness `userId`. Select **Environments** and choose `production`.
        *   Add another strategy: Type `All users`. Select **Environments** and choose `staging`.
        *   Add another strategy: Type `All users`. Select **Environments** and choose `development`.
        *   Ensure the main toggle for the flag is **Active**.
    *   The result is that the flag behaves differently depending on the environment context provided by the client.

3.  **Configure Your Application Client:**
    *   The Unleash client needs to know which environment it's running in.
    *   **Python:** Set the `environment` parameter during `UnleashClient` initialization. This should ideally come from an environment variable set during deployment (e.g., via Helm).

        .. code-block:: python
           :emphasize-lines: 3

           ENVIRONMENT = os.environ.get("SKA_DEPLOYMENT_ENV", "development") # e.g., 'production', 'staging'
           unleash_client = UnleashClient(
               # ... other params
               environment=ENVIRONMENT,
               # ...
           )
           unleash_client.initialize_client()

    *   **React (using Proxy Client):** Set the `environment` property in the `FlagProvider` config.

        .. code-block:: javascript
           :emphasize-lines: 7

           const unleashConfig = {
             url: process.env.REACT_APP_UNLEASH_PROXY_URL,
             clientKey: process.env.REACT_APP_UNLEASH_CLIENT_KEY,
             refreshInterval: 15,
             appName: process.env.REACT_APP_NAME,
             environment: process.env.REACT_APP_SKA_ENV || "development", // Set via build/runtime env var
           };
           // ... wrap with <FlagProvider config={unleashConfig}>

    *   **Helm Configuration:** Use your Helm chart's `values.yaml` to set the environment name and pass it down to the application container's environment variables.

        .. code-block:: yaml
           :caption: values.yaml (example snippet)

           replicaCount: 1

           image:
             repository: my-ska-app
             tag: latest

           # Environment variable passed to the container
           env:
             SKA_DEPLOYMENT_ENV: "production" # Or use Helm templating: {{ .Values.environmentName }}
             UNLEASH_URL: "http://unleash-proxy.ska-services.svc.cluster.local/proxy"
             UNLEASH_INSTANCE_ID: "my-ska-app-{{ .Values.environmentName }}"
             # Add UNLEASH_API_TOKEN or REACT_APP_UNLEASH_CLIENT_KEY etc.

           # You might define this based on the namespace or a global value
           environmentName: "production"

4.  **Deploy and Verify:**
    *   Deploy your application to different environments (`dev`, `staging`, `prod`).
    *   Verify (through application behavior, logs, or monitoring) that the feature flags are behaving according to the strategies defined for each specific environment in GitLab.

Best Practices
--------------
*   **Consistent Naming:** Use consistent environment names across GitLab, Helm, CI/CD, and application configuration.
*   **Environment Variable:** Pass the environment name via a standardized environment variable (e.g., `SKA_DEPLOYMENT_ENV`).
*   **Default Strategy:** Consider having a default strategy (often scoped to `development` or fully off) if no environment-specific strategy matches.
*   **Testing:** Test flag configurations thoroughly in `staging` before applying changes to `production`.

.. _feature-flags-howto-safety:

==================================================
How-To: Configure Feature Flags Safely
==================================================

Incorrectly managed feature flags can introduce bugs or break your application. Follow these practices to ensure safe and reliable usage.

Prerequisites
-------------

*   Understanding of feature flags and your chosen client/management system (GitLab/Unleash).
*   Access to manage flags in GitLab.

Steps & Best Practices
----------------------

1.  **Code Defensively (Provide Fallbacks):**
    *   **Always** assume a flag might be `False` or that the flag check might fail (e.g., during initial startup or network issues).
    *   Your code **must** have a working default/fallback path when the flag is disabled.
    *   Use the fallback mechanisms provided by the Unleash clients if appropriate (e.g., `fallback_function` in Python client).

    .. code-block:: python
       :caption: Defensive coding example

       # GOOD: Has an else block
       if unleash_client.is_enabled("my-feature"):
           do_new_thing()
       else:
           do_old_thing() # Fallback exists

       # BAD: Assumes flag is always available or true
       # if unleash_client.is_enabled("my-feature"):
       #    do_new_thing()
       # # No else block - what happens if flag is off?

2.  **Use Gradual Rollouts:**
    *   Avoid enabling significant new features for 100% of users in production immediately.
    *   Start with internal users, a small percentage of traffic (`1%`, `5%`), or specific user IDs.
    *   Use GitLab/Unleash strategies like "Percent of users" (with appropriate stickiness) or "List of User IDs".
    *   Monitor application performance and error rates closely during the rollout.

3.  **Leverage Environments:**
    *   Thoroughly test features behind flags in `development` and `staging` environments before enabling them in `production`.
    *   Ensure flag configurations are correct for each environment (see :ref:`feature-flags-howto-environments`).

4.  **Implement Monitoring and Alerting:**
    *   Monitor the behavior of code paths controlled by feature flags.
    *   Track error rates and performance metrics segmented by whether the flag was enabled or disabled for a given request/user (if possible).
    *   Set up alerts for unexpected spikes in errors or performance degradation related to flagged features.

5.  **Keep Flags Short-Lived (Plan for Cleanup):**
    *   Feature flags introduce technical debt. They complicate the codebase and testing matrix.
    *   **Have a plan to remove flags** once a feature is fully rolled out and stable, or if it's decided not to release it.
    *   Cleanup involves:
        *   Removing the conditional logic (`if/else`) in the code, leaving only the desired (usually the "new") code path.
        *   Removing the flag definition from GitLab.
        *   Removing associated tests for the disabled code path.
    *   Use tools or processes (e.g., Jira tickets, code annotations, regular reviews) to track flag lifespan and ensure cleanup happens.

    .. warning::
       Leaving stale flags in the code increases complexity and the risk of future bugs. Actively manage the lifecycle of your flags.

6.  **Use Clear and Consistent Naming:**
    *   Adopt a clear naming convention for flags (e.g., `[component]-[feature-name]-[optional-suffix]`).
    *   Make names descriptive so their purpose is obvious.
    *   Avoid cryptic names.

7.  **Secure Your Configuration:**
    *   Protect your Unleash API tokens/client keys.
    *   Use read-only keys (like the Proxy Client Key) in less secure environments (like frontends).
    *   Use more privileged tokens (like the GitLab API Token for the Proxy) only in secure backend environments, injected via secrets management (e.g., Kubernetes Secrets mounted as environment variables via Helm).

8.  **Test Flag Logic:**
    *   Write unit/integration tests for both the enabled and disabled paths of your feature flag logic.
    *   Use mock Unleash clients or test configurations to force flags on/off during tests.

By following these guidelines, you can minimize the risks associated with feature flags and leverage their benefits safely.


.. _feature-flags-howto-configure-proxy:

==================================================
How-To: Configure and Deploy the Unleash Proxy
==================================================

The Unleash Proxy is crucial for performance and scalability when using GitLab Feature Flags, especially in Kubernetes. This guide outlines the typical steps for deploying it using Helm.

Prerequisites
-------------

*   Helm 3 installed.
*   Kubectl configured for your target Kubernetes cluster.
*   Access to a Kubernetes cluster where your applications run.
*   A GitLab Personal Access Token with `read_api` scope (or a Project/Group Access Token). This token will be used by the proxy to fetch flag definitions. **Treat this token as a secret.**

Steps
-----

1.  **Obtain GitLab Access Token:**
    *   Create a GitLab Access Token (Personal, Group, or Project) with `read_api` scope.
    *   **Securely store this token.** It will be configured as a Kubernetes secret.

2.  **Create Kubernetes Secret for the Token:**
    *   Create a Kubernetes secret containing the GitLab token.

    .. code-block:: bash

       kubectl create secret generic gitlab-unleash-api-token \
         --from-literal=GITLAB_TOKEN='YOUR_GITLAB_API_TOKEN' \
         -n <your-namespace> # Replace with the namespace where proxy will run

3.  **Configure Helm Chart for Unleash Proxy:**
    *   There isn't an official Helm chart specifically for the Unleash Proxy *by Unleash*, but you can easily create one or use a generic application chart. Alternatively, community charts might exist (use with caution).
    *   A simple approach uses a standard Deployment and Service definition. Below is a conceptual `values.yaml` structure you might use with a generic chart or adapt for your own.

    .. code-block:: yaml
       :caption: unleash-proxy-values.yaml (Conceptual Example)

       replicaCount: 2 # Run multiple replicas for HA

       image:
         repository: unleashorg/unleash-proxy
         tag: "latest" # Use a specific version in production
         pullPolicy: IfNotPresent

       # Service configuration
       service:
         type: ClusterIP
         port: 3000 # Port the proxy listens on internally

       # Environment variables for the Unleash Proxy container
       env:
         # URL to your GitLab instance's Unleash API endpoint
         # Format: https://gitlab.example.com/api/v4/feature_flags/unleash/<project_id>
         UNLEASH_PROXY_SECRETS: ssm, # Example if using AWS SSM, adjust if not needed
         UNLEASH_URL: "https://gitlab.com/api/v4/feature_flags/unleash/YOUR_PROJECT_ID"
         # Name matching the secret created earlier
         UNLEASH_API_TOKEN_SECRET_NAME: "gitlab-unleash-api-token"
         # Key within the secret holding the token
         UNLEASH_API_TOKEN_SECRET_FIELD: "GITLAB_TOKEN"
         # Log level (e.g., 'debug', 'info', 'warn', 'error')
         LOG_LEVEL: "info"
         # Client keys allowed to access this proxy (comma-separated)
         # These are the keys your frontend/backend clients will use
         UNLEASH_PROXY_CLIENT_KEYS: "proxy-key-for-frontend,proxy-key-for-backend"
         # Optional: Specify environment(s) proxy should fetch
         # UNLEASH_ENVIRONMENT: "production,staging" # Fetches only these

       # Optional: If using Kubernetes secrets directly for the API token
       envFromSecrets:
         - secretRef:
             name: gitlab-unleash-api-token # Matches the secret name

       # Optional: Resource limits and requests
       resources:
         limits:
           cpu: 200m
           memory: 128Mi
         requests:
           cpu: 100m
           memory: 64Mi

       # Optional: Liveness and Readiness Probes
       livenessProbe:
         httpGet:
           path: /proxy/health # Health check endpoint of the proxy
           port: 3000
         initialDelaySeconds: 10
         periodSeconds: 5
       readinessProbe:
         httpGet:
           path: /proxy/health
           port: 3000
         initialDelaySeconds: 5
         periodSeconds: 5

    *   **Important:**
        *   Replace `YOUR_PROJECT_ID` with your actual GitLab Project ID.
        *   Replace `YOUR_GITLAB_API_TOKEN` placeholder when creating the secret.
        *   Define `UNLEASH_PROXY_CLIENT_KEYS`. These are arbitrary strings you define here; your applications will use these keys to authenticate with the proxy.
        *   Adjust resource limits, probes, and replica count based on expected load.

4.  **Deploy the Proxy using Helm:**

    .. code-block:: bash

       helm install unleash-proxy <path-to-your-chart> \
         -f unleash-proxy-values.yaml \
         -n <your-namespace>

5.  **Configure Applications to Use the Proxy:**
    *   Update your application deployments (via their Helm charts) to point to the Unleash Proxy's service URL within the cluster (e.g., `http://unleash-proxy.<namespace>.svc.cluster.local:3000/proxy`).
    *   Configure the applications to use one of the `UNLEASH_PROXY_CLIENT_KEYS` defined in the proxy's configuration instead of the GitLab API token.

    .. code-block:: yaml
       :caption: Application's values.yaml (Snippet)

       env:
         # Point to the proxy service
         UNLEASH_URL: "http://unleash-proxy.<namespace>.svc.cluster.local:3000/proxy"
         # Use the client key defined in the proxy config
         # For Python client, this might go in custom_headers or specific config
         # For React client, this is the 'clientKey' config property
         UNLEASH_CLIENT_KEY: "proxy-key-for-backend" # Or "proxy-key-for-frontend"
         # Instance ID and App Name remain important
         UNLEASH_INSTANCE_ID: "my-app-{{ .Values.environmentName }}"
         APP_NAME: "my-app"
         SKA_DEPLOYMENT_ENV: "{{ .Values.environmentName }}"

Deployment Patterns
-------------------
*   **Central Proxy:** Deploy one set of proxy replicas per cluster/namespace, serving multiple applications. Simpler management.
*   **Sidecar Proxy:** Deploy the proxy as a sidecar container within each application's pod. Network latency is minimal, but resource overhead is higher.

Choose the pattern that best fits your architecture and scaling needs. For most SKAO use cases, a central proxy per namespace or logical service group is likely sufficient.
