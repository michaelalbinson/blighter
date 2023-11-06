-----------------------
articleLink: https://newsletter.systemdesign.one/p/hinted-handoff-demystified
articleTitle: Hinted Handoff Demystified
createdOn: 2023-11-06T02:23:25.193Z
updatedOn: 2023-11-06T02:23:25.193Z
-----------------------

### The process
1. Networking protocols like the gossip protocol is utilized to identify instances of node failures within the system.
2. Nodes experiencing failures are designated as unavailable.
3. Requests initially directed at the unavailable node are rerouted toward the backup node.
4. The backup node is responsible for persistently storing data changes and metadata from the affected node in the form of hints.
5. The health status of the formerly unavailable target node is established using the gossip protocol.
6. Once the target node has fully recovered, having regained its healthy status.
7. The hints accumulated by the backup node are then conveyed to the target node.
8. The target node proceeds to replay the recorded data mutations.
9. Subsequently, the backup node proceeds to eliminate the stored hints.