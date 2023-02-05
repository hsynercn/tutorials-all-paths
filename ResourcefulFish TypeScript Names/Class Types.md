# ResourcefulFish

## Class Types

### Classes in JavaScript and TypeScript

ES2015 added the class keyword to JavaScript. This keyword did not add any new functionality to the language, but provided "syntactic sugar" for writing constructor functions.

```ts
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

const person = new Person("Goldie", "Prawn")
person.getFullName() // 'Goldie Prawn'
```

A class in JavaScript is essentially just a function that creates an object when you call that function using the new keyword. You can set properties and methods on a function's prototype that will be inherited by any objects created.

The above class declaration is exactly equivalent to:

```ts
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`
}
```

TypeScript provides full type support for the JavaScript class syntax, as well as some additional features for working with classes that are not available in JavaScript by itself.

TypeScript is also able to transpile class syntax down to its pre-ES2015 equivalent, for compatibility with older JavaScript environments like Internet Explorer. Indeed, before ES2015 was widely supported (or even completely finalised), TypeScript provided an early way to use this syntax.

### Types for Classes

When declaring a class in TypeScript, you can include type annotations and property modifiers in very much the same way you would when writing interfaces or object types.

```ts
class Person {
  readonly firstName: string
  readonly lastName: string
  age?: number

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
```

Notice that declaring a property as readonly does not prevent you from assigning it an initial value in the constructor - but it will prevent you from reassigning it a new value anywhere else.

When you declare a class, you automatically get a corresponding type (with the same name) for the instances of that class, that you can use much like any interface or object type. This will be the inferred type of any objects created by calling your class constructor with new. You can also use it as the type of any object created in any other way (e.g. as an object literal), as long as the type of that object matches.

```ts
const goldie: Person = new Person("Goldie", "Prawn")

const marky = new Person("Marky", "Shark") // marky has an inferred type of Person

// shark can be a Person too, since it has properties and methods with all the same types
const shark: Person = {
  firstName: "Shark",
  lastName: "Ruffalo",
  getFullName() {
    return "boo!"
  },
}
```

Since a class in JavaScript is itself a runtime object distinct from its instances - a function that is intended to be called with the new keyword - you automatically get a type for that function as well. This type is written as typeof ClassName (as opposed to just ClassName, which is the type for instances of the class). It is unlikely you will have to use the type typeof ClassName, but that is how the TypeScript compiler distinguishes them.

Static class members are only available on the class constructor, not on its instances. All other class members are only available on the instances, not the constructor. The two types that are generated from your class declarations reflect this.

```ts
class Person {
  static greet(person: Person): void {
    console.log(`Hello ${person.getFullName()}`)
  }

  firstName: string
  lastName: string

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}

const goldie = new Person("Goldie", "Prawn")
```

goldie is of type Person and has instance members but not static members:

```ts
goldie.firstName // 'Goldie'
goldie.greet() // ERROR: Property 'greet' does not exist on type 'Person'.
// Did you mean to access the static member 'Person.greet' instead?
```

Person is of type typeof Person and has static members but not instance members:

```ts
Person.greet(goldie) // 'Hello Goldie Prawn'
Person.firstName // ERROR: Property 'firstName' does not exist on type 'typeof Person'.
```

#### public and private Class Members

Class members can be either public or private. public class members are accessible anywhere, while private class members are only accessible inside instances of the class.

Class members are all public by default, so you never need to include the public keyword, but it can be included just for clarity and internal documentation.

```ts
class Person {
  firstName: string
  public lastName: string
  private yearOfBirth: number

  constructor(firstName: string, lastName: string, yearOfBirth: number) {
    this.firstName = firstName
    this.lastName = lastName
    this.yearOfBirth = yearOfBirth
  }

  public getAge() {
    return new Date(Date.now()).getFullYear() - this.yearOfBirth
  }
}

const goldie = new Person("Goldie", "Prawn", 1945)

console.log(goldie.firstName) // 'Goldie'
console.log(goldie.lastName) // 'Prawn'
console.log(goldie.yearOfBirth) // ERROR: Property 'yearOfBirth' is private and only accessible within class 'Person'.
```

Note that private members of a class instance are not only accessible to that instance itself, but also to other instances of the same class. This is known as cross-instance access. This can be useful when you need to be able to compare class instances with each other based on their private members.

```ts
class Person {
  // as above ...

