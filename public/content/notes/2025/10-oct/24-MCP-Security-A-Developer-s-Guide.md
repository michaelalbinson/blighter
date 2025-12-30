-----------------------
articleLink: https://www.docker.com/blog/mcp-security-explained/
articleTitle: MCP Security: A Developer’s Guide
createdOn: 2025-10-14T01:40:37.592Z
updatedOn: 2025-10-14T01:40:37.592Z
-----------------------

- These security risks span across the entire development lifecycle and involve:
  - Supply chain: how servers are packaged, signed, versioned, and approved.
  - Runtime isolation: how they’re executed on the host vs. in containers, with CPU/memory/network limits.
  - Brokered access: how calls are mediated, logged, blocked, or transformed in real time.
  - Client trust: which tools a given IDE/agent is allowed to see and use.
- Misconfigurations & weak defaults
  - Running servers directly on the host with broad privileges or a persistent state.
  - Unrestricted network egress from tools to the public internet.
  - Unvetted catalogs/registries in client configs, exposing agents to unknown tools.
  - No audit trail for tool calls-hard to investigate or respond.
  - Localhost-exposed MCP services (ex. CVE-2025-49596).
  - mitigation: Always follow MCP server best practices such as:
    - leveraging containerization
    - applying resource and network limits
    - maintaining an allowlist of approved tools
    - capturing call logs centrally
- Malicious or compromised servers
  - Typosquatting/poisoned images or unsigned builds.
  - Hidden side effects or altered tool metadata that nudges agents into risky actions.
  - Command injection that enables arbitrary code execution (ex. CVE-2025-6514).
  - mitigation: Require signature verification, pin versions/digests, and pull from curated sources
- Secret management failures
  - Plaintext credentials in environment variables, prompts, or tool arguments.
  - Leakage via tool outputs or model completions.
  - mitigation: Strict tool allowlists, pre/post‑call interceptors, and output filtering at the gateway
- More mitigations
  - Containerize every MCP server
  - Centralize enforcement at a gateway (broker)
  - Govern secrets end‑to‑end
    - Store secrets in a managed system;
    - avoid .env files.
    - Prefer short‑lived tokens.
    - Sanitize prompts and tool outputs to reduce exposure.
  - Defend the prompt layer
    - pre‑call interceptors (argument/type checks, safety classifiers)
    - post‑call interceptors (redaction, PII scrub)
    - strict tool scoping to reduce prompt‑injection blast radius
  - Harden the supply chain
    - Pull servers from curated sources, pin versions
  - Monitor and rehearse
    - Alert on anomalous tool sequences






