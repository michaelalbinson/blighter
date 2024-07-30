-----------------------
articleLink: https://www.industrialempathy.com/posts/design-docs-at-google/
articleTitle: Design Docs at Google
createdOn: 2024-06-04T14:38:23.198Z
updatedOn: 2024-06-04T14:38:23.198Z
-----------------------

- goals of design docs
  - id design issues early when changes are cheap
  - achieve consensus in the org around design
  - ensure consideration of cross-cutting concerns
  - scale knowledge of senior engineers
  - build organizational memory around design decisions
  - acts as a summary artifact in the technical portfolio of the designer
- anatomy of a design doc
  - context + scope
  - goals + non-goals
  - actual design
  - system-context-diagram
  - apis
  - data storage
  - code and pseudo-code (don't include in doc)
  - project constraints
  - alternatives considered
  - cross-cutting concerns
  - length of doc - ~10-20 ages (oof)
- when not to write a design doc
  - when a doc becomes an implementation manual
  - before a prototype has been built
- design doc lifecycle
  - creation + rapid iteration
  - review
  - implementation + iteration
  - maintenance + learning
- things to think about
  - Are you unsure about the right software design, and would it make sense to spend upfront time to gain certainty?
  - Relatedly, would it help to involve senior engineers, who might not be able to review every code-change, in the design?
  - Is the software design ambiguous or even contentious such that achieving organizational consensus around it would be valuable?
  - Does my team sometimes forget to consider privacy, security, logging or other cross-cutting concerns in the design?
  - Is there a strong need for documents that provide high-level insights into the design of legacy systems in the organization?