-----------------------
articleLink: https://shopify.engineering/building-production-ready-agentic-systems
articleTitle: Building Production-Ready Agentic Systems: Lessons from Shopify Sidekick (2025) - Shopify
createdOn: 2025-10-14T00:57:49.302Z
updatedOn: 2025-10-14T00:57:49.302Z
-----------------------

- The Tool Complexity Problem 
  - 0-20 tools : Clear boundaries, easy to debug, straightforward behavior
  - 20-50 tools : Boundaries become unclear, tool combinations start causing unexpected outcomes
  - 50+ tools : Multiple ways to accomplish the same task, system becomes difficult to reason about
- Just-in-time instructions: A Solution for scale 
  - return relevant instructions alongside tool data exactly when they're needed
    - Localized guidance - Instructions appear only when relevant
    - Cache efficiency - dynamically adjust instructions without breaking LLM prompt caches
    - Modularity : Different instructions can be served based on beta flags, model versions, or page context
- Ground truth sets over golden datasets 
  -  Human evaluation : Have at least three product experts label conversations across multiple criteria
  -  Statistical validation : Use Cohen's Kappa, Kendall Tau, and Pearson correlation to measure inter-annotator agreement
  -  Benchmarking : Treat human agreement levels as the theoretical maximum our LLM judges can achieve
- Key takeaways for production agentic systems 
  -  Architecture principles 
    - Stay simple : Resist the urge to add tools without clear boundaries
    - Start modular : Use patterns like JIT instructions from the beginning to maintain system comprehensibility as you scale
    - Avoid multi-agent architectures early : Simple single-agent systems can handle more complexity than you might expect
