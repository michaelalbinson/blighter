-----------------------
articleLink: https://newsletter.systemdesign.one/p/sidecar-pattern
articleTitle: How Sidecar Pattern Works ✨
createdOn: 2025-10-14T01:52:25.717Z
updatedOn: 2025-10-14T01:52:25.717Z
-----------------------

    The app runs the core logic and handles requests.

    Although detached, the sidecar and app share the same storage and networking environment.

    Sidecar runs alongside the app, handling tasks such as logging, monitoring, and security.

    They communicate with each other through a local network or shared resources, such as a configuration file or shared memory.

    The sidecar and app start, stop, and scale together for reliability.

2 ways to deploy
    As a separate container alongside the app.

    As a separate process on the same server.

- Use Cases
  - Traffic Proxy
  - Logging and Monitoring
  - Security Management
- Tradeoffs
  - pros:
    - handles extra tasks, main app only handles business logic
    - all microservices can get the same sidecar setups
    - sidecars run outside the app, so they're app-language agnostic
  - cons
    - consumes more CPU, memory, network capacity
    - extra latency on requests
    - introduces risks of hidden failures because the sidecar can break the app
    - increased operational complexity
    - synchronization challenges
