-----------------------
articleLink: https://newsletter.systemdesign.one/p/how-to-migrate-a-mysql-database
articleTitle: Tumblr Shares Database Migration Strategy With 60+ Billion Rows
createdOn: 2023-09-21T02:22:50.354Z
updatedOn: 2023-09-21T02:22:50.354Z
-----------------------

- MySQL at Tumblr is 21 TB with >60B relational rows
  - >200 DB servers
- How to Migrate a MySQL Database?
  - command and query responsibility segregation (CQRS) pattern simplified their database migration
  - leader-follower replication topology
  - added a database proxy held persistent connections to the remote database leader
  - migration strategy
    - steps
      - Each data center stored the metadata of database followers, the leader, and the database proxy
      - They migrated the database leader from remote data center A to B
      - An automation tool pointed all followers to the new leader
      - An automation tool pointed the database proxy to the new leader
    - impact: seconds of read-only state
      - write requests were either rejected or buffered for a few seconds
    - improvements?
      - leader-leader replication topology in MySQL could improve write availability during database migration 
        - But this approach introduces the risk of data conflicts
