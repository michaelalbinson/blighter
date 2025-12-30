-----------------------
articleLink: https://engineering.fb.com/2025/08/13/data-infrastructure/agentic-solution-for-warehouse-data-access/
articleTitle: Creating AI agent solutions for warehouse data access and security
createdOn: 2025-10-13T23:05:00.294Z
updatedOn: 2025-10-13T23:05:00.294Z
-----------------------

this is the core part of the security loop they've built for themselves


- Context. We analyze data-user activities and other information to understand the business needs driving data access and align them with data controls. This enables us to provide task-specific, context-aware control. 
- Query-level access control at a granular level. We analyze the shape of queries, such as whether they involve aggregation or random sampling. 
- Data-access budget. Employees are given a data-access budget based on the amount of data they typically access, and this budget, which refreshes daily, is our first line of defense. 
- Rule-based risk management. We employ rule-based risk control. This defends against attacks against or malfunctions of the AI agent.

it's all rule based access management at its core

the data access budget is particularly interesting
