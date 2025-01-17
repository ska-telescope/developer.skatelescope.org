.. _create-new-project:

********************
Create a new project
********************

The SKA code repositories are all stored on the SKA Gitlab account, on `gitlab.com/ska-telescope <http://gitlab.com/ska-telescope>`_.
The SKA's repositories on Gitlab have to be created by a member of the Systems team.
If you need a repository simply go to the SKAO `System Team Support Center <https://jira.skatelescope.org/servicedesk/customer/portal/166>`_ and raise a ticket to `Create a project in Gitlab <https://jira.skatelescope.org/servicedesk/customer/portal/166/create/1866>`_. Choose the name well (see below).
Respositories will be created with public access by default. Other permissions schemes, such as private and IP protected repositories, are also possible upon request.

You will be given Maintainer privileges on this project. This will make it possible for you to (among other things) add users to the project and edit their permissions. For more information about permissions on Gitlab, go to `https://docs.gitlab.com/ee/user/permissions.html <https://docs.gitlab.com/ee/user/permissions.html>`_.


.. admonition:: On groups in Gitlab

    The SKA Telescope group on Gitlab has two sub-groups, *SKA Developers* and *SKA Reporters*.

    Groups on Gitlab are like directory structures which inherit permissions, and users can be added to these groups with certain permissions. All users in the SKA are added to the main group as Guest users.

    There are some repositories which are IP protected, that may not belong to one or either of the two subgroups. Users that need access to these repositories must be added individually - please ask the System team for assistance.


When creating a new repo there is a number of aspects to be considered.

Mono VS Multi repositories
##########################

One of the first choices when creating a new project is how to split the code into repositories.
In a project such as SKA there is no strict rule that can be applied, and a degree of judgement is
necessary from the developers. Too many repositories create an integration problem and are subject to
difficult dependency management, whereas too few repositories make it more difficult to concurrently
develop and release independent features.
Both scenarios can be approached with the aid of right tooling and processes, but in general
a repository should be created for every software component following this definition:

  *All software and firmware source code handed over to the SKA organisation shall be organised into source code repositories. A source code repository is a set of files and metadata, organized in a directory structure. It is expected that source code repositories map to individual applications or modules according to the following definition: A module is reusable, replaceable with something else that implements the same API, independently deployable, and encapsulates some coherent set of behaviours and responsibilities of the system.*

  -- *adapted from 'Continuous Delivery'*

SKAO advises one repository should only have one deliverable artefact which would mean that a repository may produce single python package/oci image/helm chart consisting of the same functionality. *Note that a repository can still supply different packages targeting different environments but still providing the same functionality on the target platforms*

Naming a repository
###################

Repository names shall clearly map to a particular element of the SKA software architecture,
as described in the SKA software design documentation. That is to say, someone familiar with the
SKA software architecture shuold be able to identify the content of a repository just by its name.

Names shall be all lowercase starting with "ska-" whereas multiple words shall be separated by hyphens.


.. _repository-checklist:

Repository contents
###################

All software repositories shall host whatever is necessary to download and run the code
they contain. This does not only include code, but also documentation, dependencies and
configuration data. Can someone external to the project point at your repository and
have all the means to run your code?
A software repository shall contain:

.. admonition:: Repository Checklist

  * A *LICENSE* file (see :ref:`licensing`)
  * A README.md file containing basic instructions on what the repository contains.
    And how to install, test and run the software
  * A *docs* folder containing RST formatted documentation (see :ref:`document-project`)
  * All application code and dependencies (e.g. libraries, static content etc... )
  * Any script used to create database schemas, application reference data etc...
  * All the environment creation tools and artifacts described in the previous step (e.g.
    Puppet or Ansible playbooks)
  * Any file used to create containers (Dockerfile ... )
  * All supported automated tests and any manual test scripts
  * Any script that supports code packaging, deployment, database migration
    and environment provisioning
  * All project artefacts (deployment procedures, release notes etc.. )
  * All cloud configuration files
  * Any other script or configuration information required to create infrastructure
    that supports multiple services (e.g. enterprise service buses, database management
    systems, DNS zoe files, configuration rules for firewalls, and other networking devices)

  -- *adapted from 'The DevOps Handbook'*


SKA Skeleton Projects
#####################

The SKA Organisation repository contain a number of skeleton projects which are intended to be forked
when starting a new project.
The skeleton projects contain all necessary hooks to documentation, test harness, continuous integration,
already configured according to SKA standards.
