Code format and layout
======================

[ESLint](https://ESLint.org/) and [Prettier](https://prettier.io/) are included as code analysis and formatting tools. 
These do not need installing as they’re included in node_modules by running 

> yarn init.

These tools can be run in the command line or integrated into your IDE.

.. tip:: 

   Ensure that prettier and lint in that sequence are both run before any commits as these are also run as part of the pipeline

Prettier
--------

This will check the JS Code and reformat to a standard structure.  

To run this to see the current display issues in the application: 

> yarn prettier

Run the following to allow the library to automatically update the layout:

> yarn prettier:fix

linting
-------

This will check the JS Code and ensure that the code meets required standards.  It should be noted that this should be
run after prettier as it has been noted that prettier has not always formated as per the SKAO linting standards

To run this to see the current coding issues in the application: 

> yarn lint

Run the following to allow the library to automatically update if possible:

> yarn lint:fix

code-analysis
-------------

To run the analysis tools, execute

> yarn code-analysis

This will display any errors in the command line. If there are any errors, YARN will exit with a non-zero code, 
the -s argument suppresses this and cleans up the output.  This command is also used as part of the CI/CD process,
so it is recommended to run this so that any issues are identified and can be resolved prior to the build

