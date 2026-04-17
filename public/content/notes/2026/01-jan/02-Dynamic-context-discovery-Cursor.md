-----------------------
articleLink: https://cursor.com/blog/dynamic-context-discovery?
articleTitle: Dynamic context discovery · Cursor
createdOn: 2026-01-27T19:18:35.952Z
updatedOn: 2026-01-27T19:18:35.952Z
-----------------------

- As models have become better as agents, we've found success by providing fewer details up front, making it easier for the agent to pull relevant context on its own

Key points:
1. Turning long tool responses into files - mostly for 3rd party tools that don't get the memo
  - when designing tools, try to prevent context bloat
2. Referencing chat history during summarization - keep history in files that can be searched later
3. Supporting the Agent Skills open standard
4. Efficiently loading only the MCP tools needed
5. Treating all integrated terminal sessions as files
6. Simple abstractions - files are convenient now, but may not forever be the best way to allow for dynamic context discovery
