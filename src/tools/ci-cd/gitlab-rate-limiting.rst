.. _gitlab-rate-limiting:

***********************
GitLab Rate Limiting
***********************
This section describes the rate limits that are presently being used as part of the
GitLab CI/CD infrastructure.

Rate limiting is a common technique used to improve the security and durability of a web application. For example, a simple script can make thousands of web requests per second. Whether malicious, apathetic, or just a bug, your application and infrastructure may not be able to cope with the load. This is called Denial-of-service attack. Most cases can be mitigated by limiting the rate of requests from a single IP address.
Most brute-force attacks are similarly mitigated by a rate limit.

When a request is rate limited, GitLab responds with a 429 status code. The client should wait before attempting the request again. There are also informational headers with this response detailed in rate limiting responses.

Below guidelines should be followed as the best practices for ensuring the security of web applications:
1. Number of retries should be limited to 30.
2. Retry delay shuld be limited to 3 seconds.
3. The access token should be ci token in the pipeline by default. The project token can be used which will limit your access to that particular project and will not be able to access other projects.
If project token can not be used somewhere then private token should be used which will be your access token.
