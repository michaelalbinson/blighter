-----------------------
articleLink: https://newsletter.systemdesign.one/p/what-is-critical-rendering-path
articleTitle: This Is How Airbnb Adopted HTTP Streaming to Save 84 Million USD in Costs
createdOn: 2023-10-23T15:28:30.402Z
updatedOn: 2023-10-23T15:28:30.402Z
-----------------------

### Takeaways
- Stream HTML
  - It allows incremental construction of the page, and enables the early discovery of external files
  - And request-response approach for the remaining content this keeps renders simpler
- Code split CSS files and inline critical styles
- Move non-critical JavaScript out from the critical rendering path
  - Download JavaScript after the initial render, JS parsing is blocking