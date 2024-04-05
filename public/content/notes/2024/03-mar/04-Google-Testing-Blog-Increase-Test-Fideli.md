-----------------------
articleLink: https://testing.googleblog.com/2024/02/increase-test-fidelity-by-avoiding-mocks.html
articleTitle: Google Testing Blog: Increase Test Fidelity By Avoiding Mocks
createdOn: 2024-03-08T22:31:43.697Z
updatedOn: 2024-03-08T22:31:43.697Z
-----------------------

- using mocks can lead to tests that are less effective at catching bugs
- test fidelity: how closely the behavior of the test resembles the behavior of the production code
  - prefer the highest-fidelity option where possible
    - Try to use the real implementation
    - Use a fake if you can’t use the real implementation
      - A fake ensures a test has high fidelity, but takes effort to write and maintain
    - Use a mock if you can’t use the real implementation or a fake
- Aim for as much fidelity as you can achieve without increasing the size of a test
  - small tests: single-process, don't wait on external system events
  - medium/big: rely on real heavyweight dependencies