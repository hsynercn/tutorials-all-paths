# JavaScript Core Language
## 1. JavaScript: Functions
### 1.1. Course Overview

- Functions and scope
- Arrow functions
- Call, apply, and bind methods
- Rest parameters 

## 2. Writing Modular Code with Arrow Functions

- Function
- Arguments
- Functions and Block Scope
- Immediately Invoked Functions Expression (IIFE)
- Closures

Set up the environment: Install VS Code

Introducing Functions

All functions return a value.
```js
function hello(name) {
    console.log("Hello " + name);
}
let value = hello("Bill");
console.log(value); //undefined
```

```js
            //parameters
function sum(num1, num2) {
    return num1 + num2;
}
            //arguments    
let result = sum(2, 3);
console.log(result); //5
```

There may be times when we need to invoke a function with an indefinite number of arguments. The arguments object allows us to represent them as an array-like object.

```js
function printAll() {
    for(let i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}
printAll(1, 2, 3, 4, 5); //1 2 3 4 5
```

If we don't supply function parameters when calling these variable take undefined value.

```js
function sum(a, b) {
    return a + b;
}
console.log(sum(2)); //NaN because 2 + undefined is NaN
```

Understanding Function Scope

Out of scope.
```js
function hello(name) {
    let message = "Hello"
    console.log(message);
}
console.log(message); //Uncaught ReferenceError: message is not defined
```

In a nested case.

```js
function hello() {
    let message = "Hello";
    let sayHi = function hi() {
        console.log(message);
    }
}
hello(); //Hello
```

```js
function hello() {
    let message = "Hello";
    let sayHi = function hi() {
        let message = "Hi"
        console.log(message);
    }
}
hello(); //Hi
```

Understanding Block Scope

'var' declarations do not have block scope. It is always a good practice to use let instead of var.

```js
let message = 'Hello';
if(true) {
    var count = 1;
    let message = 'Inside a block';
    console.log(message); //Inside a block
}
console.log(message); //Hello
console.log(count); //1
```

Immediately Invoked Function Expression(IIFE)

The IIFE pattern lets us group our code and have it worked in isolation, independent of any code.

**Function Expression**: Define a function and assign it to a variable.

**Immediately Invoked**: Invoking the function right away where it's defined.

```js
(function() {
    console.log("Hello");
})();
```

Closures

```js
let greeting = (function() {
    let message = "Hello";
    let getMessage = function() {
        return message;
    };
    return {
        getMessage: getMessage,
    }
})();

console.log(greeting.getMessage()); //Hello
```

### **Summary**
- Function
- Arguments
- Block Scope
- Immediately Invoked function Expression
- Closures

## 2. Improving Readability With Arrow Functions

- Arrow Functions - What and Why
- Defining Arrow Functions
- Behavior of **this** Keyword

Introducing Arrow Functions

Introduced in ES6. Simpler way to write function expression.

Why to use them?
- shorter syntax
- this derives its value from enclosing lexical scope

Side effects
- behavior of this keyword
- No arguments object

Writing Arrow Function

Function declaration.
```js
let hello = function() {
    return "Hello World!"
}
let message = hello();
console.log(message); //Hello World!
```
Arrow function.
```js
let hello = () => {
    return "Hello World!";
}
//same function
let sameHello = () => "Hello World!";
let message = hello();
console.log(message); //Hello World!
```

Arrow function with a variable. If we have one input parameter parentheses are optional.

```js
let hello = name => "Hello " + name + "!";
console.log(hello("Bill")) //Hello Bill!
```

```js
let hello = (firstName, lastName) => "Hello " + firstName + " " + lastName;
console.log(hello("Bob","Marley")); //Hello Bob Marley
```

Behavior of this Keyword

**this**: Always refers to the owner of the function we are executing.

Unlike regular functions, arrow functions do not have their own this value. Moreover, the value of this is always inherited from the enclosing scope.

ES6 arrow functions can’t be bound to a **this** keyword, so it will lexically go up a scope, and use the value of this in the scope in which it was defined.

```js
{
    this.name = 'upper';
    let message = {
        name: "John",
        regularFunction: function() {
            console.log("Hello " + this.name);
        },
        arrowFunction: () => console.log("Hi " + this.name)
    }
    message.regularFunction(); //Hello John
    message.arrowFunction(); //Hi, because this.name is undefined
}
```

