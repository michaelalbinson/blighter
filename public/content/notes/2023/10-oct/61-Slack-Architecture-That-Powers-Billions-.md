-----------------------
articleLink: https://newsletter.systemdesign.one/p/messaging-architecture
articleTitle: Slack Architecture That Powers Billions of Messages a Day
createdOn: 2023-10-26T18:54:38.649Z
updatedOn: 2023-10-26T18:54:38.649Z
-----------------------

### General
- two API types - web and real-time
  - real-time is WebSocket based
  - web is HTTP
- cursor based pagination for messages
- mysql DB
  - proven tech w/ mature tooling + strong community
  - slack configured it to be eventually consistent to improve availability

### Messaging Arch
- app needs 3 things
  - validity - every user gets the published message
  - integrity - messages don't get delivered more than once
  - total order - chat messages get delivered in the same order for every user
- slack has a client-server architecture with a PHP monolith
- gateway server for web-sockets
  - stateful, in-memory service
  - consistent hashing maps channel ids to gateway servers
- sharded mysql w/ Vitess
  - sharded by channel ID
- service registry (Consul) lets services find each other and communicate
- added unique salt to messages to ensure messages are only shown once
