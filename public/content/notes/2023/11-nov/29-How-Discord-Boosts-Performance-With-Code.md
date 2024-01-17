-----------------------
articleLink: https://newsletter.systemdesign.one/p/what-is-code-splitting-in-react
articleTitle: How Discord Boosts Performance With Code-Splitting
createdOn: 2023-11-16T16:05:38.680Z
updatedOn: 2023-11-16T16:05:38.680Z
-----------------------

- code splitting: loading code only when it's needed
- you can split
  - HTML, JS, CSS, translations, fonts
- lazy load the chunks as they are needed
- benefits:
  - improved performance on mobile clients
  - reduced CDN costs
  - improved SEO
- drawbacks
  - overhead of more requests to get everything you need
  - degraded latency due to greater overall number of requests