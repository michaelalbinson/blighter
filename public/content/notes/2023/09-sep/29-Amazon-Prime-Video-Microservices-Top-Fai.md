-----------------------
articleLink: https://newsletter.systemdesign.one/p/prime-video-microservices
articleTitle: Amazon Prime Video Microservices Top Failure
createdOn: 2023-09-21T00:36:29.382Z
updatedOn: 2023-09-21T00:36:29.382Z
-----------------------

TL;DR: This post outlines the re-architecture of the Prime Video stream quality monitoring tool with a 
monolith. They put serverless and microservices in their architecture to scale. But they faced high costs 
and scalability issues.

- Prime video monitoring as microservices/serverless components
  - problems:
    - It became expensive on a high-scale workload
    - There were scalability issues
  - what went wrong?
    - AWS step function costs got out of control due to update frequency from clients (1/sec/stream)
    - AWS step functions also have a limit on number of transaction - caused a scalability bottleneck
    - S3 bucket costs got high becuase they saved every frame where an issue occurred
- Transition to a monolith
  - moved all components into a monolith running on EC2
  - keep frames in memory instead of a temporary S3 bucket
  - EC2 allows easier diagonal scaling over time, eliminating the AWS step function bottleneck
- key takeaways:
  - Keep the architecture simple
  - Define microservice boundaries using domain-driven design principles
  - Back-of-the-envelope analysis is important
  - Don't follow the buzzwords
  - Microservices come with an overhead cost
  - reduction of infra cost of 90%


