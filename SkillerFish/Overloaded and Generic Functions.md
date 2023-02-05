# SkillerFish

## Overloaded and Generic Functions

### Typing Polymorphic Functions

A lot of the functions that you write will take parameters of one fixed type, and always return a value of one fixed type. Providing type annotations for these functions is just a matter of specifying all the types.

But sometimes you will want to write polymorphic functions - functions that can accept parameters of different types, and potentially return values of different types as well.

In some cases, such as when you have a fixed number of parameter types and/or a single return type, you can annotate polymorphic functions with union types or one of the built-in supertypes (like object or unknown). For example:

```ts
function format(value: number | string, leftPadding: number): string {
  if (typeof value === "string") {
    return value.padStart(leftPadding)
  }

  if (typeof value === "number") {
    return value.toString().padStart(leftPadding)
  }
}

function typeOf(value: unknown): string {
  if (typeof value === null) {
    return "null"
  }

  if (Array.isArray(value)) {
    return "array"
  }

  return typeof value
}
```

But union types and built-in supertypes are inadequate when you need to accommodate an arbitrary number of parameter types, when the relationship between the parameters types is particularly complex, or when the return type depends on the types of the parameters. In these cases you will either want to use function overload signatures or generic function signatures (or both).

### Overloaded Functions

Consider the following function, annotated using union types:

```ts
function makeBigger(value: string | number): string | number {
  if (typeof value === "string") {
    return value.toUpperCase()
  }

  if (typeof value === "number") {
    return value * 10
  }
}
```

This function signature will compile correctly, and will prevent you from calling the function with anything other than a string or a number. But the type signature is less than ideal.

As you can see, if you pass this function a string it will return a string, and if you pass it a number it will return a number. But the compiler doesn't know this: the return type of any calls to this function will always be the union string | number.

One way to solve this problem is to write overload signatures like this:

```ts
function makeBigger(value: string): string
function makeBigger(value: number): number
function makeBigger(value: string | number): string | number {
  // implementation as above
}
```

Overload signatures must be written immediately above the function itself. They can be used to tell the compiler precisely what return type to expect given the parameter types, as above. They can also be used to tell the compiler precisely which combinations of parameter types should be allowed:

```ts
function getTimestamp(): number
function getTimestamp(yearOrDateString: string): number
function getTimestamp(yearOrDateString: number, month: number, day?: number, hours?: number, seconds?: number, milliseconds?: number): number
function getTimestamp(
  yearOrDateString?: number | string,
  month?: number,
  day?: number,
  hours?: number,
  seconds?: number,
  milliseconds?: number
): number {
  if (yearOrDateString === undefined) {
    return Date.now()
  }

  if (typeof yearOrDateString === "string") {
    return Date.parse(yearOrDateString)
  }

  if (typeof yearOrDateString === "number" && month !== undefined) {
    return new Date(yearOrDateString, month, day, hours, seconds, milliseconds).getDate()
  }

  throw new Error("invalid arguments")
}
```

When validating calls to overloaded functions, TypeScript will not look at the function's call signature, but only at the overload signatures. If it finds a match, it will use that to determine the return type; and if it doesn't find a match, it raises an error:

```ts
const now = getTimestamp()
const then = getTimestamp("December 17, 1995 03:24:00")
const theDistantFuture = getTimestamp(3000, 1)

const when = getTimestamp("December 17, 1995 03:24:00", 12)
/*                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/* ⚠ Argument of type 'string' is not assignable to parameter of type 'number'. */

const nonsense = getTimestamp(2020)
/*                            ~~~~
/* ⚠ Argument of type 'number' is not assignable to parameter of type 'string'. */
```

Overload signatures can be a good choice when dealing with a finite number of possible type combinations. They are relatively easy to read and write, provide clear internal documentation, and provide you with good help from the compiler at the point where you call the function.

They provide limited help from the compiler when it comes to type-checking the implementation of your function, however. Overload signatures all have to be compatible with the call signature, but beyond that it is up to you to make sure that they accurately reflect what the function does. For example, the following incorrect code will not raise any errors in TypeScript:

```ts
function makeBigger(value: string): string
function makeBigger(value: number): number
function makeBigger(value: string | number): string | number {
  if (typeof value === "string") {
    return parseFloat(value) * 10 // return a number given a string
  }

  if (typeof value === "number") {
    return (value * 10).toString() // return a string given a number
  }
}
```

### Generic Functions

Supertypes and union types can be fine when the return type of your function doesn't change, and overload signatures are useful when you have a fixed number of possible parameter types. But when you need to allow for arbitrary parameter types and the return type depends on those types, you'll need to use a generic function signature. For example:

