-----------------------
articleLink: https://openai.com/index/hardening-atlas-against-prompt-injection/
articleTitle: Continuously hardening ChatGPT Atlas against prompt injection attacks | OpenAI
createdOn: 2025-12-30T08:55:56.607Z
updatedOn: 2025-12-30T08:55:56.607Z
-----------------------

- Atlas = browser automation agent
- long term security vision
  - leverage white-box access to the model to assess alignment
  - deep understanding of model defenses
  - compute scale to stay ahead of attackers to find exploits early and ship mitigations faster
- Prompt injection is an open challenge for agent security
- Automated prompt injection attack discovery through end-to-end and high-compute reinforcement learning
  - built an LLM-based automated attacker to do red-teaming
  - simulator that returns a full reasoning and action trace of the victim agent
  - privileged access to the reasoning traces of the defender gives our internal attacker an asymmetric advantage
  - the RL-trained attacker can steer an agent into executing sophisticated, long-horizon harmful workflows over tens/hundreds of steps
- Hardening ChatGPT Atlas with a proactive rapid response loop
  - Adversarial training against newly discovered attacks
  - Use attack traces to improve the broader defense stack
  - Responding to active attacks
    - traces help to detect and respond to attacks in the wild
- Prompt injection, much like scams and social engineering on the web, is unlikely to ever be fully “solved”
- Advice for using agents safely
  - limit logged-in access
  - carefully review confirmation requests
  - give agents explicit instructions where possible