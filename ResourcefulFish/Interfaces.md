# ResourcefulFish

## Interfaces

### Interface Declarations

To describe the shape of your objects in TypeScript you can use object types, and assign these to type aliases.

```ts
type Person = {
  firstName: string
  lastName: string
}

const person: Person = {
  firstName: "Jack",
  lastName: "Dorsalfin",
}
```

Another way to describe the shape of your objects is to use an interface declaration, like this:

```ts
interface Person {
  firstName: string
  lastName: string
}

const person: Person = {
  firstName: "Jack",
  lastName: "Dorsalfin",
}
```

As these examples show, interfaces and object types are very similar. For the most part the choice of which one to use comes down to style and personal preference - though there are a couple of practical differences that you will see in the course of this session.

In general, where object types are naturally used for typing objects, interfaces are the standard thing to use when typing classes. TypeScript's idea of an interface is borrowed from languages like C# or Java, in which classes (and interfaces which they can implement) feature heavily. And it is no coincidence that the syntax for interface declarations matches the syntax for class declarations exactly.

### Implementing Interfaces

Interfaces are most useful alongside class definitions. A class definition can implement an interface, meaning that the class definition must match the shape of the interface.

To implement an interface, you use the implements keyword after the class declaration and name:

```ts
interface Named {
  firstName: string
  lastName: string
  fullName: () => string
}

class Person implements Named {
  firstName: string
  lastName: string

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
```

The class must contain methods and properties matching the types of those declared in the interface. But there are no constraints around how those methods are implemented or how the properties are initialised.

You will typically define an interface when you have a common contract that needs to be implemented in more than one class. The interface defines what can be done with an implementing class, but not how that class does it.

```ts
class Employee implements Named {
  firstName: string
  lastName: string
  department: string

  constructor(firstName: string, lastName: string, department: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.department = department
  }

  fullName() {
    return `${this.lastName.toUpperCase()}, ${this.firstName}`
  }
}
```

Employee contains an additional property (department), and implements the fullName method differently from Person, but still matches the contract defined in the Named interface.

A class can implement several interfaces if necessary, by adding additional interfaces after the implements keyword, separated by commas.

```ts
interface Named {
  firstName: string
  lastName: string
  fullName: () => string
}

interface Salaried {
  department: string
  salary: number
}

class Employee implements Named, Salaried {
  firstName: string
  lastName: string
  department: string
  salary: number

  constructor(
    firstName: string,
    lastName: string,
    department: string,
    salary: number
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.department = department
    this.salary = number
  }

  fullName() {
    return `${this.lastName.toUpperCase()}, ${this.firstName}`
  }
}
```

Classes can implement object types as well as interfaces, and the rules for doing so are exactly the same. But this is not a typical use of object types - if you want a type for your classes to implement, an interface would be more natural.

### Extending Interfaces

Interfaces can be extended with a new interface declaration, to build on an existing interface with additional properties and/or methods.

You extend an interface using the extends keyword.

```ts
interface Named {
  firstName: string
  lastName: string
}

interface Contactable extends Named {
  email: string
}

interface Billable extends Named {
  address: string
  paymentMethod: PaymentMethod
}
```

Here the Contactable and Billable interfaces will include all the properties declared in Named, as well as their own ones.

You might want to extend an interface when you have a particular situation that requires additional functionality, in much the same way that you might extend a class in JavaScript. It allows you to declare classes with some additional aspects whilst still having classes and objects that you are sure match the broader interface type.

### Extending Interfaces vs Intersection Types

Extending an interface is a lot like intersecting an object type:

```ts
// intersecting object types
type Named = {
  firstName: string
  lastName: string
}

type Employee = Named & {
  salary: number
}

// extending interfaces
interface Named {
  firstName: string
  lastName: string
}

interface Employee extends Named {
  salary: number
}
```

One of the ways in which object types and interfaces differ, however, is in how intersections and extensions behave when the types being combined have properties with the same key but different types.

With object types, the intersection applies all the way down, with the resulting property being itself the intersection of the two property types.

```ts
type Named = {
  name: {
    firstName: string
    lastName: string
  }
}

type Titled = Named & {
  name: {
    title: string
  }
}
```

The resulting Titled type will include a name property that has a firstName, lastName, and title.

With interfaces, in contrast, the type of the property in the extending interface will not be an intersection. It will instead be the type you specify in the extension, as long as that type is compatible with the corresponding type in the original interface. If it is not compatible, the declaration of the extending interface will give you an error.

```ts
interface Named {
  name: {
    firstName: string
    lastName: string
  }
}

// the name property here is compatible with the name property in Named
interface Titled extends Named {
  name: {
    title: string
    firstName: string
    lastName: string
  }
}

// the name property here is *not* compatible with the name property in Named,
// so the compiler raises an error
interface Titled extends Named {
  name: {
    title: string
  }
}
```

This corresponds to how things work when you extend one class with another. In JavaScript, the extending class will overwrite any common properties from the extended class. And TypeScript will only allow this when the property from the extending class is compatible with the property from the extended class (so that the compatibility of the class types as a whole is guaranteed).

### Declaration Merging

Interfaces, unlike object types, are extensible. This means that you can declare the same interface multiple times, and instead of giving you an error the compiler will silently combine these declarations into a single interface.

This is called declaration merging.

```ts
interface Named {
  firstName: string
  lastName: string
}

interface Named {
  fullName: () => string
}
```

In the example above, the final version of Named will be equivalent to this single declaration:

```ts
interface Named {
  firstName: string
  lastName: string
  fullName: () => string
}
```

Declaration merging can seem like a very strange characteristic, and making use of it for your own interfaces is very unlikely to be a good idea. There is no reason to spread out your interface declarations when you could much more clearly describe the interface in its entirety in one place.

Rather, declaration merging exists to enable you to work with other people's interface declarations, in libraries or other code, where you wouldn't necessarily have direct access to that code yourself. By redeclaring those interfaces in your own codebase, you can add to them to provide a more seamless integration into your modifications or extensions of those libraries.
