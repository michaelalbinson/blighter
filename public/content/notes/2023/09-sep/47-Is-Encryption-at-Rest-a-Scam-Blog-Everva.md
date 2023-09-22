-----------------------
articleLink: https://evervault.com/blog/is-encryption-at-rest-a-scam
articleTitle: Is Encryption at Rest a Scam?  — Blog — Evervault
createdOn: 2023-09-22T14:52:28.731Z
updatedOn: 2023-09-22T14:52:28.731Z
-----------------------

- Encryption at rest used to be a bigger deal
  - before big cloud providers, manually stealing hard drives was much more possible
  - big providers secure their datacenters very well
  - phishing is the primary vector for data theft these days and...
- Encryption at rest does nothing against phishing
  - when the attacker pulls data from the database, it’s decrypted just like any other data request
- solutions:
  - MFA
  - JIT access controls
  - use secret managers to manage secrets
- to be clear: enable encryption at rest, but don't rely on it