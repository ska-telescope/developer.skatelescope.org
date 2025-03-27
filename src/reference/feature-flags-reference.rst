.. _feature-flags-reference:

#######################
Feature Flags Reference
#######################

Links to external documentation and relevant API information.

External Documentation
======================

*   **GitLab Feature Flags:**

    *   `Main Documentation <https://docs.gitlab.com/ee/operations/feature_flags.html>`__
    *   `GitLab Feature Flag API <https://docs.gitlab.com/ee/api/feature_flags.html>`__

*   **Unleash (Open Source):**

    *   `Unleash Open Source Homepage <https://www.getunleash.io/>`__
    *   `Unleash Architecture Overview <https://docs.getunleash.io/understanding-unleash/unleash-overview>`__
    *   `Unleash Proxy <https://docs.getunleash.io/reference/unleash-proxy>`__
    *   `Activation Strategies <https://docs.getunleash.io/reference/activation-strategies>`__

*   **Unleash Client SDKs:** Select v5.0 for the below SDKs as Gitlab does not support v6.

    *   `Python Client (UnleashClient) <https://github.com/Unleash/unleash-client-python>`__
    *   `React Proxy Client (@unleash/proxy-client-react) <https://github.com/Unleash/proxy-client-react>`__

*   **SKAO Specific:**

    *   :ref:`feature-flags`

GitLab API (for programmatic management, e.g., via CI/CD)
=========================================================
*   `List feature flags <https://docs.gitlab.com/ee/api/feature_flags.html#list-feature-flags>`__
*   `Create a feature flag <https://docs.gitlab.com/ee/api/feature_flags.html#create-a-feature-flag>`__
*   `Update a feature flag strategy <https://docs.gitlab.com/ee/api/feature_flags.html#update-a-feature-flag-strategy>`__ 
*   `Delete a feature flag <https://docs.gitlab.com/ee/api/feature_flags.html#delete-a-feature-flag>`__


Unleash Proxy Environment Variables (for configuration)
=======================================================
*   ``UNLEASH_PROXY_SECRETS``: Shared secret used to configure an Unleash Proxy client.
*   ``UNLEASH_URL``: Your project’s API URL. For more details, read Get access credentials.
*   ``UNLEASH_INSTANCE_ID``: Your project’s Instance ID. For more details, read Get access credentials.
*   ``UNLEASH_APP_NAME``: The name of the environment the application runs in. For more details, read Get access credentials.
*   ``UNLEASH_API_TOKEN``: Required to start the Unleash Proxy, but not used to connect to GitLab. Can be set to any value.

Unleash Python SDK Reference (`unleash-client`)
===============================================

Installation
++++++++++++

* Install from PyPI

.. code-block:: bash

    pip install UnleashClient

Initialisation
++++++++++++++

* Basic setup

.. code-block:: python

    from UnleashClient import UnleashClient
    
    client = UnleashClient(
        url="https://unleash.example.com",
        app_name="my-python-app",
        custom_headers={'Authorization': '<API token>'}
    )
    
    client.initialize_client()

* Key parameters:

  * ``url`` - Unleash server URL
  * ``app_name`` - Application identifier
  * ``custom_headers`` - Headers for authentication
  * ``environment`` - Runtime environment
  * ``project_name`` - Project identifier
  * ``refresh_interval`` - Toggle refresh timing
  * ``metrics_interval`` - Metrics sending timing
  * ``disable_metrics`` - Turn off metrics
  * ``cache_directory`` - Local cache location

Core Features
+++++++++++++

* Check if feature is enabled

.. code-block:: python

    # Simple check
    is_enabled = client.is_enabled("my_toggle")
    
    # With context
    app_context = {"userId": "user@example.com"}
    is_enabled = client.is_enabled("user_toggle", app_context)

* Get feature variant

.. code-block:: python

    context = {'userId': '2'}
    variant = client.get_variant("variant_toggle", context)

Context
+++++++

* Supported context fields:

  * ``userId`` - User identifier
  * ``sessionId`` - Session identifier
  * ``remoteAddress`` - IP address
  * ``properties`` - Custom properties dictionary

Fallbacks
+++++++++

* Custom fallback function

.. code-block:: python

    def fallback(feature_name, context):
        return True
        
    client.is_enabled("toggle", fallback_function=fallback)
    
* Lambda default

