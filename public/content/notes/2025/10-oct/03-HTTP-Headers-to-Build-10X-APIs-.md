-----------------------
articleLink: https://newsletter.systemdesign.one/p/http-headers
articleTitle: HTTP Headers to Build 10X APIs 🔥
createdOn: 2025-10-13T23:33:42.460Z
updatedOn: 2025-10-13T23:33:42.460Z
-----------------------

- general headers
  - Cache-Control - controls caching of browsers and intermediary caches (e.g. proxy, CDN)
    - Cache-Control: max-age=3600, public # cache at all layers for 3600 seconds
    - Cache-Control: no-store # don't cache anywhere
    - Cache-Control: no-cache # cache the response, browsers must re-validate with servers before using the response
  - Date
    - when the server sent the response (used for caching)
  - Via
    - added by proxies/load balancers/CDNs
- request headers
  - Host - contains hostname and port number - defaults to 443 if no port specified
  - User-Agent - tells the server about the user's browser and operating system
  - Accept - tells the server about the expected response data stream type (e.g. application/json)
    - without this the server can default to something else or fail to process the response
  - Accept-Language - tells the server the preferred ISO language code
  - Accept-Encoding - tells the server what compression algorithm is expected in the response
    - server sends a uncompressed response if the header is missing
  - Cookie - all client cookies
  - Referrer - the site URL that sent you to the current page - often used in analytics
  - Authorization - credentials/tokens/API kets
  - Range - lets a client retrieve the specified range or bytes in a file - often used in media streaming
  - If-Modified-Since - server sends the resource only if it has changed after the specified date
  - If-None-Match - server sends the resource only if the client's eTag doesn't match the server's current eTag
  - X-Forwarded-For - proxies add this for visibility of the original requestor
  - X-Forwarded-Proto - proxies/LBs add this, refers to the protocol used to make the original request e.g. https
  - X-Forwarded-Port - proxies/LBs add this, original port the requestor used to the client
- Response headers
  - Set-Cookie - lets the server store cookies on the client, add HttpOnly to block client JS from accessing it
  - Access-Control-Allow-Origin - permits cross-origin access to an origin's data/cookies
    - without the header, requests can't be sent
  - Age - added by cache/proxy/CDN, it's how long the resource has been in the cache to help a browser determine if the cache is stale or not
  - Vary - header tells the cache which request headers affect the server’s response
  - Accept-Ranges - tells the client whether the server supports partial requests (e.g. bytes)
  - Content-Range - indicates which part of a resource is being sent in response to a partial request
  - Content-Security-Policy - tells the browser which sources are allowed for scripts, styles, and images to help prevent XSS
  - Strict-Transport-Security - tells the browser to always use HTTPS for this domain for a specific period
- Payload headers
  - Content-Type - indicates the format of the message body
  - Content-Disposition - tells the browser how to handle the response body, e.g. whether to display it inline or download it as a file
  - Content-Length - tells the receiver how big the body is
  - Content-Encoding - tells the client which compression algorithm was applied to the response body
  - Content-Language - tells the client the human language of the response body
  - Last-Modified - tells the client the date and time when the resource was last changed
  - ETag - unique version identifier, like a hash or fingerprint, for a resource
  - 








