.. _how-vault-secret-rotation:

Rotate secrets with Vault Secrets Operator and Kubernetes
*********************************************************

This page covers how to automatically rotate secrets in a Kubernetes cluster in case of a secret leak or something similar. Lets imagine a case of an application deployed that communicates with **Slack** channels to devlier targetted messages to a Slack channel. Slack webhooks are indeed secrets and Slack actively monitors public Git repositories for their inclusion. If they are committed to a public repository, Slack will invalidate the secret immediately. This will make our example application malfunction, as it won't be able to communicate with the channel anymore.

.. note::

   Currently we do not support `rolloutRestartTargets` in TANGO deployments using `ska-tango-util`. Please demonstrate your interest in that feature in `COP Tango <https://skao.slack.com/archives/CECSS44LX>`_.

After recognizing that the secret was leaked, the first step would be to generate a new one and update it in **Vault**. If you want to know how to do it, please check how we use Vault for :ref:`secrets management <tools-vault>`. As we demonstrate in the :ref:`Vault Secrets Operator tutorial <tutorial-vault-secret-sync>`, VSO already provides automatic synchronization. Although, that synchronization might not happen immediately. Fortunately, we can set `refreshAfter <https://developer.hashicorp.com/vault/docs/platform/k8s/vso/api-reference#vaultstaticsecret>`_ to mandate VSO to synchronize **at least** at that specified period:

.. code-block:: yaml
    :caption: Deployment and VaultStaticSecret

    ---
    apiVersion: secrets.hashicorp.com/v1beta1
    kind: VaultStaticSecret
    metadata:
      name: slack-webhook
    spec:
      type: kv-v2
      mount: <engine>
      path: <path/to/secret>
      refreshAfter: 60s
      destination:
        name: slack-webhook
        create: true
        overwrite: true
        transformation:
          excludeRaw: true
          includes:
            - webhook
    ---
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: slack-notifier
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: slack-notifier
      template:
        metadata:
          labels:
            app: slack-notifier
        spec:
          containers:
            - name: notifier
              image: some-slack-notifier:1.0.0
              env:
                - name: SLACK_WEBHOOK
                  valueFrom:
                    secretKeyRef:
                      name: slack-webhook
                      key: webhook

This will guarantee that VSO attempts to refresh the secret every 60 seconds. Even if the secret changes and is synchronized in Kubernetes, the variable is not updated in the pod unless it gets restarted. To overcome that, we can set `rolloutRestartTargets` to make sure our deployment is restarted the second the Kubernetes secret is synchronized with Vault.

.. code-block:: yaml
    :caption: Updating VaultStaticSecret to rollout the deployment automatically

    ---
    apiVersion: secrets.hashicorp.com/v1beta1
    kind: VaultStaticSecret
    metadata:
      name: slack-webhook
    spec:
      type: kv-v2
      mount: <engine>
      path: <path/to/secret>
      refreshAfter: 60s
      rolloutRestartTargets:
       - kind: Deployment
         name: slack-notifier
      destination:
        name: slack-webhook
        create: true
        overwrite: true
        transformation:
          excludeRaw: true
          includes:
            - webhook

As you can see in `Vault's documentation <https://developer.hashicorp.com/vault/docs/platform/k8s/vso/api-reference#rolloutrestarttarget>`_, we can add StatefulSets, Deployments and DaemonSets. As always, be careful with implement automatic rollouts as they might have unexpected effects in the stability of the application.
