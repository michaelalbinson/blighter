-----------------------
articleLink: https://engineercodex.substack.com/p/meta-xfaas-serverless-functions-explained
articleTitle: Meta reveals their serverless platform processing trillions of function calls a day
createdOn: 2023-10-23T15:20:21.870Z
updatedOn: 2023-10-23T15:20:21.870Z
-----------------------

### interesting takeaways
- hardware can be optimized by software to improve serverless performance
- meta uses universal workers vs setting up and tearing down workers - reduces startup overhead
- only used for non-user-facing functions
- peak demand is 4.3x off-peak demand

### Problems solved
- lengthy cold start times
  - solution: just-in-time compilation + universal workers
- high variance in load
  - solution: system can postpone running delay-tolerant functions until off-peak times + distribute load across datacenters
- overloading downstream services
  - solution: system has a built-in request management system to regulate execution of functions


There's a deeper dice into the architecture too, but it's pretty deep in the weeds