-----------------------
articleLink: https://distributed-computing-musings.com/2025/08/thundering-herd-problem-preventing-the-stampede/
articleTitle: Thundering Herd Problem: Preventing the Stampede &#8211; Distributed Computing Musings
createdOn: 2025-10-14T02:01:15.598Z
updatedOn: 2025-10-14T02:01:15.598Z
-----------------------

- large number of concurrent requests for the same record
  - All requests end up querying the cache at the same time & all of them end up with a cache miss
- solutions:
  - Distributed lock (in redis)
  - In-process synchronization (in app node)