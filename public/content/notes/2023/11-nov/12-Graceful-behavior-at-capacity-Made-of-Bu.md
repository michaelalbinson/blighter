-----------------------
articleLink: https://blog.nelhage.com/post/systems-at-capacity/?utm_source=tldrnewsletter
articleTitle: Graceful behavior at capacity - Made of Bugs
createdOn: 2023-11-06T02:22:35.943Z
updatedOn: 2023-11-06T02:22:35.943Z
-----------------------

### Intro
- premise: we have a service that accepts requests and returns a response after doing some work
- two metrics to keep an eye on
  - request rate - volume over time of incoming requests (RPS)
  - throughput: successful work (requests)/unit time
    - throughput as a function of request rate, e.g. as we have more traffic, does it impact throughput?
- there is finite capacity, after which we saturate
  - in reality at a certain RPS there is an overload of the system, decreasing throughput
  - or worse: congestion collapse

### Contention + Admission control
- common failure mode: contention for a shared resource
- examples of contention e.g.
  - If there are more processes running than we have physical CPUs, we will incur many more context switches and more scheduler overhead, and our throughput will decrease.
- we can try to resolve this via an admission controller which only allows requests to leave the queue and begin processing once there is available capacity
  - adding concurrency can actually hurt throughput rather than help

### Queues are either empty or full
- unbounded admission control queues are unbounded
  - throughput here is independent of the size of the queue
    - queues cannot increase peak capacity
  - As the queue grows, so does overall latency (assuming FIFO behavior)
  - As the queue grows, eventually...
    - queue will hit a configured maximum queue size, and will be forced to drop messages
    - ueue will not have a configured maximum size, but will exhaust available storage space
    - eventually the clients upstream of our service will time out, and begin treating requests as failed (and maybe retry!)
- you can en up with a standing queue: a sizeable queue which persists in a steady state
- takeaways:
  - Queues can help smear out bursty load in time, but cannot increase peak throughput in aggregate.
  - if we accumulate persistent standing queues, our queues are adding latency for no benefit

### What does work
- two strategies
  - ask our clients to make fewer requests, and thus reduce the incoming request load
    - (caching)
  - choose not to process a subset of requests, discarding them as cheaply as possible and freeing up resources
  - either or both of these are backpressure (think: pushing back)
- resilient systems inevitably require some form of backpressure because
  - every system has some limits
  - backpressure creates a closed-loop system

### Flow Control
- we can sometimes build in back pressure in the form of a flow control mechanism
  - receiver directly signals a sender what constitutes a safe or supported rate of traffic

### Load shedding
- we select some subset of requests, and discard them as early as possible
- Load shedding is related to rate limiting
- some strategies to consider
  - random drop
  - client tiering (e.g. paid and free users)
  - request tiering (drop based on type of request)
  - fair allocation, either
    - uniform random dropping
    - allocate based on a per-client basis instead of per-request

### Adding capacity
- we mostly cover techniques for systems that are overloaded in this article
- identify the bottleneck resource and scale them up if you can
  - picking the wrong resource can make the problem worse, however
















