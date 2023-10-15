-----------------------
articleLink: https://newsletter.systemdesign.one/p/protocol-buffers-vs-json
articleTitle: How LinkedIn Adopted Protocol Buffers to Reduce Latency by 60%
createdOn: 2023-10-10T03:36:54.102Z
updatedOn: 2023-10-10T03:36:54.102Z
-----------------------

- protobuf: binary format for transmitting data
  - makes things significantly more efficient for large payloads

### JSON vs Protobuf
- Protobuf benefits:
  - Support for schema validation
  - Improved performance with big payloads. Because it uses the binary format
  - Support for backward compatibility
- Protobuf limitations:
  - Hard to debug. And not human-readable
  - Extra effort to update the proto file needed
  - Limited language support compared to JSON
- JSON benefits:
  - Easy to use and human-readable
  - Easy to change. Because it provides a flexible schema
  - Support for many programming languages
- JSON limitations:
  - No support for schema validation (not totally true - no built-in support would be true though)
  - Poor performance for big payloads
  - Backward compatibility problems

### Takeaways
- use protobuf when:
  - Payload is big
  - Communication between non-JavaScript environments needed
  - Frequent changes to the payload schema expected 
- Use JSON when:
  - Simplicity needed
  - High performance is not needed
  - Communication between JavaScript and Node.js or other environments needed