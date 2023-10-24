-----------------------
articleLink: https://blog.carlosrojas.dev/quick-reference-guide-to-design-patterns-in-js-1ebeb1e1c605
articleTitle: Quick Reference Guide to Design Patterns in JS. | by Carlos Rojas | Oct, 2023 | Medium
createdOn: 2023-10-19T15:24:03.626Z
updatedOn: 2023-10-19T15:24:03.626Z
-----------------------

TL;DR: Good ref guide for high level implementation patterns - may want further reading for proper implementation details

### Creational
- singleton - one instance of the object globally
- prototype - create new objects based on an existing one w/ default values
- factory - create new objects, delegating class creation to factory class
- abstract factory - factory class creates new object that is from an abstract class, no guarantee of concrete class

### Structural
- adapter - allow multiple classes to work together via a shared interface and wrapping classes that don't fit in the interface into adapter classes
- bridge - one interface can build different implementations depending on the use case
- composite - create objects with properties that are primitives or collections of objects that can contain itself
  - creates deeply nested data structures
- decorator - allows extending object behavior dynamically at runtime
- facade - provides a simplified API to a set of interfaces in a subsystem
- flyweight - conserve memory by sharing fine-grained objects between consuming objects
- proxy - provide a surrogate/placeholder object to another object which controls access to the real target object

### Behavioral
- chain of responsibility - pass requests along a chain of objects that have a chance to handle a request
  - each object can either process the request, or pass it on
- command - encapsulates a request as an object to pass requests as method args, delay to queue a request's execution
- interpreter - create a grammar for simple language when a thing occurs a lot
- iterator - allow access to elements in a collection w/o exposing the underlying representation
- mediator - reduce dependencies between objects by defining an object that encapsulates how the objects interact
- memento - allows externalizing an object's internal state so the object can later be returned to this state
- observer - defines one-to-many dependency between objects so when the target object's state changes, dependencies are notified and can update themselves
- state - allows an object to alter its behavior when its internal state changes
- strategy - defines a family of interchangeable algorithms an object can use to solve a problem
- template - define a skeleton algorithm in a superclass, but allow subclasses to override specific steps of the algorithm w/o changing its structure
- visitor - allow separate algorithms for different kinds of object, depending on the object to operate on
