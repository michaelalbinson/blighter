-----------------------
articleLink: https://maximorlov.com/linting-rules-for-asynchronous-code-in-javascript/
articleTitle: 14 Linting Rules To Help You Write Asynchronous Code in JavaScript - Maxim Orlov
createdOn: 2023-09-12T04:16:44.921Z
updatedOn: 2023-09-12T04:16:44.921Z
-----------------------

GeneralRules
- no-async-promise-executor
  - disallows passing an async function to the new Promise constructor
- no-await-in-loop - disallows using await inside loops (typically bad practice)
- no-promise-executor-return - almost always a mistake `new Promise((resolve, reject) => {return result;}); // bad example`
- require-atomic-updates - disallows assignments in combination with await
- max-nested-callbacks - enable clean code :)
- no-return-await - enables clean code
- prefer-promise-reject-errors - enforces using an Error object when rejecting a Promise

Node Rules
- node/handle-callback-err - enforces error handling inside callbacks
- node/no-callback-literal - enforces that a callback function is called with an Error object as the first parameter
- node/no-sync - disallows using synchronous methods from the Node.js core API where an asynchronous alternative exists

TYPESCRIPT RULES
- @typescript-eslint/await-thenable - disallows awaiting a function or value that is not a Promise
- @typescript-eslint/no-floating-promises - enforces Promises to have an error handler
- @typescript-eslint/no-misused-promises - disallows passing a Promise to places that aren't designed to handle them, such as if-conditionals
- @typescript-eslint/promise-function-async - enforces Promise-returning functions to be async

Enable them now: `npm install --save-dev eslint eslint-config-async eslint-plugin-node typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin`