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

* For standard JavaScript, use the suffix ``.js``  
* If JavaScript extension is used, then the suffix should be ``.jsx``
* Test files should be prefixed .test.{js|jsx}

.. note:: 

   Most applications are now developed using TypeScript. For standard TypeScript use the suffix ``.ts``.
   For TypeScript extension, then the suffix should be ``.tsx`` 

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

The components provided in the ska-gui-components have properties called ``ariaTitle`` & ``ariaDescription``.
The contents of these fields are accessed by standard screen-readers and so should always be populated with meaningful
content that will be useful to those that use screen readers.  Using components outside of the ska-gui-components should make use
of ``aria-label`` and ``aria-description`` respectively. 

Ensure that components and pages make use of the standard SKAO theme as this has been checked and verified to be fully accessible
to users across a number of accessibility variations.  

Below is an example of using these as part of a standard SKA Button component. Also emphasized is an example of using the 
``testId``, which is outlined in the next section

.. code-block:: Javascript
  :emphasize-lines: 2,3,8 

  <Button
      ariaDescription="Button that will add a record to the list when clicked"
      ariaText="Add Button"
      color={ButtonColorTypes.Secondary}
      disabled={!enabled()}
      icon={getIcon()}
      label={t('button.add')}
      testId="addButton"
      onClick={buttonClicked}
      variant={ButtonVariantTypes.Contained}
    />

Testing
-------

The components provided in the ska-components-libraries have a property called ``testId``.  A unique value should be assigned to
this property to ensure that identification of the component during testing is a simple process.

In the example above the testId is emphasized.  An example of the use of this as part of testing is shown on the testing page.