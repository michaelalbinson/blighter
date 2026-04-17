-----------------------
articleLink: https://aicode.swerdlow.dev/
articleTitle: AI Code
createdOn: 2026-03-27T21:17:42.359Z
updatedOn: 2026-03-27T21:17:42.359Z
-----------------------

- Code should be self documenting
  - How you split logic into functions and shape the data they pass around determines how well a codebase holds up over time.
- Semantic Functions
  - minimal as possible in order to prioritize correctness
  - Side effects are generally undesirable in semantic functions unless they are the explicit goal 
- Pragmatic Functions
  - wrappers around a series of semantic functions and unique logic
- Models
  - The shape of your data should make wrong states impossible
- Where Things Break
  - happen when a semantic function morphs into a pragmatic function for ease