### **Summary**
- Arrow functions
- Defining arrow functions
- Behavior of this keyword

Changing Function context and Built-in Functions

- Understanding context
- call and apply
- bind
- Built-in functions
    - eval
    - parseInt
    - parseFloat
    - escape
    - unescape

Understanding Function Context

This refers to current executing context.
```js
function hello() {
    console.log("Hello");
    console.log(this); //
}
hello(); //Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …}
```

When we declare function in an object.
```js
let greeting = {};
greeting.sayHi = function() {
    console.log(this);
}
greeting.sayHi(); //{sayHi: ƒ}
```

Constructor function example. When we invoke a function with a **new** keyword JavaScript implicitly creates an empty object within the function before returning it.
```js
function sayHi() {
    console.log(this);
}
let greeting = new sayHi(); //empty object
```

What is the **call** Method?

Every JavaScript function object has a few properties that come out of the box, one of these properties is the call method, and we can pass another object as an argument to this call method.
```js
let person1 = {name: 'John', age: 22};
let person2 = {name: 'Mary', age: 26};
let sayHi = function() {
    console.log('Hi, ' + this.name);
}
sayHi.call(person1); //Hi, John
sayHi.call(person2); //Hi, Mary
```

Function call method with parameters.

```js
let person = {name: "John", age: 22};
let sayMessage = function(message) {
    console.log(message + " " + this.name);
}
sayMessage.call(person, 'Hi'); //Hi John
```

What is the apply Method?

Similar to call every function object also has an apply method. Call and apply are similar. Call accepts an arguments list, while apply accepts a single array of arguments.

```js
function hello(name, profession) {
    console.log("My name is " + name + " and I am a " + profession + ".");
    console.log(this);
}
hello("John", "student");
hello.apply(undefined, ["John", "student"]);// we are not changing the this value
hello.call(undefined, "John", "student");
```

**apply**: array input with similar elements

**call**: individual arguments of varying type

What is bind Method?

We can change the 'this' object with call and apply. With bind method we can copy a function and then change the 'this' object.

```js
let person = {
    name: "Mary",
    getName: function() {
        return this.name;
    }
};
let person2 = {name: 'John'};
let getNameCopy = person1.getName.bind(person2);
console.log(getNameCopy()); //John
```

Using Built-in Functions

eval

```js
let x = 1;
let y = 2;
console.log(eval('x + y + 1')); //4
```

parseInt

```js
console.log(parseInt("22")); //22
console.log(parseInt("32", 10)); //we can give a base
console.log(parseInt("111111", 2)); //63
```

parseFloat

```js
console.log(parseFloat('3.99')); //3.99
```

escape and unescape

Escape computes a new string in which certain characters have been replaced by a hexadecimal escape sequence. Unescape reverts it.

```js
console.log(escape('text')); //text
console.log(escape(' ')) //%20
//reverse operation
console.log(unescape('%20')) // ' '
```

### **Summary**
- apply and call
- bind
- Built-in functions

Constructing Rest Parameters and the Spread Operator

What Are Default Parameters?

We can give defaults values to function parameters.

```js
function hello(name = "World") {
    console.log("Hello " + name);
}
hello(); //Hello World
hello("Bill"); //Hello Bill
```

Constructing Rest Parameters

'...' makes names a rest parameter, and it allows multiple parameters.

```js
let print = function(...values) {
    values.forEach(value => console.log(value));
}
print(1, 2 ,3); 
//1
//2
//3
```

```js
let print = function(firstValue, ...values) {
    console.log("First value:" + firstValue);
    values.forEach(value => console.log(value));
}
print(1, 2 ,3); 
//First value:1
//2
//3
```

Using the Spread Operator

Opposite of rest parameter.

```js
let print = function(value1, value2, value3) {
    console.log(value1);
    console.log(value2);
    console.log(value3);
}
let myValues = [1 ,2 , 3];
print(...myValues);
//1
//2
//3
```
Spreads out the string characters.
```js
let myString = "test";
[...myString].forEach(char => console.log(char))
//t
//e
//s
//t
```

### **Summary**
- Setting default parameters
- Defining Rest parameters
- Using the spread operator