-----------------------
articleLink: https://newsletter.systemdesign.one/p/hotstar-architecture
articleTitle: How Disney+ Hotstar Delivered 5 Billion Emojis in Real Time
createdOn: 2024-03-12T00:56:59.717Z
updatedOn: 2024-03-12T00:56:59.717Z
-----------------------

flow:
- client - sends emoji
- (golang) api server - proxies emojis to kafka message queue
- kafka
- apache spark - processes + aggregates the raw message queue into batches, passes to kafka
  - guarantees one-time processing of emoji
- kafka
- python consumer subscribed to kafka -> pushes data to pubsub architecture
- pubsub architecture publishes data to clients