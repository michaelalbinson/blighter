-----------------------
articleLink: https://authzed.com/blog/what-is-google-zanzibar
articleTitle: Understanding Google Zanzibar: A Comprehensive Overview
createdOn: 2023-09-29T07:56:08.965Z
updatedOn: 2023-09-29T07:56:08.965Z
-----------------------

### Why is Google Zanzibar Necessary?
- reduced the amount of code duplication + version skew
- common backend for permissions checks
- permission system expectations
  - first: correct - all authZ'd users should be able to interact with protected resources
  - if using one permissions system for everything, should reasonably allow you to model primitives in your apps
    - make it flexible enough to handle different permission models
  - failure to receive an affirmative permissions check success must be interpreted as a deny
  - must scale to millions of authorization requests per second across billions of users and trillions of objects

### What is Google Zanzibar to the Developer?
- from the developer’s perspective, it's an API
  - centrally stores information about subjects and objects
- uses a directed graph at core to model relationships between users, entities and resources
  - access checks in this model are graph traversal problems
- "relationship rewrites" mechanism reinterprets certain edges/relations in the graph
  - essentially normalizing relationships to simplify computation
  - e.x. readers of the folder in which a document is nested should also be considered readers of the document
- other APIs allow querying graph data directly for building UIs to describe the relationships
- "Zookies" - allow dev to set lower bound of staleness permitted for data
  - by allowing slightly stale data in common permission checks, perf can be drastically improved
  - you can force Zanzibar to use more recent data by explicitly stating it

### How is Google Zanzibar Implemented?
- Zanzibar needs to be fast
  - 50th percentile (3ms), 99th percentile 20ms @ 12.4M peak permissions checks/sec
- scale handled by horizontal scaling + global distribution of clusters of Zanzibar
- Spanner is used to manage global data distribution
- read latencies ~8.7ms @median, std deviation 376ms
- caching is key - layers:
  - service layer - recently cached results are returned directly, but cache hit rate is relatively low
    - "consistent hash" (kinda like sticky sessions, but for hashing the permissions request itself) are used to improve hit rates
    - allows duplicate requests to be combined and value only calculated once
  - google specific denormalization: 
    - Leopard: an in-memory transitive closure of all groups that are subgroups of a higher level group (group denormalization and cache in memory)
      - run as a separate service
      - uses the watch API to be notified of changes to underlying system
  - request hedging: if requests to spanner (DB) or Leopard are taking too long, it sends the same request request to another service of the same type to reduce tail latency
    - MA: ideally that other service has lower latency but... something something thundering herd





