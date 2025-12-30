-----------------------
articleLink: https://www.seangoedecke.com/good-system-design
articleTitle: Everything I know about good system design
createdOn: 2025-10-14T00:09:29.706Z
updatedOn: 2025-10-14T00:09:29.706Z
-----------------------

- Recognizing good design
  - it tends to look underwhelming - nothing going wrong in a long time
  - a complex system _usually_ reflects an absence of good design
- State and statelessness
  - the hard part about software design is state
  - tricky decisions to make about how you save, store and serve it
  - try and minimize the amount of stateful components in any system because stateful components can get into a bad state
  - in practice - have one service that knows about the state and other services that do stateless things
- Databases
  - the most important component is usually where that state lives: the database
  - Schemas and indexes
    - Schema design should be flexible
    - aim to have tables be human-readable
    - if you expect your table to ever be more than a few rows, you should put indexes on it. 
    - make your indexes match the most common queries you’re sending
  - Bottlenecks
    - the database is often the bottleneck in high-traffic applications
    - complex applications need to make a lot of database calls - often sequentially
    - if you need data from multiple tables, JOIN them instead of making separate queries and stitching them together in-memory
    - if you’re using an ORM, beware accidentally making queries in an inner loop
    - there are sometimes queries that were ugly enough that it is easier on the database to split them up
    - Send as many read queries as you can to database replicas
    - typically - one write node and a bunch of read-replicas
    - Beware spikes of queries
    - Once a database gets overloaded, it gets slow, which makes it more overloaded
    - Transactions and writes are good at overloading databases
- Slow operations, fast operations
  - a user is interacting with something (say, an API or a web page), they should see a response within a few hundred ms
  - splitting out the minimum amount of work needed to do something useful for the user and doing the rest of the work in the background
  - background job systems
  - use a DB-backed cache for long-term queues
- Caching
  - easiest to cache in-memory
  - can also use a fast external key-value store like Redis or Memcached is also popular - good for cross-app node sharing
  - A cache is a source of state - so cache sparingly
  - useful caching trick to have in the toolbox is using a scheduled job and a document storage like S3 or Azure Blob Storage as a large-scale persistent cache
- Events
  - Kafka is a common event hub (e.g. queue)
  - don't overuse events - often API requests are simpler and better
- Pushing and pulling
  - simplest is pulling - users come to you to ask for data
  - problem here is that users might do a lot of pulling down the same data
  - pushing - let users register as clients, and then when the data changes, the server pushes the data down
- Hot paths
  - mainly focus on the “hot paths”: the part of the system that is most critically important (and handles the most data)
- Logging and metrics
  - log aggressively during unhappy paths
  - basic observability into the operational parts of the system, e.g. PU/memory on the hosts or containers, queue sizes, average time per-request or per-job, etc
  - time per-request, you also need to watch the p95 and p99 (i.e. how slow your slowest requests are)
- Killswitches, retries, and failing gracefully
  - think carefully about what happens when the system fails badly
  - Retries are not a magic bullet
  - put high-volume API calls inside a “circuit breaker”: if you get too many 5xx responses in a row, stop sending requests for a while to let the service recover
  - classic solution to this is to use an “idempotency key”, which is a special UUID in the request that the other service uses to avoid re-running old requests
  - Whether you should fail open or closed depends on the specific feature.











