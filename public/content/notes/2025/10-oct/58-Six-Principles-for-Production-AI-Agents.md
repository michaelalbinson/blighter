-----------------------
articleLink: https://www.app.build/blog/six-principles-production-ai-agents
articleTitle: Six Principles for Production AI Agents
createdOn: 2025-10-19T01:35:16.037Z
updatedOn: 2025-10-19T01:35:16.037Z
-----------------------

- invest in your system prompt
  - modern LLMs just need direct detailed context, no tricks, but clarity and lack of contradictions
  - ensure your instructions are direct and detailed
- split the context
  - models are subject to attention attrition (struggle to focus in very long context windows)
  - provide the bare minimum required up front, allow more to be pulled from tools
  - context compaction can help a lot
  - separate context windows for orchestration + result analysis can be helpful
- design tools carefully
  - good tools operate on a similar level of granularity and don't have many parameters
    - parameters should be strictly typed
  - idempotency is recommended
- design a feedback loop
  - allow LLM actors to be creative, with strict supervising critics
  - your system should handle hard + soft failures w/ different recovery strategies
- LLM-driven error analysis
- frustrating behavior signals system issues
  - LLMs are pretty good at following instructions, if they're failing often it can be systematic