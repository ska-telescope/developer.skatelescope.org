Testing
=======

Working tests should exist for as much code as possible. At a minimum code developed or 
modified within the SKA Project should have working tests. Overall code coverage for all web projects
is expected to adhere to the :doc:`Software Testing Policy and Strategy </policies/ska-testing-policy-and-strategy>`. 

.. note::

  It is generally agreed in the industry that each software project should aim for a code coverage percentage of between 60% and 90%. 
  SKA :doc:`Fundamental software standards </policies/fundamental-sw-requirements>` are prescriptive about test coverage larger than 75%. 

What is unit testing?
---------------------

The SKA definition is in the :doc:`Software Testing Policy and Strategy </policies/ska-testing-policy-and-strategy>`.

For developers, this is realized as a form of open-box testing, which is faster than component testing, however usually 
focuses on the function as opposed to a use case 

Examples : Jest, viTest

.. tip:: Unit testing with Vitest

  Please refer to https://vitest.dev/guide/.

What is component testing?
--------------------------

The SKA definition is in the :doc:`Software Testing Policy and Strategy </policies/ska-testing-policy-and-strategy>`.

For developers, this is realized as a form of closed-box testing, which often follows specific use cases, and so is 
slower than unit testing 

Examples : Cypress, Selenium

.. tip:: Component testing with Cypress

  Please refer to https://docs.cypress.io/guides/component-testing/overview.

Unit/Component testing in the SKAO
----------------------------------

Whether unit or component testing is employed at the lowest level, the test files for these tests should reside in the 
same location as the application component they are testing so that it is easy to locate and update as required.  
These tests should make use of mocked API calls to simulate responses from external sources

end-to-end ( e2e ) testing
--------------------------

These are tests that check and validate user journeys throughout the application and encompass the use of multiple components
across one or more pages, including navigation between pages.  This testing includes the makes use of real external application 
calls for the realization of data. It is important that the mocked data is complete and suitable for the checking of all the 
paths thru the application

.. tip:: e2e testing with Cypress

  Please refer to https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test.

Using the ``testId`` property
-----------------------------

There is an industry recommendation to use specific testing identifiers as opposed to relying on a component label, or it being the only
component of its type visible.  This reduces the need for testing to be re-written should labels or page positioning change.
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
