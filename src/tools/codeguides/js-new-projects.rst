Creating a new repository for JS applications
=============================================

Each new web project should start by creating a new SKA gitlab project as a fork of the 
ska-telescope/ska-react-webapp-skeleton project, which will provide a basic structure and an example component for reference.

Application template repository
-------------------------------

Each new web project should start by creating a new SKA gitlab project as a fork of the 
ska-telescope/ska-react-webapp-skeleton project, which will provide a basic structure and an example component for reference.
[https://gitlab.com/ska-telescope/templates/ska-react-webapp-skeleton]

.. tip::

   The template application is regularly maintained so it is encouraged that this is reviewed periodically to ensure that
   the latest changes are noted and implemented into any forked application as applicable.

Migrating the template for a new application
--------------------------------------------

Details of this process is detailed within the Read-the-docs information of the template.
The link is provided below for convenience.
( https://developer.skao.int/projects/ska-react-webapp-skeleton/en/latest/Overview.html )

SKAO Libraries
--------------

There are a number of libraries that are available for use.   The react template has implemented them and so there are
examples within the codebase.   

* ska-javascript-components : Contains a few basic components.
  [ https://developer.skao.int/projects/ska-javascript-components/en/latest/?badge=latest ]

* ska-gui-components : Contains a number of components, based on Material-UI.  It also inherits all components from ska-javascript-components
  [ https://developer.skao.int/projects/ska-gui-components/en/latest/?badge=latest ]

* ska-gui-local-storage : Provides local storage functionality using Redux
  [ https://developer.skao.int/projects/ska-gui-local-storage/en/latest/?badge=latest ]

.. tip:: 

   The components from ska-javascript-components library are provided in addition as part of the ska-gui-components library, 
   so separate inclusion is not required.

To update the libraries to the latest version:

> yarn skao:update