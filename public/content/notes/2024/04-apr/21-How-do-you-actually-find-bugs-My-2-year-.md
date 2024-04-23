-----------------------
articleLink: https://medium.com/@deadoverflow/how-do-you-actually-find-bugs-my-2-year-experience-2d77d78994a0
articleTitle: How do you actually find bugs? (My 2 year experience) | by Imad Husanovic | Jan, 2024 | Medium
createdOn: 2024-04-18T03:07:29.129Z
updatedOn: 2024-04-18T03:07:29.129Z
-----------------------

- CSRF — Cross Site Request Forgery
  - network tab -> copy request as fetch -> set mode property to "no-cors" and credentials to "include"
    - the request should error out if the app is properly protected
  - test multiple API endpoints