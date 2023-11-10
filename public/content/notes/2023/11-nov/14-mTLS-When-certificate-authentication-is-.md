-----------------------
articleLink: https://github.blog/2023-08-17-mtls-when-certificate-authentication-is-done-wrong/
articleTitle: mTLS: When certificate authentication is done wrong
createdOn: 2023-11-06T02:40:45.099Z
updatedOn: 2023-11-06T02:40:45.099Z
-----------------------

### Introduction: What is mutual TLS?
#### How certificates are validated
- chain of trust
- for each certificate in the chain, the validator checks:
  - the signature
  - validity period
  - allowed algorithms and key lengths
  - key usage
  - etc

#### mTLS in a Java web application, an example
- pros
  - speed: authC happens during TLS handshake, subsequent “keep-alive” HTTP requests are considered authenticated
  - Storage: Similar to JWT, the server does not store all client certificates, only the root certificate.
- cons
  - No granular control: if mTLS is enabled, all requests have to be authenticated
  - Any certificate signed by a trusted CA can be used to access this HTTP service
  - No host verification by default: client certificates can be accepted from any IP.
  - Certificate issuance process needs to be implemented separately
  - Certificates expire, so need to be rotated frequently

#### Previous attacks
- security of authC system depends on strength of the signature
- X.509 format is complex and can be challenging to parse correctly
- Lack of basic constraints checking - end-entity certificates should not be used to sign additional certificates

### Chapter 1: Improper certificate extraction
-  developers often need to access the certificate presented during the TLS handshake
- there are two common methods
- API returns an array of certificates presented by the client, not a single one
- common approach: take only the first certificate from the array and consider it as the client certificate
  - there are some rare cases where apps disregard this rule and iterate through the whole chain
  - **the underlying TLS library in Java only verifies the first certificate in the list**

#### Example: CVE-2023-2422 improper certificate validation in KeyCloak
- possible to send a list of certificates, where the first one contains one username and is properly chained to a root CA. But the last certificate in the array might be self signed and belong to a different user

#### Passing certificate as a header
- when the TLS connection is terminated on a reverse proxy
- some backend servers behind nginx do not perform additional validation, trusting the reverse proxy
  - not directly exploitable, but not ideal
    - server in the local network can make a request with this header

### Chapter 2: “Follow the chain, where does it lead you?”
- In large systems, servers may not store all root and intermediate certificates locally
- RFC 3280 defines some X.509 certificate extensions that can contain information about where to find the issuer and CA certificates
  - If this extension is used for validation, there is a high chance that you can exploit it to perform an SSRF attack
- When certificate stores are in use, you should think of these values as “untrusted user input”

#### Example: CVE-2023-33201 LDAP injection in Bouncy Castle
- LDAP syntax injection via the subject field in the certificate

### Chapter 3: Certificate revocation and its unintended uses
- revocation certificate stores can be used for revocation checks
  - store can be hardcoded in the app or in the certificate
  - can again be abused for SSRF attacks

#### Example: CVE-2023-28857 credentials leak in Apereo CAS

### Summary

- Pay attention when extracting usernames from the mTLS chain,
  - by default JDK servers only verify the first certificate in the chain.
- Use Certificate Stores with caution, as it can lead to LDAP and SQL injections.
- Certificate revocation can lead to SSRF or even to RCE in the worst case.
  - do revocation checks only after all other checks and do not rely on URLs taken from the certificate extensions



