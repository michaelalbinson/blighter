-----------------------
articleLink: https://engineering.atspotify.com/2023/04/spotifys-shift-to-a-fleet-first-mindset-part-1/
articleTitle: Fleet Management at Spotify (Part 1): Spotify’s Shift to a Fleet-First Mindset - Spotify Engineering : Spotify Engineering
createdOn: 2023-10-10T03:56:56.929Z
updatedOn: 2023-10-10T03:56:56.929Z
-----------------------

- The problem of maintaining speed at scale
  - Many small squads, many more components - n teams, n^n software components
  - The small stuff adds up quickly - hard to update thousands of components
  - Time to shift our thinking from squad first to fleet first
- How we apply fleet-first thinking to Spotify’s infrastructure
  - What code are we changing?
  - Is everything we’re changing under version control?
  - How do we actually make the changes?
    - need a mechanism to author, apply, and roll out changes in a safe way
    - Hyrum’s law - “with a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody.”
    - specialized tooling is necessary to safely and efficiently make fleet-wide changes
  - How can we increase trust in changes nobody reviews?
    - high-quality test automation
    - canary-based testing during deployment
- Results: The proof is in the repos
  - Happier, more productive developers
  - A more secure codebase
  - New features, faster
  - Made it easy to "repave" (redeploy the whole env) weekly
- The future of Fleet Management at Spotify
  - Continuing adoption
  - More complex changes
  - Increased standardization
  - Improved tooling