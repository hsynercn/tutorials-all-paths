# JavaScript Core Language

## 1. JavaScript: Getting Started

### 1.1. Course Overview

Course content:

- JavaScript programming
- Introduction to JS
- JS features
- Blackjack card game

JavaScript is the programming language of the web. It is a multi-platform language.

Applications:

- Web Pages
- Business Apps
- Utility Apps
- Games

Unity engine supports JS.
TypeScript is popular with business apps, super set of JavaScript.
Apache Cordova for smartphones and tablets.
Electron for native Windows and macOS native apps.
NodeJS for backend services.

### 1.2. Introduction to JavaScript

Starting:

1. Install git from <https://git-scm.com/downloads>.
2. Install npm from <https://nodejs.org/en/>.
3. Install VS Code from <https://code.visualstudio.com/download>.

In VS Code ctrl+' opens the terminal

Test commands:

```cmd
git --version
npm --version
code
```

Project initialization commands:

```cmd
git clone https://github.com/pluralsight/web-dev-starter.git
cd web-dev-starter
code .
npm install (for better practice run from cmd not from VS Code terminal)
npm run start (starts up light server, opens browser)
```

### 1.3. JavaScript Beginnings

Introduction:

- Adding JS code to HTML
- Multiple JS files
- Formatting code
- Detecting and fixing errors
- Case sensitivity
- Commenting code

### Adding JS code to HTML

We can add script tag in HTML files to run JS and change the markup. The usual starting page is index.html.

```html
<script>
  //This is not a good practice, it is better to have JS code in its own file.
  alert("Hello world");
  alert("Carved Rock Fitness");
</script>
```

We can load a separated JS file."." represents the relative directory of index.html file.

```html
<script src="./filename.js"></script>
```

This is wrong, older browsers can't handle it.

```html
<script src="./filename.js" />
```

For HTML manipulation we need to add scripts tags at the end of HTML file where all the HTML is loaded, for framework insertion etc. HTML 'head' is a better option. Library imports doesn't rely on the web page.

White spaces are ignored, spaces, tabs, new lines.
To check errors use f12 dev tools.

### Detecting and Fixing Errors

We are fetching CSS and module JS files at the header.

Our index HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Carved Rock Fitness</title>
    <link href="css/main.css" rel="stylesheet" />
    <script src="https://www.pluralsight.com/content/dam/pluralsight2/teach/author-tools/carved-rock-fitness/js/bootstrap.min.js"></script>
  </head>
  <body>
    <div class="crf">
      <!-- removed HTML content-->
    </div>

    <script src="./util.js"></script>
    <script src="./home.js"></script>
  </body>
</html>
```

This is a sample JS file for error triggering. When we check the web browser console we can see "Uncaught ReferenceError: showMes is not defined".

```js
//home.js
showMessage("Title...");
showMes;
sage("Title2...");
```

### Case Sensitivity

- JS is case-sensitive, can't mix up lower and upper cases.

### Commenting

```js
//single line comment

/*
Multi line comment
*/
```

### **Summary**

Including JS in HTML: Our HTML content stays in HTML, JS code stays in it's own file.

```html
<script></script>
<script src="./filename.js"></script>
```

Formatting Code

- Freely use whitespace

Detecting Error

- f12

Case Sensitivity

- JS is case-sensitive

Commenting Code

- //single line comment
- /_multiple line comment_/

### 1.4. Variables and Constants

Introduction

- What is variables
- Declaring variable
- Naming variables
- Common errors using variables
- Changing variable values
- Constants
- The var keyword

We use variables to hold information. Data is stored on the computer memory. Typical memory is a long number, instead we use variable to access this data.
We declare variables with meaningful names.

```js
let total = 132.333;
let product = "Hiking Boots";
let discounted = true;
```

We declare a variable with **let** keyword and can use single quotes or double quotes for strings.

```js
let welcome = "welcome";
let hello = "hello";
let price = 49.99;
let discounted = false;
```

For better practice we can list variables like this.

```js
let a = 1,
  b = "test",
  c = false;
