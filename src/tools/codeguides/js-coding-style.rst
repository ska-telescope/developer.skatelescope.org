Coding Style
============

Conventions
-----------

JavaScript has many code style guides. For the SKA Projects we have settled 
on the `AirBnB JavaScript Style Guide`_. 

.. _`AirBnB JavaScript Style Guide`: https://github.com/airbnb/javascript/

As a developer it is worth familiarizing yourself with the AirBnB guide above, and some of the background 
reading that they suggest.

File Suffixes
-------------

* For standard Javascript, use the suffix .js  
* If JavaSCript extension is used, then the suffix should be .jsx
* Test files should be prefixed .test.{js|jsx}

Data and Configuration Files
----------------------------

* Use proxies and relative paths where possible. Avoid hard coded URLs.  
* Any explicit paths should be derived from a consistent configuration source. 

( See example https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually )

Logging implementation
----------------------

Remove all console statements when done. Production code should not contain any console statements.

Accessibility
-------------

The components provided in the ska-components-libraries have properties called ``ariaTitle`` & ``ariaDescription``.
The contents of these fields are accessed by standard screen-readers and so should always be populated with meaningful
content that will be useful to those that use screen readers.

Ensure that components and pages make use of the standard SKAO theme as this has been checked and verified to be fully accessible
to users across a number of accessibility variations.  

Testing
-------

The components provided in the ska-components-libraries have a property called ``testId``.  A unique value should be assigned to
this property to ensure that identification of the component during testing is a simple process.