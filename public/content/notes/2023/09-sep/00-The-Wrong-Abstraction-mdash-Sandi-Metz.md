-----------------------
articleLink: https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction
articleTitle: The Wrong Abstraction &mdash; Sandi Metz
createdOn: 2023-09-06T04:34:32.272Z
updatedOn: 2023-09-06T04:34:32.272Z
-----------------------

- idioms
  - > duplication is far cheaper than the wrong abstraction
  - > prefer duplication over the wrong abstraction
- ["all the little things" talk](https://youtu.be/8bZh5LMaSmE)
- existing code exerts a powerful influence - its presence argues that it is both correct and necessary
- when dealing with the wrong abstraction, the fastest way forward is back
  - do the following
    - re-introduce duplication by inlining the abstracted code back into every caller.
    - within each caller, use the parameters being passed to determine the subset of the inlined code that this specific caller executes
    - delete the bits that aren't needed for this particular caller
  - this reduces each caller to only the code it needs
  - do not fall victim to sunk cost fallacy here
