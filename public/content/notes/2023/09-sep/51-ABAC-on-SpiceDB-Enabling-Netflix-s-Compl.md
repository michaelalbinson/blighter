-----------------------
articleLink: https://netflixtechblog.com/abac-on-spicedb-enabling-netflixs-complex-identity-types-c118f374fa89?source=rss----2615bd06b42e---4
articleTitle: ABAC on SpiceDB: Enabling Netflix’s Complex Identity Types
createdOn: 2023-09-25T17:59:04.450Z
updatedOn: 2023-09-25T17:59:04.450Z
-----------------------

- Netflix needed attribute support in SpiceDB to support core Netflix application identity constructs
- Why did Netflix Want Caveated Relationships?
  - app identities are fundamentally attribute based
- Netflix Modeling Challenges Before Caveats
  - SpiceDB is ReBAC (relationship-based-access-control) out of the box
  - ran into difficulties fitting their existing policy model into relations
  - Netflix’s design required:
    - event based mechanism that could ingest information about application autoscaling groups
    - Ingest the attributes describing the autoscaling group and write them as separate relations
    - At authZ check time, provide the attributes for the identity to check
    - A cleanup process to prune stale relationships
  - Problems with this design?
    - it wasn’t resilient to an absence of relationship data
    - Netflix would have to write and prune the relationship state with significant freshness requirements
  - proposed: caveated relationships to solve this
- Building SpiceDB Caveats
  - intro to SpiceDB
    - relationships are stored as relationships that represent a graph within a datastore
    - SpiceDB walks the graph and decomposes it into subproblems
  - SpiceDB Caveats Design
    - fundamental challenge with policies is input arguments can change the authorization result
    - adding input arguments isn't efficient, since they can't be cached
      - what if you keep those inputs out of the cached subproblems
      - add them as a variable instead
    - primary design choices
      - Caveats defined at the Relation-level, not the Permission-level
      - Keep Caveats in line with SpiceDB Schema’s type-safe nature
      - Support well-typed values provided by the caller
      - Use Google’s CEL to define Caveat expressions
      - Introduce a new result type: CAVEATED
  - How do SpiceDB Caveats Change Authorizing Netflix Identities?