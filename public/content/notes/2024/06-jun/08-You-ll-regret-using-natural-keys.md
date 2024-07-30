-----------------------
articleLink: https://blog.ploeh.dk/2024/06/03/youll-regret-using-natural-keys/
articleTitle: You'll regret using natural keys
createdOn: 2024-06-06T14:34:59.459Z
updatedOn: 2024-06-06T14:34:59.459Z
-----------------------

- natural keys = a type of unique key in a database formed of attributes that exist and are used in the external world outside the database (e.x. social security number)
  - Are natural keys ever a good idea though? (no)
- uniqueness problems
  - uniqueness - natural keys are sometimes not as unique in the general case as they are in specific applications
  - identity - a person may have more than one natural key assigned to themselves (e.g. possible to have more than one SSN)
  - clerical errors - data entry can corrupt natural keys more easily than with synthetic keys