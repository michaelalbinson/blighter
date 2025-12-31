-----------------------
articleLink: https://acusti.ca/blog/2025/12/09/how-ai-coding-agents-hid-a-timebomb-in-our-app/
articleTitle: How AI Coding Agents Hid a Timebomb in Our App | acusti.ca
createdOn: 2025-12-30T08:28:11.700Z
updatedOn: 2025-12-30T08:30:55.824Z
-----------------------

- Comments are documentation. Tests are constraints.
  -  Anything that can break the app deserves a test, not a comment.
- Comments also don’t survive large refactors
- AI changes the semantics of “good enough.”
  - if it’s a structural invariant, a recursion boundary, a hidden assumption—documenting it isn’t sufficient anymore
  - you must encode it in a test for it to be respected