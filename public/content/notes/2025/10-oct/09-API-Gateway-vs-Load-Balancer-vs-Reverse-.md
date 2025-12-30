-----------------------
articleLink: https://newsletter.systemdesign.one/p/api-gateway-load-balancer-reverse-proxy
articleTitle: API Gateway vs Load Balancer vs Reverse Proxy 🌟
createdOn: 2025-10-14T00:35:36.219Z
updatedOn: 2025-10-14T00:35:36.219Z
-----------------------

- load balancer usage patterns
  - Round-robin: routes traffic across servers in a sequential order.
  - Least-connections: routes traffic to the least busy servers.
  - IP-hashing: routes a client’s traffic to the same server for sticky sessions.
- API Gateway - simplifies client integrations with multiple APIs
  - The client sends a request to the API Gateway
  - The API Gateway throttles requests to avoid server overload and transforms data if necessary
  - It then routes the request to the correct microservices based on its URL path, HTTP headers, or query parameters
  - The API Gateway combines the responses from different microservices and responds to the client
- Reverse Proxy
  - The client sends a request to the reverse proxy
  - It forwards the request to the server
  - The server responds to the reverse proxy
  - The reverse proxy then caches the response and returns it to the client

tl;dr:
- Load balancer: distributes traffic evenly across servers
- API gateway: handles complex service calls
- Reverse proxy: handles security and caching