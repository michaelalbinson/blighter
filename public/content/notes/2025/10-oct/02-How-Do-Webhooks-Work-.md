-----------------------
articleLink: https://newsletter.systemdesign.one/p/how-do-webhooks-work
articleTitle: How Do Webhooks Work ⭐
createdOn: 2025-10-13T23:09:52.507Z
updatedOn: 2025-10-13T23:09:52.507Z
-----------------------

1. Components
  - Sender - system where the event happens
  - Event - action that occurred
  - receiver - system that needs to know about the event
- you need security on the endpoint to ensure the validity of messages sent
- exponential backoff can be useful in the event of network failures
- the webhook API should be idempotent to avoid duplicate actions