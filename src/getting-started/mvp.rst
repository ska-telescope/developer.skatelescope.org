.. _mvp:

Working with the Evolutionary Prototype (SKAMPI)
************************************************

Whether you're a Developer, a Product Owner / Product Manager / Feature Owner, an AIV Test Engineer or an Operator or Scientist, there is a good chance you'd want to work with the SKA MVP Integration or related products while it is being constructed. Depending on which of these roles fits your description, you'll want to approach the task of getting to know this software slightly differently.

.. warning:: Anyone that requires access to the MVP needs a Gitlab account set up. Contact the System Team in the #team-system-support Slack channel for getting the appropriate access for your account, once you've created it on `gitlab.com <https://gitlab.com>`_. 

Developers
~~~~~~~~~~
Please go to the `README and documentation </projects/skampi>`_ of the `SKAMPI repository <https://gitlab.com/ska-telescope/skampi>`_. On your way there, please first familiarise yourself with the `SKA Tango Examples </projects/ska-tango-examples/en/latest/?badge=latest#>`_. Using that project will give you an introduction to working with Tango. If you're more of a Data Processing kind of developer, you will find more value following the instructions provided for the SDP development.

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

For branched or local deployments, you need to construct the URLs using a well-defined pattern. For more information about these access patterns, go to the SKAMPI documentation describing `Multitenancy </projects/skampi/en/latest/multitenancy.html#branch-names-and-access-patterns>`_.

PSI (Low)
=========
For access to the PSI a user needs an SSH tunnel set up. Contact the System Team ????? for assistance.


AIV Test Engineers
~~~~~~~~~~~~~~~~~~

Telescope Operators / Scientists
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Here be dragons. You'd probably want to wait until we're done building the software before asking to work with the MVP, but if you really feel brave, follow the instructions for the AIV Test Engineers, and make sure a Developer watches what you're doing so that they can learn first-hand about improving the UX for those who will follow your footsteps!