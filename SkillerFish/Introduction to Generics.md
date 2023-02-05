# SkillerFish

## Introduction to Generics

### Generic Functions

Sometimes you want a function to work with values of different types. In principle you can do this by using union types, or even the maximally general type unknown.

For example:

```ts
function set(array: readonly unknown[], index: number, value: unknown): unknown[] {
  if (typeof array[index] !== typeof value) {
    throw new Error("type of value must match type of array elements")
  }

  return [...array.slice(0, index), value, ...array.slice(index + 1)]
}
```

This function will work with arrays of any type. But there are two problems:

1. The compiler doesn't know that the type of the array elements and the type of the value are supposed to match. This is being handled with a (limited) run-time check, but it would be much nicer if TypeScript could enforce this at compile time.

2. There is nothing to match up the return type to the types of the parameters. If you pass this function an array of numbers, for example, you will get back an array of numbers - but the compiler doesn't know this, and will give the return value a type of unknown[].

You can fix both of these problems by using a generic function signature. A generic function signature expresses the relationship that has to hold between the parameter and return types of your function, no matter what those particular types are.

```ts
// generic function declaration
function set<T>(array: readonly T[], index: number, value: T): T[] {
  return [...array.slice(0, index), value, ...array.slice(index + 1)]
}

// generic function expression
const set = function <T>(array: readonly T[], index: number, value: T): T[] {
  return [...array.slice(0, index), value, ...array.slice(index + 1)]
}

// generic arrow function
const set = <T>(array: readonly T[], index: number, value: T): T[] =>
  [...array.slice(0, index), value, ...array.slice(index + 1)]
```

The important part here is the '< T >' in front of the parameter list, which means "for every type T". In the rest of the function signature, T does not refer to any particular type, but serves as a placeholder for a type. (You can call it whatever you like, but T is a standard choice when nothing else more meaningful comes to mind.)

This generic function signature says that the first argument is an array (of whatever type), the second argument is a number, the third argument is something with the same type as the elements in the array passed as the first argument; and that the function returns an array of that same type.

When you call a generic function, you can specify the particular type you intend to use like this:

```ts
set<string>(["one", "two", "three"], 1, "seven") // ["one", "seven", "three"]

set<number>([1, 2, 3], 1, 42) // [1, 42, 3]
```

Or you can just let TypeScript infer the type based on the arguments you pass in:

```ts
set(["one", "two", "three"], 1, "seven") // the inferred type is 'string'

set([1, 2, 3], 1, 42) // the inferred type is 'number'
```

Generic functions can range over multiple type placeholders, separated by commas inside the angle brackets:

```ts
function map<T, U>(array: T[], cb: (element: T) => U): U[] {
  return array.map(cb)
}

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

function merge<T, U>(object1: T, object2: U): T & U {
  return { ...object1, ...object2 }
}
```

### Generic Classes

In JavaScript, you can write class declarations. JavaScript doesn't technically have classes, but class declarations provide some syntactic sugar for writing constructor functions.

Constructor functions can be generic just like regular functions. In a class declaration, however, you can refer to your generic types anywhere inside the class, i.e. in any of the class's properties or methods.

Again, this can be particularly useful when working with classes for collections of some kind:

```ts
class ImmutableArray<T> {
  values: readonly T[]

  constructor(values: readonly T[]) {
    this.values = values
  }

  set(index: number, value: T): ImmutableArray<T> {
    return new ImmutableArray([...this.values.slice(0, index), value, ...this.values.slice(index + 1)])
  }

  get(index: number): T | undefined {
    return this.values[index]
  }

  append(...elements: T[]): ImmutableArray<T> {
    return new ImmutableArray([...this.values, ...elements])
  }

  drop(elementsToDrop: number): ImmutableArray<T> {
    return new ImmutableArray(this.values.slice(0, -elementsToDrop))
  }
}
```

As with any generic function, you can call a class constructor with an explicit type in the place of the generic, or you can just let the compiler infer this type based on the type of arguments you pass in:

```ts
const immutableNumbers = new ImmutableArray<number>([1, 2, 3])

const immutableStrings = new ImmutableArray(["one", "two", "three"])
```

Whether explicitly stated or inferred, a particular type will be attached to every instance of the class that you create. Consequently the methods you call on any given instance will have the corresponding particular type. In other words, the class is generic, but its instances are not.

