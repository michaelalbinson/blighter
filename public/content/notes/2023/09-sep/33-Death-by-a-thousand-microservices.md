-----------------------
articleLink: https://renegadeotter.com/2023/09/10/death-by-a-thousand-microservices.html
articleTitle: Death by a thousand microservices
createdOn: 2023-09-21T01:29:13.880Z
updatedOn: 2023-09-21T01:29:13.880Z
-----------------------

- The Church of Complexity
  - [great video](https://youtu.be/y8OnoxKotPQ)
  - microservices enable absurd complexity in organization deployments
- The perfect storm
  - combination of green engineers and FAANG folk celebrated complexity for scalability's sake even if it wasn't needed yet
  - historically distributed systems were respected, feared, and generally avoided
  - audit of startups
    - the ones doing the best now had a brazenly ‘Keep It Simple’ engineering approach
    - major foot-gun was the premature move to microservices
- There is nothing wrong with a monolith
  - monoliths enable small teams and efficient practices
- Don’t solve problems you don’t have
  - Do you have enough data to show what needs to be a separate service and why?
  - The knobs you need to be aware of and tune are endless
  - cos-playing Amazon and Google - without their endless resources - is likely a waste of money and time
- “But each team… but separate… but API”
  - it's normal for one team to half-ass multiple microservices instead of doing a great job on a single one
  - what you lose
    - say goodbye to DRY
    - dev ergonomics crater
    - integration tests (:fear:)
- What about just “services”?
  - well sized, multipurpose services can be ok
  - but ultimately you probably want a monolith
- The pendulum is swinging back towards monoliths
  - KISS