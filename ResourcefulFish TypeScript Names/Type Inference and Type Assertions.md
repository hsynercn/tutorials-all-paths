# ResourcefulFish

## Type Inference and Type Assertions

### Type Inference

In the absence of any type annotations or assertions in your code, TypeScript will infer the types of your variables and values.

Primitive values are inferred to have the corresponding primitive type, array literals are inferred to be arrays of unions of the inferred types of their elements, and object literals are inferred to be objects where each property in the literal has the inferred type of its value.

|expression|inferred type|
|----------|-------------|
|'Skiller Whale'|string|
|182|number|
['Clamazon', 'Sharks and Spencer', 'Skiller Whale']|string[]|
['Clamazon', 47, true]| (string \| number \| boolean\)[]|
|{ name: 'Skiller Whale', coolness: 1000000 }|{ name: string, coolness: number }|

The inferred types of your variables depend on the value of the initial assignment, and whether the variable is declared with let or const. In most cases, the inferred type is simply the inferred type of the initially assigned value. When const variables are assigned a primitive value, however, their inferred type is the corresponding literal type (reflecting the fact that its value can never be changed).

```ts
let companyName = "Clamazon" // companyName has type 'string'
const clamazonCoolness = -12 // clamazonCoolness has type '-12'

// companyNames has type 'string[]'
const companyNames = ["Clamazon", "Sharks and Spencer", "Skiller Whale"]

// coolCompany has type '{ name: string, coolness: number }'
const coolCompany = {
  name: "Skiller Whale",
  coolness: 1000000,
}
```

If you declare a let variable without an initial assignment, its inferred type will be any. Similarly, if you initialise an array variable with any empty array, its inferred type will be any[]. Moreover, these are special cases that do not trigger compiler errors even when the noImplicitAny flag is enabled. Instead, the compiler will update the types of these variables on the fly, when you do assign a value or add an element to the array.

This is to allow for maximum compatibility with existing JavaScript code, but in general you won't want to take advantage of this flexibility when writing TypeScript code. Instead, you should always include a type annotation in these cases.

The inferred return type of your functions will be the type of their return values, or a union of those types if you have multiple return statements returning values of different types. Function parameters have an inferred type of any, but this does trigger a compiler error when the noImplicitAny flag is enabled. So in general you always have to annotate your function parameters.

### Square Bracket Property Access

When you use dot notation to access properties of objects that do not exist on their types, TypeScript gives you an error.

```ts
type Company = {
  name: string
  coolness: number
}

const clamazon: Company = {
  name: "Clamazon",
  coolness: -12,
}

// Error: Property 'taxReturns' does not exist on type 'Company'.
clamazon.taxReturns
```

When you use square bracket notation, TypeScript also gives you an error (by default), but of a different kind. Instead of rejecting the property lookup itself, it allows the lookup but gives the resulting value an inferred type of any. This then triggers an error, as long as you have the noImplicitAny flag enabled:

```ts
// Error: Element implicitly has an 'any' type because expression
// of type '"taxReturns"' can't be used to index type 'Company'.
clamazon["taxReturns"]
```

Something similar happens when you try to access non-existent properties on your arrays using square bracket notation instead of dot notation:

```ts
const companyNames: string[] = [
  "Clamazon",
  "Sharks and Spencer",
  "Skiller Whale",
]

// Error: Property 'lungth' does not exist on type 'number[]'.
companyNames.lungth

// Error: Element implicitly has an 'any' type because index
// expression is not of type 'number'.
companyNames["lungth"]
```

With the noImplicitAny flag enabled, this behaviour makes no practical difference: you still get errors in all the same places, just with slightly different messages.

If you disable the noImplicitAny flag, however, the errors arising from square bracket access go away. This offers a quick way of opting-out of type checking for object property lookups.

This practice is not recommended in general (and nor is disabling the noImplicitAny flag, on which it depends). The possibility exists simply to allow you to introduce TypeScript into your JavaScript project incrementally.

### const Assertions
You can narrow the types of your literal values using a const assertion, by writing as const at the end of the value.

For primitive values, this will change the type from the corresponding primitive type to a literal type. You can use this to change the inferred type of a let variable:

```ts
// the inferred type of companyName is 'string'
let companyName = "Skiller Whale"

// the inferred type of coolCompanyName is '"Skiller Whale"'
let coolCompanyName = "Skiller Whale" as const
```

There is not much point in doing this, however, since you could achieve the same thing more simply by assigning the value to a const variable instead.

const assertions are mainly useful when working with array and object types. You can narrow the types of individual array elements or object properties:

```ts
// the inferred type of companyNames is
// '("Clamazon" | "Sharks and Spencer" | "Skiller Whale")[]'
const companyNames = [
  "Clamazon" as const,
  "Sharks and Spencer" as const,
  "Skiller Whale" as const,
]

// the inferred type of company is
// '{ name: "Skiller Whale", coolness: 1000000 }'
const company = {
  name: "Skiller Whale" as const,
  coolness: 1000000 as const,
}
```

Or, more commonly, you can narrow the type of the whole array or object at once:

```ts
// the inferred type of companyNames is
// 'readonly ["Clamazon", "Sharks and Spencer", "Skiller Whale"]'
const companyNames = [
  "Clamazon",
  "Sharks and Spencer",
  "Skiller Whale",
] as const

// the inferred type of coolCompany is
// '{ readonly name: "Skiller Whale", readonly coolness: 1000000 }'
const coolCompany = {
  name: "Skiller Whale",
  coolness: 1000000,
} as const
```

This will give all the properties in your objects a literal type, and also make them readonly (though making them readonly has no practical difference, since the literal type already constrains the element or property to a single value). For array literals, it changes the types to (readonly) tuples of literal types.

