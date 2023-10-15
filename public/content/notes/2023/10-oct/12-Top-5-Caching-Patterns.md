-----------------------
articleLink: https://newsletter.systemdesign.one/p/caching-patterns
articleTitle: Top 5 Caching Patterns
createdOn: 2023-10-09T23:10:21.597Z
updatedOn: 2023-10-09T23:10:21.597Z
-----------------------

TL;DR: Good reference on common caching patterns

### Cache aside
- workflow
  - app reads data from the cache
  - (if cache miss) 
    - app reads data from the database
    - app write data to the cache
  - app returns data to user
- AKA: lazy loading
- advantages
  - Easy implementation
  - Fine control over cache population. Because only frequently accessed data is cached
- disadvantages
  - Higher latency due to many trips
  - Potential data inconsistency if cache hit, but DB is updated without updating the cache
- use cases
  - General purpose caching
  - Read-heavy workloads

### Write through
- workflow
  - Write data to the cache
  - And the cache writes data synchronously to the database
    - note: cache writes to the DB, not the app
- advantages
  - Data consistency
  - Low read latency as the cache contains fresh data
- disadvantages
  - High write latency. Because both cache and database need to be updated
  - Most data in the cache is never read
- use cases
  - low number of writes expected
  - Data freshness is important

### Read Through
- workflow
  - App reads data from the cache
  - (if cache miss)
    - cache reads data from the database
    - cache writes data to itself
  - cache returns data to app
  - app returns data to user
- advantages
  - Low read latency for frequently accessed data
  - Improved read scalability
- disadvantages
  - Potential data inconsistency as the cache might contain stale data
  - High latency on a cache miss
- use cases
  - Read-heavy workloads
  - A high cache miss rate is acceptable

### Write Back
- AKA: write-behind strategy
- workflow
  - app rites data to the cache
  - cache writes data asynchronously to the database
- advantages
  - Low write latency
  - Improved performance as writes to the database get batched
- disadvantages
  - Increased risk of data loss as the cache might fail before writing to the database
  - Complex implementation
- use cases
  - Write-heavy workloads
  - Data durability is not important

### Write around
- workflow
  - app writes data to DB
  - app reads data from cache
  - app reads data from the DB on a cache miss
  - app writes data back to the cache
- advantages
  - reduced risk of data loss
  - reduced cache pollution, cache stores only frequently accessed data
- disadvantages
  - high read latency
  - high cache miss rate
- use cases
  - no data updates expected
  - low number of reads expected