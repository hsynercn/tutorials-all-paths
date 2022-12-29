# pluralsight-js-path

## 1.JavaScript Security:Best Practices

### 1.1. Course Overview

- The JavaScript security model
- Dynamic type system vulnerabilities
- Code injection attacks
- Prototype pollution
- JavaScript security testing tools

You will know how to find, fix, and perevent the most common JS security bugs.

## 2. Understanding JavaScript Security

Overview

- Role of JavaScript in Web security
- How JavaScript code is executed: Browsers and Node.js
- Dangerous JavaScript features
- Sensitive data leak

We can use JS on browser and applciation server.

How Browser Execute JS Code

- Code is donwloaded
- Each site gets a sandbox
- Multiple security measures
  - OS process separation
  - HTTPS
  - Subresource Integrity (SRI)

Browser Sandbox

- No local resources: No digital access to devices, files, and local network
- Only browser APIs: Limited access to resources allowed by the user
- Same origin only: Code and data from different sites cannot interact

| Node.js                         | Browser                       |
| ------------------------------- | ----------------------------- |
| JS in the browser               | JS in Node.js                 |
| Downloaded from the Web         | Loaded from local files       |
| Untristed and highly restricted | Trusted and highly privileged |
| Limited blast radius            | May lead to server compromise |

JavaScript Security Pitfalls

- Dynamic Type System
- Dynamic Code Execution
- Prototypal Inheritance

Dynamic Type System Pitfalls

- Automatic conversions: Unexpected code may be executed
- Loose comparisons: Security checks may be bypassed

Always "use strict" mode. Do not use loose comprasion (==). Verify types of untrusted data items.

**Summary**

- Dynamic nature of JavaScript code can lead to vulnerabilities
  - Dynamic typing
  - Dynamic code execution
- Security bugs in the browser may become an attack vector
- Vulnerabilities in Node.js code can lead to serious data breaches

## 3. Preventing Code Injection Attacks

Overview

- Dynamic code execution
- Unsafe functions
- Impact of remote code execution
  - Denial of service
  - Server takeover
- Safe coding patterns

Dynamic Code Execution: JS code can be laded from Web, files, or user input.

Parse: Transform source code into abstract syntax tree
Compile: Generate bytecode just-in-time
Execute: Run bytecode instructions

JavaScript can generate and execute new code at the runtime.

```js
const result = eval("1+1"); //2
```

| eval                           | Function constructor            |
| ------------------------------ | ------------------------------- |
| eval(code)                     | f = new Function('param', code) |
| Directa dn indirect invocation | Invoke like a function          |
| Global and current scope       | Only global scope               |

Unsafe Browser API
setTimeout: Execute provided code after a specified delay.
setInterval: Repeatedly execute provided code with a specified delay between executions.

These functions have safe variants which accept a normal function, prefer them.

How to Exploit the Bug?

Modify data to inject the code

- Track input data
- Taint analysis
- Transformations

Work backwards from the code to build payload.

1. Inspect original HTTP request.
2. Inject malicious payload using browser development tools
3. Deliver it to the application

Injection Attacks: Passing untrusted input data to any interpreter without input validation and sanitization may be exploitable.

Impact of Code Injection Attacks

- Denial of service
- Modify application logic
  - Bypass access control
  - Compromise data integrity
  - Steal sensitive data
- Server takeover

Fixing the Code

- Avoid unsafe function
- Validate input
  - Prefer allow lists over block lists
- Sanitize data passed to interpreters
- Apply principle of least authority

**Summary**

- Avoid passing untrusted data to JS engine
- Identify suspected code
  - eval
  - new Function
  - setTimeout and setInterval
- Audit 3rd party libraries for use of unsafe code

## 4. Defending Against Prototype Pollution

Overview

- JavaScript prototypal inheritance
- Modifying the prototype chain
  - Parsin JSON data
  - Dynamic property keys
- Impact of prototype pollution
- Hardening code against attacks

Prototype Pollution Attacks

1. Attacker sends a malicious JSON
2. API code parses the JSON
3. Merges parsed data with application objects
4. Modified code acts differently

Inheritance Models

- Classes: Static hierarchy of types
- Prototypes: Dynamic chain of objects

Each JS object has a prototype, the chain ends with **null**. Inherited properties comes from chain. Only own properties are mutated.

```js
const parent = { a: 99 };
const child = Object.create(parent);
console.log(child.a); //99
console.log(child.__proto__ === parent);
```

JavaScript classes make it easier to set up prototype chains.

Dangers of Prototype Pollution

- Denial of service
- fon-in loop manipulation
- Property injection
  - Security check bypass
  - SQL abd NoSQL injections
- Remote code execution

Example:

```js
const user = { name: "Full Name" }; //Regular user
const malicious = { isAdmin: true }; //isAdmin is true for admin
user["__proto__"] = malicious; //Pollution
console.log(user.isAdmin); //true, escalation of privilage
```

Finding Prototype Pollution

- Property mutation with untrusted key and value
- Recursive object merging
- Object cloning
- Property access by path

Fixing the Code

- Validata JSON schema
- Freeze the prototype
  - Object.freeze
- Create objects without prototype
  - Object.create(null,...)
- Use Map instead of {}

Introducing Prototype Pollution With 3rd Party

- Utility libraries
- Merging, cloning, extending

**Summary**

- Prototype inheritance can be exploited
- Property mutation with **proto** key
- Mitigation techniques
  - Input validation
  - Map instead of {}
  - Freezing or removing the prototype

## 5. Testing Your Code

Overview

- Automated security testing
- Preventing use of ensafe functions
- Detecting prototype pollution
- Detect vulnerable 3rd party libraries

Security Testing Techniques
SAST: Static application security testing
DAST: Dynamic application security testing
IAST: Interactive application security testing

| SAST                         | DAST                         |
| ---------------------------- | ---------------------------- |
| Source code                  | Running application          |
| Known bad code patterns      | Malicious payloads           |
| Safe                         | May be destructive           |
| Compilers, linters, scanners | Automated tests and scanners |

Finding Unsafe Code Using ESLint

Linters are lightweight code analysis tools that flag bugs and coding errors.

1. Code:Parse code and analyze the abstract syntax tree (AST)
2. Extensible:Comes with a set of bundled checks
3. Fast:Can be used by IDEs and build pipelines

Detecting Prototype Pollution with Unit Tests
- Reliable and repeatable
- Easy payload delivery
- Inspect program state after attack
  - Input violating assumptions about types
  - Code injection effects
  - Detect prototype pollution

JS Popular Security Testing Tools

SAST
- ESLint
- GitHub Code Scanning and LGTM
- semgrep

OWASP ZAP
- Many commercial alternatives

Dependency management
- npm audit
- Retire.js
- Dependency-Track
- Snyk

**Summary**
- Security testing techniques
  - SAST
  - DAST
  - IAST
- Preventing vulnerabilites with automated tests
  - ESLint
  - Unit tests
  - npm audit