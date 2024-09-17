-----------------------
articleLink: https://rakyll.medium.com/things-i-wished-more-developers-knew-about-databases-2d0178464f78
articleTitle: Things I Wished More Developers Knew About Databases | by Jaana Dogan | Medium
createdOn: 2024-09-11T20:50:30.447Z
updatedOn: 2024-09-11T20:50:30.447Z
-----------------------

- You are lucky if 99.999% of the time network is not a problem.
- ACID has many meanings.
  - atomicity, consistency, isolation, durability.
- Each database has different consistency and isolation capabilities.
- Optimistic locking is an option when you can’t hold a lock.
- There are anomalies other than dirty reads and data loss.
- My database and I don’t always agree on ordering.
- Application-level sharding can live outside the application.
- AUTOINCREMENT’ing can be harmful.
- Stale data can be useful and lock-free.
- Clock skews happen between any clock sources.
- Latency has many meanings.
- Evaluate performance requirements per transaction.
- Nested transactions can be harmful.
- Transactions shouldn’t maintain application state.
- Query planners can tell a lot about databases.
- Online migrations are complex but possible.
- Significant database growth introduces unpredictability.