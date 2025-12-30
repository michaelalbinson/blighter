-----------------------
articleLink: https://addyo.substack.com/p/my-llm-coding-workflow-going-into
articleTitle: My LLM coding workflow going into 2026 - by Addy Osmani
createdOn: 2025-12-30T07:49:28.566Z
updatedOn: 2025-12-30T07:49:28.566Z
-----------------------

- Start with a clear plan (specs before code)
  - define the problem and plan a solution - create a detailed spec with the AI
  - ask LLM to ask questions iteratively until you feel requirements and edge cases are covered
  - compile results into a spec.md w/
    - requirements
    - arch decisions
    - data models
    - testing strategy
- break work into small iterative chunks
  - tackle them one-by-one
  - use test driven development to help you
- provide extensive context + guidance
  - LLMs are only as good as the guidance you give them
  - context packing effectively is critical for success
- choose the right model
  - if one model doesn't work well, try another
- leverage ai coding across the lifecycle
  - async coding agents, CLI agentic tools
  - AI agents still can't code entire features unattended
- keep a human in the loop to verify, test and review everything
  - you are still responsible for code quality
  - you must test what it writes
  - do code reviews - and give them extra scrutiny
- commit often and use version control as a safety net
  - don't commit code you can't explain
  - frequent commits help you undo AI mistakes
  - branches and worktrees are helpful to isolate experiments
- customize agent behavior with rules and examples
  - provide style guides, examples and rule files to improve output
  - set tone with custom instructions and system prompts
- embrace testing and automation as force multipliers
  - CI/CD, linters and code review bots help catch mistakes automatically and early
- continuously learn and adapt