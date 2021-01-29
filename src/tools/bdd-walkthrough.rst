BDD Walkthrough
***************

This is a small adaptation of material by Giorgio Brahnik. For background on how BDD tests work, please read :doc:`bdd-test-context`.

#. Identify an SKA requirement. This may be an existing requirement, such as an interface requirement, or, if you are working on system verification, you may create a new requirement, such as `VTS-221 <https://jira.skatelescope.com/browse/VTS-221`_.
   
   #. If writing a new requirement, please label it with the PI (Program Increment) in which you plan to implement it. 

#. Create a JIRA issue of type "Test Set" in the XTP project. 

   #. (optional) Add a fix version corresponding to the relevant PI.
   #. Link this issue to the requirement defined above, using the "tests" relationship. (This can also be done from the requirement, but then the relationship used should be "tested by".)

#. Create the tests for the Test Set.

   #. Create issue of type "Test" in the XTP project.
   #. (optional) Add fix version.
   #. Click on the "Test Details" tab in the newly-created issue, and set:

.. image:: ../images/test-details.png
  :alt: Create Issue dialog box, showing the Test Details tab.
  :align: center
      
      * Test type: Cucumber
      * Cucumber type: scenario
      * Cucmber scenario: write your Gherkin (given, when, then) steps here.

   #. Link your test to the relevent Test Set or Test Sets. If you wish to link an existing test to a new Test Set, that's encouraged, and yuo can skip the test creation steps.

#. Once all the tests for the Test Set are defined, you can export the ``.feature`` file. 
   #. Find the relevant Test Set.
   #. Go to the More dropdown menu.
   #. Select Export to Cucumber from the menu. You'll need to do this for each Test Set you wish to exercise. 

.. image:: ../images/export-to-cucmber.png
  :alt: XTP JIRA issue showing the More dropdown expanded
  :align: center

#. Add the ``.feature`` file to the relevant git Hub repository. We recommend placing this in the same directory as your tests; you may want to create a directory for your .feature files so that they are placed close to the test code, but so they're not confused with it. 
#. Implement your tests using ``pytest-bdd``. 

   #. Import ``pytest-bdd`` to your test module.
   #. Define a pytest fixture. This creates an empty dictionary that is used to communicate data between steps. 
   #. Annotate the test case with the relevant scenario.
   #. Write your tests, annotating the methods with the Gherkin keywords. These methods can be reused by your tests (e.g. the same "given" step can be reused by several tests).
