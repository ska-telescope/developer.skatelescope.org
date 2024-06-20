Testing
=======

Working tests should exist for as much code as possible. At a minimum code developed or 
modified within the SKA Project should have working tests. Overall code coverage for all web projects
is expected to be at a minimum acceptable level of 75%, but it is hoped that this level will be much higher

Unit/Component testing
----------------------

These are tests that check and validate that a single component or group of components work as expected.
The test files for these tests should reside in the same location as the component they are testing so that
it is easy to locate and update as required.  These tests will make use of mocked API calls to simulate responses
from external sources

.. note:: git badges

   Badges have been added providing counts and percentages to indicate coverage and tests totals, passed, failed and skipped.

.. tip:: Component testing with Cypress

  Please refer to https://docs.cypress.io/guides/component-testing/overview.

end-to-end ( e2e ) testing
--------------------------

These are tests that check and validate user journeys throughout the application and encompass the use of multiple components
across one or more pages, including navigation between pages.  This testing includes the makes use of real external application 
calls for the realization of data. It is important that the mocked data is complete and suitable for the checking of all the 
paths thru the application

.. note:: git badges

   Badges have been added providing counts and percentages to indicate e2e coverage and e2e tests totals, passed, failed and skipped.

.. tip:: e2e testing with Cypress

  Please refer to https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test.

Using the ``testId`` property
-----------------------------

Below is an example of a standard SKA Button with the testId defined.

.. code-block:: Javascript
  :emphasize-lines: 8 

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

This can be used to locate the component for testing purposes as shown here.

.. code-block:: Javascript

   cy.get('[data-testid="testId"]').click({ multiple: true });
   