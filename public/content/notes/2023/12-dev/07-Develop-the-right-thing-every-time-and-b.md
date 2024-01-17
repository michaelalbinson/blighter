-----------------------
articleLink: https://dev.to/wasp/develop-the-right-thing-every-time-and-become-a-10x-engineer-the-art-of-writing-rfcs-2mc6
articleTitle: Develop the right thing every time and become a 10x engineer 🏆: The art of writing RFCs 🥋 - DEV Community
createdOn: 2023-12-08T00:45:33.908Z
updatedOn: 2023-12-08T00:51:07.099Z
-----------------------

- what is an RFC
  - purpose is to find the best way to solve a problem before the implementation starts
- when should I write an RFC, and when should I skip
  - bugs/simple features don't need one
  - new concepts, multi-month projects could always use one
  - litmus test:
    - Is there more than one obvious way to implement this feature?
    - Is there a new library/service we have to pick?
- why use an RFC?
  - You will organize your thoughts and get clarity
  - You will learn more
  - You will crowdsource your team’s knowledge
  - You will advance your team’s understanding of the codebase
  - PR reviews will go much smoother
  - Your documentation is already 50% done
- how to write one
  - include
    - metadata (Title, date, reviewers, etc)
    - problem/goal
      - The better you define the problem or the goal/feature you need to implement, and why you need to do it the easier your life will be
      - include: high level summary, context, problem/goal, extra details, non-goals
    - proposed solution
      - write pseudocode, find out how others are doing it
    - implementation overview
    - remarks/open questions
