-----------------------
articleLink: https://blog.bytebytego.com/p/how-linkedin-built-an-ai-powered
articleTitle: How LinkedIn Built an AI-Powered Hiring Assistant
createdOn: 2025-12-30T08:24:04.248Z
updatedOn: 2025-12-30T08:24:04.248Z
-----------------------

- what's hard about recruiting
  - sourcing candidates
  - evaluating sourced candidates
  - engaging candidates
- hiring assistant
  - efficiently sorts to source qualified people
  - interactively communicates to understand recruiter intent
- internals
  - uses a ReAct pattern for inference with a planner and executor agent
  - then uses a divide and conquer strategy
    - expensive, big models for planning
    - cheap, small models for constrained tasks
- UX
  - interactive mode - give immediate feedback and monitor progress
  - async mode - shifts here after assistant knows what the recruiter wants
  - cross-device sync on running sessions
- specialized sub-agents
  - intake agent
  - sourcing agent
  - evaluation agent
  - candidate outreach agent
  - candidate screening agent
  - learning agent
    - allows the system to improve over time
  - memory agent