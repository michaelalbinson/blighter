-----------------------
articleLink: https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html
articleTitle: Harness Engineering
createdOn: 2026-03-06T17:21:42.482Z
updatedOn: 2026-03-06T17:21:42.482Z
-----------------------

three components:
- Context engineering - Continuously enhanced knowledge base in the codebase + alerting and browser navigation
- Architectural constraints - monitored by LLM-based agents, but also deterministic custom linters and structural tests
- Garbage collection - Agents run periodically to find inconsistencies in documentation or violations of architectural constraints

When the agent struggles treat it as a signal:
- identify what is missing — tools, guardrails, documentation — and feed it back into the repository, always have Codex write the fix.

is it worth developing harnesses for older apps/retrofitting them?
- ex. running a static code analysis tool on a codebase that’s never had one, and then drowning in alerts