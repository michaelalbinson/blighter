-----------------------
articleLink: https://ntietz.com/blog/how-i-debug-2023/
articleTitle: A systematic approach to debugging | nicole@web
createdOn: 2023-09-21T02:10:01.342Z
updatedOn: 2023-09-21T02:10:01.342Z
-----------------------

TL;DR: pretty basic debugging tips, but helpful is your brain is melting

Approach:
- Figure out the symptoms
  - questions:
    - When did the bug start happening?
    - How many people have experienced it? Reported it?
    - Who noticed it first?
    - What environments does it occur in?
- Reproduce the bug
- Understand the system(s)
  - questions
    - What code is currently running?
    - When was it last deployed?
    - What were the recent changes?
    - Does the appearance of the bug coincide with a deployment or another change?
- Form a hypothesis about where the bug is
  - questions
    - Which component of our system contains the bug? Is it just one, or multiple?
    - Is the bug in the component, or in the interactions between components?
- Test this hypothesis, and repeat if needed
- Fix the bug! Check the fix, and repeat if needed
