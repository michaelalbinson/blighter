-----------------------
articleLink: https://scottarc.blog/2024/06/02/encryption-at-rest-whose-threat-model-is-it-anyway/
articleTitle: Encryption At Rest: Whose Threat Model Is It Anyway? &#8211; Semantically Secure
createdOn: 2024-06-13T02:53:54.558Z
updatedOn: 2024-06-13T02:53:54.558Z
-----------------------

- the threat model for Encryption At Rest is often undefined
  - most devs do not have a clear understanding of:
    - the risks they’re facing and/or
    - why or how encrypting data at rest helps protect users
- Why and How to use Encryption At Rest to Protect Sensitive Data
  - If you’re only interested in compliance requirements, you can probably just enable Full Disk Encryption and call it a day
  - if app/db is online 2/ disk encryption and an attacker gains access, it might as well be plaintext
    - e.g. Full Disk Encryption is security theater
  - Encryption At Rest - encrypt data before storing it
  - client-side encryption - app server as "client" 
    - Security Considerations for Client-Side Encryption
      - how are the keys being managed?
        - ideally: Cloud-based key management service with audit logging, e.g. AWS KMS
    - Bulk Data Encryption Techniques
      - bad: AES in CBC mode without HMAC.
      - worse: AES in ECB mode.
      - generally use: AEAD like AES-GCM or XChaCha20-Poly1305
      - also want key-commitment - see PASETO v3/v4
    - Is Your Deputy Confused?
      - the app is the Deputy, and you can easily confuse it by replaying an encrypted blob in the incorrect context
      - e.g. "borrowing" someone else's key