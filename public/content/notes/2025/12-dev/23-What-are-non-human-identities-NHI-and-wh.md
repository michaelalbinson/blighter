-----------------------
articleLink: https://www.hashicorp.com/en/blog/what-are-non-human-identities-nhi-and-who-owns-their-security
articleTitle: What are non-human identities (NHI) and who owns their security?
createdOn: 2025-12-30T09:07:44.247Z
updatedOn: 2025-12-30T09:07:44.247Z
-----------------------

- NHIs are machine and organizational identities
  - Machine identities include device IDs (such as desktop, mobile, and IoT devices) and workload identities (for containers, services, VMs, and applications).
- Why are non-human identities hard to secure?
  - because there are a lot of them running in many systems - they can easily outnumber human users
  - you need a different playbook that prioritizes automation and central enforcement for NHIs en-masse
- Handling NHIs through secrets management
- Who owns NHIs?
  - e.g. Who's been managing the cloud IAM roles for your microservices? 
- What needs to happen: A platform and security-led approach
  - Identity teams need to think like product managers
  - Platform teams need to think like security architects
    - that workload needs network access, but does it need admin privileges on the entire cluster? Probably not.
  - Both teams need to obsess over developer experience
- What’s needed to reduce risks associated with NHIs?
  - Central least-privileged policy, automatically enforced
  - Optimized developer experience - if tools and workflows are clunky and cumbersome, they’ll go around you
  - Lifecycle management - monitor risk and make sure access is rotated, revoked, or newly generated based on policy