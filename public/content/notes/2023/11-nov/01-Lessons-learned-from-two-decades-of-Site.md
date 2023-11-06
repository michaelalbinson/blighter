-----------------------
articleLink: https://sre.google/resources/practices-and-processes/twenty-years-of-sre-lessons-learned/
articleTitle: Lessons learned from two decades of Site Reliability Engineering
createdOn: 2023-11-01T17:00:41.750Z
updatedOn: 2023-11-01T17:00:41.750Z
-----------------------

-  The riskiness of a mitigation should scale with the severity of the outage 
-  Recovery mechanisms should be fully tested before an emergency 
-  Canary all changes 
-  Have a "Big Red Button" 
-  Unit tests alone are not enough - integration testing is also needed 
-  COMMUNICATION CHANNELS! AND BACKUP CHANNELS!! AND BACKUPS FOR THOSE BACKUP CHANNELS!!! 
-  Intentionally degrade performance modes 
-  Test for Disaster resilience 
-  Automate your mitigations 
-  Reduce the time between rollouts, to decrease the likelihood of the rollout going wrong 
-  A single global hardware version is a single point of failure 