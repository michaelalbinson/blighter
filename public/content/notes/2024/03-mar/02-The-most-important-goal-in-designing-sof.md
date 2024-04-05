-----------------------
articleLink: https://ntietz.com/blog/the-most-important-goal-in-designing-software-is-understandability/
articleTitle: The most important goal in designing software is understandability | nicole@web
createdOn: 2024-03-08T22:11:47.781Z
updatedOn: 2024-03-08T22:11:47.781Z
-----------------------

- the single most important thing to design for is understandability
  - above security, perf, and correctness
  - you cannot ensure any of these other design goals without understandability
- Misunderstood software produces defects
  - if you can't understand the code, tests won't help
  - you can't build correct/performant/secure code without understanding it
- Make the code understandable
  - Remember your audience
  - Isolate the highest complexity -- pull it into its own unit
  - Read it with fresh eyes
  - Integrate any code review comments
    - do not just explain how it works in a response - get a readability fix into the code
- Add supporting documentation
  - System architecture documentation
  - Document architecture decisions and design reviews - 3 effects
    - gives a record to help understand a choice
    - writing out the decision helps make it clearer to ourselves
    - gives you a strong place to start a design review
  - document product requirements
  - code comments
- Gradual improvement works