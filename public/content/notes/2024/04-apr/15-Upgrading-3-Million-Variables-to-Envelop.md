-----------------------
articleLink: https://blog.railway.app/p/envelope-encryption
articleTitle: Upgrading 3 Million Variables to Envelope Encryption
createdOn: 2024-04-18T02:17:09.186Z
updatedOn: 2024-04-18T02:17:09.186Z
-----------------------

- need
  - protect data with keys stored off-site
  - GCP's KMS was too brittle to scale and had limits on the length of input text
- enabling key rotation
  - `variable.encryptedValue = '{"encryptedDek":"...","cipherText":"..."}'`
  - cipher text is encrypted by the DEK, DEK is encrypted by the KEK
- benefits of new system:
  - Better performance → Decrypting DEKs with KMS once per batch reduced the slow-case for variable decryption from ~10s at the slowest to only a handful of milliseconds
  - No service disruption → The more consistent usage pattern means we no longer have to worry about spiking above our KMS quota and causing downtime. We’ve also been able to reduce our quota by several orders of magnitude
  - Better security → Using a separate data key per environment means that a brute-force attack of one environment won’t compromise data for any others
  - More flexible encryption → While we don’t necessarily need to surpass the 64KiB KMS limit, the use of symmetric AES encryption means we can now encrypt data of any length