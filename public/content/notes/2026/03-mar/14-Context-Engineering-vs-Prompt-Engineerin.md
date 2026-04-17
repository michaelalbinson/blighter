-----------------------
articleLink: https://newsletter.systemdesign.one/p/context-engineering-vs-prompt-engineering
articleTitle: Context Engineering vs Prompt Engineering
createdOn: 2026-03-06T18:38:12.627Z
updatedOn: 2026-03-06T18:38:12.627Z
-----------------------

pillars:
- Memory Management
  - Short-term memory
  - long-term memory
- RAG
  - Hybrid Search - combine traditional keyword search with semantic vector search
  - Smart filtering - extract only the relevant chunks, ranked by relevance
- State Management
  - Workflow Tracking
  - Progress Indicators
- Tool Access
  - Function Schemas
  - Orchestrator Execution
  - Handling Failures
    - timeouts
    - errors
    - ambiguous results - tool returns unclear or partial data - agent might call additional tools to verify, request human confirmation, or explicitly note the uncertainty

When context exceeds limits, have a priority of information retained
- system prompt
- current state
- recent tool outputs
- retrieved documents/context
- user profile/long-term memory
- conversation history
- few-shot examples

Runtime prompt generation can also be a useful tool for getting better outcomes
