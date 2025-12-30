-----------------------
articleLink: https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/
articleTitle: Model Context Protocol has prompt injection security problems
createdOn: 2025-10-18T23:03:29.011Z
updatedOn: 2025-10-18T23:03:29.011Z
-----------------------

- Rug pulls and tool shadowing
  - Rug Pull: Silent Redefinition - tools can mutate their own definitions after installation
  - Cross-Server Tool Shadowing - multiple servers connected to the same agent, a malicious one can override or intercept calls made to a trusted one
- Tool poisoning prompt injection
  - prompt injection where malicious instructions are tucked away in the tool descriptions
- Mixing tools with untrusted instructions is inherently dangerous
  - these challenges are present any time we provide tools to an LLM that can potentially be exposed to untrusted inputs
- from the spec: 
  - Provide UI that makes clear which tools are being exposed to the AI model
  - Insert clear visual indicators when tools are invoked
  - Present confirmation prompts to the user for operations, to ensure a human is in the loop
- author suggests treating these as musts, not shoulds
