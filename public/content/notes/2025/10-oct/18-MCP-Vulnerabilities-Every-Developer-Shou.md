-----------------------
articleLink: https://composio.dev/blog/mcp-vulnerabilities-every-developer-should-know
articleTitle: MCP Vulnerabilities Every Developer Should Know - Composio
createdOn: 2025-10-14T01:20:45.860Z
updatedOn: 2025-10-14T01:20:45.860Z
-----------------------

- Tool Description Injection is real.
- The authentication situation is not great. OAuth is often skipped or poorly implemented. 
  - MCP servers must implement OAuth 2.0/2.1 as resource servers (as of 2025-06-18)
  - Default configurations still skip authentication entirely
- Supply Chain Risk & tool poisoning is underestimated.
  - Always
    - verify code
    - Inspect schemas for any unusual parameters
    - pin tool versions (avoid auto-updating dependencies)
    - prefer signed or containerised distributions when possible
- Real-world security failures have already happened. 
- The latest spec introduces security best practices like no token passthrough and enforced user consent. But most implementations simply ignore them.
- security strategies
  - managed OAuth implementation
  - Granular auth - per-tool, per-scope, per-session
  - customer MCP tool selection
    - don't load full toolsets - only a selection
  - tool logging/observability
- What’s Still Missing (and Needs Fixing)
  - Most publicly available tools are still unsanitized
  - Public packages can be easily poisoned and silently compromise AI agents
  - Tool limitations are the most significant factor limiting the use of MCP servers
