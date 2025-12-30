-----------------------
articleLink: https://newsletter.systemdesign.one/p/api-versioning
articleTitle: API Versioning - A Deep Dive
createdOn: 2025-10-14T02:20:18.580Z
updatedOn: 2025-10-14T02:20:18.580Z
-----------------------

- options for eveolution
  - Release a new version in a new location
    - e.g. /api/v2/orders while keeping /api/v1/orders
    - types:
      - path-based
        - sunset header
        - 3xx redirects
      - query-parameter-based
      - message payload versioning
      - header-based
    - formats
      - semantic versioning <major>.<minor>.<patch>
      - calendar versioning
      - hash versioning
    - tooling
      - API Gateways
      - documentation frameworks
      - versioning libraries
  - Release a backward-compatible version
    - you can only make additive changes
  - break compatibility
    - force clients to upgrade
- generally you need all three, depending on the change