```ts
const numbers1 = new ImmutableArray<number>([1, 2, 3])

const numbers2 = numbers1.append(4, 5, 6)

const numbers3 = numbers2.append("not a number")
/*                               ~~~~~~~~~~~~~~
/* ⚠ Argument of type 'string' is not assignable to parameter of type 'number'. */
```

### Generic Types and Interfaces

You can write generic types and interfaces in much the same way as you write generic classes.

#### Generic Interfaces

Just as you would write interfaces for classes to implement, you can write generic interfaces for generic classes to implement.

```ts
interface Collection<T> {
  values: T[]
  add(element: T): void
  remove(element: T): void
}

class Set<T> implements Collection<T> {
  values: T[]

  add(element: T): void {
    if (!this.values.includes(element)) {
      this.values.push(element)
    }
  }

  remove(element: T): void {
    const index = this.values.indexOf(element)
    if (index > -1) {
      this.values.splice(index, 1)
    }
  }
}
```

#### Generic Types

You can also use generic interfaces directly as object types, without implementing them in classes. But for greater flexibility - e.g. for working with union types - you can write generic type aliases instead.

This can be useful when you have some common shape of data, that can be filled out with different types in different contexts. For example:

```ts
type Request<T> =
  | { url: string; method: "GET" }
  | { url: string; method: "POST"; data: T }

type Response<T, U> =
  | { ok: true; data: T }
  | { ok: false; data: U }
```

When you annotate a variable with a generic type (or interface), you need to specify the type or types you intend to particularise it with (unlike with generic functions or classes, the compiler will not infer this for you):

```ts
type Whale = {
  name: string
  species: string
}

const request: Request<Whale> = {
  url: "/api/whale/create",
  method: "POST",
  data: { name: "Ada", species: "Skiller" },
}
```

### Type Constraints and Generic Parameter Defaults

Wherever you are using a generic type - in a generic function, class, interface, or type alias - you can optionally include type constraints and default types.

#### Type Constraints

Similar to providing type annotations for parameters to functions, you can provide type constraints for the type variables in your generics, using the extends keyword. For example:

```ts
type Request<T extends object> =
  | { url: string; method: "GET" }
  | { url: string; method: "POST"; data: T }

type BadRequest = Request<number>
/*                        ~~~~~~
/* ⚠ Type 'number' does not satisfy the constraint 'object'. */
```

TypeScript will not let you particularise a generic type with any type that is incompatible with the constraint.

With generic functions, TypeScript will not let you call the function with any value of an incompatible type. For instance, one of the examples from the first slide didn't actually have the best type signature, since the compiler would allow you to call the function with primitive values, leading to strange results:

```ts
function merge<T, U>(object1: T, object2: U): T & U {
  return { ...object1, ...object2 }
}

const weird = merge(true, "fish") // { 0: 'f', 1: 'i', 2: 's', 3: 'h' }
```

Here's a better type signature in this case:

```ts
function merge<T extends object, U extends object>(object1: T, object2: U): T & U {
  return { ...object1, ...object2 }
}

const weird = merge(true, "fish")
/*                  ~~~~
/* ⚠ Argument of type 'boolean' is not assignable to parameter of type 'object'. */
```

This asserts that whatever arguments you pass into this function must be compatible with the object type.

#### Generic Parameter Defaults

Similar to providing default values for parameters to functions, you can also provide default types for the type parameters in your generics:

```ts
type Response<T = object, U = Error> =
  | { ok: true; data: T }
  | { ok: false; data: U }

// if you want the default types, you don't have to specify them
const okResponse: Response = { ok: true; data: { some: "data" } }
const badResponse Response = { ok: false; data: new Error("server says no") }
```

If no other default type is appropriate in a particular case, a useful pattern is to set it to the most general type that applies. I.e. set it equal to the constraint if there is one, or to unknown if there isn't:

```ts
type Response<T = unknown, U extends Error = Error> =
  | { ok: true; data: T }
  | { ok: false; data: U }
```

This way you can use the generic as if it was a regular type when the general default suffices - i.e. without specifying a type in angle brackets - and only specify a type when you need more precision.

In principle you can add default types to generic functions and classes as well, but in practice it is rare that you would need to, since a type will be inferred when you call the function or instantiate the class.
