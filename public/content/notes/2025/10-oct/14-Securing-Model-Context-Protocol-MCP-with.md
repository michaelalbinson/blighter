-----------------------
articleLink: https://goteleport.com/blog/securing-model-context-protocol-with-teleport-and-aws/
articleTitle: Securing Model Context Protocol (MCP) with Teleport and AWS
createdOn: 2025-10-14T00:52:42.272Z
updatedOn: 2025-10-14T00:52:42.272Z
-----------------------

- MCP servers typically authenticate using static credentials or API keys, creating persistent attack surfaces
- the protocol should be enhanced with comprehensive logging and audit trails, which are not inherently included today
- common security gaps
  - Over-Privileged Access Patterns
  - Credential Management Failures
  - Audit and Compliance Blindness
- Zero-trust arch for AI
  - AI agents cannot access resources without valid roles and approved tasks
  - enforce trust boundaries between the LLM, external sources, and extensible functionality