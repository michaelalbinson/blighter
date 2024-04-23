-----------------------
articleLink: https://www.figma.com/blog/how-we-rolled-out-our-own-permissions-dsl-at-figma/
articleTitle: How We Built a Custom Permissions DSL at Figma | Figma Blog
createdOn: 2024-04-18T13:33:48.896Z
updatedOn: 2024-04-18T13:33:48.896Z
-----------------------

- originally used active_record.has_access? as the basis for authorization
  - had a lot of if/else statements in that bad boy
  - long and complicated, hard to debug
  - hierarchical problems with levels of access (excluding levels of access was hard)
  - database load was high
  - there were multiple sources of truth (sinatra and livegraph) - changes had to be made in both places
- new solution: policies
  - started looking into AWS IAM policies
    - can be hard to work with and are not universally loved
    - team decided to take this system as inspiration
  - also looked at open policy agent, zanzibar, oso - none quite fit
  - developed their own Policy-based solution
    - contained
      - resource_type
      - effect (allow/deny)
      - permission (:can_edit, ...) - actions allowed/denied when policy allows/denies
      - attached_through - data needed to be loaded to evaluate the policy
      - apply? - should the policy apply or be ignored
    - policies were still tough to write
    - writing imperative ruby meant there was little control over what happened inside `apply?` method
      - wanted to avoid network calls/side-effects
    - no good story about how the files would work across platforms
- introduced a DSL
  - based on tuples of `[value, operator, value]`
  - left side always references a data field
  - right side can reference a data field using a `ref` object