Git
---



Branching policy
================

Albeit the SKA organisation does not want to be prescriptive about workflows,
two concepts are important to the SKA way of using GIT.
The master branch of a repository shall always be stable, and branches shall be
short lived, merging often into master.

Stable means that the master branch shall always compile and build correctly,
and executing automated tests with success. Every time a master branch results
in a condition of instability, reverting to a condition of stability shall have
the precedence over any other activity on the repository.

We suggest to adopt a story-based branching model, often referred to as
**feature branching**.

.. todo::
  - tutorial pointers
  - master policy
  - suggested workflow

Github
------
