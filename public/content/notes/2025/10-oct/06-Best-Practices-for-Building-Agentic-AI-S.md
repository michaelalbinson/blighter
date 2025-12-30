-----------------------
articleLink: https://userjot.com/blog/best-practices-building-agentic-ai-systems
articleTitle: Best Practices for Building Agentic AI Systems: What Actually Works in Production - UserJot
createdOn: 2025-10-14T00:22:18.478Z
updatedOn: 2025-10-14T00:22:18.478Z
-----------------------

- The Two-Tier Agent Model That Actually Works
  - Primary Agents handle the conversation. They understand context, break down tasks, and talk to users
  - Subagents do one thing well. They get a task, complete it, return results
- Stateless Subagents: The Most Important Rule
  - Every subagent call should be like calling a pure function with the same input producing the same output, no shared memory, no conversation history, no state
  - allows for more predictable behavior, easier to coach, easier to cache, easier to test
- Task Decomposition: How to Break Things Down
  - Vertical decomposition for sequential tasks (do thing B after thing A)
  - Horizontal decomposition for parallel work (e.g. research multiple topics at once)
  - you can mix composition for better performance
- Communication Protocols That Don’t Suck
  - Every task from primary to subagent needs: clear objective, bounded context, output specification, constraints
  - Every response needs: status, result, metadata, recommendations
- Agent Specialization Patterns
  - specialize agents by capability, domain and/or model - Don’t over-specialize
- Orchestration Patterns We Actually Use
  - Sequential Pipeline
    - Agent A → Agent B → Agent C → Result
  - MapReduce Pattern
    - Input ─┼→ Agent 1/2/3 ─┼→ Reducer → Result
  - Consensus Pattern
    - Task ─┼→ Agent 1/2/3 ─┼→ Voting/Merge → Result
  - Hierarchical Delegation (rarely used)
    - Primary -> Secondary -> sub-secondary
- Context Management Without the Mess
  - Level 1: Complete Isolation (no memory/state use 80% of the time)
  - Level 2: Filtered Context - Subagent gets curated relevant background
  - Level 3: Windowed Context: Subagent gets last N messages
- Error Handling That Actually Handles Errors
  - Graceful degradation chain: 
    - Subagent fails → Primary agent attempts task
    - Still fails → Try different subagent
    - Still fails → Return partial results
    - Still fails → Ask user for clarification
  - Retry strategies that work:
    - Immediate retry for network failures
    - Retry with rephrased prompt for unclear tasks
    - Retry with different model for capability issues
    - Exponential backoff for rate limits
- Performance Optimization Without Overthinking
  - model selection - simple tasks get Haiku. Complex reasoning gets Sonnet. Critical analysis gets Opus.
  - parallel execution
  - caching
  - batching - Process 50 feedback items in one agent call instead of 50 separate calls.
- Monitoring: What to Actually Track
  - Task success rate (are agents completing tasks?)
  - Response quality (confidence scores, validation rates)
  - Performance (latency, token usage, cost)
  - Error patterns (what’s failing and why?)

tl;dr:

    Stateless by default: Subagents are pure functions
    Clear boundaries: Explicit task definitions and success criteria
    Fail fast: Quick failure detection and recovery
    Observable execution: Track everything, understand what’s happening
    Composable design: Small, focused agents that combine well

interesting read









