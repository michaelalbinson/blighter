-----------------------
articleLink: https://engineering.atspotify.com/2023/06/experimenting-at-scale-the-spotify-home-way/
articleTitle: Experimenting at Scale, the Spotify Home Way
createdOn: 2023-12-08T00:10:15.814Z
updatedOn: 2023-12-08T00:10:15.814Z
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