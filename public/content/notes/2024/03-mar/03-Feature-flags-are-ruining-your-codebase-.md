-----------------------
articleLink: https://zaidesanton.substack.com/p/feature-flags-are-ruining-your-codebase
articleTitle: Feature flags are ruining your codebase - by Anton Zaides
createdOn: 2024-03-08T22:17:24.135Z
updatedOn: 2024-03-08T22:17:24.135Z
-----------------------

- why no feature flags?
  - give PMs an excuse to not make hard decisions, such as completely removing a feature
  - codebase becomes more complex and harder to maintain
  - Testing becomes harder (and lower quality)
- Feature Flags as a tool for PMs
  - PMs will come up with other ideas for using it
  - Why should we rely on developers for a configuration change
  - let’s also make it adjustable per user - similar to a canary release
  - why limit ourselves to using it for turning features on
  - features enabled only for premium users
  - you can put everything under a feature flag, right - so don't risk any changes without one
- What’s wrong with the feature flags addiction
  - codebase becomes more complex
  - you waste time on dead code
  - testing becomes harder
  - hard decisions are not made
- How to deal with it
  - release toggle - live for a week or two
  - ops toggles - live for a a few weeks
  - experiment toggles - live for a few days
  - permissions toggles - live for a long time
- Manage different toggles differently
  - acknowledge the existence of different types, if only to align expectations between developers and PMs
- How to make sure feature flags are removed
  - put "expiration dates" on their toggles
  - creating "time bombs" which will fail a test
  - placing a limit on the number of feature flags a system is allowed to have at any one time