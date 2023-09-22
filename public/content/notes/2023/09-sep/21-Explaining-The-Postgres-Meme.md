-----------------------
articleLink: https://www.avestura.dev/blog/explaining-the-postgres-meme
articleTitle: Explaining The Postgres Meme
createdOn: 2023-09-17T20:18:41.498Z
updatedOn: 2023-09-17T20:23:27.978Z
-----------------------

TL;DR: Levels from the meme are explained in sequence from most common/understood to least. 
This is a really helpful deep dive into specific topics of databases (specifically postgres).
This is a long read we should revisit over time.

### Level 0: Sky Zone: CREATE TABLE, JOIN, NULL, ...
- high level concepts everyone has encountered in RDBMS
- data types - postgres has [87 supported types](https://www.postgresql.org/docs/current/datatype.html)
  - use semantic types to simplify data validation and storage
- `CREATE TABLE`
  - part of the data definition language (DDL)
    - DDL includes CREATE, ALTER, and DROP
- `SELECT, INSERT, UPDATE, DELETE`
  - DML - data modification language
  - `table users;` is equiv to `SELECT * FROM users;`
- `ORDER BY`
  - there's no guaranteed ordering of result set without using ORDER BY
- `LIMIT` and `OFFSET`
  - allows you to retrieve specific portions of a table
  - this can be SLOW for pagination - see [KeySet pagination](https://www.avestura.dev/blog/explaining-the-postgres-meme#keyset-pagination)
- `GROUP BY`
  - introduces aggregates - enables us to map rows into groups, tehn reduce the result set to a single value
- `NULL`
  - NULL = undefined value
    - hence why `true = NULL` `false = NULL` and `NULL = NULL`
- Indexes
  - (when used properly) indexes improve data access speed because they prevent sequential table scans
- `JOIN`
  - enables queries across tables
  - also a way to craft relations from a pair of existing ones
    - relation = a set of data having a common set of properties
  - types of join
    - `INNER JOIN` - Only keep the rows that satisfy the join condition for both side of involved relations 
    - `LEFT/RIGHT/FULL OUTER JOIN` - retrieve records from table even for those with no matching value in either left, right, or both side of the relations.
    - Cross join - artesian product of left and right relations, giving all the possible combinations from the left table rows joined with the right table rows
- Foreign keys
  - help to maintain referential integrity of data
  - foreign keys must be `unique` or `primary key`s of the referenced table
- ORMs
  - Object-relational mapping 
    - technique for mapping data to and from relational databases and an object-oriented programming language
  - ORMs bridge OO-world to RDBMS world 

### Level 1: Surface Zone: ACID, outer joins, normal forms, ...
### Level 2: Sunlight Zone: Connection pools, LATERAL Join, Stored Procedures, ...
### Level 3: Twilight Zone: Isolation levels, ZigZag Join, Triggers, ...
### Level 4: Midnight Zone: Denormalization, SELECT FOR UPDATE, star schemas, ...
### Level 5: Abyssal Zone: MATCH PARTIAL foreign keys, null::jsonb IS NULL = false, ...
### Level 6: Hadal Zone: volcano model, join ordering is NP Hard, ...
### Level 7: Pitch Black Zone: NULL, the halloween problem, fsyncgate, ...