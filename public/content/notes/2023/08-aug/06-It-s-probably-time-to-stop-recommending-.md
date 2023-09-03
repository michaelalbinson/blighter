-----------------------
articleLink: https://qntm.org/clean
articleTitle: It's probably time to stop recommending Clean Code @ Things Of Interest
createdOn: 2023-08-31T21:59:31.695Z
updatedOn: 2023-08-31T21:59:31.695Z
-----------------------

- major problem - a lot of the example code is _bad_
- strongest piece of advice: functions should not mix levels of abstraction
- other good advice:
  - boolean flags are bad - use enums instead
  - function names should be descriptive + consistent using verb phrases
  - functions should do one thing
  - functions shouldn't have side-effects
  - functions should either do something, or answer a question - not both
- (arguable) anti-patterns
  - reading source files should be a narrative (just use IDEs to jump to relevant parts)
  - over-advocacy of DRY
  - functions should not hold nested control structures
  - short and concise functions with minimal arguments
- much of the book is no longer useful and is mostly filler
- to reduce the formatting chapter to a sentence: "Pick a sensible standard formatting, configure automated tools to enforce it, and then never think about this topic again"
- only focuses on java
- A Philosophy of Software Design (2018) by John Ousterhout is a more positive experience
- Experienced programmers will get almost nothing out of reading Clean Code