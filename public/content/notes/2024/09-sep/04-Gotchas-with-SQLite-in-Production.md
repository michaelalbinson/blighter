-----------------------
articleLink: https://blog.pecar.me/sqlite-prod
articleTitle: Gotchas with SQLite in Production
createdOn: 2024-09-11T20:09:41.527Z
updatedOn: 2024-09-11T20:09:41.527Z
-----------------------

- configuration
  - out of box sqlite isn't configured for multi-threaded access
- no connections over the network
- network and ephemeral file systems
  - network file systems don't have the lock-level guarantees needed for ACID
  - changes are lost in emphemeral file systems (e.g. AWS lambda etc)
- concurrency
  - sqlite limits writes to one thread at a time
  - could split tables across dbs to reduce bottleneck, but at that point consider postgres
- transactions
  - only one read-write transaction per db, many read transactions
  - only start transactions when you need to write something
- backups
  - use `VACUUM INTO` to create full backups - copy/paste of sqlite file doesn't give everything
  - postgres/mysql are more fully featured here
- migrations
  - only limited support for `ALTER TABLE` statement
- major pros/cons
  - sqlite has lower operational complexity
  - if running on a single machine to set/forget, no better choice