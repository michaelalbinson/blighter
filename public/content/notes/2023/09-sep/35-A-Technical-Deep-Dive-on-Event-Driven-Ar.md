-----------------------
articleLink: https://blog.quastor.org/p/tech-dive-event-driven-architectures-a55d
articleTitle: A Technical Deep Dive on Event Driven Architectures
createdOn: 2023-09-21T01:47:42.825Z
updatedOn: 2023-09-21T01:47:42.825Z
-----------------------

- Event Driven Architectures (EDAs)
  - popular with data-intensive workloads and cloud computing
  - history
    - EDAs scale better in the world of Web2 because of the volume of data generated
      - could be hard to reason about the same process as a (set of) request-response cycle(s)
  - Core Components of Event Driven Architecture
    - events
      - type of message signaling a state change or action in a system
        - usually key-value formatted
      - immutable - you can only publish new events
      - EDA patterns
        - Event Notification pattern
          - event just says the state has changed
          - downstream consumers must query the upstream for data
        - Event-Carried State transform pattern
          - event contains all the upstream state - no need to get more from upstream
    - (event) producers
      - role includes
        - event creation
        - data serialization - to JSON, protobuf, etc
        - transmission - to the broker
      - events are usually batched by the producer until
        - enough events are accumulated
        - a certain amount of time passes
    - (event) brokers
      - immutable log of events
      - may be partitioned across machines for fault tolerance/scaling
      - event stream
        - stores a continuous stream of events
        - events can be consumed by multiple services (consumers)
        - events are deleted after:
          - TTL expires
          - conditionally, e.g. all consumers have read the message, retention period passes, etc
        - examples: Kafka, AWS Kinesis
      - event queue
        - typically only have a single consumer
        - single event should only be consumed by a single consumer
        - once event is consumed + acknowledged, the event is removed from the queue
        - examples: AWS SQS, RabbitMQ
    - (event) consumers
      - services that ingest messages from a broker
      - events can be consumed by one or multiple consumers
- Key Benefits of Event Driven Architectures
  - loose coupling
    - brokers act as a narrow waist between producers/consumers
    - prevent thundering herd problems for upstream services
  - scalability
    - > 7T/messages/day @ linkedin
  - extensible
    - adding producers/consumers is easy

