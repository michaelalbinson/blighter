-----------------------
articleLink: https://newsletter.systemdesign.one/p/hotstar-scaling
articleTitle: How Disney+ Hotstar Scaled to 25 Million Concurrent Users
createdOn: 2023-10-24T15:10:25.796Z
updatedOn: 2023-10-24T15:10:25.796Z
-----------------------

### Techniques
- autoscaling isn't enough
  - pre-warmed infra ahead of demand using historic traffic patterns as estimates
- avoid thundering herds
  - add jitter to client requests
  - activate client caching
  - allow exponential backoff by the client
- apply the pareto principle
  - identify important components and focus HA on then
- don't repeat yourself
  - multi-level caching to improve read scaling
  - selected, monitored and optimized cache TTL to prevent thundering herds
- rate limit traffic
- enable panic mode
  - "panic mode" = feature to inform client that server is overloaded and back off
  - additionally:
    - gracefully degrade non-essential components
    - favor availability of important components
    - allow users to bypass non-essential components
- testing
  - chaos testing - what happens if some services fail
  - perf testing - does the system degrade with a high number of non-concurrent users
  - load testing - checks system perf under high numbers of concurrent users
- orchestrate the infrastructure
  - reliable infrastructure is the foundation of scalability
  - avoided configuration tools like chef and puppet
  - used baked container images
  - used proven tech, e.x. K8s
- everything is a trade-off
- tweak the software
  - studied data patterns to tweak their system
- flywheel Effect
  - id'd bottlenecks with profiling
  - learned from failures in a loop
- keep an open comm channel
  - monitor system metrics
  - open comms between stakeholders
- grow the scalability toolbox
  - no silver bullet for scalability
  - studied traffic patterns to get the best out of all of their tools


