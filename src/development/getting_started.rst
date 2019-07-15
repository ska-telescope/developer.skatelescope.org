Getting Started
===============

I want to..
--------------------------

Deploy the TMC prototype and Webjive in kubernetes
```````````````````````````````````````````````````

* The integration github repository can be found at `<https://github.com/ska-telescope/k8s-integration>`_
* Documentation on deployment can be found at `<https://developer.skatelescope.org/projects/k8s-integration/en/latest/README.html>`_

Develop a Tango device
``````````````````````

* A sample PyTango device project that can be forked can be found at `<https://github.com/ska-telescope/tango-example/>`_
* Documentation for it can be found at `<https://developer.skatelescope.org/projects/tango-example/en/latest/?badge=latest>`_

Containerise my solution
````````````````````````

* Our containerisation standards can be found in the `containerisation <https://developer.skatelescope.org/en/latest/development/containerisation-standards.html#container-standards-cheatsheet>`_ section below

Add a project to SKA
````````````````````

* Our project details can be found in the `Projects <https://developer.skatelescope.org/en/latest/projects/create_new_project.html>`_ section below

Incorporate my helm chart into the integration environment
``````````````````````````````````````````````````````````

Once your project is ready to form part of the integrated solution it needs to be incorporated

* Develop a helm chart for your project
    * `Helm instructions <https://developer.skatelescope.org/en/latest/development/orchestration-guidelines.html#templating-the-application>`_
* Add the helm chart to k8s-integration repository
    * `Integration instructions <https://developer.skatelescope.org/en/latest/development/orchestration-guidelines.html#integrating-a-chart-into-the-k8s-integration-repo>`_

