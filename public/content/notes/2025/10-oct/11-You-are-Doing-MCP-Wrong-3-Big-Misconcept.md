-----------------------
articleLink: https://www.docker.com/blog/mcp-misconceptions-tools-agents-not-api/
articleTitle: You are Doing MCP Wrong: 3 Big Misconceptions
createdOn: 2025-10-14T00:42:11.863Z
updatedOn: 2025-10-14T00:42:11.863Z
-----------------------

- Misconception #1: “MCP is just another API”
  - What MCP actually gives you
    - Tool interfaces for models that carry intent and affordances, not just endpoints.
    - Context surfaces beyond request/response: prompts, elicitations, and resources that shape model behavior.
    - A seam between non-deterministic planning and deterministic execution so the last mile can be reliable.
  - Design patterns that work
    - API behind MCP
    - Deterministic “last mile" - Treat tool execution as deterministic and idempotent where possible, f
  - Anti-patterns to avoid
    - Treating MCP tools as business APIs with complex state changes and no guardrails.
    - Expecting strict schema obedience without model-aware validation and retries.
  - mini-checklist
    - Define tool preconditions and postconditions.
    - Return machine-checkable outcomes the agent can evaluate.
    - Log plan → tool → result so you can replay and audit.
- Misconception #2: “Tools are agents”
  - What separates agents from tools
    - Agency: goal tracking, re-planning, and error recovery.
    - Evaluation: fitness functions and success criteria, not just status codes.
    - Memory and context: prompts and resources evolve across steps.
  - Design patterns that work
    - Control loop outside the tool
    - Explicit success metrics for the agent
    - Human elicitation via MCP
  - Anti-patterns to avoid
    - Cramming planning into a single tool invocation.
    - Measuring “agent performance” only with tool latency.
  - Mini-checklist
    - Write the agent’s goal, constraints, and stop conditions.
    - Add retries with backoff and tool-specific error handling.
    - Capture traces for each loop iteration.
- Misconception #3: “MCP is just tools”
  - What you miss if you ignore the rest
    - Resources: structured artifacts the agent can read, write, and reference across steps.
    - Prompts: reusable, versioned instruction sets the system can attach, test, and audit.
    - Elicitations: structured human-in-the-loop requests when only a user can resolve ambiguity.
  - Design patterns that work
    - Resource adapters: Map knowledge bases, files, and tickets into MCP resources with permissions and lifecycle.
    - Prompt registries: Treat prompts like code. Version, test, and roll back.
    - Human checkpoints: Define when to elicit user input and how to resume the loop afterward.
  - Anti-patterns to avoid
    - Using MCP as a “voice layer” over existing services without resources or prompts.
    - Hard-coding long prompts inside the application rather than managing them via MCP.
  - Mini-checklist
    - Expose at least one resource type the agent can read and one it can write.
    - Register prompts with IDs and versions.
    - Define user elicitation flows for low-confidence branches.
- Putting it together: The architecture seam that makes AI reliable
  - Non-deterministic layer: model planning, tool choice, re-planning, evaluation.
  - Deterministic layer: tool execution, input validation, idempotency, side-effect control.
  - MCP as the seam: tools, resources, prompts, and elicitations connect the two layers with observable traces and policies.








 
