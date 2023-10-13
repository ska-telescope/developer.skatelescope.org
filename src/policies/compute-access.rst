**************************
SKAO Compute Access Policy
**************************

This policy is to be read in conjuction with the SKAO `Access Control and Physical Security Policy <https://intranet.skao.int/display/POL/Information+Security+Management+System+%28ISMS%29+Policies?preview=/7995544/9797797/SKA-GOV-0000016_03_POL_ISMSAccessControlAndPhysicalSecurityPolicySigned.pdf>`__. Authentication systems implemented to provide access to compute resources should adhere to the Access Control Policy.
Note that this document is only accessible to SKAO staff and contractors.

Principles
##########

* Developers, operators, maintainers have the access they need to do their jobs, with the greatest ease that is compatible with good computer security.

  * This means that while having direct ssh access (for example) might make some parts of their jobs easier, this would not be widely granted, in order to ensure the integrity of the operational system. If access is granted, it should where possible follow a session-based approach with auditing capabilities to minimise risk.

* Authorisation is as local as possible; authorisation for the highest levels of access (where it's possible to do the most damage) must come from a senior member of SKAO staff, not a contractor or associate. Suitable authorisers are suggested below.

Systems covered
###############

This policy applies to the ITFs and the AA0.5 compute platforms.

Access needs and authorisers
############################

In all cases, access can only be granted to people who already have an SKAO Confluence account (i.e. to people who are contractors, SKAO associates, or SKAO staff members), so they already have an identity within our systems.
Access must be requested through the `SKAO External helpdesk <https://jira.skatelescope.org/servicedesk/customer/portal/34>`__.

Bare metal ssh access to the hardware in the facilities should *not* be given out lightly.
It is required that everyone on the #! team has this access; the SKAO Quality Engineer requires it; and the in-country Platform and Storage engineers will require it once appointed.

This exceedingly high level of access can be authorised by the SRE managers, Heads of IT and Computing (including the HQ Head of IT), plus at least one person from the group consisting of the Quality Engineer, #! Scrum Master, #! Product Owner (#!, also known as Team BANG! are responsible for maintaining the compute platform). 
For authorisation of one of the aforementioned people, we would require authorisation from someone in a peer role (e.g. another SRE Manager) or above (e.g. a Head of IT can authorise an SRE manager).

VPN access to the ITF can be authorised by members of the IT team, ITF managers, plus one of the team members of Viola or Atlas, for the Australian and South African ITFs respectively.

If someone were found to have abused their access, then removal of their permissions must be requested, and reviewed and (if appropriate) authorised by any of the ITF Manager, the SRE Manager, or the Heads of IT and Computing. 
Any reason for so doing must be documented as part of the removal process.
This is separate from any other processes that might need to be invoked under our Code of Conduct or contracting process.
Once approved, the individual's access must be revoked.
This does not cover any revocation of access required to address an attack by a malicious actor, where access may need to be revoked immediately.
Any such revocation should be documented.

Some examples of how people can abuse their access by:

* not obeying the requests of the relevant AIV team to stop their activities on the ITF
* significantly damaging a service or platform
* materially degrading systems integrity and security (for example, turning off MFA or similar)

This list is not exhaustive; it is only indicative, and should be read in conjuction with `SKAO's own acceptable use policies <https://ska-aw.bentley.com/SKAProd/Search/QuickLink.aspx?n=SKA-GOV-0000014&t=3&d=Main%5ceB_PROD&sc=Global&r=04&i=view>`__ and those of `JANET <https://community.ja.net/library/acceptable-use-policy>`__.

Roles and Access
################

The user groups here are listed for the Mid ITF; the Low ITF will have the same groups.
For user roles, the group name should be prefixed with either mid- or low-, so low-user, mid-k8suser, and if necessary, the facility, so mid-itf-user, low-aa05-dbadmin.
The sysadmin and switchadmin groups are very likely to be shared across telescopes, to allow for eventual follow-the-sun-support.

We expect to use the same group types for AA0.5 and subsequent production environments; however, the group membership will differ.
We expect to grant access sparingly to the production systems, in order to maintain their integrity.
We would also expect to configure our tools differently, so that access tokens are much shorter-lived, and audit logs scrutinised more frequently.

========= ======== ====================== ================================================================================================================================
Telescope Facility group name              access level  
Mid       ITF      sysadmin                ssh access to all hosts on a defined subnet, plus admin access to any OpenStack installation.
Mid       ITF      switchadmin-<subgroup>  ssh access to switches; access to routing tables. The use of the <subgroup> allows definition of a group that has access to a subset of switches within an environment, so that, for example in the ITF, the P4 switches can be configured by the relevant team, but that team cannot access the other switches in the ITF. The subgroup name here should be a team name, or a name reflecting the PBS component which they are administering.
Mid       ITF      dbadmin                 admin access to database management consoles, but not the underlying host.
Mid       ITF      k8sadmin                can use kubectl (and other tools) to administer the cluster (fix access to storage etc.)
Mid       ITF      k8suser-<namespace>     can get kubeconfig to allow debugging of container issues. May be able to use kubectl for limited purposes. Permissions will usually be granted for a limited set of namespaces; the access list should be managed by the #! team, and the set of namespaces needed can be determined in conjunction with the relevant software AIV team. *Note:* This role will not exist for production environments.
Mid       ITF      user                    access to VPN and to services exposed on the relevant subnets e.g. BinderHub, Taranta dashboards.
========= ======== ====================== ================================================================================================================================

Anyone with an SKAO Confluence account can access logs and basic compute cluster performance data through the Kibana and Grafana services already provided, so there is no need to define a group for such access, which is automatically provided.

We expect at least one person (preferably two) to have sysadmin and switchadmin access.
We expect at least one person in each host country to have k8sadmin rights, to allow for swift resolution of issues.
We expect all of the software AIV teams to have user access to the ITF, and probably k8suser access as well.

User access to the ITFs will usually be granted to members of dev teams, ART and Solution management (to allow for demos and similar).
It may also be appropriate to grant this to SciOps and Ops members as well.
However, the AIV teams, and ultimately the relevant ITF manager, set the ground rules about using the ITF resources, and can request for users' access to be suspended temporarily if needed.

User access to AA0.5 will be provided to those who have the telescope operator role, which during commissioning we expect to include people from AIV, Sci Ops and Ops. 
Greater access levels will be granted sparingly.
These roles and groups may require some revision as we learn from the process of commissioning and running AA0.5.
