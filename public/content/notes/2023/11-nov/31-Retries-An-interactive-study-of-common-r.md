-----------------------
articleLink: https://encore.dev/blog/retries
articleTitle: Retries – An interactive study of common retry methods – Encore Blog
createdOn: 2023-11-24T21:39:12.676Z
updatedOn: 2023-11-24T21:39:12.676Z
-----------------------

- Retrying in a tight loop is dangerous. You risk getting into overload situations that are difficult to recover from.
- Retrying with a delay helps a little bit but is still dangerous.
- Exponential backoff is a much safer way of retrying, balancing user experience with safety.
- Jitter adds an extra layer of protection, preventing clients from sending synchronised surges of requests.


Fun diagrams/simulations

