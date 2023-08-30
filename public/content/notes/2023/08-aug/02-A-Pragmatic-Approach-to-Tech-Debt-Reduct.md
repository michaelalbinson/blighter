-----------------------
articleLink: https://developers.soundcloud.com/blog/a-pragmatic-approach-to-tech-debt-reduction
articleTitle: A Pragmatic Approach to Tech Debt Reduction
createdOn: 2023-08-29T04:04:44.280Z
updatedOn: 2023-08-29T04:04:44.280Z
-----------------------

- how much tech debt is too much?
  - tipping point: why do we need to take action? - the project eventually becomes unmaintainable
    - changes take too long
    - system is difficult to test
    - high risk of unintended consequences/regressions
    - bad experiences with code base lead to loss of institutional knowledge/reluctance to work on project
  - productivity losses
- paying down tech debt
  - options:
    - radical actions:
      - full rewrite - may be the only option for systems that have passed the debt tipping point
      - full deletion - last resort (common for unstable tests)
    - radical inaction - persistent inaction leads to the tech debt tipping point
    - pragmatic middle way:
      - you will never remove all tech debt
      - remove the important tech debt
        - "important tech debt" litmus tests
          - how important is this system
          - is system fit for its purpose
          - is system easy to understand/well documented
          - how often will this system change/be maintained
          - is system dependent on deprecated libraries/technologies
          - how many people are comfortable working on this system
- case study: converting a microservice to a batch pipeline
  - combined rewrite with rework of some parts of another older tech debt-heavy system (two birds, one stone)
- conclusion: tech debt is hard, and you must find balance