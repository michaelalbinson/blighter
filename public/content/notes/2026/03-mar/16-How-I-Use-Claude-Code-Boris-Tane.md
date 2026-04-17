-----------------------
articleLink: https://boristane.com/blog/how-i-use-claude-code/
articleTitle: How I Use Claude Code | Boris Tane
createdOn: 2026-03-06T18:53:12.457Z
updatedOn: 2026-03-06T18:53:12.457Z
-----------------------

- Phase 1: Research
  - start with a deep-read directive - ask Claude to understand topic thoroughly
  - require the findings to be written into a persistent markdown file
  - example prompt:
```
read this folder in depth, understand how it works deeply, what it does and all its specificities. when that’s done, write a detailed report of your learnings and findings in research.md

study the notification system in great details, understand the intricacies of it and write a detailed research.md document with everything there is to know about how notifications work

go through the task scheduling flow, understand it deeply and look for potential bugs. there definitely are bugs in the system as it sometimes runs tasks that should have been cancelled. keep researching the flow until you find all the bugs, don’t stop until all the bugs are found. when you’re done, write a detailed report of your findings in research.md
```

- Phase 2: Planning
  - ask for a detailed implementation plan in a separate markdown file
  - if you've seen a good implementation in an open source repo, share it as a reference alongside the plan request
  - sample prompt:

```
I want to build a new feature <name and description> that extends the system to perform <business outcome>. write a detailed plan.md document outlining how to implement this. include code snippets

the list endpoint should support cursor-based pagination instead of offset. write a detailed plan.md for how to achieve this. read source files before suggesting changes, base the plan on the actual codebase
```

- Phase 2.5: The Annotation Cycle
  - Open the plan and add inline notes
    - the notes correct assumptions, reject approaches, add constraints, or provide domain knowledge
  - Repeat until satisfied
  - Ask for a granular task (todo) list

- Phase 3: Implementation
```
implement it all. when you’re done with a task or phase, mark it as completed in the plan document. do not stop until all tasks and phases are completed. 
do not add unnecessary comments or jsdocs, do not use any or unknown types. continuously run typecheck to make sure you’re not introducing new issues.
```
- Phase 3.5: Feedback During Implementation
  - role shifts from architect to supervisor
  - implementation correction is often a single sentence
  - reference existing code constantly
  - Staying in the Driver’s Seat (don't turn your brain off™️)
    - never give it total autonomy over what gets built. 
    - failure modes you add value in:
      - trim scope from plans
      - cherry-pick the best proposals
      - protect existing surfaces
      - override technical choices

- Meta
  - author runs all phases in one long conversation
  - tl;dr: Read deeply, write a plan, annotate the plan until it’s right, then let Claude execute the whole thing without stopping, checking types along the way.