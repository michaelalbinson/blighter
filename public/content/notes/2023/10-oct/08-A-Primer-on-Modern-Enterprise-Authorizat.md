-----------------------
articleLink: https://authzed.com/blog/authz-primer
articleTitle: A Primer on Modern Enterprise Authorization (AuthZ) Systems
createdOn: 2023-10-05T23:14:29.456Z
updatedOn: 2023-10-05T23:14:29.456Z
-----------------------

TL;DR: intro to enterprise AuthZ, different approaches and Google Zanzibar (SpiceDB)


### What is AuthZ
- AuthC/AuthN = authentication - verifies identity
- AuthZ = authorization - dictates what that identity can do 
  - authZ involves granting or denying access rights to specific resources or actions based on the identity and privileges of the user
- collectively authN and authZ are called Customer Identity and Access Management (CIAM)


### Why AuthZ is an issue
- app logic is tightly coupled with AuthZ
  - often the app scales, but the AuthZ system doesn't
- two key limitations
  - permissions are inflexible - it's hard to introduce RBAC, ABAC, fine-grained authZ (FGA)
  - siloed permissions - app teams build bespoke authZ implementations


### Google's Solution: Google Zanzibar
- requirements
  - rich set of access control policies for both consumer and enterprise applications
  - consistent semantics and developer experience across apps
- ReBAC system - permissions are derived from existence of relationships between objects

### Use-cases driving adoption of Zanzibar
- Product-led growth
  - exposing permissions to end users
- enterprise
  - FGA - control resources down to a granular level - there is a balance to strike here though
  - RBAC: user defined roles/permissions - teams need to empower end-user admins to create roles/assoc. permissions
  - recursive relationships
  - ABAC - support for dynamic caveated access

### What to expect when adopting ReBAC
- separation of app and AuthZ data
  - existing authZ will have to be translated
- SpiceDB has a specific DSL
- cross-functional effort to ensure smooth adoption