```

Valid Variable Names

**Starts with one of:** \_ $ letter

**Followed by zero or more:** \_ $ letter number

valid name samples:

```js
let a = 1;
let account = 1;
let account_99 = 1;
let accountNumber = 1; //camel notation
let _accountNumber = 1; //generally private variable names start with '_'
let $accountNumber = 1; //generally $ is used for automatically generated code
let _1234 = 1;
let __proto__ = 1; //for non standard features
```

invalid name samples:

```js
let 99times = 99; //Uncaught SyntaxError: Invalid or unexpected token
let _times 99 = 99; //Uncaught SyntaxError: Unexpected number
let let = 99; //Uncaught SyntaxError: let is disallowed as a lexically bound name
```

Camel case example 'accountNumber', camel because it has a bump in the middle.

For best practice whenever you declare a variable also set its value.

```js
let price;
console.log(price); //prints undefined
price = 10; //we can change variable values whenever we want
console.log(price); //prints 10
```

For constant variables we can use const keyword.
We can't modify const variables, also can't declare them without an initial value.

```js
const price = 19.99;
showMessage(price);
price = 99.00; // Uncaught TypeError: Assignment to constant variable
const myPrice; //Uncaught SyntaxError: Missing initializer is const declaration
```

The var Keyword

A variable declared with var is defined throughout the program as compared to let.
First log gives an Uncaught ReferenceError: Cannot access before initialization, second doesn't give any error, instead it prints 'undefined'.

```js
console.log(first); //Uncaught ReferenceError: Cannot access before initialization
console.log(second); //prints undefined
let first = 1;
var second = 2;
```

Summary:

Defined variables

Declared variables using let

Naming variables

- Begin with: \_ $ letter
- Then 0 or more: \_ $ letter number

Common errors using variables

Variables change over time

Declaring constants

- The **const** keyword

The **var** keyword

- Avoid it, use **let** or **const** instead

### 1.5. Types and Operators

Introduction  
Types:

- Numbers
- Strings
- Converting between types
- Booleans
- null and undefined
- Objects and symbols

Numbers

```js
let price = 19.99;
let fee = "19.99";
console.log(typeof price); //prints number
console.log(typeof fee); //prints string
```

Arithmetic operations

```js
let price = 10;
price = price + 1;
price = price - 1;
price = price / 2;
price = price * 1;
let modulus = price % 10; //remainder, modulus

price += 1;
price -= 1;
price /= 2;
price *= 1;
price %= 10;
```

Increment, decrement operator. Operator can go after the variable.

```js
let price = 1;
++price;
price++;
--price;
price--;
```

Operator Precedence

MDN([Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)) operator precedence  
 21: grouping ( ... )  
 15: multiplication/division/remainder -> left-to-right  
 14: addition/subtraction -> left-to-right

```js
let price = 3 + 2 * 2; // result 7
price = (3 + 2) * 2; // result 10
```

Number Precision

Be careful with number precision.

```js
let price = 1.1 + 1.3; // 2.4000000000000004, not exactly 2.4;
```

Strings

We can use escape notation for special characters.

```js
let msg = "Hello World";
let msg2 = "Hello World";
let msg3 = 'Hello "World"';
```

We can use **backtick** for string formatting. Message 4 and 5 are different strings, there are several whitespace differences between them. But if we use them in HTML tags like head whitespace converted into single space.

```js
let name = "Name";
let msg4 = `Hello ${name}`; //interpolation
let msg5 = `Hello           ${name}`; //be careful, HTML will ignore white spaces
```

Manipulating Strings

```js
let message = "Hello";
console.log(typeof message); //string
console.log(message.length); //5
message = message.toUpperCase();
message = message.toLowerCase();
message = message.substring(1); // gets: "ello"
message = message + " World"; //concatenation
```

Converting String and Numbers

```js
let amount = 123;
amount = amount.toString();

