.. _services:

Services
========

.. toctree::
  :maxdepth: 1
  :hidden:

  global/global
  local/local
  dependent/dependent

Services can be categorised by where they are run.

:doc:`Global <global/global>` services are deployed and run centrally and do not need to be deployed at each node within
the SRCNet network.

:doc:`Local <local/local>` services are deployed and run on each node within the SRCNet network.

In addition, there are also :doc:`dependent <dependent/dependent>`  services. Dependent services are services that
are depended on by another service. Services in this section will be referenced from elsewhere and are not expected to
be deployed in isolation.