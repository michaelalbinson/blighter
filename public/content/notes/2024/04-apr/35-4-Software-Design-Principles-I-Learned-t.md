-----------------------
articleLink: https://read.engineerscodex.com/p/4-software-design-principles-i-learned
articleTitle: 4 Software Design Principles I Learned the Hard Way
createdOn: 2024-04-23T16:10:14.202Z
updatedOn: 2024-04-23T16:10:14.202Z
-----------------------

1. Maintain one source of truth.
  - If there’s two sources of truth, one is probably wrong, and if it's not wrong, it's just not wrong yet
2. Yes, please repeat yourself.
  - (sometimes)
3. Don’t overuse mocks.
  - try to stay away from mocks if possible
  - don't overuse because
    - Tests can be harder to understand because now you have this extra code someone has to understand along with the actual production code.
    - Tests can be harder to maintain because you have to tell a mock how to behave, which means you leak implementation details into your test.
    - Tests overall provide less assurance now because the reliability of your software now is only guaranteed IF your mocks behave exactly like your real implementations (which is hard to guarantee and often ends up out of sync).
4. Minimize mutable state.
  - caching is for the end state of most software projects