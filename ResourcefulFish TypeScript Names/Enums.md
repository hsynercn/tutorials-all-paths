# ResourcefulFish

## Enums

### Enums in Detail

Enumerations, or enums for short, allow you to create a custom data type with a finite set of possible values. Often, you won't care what those values actually are, you just want some way to represent distinct possibilities so that your code can handle them in different ways.

By default, TypeScript assigns integers to your enum members starting from zero. (You will see how to customise this later on.)

Enums are declared and used as follows:

```ts
enum Orientation {
  North, // corresponds to the value 0
  East, // 1
  South, // 2
  West // 3
}

function turnRight (startOrientation: Orientation): Orientation {
  case Orientation.North:
    return Orientation.East
  case Orientation.East:
    return Orientation.South
  case Orientation.South:
    return Orientation.West
  case Orientation.West:
    return Orientation.North
}
```

At the type level, enums are similar to unions of literal types:

```ts
type Orientation =
  | 0 // North
  | 1 // East
  | 2 // South
  | 3 // West
```

However, enums have the advantage that you can provide more meaningful labels for the values as part of your actual code (not just as comments).

There's also a fundamental difference in how they are interpreted, in that enums have a run-time representation. There is a little more to this representation, as you will see later, but as a first approximation you can think of the Orientation enum defined above as an object with (readonly) properties for each of the possible orientations:

```ts
const Orientation = {
  North: 0,
  East: 1,
  South: 2,
  West: 3,
}
```

You can use the values of your numeric enum members as you would any other number, for example to simplify the implementation of the turnRight function above:

```ts
function turnRight(startOrientation: Orientation): Orientation {
  return (startOrientation + 1) % 4
}
```

But this is not necessarily desirable. The more explicit implementation above is easier to understand, and won't break if you ever change the order of your enum members, or otherwise change their values.

### Type Compatibility with Enums

Since enum members are numbers (by default), enum types are compatible with the number type. However, because they are intended to group distinct types of things, enum types are not compatible with each other (even though they may have some or all of their values in common).

```ts
enum Orientation {
  North,
  East,
  South,
  West,
}

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function turn(
  startOrientation: Orientation,
  numberOfTurns: number
): Orientation {
  const newOrientation = Math.floor(startOrientation + numberOfTurns) % 4
  return newOrientation < 0 ? newOrientation + 4 : newOrientation
}

// no error on the second argument - 'Orientation' is compatible with 'number'
turn(Orientation.North, Orientation.South)

// no error on the second argument - 'Direction' is compatible with 'number'
turn(Orientation.North, Direction.Down)

// error on the first argument:
// Argument of type 'Direction.Up' is not assignable to parameter of type 'Orientation'.
turn(Direction.Up, 3)
```

The incompatibility of enums with each other is another key difference with unions of literal types. With unions of literal types, the only way to have mutual incompatibility is to manually ensure that the types have no values in common.

The compatibilty of enums with number goes both ways: number is also compatible with enum types like Orientation and Direction. This is not type safe: there are infinitely many numbers, but only a finite - and typically quite small - number of values in any enum you might create.

This leniency in the type checker is to allow you to calculate an enum value arithmetically, without being forced to check (or assert) that the value is a legitimate instance of the enum type. The implementation of the turn function above (and of the simpler turnRight function on the previous slide) takes advantage of this: the value being returned has the type number, but we have specified a return type of Orientation. The compiler is trusting us to ensure that the function always returns an integer between 0 and 3, and will not raise an error if it doesn't.

### Customising Enum Member Values (and String Enums)

By default, enum members are given integer values starting from zero. You can start from a different value by providing an assignment to the first member of your enum:

```ts
enum Orientation {
  North = 1,
  East, // 2
  South, // 3
  West, // 4
}
```

You can also provide specific values for every member:

```ts
enum Orientation {
  North = 0,
  East = 90,
  South = 180,
  West = 270,
}
```

Enum members can also have string values:

```ts
enum Orientation {
  North = 'N'
  South = 'S',
  East = 'E',
  West = 'W'
}
```

Like numeric enum types and the number type, string enum types are compatible with the string type, but incompatible with each other.

While the number type is compatible with numeric enum types, however, the string type is not compatible with string enum types. In the case of string enums, there is no good reason to sacrifice type safety in this respect (you are not likely to want to calculate a string enum value dynamically).

