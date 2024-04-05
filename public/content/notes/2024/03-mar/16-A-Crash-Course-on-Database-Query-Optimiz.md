-----------------------
articleLink: https://www.swequiz.com/learn/query-optimization-basics-relational-databases
articleTitle: A Crash Course on Database Query Optimization Basics - SWE Quiz
createdOn: 2024-03-12T02:49:14.526Z
updatedOn: 2024-03-12T02:49:14.526Z
-----------------------

- index creation and management
  - indices help locate data without scanning the whole table
  - types: primary key, unique indices, composite indices
    - pick the right one based on table structure/query patterns
  - best practices
    - indices speed up querying, but slow down inserts/deletes/updates
    - must balance read vs write perf costs
- analyzing and utilizing query execution plans
  - generating execution plans - most engines will generate a step-by-step process of how the query will be run
  - reading execution plans - they help identify bottlenecks like table scans and inefficient joins
    - scan operations
    - join method
    - use of indices
  - optimize base on execution plan
    - address bottlenecks
      - create indices
      - revise joins
    - implement changes and re-evaluate
      - make changes and run the query again - get query plan
- understand the database engine
  - engine specific features
    - mysql
      - supports multiple storage engines optimized for different use cases
      - efficient B-tree indexes - good for searching text data in large datasets
    - postresql
      - advanced index types apart from B-trees, including
        - generalized inverted index (GIN)
        - Generalized search tree (GiST)
      - concurrency control - MVCC allows efficient handling of concurrent data ops
  - configuration settings
    - memory allocation
      - too little leads to frequent (slow) disk I/O
      - each engine has parameters that control memory usage
    - cache settings
      - dbs use caches to store frequently accessed data in memory
      - configuring cache size can affect performance, especially in read heavy applications
    - query execution parameters
      - e.g. query timeouts, max packet size, join algorithms
      - dbs offer settings to tweak memory available for sorts/joins/cache size
    - logging + checkpointing
      - adjusting freq and granularity of logging can impact performance
      - transaction log backups can affect database write performance
  - Writing Efficient Queries
    - Avoid Selecting Unnecessary Data
    - Use Joins Effectively - understand different types
      - Sometimes, restructuring a query or breaking it into subqueries can yield better performance
    - Aggregate Functions and Grouping - use wisely, misuse can be expensive













