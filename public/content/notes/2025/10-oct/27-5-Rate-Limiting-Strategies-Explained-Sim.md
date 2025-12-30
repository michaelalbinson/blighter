-----------------------
articleLink: https://newsletter.systemdesign.one/p/rate-limiting
articleTitle: 5 Rate Limiting Strategies Explained, Simply 🚦
createdOn: 2025-10-14T01:56:02.383Z
updatedOn: 2025-10-14T01:56:02.383Z
-----------------------

- each user gets a bucket of tokens, when exceeded no new requests
- leaky bucket - each user gets a bucket with a constant increase in allowance
- fixed window - time divided into blocks, each with a request limit - extra requests are blocked
- sliding window - rolling time window with a request limit, rolling window approximates the number of permitted requests
- sliding window log - same as above, but keeps a log of all request timestamps to improve accuracy
  - 