********************************************
Enable and Customise CI/CD Security Scanning
********************************************

.. note::

    The previously defined oci-image-scan and python-gemnasium-scan jobs have been deprecated and are no longer included as part of the SKAO templates.
    If your repo contains any reference to this it should be removed.


Add and configure the templates
===============================

To run the container and dependency scanning jobs you need to add the ``gitlab-templates.gitlab-ci.yml`` file - from the templates-repository - to your repo's ``.gitlab-ci.yml`` include section file:

.. code:: yaml

    include:
        # Gitlab Templates for Container and Dependency Scanning"
        - project: "ska-telescope/templates-repository"
          file: "gitlab-ci/includes/gitlab-templates.gitlab-ci.yml"


You also need to ensure that both the ``test`` and ``scan`` stages are defined in your ``.gitlab-ci.yml``:

.. code:: yaml

    stages:
      - test
      - scan

This will automatically include and run the container scanning and dependency scanning templates on your pipeline.

If you want to disable one of these security scanning jobs you can add a predefined variable to the variables section of your ``.gitlab-ci.yml``:

.. code:: yaml

    variables:
      CONTAINER_SCANNING_DISABLED: 'true' # to disable the container scanning
      DEPENDENCY_SCANNING_DISABLED: 'true' # to disable the dependencies scanning

By default, the **container scanning job** will scan an image under the path: ``$CI_REGISTRY/$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME/$CI_PROJECT_NAME:$CI_COMMIT_SHORT_SHA``.
To change this the variable CS_IMAGE needs to be overwritten by adding the desired value to the variables section of your ``.gitlab-ci.yml``:

.. code:: yaml

    variables:
      CS_IMAGE: <my-new-path>

Once these configurations are done, the pipeline will run the container and dependency scanning jobs and the summary results of these can be analysed from the MR's overview section as shown by the following example:

.. figure:: images/security-scanning/security-scanning-results.png
   :scale: 40%
   :alt: Gitlab's MR Security Scanning Results Section
   :align: center
   :figclass: figborder

|

To know more about the Gitlab Security scanning please refer to Gitlab's official documentation for `container scanning <https://docs.gitlab.com/ee/user/application_security/container_scanning/>`__ and `dependency scanning <https://docs.gitlab.com/ee/user/application_security/dependency_scanning/>`__.
