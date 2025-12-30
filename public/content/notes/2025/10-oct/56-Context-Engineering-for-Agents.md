-----------------------
articleLink: https://rlancemartin.github.io/2025/06/23/context_engineering/
articleTitle: Context Engineering for Agents
createdOn: 2025-10-19T01:18:10.147Z
updatedOn: 2025-10-19T01:18:10.147Z
-----------------------

- context engineering for agents - concerns:
  - Context Poisoning: When a hallucination makes it into the context
  - Context Distraction: When the context overwhelms the training
  - Context Confusion: When superfluous context influences the response
  - Context Clash: When parts of the context disagree
- write context - save it outside the context window to help an agent perform a task.
  - scratchpads (within the agentic session)
  - long-term memory (across agentic sessions)
  - state (current session's context)
- select context - pull it into the context window to help an agent perform a task.
  - scratchpad - can do the whole thing or specific sections (if developer controlled)
  - memories - only select relevant ones
    - embeddings or knowledge graphs can be helpful here
  - tools - only provide relevant tools to contedt (e.g. RAG tool descriptions)
  - knowledge - RAG out relevant data into context
- compress context - retain only the tokens required to perform a task.
  - summarize context, e.g. auto-compact (recursive or hierarchical summarization)
    - can also summarize large tool outputs
  - context trimming - remove context that's irrelevant or unhelpful
- isolate context - splitting context up to help an agent perform a task.
  - multi-agent - each (narrowly-focused) agent gets dedicated context
  - environments - managing context returned to the agent helps manage token-heavy objects (e.g. files, images)
  - state - hold heavy state in an parallel data model which the agent can read/write from/to
 