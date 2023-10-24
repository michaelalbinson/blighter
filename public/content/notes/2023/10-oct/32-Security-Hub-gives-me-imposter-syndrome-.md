-----------------------
articleLink: https://www.chrisfarris.com/post/securityhub-2023/
articleTitle: Security Hub gives me imposter syndrome - Chris Farris
createdOn: 2023-10-15T23:39:51.947Z
updatedOn: 2023-10-15T23:39:51.947Z
-----------------------

### AWS Security Hub - What’s good
- price - it's cheap
- delegated admin - allows for dedicated security admin account
- region aggregation
- AWS Foundational Security Best Practices
  - complete list of cloud security best-practices
- Combined inspector and CSPM in one place - aggregates findings from a number of sources

### AWS Security Hub - What’s bad
- horrible dashboards/metrics
  - a lot of numbers that don't mean anything meaningful and are not constructive in fixing problems
- focused on compliance vs risk
- cost - ~1% of AWS bill once all controls are enabled
- difficult to disable controls
  - and once controls disabled, hard to regenerate reports
- infrequent updates
  - takes ~24hrs for changes to show up in dashboard
- inability to figure out where to start

### Security Hub is dangerous and does customers a disservice
- need to build for folks []below the security poverty line](https://www.csoonline.com/article/3686688/how-to-survive-below-the-cybersecurity-poverty-line.html)
- metrics should focus on risk causing:
  - eng ignoring issues
  - hostility between eng and security
  - false narrative that sec team isn't able to secure the env

  