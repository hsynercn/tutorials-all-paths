# ResourcefulFish

## Type Narrowing

### Type Narrowing in Detail

TypeScript is a statically typed language, meaning that the type of each variable cannot change from one line to the next. Thanks to TypeScript's sophisticated control flow analysis, however, the type of each variable will be narrowed based on what can be determined about that variable in context.

TypeScript's control flow analysis works by keeping track of certain key expressions (typically Boolean expressions), called type guards, the value of which can be used to determine the types of your variables more precisely than their type annotation alone.

The most straightforward kind of control flow analysis applies type narrowing inside if/else blocks where the condition is a type guard.

```ts
function partition(array: (string | number)[]): [string[], number[]] {
  const strings: string[] = []
  const numbers: number[] = []

  array.forEach((x) => {
    if (typeof x === "string") {
      // x's type has been narrowed to 'string' here
      // so the compiler will let us push it onto an array of strings
      strings.push(x)
    } else {
      // x's type has been narrowed to 'number' here
      // so the compiler will let us push it onto an array of numbers
      numbers.push(x)
    }
  })

  return [strings, numbers]
}
```

TypeScript's control flow analysis also works on switch statements, and understands early returns inside function bodies.

```ts
function partition(array: (string | number)[]): [string[], number[]] {
  const strings: string[] = []
  const numbers: number[] = []

  array.forEach((x) => {
    switch (typeof x) {
      case "string":
        strings.push(x)
        break
      case "number":
        numbers.push(x)
        break
    }
  })

  return [strings, numbers]
}
```

### Type Guards

TypeScript uses the following type guards to narrow the types of your variables.

1. Equality Assertions

TypeScript can narrow the type of a variable if you assert it to be equal to a value or another variable with a narrower type.

```ts
function whatAmI(numberOrString: number | string) {
  if (numberOrString === 12) {
    // numberOrString's type is narrowed to 'number'
  }

  let str: string = "this is a string"
  if (numberOrString === str) {
    // numberOrString's type is narrowed to 'string'
  }
}
```

2. Assignments

Similarly, TypeScript can narrow the type of a variable if you have just set it to be equal to a value or another variable with a narrower type.

```ts
function whatAmI(numberOrString: number | string) {
  numberOrString = 12
  // numberOrString's type is narrowed to 'number'

  let str: string = "this is a string"
  numberOrString = str
  // numberOrString's type is narrowed to 'string'
}
```

Note that assignments aren't Boolean expressions, so these are an exception to the general rule that type guards are Boolean expressions. But in the relevant respect they are equivalent to Boolean expressions: having seen the assignment, the compiler can tell that the corresponding equality assertion is true.

3. typeof Expressions

Perhaps the most intuitive kind of type guard is a typeof expression. If you assert that typeof applied to your variable equals a certain value, TypeScript will narrow its type accordingly.

```ts
function whatAmI(numberOrString: number | string) {
  if (typeof numberOrString === "number") {
    // numberOrString's type is narrowed to 'number'
  }

  if (typeof numberOrString === "string") {
    // numberOrString's type is narrowed to 'string'
  }
}
```

Note that TypeScript is aware that typeof null evaluates to 'object', and so you will need to combine typeof value === 'object' with an (in)equality assertion to narrow between objects and null.

```ts
function whatAmI(nullOrObjectOrString: null | object | string) {
  if (
    typeof nullOrObjectOrString === "object" &&
    nullOrObjectOrString !== null
  ) {
    // nullOrObjectOrString's type is narrowed to 'object'
  }
}
```

4. instanceof Expressions

To narrow between different class types, you can use instanceof expressions.

```ts
class Antelope {
  name: string
  horns: number

  constructor(name: string, horns: number) {
    // ...
  }
}

class Cheetah {
  name: string
  spots: number

  constructor(name: string, spots: number) {
    // ...
  }
}

function whatAmI(animal: Antelope | Cheetah) {
  if (animal instanceof Antelope) {
    // animal's type is narrowed to 'Antelope'
  }

  if (animal instanceof Cheetah) {
    // animal's type is narrowed to 'Cheetah'
  }
}
```

5. in Expressions

More generally, to narrow between different object types you can use the in operator, as long as the property you are testing for is only present on some of the possible types.

```ts
type Antelope = {
  name: string
  horns: number
}

type Cheetah = {
  name: string
  spots: number
}

function whatAmI(animal: Antelope | Cheetah) {
  if ("horns" in animal) {
    // animals's type is narrowed to 'Antelope'
  }

  if ("spots" in animal) {
    // animals's type is narrowed to 'Cheetah'
  }
}
```

6. Array.isArray

If your variable may or may not be an array, you can use Array.isArray to narrow it accordingly.

```ts
function whatAmI(oneOrMany: number | number[]) {
  if (Array.isArray(oneOrMany)) {
    // oneOrMany's type is narrowed to 'number[]'
  } else {
    // oneOrMany's type is narrowed to 'number'
  }
}
```

7. Truthiness Checks

Though truthiness checks aren't strictly Boolean expressions, they serve the same purpose, and TypeScript will use them to narrow your types wherever possible. This is commonly used to distinguish undefined from other types, for example when working with optional parameters.

```ts
function whatAmI(optionalString?: string) {
  if (optionalString) {
    // optionalString's type is narrowed to 'string'
  } else {
    // note optionalString's type is **not** narrowed to 'undefined' here
    // because it might be the empty string!
  }
}
```

