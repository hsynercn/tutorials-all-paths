# ResourcefulFish

## Tuples

### Tuples in Detail

A tuple is a fixed-length array, where each element is typed independently.

Tuples differ from regular arrays in both of these the respects: regular arrays have variable length, and each element has the same type.

Tuple types are written like array literals, but with types in place of values:

```ts
const coordinates: [number, number] = [25, 71]

const eelectedOffishial: [string, string, number] = [
  "Barracuda Obama",
  "Democrat",
  2009,
]
```

When accessing an element of a tuple with a literal index, the correct type is retrieved. When accessing an element of a tuple with a variable index, a union of the possible types is retrieved.

```ts
const inaugurated = eelectedOffishial[2] // inaugurated has type 'number'

let i = 1
const datum = eelectedOffishial[i] // datum has type 'string | number'
```

Trying to access or assign an element outside the known indices, meanwhile, results in an error.

```ts
eelectedOffishial[4] = 12 // Error: Tuple type '[string, string, number]' of length '3' has no element at index '4'.
```

Since arrays have variable length, the length property of an array has the type number. Since tuples are fixed-length, and the length is inferable from the type, the length property of a tuple has a literal type.

```ts
const coordinateTuple: [number, number] = [25, 71]
const coordinateArray: number[] = [25, 71]

const a = coordinateTuple.length // a has type '2'
const b = coordinateArray.length // b has type 'number'
```

### Using Tuples

Tuples enable you to group two or more values together, but without the extra scaffolding of wrapping them up in an object with named properties.

They can be particularly useful when you need to return multiple values from a function. Since JavaScript functions can only return a single value, you can return a single tuple containing the different values that you need.

```ts
function getAverages(nums: number[]): [number, number] {
  const counts: number[] = []
  let total: number = 0

  for (const n of nums) {
    total += n
    counts[n] = (counts[n] || 0) + 1
  }

  const mean: number = total / nums.length
  const maxCount: number = Math.max(...counts.filter((x) => x !== undefined))
  const mode: number = counts.findIndex((x) => x === maxCount)

  return [mean, mode]
}
```

When a function returns a tuple like this, it is common to immediately destructure the result, like so:

```ts
const [mean, mode] = getAverages([2, 6, 4, 3, 2, 6, 2])
```

Although tuples are used for grouping values together without giving them named properties, as of version 4.0 TypeScript allows you to add labels to each value.

```ts
const coordinates: [north: number, west: number] = [25, 72]

const eelectedOffishial: [name: string, party: string, inauguration: number] = [
  "Barracuda Obama",
  "Democrat",
  2009,
]
```

These labels have no significance or use at run-time, and tuple types that differ only in their labels are mutually compatible.

The main purpose of labels is just to serve as internal documentation to your code. The compiler will also use them in error messages or tooling hints in your code editor.

Note that if you include a label for one element in your tuple type, you have to include a label for them all.

```ts
const coordinates: [north: number, number] = [25, 72] // Error: Tuple members must all have names or all not have names.
```

### Readonly Tuples

JavaScript has no tuple type. At run-time, TypeScript tuples are just arrays.

Reflecting this fact, the TypeScript compiler doesn't prevent you from calling array methods on your tuples, including methods - like push, pop, shift, and unshift - that mutate the value.

This can lead to some type errors that the compiler is unable to catch:

```ts
const eelectedOffishial: [string, string, number] = [
  "Barracuda Obama",
  "Democrat",
  2009,
]

eelectedOffishial.unshift(true) // eelectedOffishial is now [true, 'Barracuda Obama', 'Democrat', 2009]

let name = eelectedOffishial[0] // name has type 'string', but its value is true :(

let inauguration = eelectedOffishial[2] // inauguration has type 'number', but its value is 'Democrat' :(

let length = eelectedOffishial.length // length has type '3', but its value is 4 :(
```

For this reason, it is often preferable to make your tuples readonly. You can do this in the same way that you can for arrays, with the readonly type modifier:

```ts
const eelectedOffishial: readonly [string, string, number] = [
  "Barracuda Obama",
  "Democrat",
  2009,
]

eelectedOffishial.unshift(true) // Error: Property 'unshift' does not exist on type 'readonly [string, string, number]'.
```

If your tuple is a let variable, you can still reassign the elements of a readonly tuple by reassigning the whole variable:

