-----------------------
articleLink: https://earthly.dev/blog/shutting-down-earthly-ci/
articleTitle: We built the fastest CI in the world. It failed. Here’s what we learned - Earthly Blog
createdOn: 2023-09-21T01:07:04.900Z
updatedOn: 2023-09-21T01:07:04.900Z
-----------------------

- The Fastest CI
  - created CI/CD tooling to only rebuild a section of code if there's been a change to reduce build time
  - no one wanted it
- what does success look like?
  - focus on being 10x better in one, very specific way
  - go after enthusiasts/early adopters first
- The Master Plan for Earthly CI
  - split vision into smaller products
    - first milestone: Earthly: first built the syntax + general experience around running builds on-demand
      - was adopted and used widely
    - second milestone: Earthly Satellites (VMs): remote runners that can be invoked from anywhere
      - also popular
    - the third milestone: Earthly CI: the platform that brings everything together
      - this is where flaws started to crop up
- early symptoms
  - skepticism in weighing the cost of migration vs. the benefit
  - groups were already getting 95% of the value of Earthly CI through Satellites
    - Earthly CI wasn't better enough to warrant the switch to a new platform
- The Most Ridiculous Negative Lead Qualification Criteria Ever
  - product conversations with companies were floundering, but organic word of mouth growth continued
  - direct GTM approach would not help validate a product like Earthly CI
  - lead to the conclusion: if the prospect requires a demo, then they’re not worth going after
    - People will buy a developer tool, but you can’t sell it
- Problems Converting Earthly Users
  - Earthly CI MVP never met some key requirements for people - e.g. plugins
- Validating the Invalidation
  - changing words from "makes CI simple" to "makes builds simple" doubled conversions
- Lessons From Another Life
  - build the product incrementally, with user feedback informing every step of the execution
  - missed signs that the product did not align with what the industry needs, but we didn’t listen. We just kept building.
- wrapping up
  - winding down earthly CI
  - continuing to focus on the things that are working




