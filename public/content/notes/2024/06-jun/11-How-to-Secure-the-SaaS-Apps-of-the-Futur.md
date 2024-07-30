-----------------------
articleLink: https://sec.okta.com/appsofthefuture
articleTitle: How to Secure the SaaS Apps of the Future | Okta Security
createdOn: 2024-06-13T03:02:21.180Z
updatedOn: 2024-06-13T03:02:21.180Z
-----------------------

- goals
  - constrain the use of tokens that are for specific devices, clients and/or locations,
  - identity ecosystem (identity providers and SaaS applications) to autonomously exchange signals about changes in session risk, and
  - act on identified changes in session risk: such as forcing step-up authentication within the context of an application, or signing a user out of all of their application sessions.
- solutions to requirements for today's SaaS platforms
  - Single Sign-On (via support for OIDC or SAML)
  - User Provisioning and deprovisioning (via support for SCIM)
  - Programmatic access to logs (using REST APIs)
- requirements for the Apps of the Future
  - proof-of-possession - contrain the use of OAuth tokens to the authorized client
  - continuous access evaluation profile (CAEP)
    - the default session for most SaaS applications is getting longer
    - session length can only get longer if:
      - security teams are confident that they can detect changes in user risk mid-session
      - in near real time
  - universal logout
    - sign out all users from all apps simulataneously
- why are these solutions important
  - Users can only authenticate to an enterprise resource with a phishing-resistant authenticator from the right device(s),
  - Applications will only accept requests from the right users with the right permissions,
  - Sessions/tokens for web or native apps can only be used from the same device authorized to access them,
  - Long-lived sessions are continuously re-evaluated for risk using signals from the enterprise and the application,
  - All access from all devices can be terminated in real-time to limit the blast radius of a stolen session.