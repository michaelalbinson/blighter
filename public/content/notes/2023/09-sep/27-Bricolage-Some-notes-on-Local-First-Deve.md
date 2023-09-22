-----------------------
articleLink: https://bricolage.io/some-notes-on-local-first-development/
articleTitle: Bricolage | Some notes on Local-First Development
createdOn: 2023-09-21T00:01:21.260Z
updatedOn: 2023-09-21T18:01:43.743Z
-----------------------

- local-first development = apps that can survive while not connected to the internet/their home server
- advantages of local-first:
  - Simplified state management for developers
  - Built-in support for real-time sync, offline usage, and multiplayer collaborative features
  - Faster CRUD
  - More robust applications for end-users
- why is this happening now?
  - standard REST and GraphQL APIs are easy to get started with for solving client/server sync
    - but they require significant effort and skill to scale
    - they struggle with use-cases like multiplayer and offline support
- will most client apps go local first?
  - 🤷‍♂️
- problems needing to be solved
  - CRUD with CRDT-based Sync Engines
    - sync engines need robust support for fine-grained access control and complex write validation
    - reads are easy, complex writes are still immature in local-first tooling
      - currently business logic lives on the server behind an API
        - we need somewhere to put them in a local-first world
  - Using a Distributed State Machine to Handle Complex Writes
    - suggestion: emulate API request/response patterns through a distributed state machine running on a replicated object
  - Local-First DX is Still Being Explored
    - do advantages make arch worth learning
    - what does the toolchain look like
    - how complex is it to bootstrap an app
    - is the demand there?
- What Approaches are People Exploring Now?
  - Replicated Data Structures
    - replicated data structures rely on CRDT algorithms to merge concurrent and offline edits from multiple clients
  - Replicated Database Tables
    - sync from Postgres to a client db (generally SQLite)
      - pick tables (or db views) to sync to the client
      - they get loaded along with real-time updates as writes land in Postgres
  - Replication as a Protocol
- So...Should You Go Local-First?
  - depends on your use case and risk tolerance
  - for real-time use cases - choose replicated data structures over raw web sockets
  - for multiplayer and offline, pick an open source replicated data structure or hosted service


- https://github.com/electric-sql/electric seems to be an interesting framework in this vein