let sum = Number.parseFloat("123.12");
```

This string can't be converted to a number, result is Not A Number.

```js
//NaN
let total = Number.parseFloat("AAA123.12");
```

We can convert this string to a number, function stops parsing as soon as it hits a not a number.

```js
let total = Number.parseFloat("123.12AAAA"); //can parse this as 123.12
```

Boolean Variables

```js
let saved = false; //typeof saved is boolean
saved = !saved;
console.log(saved); //true
```

Null and Undefined

null and undefined are two more types of JavaScript, **null** has one value **null** and **undefined** has one value **undefined**.

```js
let saved; //undefined, when they are not initialized
saved = 10;
saved = null; //Best practice: programmer can set a variable to null to wipe out that value instead of using undefined
```

Objects and Symbols

```js
let person = {
  //properties
  firstName: "John",
  lastName: "Adams",
};
console.log(typeof person); //prints object
console.log(person.firstName); //gets the property
```

Symbols are used for information hiding in objects.

Summary

Numbers

Strings

- 3 styles of quotes: "", '', ``

Converting between types

- variable.toString();
- Number.parseFloat("123");
- NaN (Not a Number)

Booleans

- true or false
- !symbol(not)

null and undefined

- undefined is assigned by JS
- null is assigned by developers

Objects and Symbols

- Objects created by { ... }

### 1.6. Program Flow

Introduction

- if ... else Statements
- Truthy and Falsy Expression
- Comparing === to ==
- Ternary Operator
- Block Scope
- Loops: for, while, do...while

Conditional if

Conditionally executing code.

```js
if (5 === 5) {
  console.log("Yes"); //prints
}
if (5 > 5) {
  console.log("No"); //does not print
}
let state = "FL";
if (state !== "FL") {
  console.log("NOT FLORIDA");
}
```

Usually we don't use ==, if types are different == attempts to convert them to string, number or boolean.

|          falsy           |        truthy        |
| :----------------------: | :------------------: |
|          false           | EVERYTHING NOT FALSY |
|            0             |         true         |
| "" or '' (empty strings) |         0.5          |
|           null           |         "0"          |
|        undefined         |                      |
|           NaN            |                      |

In some cases floating point arithmetic can give problematic results.

```js
if (1.1 + 1.3 !== 2.4) {
  console.log("They are different"); //prints message
}
```

To overcome this problem we can use **toFixed** method, but toFixed method returns a string. We can add a + sign to convert result string to number.

```js
//we need to convert returned string to number by adding a plus sign before the parenthesis
if (+(1.1 + 1.3).toFixed(2) === 2.4) {
  console.log("They are same"); //prints message
}
```

if() ... else

```js
let price = 20;
if (price > 20) {
  console.log("greater than 20");
} else if (price < 20) {
  console.log("less or equal to 20");
}
```

Comparing == and ===

JavaScript attempts to convert values while using ==. For better and safer comprasion we use identically equal to symbol ===.

```js
if (1 === "1") {
  //not equal
  console.log("equal");
} else {
  console.log("not equal");
}

if (1 == "1") {
  //they are equal
  console.log("equal");
} else {
  console.log("not equal");
}
```

The Ternary Operator

```js
// condition ? true statement : false statement;
let message = price > 10 ? "expensive" : "cheap";
```

Block Scope Using let

```js
if(true) {
    let const someValue = "test";
    let value = 'yes';
    console.log(value);
}
//console.log(value); we cant access value outside of the block
```

Looping with for()  
Loops through until condition is false.

```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}
//0 1 2
```

Looping with while()

```js
let count = 1;
while (count < 5) {
  console.log(count);
  count++;
}
//1 2 3 4
```

Looping with do ... while()  
Executes at least one time.

```js
let count = 1;
do {
  console.log(count);
  count++;
} while (count < 5);
//1 2 3 4
```

Summary:

if ... else Statements

Truthy and falsy expressions

- "0" is true
- Every number is true except 0

Comparing === to ==

- Always use === and !== as a best practice

The ternary operator

- (condition) ? (true statement) : (false statement)

Block scope

- Variables declared with let or const are block scoped

Loops: for, while, do...while

- Be certain loops will complete

### 1.7. Functions

We can call a function with name or a variable.

Introduction

- Function basics
- Function expression
- Passing information to functions
- Function return values
- Function scope
- Using functions to modify web pages

Function Basics  
Code block with a name.

```js
function showMessage() {
  //function block
  console.log("in a function");
}
showMessage();
showMessage();
//shown twice
```

Function Expressions

```js
//function declaration
function showMessage() {}

//function expression
let fn = function () {};
fn();

