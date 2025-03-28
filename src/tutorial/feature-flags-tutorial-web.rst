.. _feature-flags-tutorial-web:

================================================
Feature Flagging with Unleash React Proxy Client
================================================

Introduction
------------

This tutorial guides you through integrating feature flags into the ``ska-react-webapp-skeleton`` React application using the Unleash React Proxy Client (`@unleash/proxy-client-react`). Feature flags allow dynamic control over application features without redeploying code, enabling:

*   Gradual feature rollouts.
*   A/B testing.
*   Targeted feature access (users, environments, data centres).
*   Rapid disabling of features ("kill switches").

This tutorial focuses on connecting to an Unleash Proxy from your React application, ensuring security and configurability for multi-data centre deployments.

.. _Unleash: https://www.getunleash.io/
.. _Unleash Proxy: https://docs.getunleash.io/reference/unleash-proxy
.. _Vault Secrets Operator: https://developer.hashicorp.com/vault/docs/platform/k8s/vso

Prerequisites
-------------

*   Node.js and Yarn (as used in the project).
*   Docker and a container registry.
*   Helm (v3) and a Kubernetes cluster. 
*   An **Unleash Proxy** or **GitLab Feature Flags** instance running and accessible to your deployed React application. The proxy securely connects to your main Unleash Server. You will need:
    *   The URL of the running Unleash Proxy.
    *   A Proxy client key (sometimes called a "frontend API token") if your proxy requires authentication.
*   Access to HashiCorp Vault for managing the Unleash Proxy's *server-side* API token (used by the proxy to connect to the main Unleash API).
*   Vault Secrets Operator (VSO) deployed in your Kubernetes cluster to manage secrets.

Why the Unleash Proxy?
----------------------

Frontend applications running in a user's browser **cannot securely store** the server-side API tokens required to connect directly to the main Unleash API server. The `Unleash Proxy`_ acts as a secure intermediary:

1.  The **Proxy** runs as a separate service (typically in your backend infrastructure).
2.  The **Proxy** connects securely to your main **Unleash Server** using a *server-side API token* (which can be managed via Vault/VSO).
3.  Your **React application** connects to the **Proxy** using the proxy's URL and, optionally, a less sensitive *client key* (or "frontend API token"). Note that this is needed because of restrictions on Gitlab Feature Flags.
4.  The Proxy evaluates flags based on the context provided by the React app and returns the results.

The `@unleash/proxy-client-react` library is specifically designed to communicate with this proxy.

.. warning::
   There are no central managed Proxy Server instances at the moment. You will need to deploy your own Proxy Server and configure it to connect to the upstream Unleash Server for now. Please let System Team know if you need this deployed.

Installation
------------

Add the Unleash React Proxy Client SDK to your project using Yarn:

.. code-block:: bash

   yarn add @unleash/proxy-client-react

This updates ``package.json`` and ``yarn.lock``. Commit these changes and rebuild your OCI image (e.g., ``make oci-build``).

Configuration
-------------

We need to provide runtime configuration to the React application when it's served. This project already uses a mechanism (`env_config.sh`, `env_config`, `env.js`, `env.ts`) to inject environment variables available at container startup into a `window.env` object accessible by the frontend JavaScript. We will use this.

Key configuration parameters (to be set as environment variables for the container):

*   **REACT_APP_UNLEASH_PROXY_URL**: The URL of your running Unleash Proxy.
*   **REACT_APP_UNLEASH_APP_NAME**: A name identifying your application (e.g., ``ska-react-webapp-skeleton``). Should match the `appName` used when initialising the client.
*   **REACT_APP_UNLEASH_ENVIRONMENT**: The current environment (e.g., ``development``, ``staging``, ``production``, ``data-centre-1``). Should match an environment defined in Unleash and potentially used by the Proxy.
*   **REACT_APP_UNLEASH_INSTANCE_ID**: A unique identifier for this user's session or application instance (can be generated client-side if needed, or potentially derived).
*   **REACT_APP_UNLEASH_CLIENT_KEY**: The client key (frontend API token) required by your Unleash Proxy (if any). **Treat as potentially sensitive, depending on proxy configuration.**
*   **REACT_APP_UNLEASH_REFRESH_INTERVAL**: How often (in seconds) the client fetches flags from the proxy (default: 30).
*   **REACT_APP_UNLEASH_DISABLE_METRICS**: Set to `"true"` to disable sending metrics to the proxy (default: `"false"`).