### Reverse Mappings

An unusual feature of TypeScript enums, compared to enums in other languages, is that they come with built-in support for reverse mappings.

As we have seen, you can lookup an enum member's value using its key:

```ts
enum Orientation {
  North,
  East,
  South,
  West,
}

console.log(Orientation.North) // 0
console.log(Orientation.East) // 1
console.log(Orientation.South) // 2
console.log(Orientation.West) // 3
```

In addition, you can also lookup an enum member's key using its value:

```ts
console.log(Orientation[0]) // 'North'
console.log(Orientation[1]) // 'East'
console.log(Orientation[2]) // 'South'
console.log(Orientation[3]) // 'West'
```

In simple cases, enum member keys are essentially like (const) variable names: they provide internal documentation, and a way for you to access the corresponding value.

Because of reverse mappings, however, you have the option of also using these keys as values at run-time. This can be useful if you want to display those keys to your users (for example in a dropdown menu where they need to select one of the possible values), and also for testing whether a number is a valid instance of your enum:

```ts
function orientationSelectHtml(): string {
  let html = "<select>"
  for (let i = 0; i < 4; i += 1) {
    html += `<option value="${i}">${Orientation[i]}</option>`
  }
  html += "</select>"
  return html
}

function isOrientation(n: number): n is Orientation {
  return Orientation[n] !== undefined
}
```

Note, however, that functions like isOrientation will only work for numeric enums, not string enums, for a reason you will see in the next slide.

### Enums at Run-Time

At the type level, enums are similar to unions of literal types. But unlike unions of literal types, enums are also values at run-time.

Specifically, enums are compiled to objects with entries for each of the enum members and their reverse mappings:

```ts
// TypeScript source:
enum Orientation {
  North = 0,
  East = 90,
  South = 180,
  West = 270,
}

// corresponding JavaScript value:
const Orientation = {
  0: "North",
  90: "East",
  180: "South",
  270: "West",
  North: 0,
  East: 90,
  South: 180,
  West: 270,
}
```

```ts
// TypeScript source:
enum Orientation {
  North = 'N'
  East = 'E',
  South = 'S',
  West = 'W'
}

// corresponding JavaScript value:
const Orientation = {
  N: 'North',
  E: 'East',
  S: 'South',
  W: 'West',
  North: 'N',
  East: 'E',
  South: 'S',
  West: 'W'
}
```

With numeric enums, you can use this run-time object to test whether any given number is an instance of the enum (as you saw on the previous slide), and also to generate an array of all the possible values:

```ts
enum Orientation {
  North = 0,
  East = 90,
  South = 180,
  West = 270,
}

function isOrientation(n: number): n is Orientation {
  return Orientation[n] !== undefined
}

const orientations = Object.values(Orientation).filter(
  (x) => typeof x === "number"
)
console.log(orientations) // [0, 90, 180, 270]
```

With string enums, however, these two uses are not possible, since there is no way to distinguish which of the object's values are the enum's values, and which are its keys (as part of the reverse mapping).

### const Enums

Enums are a convenient way to group a set of constant values together, and give you a type for that set of values, much like you would with a union of literal types.

Because enums are compiled to objects at run-time, there are also other things you can do with them in your code, such as lookup the key of a given value (using the reverse mapping) or loop over all the possible values.

When you do not need any of these extra run-time features, however, you can use a (more efficient) const enum, declared like this:

```ts
const enum Orientation {
  North,
  East,
  South,
  West,
}
```

const enums are completely removed from your JavaScript code during compilation. There is no object corresponding to a const enum, and enum members are inlined:

```ts
// source TypeScript:
const enum Orientation {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W'
}

function turnRight (orientation: Orientation): Orientation {
  case Orientation.North:
    return Orientation.East
  case Orientation.East:
    return Orientation.South
  case Orientation.South:
    return Orientation.West
  case Orientation.West:
    return Orientation.North
}

// compiled JavaScript:
function turnRight (orientation) {
  case 'N':
    return 'E'
  case 'E':
    return 'S'
  case 'S':
    return 'W'
  case 'W':
    return 'N'
}
```

The lack of any run-time representation brings const enums a step closer to unions of literal types. You still have the benefit of providing meaningful labels to each value in your source code, but these labels will no longer be available at run-time (or visible anywhere in your compiled JavaScript code).