//in function expression function name is optional, but we can't use name to call that function
let myFunc = function testFunction() {};
//testFunction(); gives Uncaught ReferenceError: testFunction is not defined
```

We can still give name to a function to get a detailed stack trace in case of exception.

Passing Information to Functions

We use comma separated parameters to transfer info to function.

```js
function showMessage(message, secondMessage) {
  console.log(message, secondMessage);
}
showMessage("Hello", " World");
showMessage("Test", " this");
```

**If we don't supply values for parameter it will be set to undefined.**

```js
function myFunction(message, secondMessage) {
  console.log(message); //prints undefined
  console.log(secondMessage); //prints undefined
}
myFunction();
```

Function Return Values

We use return to get information out.

```js
function getCode(value) {
  let code = value * 42;
  return code;
}
console.log(getCode(2)); // 84
```

Function Scope

We encapsulate code in function scope, parameters can't leak out. But a function has access to global scope.

```js
function getCode(value) {
  let code = value * 42;
  return code;
}
let resultCode = getCode(2);
console.log(code); //reference error, we cen't access code variable out of function scope
```

Nested functions

We need to pay attention to outer and local scope.

```js
let key = 42; //outer most scope
function getCode(value) {
  let keyGenerator = function () {
    let key = 12; //local scope or closest to local scope overrides outer value
    return key;
  };
  let code = value * keyGenerator();
  return code;
}
let code = getCode(2);
```

Summary:

Function

- function name() {...} //declaration
- let fn = function() {...} //expression

Passing information to functions

- myFunction(a, b, c)

Function return values

- return value;

Function scope

- local scope or closest to local scope

### 1.8. Objects and the DOM

### DOM:Document Object Model

Introduction

- Object Properties and Methods
- Passing Objects to Functions
- Standard Built-in Objects
- The Document Object Model (DOM)
- Styling DOM Elements
- Detecting Button Clicks
- Showing and Hiding DOM Elements

Object Properties

Group of values or properties.

```js
let person = {
  name: "Heidi",
  age: 45,
  isAlive: true,
};
console.log(person.name); //Heidi
console.log(person.age); //45
console.log(person.isAlive); //true
console.log(person.someThing); //undefined
```

Square brackets, dot notation.

```js
let person = {
  name: "Heidi",
  age: 45,
  isAlive: true,
};
person.age = 46;
person["age"] = 47;
```

We can use symbols to hide information in object.

```js
let mySymbol = Symbol();
let person = {
  name: "Tom",
  age: 33,
  [mySymbol]: "secretInformation",
};
```

Object Methods

Traditionally printInfo called as **method** because it attached to an object.

```js
let person = {
  name: "Tom",
  age: 32,
  printInfo: function () {
    console.log(
      this.name + //this refers to current object
        " is " +
        this.age
    );
  },
};
person.printInfo();
```

Passing Objects to Functions

```js
let message = "Hello";

//passed by value, change has no effect on original value, any string, boolean, number
function changeMessage(message) {
  message = "Hi!";
}
changeMessage(message);
console.log(message);
```

```js
let person = {
  name: "Tom",
  age: 32,
};
//passed by reference, gives pointer to object
function incrementAge(person) {
  person.age++; //33
}
incrementAge(person);
console.log(person.age);
```

Standard Build-in Objects

- Array
- Date
- Math
- String ...

```js
let now = new Date();
let string = now.toDateString();
console.log(Math.abs(-42)); //prints 42
```

The Document Object Model(DOM)

We can access elements with their IDs.

```js
document.getElementById("message").textContent = "Hello";
```

Styling DOM Elements

Normally we style a web page with CSS file or pre-processor tech such as **Less** or **Sass**.

```js
document.getElementById("message").style.color = "red";
```

Detecting Button Clicks

```js
const button = document.getElementById("see-review");
//we can add a handler for specific events
button.addEventListener("click", function () {
  console.log("click");
});
```

Showing and Hiding DOM Element

```js
//we can add a handler for specific events
button.addEventListener("click", function () {
  const review = document.getElementById("review");
  const button = document.getElementById("see-review");

  if (review.classList.contains("d-none")) {
    review.classList.remove("d-none");
    button.textContent = "CLOSE REVIEW";
  } else {
    review.classList.add("d-none");
    button.textContent = "SEE REVIEW";
  }
});
```

Summary:

Object properties and methods

- obj.propName
- obj['propName']

Passing objects to functions

- Functions can change an object's properties and methods

Standard built-in objects

- Date, Math, String, Number

The Document Object Model(DOM)

- The document object

Styling DOM elements

- element.style.cssProp = 'value'

Detecting buttons clicks

- element.addEventListener(event, fn)

Showing and Hiding DOM Elements

- element.classList.add(className)
- element.classList.remove(className)
- Element.classList.contains(className)

### 1.9. Arrays

We hold multiple objects or values with arrays.

Introduction

- Creating and initializing arrays
- Accessing array items
- Manipulating arrays
- slice() and splice()
- Array searching and looping
- Arrays in the DOM

Creating and Initializing Arrays

```js
//values as three elements
let values = [1, 2, 3];
let values2 = Array.of(1, 2, 3);
//for best practice don't mix types
let values3 = ["a", "b", "c"];
console.log(values3); //["a", "b", "c"]
```

Array is not a built-in type

```js
let values = [1, 2, 3];
console.log(typeof values); //object

