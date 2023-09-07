-----------------------
articleLink: https://stripe.com/blog/how-we-built-it-stripe-radar
articleTitle: How we built it: Stripe Radar
createdOn: 2023-09-07T03:57:22.947Z
updatedOn: 2023-09-07T03:57:22.947Z
-----------------------

lessons:
- 1: Don’t get too comfortable with your ML architecture
- 2: Never stop searching for new ML features
  - biggest levers we have to make model improvements is through feature engineering
- 3: Explanation matters as much as detection
  - users want to know why something happens
  - all ML models are black boxes to an extent, and deep neural networks even more so than other types of models
  - working on more sophisticated techniques for gaining deeper understanding of our ML model
    - included: simple table view that displays the exact features that contributed the most to raising and lowering a transaction’s fraud score