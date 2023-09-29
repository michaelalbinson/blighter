-----------------------
articleLink: https://engineering.linkedin.com/blog/2023/solving-espresso-s-scalability-and-performance-challenges-to-sup
articleTitle: Solving Espresso’s scalability and performance challenges to support our member base
createdOn: 2023-09-25T18:22:19.921Z
updatedOn: 2023-09-25T18:22:19.921Z
-----------------------

- espresso is the DB for member profiles, feed, recommendations, etc.
- the number of network connections that it needed began to drive scalability and resiliency challenges
- Espresso Architecture
  - two major sections: the router and the storage node
    - router: directs requests to the relevant storage node 
    - storage node: get data from MySQL and present the response in the desired format to the member
  - Need for new transport layer architecture
    - earlier approach used HTTP/1.1 which operates on a connection-per-request basis
      - led to millions of concurrent connections between the router and the storage nodes
      - this constrained scalability of the system
        - adding 100 router nodes caused memory usage to spike by around 2.5GB
        - 15% latency increase due to an increase in garbage collection
        - network flaps could cause thundering herds of routers trying to reestablish connections
        - wait time for connections to storage nodes could be >15ms
      - decided to switch to HTTP/2 to resolve these problems
- HTTP/2 Implementation
  - initially 45% less throughput than the original
  - Improvements to Request/Response Handling
    - Reusing the Stream Channel Pipeline
      - built a queue of local stream channels for HTTP/2
    - Addressing uneven work distribution among Netty I/O threads 
      - observed that 20% of I/O threads were managing 50% of all the total connections/requests
      - fixed by delegating work to threads that have done the least work first (kinda, impl details are vague)
    - Reducing context switches when acquiring a connection 
      - each router maintains 10 connections to every storage node
      - the underlying queue within Netty's implementation is not inherently thread-safe
    - Improvements to SSL Performance
      - Offloading DNS lookup and handshake to separate thread pool
      - Enabling Native SSL encryption/decryption
        - dropped down to OpenSSL instead of using Java - 10% latency reduction
      - Improvements to Encode/Decode performance
        - approx 20% of CPU cycles are spent on encode/decode bytes
        - HTTP/2 layer handles network communication, the core business logic resides within the HTTP/1.1 layer
        - required the conversion of HTTP/2 requests to HTTP/1.1 and vice versa
        - implemented a custom codec to efficiently solve this
      - Disabling HPACK Header Compression
        - HPACK (lookup table of common headers) didn't align well with Espresso's requirements due to rich headers per request
- Results
  - lowered latency, # of TCP connections and GC pauses