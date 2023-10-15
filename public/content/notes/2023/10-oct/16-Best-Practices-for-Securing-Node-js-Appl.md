-----------------------
articleLink: https://semaphoreci.com/blog/securing-nodejs
articleTitle: Best Practices for Securing Node.js Applications in Production - Semaphore
createdOn: 2023-10-10T02:24:10.300Z
updatedOn: 2023-10-10T02:24:10.300Z
-----------------------

TL;DR: solid list of best practices, probably best to refer back to this when productionalizing an app

### Best practices
- Never Run Node.js With Root Privileges
- Keep Your NPM Libraries Up To Date -> use snyk package to scan your dep tree
- Avoid Using Default Cookie Names
- Set the Security HTTP Headers -> use helmet package
- Implement Rate Limiting -> rate-limiter-flexible package
- Ensure Strong Authentication Policies
- Do Not Send Unnecessary Info
- Monitor Your Backend
- Adopt an HTTPS-Only Policy
- Validate User Input -> [express-validator](https://www.npmjs.com/package/express-validator)
- Use Security Linters -> [eslint-plugin-security](https://www.npmjs.com/package/eslint-plugin-security)
- Prevent SQL Injection -> Use Prepared Statements or Parameterized Queries OR Input Sanitization OR Use an ORM
- Limit Request Size -> use [body-parser](https://www.npmjs.com/package/body-parser) with the limit parameter
- Detect Vulnerabilities Through Automated Tools
- Make It Easy to Report Vulnerabilities
  - effective approach to allow researchers to reach out to you is the security.txt proposed standard