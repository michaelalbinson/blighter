-----------------------
articleLink: https://medium.com/workday-engineering/when-your-user-isnt-human-designing-systems-for-agent-experience-ax-8ba586913ce1
articleTitle: When Your User Isn’t Human: Designing Systems for Agent Experience (AX) | by Krissy Conant | Workday Technology Blog | Medium
createdOn: 2025-10-19T00:27:18.907Z
updatedOn: 2025-10-19T00:27:18.907Z
-----------------------

- Agent Access Security
  - scoped tokens is interesting - scope permission scope of tokens only to things the agent should be able to do
  - Authenticate with scoped access tokens (e.g., JWTs) issued only after verifying identity and permissions.
  - Apply rate limiting to authentication endpoints to protect against brute-force attempts.
  - Validate and sanitize all inputs, even from trusted sources.
  - Return standardized error codes like 401, 403, 422 with machine-readable messages 
- agent observability
  - Tag logs by actor type + contextual metadata (agentId, userId, etc)
  - Maintain clean audit trails for agent-driven decisions that impact business logic
  - Monitor workflows for anomalies, unexpected retries, or decision loops
  - Log unauthorized or unexpected access attempts for visibility, auditing, and incident response
- 