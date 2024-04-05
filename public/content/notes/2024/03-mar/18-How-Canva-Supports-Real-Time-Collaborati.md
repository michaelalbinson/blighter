-----------------------
articleLink: https://newsletter.systemdesign.one/p/rsocket
articleTitle: How Canva Supports Real-Time Collaboration for 135 Million Monthly Users
createdOn: 2024-03-13T21:07:13.227Z
updatedOn: 2024-03-13T21:07:13.227Z
-----------------------

- why request/response model isn't good enough for real-time collaboration
  - long polling - latency is high, state management + concurrency are difficult
  - sse on HTTP/2 - needs an extra protocol on top to support bidirectional comms
  - websockets - on microservices increases server load as every connection needs some memory
- RSocket for real time collaboration
  - app layer support
  - supports reactive stream semantics - standard for async stream processing
  - supports client-server and server-server connections
  - key features
    - performance
      - support for multiplexing (multiple channels over on network connection)
      - async communication
    - data format
      - uses binary format so it's transport layer agnostic
      - supports RPC and event-based messaging
    - flexibility
      - supported by most programming languages
      - offers app-level flow control, no need to implement buffering/windowing
        - consumable amount of messages is specified in config
    - resilience
      - each channel in a connection handles backpressure independently
        - e.g. each channel slows down data to prevent overwhelming the server
        - selectively can config critical channels that will not throttle though
      - server informs clients about their current capacity via _leasing_
      - keepalive heartbeat signals
    - communication pattern
      - once connection is opened, the client vs server distinction is removed in rsocket
        - becomes symmetric peer-to-peer communication
      - supported communication patterns
        - request-response
        - request-stream
        - request-channel
        - fire-and-forget
- canva architecture
  - client connects to a websocket gateway
  - websocket gateways connect to backends over rsocket






