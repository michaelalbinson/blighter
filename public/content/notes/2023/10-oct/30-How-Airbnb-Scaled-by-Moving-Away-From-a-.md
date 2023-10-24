-----------------------
articleLink: https://engineercodex.substack.com/p/how-airbnb-scaled-by-moving-away
articleTitle: How Airbnb Scaled by Moving Away From a Monolith
createdOn: 2023-10-15T23:16:30.813Z
updatedOn: 2023-10-15T23:16:30.813Z
-----------------------

TL;DR:
- Invest in shared infrastructure early
- Simplify service dependencies
- Centralize data hydration (fetching and transformation)
- Separate UI logic from backend logic

### Invest in Shared Infra
- In-house API framework built on Apache Thrift 
- Powergrid: An in-house lib for running tasks in parallel
- OneTouch: Kubernetes framework for managing services and deploying them efficiently. 
- Spinnaker: An open-source continuous delivery platform


### Simplify service dependencies
- team separated services into layers based on technical priorities
- ensure that stable services did not depend on more volatile ones

### Centralize data hydration (fetching and transformation)
- consolidated GraphQL schema that stitched together different entities from different sources

### Separate UI logic from backend logic
- introduced the App Framework, a unified, service-driven UI system
- backend drove the content and styling of the UI within each section of a rendered frontend page
  - frontend in charge of rendering each section

### Takeaways
- Undoing work is normal
  - Airbnb sometimes had to undo earlier work. While painful, it’s important to stay detached from it.
- Splitting out services allow teams to move at different speeds.
  - At Airbnb, frontend teams commonly moved faster than other areas. This change allowed each team to advance at their own pace
- Make the move only when you have to.
  - Airbnb operated fine on a single Rails monolith for a decade! They only made the migration after it was painful to continue development on the monolith.
- Microservices are more for scaling organizations than applications