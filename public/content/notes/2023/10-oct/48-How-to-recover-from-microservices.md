-----------------------
articleLink: https://world.hey.com/dhh/how-to-recover-from-microservices-ce3803cc
articleTitle: How to recover from microservices
createdOn: 2023-10-19T16:22:06.386Z
updatedOn: 2023-10-19T16:22:06.386Z
-----------------------

1. Stop digging (creating more microservices)
2. Consolidate critical, dependent paths first
3. leave isolated performance hotspots for last
  - microservices done right target narrow, isolated, performance-critical parts of the system
4. prioritize dropping the most esoteric implementations 
  - non-standard implementations should go first
5. learn to partition large systems into modules, rather than networks 

- microservies well depends on
  - having a large complex system
  - the ability to identify a part of a modular design with strong boundaries and no critical-flow dependencies for extraction
  - 