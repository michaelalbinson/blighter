-----------------------
articleLink: https://newsletter.systemdesign.one/p/how-does-nginx-work
articleTitle: How Nginx Was Able to Support 1 Million Concurrent Connections on a Single Server ✨
createdOn: 2024-12-17T23:14:44.642Z
updatedOn: 2024-12-17T23:14:44.642Z
-----------------------

- parallel threads
- async event loop concurrency - requests in an event queue for workers to pick up + thread pooling
- scalability
  - shared memory for cached requests w/ mutex on access