  public isOlderThan(otherPerson: Person): boolean {
    // accessing otherPerson.yearOfBirth is allowed here
    return this.yearOfBirth < otherPerson.yearOfBirth
  }
}
```

It is important to remember that the private modifier only applies a compile time check that no code is accessing those properties outside the class declaration. There is nothing in principle to prevent these properties from being accessed at runtime.

Moreover, TypeScript intentionally provides an "escape hatch" for accessing private class members where they should not normally be accessible, by allowing access to them with bracket notation:

```ts
console.log(goldie.yearOfBirth) // ERROR: Property 'yearOfBirth' is private and only accessible within class 'Person'.
console.log(goldie["yearOfBirth"]) // 1945
```

This can potentially be useful when you need to reach into a third party library to do something that isn't possible in any other way.

Private Members in ES2017

ES2017 introduced runtime support for private class members. These are indicated with a hash # at the start of the member name.

```ts
class Person {
  firstName // public
  lastName // public
  #yearOfBirth // private
}
```

JavaScript private members are distinct from TypeScript private members, and the two cannot be combined (private #yearOfBirth will give you a compiler error). Both serve essentially the same purpose, but JavaScript private members are hard private, meaning that they are guaranteed to be private at runtime (you will get a runtime error if you try to access them).

### protected Class Members

Somewhere between public and private class members, you can have protected class members. These are only accessible inside instances of the class itself or its subclasses.

```ts
class Person {
  firstName: string
  lastName: string
  protected yearOfBirth: number

  constructor(firstName: string, lastName: string, yearOfBirth: number) {
    this.firstName = firstName
    this.lastName = lastName
    this.yearOfBirth = yearOfBirth
  }
}

class Employee extends Person {
  jobTitle: string

  constructor(
    firstName: string,
    lastName: string,
    yearOfBirth: number,
    jobTitle: string
  ) {
    super(firstName, lastName, yearOfBirth)
    this.jobTitle = jobTitle
  }

  getYearsToRetirement(): number {
    // access to this.yearOfBirth would not be allowed here if yearOfBirth was `private` -
    // but it is allowed, because yearOfBirth is only `protected`
    return new Date(Date.now()).getFullYear() - this.yearOfBirth - 65
  }
}
```

### Parameter Properties

When writing class constructors, it is common to pass in parameters that are then immediately set as properties of the instance.

```ts
class Person {
  public name: string
  private phoneNumber: number
  protected yearOfBirth: number

  constructor(name: string, phoneNumber: number, yearOfBirth: number) {
    this.name = name
    this.phoneNumber = phoneNumber
    this.yearOfBirth = yearOfBirth
  }
}
```

For convenience, TypeScript supports the parameter property syntax as a shorthand for this pattern:

```ts
class Person {
  constructor(
    public name: string,
    private phoneNumber: number,
    protected yearOfBirth: number
  ) {
    // no implementation required - TypeScript will write all of the boilerplate code for you
  }
}
```

Note that you can pass in additional parameters to your constructor, and implement additional logic inside it if necessary. TypeScript will add all of the property initialisations to the start of the function body, before any additional custom code.

In order for TypeScript to treat a parameter passed to a constructor function as an instance property, it must have some property modifier: public, private, protected, or readonly.

### Abstract Classes and Members

Sometimes you want a parent class with two or more subclasses that extend it with different particular functionality.

```ts
class Serializable {
  serialize() {
    return JSON.stringify(this)
  }
}

class Person extends Serializable {
  constructor(public firstName: string, public lastName: string) {
    super()
  }
}

class Film extends Serializable {
  constructor(public title: string, public yearOfRelease: number) {
    super()
  }
}

const person = new Person("Glodie Prawn")
const film = new Film("Overboard", 1987)

console.log(person.serialize()) // {"firstName":"Goldie","lastName":"Prawn"}
console.log(film.serialize()) // {"title":"Overboard","yearOfRelease":1987}
```

Abstract classes are for when you want a parent class that can never itself be instantiated. You can use them to house static members, and also common instance members that will be available in any class that extends them, but which wouldn't make sense outside the context of such a concrete, fleshed-out extension.

An abstract class is something between a class and an interface. It can include both concrete members that its subclasses will inherit (like a regular class), and abstract members that its subclasses must implement (like an interface).

```ts
abstract class Serializable {
  // serialize is a concrete method that extensions of this class will inherit
  serialize(): string {
    return JSON.stringify(this)
  }

  // prettify is an abstract method that extensions of this class must implement
  abstract prettify(): string
}

class Person extends Serializable {
  constructor(public firstName: string, public lastName: string) {
    super()
  }

  prettify(): string {
    return `${this.lastName}, ${this.firstName}`
  }
}
```

Abstract classes are compiled to real classes that could in principle be instantiated at run-time. But if you declare a class as abstract, any attempt to instantiate it will give you a compiler error.
