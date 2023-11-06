-----------------------
articleLink: https://dev.to/nikl/json-is-slower-here-are-its-4-faster-alternatives-2g30
articleTitle:  JSON is Slower. Here Are Its 4 Faster Alternatives 
createdOn: 2023-11-05T17:05:04.573Z
updatedOn: 2023-11-05T17:05:04.573Z
-----------------------

- why do people use json
  - human readable format
  - language agnostic
  - data structure consistency
  - browser support
  - built-in json APIs
  - JSON schemas
- why is json slow
  - parsing overhead
  - serialization/de-serialization
  - string manipulation is slow
  - limited data types
  - verbosity
  - no binary support
  - deep nesting
- alternatives
  - protocol buffers 
  - messagepack
  - BSON
  - Avro
- Optimizing JSON Performance 
  - minimize data (key) sizes
    - use short, descriptive keys
    - abbreviate when possible
  - use arrays wisely
    - minimize nesting
  - optimize number representations
    - use integers when possible
  - remove redundancy
    - avoid repetitive data
  - use compression, e.g. gzip, brotli
  - use server-side caching -> cache JSON responses
  - profile + optimize
- real world examples