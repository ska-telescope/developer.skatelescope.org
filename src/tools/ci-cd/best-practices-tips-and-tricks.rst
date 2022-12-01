.. _best-practices-tips-and-tricks:

*******************************
Best Practices, Tips and Tricks
*******************************
This section describes the best practices tips and tricks that should be followed as part of the
GitLab CI/CD infrastructure.

GitLab Rate Limiting
--------------------
Rate limiting is a common technique used to improve the security and durability of a web application. For example, a simple script can make thousands of web requests per second. Whether malicious, apathetic, or just a bug, your application and infrastructure may not be able to cope with the load. This is called Denial-of-service attack. Most cases can be mitigated by limiting the rate of requests from a single IP address.
Most brute-force attacks are similarly mitigated by a rate limit.

GitLab is using rate limiting to address above issues. For GitLab.com, please see `GitLab.com-specific rate limits <https://docs.gitlab.com/ee/user/gitlab_com/index.html#gitlabcom-specific-rate-limits>`__.

When a request is rate limited, GitLab responds with a 429 status code. The client should wait before attempting the request again. There are also informational headers with this response detailed in rate limiting responses.

Below guidelines should be followed as the best practices for ensuring the security of web applications:

1. Number of retries should be limited to 30.

2. Retry delay (the time between each retry attempt) should be limited to 3 seconds.

3. The access token should be ci token in the pipeline by default. The project token can be used which will limit your access to that particular project and will not be able to access other projects.

If project token can not be used somewhere then private token should be used which will be your access token.
The ci token can be found in the pipeline by default.

For more details on CI/CD job token, please see `GitLab CI/CD Job Tokens <https://docs.gitlab.com/ee/api/README.html#gitlab-cicd-job-token>`__.

The project access tokens can be found at : https://gitlab.com/ska-telescope/<project_name>/-/settings/access_tokens. For example for developer portal project, project access tokens can be found at : https://gitlab.com/ska-telescope/developer.skatelescope.org/-/settings/access_tokens

For more details on Project Access Tokens, please see `Project Access Tokens <https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html>`__.

The private token can be found at https://gitlab.com/-/profile/personal_access_tokens

For more details on Personal Access Tokens, please see `Personal Access Tokens <https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html>`__.

Example request :

.. code-block:: bash

    repository=https://gitlab.com/api/v4/projects/<project_id>/repository/files \
    curl --retry 30 --retry-delay 3 \
    --header "PRIVATE-TOKEN: <your_access_token>" \
    "${repository}/path%2Fto%2Ffile.something/raw?ref=<branch_name>"


GitLab CI/CD Pipeline Images
----------------------------

You can use the following images: 

* ``SKA_K8S_TOOLS_BUILD_DEPLOY`` (``artefact.skao.int/ska-cicd-k8s-tools-build-deploy:x.x.x``): group-level variable for building and publishing SKAO artefacts (OCI images, packaging and publishing python, ansible, helm ) and deploying  and running python/k8s tests. 
* ``SKA_K8S_TOOLS_BUILD_DEPLOY_ALPINE`` (``artefact.skao.int/ska-cicd-k8s-tools-build-deploy-alpine:x.x.x``): Same as the above image but uses an Alpine image as its base for a faster and less sized image.

See more about pipeline variables in :ref:`tools/ci-cd/gitlab-variables:Variables Description`.