### Type Predicates (Custom Type Guards)

You can write your own custom type guards in the form of predicate functions.

Predicate functions take a single parameter, and return true or false, depending on whether the value passed to the function has a certain property. You can write a predicate function to test whether a value is of a particular type, signalling this to the compiler by giving the function a type predicate as its return type, of the form < parameter > is < Type >.

In the example below, the isAntelope function is not given a type predicate as its return type, so the compiler is not able to use this function to narrow the type of any animal variables (it is not smart enough to work this out by itself). In contrast, the isCheetah function is given a type predicate as its return type, giving the compiler the extra information it needs to use this function as a type guard.

```ts
type Antelope = { horns: number }

type Cheetah = { spots: number }

function isAntelope(animal: Antelope | Cheetah): boolean {
  return "horns" in animal
}

function isCheetah(animal: Antelope | Cheetah): animal is Cheetah {
  return "spots" in animal
}

function whatAmI(animal: Antelope | Cheetah) {
  if (isAntelope(animal)) {
    // animal's type is *not* narrowed to 'Antelope'
    // the compiler is not smart enough to understand your code by itself
  }

  if (isCheetah(animal)) {
    // animal's type *is* narrowed to 'Cheetah'
    // the type predicate `animal is Cheetah` tells the compiler what's going on
  }
}
```

In principle, type predicates can be used to tell the compiler how to narrow your types in ways that it otherwise wouldn't know how to do. It is rare that you would need to do this, however, given how effective the built-in type narrowing is.

The main purpose of type predicates is simply to provide more readable (and reusable) code.

They are also very useful when filtering arrays. By default, the compiler is not able to determine the type of elements in a filtered array very precisely, and the computed type of the filter method applied to an array of a union type will still be an array of that union type, even if you can see that only values of one of the subtypes will be included in the filtered array.

```ts
const animals: (Antelope | Cheetah)[] = [
  { horns: 2 },
  { spots: 157 },
  // etc.
]

const cheetahs: Cheetah[] = animals.filter((animal) => "spots" in animal)
// Error: Type '(Antelope | Cheetah)[]' is not assignable to type 'Cheetah[]'
```

By filtering an array with a predicate function, however, the type of the resulting array is narrowed appropriately.

```ts
const animals: (Antelope | Cheetah)[] = [
  { horns: 2 },
  { spots: 157 },
  // etc.
]

function isCheetah(animal: Antelope | Cheetah): animal is Cheetah {
  return "spots" in animal
}

const cheetahs: Cheetah[] = animals.filter(isCheetah) // no error
```

### Type Narrowing with Tagged Unions

When working with unions of object types, a useful pattern is to include a discriminating property in each case, i.e. a property with the same name but an incompatible type (typically a literal type). The resulting union type is known as a tagged union.

```ts
type Antelope = {
  name: string
  horns: number
}

type Bonobo = {
  name: string
  age: number
}

type Cheetah = {
  name: string
  spots: number
}

type Animal =
  | { tag: "Antelope"; value: Antelope }
  | { tag: "Bonobo"; value: Bonobo }
  | { tag: "Cheetah"; value: Cheetah }
```

TypeScript will also use tests against the value of this discriminating property as a way of narrowing the type. This works with any kind of control flow analysis, but is particularly common with switch statements that range over the possible values of the discriminating property.

```ts
function whatAmI(animal: Animal) {
  switch (animal.tag) {
    case "Antelope":
      // animal.value's type is narrowed to 'Antelope'
      break
    case "Bonobo":
      // animal.value's type is narrowed to 'Bonobo'
      break
    case "Cheetah":
      // animal.value's type is narrowed to 'Cheetah'
      break
  }
}
```

### Exhaustiveness Checks with Union Types

When writing a switch statement over a union type, you will often want to ensure that all possible subtypes are considered. In some cases - notably when returning a value from a function in each case - the compiler will tell you if you miss one of the possible values, since it will be able to determine that undefined will be implicitly returned in that case.

```ts
type Animal = Antelope | Bonobo | Cheetah

// Error: Function lacks ending return statement and return type does not include 'undefined'
function whatDoIEat(animal: Animal): string {
  switch (animal.tag) {
    case "Antelope":
      return "grass"
    // oops, we forgot about bonobos
    case "Cheetah":
      return "antelopes"
  }
}
```

But in other cases - for example when switching inside a void function - there will be nothing in the logic of the situation to force an error if possible values are forgotten. In these cases, there is a standard trick you can apply that takes advantage of type narrowing, and makes use of the never type.

```ts
type Animal = Antelope | Bonobo | Cheetah

function makeSomeNoise(animal: Animal): void {
  switch (animal.tag) {
    case "Antelope":
      console.log("baa")
      break
    case "Bonobo":
      console.log("waah")
      break
    case "Cheetah":
      console.log("meow")
      break
    default:
      const exhaustivenessCheck: never = animal
      break
  }
}
```

In the default branch here the type of the animal variable will be narrowed to never if you've covered all the possible cases - since there will be nothing left that the animal variable can be. If you miss a case, however, the type won't be sufficiently narrowed and the assignment will raise an error.

Note that the problem here, and this solution, applies to any union type and any kind of type narrowing over that union. But as switching over a discriminating property is such a convenient way to narrow union types, it is particularly common to see exhaustiveness checks applied to tagged unions and switch statements in this way.