1.  **Update `env_scripts/env_config`**:
    Add the necessary Unleash configuration variables.

    .. code-block:: diff

       # env_scripts/env_config
       # ... existing vars ...
       REACT_APP_MSENTRA_TENANT_ID:string

       +REACT_APP_UNLEASH_PROXY_URL:string:http://localhost:3000/proxy # Default for local dev proxy
       +REACT_APP_UNLEASH_APP_NAME:string:ska-react-webapp-skeleton
       +REACT_APP_UNLEASH_ENVIRONMENT:string:development
       +REACT_APP_UNLEASH_INSTANCE_ID:string: # Often set dynamically client-side
       +REACT_APP_UNLEASH_CLIENT_KEY:string: # Optional: Proxy client key if needed
       +REACT_APP_UNLEASH_REFRESH_INTERVAL:number:30
       +REACT_APP_UNLEASH_DISABLE_METRICS:boolean:false

2.  **Update `src/env.ts`**:
    Reflect the new types in the TypeScript definition file. You can regenerate this using `make dev-local-env`.

    .. code-block:: diff

       // src/env.ts
       // ... existing type ...
       type EnvType = {
         REACT_APP_MSENTRA_CLIENT_ID: string;
         REACT_APP_MSENTRA_REDIRECT_URI: string;
         REACT_APP_MSENTRA_TENANT_ID: string;
         REACT_APP_UNLEASH_PROXY_URL: string;
         REACT_APP_UNLEASH_APP_NAME: string;
         REACT_APP_UNLEASH_ENVIRONMENT: string;
         REACT_APP_UNLEASH_INSTANCE_ID: string;
         REACT_APP_UNLEASH_CLIENT_KEY: string;
         REACT_APP_UNLEASH_REFRESH_INTERVAL: number;
         REACT_APP_UNLEASH_DISABLE_METRICS: boolean;
       };
       // ... rest of file ...

3.  **Dockerfile Configuration**:
    No changes are strictly needed in the `Dockerfile` itself, as the configuration is injected at runtime via environment variables passed to the container, which are then processed by `env_config.sh` before Nginx starts.

