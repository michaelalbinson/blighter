-----------------------
articleLink: https://kyleshevlin.com/design-system-retrospective/
articleTitle: Design System Retrospective | Kyle Shevlin
createdOn: 2024-06-04T14:11:09.646Z
updatedOn: 2024-06-04T14:11:09.646Z
-----------------------

- problems to solve
  - inconsistency across products
  - developer velocity
  - bad existing design system library
- solution
  - built a chakra-ui inspired box base class
  - people struggled to build things compositionally though
  - problem with solution: Chakra UI-like system had almost no escape hatches
    - You either had to really understand how to compose your way to a solution, or you were stuck
- what they would do differently
  - would have rebuilt using tailwind/nativewind