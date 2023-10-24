-----------------------
articleLink: https://vadimkravcenko.com/shorts/database-migrations
articleTitle: Database Migrations
createdOn: 2023-10-15T22:58:00.509Z
updatedOn: 2023-10-15T22:58:00.509Z
-----------------------

TL;DR:
- No manual database changes. Always generate immutable migration scripts.
- Database version should be contained in the database itself. (Django does this automatically)
- If you don’t have maintenance windows — focus on the dual-write process.
- When building features with significant database changes - think of backward compatibility and correct abstractions.
- Consider using the latest tools to make your migration life easier.

### why are migrations hard
- you can only see a few months into the future - inevitably big migrations become necessary
- every migration needs to support three cases:
  - Upgrading (Migrating up)
  - Downgrading (Migrating down)
  - Everything in between
- The bigger the data model change, the more people should be involved

### Simple Deployment
- steps
  - Push your code to Bitbucket/Github/Gitlab.
  - Deployment gets triggered.
  - New docker containers get built
  - Database migrations and all the related scripts are run
  - Docker containers are restarted on the server
- works if
  - You have a single application instance.
  - You can allow yourself a few seconds of downtime.
  - You’ve already tested the migrations on staging.
- won't work if
  - You’re running multiple app instances, could might result in a migration race condition/invalid database state.
  - You have lots of data and need to transform it — which will block the deployment process or possibly timeout.
  - Downtime is not an option.

### Scenarios
- adding a new field
  - easiest case
  - If the new field is non-nullable, provide a default value
    - can be problematic in very large datasets as every row must be written to
  - 2-phase deployment approach
    - deploy the database changes
    - deploy the application changes once confident nothing is broken
- Removing a Field
  - first, highlight code that uses `field-to-be-removed`
  - steps
    - deploy app changes first
    - remove field from the DB if everything looks good
- Changing Field with business logic attached
  - this case should be:
    - handled as a team
    - handled with a dual-write logic
    - handled with multi-phased deployment
      - that helps keep everything running with zero data inconsistency
  - dual-write migration:
    - Add the new field to the database (Zero impact on the running code).
    - Deploy new app code, where you start writing to both old and new fields, with the corresponding new business logic applied. Reading is still done from the old path. Writing to both fields must happen as part of a single Transaction.
    - Compare the data and make sure it’s consistent.
    - Write migration code that transforms the rest of the data from the old field into the new field in the correct format. (Or use gh-ost from Github)
    - Deploy the migration and change the read path to the new field. The write path is still to both fields.
    - Verify the application and the data consistency.
    - Remove writing to the old field. At this point, reading/writing happens exclusively in the new field. The old field still exists in the database but should receive no writes.
    - Verify the application and the data consistency.
    - Remove any code related to the old field.
    - Verify the application and the data consistency.
    - Deploy migration script to drop the column from the database.
    - Shake hands with your teammates.
- Mobile app + database migrations
  - tricky because no guarantee clients upgrade to new app versions
  - three methods:
    - API Based Dual Write - API wrapper around the old Service and the new Service
    - Database-Based Dual Write - Same API, but writes/reads are triggered to two different databases
    - New app version + New Endpoint + New Database
      - New app version with a different endpoint that reads/writes to different databases based on old/new logic.
      - This can be called an App-Level Dual-write, as the new app version defines where the old/new data will go.

### Zero downtime
-  often take longer because they're deployed in multiple phases
- 








