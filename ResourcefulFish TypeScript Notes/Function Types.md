# ResourcefulFish

## Function Types

### Function Signatures

Function signatures in TypeScript are simply annotated versions of JavaScript function signatures.

```ts
// annotated function declaration
function add(a: number, b: number): number {
  return a + b
}

// annotated function expression
const multiply = function (c: number, d: number): number {
  return c * d
}

// annotated arrow function expression
const subtract = (e: number, f: number): number => {
  return e - f
}
```

If you don't explicitly annotate the parameter or return types, the TypeScript compiler will infer them for you.

While the compiler is generally good at inferring return types, unannotated parameters will usually have an inferred type of any (you will see the exceptions later on). Assuming you have the default noImplicitAny flag enabled, this will raise an error, so as a general rule parameter types must always be annotated.

### Return Types: void and never

TypeScript has two return types for functions that do not return a value (or just implicitly return undefined): void and never. (The never type has other uses as well, which are not discussed here; void is only intended for use as a return type.)

never can be used as the return type for functions that never return, either because they run forever or because they throw an error:

```ts
function tick(): never {
  let counter: number = 0
  while (true) {
    counter += 1
  }
}

function fail(): never {
  throw new Error("something went wrong")
}
```

void is intended for functions that do not include any explicit return statement or value, and therefore just implicitly return undefined:

```ts
function logger(): void {
  console.log("Hey Skillers!")
}

function loggerWithReturn(): void {
  console.log("Have a great day!")
  return
}
```

Because the void type existed in the language before never was introduced, you can still use it as a return type in place of never. But never is now the preferred type in these cases.

Note also that the compiler will only give your functions an inferred return type of never when they are defined as function expressions. The equivalent function declarations will have an inferred return type of void.

```ts
// the inferred return type of failExpression is 'never'
const failExpression = function () {
  throw new Error("something went wrong")
}

// the inferred return type of failExpressionArrow is 'never'
const failExpressionArrow = () => {
  throw new Error("something went wrong")
}

// but the inferred return type of failDeclaration is 'void'
function failDeclaration() {
  throw new Error("something went wrong")
}
```

This is simply for the sake of backwards compatibility: when the never type was introduced, updating the inferred return type of function declarations was found to be too big a breaking change for a lot of existing code, so for practical reasons the more accurate inference was only applied to function expressions.

### Function Parameters

Functions in JavaScript are all technically variadic functions: they are able to accept a variable number of arguments. This is why you can get unintended consequences related to undefined or NaN instead of run-time errors when you pass in the wrong number of arguments:

```ts
function doNothing(number) {
  return number
}

doNothing(1, 2, 3, 4, 5) // 1
doNothing() // undefined

function add(a, b, c) {
  return a + b + c
}

add() // NaN
add(1) // NaN
add(1, 2, 3, 4, 5) // 6
```

TypeScript protects you from this buggy behaviour by throwing a compilation error any time you pass in the wrong number of arguments. When you really do want flexibility in the number of arguments you can pass to a function, there are two controlled ways in which TypeScript allows this.

#### Optional Parameters

The parameter list in a function signature can end with any number of optional parameters, marked as optional with the ? operator. You do not need to supply an argument corresponding to an optional parameter when you call the function, and the compiler will guard against run-time errors by making the type of this parameter a union with undefined.

```ts
function add(a: number, b: number, c?: number) {
  return c === undefined ? a + b : a + b + c
}

add(1) // Error: Expected 2 arguments, but got 1
add(1, 2) // 3
add(1, 2, 3) // 6
```

As with JavaScript, you can also make an argument optional by providing a default value after the type annotation:

```ts
function multiply(a: number, b: number = 10) {
  return a * b
}

multiply(12, 10) // 120
multiply(12) // 120
```

In this case, the parameter's type will not be a union with undefined, since the default value will be used whenever the argument is not specified.

#### Rest Parameters

In the case of an unknown number of arguments you can use a rest parameter, just as you would in JavaScript. Since rest parameters are arrays, they must be annotated as an array type.