//we can check array state
console.log(Array.isArray(values)); //true
```

Accessing Array Items

```js
let values = ["a", "b", "c"];
console.log(values[0]); //a
console.log(values[1]); //b
console.log(values[2]); //c
console.log(values[3]); //undefined

values[0] = "aaa"; //change value
```

Manipulating Arrays

```js
const values = ["a", "b", "c"];
values.push("d", "e"); //a, b, c, d, e
const lastValue = values.pop(); //e
const firstValue = values.shift(); //firstValue <- a, array: b, c, d, e
values.unshift("hello", "world"); //hello, world, b, c, d, e
```

slice() and splice()

**slice** creates a new array original array stays same, **splice** inserts/deletes old array.

```js
//slice
const values = ["a", "b", "c"];
const newValues = values.slice(1, 2); //begin element:1, ending element:2 ending element is not included
console.log(newValues); //b
```

```js
//splice
const values = ["a", "b", "c"];
values.splice(1, 1); //delete start index, number of items we want to delete
console.log(values); // a, c

values.splice(1, 0, "foo"); // start index 1, we delete 0 element and we insert 'foo'
console.log(values); //a, foo, c
```

Array Searching and Looping

```js
//indexOf()
const values = ["a", "b", "c"];
console.log(values.index.of("c")); // 2
console.log(values.index.of("b")); // 1
console.log(values.index.of("d")); // -1
```

```js
//filter()
const values = ["a", "b", "c"];
const set = values.filter(function (item) {
  return item > "b";
});
console.log(set); // c
```

Find returns the value of first element that satisfies provided testing function.

```js
//find
const values = ["a", "bbb", "c"];
const found = values.find(function (item) {
  return item.length > 1;
});
console.log(found); //bbb
```

```js
//forEach
const values = ["a", "b", "c"];
values.forEach(function (item) {
  console.log(item);
}); //a b c
```

Arrays in the DOM

```js
const containers = document.getElementsByClassName("container");
containers[2].classList.add("d-none");
```

Summary:

Creating and initializing arrays

- const arr = [1, 2, 3]
- const arr = Array.of(1, 2, 3)

Accessing array items

- arr[index] - zero based

Manipulating arrays

- push() and pop()
- shift() and unshift()

slice() and splice()

- slice() creates a new array
- splice(idx, deleteCount)
- splice(idx, deleteCount, newItems)

Array searching and looping

- indexOf() and find()
- filter()
- forEach()

Arrays in the DOM

- document.getElementByClassName()

### 1.10. Scope and Hoisting

Introduction

- Global scope
- Function scope
- var and Hoisting
- Undeclared variables
- Strict mode

Global Scope

When we use a loaded JS directly we use global scope. Don't use multiple variables under global scope.

```js
let productId = 123;
function showId() {
  //gets it from global scope
  console.log(productId);
}
showId(); //prints 123
```

For better practice we can use single object for global scope.

```js
const app = {
  productId: 1234,
  userName: "Tom",
  orderNumber: 789,
};
function showId() {
  console.log(app.productId);
}
```

Function Scope

```js
function showProductId() {
  let id = 123;
  function fix() {
    let id = 321;
    console.log(id); //321
  }
  fix();
  console.log(id); //123
}
showProductId();
```

var and Hoisting

Because of hoisting ID variable set to undefined when JS executed.

```js
id = 123;
console.log(id); //123
var id;
```

Because of hoisting we can call show function before its declaration. JS engine parses functions in first pass. JS file gets executed after 2 passes.

```js
show();
function show() {
  //function declaration is hoisted
  console.log("123");
}
```

Hoisting is fine with functions but variables and constants use let and const and do not use var.

Undeclared Variables and Strict Mode

In early JS version we can use variables without declaration.

```js
//bad example
productId = 1;
console.log(window.productId);
```

After several releases strict mode is added.

```js
"use strict";
let id = 1;
console.log(id);
```

Summary:

Global scope

- All functions can access items

Function scope

- Resolve names by looking at functions, then surrounding functions, then global scope

var and Hoisting

- Use let and const
- Functions declarations are fine

Undeclared variables and strict mode

- 'use strict'
