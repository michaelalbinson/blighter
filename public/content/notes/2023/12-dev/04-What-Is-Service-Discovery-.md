-----------------------
articleLink: https://newsletter.systemdesign.one/p/what-is-service-discovery
articleTitle: What Is Service Discovery?
createdOn: 2023-12-08T00:15:21.121Z
updatedOn: 2023-12-08T00:15:21.121Z
-----------------------

- service discovery write workflow
  1. service registers with service registry
  2. service periodically sends a heartbeat to the service registry
  3. service deregisters when it is decomissioned
    - if no heartbeat is sent for enough time, registry will classify service as inactive
- service discovery read flow
  1. consumer reads the current cluster discovery data
  2. consumer subscribes to the registry for updates
  3. registry pushes change notifications to the consumer
  4. consumer unsubscribes from updates from the registry
