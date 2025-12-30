-----------------------
articleLink: https://newsletter.systemdesign.one/p/11-system-design-concepts-explained
articleTitle: 11 System Design Concepts Explained, Simply
createdOn: 2025-10-14T01:47:12.136Z
updatedOn: 2025-10-14T01:47:12.136Z
-----------------------

- Scalability
  - Horizontal scaling: adding more machines/ servers to handle increased load by distributing work across them.
  - Vertical scaling: increasing the power of existing machines/ servers by adding more CPU, RAM, or storage to handle increased load.
- Throughput & Bandwidth
  - Bandwidth refers to the amount of data that can potentially travel through a network within a period
  - Throughput refers to the amount of data that actually transfers during a specified period.
- Concurrency vs. Parallelism
  - Parallelism refers to executing multiple tasks simultaneously across different processor cores or machines.
  - Concurrency means executing multiple tasks simultaneously, either by running them in parallel or by rapidly switching between them on the same processor core
- Consistency, Availability & Partition Tolerance
  - Consistency: The guarantee that a system of all machines connected in a distributed manner sees the same data at the same time.
  - Availability: The degree to which a system remains operational and responsive to requests.
  - Partition Tolerance: The capability of a distributed system to continue operating despite network failures between the connected machines.
- CAP Theorem
  - you can guarantee at most two out of these three properties (consistency, availability, and partition tolerance) 
- PACELC Theorem
  - where there is no network partitioning, the distributed system still faces a trade-off between Latency and Consistency
  - PACELC stands for Partition (P), Availability (A), Consistency (C), Else (E), Latency (L), Consistency (C).
- Latency
  - Latency is the time it takes for a request to go through the system and return a response
- Techniques That Reduce Latency
  - Data replication and keeping copies of data in various regions closer to the users (CDNs)
  - Caching
  - Sharding - data is divided into smaller subsets called shards and distributed across multiple machines/ nodes.
  - Load balancing
- Relational vs. Non-Relational Databases
  - Relational DBs organize data into tables with predefined schemas and use SQL (Structured Query Language) to query them
  - Non-relational DBs store and query data in flexible ways. For example, MongoDB, Redis, and Cassandra.
- Transactions & Their Types
  - ACID Transactions (Atomic, consistent, isolated, durable) - relational DBs do this
  - BASE Transactions (basically available, soft state, eventual consistency) - non-relational DBs do this
- APIs
  - REST
  - SOAP
  - GraphQL



