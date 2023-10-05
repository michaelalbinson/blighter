-----------------------
articleLink: https://slack.engineering/executing-cron-scripts-reliably-at-scale/
articleTitle: Executing Cron Scripts Reliably At Scale
createdOn: 2023-10-02T22:16:06.075Z
updatedOn: 2023-10-02T22:16:06.075Z
-----------------------

### System components
- Scheduled Job Conductor golang service
- Slack's job queue - async compute platform
- Vitess table for job deduplication + monitoring

### Scheduled Job Conductor
- golang service that mimics `cron` functionality
- run on k8s
- not all pods run jobs - uses K8s Leader election to pick a scheduler, and others are in standby to run jobs

### Slack Job Queue
- runs ~9B jobs (pieces of work)/day
- queues are logical ways to move jobs through Kafka into Redis then to a job worker
- this already existed so they didn't need to build net-new infra 
- [more details on the queue](https://slack.engineering/scaling-slacks-job-queue/)

### Vitess DB Table
- handles dedepluicating jobs + report job tracking
- indexed on script names
- run a simple web paged based on this data for monitoring