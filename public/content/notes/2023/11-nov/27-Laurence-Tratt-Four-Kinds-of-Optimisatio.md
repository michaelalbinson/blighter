-----------------------
articleLink: https://tratt.net/laurie/blog/2023/four_kinds_of_optimisation.html
articleTitle: Laurence Tratt: Four Kinds of Optimisation
createdOn: 2023-11-16T15:52:04.938Z
updatedOn: 2023-11-16T15:52:04.938Z
-----------------------

- Use a better algorithm.
  - understand the wider context of your system and the algorithm you want to use
  - make sure the one you pick has good real-world performance on your problem domain
- Use a better data-structure.
  - generally you don't need to build your own - use off the shelf where you can
  - in most cases a simpler data structure is better
- Use a lower-level system.
  - e.g. rewrite it in rust lol -> generally not a quick thing to do, creates instability in short term
  - think if you really need to drop to another language or if you can leverage your language better
  - sometimes a different interpreter/runtime is all you need
- Accept a less precise solution. 
  - local search can be used to shortcut operations
    - define a metric to compare two solutions and discard the worst of the two
    - this helps to find local optima