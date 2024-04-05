-----------------------
articleLink: https://newsletter.systemdesign.one/p/amazon-dynamo-architecture
articleTitle: How Amazon Scaled E-commerce Shopping Cart Data Infrastructure
createdOn: 2024-04-01T17:45:28.986Z
updatedOn: 2024-04-01T17:45:28.986Z
-----------------------

TL;DR: Amazon Dynamo architecture

- Partitioning Data
  - partitioned the data to solve the write scalability
  - hash the data keys and do modulo-operation on the result against the number of servers
    - won't scale while adding or removing servers
  - they use consistent hashing to solve this problem
    - treats the output range of the hash function as a ring
    - a server is responsible for data that falls in the region between it and its predecessor server on the hash ring
    - data movement is low when a new server gets added to the ring
    - Virtual nodes - a server position in the hash ring doesn’t map only to a single physical server. Instead it could contain many physical servers
- Ensuring Data Durability
  - replicate data asynchronously across N number of servers for durability
  - sloppy quorum consistency
    - At least a single server will have the latest data using sloppy quorum.
    - Consider the system consistent if it satisfies the equation: R+W > N.
      - N = # servers
      - R = read quorum - # of servers that must reply to consider a read successful
      - W = write quorum - # of servers that must reply to consider a write successful
- Resolving Data Conflicts
  - use vector clocks to find data version history and merge them during reads
  - Each server maintains a vector of integers and the integers start at zero
    - The server increments its integer whenever an event gets sent
    - receiver finds the maximum between its integer and the received value
    - event A occurred before event B if all integers in A are lesser than those of event B
- Handling Temporary Failures
  - hinted handoff - stores the data temporarily in the next healthy server
    - e.g. pick the next N healthy servers
- Handling Permanent Failures
  - Merkle trees - synchronize data between servers in the background
    - data structure that allows finding data differences efficiently
    - comparing the hash value of the root in the Merkle trees
    - then check the children nodes if the parent nodes aren’t the same
- Detecting Server Membership
  - use gossip protocol to track the system state
    - finds the servers by pinging random servers periodically
    - system would reach eventual consistency in logarithmic time with gossip protocol



