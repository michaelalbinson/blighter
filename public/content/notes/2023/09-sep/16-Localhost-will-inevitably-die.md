-----------------------
articleLink: https://lucasfcosta.com/2023/09/11/localhost-will-die.html
articleTitle: Localhost will inevitably die
createdOn: 2023-09-17T15:12:59.696Z
updatedOn: 2023-09-17T15:12:59.696Z
-----------------------

TL;DR: this is a pretty interesting article discussing how as things scale/complexity in systems
grow it becomes very difficult to reliably run full systems on your local machine (localhost). The
primary solution seems to be "run it in a VM" which works great for interpreted languages

- Localhost is the inevitable victim of every software’s commercial success
  - complexity grows and it become difficult to anything because setup is so hard
- The beginning of the end: pointing to staging
  - first, engineers create huge doc files with complex instructions to run locally
  - then there are bugs that only get caught in staging
  - finally, a clever person will run one app locally, and point it to staging
  - by using staging, devs:
    - avoid bugs by testing in a prod-live env
    - ship faster by not needing to set things up
    - save their machine's resources
  - but this only works until multiple devs do this, and staging starts to break
  - solution: cloud environments (e.g. what Shopify, Uber, and Stripe do)
- cloud envs: the good, bad and ugly solutions
  - ugly: give devs big VMs somewhere else
    - doesn't solve inconsistency between dev envs
    - okay starting point
  - bad: constrained remote infra
    - shared remote infra is _better_, but can't external services e.g. S3
  - good: give production-like infra to every engineer in company's cloud
    - eliminates "it works on my machine" bugs (MA: not necessarily true IMO)
    - engineers can still run tools locally
    - run things behind VPN, control permissions as needed
    - terraform can do this
      - author pitches their solution - layerform - as better (MA: idk about that)
    - these can also be used for load/E2E testing