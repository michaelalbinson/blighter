-----------------------
articleLink: https://blog.eliperkins.com/great-contributions-to-a-codebase
articleTitle: What makes a great contribution to a codebase? · Blog · Eli Perkins
createdOn: 2024-06-13T02:40:34.613Z
updatedOn: 2024-06-13T02:40:34.613Z
-----------------------

- dev principles
  - testing
    - leverage unit tests to prevent bugs/regressions
    - prefer unit tests to snapshot tests (UI work)/ITs
  - core before more
    - prefer well tested features over corner-cutting solutions
    - use TODOs with linked issues to track follow ups
    - leverage feature flags to roll out features
    - refactor existing code in=place
    - prefer consistency in patterns/code style
  - atomic/small PRs
    - use stacked pull requests to break down a large diff/set of features
  - code review
    - review PRs from other projects
    - ask for tests during code reviews
  - submitting PRs
    - use PR templates
    - git commit style
      - use present tense ("Add feature" not "Added feature")
      - use imperative mood ("Move cursor to..." not "Moves cursor to...")
      - limit first line to 80 characters or less
      - focus on why not what in the commit message
      - reference related issues/PRs after the first line
      - avoid commits like "fix bug"
  - ADR (architecture decision records) - use them
  - project planning
    - estimate time including time required to write testable code
    - break down epics into smaller milestones that ship more often
  - submitting bug reports
    - use clear and descriptive titles
    - describe the exact steps which reproduce the problem
    - provide specific examples to demonstrate the steps
    - describe the behavior observed after following the steps
    - explain the expected befavior and why
    - include screenshots