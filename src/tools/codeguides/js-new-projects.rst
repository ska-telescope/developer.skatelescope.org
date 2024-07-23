Creating a new repository for JS applications
=============================================

Application template repository
-------------------------------

Each new web project should start by creating a new SKA gitlab project as a fork of the 
`ska-telescope/ska-react-webapp-skeleton`_ project, which will provide a basic structure and an example component for reference.

.. _`ska-telescope/ska-react-webapp-skeleton`: https://gitlab.com/ska-telescope/templates/ska-react-webapp-skeleton

.. tip::

   The template application is regularly maintained so it is encouraged that this is reviewed periodically to ensure that
   the latest changes are noted and implemented into any forked application as applicable.

Migrating the template for a new application
--------------------------------------------

Details of this process is detailed within the Read-the-docs information of the template ( See `here`_ ).

.. _`here`: https://developer.skao.int/projects/ska-react-webapp-skeleton/en/latest/Installation.html

SKAO Libraries
--------------

There are a number of libraries that are available for use.   The react template has implemented them and so there are
examples within the codebase.   Documentation on the components within these libraries are available by following the 
links.

.. note::

  The documentation in the repositories below is maintained separately to the coding guidelines, and should be
  considered as work in progress.   

* `ska-javascript-components`_.
   Contains basic components, without specific SKAO styling.
   It is not expected that this repository will be used directly, so has been included for information purposes only.

.. _`ska-javascript-components`: https://developer.skao.int/projects/ska-javascript-components/en/latest/?badge=latest

* `ska-gui-components`_ 
    Contains a number of components, with SKAO styling added by implementing Material-UI Themes.  
    It also inherits all components from ska-javascript-components, so with this library included, there is no additional need
    to include the ska-javascript-components library.

    For each component, there is an image and a table of the properties that are available 

.. _`ska-gui-components`: https://developer.skao.int/projects/ska-gui-components/en/latest/?badge=latest

* `ska-gui-local-storage`_
    Provides local storage functionality using Redux.
    This repository is currently under usage review and may be withdrawn

.. _`ska-gui-local-storage`: https://developer.skao.int/projects/ska-gui-local-storage/en/latest/?badge=latest


To update the libraries to the latest version:

``yarn skao:update``