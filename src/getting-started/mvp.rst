.. _mvp:

Working with the Evolutionary Prototype (SKAMPI)
************************************************

Whether you're a Developer, a Product Owner / Product Manager / Feature Owner, an AIV Test Engineer or an Operator or Scientist, there is a good chance you'd want to work with the SKA MVP Integration or related products while it is being constructed. Depending on which of these roles fits your description, you'll want to approach the task of getting to know this software slightly differently.

.. note:: Anyone that requires access to the MVP needs a Gitlab account set up. Contact the System Team in the #team-system-support Slack channel for getting the appropriate access for your account, once you've created it on `gitlab.com <https://gitlab.com>`_. 

Product Owners/Managers
~~~~~~~~~~~~~~~~~~~~~~~
If you are interested in validating new features that were developed by your team, you'd likely want to see the integrated software in action. Follow these links for the landing pages in the Staging environments:

STFC Cloud deployments
======================

**Integration**

* **Low**: https://k8s.stfc.skao.int/integration-low/start/
* **Mid**: https://k8s.stfc.skao.int/integration-mid/start/

**Staging** 

* **Low**: https://k8s.stfc.skao.int/staging-low/start/
* **Mid**: https://k8s.stfc.skao.int/staging-mid/start/

For branched or local deployments, you need to construct the URLs using a well-defined pattern (it's a relatively simple process). For more information about these access patterns, go to the SKAMPI documentation describing `Multitenancy </projects/skampi/en/latest/multitenancy.html#branch-names-and-access-patterns>`_.

PSI (Low)
=========
For access to the PSI Low hosted at CSIRO a user needs an account there. Contact the Viola Team on slack #team-viola for assistance.


AIV Test Engineers
~~~~~~~~~~~~~~~~~~


Telescope Operators / Scientists
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Here be dragons. From your point of view, "using SKAMPI" is limited to using the end-user applications that are deployed by the teams in the Staging environments. Ideally the Product/Feature Owners should help you gain access to the User Interfaces that you see demonstrated during PI / System Demos, as they verified that the developed features were created according to the SKA :ref:`Definition of Done <definition-of-done>`.


Developers
~~~~~~~~~~
.. todo::
    
    Three use cases:
        - I want to integrate new component(s) / modify a Chart to the repository
        - Link to Tango Examples
        - List development steps: 
            - create new project/component / checkout existing project
            - build images
            - deploy in local minikube
            - deploy in remote k8s cluster
        - I want to modify the values.yaml file (change the deployment configuration of an existing chart) 
        - explain why this may be what a Developer wants to do
        - I want to add a System Level integration- or end-to-end acceptance test to SKAMPI
