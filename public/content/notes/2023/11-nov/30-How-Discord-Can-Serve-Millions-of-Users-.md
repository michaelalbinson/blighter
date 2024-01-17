-----------------------
articleLink: https://blog.quastor.org/p/discord-can-serve-millions-users-single-server
articleTitle: How Discord Can Serve Millions of Users From a Single Server
createdOn: 2023-11-16T16:25:03.938Z
updatedOn: 2023-11-16T16:25:03.938Z
-----------------------

- beam (erlang virtual machine)
  - design goals
    - robust -> high availability
    - concurrent processes
    - easy to update to avoid downtime (hot-swapping)
  - concurrency and beam
    - beam provides lightweight threads for writing concurrent code (called beam processes)
    - features
      - independence - each process manages it's own memory, with its own garbage collector
      - lightweight - quick to spin up so it can run massively in parallel
      - communication - pass messages between processes to avoid dealing w/ locks/race conditions between processes
- elixir
  - functional language that is compatible with the erlang ecosystem
  - ruby inspired syntax
- using elixir as a fanout system (getting messages out to millions of user)
  - engineers have a single beam/elixir process per discord guild as the central routing point
    - another process for each connected user's client
  - connected user process notifies central process, which notifies other relevant connected clients
- performance optimization/profiling
  - wall time analysis of operations (flamegraphs)
  - process heap memory analysis
    - identified high memory tasks/operations to eliminate/refactor them
  - ignoring passive sessions
    - split users into active and passive members
    - passive members aren't updated until they're active again
  - splitting fanout across multiple processes
    - for larger guilds, introduce relay processes to ease load on the central process
    - e.g. guild process -> relay process -> connected client process
