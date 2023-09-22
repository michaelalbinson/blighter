-----------------------
articleLink: https://engineercodex.substack.com/p/how-instagram-scaled-to-14-million
articleTitle: How Instagram scaled to 14 million users with only 3 engineers
createdOn: 2023-09-17T14:11:28.821Z
updatedOn: 2023-09-17T14:11:28.821Z
-----------------------

- instagram went from 0-14M users with 3 engineers
- their guiding principles
  - Keep things very simple
  - Don’t re-invent the wheel
  - Use proven, solid technologies when possible
- early instagram stack
  - AWS EC2 w/ Ubuntu
  - frontend: Obj-C + UIKit
  - load balancing: Amazon’s Elastic Load Balancer (NGINX)
  - backend: django w/ gunicorn, stateless server model to enable easy scaling
  - code orchestration: Fabric
  - database: sharded Postgres
    - created time-sortable ids to facilitate faster indexed search
  - photo storage: S3 + cloudfront (CDN)
  - caching: memcached + redis
    - sharded redis for user_id to photo_id mappings
      - this is how they determined which postgres shard to query
    - memcached: general keyed cache for django instances
  - backups: postgres + redis were backed up via elastic block storage (AWS EBS)
    - deployed in a master-replica config
  - push notifications/jobs:
    - pyapns lib for Apple Push Notification Service (APNS)
    - gearman lib for general task queuing/execution
  - monitoring: 
    - Sentry (lib) for real time error monitoring
    - Munin for metrics
    - pingdom for service monitoring
    - pagerduty for incidents + notifications