```ts
function addUUID<T>(value: T): { uuid: string, value: T } {
  return { uuid: crypto.randomUUID(), value }
}
```

Generic functions are often useful alongside generic types. For example, the return type of the function above is potentially worth its own generic type:

```ts
type WithUUID<T> = {
  uuid: string
  value: T
}

function addUUID<T>(value: T): WithUUID<T> {
  return { uuid: crypto.randomUUID(), value }
}
```

Generic functions can also be used when you have a fixed number of parameter types, by constraining the generic type parameter. In this way, they can sometimes be an alternative to function overloads:

```ts
function makeBigger<T extends string | number>(value: T): T {
  if (typeof value === "string") {
    return value.toUpperCase()
  }

  if (typeof value === "number") {
    return value * 10
  }
}
```

Generic function signatures like the above provide you with stronger type-checking in the implementation of your function than the corresponding solution with overload signatures. For this reason, they are generally to be preferred.

But in some cases the generic solution will be sufficiently convoluted that a cleaner and more readable set of overload signatures might be better. Notably, generic function signatures don't handle optional parameters very well. Consider this function to capitalise a string if it is defined:

```ts
function capitalise(value?: string): string | undefined {
  if (value === undefined || value === "") {
    return value
  }

  return `${value[0].toUpperCase()}${value.slice(1)}`
}
```

The return type here depends on the type of the parameter, and by simply using a union we lose that relationship. You might try to solve this with a generic function signature:

```ts
function capitalise<T extends string | undefined>(value?: T): T {
  if (value === undefined || value === "") {
    return value as T
  }

  return `${value[0].toUpperCase()}${value.slice(1)}` as T
}
```

But there are two issues here.

First, the compiler is not good at matching up the return value with the generic type in cases like these, so you need to add type assertions to get this function to compile. This may be fixed in a future version of TypeScript, but for now you don't benefit from the greater type safety that in general comes from generic function signatures.

Second, while the generic function signature understands that an explicitly undefined parameter will result in an undefined return value, there's no way of telling it what will result from a call to this function with no arguments. In this case, it simply defaults back to the union string | undefined:

```ts
capitalise() // string | undefined
```

Both of these problems can be fixed by using overload signatures instead:

```ts
function capitalise(): undefined
function capitalise(value: undefined): undefined
function capitalise(value: string): string
function capitalise(value?: string): string | undefined {
  // implementation as above
}
```

### Generic Functions with Constraints

Overload functions signatures can be combined with generic function signatures. Here, for example, two overloads are generic (generalising over the type of array or set), and the other two are not:

```ts
function truncate(value: number, limit: number): number
function truncate(value: string, limit: number): string
function truncate<T>(value: Array<T>, limit: number): Array<T>
function truncate<T>(value: Set<T>, limit: number): Set<T>
function truncate<T>(
  value: number | string | Array<T> | Set<T>,
  limit: number
): number | string | Array<T> | Set<T> {
  if (typeof value === "number") {
    return value < limit ? value : limit
  }
  if (typeof value === "string" || Array.isArray(value)) {
    return value.slice(0, limit)
  }
  if (value instanceof Set) {
    return new Set(Array.from(value).slice(0, limit))
  }
}
```

As you saw no the previous slide, type constraints in generic functions can be used as an alternative to overloads when you have a fixed number of parameter types. The function above could instead be typed more succinctly like this:

```ts
function truncate<T, U extends number | string | Array<T> | Set<T>>(
  value: U,
  limit: number
): U {
  // implementation as above
}
```

Type constraints in generic functions can also be used to specify the relationship between parameter or return types, by constraining one type in relation to another. For example, consider the following two functions with the same implementation but different intended uses, captured by the type signatures:

```ts
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 }
}

function update<T extends U, U extends object>(obj1: T, obj2: U): T {
  return { ...obj1, ...obj2 }
}
```

The merge function is intended to take two completely independent objects and combine all the properties into a single object.

The update function is intended to take a first object with some properties, and a second object with some subset of those properties - overwriting the values of the first with the values of the second. You can signal this by specifying that T (the type of the first parameter) must be a subtype of U (the type of the second parameter), because a subtype of one object will be an object with at least the same properties (and potentially other properties as well).

```ts
const whale: Whale = { type: "Skiller", likesToEat: ["facts"] }

const ada = update(whale, { likesToEat: ["facts", "vegetables"] }) // no error

const whoops = update(ada, { likesToOat: ["plankton's constant"] })
/*                           ~~~~~~~~~~
/* ⚠ Property 'likesToOat' is missing in type Whale */
```