4.  **Helm Chart Configuration**:
    Update the Helm chart to accept Unleash Proxy configuration and inject it as environment variables into the Nginx container.

    a.  **Define Values in `values.yaml`**:
        Add a section to ``charts/ska-react-webapp-skeleton/values.yaml``.

        .. code-block:: yaml

           # charts/ska-react-webapp-skeleton/values.yaml

           # ... (other values) ...

           unleashProxy:
             # URL of the Unleash Proxy service
             url: "http://unleash-proxy.default.svc.cluster.local:3000/proxy" # Example internal K8s service URL
             # Application name registered in Unleash
             appName: "ska-react-webapp-skeleton"
             # Environment name (should match Unleash environment)
             environment: "development"
             # Refresh interval in seconds
             refreshInterval: 30
             # Disable metrics (true/false)
             disableMetrics: false
             # --- Client Key Configuration (Optional) ---
             # Set 'enabled' to true if your proxy requires a client key
             clientKey:
               enabled: false
               # Name of the Kubernetes secret containing the proxy client key
               secretName: "ska-react-webapp-skeleton-unleash-proxy-key"
               # Key within the secret that holds the key
               secretKey: "key"

    b.  **Manage the Proxy Client Key Secret (Optional, via VSO)**:
        If your Unleash Proxy requires a client key (`unleashProxy.clientKey.enabled: true`), this key should ideally be stored in Vault and synced to a Kubernetes `Secret` using VSO.

        Define a `VaultSecret` resource (similar to the previous tutorial, but for the *proxy client key*):

        .. code-block:: yaml

           apiVersion: secrets.hashicorp.com/v1beta1
           kind: VaultSecret
           metadata:
             # Name for the VSO resource itself
             name: ska-react-webapp-skeleton-unleash-proxy-key-sync
             namespace: <your-target-namespace> # The namespace where your app runs
           spec:
             kubernetesSecret:
               # K8s secret VSO manages (matches values.yaml)
               secretName: ska-react-webapp-skeleton-unleash-proxy-key
               data:
                 - secretKey: key      # Key in the K8s secret (matches values.yaml)
                   vaultKey: proxy_client_key # Key in the Vault secret data
             vaultSecret:
               # Example Vault path for the proxy client key
               path: secret/data/ska-react-webapp-skeleton/unleash-proxy

        .. note::
           The Unleash Proxy's *server-side* API token (connecting Proxy -> Unleash Server) must *also* be managed securely, likely via Vault/VSO within the Proxy's own deployment configuration (which is separate from this skeleton app).

    c.  **Inject Environment Variables in Helm Template (`nginx.yaml`)**:
        Modify ``charts/ska-react-webapp-skeleton/templates/nginx.yaml`` to add the `env` section to the Nginx container spec.

        .. code-block:: yaml

           # charts/ska-react-webapp-skeleton/templates/nginx.yaml
           apiVersion: apps/v1
           kind: Deployment
           metadata:
             name: {{ $.Chart.Name }}-nginx
             labels:
               {{ include "labels" . | indent 4 }}
           spec:
             replicas: 1
             selector:
               matchLabels:
                 app.kubernetes.io/name: {{ $.Chart.Name }}
             template:
               metadata:
                 labels:
                   {{ include "labels" . | indent 8 }}
               spec:
                 containers:
                   - name: nginx
                     image: "{{ .Values.image.container }}:{{ .Values.image.version }}"
                     imagePullPolicy: {{ .Values.image.imagePullPolicy }}
                     ports:
                       - name: http
                         containerPort: 80
                         protocol: TCP
                     # --- Add Environment Variables for env.js generation ---
                     env:
                       - name: REACT_APP_UNLEASH_PROXY_URL
                         value: {{ .Values.unleashProxy.url | quote }}
                       - name: REACT_APP_UNLEASH_APP_NAME
                         value: {{ .Values.unleashProxy.appName | quote }}
                       - name: REACT_APP_UNLEASH_ENVIRONMENT
                         value: {{ .Values.unleashProxy.environment | quote }}
                       - name: REACT_APP_UNLEASH_REFRESH_INTERVAL
                         value: {{ .Values.unleashProxy.refreshInterval | quote }}
                       - name: REACT_APP_UNLEASH_DISABLE_METRICS
                         value: {{ .Values.unleashProxy.disableMetrics | quote }}
                       # Optional: Inject Client Key from Secret if enabled
                       {{- if .Values.unleashProxy.clientKey.enabled }}
                       - name: REACT_APP_UNLEASH_CLIENT_KEY
                         valueFrom:
                           secretKeyRef:
                             name: {{ .Values.unleashProxy.clientKey.secretName }}
                             key: {{ .Values.unleashProxy.clientKey.secretKey }}
                       {{- else }}
                       # Provide an empty default if not enabled
                       - name: REACT_APP_UNLEASH_CLIENT_KEY
                         value: ""
                       {{- end }}
                       # Note: INSTANCE_ID is often better handled client-side if needed
                       - name: REACT_APP_UNLEASH_INSTANCE_ID
                         value: "" # Or potentially use Downward API if a pod-specific ID is desired
                     # --- End Environment Variables ---
                     # Add command to run env script before starting nginx
                     command: ["/bin/sh", "-c"]
                     args:
                       - |
                         echo "Generating env.js from environment variables..."
                         ENV_TYPE_FILE=/app/env_scripts/env_config \
                         ENV_JS_OUTPUT_LOCATION=/usr/share/nginx/html/env.js \
                         bash /app/env_scripts/env_config.sh js
                         echo "Starting Nginx..."
                         nginx -g 'daemon off;'
                     # --- End command override ---
                     livenessProbe:
                       httpGet:
                         path: /
                         port: http
                       periodSeconds: 60
                     readinessProbe:
                       httpGet:
                         path: /
                         port: http
                       periodSeconds: 60

        .. important::
           We override the container's `command` and `args` to explicitly run the `env_config.sh` script *before* starting Nginx. This ensures `public/env.js` is generated with the correct runtime values before being served. The script paths (`/app/...`) assume the working directory and copy locations from your `Dockerfile`. Adjust if necessary.

    d.  **Deploy/Upgrade**:
        Deploy or upgrade your Helm release. Ensure the Unleash Proxy is running and accessible, Vault is configured, VSO is running, and the necessary `VaultSecret` resources are applied.

        .. code-block:: bash

           make k8s-install-chart # or make k8s-upgrade-chart

Initialisation (React Context)
------------------------------

Use a React Context Provider to initialise the Unleash client and make it available throughout the application.

