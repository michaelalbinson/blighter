-----------------------
articleLink: https://www.specfy.io/blog/1-efficient-dockerfile-nodejs-in-7-steps
articleTitle: The complexity of writing an efficient NodeJS Docker image - Specfy
createdOn: 2023-09-21T02:07:51.055Z
updatedOn: 2023-09-21T02:07:51.055Z
-----------------------

TL;DR this is a pretty technical overview of setting up an efficient Node-Docker build
probably worth revisiting if I actually do this someday

- A Brief Overview of Docker's Internals
  - layered approach - FS changes create a new layer over previous ones
    - you want to minimize layers
    - layering allows docker to cache command results
    - unnecessary layers cause slower builds
- context:
  - basic steps
    - use correct Node base image
    - copy your source code
    - install dependencies
    - build/compile source
    - run the process
  - we can eliminate "copy source" and "build" if it's already built
    - dep installation isn't required with prebuilt sources either
- use slim images
- multi-stage builds
- cache dependencies
- clean up dependencies
- own your stack
  - taking more code into your ownership can reduce dependency bloat