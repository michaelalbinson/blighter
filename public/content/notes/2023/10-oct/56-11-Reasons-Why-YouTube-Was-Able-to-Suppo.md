-----------------------
articleLink: https://newsletter.systemdesign.one/p/youtube-scalability
articleTitle: 11 Reasons Why YouTube Was Able to Support 100 Million Video Views a Day With Only 9 Engineers
createdOn: 2023-10-23T15:44:50.764Z
updatedOn: 2023-10-23T15:44:50.764Z
-----------------------

- scientific approach to scalability - identify and fix bottlenecks
- boring tech stack
- keeping it simple
- choosing your battles
  - outsourced their problems
  - popular videos pushed to a CDN for:
    - low latency
    - high performance
    - high availability
  - thumbnails in bigtable
    - avoids small file problems with file clustering
    - improved performance
    - low latency + multi-level caching
    - easy to provision
- pillars of scalability
  - stateless servers
  - DB replication
  - DB partitioning
- solid engineering team
- caching to avoid repeat calculations of expensive operations
- rank you stuff
  - ranked video-watch traffic over other traffic
- prevent thundering herds
  - used time jitter on cache expirations
- play the long game
  - focus on macro-level algorithms + scalability
  - tolerate imperfection in components
  - trade off efficiency for scalability, e.x.
    - used python over c
    - clear boundaries between components as they scaled - tolerated latency
    - optimized to be fast enough, but didn't obsess on machine efficiency
    - served video from server location based on bandwidth, not latency to customer
- adaptive evolution
  - used RPC instead of REST for improved performance for critical components
  - BSON for data serialization
  - eventual consistency for some parts of the app, e.g. user comments
  - studied python to prevent common pitfalls, relied on profiling
  - customized open-source software
  - optimized DB queries
  - made non-critical real-time tasks async