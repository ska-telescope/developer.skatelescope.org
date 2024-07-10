Documentation
=============

There is a number of different area's of documentation that is required as part of an application repository, which
are outlined in the sections below.  As an overarching consideration, 

* All interface implementations should be fully documented. 

* All code should be well commented as required, following standard JSDoc conventions. 

* Ensure that the documentation is appropriate for the audience  ( e.g.  Developer, User )


README.md
---------

This file exists in all Gitlab applications and is displayed as part of the presentation of the repository.
The content of the file should provide a summary of the application, together with any information that may be
of use to the users of the repository.   

.. tip::

   As comprehensive details are expected to be provided in Read-the-docs,  It is highly recommended that
   a link to the initial page of the Read-the-docs should be provided

Read-the-docs
-------------

https://sublime-and-sphinx-guide.readthedocs.io/en/latest/index.html

Read-the-docs should be used for detailing the content and usage of the application.  
Content of this should provide a comprehensive guide to the application including usage, tutorials and guides as appropriate.

.. tip::

   It is possible to link the documentation directly to an icon in the standard header.  In this case it is recommended
   that this is linked to a user guide section

.. note::

   A git badge has been added labelled docs, which will navigate to the landing page of the documentation when clicked

JSDocs
------

https://jsdoc.app/

JSDoc is an API documentation generator for JavaScript. Documentation comments directly to the source code, 
right alongside the code itself. The JSDoc tool will scan the code and generate an HTML documentation website.
