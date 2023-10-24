-----------------------
articleLink: https://newsletter.systemdesign.one/p/scalable-software-architecture
articleTitle: How LinkedIn Scaled to 930 Million Users
createdOn: 2023-10-18T20:45:34.818Z
updatedOn: 2023-10-18T20:45:34.818Z
-----------------------

- at the beginning: a monolith
- split out an in-memory graph service to manage connections between users efficiently
  - communicated with the app server via RPC
- scaling the DB
  - scaled vertically, then moved to a leader-follower DB strategy, using the follower for reads
  - then partitioned the DB to scale writes
- service-oriented architecture
  - eventually broke monolith into services
    - frontend service - presentation logic
    - mid-tier service - API access to DB models
    - backend service - DB access
- caching
  - utilized precomputation, CDNs and browser cache
- Birth of kafka
  - created to stream data to their data warehouse
- scaling eng teams
  - paused feature dev for a period to just improve tooling, deployment, infra and productivity'
- Rest.li framework
  - used framework to simplify intra-service API calls with JSON responses
- "Super blocks" - groups of services to create a single-access API
- Multi-Datacenter for high availability
- Ditched JSON for protobuf