1.  **Create a Context Provider**:

    .. code-block:: tsx

       // src/contexts/FeatureFlagProvider.tsx (New file)
       import React, { ReactNode } from 'react';
       import { FlagProvider } from '@unleash/proxy-client-react';
       import { env } from '../env'; // Import the runtime env config

       interface FeatureFlagProviderProps {
         children: ReactNode;
       }

       // Basic configuration for the Unleash Proxy Client
       const config = {
         url: env.REACT_APP_UNLEASH_PROXY_URL, // URL of your Unleash Proxy
         clientKey: env.REACT_APP_UNLEASH_CLIENT_KEY || 'dummy-key', // Proxy client key (use a dummy if not required by proxy)
         refreshInterval: env.REACT_APP_UNLEASH_REFRESH_INTERVAL || 30, // How often (in seconds) to check for flag updates
         appName: env.REACT_APP_UNLEASH_APP_NAME || 'ska-react-webapp-skeleton', // Your application's name
         environment: env.REACT_APP_UNLEASH_ENVIRONMENT || 'development',
         // instanceId: env.REACT_APP_UNLEASH_INSTANCE_ID || undefined, // Optional: Can be set dynamically
         disableMetrics: env.REACT_APP_UNLEASH_DISABLE_METRICS || false,
       };

       // Add clientKey only if it's provided and not empty
       if (!config.clientKey) {
         delete config.clientKey;
       }

       console.log('Unleash Config:', config); // Log config for debugging

       export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({ children }) => {
         // You could add logic here to dynamically set instanceId if needed
         // config.instanceId = generateUniqueId();

         // You can also provide a loading component
         // return (
         //   <FlagProvider config={config} unleashClient={myClient} startClient={false} loadingComponent={<MyLoadingComponent />}>
         //     {children}
         //   </FlagProvider>
         // );

         return (
             <FlagProvider config={config}>
                 {children}
             </FlagProvider>
         );
       };

2.  **Wrap Your Application**:
    Modify ``src/index.jsx`` to wrap the ``App`` component with the new provider.

    .. code-block:: diff

       // src/index.jsx
       import React from 'react';
       import { createRoot } from 'react-dom/client';
       import './services/i18n/i18n';
       import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
       import { AuthProvider } from '@ska-telescope/ska-login-page';
       import { MSENTRA_CLIENT_ID, MSENTRA_TENANT_ID, MSENTRA_REDIRECT_URI } from './utils/constants';
       +import { FeatureFlagProvider } from './contexts/FeatureFlagProvider'; // Import the provider

       import App from './components/App/App';
       import Loader from './components/Loader/Loader';

       const container = document.getElementById('root');
       const root = createRoot(container);

       root.render(
         <React.Suspense fallback={<Loader />}>
           <StoreProvider>
             <AuthProvider
               MSENTRA_CLIENT_ID={MSENTRA_CLIENT_ID}
               MSENTRA_TENANT_ID={MSENTRA_TENANT_ID}
               MSENTRA_REDIRECT_URI={MSENTRA_REDIRECT_URI}
             >
               <FeatureFlagProvider> {/* Wrap App with the provider */}
                 <App />
               </FeatureFlagProvider>
             </AuthProvider>
           </StoreProvider>
         </React.Suspense>
       );


Basic Usage (useFlag Hook)
--------------------------

Use the ``useFlag`` hook within your functional components to check if a specific feature is enabled.

.. code-block:: tsx

   // Example inside a React component
   import React from 'react';
   import { useFlag } from '@unleash/proxy-client-react';

   const MyComponent: React.FC = () => {
     const showNewFeature = useFlag('my-new-feature-flag'); // Replace with your flag name

     return (
       <div>
         <h2>My Component</h2>
         {showNewFeature ? (
           <p>Showing the awesome new feature!</p>
         ) : (
           <p>Showing the standard behaviour.</p>
         )}
       </div>
     );
   };

   export default MyComponent;

Contextual Usage
----------------

The Unleash context (like ``userId``, ``sessionId``, ``remoteAddress``, or custom properties) needs to be provided to the ``FlagProvider`` or updated dynamically using the ``useUnleashContext`` hook.

1.  **Providing Initial Context via Provider**:

    .. code-block:: tsx

       // src/contexts/FeatureFlagProvider.tsx
       // ... imports ...
       import { useMsal } from '@azure/msal-react'; // Example: Get user info from MSAL

       export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({ children }) => {
         const { accounts } = useMsal(); // Get user account info if logged in
         const userId = accounts.length > 0 ? accounts[0].username : undefined; // Example user ID

         const dynamicConfig = {
           ...config, // Spread the base config from above
           context: {
             userId: userId,
             // Example: Add data centre if available from env or another source
             properties: {
                dataCentre: env.REACT_APP_DATA_CENTRE_NAME || 'unknown'
             }
           },
         };

         return (
             <FlagProvider config={dynamicConfig}>
                 {children}
             </FlagProvider>
         );
       };

