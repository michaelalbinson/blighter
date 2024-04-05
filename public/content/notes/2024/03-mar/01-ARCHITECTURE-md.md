-----------------------
articleLink: https://matklad.github.io/2021/02/06/ARCHITECTURE.md.html
articleTitle: ARCHITECTURE.md
createdOn: 2024-03-07T22:01:39.298Z
updatedOn: 2024-03-07T22:01:39.298Z
-----------------------

- biggest difference between an occasional or core developer lies in the knowledge about the architecture of the project
- ARCHITECTURE file to be a low-effort high-leverage way to bridge this gap
  - keep it short
  - don't keep synch'd with code - update it a few times a year
  - have it contain a codemap
    - should answer: where's the thing that does X
    - avoid the how
    - don't link files directly - use symbol search (NB: I disagree)
  - explicitly call out arch invariants
  - point out boundaries between layers
  - section on cross cutting concerns
  - good example - https://github.com/rust-analyzer/rust-analyzer/blob/master/docs/dev/architecture.md