# ResourcefulFish

## Union Types

### Unions of Sets and Types

Every type describes a set of values. The boolean type describes the set of the two possible Boolean values, true and false, the string type describes the set of all of the possible strings, and so on.

In set theory, the union of two or more sets is the (super)set containing all the elements of those (sub)sets. The union of the set of all odd numbers and the set of all even numbers, for example, is the set of all integers.

In type theory, the union of two or more types is the (super)type which describes the union of the sets described by those (sub)types. The boolean type, for example, is effectively the union of the literal types true and false.

In TypeScript, you can construct unions of any subtypes with the | operator. For example:

```ts
type OptionalString = string | undefined // e.g. "hello whale", undefined

type StringOrNumber = string | number // e.g. "The meaning of life", 42

type OneOrMoreNumbers = number | number[] // e.g. 8, 12, [1, 2, 3, 4, 5]
```

The | operator is intentionally similar to the logical "or" operator, ||. You can read it as "or". The values of type X | Y must be either of type X or of type Y.

As a syntactic convenience, you can write union types with a meaningless | at the start, allowing for nicer git diffs when you place definitions of longer unions over multiple lines:

```ts
type Primitive =
  | number
  | string
  | boolean
  | bigint
  | symbol
```

### Unions of Literal Types

You can create unions of primitive types like string and number to describe even larger and more general sets of values. On the other hand, you can create unions of literal types to describe smaller and more precise sets of values.

For example, when handling HTTP response codes, the number type is too general (some numbers are invalid).

In JavaScript you might want to check that numbers are within the allowed set at run-time:

```js
function validateResponse(response) {
  const validResponseCodes = [400, 401, 403, 404]
  if (validResponseCodes.includes(response)) {
    return response
  }
  throw new Error()
}

function server(code) {
  switch (code) {
    case 400:
      return computerSaysNo()
    case 401:
      return logInPlease()
    case 403:
      return itsASecret()
    case 404:
      return cantFindIt()
  }
}

const errorCode = validateResponse(400)
server(errorCode)
```

In TypeScript, you can use a union of literal types to perform this validation more concisely at compile-time instead:

```ts
type ErrorCode = 400 | 401 | 403 | 404

function server(code: ErrorCode) {
  // No change needed in the function body
}

// No validation needed before calling server()
server(400)
```

### Unions of Object Types and Discriminating Properties

You can create unions of object types in exactly the same way that you would create unions of any other type:

```ts
type Customer = {
  name: string
  loyaltyCardNumber: number
}

type Employee = {
  name: string
  employeeDiscountCode: number
}

type CheckoutUser = Customer | Employee
```

Note that this does not create a union of the properties of these object types, but a union of the types themselves. In other words, a valid instance of a CheckoutUser must be either a Customer (with a name and a loyaltyCardNumber) or an Employee (with a name and an employeeDiscountCode), but not both (i.e. not a hybrid object with a name, a loyaltyCardNumber, and an employeeDiscountCode).

In TypeScript's structural typing system, however, a hybrid object with all three of these properties will be compatible with both the Customer and Employee types, and consequently with the CheckoutUser type. But compatibility is not the same as identity, and the difference here shows up in practice anywhere that excess property checks apply (although there is a slight complication here with the way that excess property checks are implemented, that will be explained on the next slide).

When working with unions of object types, you typically want some way to be able to distinguish which of the possible subtypes you are dealing with at any given point. You might be able to do that by checking which properties exist on the object in question:

```ts
function applyDiscount(order: Order, checkoutUser: CheckoutUser): Order {
  if ("loyaltyCardNumber" in checkoutUser) {
    // checkoutUser must be a Customer
    return {
      ...order,
      total:
        order.total - getSavingsPointsDiscount(checkoutUser.loyaltyCardNumber),
    }
  }

  if ("employeeDiscountCode" in checkoutUser) {
    // checkoutUser must be an Employee
    return {
      ...order,
      total:
        order.total - getEmployeeDiscount(checkoutUser.employeeDiscountCode),
    }
  }
}
```

But in general it can be awkward to rely on checks like these, which might stop working if you refactor the types at some point.

For more maintainable checks, it is useful to include a discriminating property on the subtypes in question. A discriminating property is a property with the same key, but an incompatible type. Any incompatible types will do here, but a common practice is to choose distinct literal string types, for example:

```ts
type Customer = {
  role: "Customer"
  name: string
  loyaltyCardNumber: number
}

type Employee = {
  role: "Employee"
  name: string
  employeeDiscountCode: number
}

type CheckoutUser = Customer | Employee

function applyDiscount(order: Order, checkoutUser: CheckoutUser): Order {
  switch (checkoutUser.role) {
    case "Customer":
      // checkoutUser must be a Customer
      return {
        ...order,
        total:
          order.total -
          getSavingsPointsDiscount(checkoutUser.loyaltyCardNumber),
      }
    case "Employee":
      // checkoutUser must be an Employee
      return {
        ...order,
        total:
          order.total - getEmployeeDiscount(checkoutUser.employeeDiscountCode),
      }
  }
}
```

