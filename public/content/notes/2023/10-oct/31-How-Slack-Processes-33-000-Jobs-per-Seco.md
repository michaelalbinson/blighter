-----------------------
articleLink: https://blog.quastor.org/p/slack-processes-33000-jobs-per-second
articleTitle: How Slack Processes 33,000 Jobs per Second
createdOn: 2023-10-15T23:30:40.117Z
updatedOn: 2023-10-15T23:30:40.117Z
-----------------------

### Previous arch
- workflow
  - apps would post jobs to a Redis task queue
  - jobs were assigned to redis hosts based on the job hash
  - pools of workers poll the redis cluster to pick up jobs
  - worker spawns an async task to execute the job
  - job is removed/requeued on redis depending on if it succeeded or failed
- problems
  - Too Little Head-Room
    - redis was running very hot
    - when there was no memory available, no jobs could be enqueued/removed
  - Too Many Connections
    - queue clients had to connect to all redises
    - lots of querying to keep things up to date
  - Can't scale job workers
    - more clients increased poll load on redis
  - poor time complexity
    - redis queue data structure meant dequeuing required O(n) time, instead of O(1)
  - unclear guarantees
    - promises like `exactly_once` and `at-least-once` were hard to keep track of
- solutions
  - replace/augment redis
    - wanted durable storage (e.g. kafka)
  - add new scheduler
    - to manage deliverability guarantees
  - decouple job execution
    - scale up job workers without overloading redis

### New Arch
- Kafkagate - new job scheduler
  - written in Go, exposes HTTP interface to create jobs
  - optimized for latency over durability
- JQRelay
  - Go service to get jobs from Kafka to Redis
  - Kafka topics map to particular redis instance