.. code-block:: python

    client.is_enabled("toggle", 
                     fallback_function=lambda feature_name, context: True)

Client Lifecycle
++++++++++++++++

* Registration with Unleash server
* Periodic toggle fetching
* On-disk caching
* Metrics reporting


Strategies
++++++++++

* Supported strategies:

  * Default
  * UserID
  * IP
  * Gradual Rollout
  * Flexible Rollout

Resources
+++++++++

* `Documentation <https://docs.getunleash.io/unleash-client-python/>`__
* `GitHub Repository <https://github.com/Unleash/unleash-client-python>`__
* `Changelog <https://docs.getunleash.io/unleash-client-python/changelog.html>`__


Unleash React Client (`@unleash/proxy-client-react`)
====================================================

Installation
++++++++++++

* Install via npm

.. code-block:: bash

    npm install unleash-proxy-client

Initialisation
++++++++++++++

* Basic setup

.. code-block:: javascript

    import { UnleashClient } from 'unleash-proxy-client';
    
    const unleash = new UnleashClient({
      url: 'https://YOUR-UNLEASH-INSTANCE/api/frontend',
      clientKey: '<your-client-side-token>',
      appName: 'my-webapp'
    });
    
    unleash.start();

* Key parameters:

  * ``url`` - Front-end API or Edge URL
  * ``clientKey`` - Client-side API token
  * ``appName`` - Application identifier
  * ``context`` - Initial Unleash context
  * ``refreshInterval`` - Toggle refresh timing (seconds)
  * ``disableRefresh`` - Turn off auto-refresh
  * ``metricsInterval`` - Metrics sending timing
  * ``disableMetrics`` - Turn off metrics
  * ``storageProvider`` - Custom storage implementation
  * ``bootstrap`` - Initial toggle configuration
  * ``environment`` - Context environment property
  * ``usePOSTrequests`` - Use POST instead of GET

Core Features
+++++++++++++

* Wait for client readiness

.. code-block:: javascript

    unleash.on('ready', () => {
      // Use client here
    });

* Check if feature is enabled

.. code-block:: javascript

    const enabled = unleash.isEnabled('featureToggle');

* Get feature variant

.. code-block:: javascript

    const variant = unleash.getVariant('featureToggle');
    if (variant.name === 'blue') {
      // Handle blue variant
    }

Context Management
++++++++++++++++++

* Update entire context

.. code-block:: javascript

    unleash.updateContext({ userId: '123' });

* Set specific context field

.. code-block:: javascript

    unleash.setContextField('userId', '456');

* Remove context field

.. code-block:: javascript

    unleash.removeContextField('userId');

Events
++++++

* Key events:

  * ``initialized`` - Read local cached data
  * ``ready`` - Connected to Unleash API
  * ``update`` - New toggle configuration
  * ``error`` - SDK error occurred
  * ``recovered`` - SDK recovered from error
  * ``sent`` - Metrics sent

* Event listener example

.. code-block:: javascript

    unleash.on('update', () => {
      // Handle toggle updates
    });

Storage Options
+++++++++++++++

* Custom storage provider

.. code-block:: javascript

    const unleash = new UnleashClient({
      // other options
      storageProvider: {
        save: (name, data) => {
          // Store implementation
        },
        get: (name) => {
          // Retrieval implementation
        }
      }
    });

Bootstrap
+++++++++

* Bootstrap with initial data

.. code-block:: javascript

    const unleash = new UnleashClient({
      // other options
      bootstrap: [{
        "enabled": true,
        "name": "featureToggle",
        "variant": {
          "enabled": true,
          "name": "blue",
          "feature_enabled": true
        }
      }],
      bootstrapOverride: true
    });

Manual Refresh
++++++++++++++

* Disable auto-refresh

.. code-block:: javascript

    const unleash = new UnleashClient({
      // other options
      refreshInterval: 0,
      metricsInterval: 0
    });

* Manual refresh calls

.. code-block:: javascript

    unleash.updateToggles();
    unleash.sendMetrics();

Cleanup
+++++++

* Stop the client

.. code-block:: javascript

    unleash.stop();

Usage Environments
++++++++++++++++++

* Browser
* React and React Native
* Node.js (requires fetch implementation)
* CDN

Resources
+++++++++

* `Documentation <https://docs.getunleash.io/>`__
* `GitHub Repository <https://github.com/Unleash/unleash-proxy-client-js>`__
