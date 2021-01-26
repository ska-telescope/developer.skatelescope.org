.. _codeguides:


********************************
SKA Javascript Coding Guidelines
********************************

Prerequisites:
==============

As a javascript developer you will need the following:

* An account on gitlab
* Access to the SKA gitlab account (https://gitlab.com/ska-telescope)
* Access to git (e.g. Git Bash if on Windows environment (https://gitforwindows.org/)
* Access to node and the node package manager (npm)

Setting up a new web project
============================

Each new web project should start by creating a new SKA gitlab project as a fork of the 
ska-telescope/ska-react-webapp-skeleton project.  

* The readme file will need updated to reflect the nature of the new web project

Conventions
===========

JavaScript has many code style guides. For the SKA Projects we have settled 
on the `AirBnB JavaScript Style Guide`_. Any differences to what is presented by AirBnB 
should be documented here:

.. _`AirBnB JavaScript Style Guide`: https://github.com/airbnb/javascript/

As a developer it is worth familiarizing yourself with the AirBnB guide above, and some of the background 
reading that they suggest.


File Suffixes
----------------

* Use .jsx for any file which contains JSX, otherwise use .js
* Test files should be prefixed .test.{js|jsx}

Code structure
--------------

Within each project code should be grouped by features or routes. This is based on the React  
guidance at  https://reactjs.org/docs/faq-structure.html

Locate CSS, JS, and tests together inside folders grouped by feature or route. 

|    components/
|        ├── App/
|        │   ├── App.css
|        │   ├── App.jsx
|        │   └── App.test.jsx
|        └── NavBar/
|            ├── NavBar.css
|            ├── NavBar.jsx
|            └── NavBar.test.jsx

The definition of a “feature” is not universal, and it is up to you to choose the granularity. If you can’t come up with a list of top-level folders, you can ask the users of your product what major parts it consists of, and use their mental model as a blueprint.


Linting 
=======
The react web skeleton project comes with ESLint and Prettier support already configured to
support the AirBnB style guide rules.  
We suggest that whenever possible you verify your code style and patterns in your editor as you code. 

Instructions for how to install plugins to support this do this for Visual Studio (VS Code) 
and JetBrains (WebStorm, IntelliJ IDEA etc.) are include in the ska-react-webapp-skeleton readme_ file.

.. _readme: https://gitlab.com/ska-telescope/ska-react-webapp-skeleton

Dependencies
============

* The use  of node and npm is assumed for package management. 
  All packages and dependencies required to build and run the code should be defined in the ``package.json.``
  for the project.
* Avoid relying on any the installation of any global packages to run or build the code. 
* Take care to differentiate between dependencies and devDependencies when installing packages. The ‘dependencies’ section should only include the dependencies required to run the code. The devDependencies should be used for any packages required to build, test or to deploy the code. 
* Only install packages for a reason. Adding any new third party dependency should be a team decision, and preferably discussed with the system team.
* Remove unused packages 
* Prefer popular packages. Sites such as  https://www.npmjs.com/search and https://npms.io can be used to get an analysed ranking, as well as checking out the number of stars on gitlab.
* Prefer packages with a good coverage of working tests provided
* Any 3rd party packages used should be compatible with the SKA BSD-3  Licence terms. 

When developing packages and modules either for your own project or for sharing with other SKA javascript teams.

* Prefer smaller modules with a coherent closely related purpose
* Prefer files with a single named export where possible
* Ensure all imports use the same names for exports as used in the file where the export is defined.
* Avoid default exports or imports. 

Named exports (and using the same names consistently throughout the code) make life easier 
for anyone using your code. 

Having a name makes it possible for IDEs to find and import dependencies for you automatically. 
For a good perspective on this read:
https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/


Documentation and Testing
=========================

* All external interfaces should be fully documented. 

* All code should be well commented. As a minimum any method used outside the file in 
  which it is written should be documented following standard JSDoc conventions.

* Working unit tests should exist for as much code as possible. At a minimum all code 
  developed or modified within the SKA Project should have working tests (see the definition
  of done above. We are currently aiming at +75% code coverage for all web projects.


Data and Configuration Files
============================

* Use proxies and relative paths where possible. Avoid hard coded URLs.  
  Any explicit paths should be derived from a consistent configuration source. 
  (See for example https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually

Console output, warnings and errors
===================================

* Use the debugger rather than console statements. 

* Remove all console statements when done. Production code should not contain any console statements.
