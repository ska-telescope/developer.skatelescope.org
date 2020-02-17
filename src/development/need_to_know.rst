.. _need_to_know:

Need to Know
============

Before beginning your work with the SKA organisation code ecosystem, it is
highly important to understand some core technologies and tools so that you can
collaborate with your team members and with the other teams in a positive
and productive way.

This page's purpose is not to recreate yet another tutorial and how-to, but
to name these tools and technologies and direct you to one of their tutorials
and their documentation. So, feel free to use a different method to learn about
these tools, but be sure to at least understand their core concepts before
you start contributing to the SKA repositories.

*Bear in mind*: Depending on the specific work carried out by your team, you
might be expected to dominate basic concepts about technologies that are not
addressed in this page (i.e. Kubernetes, Tango, PyTango).

Git
---
`Git project page <https://git-scm.com/>`_

The core technology to collaborate when writing code, is Git.

Core concepts to master:
````````````````````````
- Cloning
- Branching
- Merging

SKA Git Documentation:
``````````````````````
* `Working with git <https://developer.skatelescope.org/en/latest/tools/git.html#working-with-git>`_

Official documentation:
```````````````````````
* `Git Reference <https://git-scm.com/docs>`_
* `Git Book <https://git-scm.com/book/en/v2>`_

Tutorials:
``````````
* `Git Videos <https://git-scm.com/videos>`_

Gitlab
------
`Gitlab project page <https://gitlab.com/>`_

Gitlab is where our code is hosted and provides us - amongst other tools - with
Git hosting and a Continuous Integration platform.

Core concepts to master:
````````````````````````
- Merge Requests
- Issue Creation
- Continuous Integration (CI) and Code Testing

SKA Gitlab Documentation:
`````````````````````````
* `Working with gitlab <https://developer.skatelescope.org/en/latest/tools/git.html#working-with-gitttps://developer.skatelescope.org/en/latest/tools/git.html#working-with-gitlab>`_
* `Continuous integration <https://developer.skatelescope.org/en/latest/tools/continuousintegration.html>`_

Official documentation:
```````````````````````
* `GitLab Docs <https://docs.gitlab.com/ee/>`_

Tutorials:
``````````
* `GitLab Basic Guides <https://docs.gitlab.com/ee/gitlab-basics/>`_
* `GitLab CI <https://www.tutorialspoint.com/gitlab/gitlab_ci_cd.htm>`_

Docker
------
`Docker project page <https://www.docker.com/>`_

Docker containerization is used both in our continuous integration runners
and for local development and deployment.

Core concepts to master:
````````````````````````
- Images
- Image Building
- Containers
- Container Networking
- Container Storage
- Container Logging

Official documentation:
```````````````````````
* `Docker Docs <https://docs.docker.com/>`_

Tutorials:
``````````
* `Docker Tutorial <https://www.tutorialspoint.com/docker/index.htm>`_

GNU Make
--------
`GNU Make project page <https://www.gnu.org/software/make/>`_

GNU Make is used as a set of helper commands for deploying, testing and
launching environments in several of our repositories. These are normally
defined by using `Makefiles` that run in GNU Make.

Core concepts to master:
````````````````````````
- Writing makefiles
- Running makefiles
- Variables

Official documentation:
```````````````````````
* `GNU make manual <https://www.gnu.org/software/make/manual/make.html>`_

Tutorials:
``````````
* `GNU make tutorial <https://www.tutorialspoint.com/makefile/index.htm>`_

Pipenv
------
`Pipenv project page <https://pipenv.kennethreitz.org/en/latest/>`_

Pipenv is used to setup the base environments for many of our tools. It allows
us to deploy consistent versions of a project's python dependencies and to
isolate a python environment.

Core concepts to master:
````````````````````````
- Pipfile
- Package Versioning
- Package Indexes

Official documentation:
```````````````````````
* `Pipenv documentation <https://pipenv.readthedocs.io/en/latest/>`_

Tutorials:
``````````
* `Pipenv Tutorial <https://realpython.com/pipenv-guide/>`_
