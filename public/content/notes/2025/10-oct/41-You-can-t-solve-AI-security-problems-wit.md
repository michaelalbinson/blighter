-----------------------
articleLink: https://simonwillison.net/2022/Sep/17/prompt-injection-more-ai/
articleTitle: You can’t solve AI security problems with more AI
createdOn: 2025-10-18T22:30:33.394Z
updatedOn: 2025-10-18T22:30:33.394Z
-----------------------

- adding more AI doesn't help with multilayered injection
- ideas
  - first pass classification of the incoming user text to see if it looks like it includes an injection attack. If it does, reject it.
  - Before delivering the output, run a classification to see if it looks like the output itself has been subverted
  - modify the prompt you generate to mitigate attacks - e.g. a
- false positives are a major problem
  - multi-tiered escaping/injection undermines usability
- we need complete confidence in a solution
  - 99% solutions are no good in the security world
  - anyone that can type can craft an attack
- original sin here remains combining a pre-written instructional prompt with untrusted input from elsewhere
- there may be systems that should not be built at all until we have a robust solution