-----------------------
articleLink: https://www.thepragmaticcto.com/p/lines-of-code-are-back-and-its-worse
articleTitle: Lines of Code Are Back (And It&#x27;s Worse Than Before)
createdOn: 2026-03-06T17:33:16.070Z
updatedOn: 2026-03-06T17:33:16.070Z
-----------------------

- LoC issue - encourages the writing of insipid code
- Every major tech CEO is now competing on what percentage of their code is written by AI
- Goodhart's Law: when a measure becomes a target, it ceases to be a good measure
- LOC failed as a human metric because it was gameable
  - AI makes the metric infinitely gameable
  - cost of generating a line of code is now functionally zero
- if the cost of generating code is zero, what does the volume of generated code tell you? The answer is nothing. It tells you nothing.
- Acceptance Rate Is Not Better
  - it tells you nothing about what happens after the AI writes code
- LOC indicates tool usage levels, even if it says nothing about value delivered
- (AI coding tools) are useful for boilerplate, for exploring unfamiliar APIs, for rubber-ducking problems, for rapid prototyping
- four metrics that survive Goodhart's law:
  - Time-to-value (how long from identified need to working feature in production
  - Code half-life (how long does new code survive before it needs revision)
  - Defect origin rate (percentage of production defects trace back to AI-generated code versus human-written code)
    - don't use as a blame metric
  - Comprehension coverage (can someone on the team explain how every critical path in the system works)
    - If the answer is "the AI wrote that and nobody reviewed the logic," you have a time bomb
    - Code that nobody understands is code that nobody can debug, extend, or secure