```ts
function add(...numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0)
}

add(1, 2, 3, 4, 5) // 15
add() // 0
```

### Function Type Expressions

You can provide types for your functions inline, by annotating the parameters and the return value directly in the function signature, as you have seen. But you can also specify the type of a function separately from its implementation using a function type expression.

The syntax for function type expressions mirrors the syntax for arrow functions, but you can use them to annotate both styles of function expression:

```ts
type NumberToString = (value: number, leadingZeros: number) => string

const numberToString: NumberToString = (value, leadingZeros) => {
  return value.toString().padLeft(leadingZeros)
}

// -OR-

const numberToString: NumberToString = function (value, leadingZeros) {
  return value.toString().padLeft(leadingZeros)
}
```

The NumberToString type specifies a function that takes two number arguments and returns a string. The numberToString variable is assigned a function that matches this type signature.

Note that, if you provide a function type annotation, you do not need to provide explicit type annotations for the parameters or the return value in the function expression itself, as these will be inferred to match those in the function type.

Also note that there is no way to explicitly annotate a function declaration with a function type expression. You need to write a function expression, assign that to a variable, and annotate the variable with the function type.

Function type expressions are mainly useful in two cases.

The first case is when you want to provide a type annotation for a function parameter passed to a higher-order function:

```ts
type Action = "Submit" | "Cancel"

type Handler = (input: string) => void

const submitCallbacks: Handler[] = []

const cancelCallbacks: Handler[] = []

const addListener = (action: Action, handler: Handler) => {
  switch (action) {
    case "Submit":
      submitCallbacks.push(handler)
      break
    case "Cancel":
      cancelCallbacks.push(handler)
      break
  }
}
```

When passing a function expression as an argument, you do not need to explicitly annotate its parameters or return type. As with function expressions assigned to annotated function variables, these types will be inferred based on the type of the parameter:

```ts
addListener("Submit", (input) => {
  inputs.push(input)
  console.log("thank you for you input")
})
```

The second case in which function type expressions are useful is when you want to specify the type signature of a method on an object type:

```ts
type SetOfNumbers = {
  values: number[]
  add: (value: number) => void
  delete: (value: number) => void
  contains: (value: number) => boolean
  entries: () => number[]
}
```

### Function Type Compatibility and void Functions

In general, when a higher-order function expects a function of a certain type as one of its arguments, or an object expects a function of a certain type as one of its properties, you do not need to supply a function with that exact same type. Because of structural typing, you can supply a function with a compatible (but potentially slightly different) type.

The complete rules for the compatibility of function types are quite complicated, and not discussed here. But there two cases that it is useful to know about early on.

First, TypeScript allows you to use functions that return a useable value wherever a void function is expected. Strictly speaking this shouldn't be allowable: it means that the compiler will assume that the return value of these functions (when called in these contexts) is undefined, when in fact it might be a string or a number or a value of any other type.

This assumption is completely harmless, however, and will never lead to any run-time errors being thrown by your code. It simply means that, in these contexts, the compiler will not let you use the value that is returned.

This exception exists to allow you to call non-void functions as if they were void functions. That is, it allows you to call them for their side-effects alone, ignoring their return value.

In particular, it allows common patterns like these that would otherwise raise a type error:

```ts
const source = [2, 4, 6]
const destination = []

source.forEach((n) => destination.push(n * n))
```

The array method, forEach, expects a void function as its argument, but here we are passing it a function that returns a number (the push method returns the new length of the array). In the context, however, we do not care about this return value, and are calling the push method purely for its side-effects (i.e. in order to add its argument to the destination array).

The second case is illustrated by this same example. The forEach method expects a void function that takes three arguments - the current element, the current index, and the whole array. Another feature of structural typing with regard to functions is that, as in the example above, you can supply functions that take fewer arguments than are specified in the type.

Again, this flexibility allows for common patterns (often the callback you pass to forEach doesn't need to use the current index or the whole array), while not having any dangerous consequences. By including additional parameters in the expected type, you can provide a function that uses those parameters, but you do not have to.