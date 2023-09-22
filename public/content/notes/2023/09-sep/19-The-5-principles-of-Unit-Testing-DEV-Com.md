-----------------------
articleLink: https://dev.to/one-beyond/the-5-principles-of-unit-testing-1p5f
articleTitle: The 5 principles of Unit Testing - DEV Community
createdOn: 2023-09-17T15:39:13.008Z
updatedOn: 2023-09-17T15:39:13.008Z
-----------------------

- lean and accurate testing
  - testing code must be simple and easy to work with
  - creating tests should bring great value and be simple
  - METRIC: if you need >30s to read/understand a test? rewrite it!
  - test only what's needed - main logic + principal edge cases
- test behavior, not implementation
  - focus on functional result
  - you shouldn't need to rewrite tests if the implementation of a feature changes
- test naming + structure - AAA pattern
  - thoughtful test naming saves a lot of time:
    - what is being tested?
    - under what circumstances?
    - what is the expected outcome?
  - AAA pattern for test code structure - keeps things as readable as possible
    - Arrange: setup up code
    - Act: execute the test case (ideally this takes one line)
    - Assert: check the result (ideally this takes one line)
- deterministic and isolated tests
  - tests should be independent and isolated
    - if not done this way...
      - tests are hard to RCA
      - updating one test requires updating all of them
      - you can't run tests in any order, which can break assertions
- property-based tests + realistic data
  - increases the opportunity of finding unnoticed bugs
  - use realistic data whenever possible
  - libs like JSVerify or Fast-Check are tools to facilitate this
- Bonus: if you're having a hard time testing something, consider breaking the component logic into smaller pieces