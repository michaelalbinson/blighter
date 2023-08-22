-----------------------
articleLink: https://12factor.net/
articleTitle: The Twelve-Factor App 
createdOn: 2023-08-22T19:37:20.256Z
updatedOn: 2023-08-22T19:37:20.256Z
-----------------------

Goals of 12-factor app methodology:
- declarative formats for setup automation
- clean contract with the underlying operating system, offering maximum portability
- suitable for deployment on modern cloud platforms - no self-hosting please
- minimize divergence between development and production, enabling continuous deployment
- scale up without significant changes to tooling, architecture, or development practices

Guiding Principles:
- codebase - one codebase tracked in version control, many deploys (monorepo arch?)
- dependencies - explicitly declared and isolated
- configuration - store in the environment
- backing services - treat as attached resources
- build, release, run - strictly separate build + run stages
- process - app executes as one or more stateless process
- port binding - export services via port binding
- concurrency - scale via the process model
- disposability - max robustness with fast startup/graceful shutdown
- dev/prod parity - keep dev/staging/prod as similar as possible
- logs - treat as event streams
- admin processes - run admin/mgmt tasks as one-off processes