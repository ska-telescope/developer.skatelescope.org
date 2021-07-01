.. _mvp:

Working with the SKA Prototype Integration (SKAMPI) project
***********************************************************

Whether you're a Product Owner / Product Manager / Feature Owner, an AIV Test Engineer or an Operator or Scientist, there is a good chance you'd want to work with, test or use the integrated software that is being built by the Agile teams during SKA Construction. If you're a Developer, you'd want to use the SKAMPI git repository to integrate, deploy and test your software, either on your local enviroment or in the cloud. This page is a quick-start guide that will (hopefully!) guide you to the right place for your particular needs.

.. note:: Anyone that requires access to the deployed MVP needs a Gitlab account set up. Contact the System Team in the #team-system-support Slack channel for getting the appropriate access for your account, once you've created it on |gitlab_link|. You can also read more about :ref:`git`.

.. To open Gitlab in a new window, add the target="_blank" attribute to the hyperlink defined at the bottom of the page (look for |gitlab_link| - for more info see https://stackoverflow.com/questions/11716781/open-a-link-in-a-new-window-in-restructuredtext

Web-based User Interfaces
~~~~~~~~~~~~~~~~~~~~~~~~~

If you are interested in validating new stories or features that were developed by your team, you'd likely want to see the integrated software in action. The first User Interface (UI) is a simple landing page that you can use to find all the other available UI's. There are links to documentation, as well as some information about the current deployment configuration. You will also be able to access various monitoring tools.

STFC Cloud deployments
======================

Follow the links below for the landing pages (and software deployments) that are hosted in the STFC Cloud. For more information about the available UI's, read on.

**Integration**

The bleeding edge of the CI pipeline deployments can be reached in the Integration environment. Every 24 hours, a scheduled build of all the latest integrated OMC and SDP software is deployed from the master branch in SKAMPI. Go to the Start pages below for access to all the user interfaces available. 

* **Low**: https://k8s.stfc.skao.int/integration-low/start/
* **Mid**: https://k8s.stfc.skao.int/integration-mid/start/

**Staging** 

Whenever new releases are made ready for deployment to Production, the Staging environment is used to verify that all the tests pass, and is also used during System Demos, where applicable. Feature Owners should also be able to do exploratory testing here.

* **Low**: https://k8s.stfc.skao.int/staging-low/start/
* **Mid**: https://k8s.stfc.skao.int/staging-mid/start/

For local deployments, or from Continious Integration (CI) pipeline deployments from |devbranches_link|, you need to construct the URLs using a well-defined pattern (it's a relatively simple process). For more information about these access patterns, go to the SKAMPI documentation describing `Multitenancy </projects/skampi/en/latest/multitenancy.html#branch-names-and-access-patterns>`_.

PSI (Low)
=========
For access to the PSI Low hosted at CSIRO a user needs an account there. Contact the Viola Team on slack #team-viola for assistance.

Use Cases
~~~~~~~~~
.. todo::
    
    This whole section will likely disappear. Use cases are being developed in |usecases_draft_link|.

Adding a component to SKAMPI
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Changing the deployment configuration of a component 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Adding BDD tests to SKAMPI
~~~~~~~~~~~~~~~~~~~~~~~~~~
.. todo::

    Add a link and explanation for it's use to Team Viola's |skallop_install_guide_link| on Confluence as part of testing guidelines.


.. Hyperlinks opening on new pages used on this page

.. |gitlab_link| raw:: html

    <a href="https://gitlab.com/" target="_blank">Gitlab</a>

.. |skallop_install_guide_link| raw:: html

    <a href="https://confluence.skatelescope.org/x/dQeqC" target="_blank">SKALLOP Installation Guide</a>

.. |devbranches_link| raw:: html

    <a href="https://gitlab.com/ska-telescope/skampi/-/branches/active" target="_blank">development branches in the SKAMPI repository</a>

.. |usecases_draft_link| raw:: html

    <a href="https://confluence.skatelescope.org/x/6RyqC">AT-15: Use Cases for top 3 User Types of SKAMPI</a>