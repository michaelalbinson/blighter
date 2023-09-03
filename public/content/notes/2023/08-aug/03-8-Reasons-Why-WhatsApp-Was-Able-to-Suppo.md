-----------------------
articleLink: https://newsletter.systemdesign.one/p/whatsapp-engineering
articleTitle: 8 Reasons Why WhatsApp Was Able to Support 50 Billion Messages a Day With Only 32 Engineers
createdOn: 2023-08-31T21:19:53.605Z
updatedOn: 2023-08-31T21:19:53.605Z
-----------------------

- Whatsapp engineering practices:
  - single responsibility principle
    - focus on the core feature - messages
    - eliminate scope/feature creep at all costs
  - tech stack
    - erlang
      - allowed high scalability with small codebase
      - supports hot reloading
      - support for native threads
      - hot reloading gives high availability and responsiveness to devs
  - why reinvent the wheel?
    - don't lol
    - whatsapp is built on top of an open source implementation https://www.ejabberd.im/index.html
  - cross-cutting concerns
    - things that affect many parts of a product
    - focus on these concerns to improve product quality
    - used CI/CD to improve software dev process
  - scalability
    - used diagonal scaling (scaling up both vertically and horizontally) to keep costs and operational complexity low
    - servers were over-provisioned to handle traffic spikes/headroom for failures
  - flywheel effect
    - cpu, context switching, system call metrics were gathered + measured
    - bottlenecks were id'd and eliminated
  - quality
    - load testing was used to id failure modes
  - small team
    - comms paths increase exponentially as a team grows
    - kept team small to minimize degradation of comms