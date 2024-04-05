-----------------------
articleLink: https://webup.org/blog/the-high-risk-refactoring/
articleTitle: The High-Risk Refactoring
createdOn: 2024-04-01T18:06:29.683Z
updatedOn: 2024-04-01T18:06:29.683Z
-----------------------

### Addressing Risk (Checklist):

✅ Define constraints. How far should I go.
✅ Isolate improvements from features. Do not apply them simultaneously.
✅ Write extensive tests. Higher level (integration) with fewer implementation details. They should run alongside changes.
✅ Have a visual confirmation. Open the browser.

❌ Do not skip tests. Don't be lazy.
❌ Do not rely too much on code reviews and QA. Humans make mistakes.
❌ Do not mix expensive cleanups with other changes. But do that for small improvements.


### 👍 Should I Refactor

👍 Refactor if things are getting too complicated, but 👎 stop if can't prove it works.
👍 Accompany new features with refactoring for areas you foresee to be subject to a change, but 👎 copy-pasting is ok until patterns arise.
👍 Be proactive in finding new ways to ensure refactoring predictability, but 👎 be conservative about the assumption QA will find all the bugs.
👍 Move business logic out of busy components, but 👎 be brave enough to keep the legacy code intact if the only argument is "this code looks wrong".