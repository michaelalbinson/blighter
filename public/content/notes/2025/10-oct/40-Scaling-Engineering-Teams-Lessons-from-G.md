-----------------------
articleLink: https://greenido.wordpress.com/2025/09/25/scaling-engineering-teams-lessons-from-google-facebook-and-netflix/
articleTitle: Scaling Engineering Teams: Lessons from Google, Facebook, and Netflix | Ido Green
createdOn: 2025-10-14T02:38:28.706Z
updatedOn: 2025-10-14T02:38:28.706Z
-----------------------

- Google’s OKR Magic
  - The 70% Rule: Google doesn’t expect 100% completion on OKRs
  - 100% proves you weren’t ambitious enough. The sweet spot is 60–70%.
  - Practical Implementation:
    - Quarterly engineering OKRs - 3-5 per team, 2-4 measurable goals each
    - some teams did personal OKRs, some didn't
    - weekly check ins on goals
- Netflix’s Context Over Control Philosophy
  - North Star Metrics: Every team has one metric to obsess over. If you have five, you have none.
  - Quarterly Business Reviews (QBRs)
  - The Keeper Test: Ask yourself: “If this engineer wanted to leave, would I fight to keep them?” If the answer is no, then you should not have them in the team.
- Code Quality: The Non-Negotiable Foundation (Facebook)
  - Code review on every line: Nothing merges without another pair of eyes.
  - Code owners: Somebody owns every corner of the repo, even the haunted legacy directory.
  - Automated testing gates: Your code doesn’t ship unless the robots bless it
- Netflix’s Chaos-as-a-Feature Approach
  - Chaos Monkey: Randomly kills instances
  - Game Days: Teams simulate major outages
  - Canary Deployments: Roll code out to 1% of users
- Fostering Engineering Culture at Scale
  - Google’s Innovation Time
    - Innovation Fridays: One afternoon a month for experiments.
    - Hackathons: Quarterly—yes, with prizes, because nothing motivates like bragging rights.
    - Tech Talks: Share your weird side projects before they accidentally turn into billion-dollar businesses.
  - Facebook’s Bootcamp: Onboarding with Superpowers
    - Week 1–2: Learn the tools and infra. You commit some code in the first few days. It’s really cool.
    - Week 3–4: Fix bugs everywhere—yes, in production code.
    - Week 5–6: Shadow seniors, then pick a team you actually want to join.
  - Netflix’s High-Performance Culture
    - Skip-level meetings: Leaders meet ICs directly. Gossip filtered through managers = lost signal.
    - 360 Feedback: Because nobody wants surprises at performance reviews.
- Scaling Frameworks That Don’t Suck
  - Amazon’s Two-Pizza Rule: If two pizzas can’t feed your team, it’s too big.
  - Conway’s Law Awareness: Your org chart is your architecture. Build microservices? Expect micro-teams. 
  - Spotify Model (with tweaks): Squads, tribes, guilds, chapters
- The Hard Truths About Scaling
  - Doesn’t Scale: Hero culture, manual processes, tribal knowledge, ad-hoc communication.
  - Does Scale: Systems, documentation, automation, and clear ownership.