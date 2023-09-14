-----------------------
articleLink: https://web.dev/ta-code-coverage/
articleTitle: Four common types of code coverage
createdOn: 2023-09-12T05:00:20.873Z
updatedOn: 2023-09-12T05:00:20.873Z
-----------------------

- Types of coverage
  - Function coverage - the percentage of functions in your code that your tests call
  - Line coverage - the percentage of executable code lines that your test suite executed
  - Branch coverage - the percentage of executed branches or decision points in the code, such as if statements or loops
  - Statement coverage - the percentage of statements in your code that your tests execute
- what metric to choose?
  - statement coverage is a good starting point because it is a simple and easy-to-understand metric
  - others can follow
- Is test coverage the same as code coverage 
  - no :(
  - Test coverage: qualitative metric measuring how well the test suite covers the features of the software. It helps determine the level of risk involved.
  - Code coverage: quantitative metric measuring the proportion of code executed during testing. It is about how much code the tests cover
- 100% code coverage doesn’t mean no bugs
  - you can have meaningless tests "covering" code
  - remember: A bad metric is worse than no metric
  - to avoid this: do test reviews, use code coverage as a guideline