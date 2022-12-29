# pluralsight-ts-path

## 1.TypeScript:The Big Picture 

### 1.1. Course Overview

- Overview of TypeScript

## 2. How TypeScript Can Help

TS is not independent from JS, TS is a superset of JS. TS compiles to JS.

It is hard to create complex applications with JS.

Transpile:To convert the source code of a programming language into the source code of another language.

Benefits of TypeScript
1. Static Types: variables, parameters, return types, etc.
2. Organization: making it easier to manage a large codebase: classes, namespaces, modules, interfaces
3. Tooling: static type analysis, many instant errors, detect unused data/unreachable code, source maps - debug directly in TypeScript

## 3. Setting Up a TypeScript Development Environment

TS is not trying to be a total replacement for JS, specially for trivial applications, it is specifically designed for larger applications.

```ts
class Customer {
    name: string;
    constructor (name: string) {
        this.name = name;
    }
    announce() {
        return "Hello, my name is " + this.name;
    }
}

// create a new instance
let firstCustomer = new Customer("Alice");
let newMessage: string = first Customer.announce();

// change the text on the page
let webHeading = document.querySelector('h1');
webHeading!.textContent = new Message;
```

TypeScript Compiler: tsc

tsconfig.json: TypeScript configuration file

## 4. Writing TypeScript Applications

Type Inference
```ts
let firstName: string = "Alice";    //inferred as a string
let age = 72;               //inferred as a number
let activeMember = true;    //inferred as a boolean

//firstName = 123; we can't do this
```

Type Information in Functions:
```ts
function simpleFunction(name: string, isActive: boolean): number {
    //code
    return 0;
}
```

TypeScript class:
```ts
class Customer {
    name: string;
    isActive: boolean;
    constructor (name: string) {
        this.name = name;
        this.isActive = true;
    }
    announce() {
        return "Hello, my name is + this.name;
    }
}
// create a new instance
let first Customer = new Customer ("Alice");
```

Inheritance:
```ts
class Customer {
    name: string;
    isActive: boolean;
    constructor (name: string) {
        this.name = name;
        this.isActive = true;
    }
    announce() {
        return "Hello, my name is + this.name";
    }
}

class SpecialCustomer extends Customer {
    // ...
}
```

Access Modifiers
- public
- private
- protected

Working with Modules: TS supports several module mechanism