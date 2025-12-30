-----------------------
articleLink: https://blog.trailofbits.com/2025/07/28/we-built-the-security-layer-mcp-always-needed/
articleTitle: We built the security layer MCP always needed -The Trail of Bits Blog
createdOn: 2025-10-19T00:56:25.978Z
updatedOn: 2025-10-19T00:56:25.978Z
-----------------------

- key features
  - Trust-on-first-use pinning for server instructions and tool descriptions
    - pin MCP tool names/descriptions until manual user review occurs
  - LLM guardrail integration to scan tool descriptions and server instructions for prompt injection payloads
    - Tools to take a look at LlamaFirewall, NeMo Guardrails, Bedrock
  - Optional sanitization of ANSI control characters
- limitation: no access to conversation history
  - LlamaFirewall's AlignmentCheck in theort could do this
- f MCP servers are updated frequently, organizations should consider centralized review by security engineers rather than relying on individual users