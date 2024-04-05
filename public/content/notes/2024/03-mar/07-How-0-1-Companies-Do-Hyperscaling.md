-----------------------
articleLink: https://newsletter.systemdesign.one/p/cell-based-architecture
articleTitle: How 0.1% Companies Do Hyperscaling
createdOn: 2024-03-12T00:12:15.040Z
updatedOn: 2024-03-12T00:12:15.040Z
-----------------------

- Cell Based Architectures
  - Implementation
    - a cell is a completely self-contained instance of the application. So it’s independently deployable and observable
    - traffic gets routed to the right cells via a thin layer called the cell router (load balancer)
    - cell based architecture prevents single points of failure
    - If a cell fails, only the customers in that specific cell are affected. So the blast radius is lower
  - Key Concepts
    - Customer Placement
      - cells get partitioned using a partition key
        - Customer ID is a candidate partition key for most use cases
    - Cell Router
      - can be implemented with via DNS or via API gateways, but they must be horizontally scalable
    - Cell Size
      - cells must have a fixed maximum size
    - Cell Deployment 
      - deployment must be tested on a single cell before rolling it to others for safety
      - cells get deployed in waves and the metrics are monitored
      - deployments can be rolled back if needed
  - Use Cases
    - Applications that need high availability
    - High-scale systems that are too big to fail
    - Systems with low recovery time objective (RTO)
    - Systems with many combinations of test cases but insufficient coverage
  - Best Practices
    - start with more than a single cell from day 1 to get familiar with the architecture
    - Consider the current tech stack as cell zero and add a router layer
    - Perform a failure mode analysis of the cell to find its resilience
    - A single team could own an entire cell for simplicity. But with cell boundary on the bounded context
    - Cells should communicate via versioned and well-defined APIs
    - Cells must be secured through policies in API gateways
    - Cells should throttle and scale independently
    - The dependencies between cells reduce the benefits of cell based architecture. So they should be kept minimum
    - There shouldn’t be shared resources like databases to avoid a global state
    - The cells should get deployed in waves
  - Anti-Patterns
    - Growing the cell size without limits
    - Deploying code to every cell at once
    - Sharing state between cells
    - Adding complex logic to the routing layer
    - Increased interactions between cells