-----------------------
articleLink: https://blog.quastor.org/p/scaling-microservices-doordash-6c35
articleTitle: Scaling Microservices at DoorDash
createdOn: 2023-10-19T15:38:37.412Z
updatedOn: 2023-10-19T15:38:37.412Z
-----------------------

### Microservices
- common design patterns
  - monolith
  - modular monolith - single codebase, with modular components
  - service-oriented architecture - backend is a few large applications
  - microservices architecutre - break app into small, independent services, where each is responsible for a specific business functionality
  - distributed monolith - anti-pattern where if microservices/SOA are done wrong and services are closely intertwined
- pros
  - organizational scaling is easier
  - polyglot systems - pick the right tool for a particular part of the system
  - independent scaling
  - faster deployment
- downsides
  - complexity - new failure modes, debugging is harder
  - inefficiency - higher compute/network overhead

### Microservices at Doordash
- failure modes
  - cascading failures - single service failures causes many others to fail
  - retry storms - retries multiply, causing a degraded service to degrade further
  - death spirals - if one app node goes down, increased pressure on other app nodes cause them to fail too
  - metastable failures (thundering herd) - higher than expect load even after initial trigger is gone
- countermeasures
  - load shedding - protects a service from other services
  - circuit breakers - requesting service stops making requests to allow downstream to recover
  - auto-scaling - Doordash recommends _not_ doing reactive auto-scaling because of machine spin-up time
    - Doordash recommends proactive auto scaling, using past patterns to scale up/down before expected load