2.  **Updating Context Dynamically**:

    .. code-block:: typescript

       // Inside a component where context changes (e.g., after login)
       import React, { useEffect } from 'react';
       import { useUnleashContext } from '@unleash/proxy-client-react';
       import { useMsal } from '@azure/msal-react';

       const UserSpecificComponent: React.FC = () => {
         const updateContext = useUnleashContext();
         const { accounts } = useMsal();
         const userId = accounts.length > 0 ? accounts[0].username : undefined;

         useEffect(() => {
           if (userId) {
             console.log(`Updating Unleash context with userId: ${userId}`);
             updateContext({ userId: userId });
           }
           // You might need to clear it on logout: updateContext({ userId: undefined });
         }, [userId, updateContext]);

         // ... rest of component ...
       };

Integration Example
-------------------

Let's conditionally render a part of the ``ReactSkeleton`` component based on a flag.

1.  **Ensure Provider is Wrapping**: Confirm ``App.tsx`` (and thus ``ReactSkeleton``) is wrapped by ``FeatureFlagProvider`` in ``index.jsx`` (done in the initialisation step).

2.  **Use `useFlag` in `ReactSkeleton.tsx`**:

    .. code-block:: diff

       // src/components/ReactSkeleton/ReactSkeleton.tsx
       import React from 'react';
       import { Box, Card, CardContent, Grid2 as Grid, Typography } from '@mui/material';
       import { useTranslation } from 'react-i18next';
       import {
         Alert,
         NumberEntry,
         TextEntry,
         StatusIcon,
         Spacer,
         AlertColorTypes
       } from '@ska-telescope/ska-gui-components';
       +import { useFlag } from '@unleash/proxy-client-react'; // Import the hook

       const STATUS_LEVEL = 1;
       const STATUS_SIZE = 50;

       // ... (other code) ...

       const ReactSkeleton = () => {
         const { t } = useTranslation('reactSkeleton');
         const [theNumber, setTheNumber] = React.useState(0);
         const [theText, setTheText] = React.useState('');
        const showExperimentalCard = useFlag('show-experimental-info-card'); // Use the flag

         return (
           <>
             {/* ... (existing Grid containers for title, alert, text/number entries) ... */}

             {/* Conditionally render the Card based on the feature flag */}
             {showExperimentalCard && (
               <Grid container direction="row" alignItems="center" justifyContent="space-around">
                 <Grid size={3}>
                   <Card data-testid="cardId" variant="outlined">
                     <CardContent>
                       <p data-testid="languageId">{t('language')}</p>
                       <StatusIcon level={STATUS_LEVEL} size={STATUS_SIZE} testId="statusId" />
                       <p data-testid="dummyMessageId">{t('dummy')}</p>
                     </CardContent>
                   </Card>
                 </Grid>
               </Grid>
             )}
           </>
         );
       };

       export default ReactSkeleton;


Advanced Topics
---------------

*   **Variants**: Use ``useVariant('flag-name')`` to get specific configuration values (strings, JSON) associated with a flag variant.
*   **Multiple Flags**: Use ``useFlags(['flag1', 'flag2'])`` to check multiple flags efficiently.
*   **Client Instance**: Access the underlying client instance via ``useUnleashClient()`` for more advanced operations if needed (rarely required).
*   **Server-Side Rendering (SSR)**: Requires special handling, potentially passing initial flag states from the server. Consult Unleash documentation for SSR frameworks.

Best Practices
--------------

*   **Proxy Security**: Ensure your Unleash Proxy is deployed securely and that its server-side API token (connecting to the main Unleash server) is protected (e.g., via Vault/VSO). Configure the proxy's client key requirements appropriately.
*   **Fallback Values**: The `useFlag` hook returns `false` by default if the flag doesn't exist or the client isn't ready. Rely on this or provide explicit fallbacks.
*   **Loading States**: Consider showing loading indicators while the Unleash client initialises or fetches flags, especially on the first load. The `FlagProvider` supports a `loadingComponent`.
*   **Performance**: The proxy client is generally lightweight. Avoid checking flags excessively within tight loops. Context updates trigger re-fetches, so update context judiciously.
*   **Clean Up**: Regularly remove flags from your code and Unleash server once features are stable or deprecated.
*   **Naming Conventions**: Use clear, consistent names for flags.

Conclusion
----------

You've learned how to integrate the Unleash React Proxy Client into the ``ska-react-webapp-skeleton``. This involves setting up runtime configuration via the existing `env.js` mechanism, configuring Helm charts to inject these values (including optional secrets managed by VSO), initialising the client using a React Context Provider, and using hooks like `useFlag` for conditional rendering. This approach ensures secure and flexible feature flagging for your frontend application across different deployment environments. Remember the crucial role of the Unleash Proxy as the secure intermediary between your browser application and the Unleash server.
