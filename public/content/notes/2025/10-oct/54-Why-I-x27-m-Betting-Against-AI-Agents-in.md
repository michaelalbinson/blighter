-----------------------
articleLink: https://utkarshkanwat.com/writing/betting-against-agents/
articleTitle: Why I&#x27;m Betting Against AI Agents in 2025 (Despite Building Them)
createdOn: 2025-10-19T00:48:29.944Z
updatedOn: 2025-10-19T00:48:29.944Z
-----------------------

- challenges
  - Error rates compound exponentially in multi-step workflows. 95% reliability per step = 36% success over 20 steps. Production needs 99.9%+.
  - Context windows create quadratic token costs. Long conversations become prohibitively expensive at scale.
  - The real challenge isn't AI capabilities, it's designing tools and feedback systems that agents can actually use effectively.
- what works:
  - human review of agent output
  - tool call confirmations
  - clear boundaries, small agents
  - clear success criteria and rollback mechanisms
- build the right way
  - define clear boundaries on what the agent does, and what it hands off to a human
  - design for failure
  - solve the economics
  - solve the economics - stateless calls tend to be better than stateful ones
  - prioritize reliability over autonomy
  - build on solid foundations
    - use ai for understanding intent/generating context
    - use traditional SWE for critical parts - execution, error handling, state management