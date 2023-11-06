-----------------------
articleLink: https://csswizardry.com/2023/10/the-three-c-concatenate-compress-cache/
articleTitle: The Three Cs: 🤝 Concatenate, 🗜️ Compress, 🗳️ Cache &ndash; Harry Roberts &ndash; Web Performance Consultant
createdOn: 2023-11-01T17:23:27.433Z
updatedOn: 2023-11-01T17:23:27.433Z
-----------------------

tl;dr: techniques for serving/storing files on the web

- 🤝 Concatenating our files on the server: 
  - Are we going to send many smaller files, or are we going to send one monolithic file? The former makes for a simpler build step, but is it faster?
- 🗜️ Compressing them over the network:
  - Which compression algorithm, if any, will we use? What is the availability, configurability, and efficacy of each?
- 🗳️ Caching them at the other end:
  - How long should we cache files on a user’s device? And do any of our previous decisions dictate our options?


- advice:
  - Ship as little as you can get away with in the first place.
    - It’s better to send no code than it is to compress 1MB down to 50KB.
  - If you’re running HTTP/1.1, try upgrade to HTTP/2 or 3.
  - If you have no compression, get that fixed before you do anything else.
  - If you’re using Gzip, try upgrade to Brotli.
  - Once you’re on Brotli, it seems that larger files fare better over the network.
    - Opt for fewer and larger bundles.
  - The bundles you do end up with should, ideally, be based loosely on rate or likelihood of change.
