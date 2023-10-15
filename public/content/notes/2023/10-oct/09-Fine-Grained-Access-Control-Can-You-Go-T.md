-----------------------
articleLink: https://authzed.com/blog/fine-grained-access-control
articleTitle: Fine-Grained Access Control: Can You Go Too Fine?
createdOn: 2023-10-05T23:23:02.781Z
updatedOn: 2023-10-05T23:23:02.781Z
-----------------------

### Intro
- Google Zanzibar allows for RBAC, ABAC and more complex things, e.g. 
  - user-defined roles
  - fine-grained authZ (FGA)
- how do you know which things to write relationships for, e.g. ever cell in a spreadsheet?
  - unlikely to want to do things like e.g. every work in a word document
  - maybe some spreadsheet cells do want different permissions

### Balancing flexibility with maintainability in Fine-Grained Authorization
- model the smallest thing possible
- Granularity has a cost though
  - e.x. a 15 col x 2k row sheet has 62k relationships
    - just opening the sheet requires all 62k checks
- Striking a balance
  - maybe just look at the column/row level -> only 2k relationships

### Takeaways
- start by modelling the most granular resource
- if relationship count explodes, look to make a tradeoff
  - are you actually using all the relationships in the model?
- reduce the req'd relationship by checking permissions on an aggregate resource
- reduce # of checks by caching check results