### Type Assertions

You can narrow or widen the types of any literals or variables using a type assertion.

```ts
type CompanyName = "Clamazon" | "Sharks and Spencer" | "Skiller Whale"

// narrow companyName's type from 'string' to 'CompanyName'
let companyName = "Sharks and Spencer" as CompanyName

// widen someOtherName's type from 'CompanyName' to 'string'
let someOtherName = companyName as string
```

Type assertions do not coerce or change the actual type of the run-time value. They have no run-time effect whatsoever, they simply change the type that the compiler assumes the value to have.

The inappropriate use of type assertions can easily lead to type errors not being caught by the compiler, and showing up instead at run-time. The compiler will prevent you from making any type assertions that could not possibly be true (for example, you cannot assert that a string is a number, or that a boolean is undefined). But as long as the asserted type is compatible with the default type (i.e. you are narrowing the default type), or the default type is compatible with the asserted type (i.e. you are widening the default type), the compiler will trust you.

Type assertions can be used as a quick way to get around excess property checks, without changing any of your type definitions:

```ts
const clamazon: Company = {
  name: "Clamazon",
  coolness: -12,
  // Error: Object literal may only specify known properties, but
  // 'caresAboutItsEmployees' does not exist in type 'Company'.
  caresAboutItsEmployees: false,
}

const skilerWhale: Company = {
  name: "Skiller Whale",
  coolness: 1000000,
  learnsFromItsMistakes: true, // no error
} as Company
```

Type assertions can also be chained together. This has one very powerful - but very dangerous! - implication. Although you cannot directly assert that a value has a completely different type from its default type, you can do this indirectly by first widening the type (e.g. to any or unknown) and then narrowing it down to something completely different.

```ts
// Error: Conversion of type 'number' to type 'string' may be a mistake
// because neither type sufficiently overlaps with the other.
let companyName: string = 187 as string

// no error!
let anotherCompanyName: string = 187 as unknown as string
```

### The Non-null Assertion Operator

TypeScript also provides a way of asserting that a variable is not null or undefined, when its type says that it might be.

Consider the following example:

```ts
type Company = {
  name: string
  coolness?: number
}

function isCool(company: Company): boolean {
  // Error: Object is possibly 'undefined'.
  return company.coolness > 1000
}
```

Here TypeScript complains that you cannot compare the coolness property with 1000, because that property might be undefined. In this particular case, however, there will be no run-time errors or bugs in the code, because undefined > 1000 evaluates to false in JavaScript. A quick fix, therefore, is just to tell TypeScript that the property is not undefined, which you can do with the non-null assertion operator, !:

```ts
function isCool(company: Company): boolean {
  return company.coolness! > 1000 // no error
}
```

The non-null assertion operator can be used alongside the noUncheckedIndexedAccess compiler option. By default, when you access an element from an array via an indexed lookup, TypeScript will assume that an element exists at that index. For greater type safety, however, you can enable the noUncheckedIndexedAccess compiler option, which will make the type of any such lookup a union with undefined:

```ts
const companyNames: string[] = [
  "Clamazon",
  "Sharks and Spencer",
  "Skiller Whale",
]

// the default type of fourthCompanyName is 'string'
// with `noUncheckedIndexedAccess` enabled, its type is 'string | undefined'
const fourthCompanyName = companyNames[3]
```

While this greater type safety may be desirable in some cases, it can be irritating in situations when you know there will necessarily be an element at the index in question. For example:

```ts
for (let i = 0; i < companyNames.length; i += 1) {
  // Error: Object is possibly 'undefined'.
  console.log(companyNames[i].toUpperCase())
}
```

It is precisely because cases like these are so common that the noUncheckedIndexedAccess compiler option is disabled by default. But as a middle ground, you can enable it, and then use the non-null assertion operator to silence errors like these in particular cases:

```ts
for (let i = 0; i < companyNames.length; i += 1) {
  console.log(companyNames[i]!.toUpperCase())
}
```

### When to Use Type Assertions

Type assertions are generally a "code smell": the need to include them probably indicates that there is something wrong with your types or your algorithms. But there are situations in which they might be appropriate.

In general, you should be wary of using a type assertion just because you are confident that it will always be true at run-time. Even if this is the case given the current code, that code could be modified later by someone - potentially you yourself - who forgets about or fails to notice the type assertion.

But it may be appropriate to use a type assertion when you are confident that it doesn't matter if it's false. If your code will execute without any run-time errors or buggy behaviour when the assertions are false, then it may be safe to use them.

For example:

```ts
type Company = {
  name: string
  coolness: number
}

function isCompany(x: unknown): x is Company {
  return typeof x === "object" && x !== null
    && typeof (x as Company).name === "string"
    && typeof (x as Company).coolness === "number"
}
```

When we assert that x is of type Company here, it may well not be, and in particular it may not have name or coolness properties. But whether or not it has these properties (and if so, what their type is) is precisely what this function is intended to check.

If these properties aren't present, then typeof x.name and typeof x.coolness will not throw a run-time error, but evaluate to 'undefined'. And then the two equality assertions will evaluate to false, which is exactly the behaviour that we want in this situation.

It may also be appropriate to use type assertions when you have other things in your codebase - notably tests - ensuring that they will always be true. Suppose your application depends on some JSON data stored somewhere in your source code, and that you have a test ensuring that this data is of the right form. When you import this data in your run-time code, it would be unnecessary - and inefficient - to validate it just to make the compiler happy, so a type assertion may instead be preferable.

From a practical point of view, you might use type assertions when you're in a hurry. In real-world application development, deadlines need to be met, and type assertions may enable you to cut some necessary corners. In this case, they should be considered as (deliberate) technical debt, to be paid off at a later time.