Here, the compiler can use the value of the discriminating role property, present on both Customer and Employee, to determine which of these two things any CheckoutUser is.

### Unions of Object Types and Excess Property Checks

Excess property checks constrain TypeScript's core structural typing system, preventing you from assigning an object literal to an explicitly annotated variable if the literal includes properties not in the annotated type.

```ts
type Customer = {
  name: string
  loyaltyCardNumber: number
}

type Employee = {
  name: string
  employeeDiscountCode: number
}

const customerWithEmployeeDiscount: Customer = {
  name: "Rod",
  loyaltyCardNumber: 479823498,
  // Error: Object literal may only specify known properties,
  // and 'employeeDiscountCode' does not exist in type 'Customer'
  employeeDiscountCode: 094839,
}

const employeeWithLoyaltyCard: Employee = {
  name: "Rod",
  // Error: Object literal may only specify known properties,
  // and 'loyaltyCardNumber' does not exist in type 'Employee'
  loyaltyCardNumber: 479823498,
  employeeDiscountCode: 094839,
}
```

However, there is a loophole in the implementation of excess property checks when it comes to assigning object literals to unions of object types. If the additional property exists in any of the subtypes of the union, the assignment is allowed:

```ts
type CheckoutUser = Customer | Employee

const customerEmployeeHybrid: CheckoutUser = {
  name: "Rod",
  loyaltyCardNumber: 479823498, // no error
  employeeDiscountCode: 094839, // no error
}
```

The problem here is that the compiler doesn't know whether your object literal is supposed to be a Customer or an Employee, and therefore can't decide which of the two properties should be disallowed. (It could just pick one, based on the order they are given, but that happens not to be the way that excess property checks have been implemented.)

This loophole is unlikely to trip you up in practice, but is worth being aware of - especially because, taking the above assignment at face value, it can lend support to the common misunderstanding that unions of object types create unions of their properties.

In any case, if you add a discriminating property to your object types (which is generally a good idea anyway), this gives the compiler the extra information it needs to determine which property should count as an excess one in assignments like these:

```ts
type Customer = {
  role: "Customer"
  name: string
  loyaltyCardNumber: number
}

type Employee = {
  role: "Employee"
  name: string
  employeeDiscountCode: number
}

type CheckoutUser = Customer | Employee

const customerWithEmployeeDiscount: CheckoutUser = {
  role: "Customer",
  name: "Rod",
  loyaltyCardNumber: 479823498,
  // Error: Object literal may only specify known properties,
  // and 'employeeDiscountCode' does not exist in type 'Customer'
  employeeDiscountCode: 094839,
}

const employeeWithLoyaltyCard: CheckoutUser = {
  role: "Employee",
  name: "Tod",
  // Error: Object literal may only specify known properties,
  // and 'loyaltyCardNumber' does not exist in type 'Employee'
  loyaltyCardNumber: 479823498,
  employeeDiscountCode: 094839,
}
```

### More on Discriminated Unions

A union of object types in which each object contains a discriminating property is known variously as a discriminated union, tagged union, or sum type. Discriminated unions are a useful data type common in functional programming languages, which TypeScript is able to bring to JavaScript.

It is common to use the name "tag" for the discriminating property (at least when no other more meaningful name suggests itself from the nature of the data). But you can use any name you want.

In the previous examples, the discriminating property was included in the relevant subtypes themselves, but in many cases your code will be more maintainable if you include it in the higher-level union type instead. That way the subtypes can change independently of each other:

```ts
type Customer = {
  name: string
  loyaltyCardNumber: number
}

type Employee = {
  name: string
  employeeDiscountCode: number
}

type CheckoutUser =
  | { tag: "Customer"; value: Customer }
  | { tag: "Employee"; value: Employee }
```

With the discriminating property in the union type, you can also easily add further options that don't have any additional data associated with them:

```ts
type CheckoutUser =
  | { tag: "Anonymous" }
  | { tag: "Manager" }
  | { tag: "Customer"; value: Customer }
  | { tag: "Employee"; value: Employee }
```

There is nothing intrinsically special or different about discriminated unions like these: they behave in all respects like any other union of object types. But because of the discriminating property, you can use them with switch statements to cleanly handle each subtype separately. The compiler will use type narrowing in each case block to determine which properties are available, and - as long as you haven't disabled strict null checks - will typically also be able to warn you if you forget to cover any of the cases.

```ts
const validCustomerSaverNumbers: number[] = [
  /** ... */
]

const validEmployeeDiscountCodes: number[] = [
  /** ... */
]

function discountApplies(checkoutUser: CheckoutUser): boolean {
  switch (checkoutUser.tag) {
    case "Anonymous":
      return false
    case "Manager":
      return true
    case "Customer":
      return validCustomerSaverNumbers.includes(
        checkoutUser.value.loyaltyCardNumber
      )
    case "Employee":
      return validEmployeeDiscountCodes.includes(
        checkoutUser.value.employeeDiscountCode
      )
  }
}
```

Note that in the "Customer" and "Employee" cases you need to access other properties on the checkoutUser.value object, rather than on checkoutUser directly.
