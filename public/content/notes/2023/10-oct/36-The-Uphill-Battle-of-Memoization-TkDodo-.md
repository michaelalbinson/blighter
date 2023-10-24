-----------------------
articleLink: https://tkdodo.eu/blog/the-uphill-battle-of-memoization
articleTitle: The Uphill Battle of Memoization | TkDodo&#x27;s blog
createdOn: 2023-10-16T19:27:21.831Z
updatedOn: 2023-10-16T19:27:21.831Z
-----------------------

- Memo is too easy to break
  - new devs don't necessarily know/understand your memorization strategy
  - may not even know component is memoized elsewhere
  - memoized components don't work as expected with the `children` prop
- The alternative
  - push state down the tree where possible - or outside react