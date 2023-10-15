-----------------------
articleLink: https://www.softwareatscale.dev/p/the-hidden-performance-cost-of-nodejs
articleTitle: The Hidden Performance Cost of NodeJS and GraphQL
createdOn: 2023-10-09T18:55:24.519Z
updatedOn: 2023-10-09T18:55:24.519Z
-----------------------

TL;DR: Using graphql with nodejs can lead to exponential growth of promises for deeply nested queries 
(e.g. n^n^n for three layers of depth), that would not happen if we simply used well-optimized REST 
calls.

Some possible solutions:
- reduce the number of promises by removing graphql middleware
- rewrite graphql query resolves to use fewer type resolvers - use one query to resolve as much as possible
- minimize promise introspection features, e.g. async-hooks usage