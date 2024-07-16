Testing
=======

Working tests should exist for as much code as possible. At a minimum, code developed or 
modified within the SKA Project should have working tests. Overall code coverage for all web projects
is expected to be at a minimum acceptable level of 75%, but it is hoped that this level will be much higher

What is unit testing?
---------------------

Form of open-box testing method that involves testing individual pieces (units) of code in isolation from the rest 
of the software. By focusing on the smallest testable parts of an application—typically functions or methods—unit 
testing ensures that each segment performs as expected before it is integrated with other parts of the application.

This is faster than component testing, however usually focuses on the function as opposed to a use case 

Examples : Jest, viTest

.. tip:: Unit testing with Vitest

  Please refer to https://vitest.dev/guide/.

What is component testing?
--------------------------

Component testing is a form of closed-box testing, meaning that the test evaluates the behavior of the component without 
considering the details of the underlying code. Component testing is done on the section of code in its entirety, 
after the development has been completed.

This often follows specific use cases, and so is slower than unit testing 

Examples : Cypress, Selenium

.. tip:: Component testing with Cypress

  Please refer to https://docs.cypress.io/guides/component-testing/overview.

Unit/Component testing in the SKAO
----------------------------------

Whether unit or component testing is employed at the lowest level, the test files for these tests should reside in the 
same location as the application component they are testing so that it is easy to locate and update as required.  
These tests should make use of mocked API calls to simulate responses from external sources

.. note:: git badges

   Badges have been added providing counts and percentages to indicate coverage and tests totals, passed, failed and skipped.

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

There is an industry recommendation to use specific testing identifiers as opposed to relying on a component label, or it being the only
component of it's type visible.  This reduces the need for testing to be re-written should labels or page positioning change.
Within the standard SKAO Component libraries, there has been an active decision to provide a ``testId`` property to components to 
encourage the use of this recommendation.
 
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
   