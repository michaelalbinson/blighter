-----------------------
articleLink: https://alexharri.com/blog/grid-engine-performance
articleTitle: Making GRID&#x27;s spreadsheet engine 10% faster
createdOn: 2023-10-19T15:02:23.957Z
updatedOn: 2023-10-19T15:02:23.957Z
-----------------------

### Spreadsheet engine
- many use cases to support
  - most complex aspects relate to cell dependencies (on other cells) + waterfall recalculations
- for model to react:
  - cells depending on the changed input need to be recalculated
  - need to find and recalculate dependent cells - they use a dependency graph
- recalculation is recursive
  - can be expensive @ 10k-100k+ cells

### Cost of recalculation
- two parts
  - determining which cells to recalculate
  - recalculating cells
    - two parts
      - fixed cost to recalculate
        - setting up context needed to evaluate formula - sets up an evaluation context
        - evaluating fixed cost
          - a lot of time setting up properties/methods not used in calculation
        - eliminating fixed cost
          - lazily compute methods/properties instead of preloading
          - only instantiate a single eval context
      - variable cost to recalculate
        - cells can do expensive things like call QUERY, which takes a long time
        - expense of user formula generally derives the variable cost

### Takeaways
- when optimizing for performance, evaluate:
  - What information do we need to evaluate now, and which can we evaluate later?
  - What is the fixed cost associated with performing this operation?
  - Do we need to do this work in the first place?
  - Can we cache the result of this operation? How does that impact memory usage?

