-----------------------
articleLink: https://sec.okta.com/articles/2023/03/setting-right-levels-assurance-zero-trust
articleTitle: Setting the Right Levels of Assurance for Zero Trust
createdOn: 2024-05-02T21:58:23.108Z
updatedOn: 2024-05-02T21:58:23.108Z
-----------------------

- Security Context Considerations for Authentication Policies:
  - authentication risk
    - low risk - no behavior deviation
      - e.x. same IP/device/location
    - med risk - slight deviation from previous user behavior
      - e.x. new city, new device, etc
    - high risk - authC behavior that deviates from previous user's behavior
      - e.x. impossible travel and new device, first time login
  - device state
    - unregistered - not registered with Okta Verify
    - registered but unmanaged - 
    - managed - registered device enrolled in unified endpoint management (UEM) solution
    - managed + EDR - managed device that is checked for a device posture score via EDR solution (crowdstrike et al)
  - app risk, sensitivity, impact
    - low impact: does not contain sensitive data
    - med impact: some sensitive/proprietary info
    - high impact: very sensitive data or proprietary information
- combine above factors to apply different authC policies dependening on risk