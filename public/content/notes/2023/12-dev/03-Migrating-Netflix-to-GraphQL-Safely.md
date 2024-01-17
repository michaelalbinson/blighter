-----------------------
articleLink: https://netflixtechblog.com/migrating-netflix-to-graphql-safely-8e1e4d4f1e72?source=rss----2615bd06b42e---4
articleTitle: Migrating Netflix to GraphQL Safely
createdOn: 2023-12-08T00:10:32.066Z
updatedOn: 2023-12-08T00:10:32.066Z
-----------------------

- Before GraphQL: Monolithic Falcor API implemented and maintained by the API Team
- phase 1: create a graphql shim service over existing monolith API
- phase 2: deprecate shim and legacy API in favor of graphql services owned by domain teams
- testing strategies
  - functional vs non-functional requirements (test overall behavior)
  - idempotentcy (use replay testing) 
  - tool: AB testing
  - tool: replay testing
    - do not replay test Personally Identifiable Information
  - tool: sticky canaries