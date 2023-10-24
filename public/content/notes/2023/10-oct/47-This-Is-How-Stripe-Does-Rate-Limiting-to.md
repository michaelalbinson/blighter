-----------------------
articleLink: https://newsletter.systemdesign.one/p/rate-limiter
articleTitle: This Is How Stripe Does Rate Limiting to Build Scalable APIs
createdOn: 2023-10-19T16:17:54.143Z
updatedOn: 2023-10-19T16:17:54.143Z
-----------------------

- why rate limit
  - Prevent low-priority traffic from affecting high-priority traffic
  - Prevent service degradation
- Rate Limiter Workflow
  - Check rate limiter rule
  - Reject a request if the threshold exceeds
  - Otherwise let the request pass-through
- implementation
  - token-bucket algorithm is used at Stripe
    - every request needs to pull a token from a bucket to proceed
    - if there are no tokens left, the request is rejected
    - tokens are refilled at a steady pace
  - redis used as the token store
  - other popular options:
    - sliding windows
    - leaky bucket
  - considerations when implementing
    - quality check logic + allow bypass on failures
    - show clear response to user - HTTP 429 or 503
    - enable panic mode on limiter - switch it off on failures
    - setup up alerts/monitoring
    - tune rate limiter to match traffic patterns
- rate limiting types
  - request rate limiter
    - each user gets n requests per second
    - very common type
  - concurrent request rate limiter
    - # of concurrent requests in progress are rate-limited
  - fleet usage load shedding
    - critical APIs reserve 20% of compute, requests to non-critical APIs get rejected if the 80% of remaining compute is in use
  - worker utilization load shedding
    - non-critical traffic gets shed on server overload + re-enabled after a delay