```ts
let eelectedOffishial: readonly [string, string, number] = [
  "Barracuda Obama",
  "Democrat",
  2009,
]

eelectedOffishial = ["Brill Clinton", eelectedOffishial[1], 1993] // reassign some elements
eelectedOffishial = ["Pilchard Nixon", "Republican", 1969] // reassign all elements
```

### Optional Elements

Tuples can include optional elements, annotated with a ? at the end of the type.

```ts
type NumberAndOptionalString = [number, string?]
```

If you include labels, the ? goes at the end of the label rather than the end of the type. (This matches the syntax of optional values in other cases, such as optional properties of object types or optional parameters in functions.)

```ts
type Session = [id: number, user?: string]

const anonymousSession: Session = [82]

const loggedInSession: Session = [104, "obama2009"]
```

Optional elements cannot be followed by any non-optional elements:

```ts
type Noisses = [string?, number] // Error: A required element cannot follow an optional element.
```

Optional elements can be followed by additional optional elements, however. In this case, the only way to include the later optional elements is if you include all the previous optional elements as well.

```ts
type Session = [id: number, user?: string, isAdmin?: true]

const regularUser: Session = [12, "obama2009"]

const adminUser: Session = [99, "obama2009", true]

const anonymousAdmin: Session = [54, true] // Error: Type 'boolean' is not assignable to type 'string'.
```

One particular use case for optional elements is in creating a type for a max-length array:

```ts
const none: [number?, number?, number?] = [] // ok
const one: [number?, number?, number?] = [1] // ok
const two: [number?, number?, number?] = [1, 2] // ok
const three: [number?, number?, number?] = [1, 2, 3] // ok
const four: [number?, number?, number?] = [1, 2, 3, 4] // Error: Source has 4 element(s) but target allows only 3.
```

By combining optional elements with non-optional elements, you can also create an array with minimum and maximum length bounds:

```ts
const one: [number, number, number?, number?] = [1] // Error: Source has 1 element(s) but target requires 2.
const five: [number, number, number?, number?] = [1, 2, 3, 4, 5] // Error: Source has 5 element(s) but target allows only 4.
```

Note, however, that the compiler can only pick up on these errors when you make direct assignments like the ones shown here. As with tuples in general, you will still be able to push elements to the underlying array beyond the limit specified by the type.

Unless you also make these tuples readonly, therefore, there is no guarantee that they will not exceed that length at run-time.

### Variadic Tuple Types

A variadic tuple is something between a tuple and an array. Its elements can be typed independently, but it also has a variable length.

This trick is achieved using the spread operator in the type definition:

```ts
const numberWithStrings: [number, ...string[]] = [1, "two", "three", "four"]
```

The type [number, ...string[]] is a variadic tuple consisting of a number at index 0, and zero or more strings after that.

TypeScript has no native type for non-empty arrays. But you can create your own using a variadic tuple type:

```ts
const a: [number, ...number[]] = [1] // ok
const b: [number, ...number[]] = [1, 2, 3, 4, 5] // ok
const c: [number, ...number[]] = [] // Error: Source has 0 element(s) but target requires 1.
```

More generally, you can create any min-length array type:

```ts
const d: [number, number, ...number[]] = [1] // Error: Source has 1 element(s) but target requires 2.
```

### Unchecked Indexed Access with Variadic Tuple Types

By default, TypeScript assumes that any array element that you access directly is defined, although in fact it may not be.

```ts
const totals: number[] = [1, 2, 3]

// firstTotal has type 'number' :/
const firstTotal = totals[0]

// fourthTotal has type 'number' :(
const fourthTotal = totals[3]
```

For greater type safety in this respect, you can enable the noUncheckedIndexedAccess compiler option, which will result in firstTotal and fourthTotal in the example above both having the type number | undefined.

The variadic part of a variadic tuple type behaves in exactly the same way as arrays in this respect. By default, TypeScript will assume that any element that you access from the end of the tuple is defined, even though it may not be.

```ts
const a: [number, ...string[]] = [1, "two"]

const first = a[0] // first has type 'number' :)

const second = a[1] // second has type 'string' :/

const third = a[2] // third has type 'string' :(
```

If you can enable the noUncheckedIndexedAccess flag, however, the type of any element accessed from the end of the tuple will be a union with undefined:

```ts
const a: [number, ...string[]] = [1, "two"]

const first = a[0] // first has type 'number' :)

const second = a[1] // second has type 'string | undefined' :/

const third = a[2] // third has type 'string | undefined' :)
```
