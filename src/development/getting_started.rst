Getting Started
===============

I want to..
--------------------------

Add a new project to SKA organisation
`````````````````````````````````````

* Our project details can be found in the `Projects <https://developer.skatelescope.org/en/latest/projects/create_new_project.html>`_ section below

Develop a Tango device
``````````````````````

* A sample PyTango device project that can be forked can be found at `<https://github.com/ska-telescope/tango-example/>`_
* Documentation for it can be found at `<https://developer.skatelescope.org/projects/tango-example/en/latest/?badge=latest>`_

Containerise my solution
````````````````````````

* Our containerisation standards can be found in the `containerisation <https://developer.skatelescope.org/en/latest/development/containerisation-standards.html#container-standards-cheatsheet>`_ section below

Incorporate my project into the integration environment
``````````````````````````````````````````````````````````

Once your project is ready to form part of the integrated solution it needs to be incorporated. We use Kubernetes as orchestration layer - see :doc:`orchestration-guidelines`.

* Develop a helm chart for your project
    * :ref:`Helm instructions <orchestration-guidelines-templating-application>`
* Add the helm chart to k8s-integration repository
    * :ref:`Integration instructions <integrating-a-chart-into-the-k8s-integration-repo>`

Deploy the TMC prototype and Webjive in kubernetes
```````````````````````````````````````````````````

* The integration github repository can be found at `<https://github.com/ska-telescope/k8s-integration>`_
* Documentation on deployment can be found at `<https://developer.skatelescope.org/projects/k8s-integration/en/latest/README.html>`_