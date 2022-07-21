# JavaScript Core Language
## 1. JavaScript 7 Syntax and Operators
### 1.1. Course Overview

Major topics
- Basics of JavaScript syntax and operators
- Switch statement 
- For/in and for/of
- Math, comparison, and logical operators
- Truthy and falsy
- Exception handling
- Data types
- 'this' keyword
- Spread operator

Modules
- All About the Switch Statement
    - Simplify multiple if else statements
    - Block level scope issue/resolution
- The Difference Between for/in and for/of
    - Using the appropriate for loop
    - Break, continue and labels
- Using Math and Comparison Operators
    - Demos of operators
    - 'use strict'
- Working with Logical Operators and Short-circuit Evaluation
    - Truthy and falsy
    - How short-circuit evaluation works
- Utilizing JavaScript Exception Handling
    - try...catch
    - finally
- How to Determine JavaScript Variable Data Types
    - typeof operator
    - instance of operator
- Understanding 'this' in JavaScript
    - Use of 'this' in different scopes
    - Call() and apply() methods
- Using the Powerful Spread Operator
    - Manipulating arrays
    - Passing arrays to functions

### 1.2. All About the Switch Statement

Switch

Use instead of multiple if else statements. We use 'case' for cases, 'break' to exit cases, 'default' for no match. 

```js
function simpleSwitch() {
    let id = 2;
    switch (id) {
        case 1:
            console.log("Product 1");
            break;
        case 2:
            console.log("Product 2");
            break;
        default: //default can be at anywhere, for a better practice we put it at the end
            console.log("Product none");
            break;
    }
}
```

Multiple Case Statements

```js
function simpleSwitch() {
    let id = 2;
    switch (id) {
        case 1:
        case 3: //without break it falls to next case
        case 4:
            console.log("Product 1 or 3 or 4");
            break;
        case 2:
        case 6:
            console.log("Product 2 or 6");
            break;
        default:
            console.log("Product none");
            break;
    }
}
```

If we forget to put break execution continues.
```js
function simpleSwitch() {
    let id = 1;
    switch (id) {
        case 1:
            console.log("This is 1");
        case 2:
            console.log("This is 2");
        break;

    }
}
```

Switch uses strict comparison, **type and value must match**.

```js
let id = "2";
//we get unknown product, type does not match
switch (id) {
    case 1:
        console.log("product 1");
        break;
    case 2:
        console.log("product 2");
        break;
    default:
        console.log("Unknown product");
        break;
}
```

Block Level Issues with Switch Statements

Each case statement is **not a block**. We make a statement block by wrapping in braces.

```js
//we get identifier already been declared error from this implementation
let id = 2;
switch (id) {
    case 1:
        let message = "one";
        console.log(message);
        break;
    case 2:
        let message = "two";
        console.log(message);
        break;
}
```

To fix scope problem we can use local scope.
```js
//we get identifier already been declared error from this implementation if we don't use local scope
let id = 2;
switch (id) {
    case 1: {
        let message = "one";
        console.log(message);
        break;
    }
    case 2: {
        let message = "two";
        console.log(message);
        break;
    }
}
```

**Summary**
- Use switch statement for readability
- More efficient than multiple if...else statements
- Be careful with block level scope

### 1.3. The Difference Between for/in and for/of

Module content;
- For/in statement
- For/of statement
- Break
- Continue
- Labeled statements

For/in Statement  
- Iterates over elements of object.  
- Returns key (**all properties and methods**) name.
- object[key] returns value.

```js
let product = {
    "id": 1,
    "name": "Tom",
    "color": "black"
};
//in keyword grabs all property and method names from an object
for(const key in product) {
    //any object in JS can use dot notation or an index to retrieve a value
    console.log("key:'" + key + "'=" + product[key]);
}
```
For/of Statement  
- Iterates over values in array, string, etc.
- Returns **an object** for each iteration.
```js
let objects = [
    {"name": "a"},
    {"name": "b"},
    {"name": "c"},
    {"name": "d"}
];
for(const item of objects) {
    console.log(JSON.stringify(item));
}
```

A string is an array of characters. An array is an iterable object, so string is an iterable object. 

```js
let iterateString = "test";
for(const char of iterateString) {
    console.log(char);
    /* prints
    t
    e
    s
    t
    */
}
```

Difference for...in and for...of

Both for...in and for...of are looping constructs which are used to iterate over data structures. The only difference between them is the entities they iterate over:
- for...in iterates over all **enumerable property keys** of an object
- for...of iterates over the **values of an iterable object** like **arrays, strings, and node lists**.

If we use for...of with a non-iterable object we get 'object is not iterable' error

```js
let arr = ["val1", "val2", "val3"];
arr.addedProp = "addedProp";
for(const elKey in arr) {
    console.log(elKey);
}
// prints object keys 0, 1, 2, addedProp

for(const elValue of arr) {
    console.log(elValue);
}
//prints iterable values val1, val2, val3
```

Break and Continue

* Break: Leave a loop early
* Continue: Next iteration

```js
let array = [
    {"id": 1},
    {"id": 2},
    {"id": 3},
    {"id": 4}
];
for(const item of array) {
    if(item.id > 2 ) {
        break;
    }
    console.log(item.id); // prints only 1, 2 it breaks out of the loop 
}

for(const item of array) {
    if(item.id === 3 ) {
        continue;
    }
    console.log(item.id); // prints 1, 2, 4 it continues the loop with next element
}
```

Labelled Statement

* Define a location to "goto"
* Don't use this shit

```js
//even:  <- this is a label
even:
for(let index = 1; index <= 10; index++) {
    if(index % 2 == 1) {
        continue even;
    }
    console.log(index); // prints even number
}
```

**Summary**

Specialized for loops for iteration
- for/in for object properties/methods

Break and continue controls floe

Label is a "goto" mechanism
- Avoid at all costs

### 1.4. Using Math and Comparison Operators

Module content:
- JavaScript operators
    - Math
    - Assignment
    - Comparison
- Plus sign with strings and numbers
- 'use strict' functionality

Mathematical Operators

| Operator | Example |
| :---: | :---: |
| Addition(+) | 2 + 3 |
| Subtraction(-) | 4 - 2 |
| Multiplication(*) | 2 * 2 |
| Division(/) | 8 / 4 |
| Exponentiation(**) | 2 ** 2 |
| Modulus(%) | 9 % 4 |
| Increment(++) | index++ |
| Decrement(--) | index-- |

```js
let price = 12;
console.log(price + 10);  //22
console.log(price - 10);  //2
console.log(price * 10);  //120
console.log(price / 10);  //1.2
console.log(price ** 2);  //144
console.log(price % 10);  //2
```

When ++ or -- is placed **after** a variable, the current value of the variable is retrieved prior to the increment or decrement. 

```js
price = 10;
console.log(price++);  //10
console.log(++price);  //12
console.log(--price);  //11
console.log(price--);  //11
```

Plus Sign with Strings and Numbers
* Plus sign is overloaded
    * Strings: Concatenation
    * Numbers: Addition 

```js
//if one is a string -> concatenation
let result = 100 + "200"; // "100200"
//we can convert it to a numeric
let result2 = 100 + (+"200"); // 300
```

Assignment Operators

| Operator | Example |
| :---: | :---: |
| Equal(=) | price = 10 |
| Addition(+=) | price += 3 |
| Subtraction(-=) | price -= 2 |
| Multiplication(*=) | price *= 2 |
| Division(/=) | price /= 4 |
| Exponentiation(**=) | price **= 2 |
| Modulus(%=) | price %= 4 |

```js
let price = 10;
price += 20; //30
price -= 20; //10
price *= 10; //100
price /= 10; //10
price **= 2; //100
price %= 10; //0
```

Comparison Operators

| Operator | Example |
| :---: | :---: |
| Less than(<) | price < 10 |
| Less than or equal to(<=) | price <= 3 |
| Greater than(>) | price > 1 |
| Greater than or equal to (>=) | price >= 1 |
| Equal in value(==) | price == "10" |
| Equal in value and type(===) | price === "10" |
| Not equal in value(!=) | price != "10" |
| Not equal in value and type(!==) | price !== "10" |

```js
10 == 10; //true
10 === 10; //true
10 == "10"; //true
10 === "10"; //false
```

Ternary operator
```js
let message = 10 > 9 ? "greater" : "smaller";
```

'use strict'
* Ignored by older browsers.  
* Forces all variable to be declared.  
* Mistyped variable names are created globally scoped.  

```js
'use strict';
//value = 10;//we can't use this
let value = 10;
//with strict mode

//can't use reserved words as variables
let eval = 10;

//can't delete a variable
delete value;

//can't delete a function
delete useStrictSample;
```

**Summary**

Recognize the different operators
* Math
* Assignment
* Comparison

Effects of number + string

Effects of 'use strict'


### 1.5. Working with Logical Operators and Short-circuit Evaluation

Module Content

- True and false values
    - Known as 'truthy' and 'falsy'
- Logical operators
    - And, or, not
- Short circuiting

| True | False |
| :---: | :---: |
| EVERYTHING NOT FALSY | false |
| 10 | 0 |
| true | "" or ''(empty string) |
| "Hello" | null |
|| Nan |
|| undefined|

True values
```js
let price = 200;
let color = "red";

//price is greater than zero
if(price) {
    console.log("price is > 0");
}

//color has characters
if(color) {
    console.log("color has a value");
}

```

False values

```js
//these cases results false in an if
let color = null;
color = "";
color = undefined;
let value2;
value2 = 100 / "test"; //Nan
let result = color ? true : false;
console.log(result); //false 
```

Logical Operators

| Operator | Example |
| :---: | :---: |
| And(&&) | price > 10 && price < 100 |
| Or(&#124;&#124;) | price <= 10 || price >= 100 |
| Not(!) | !(price > 10) |

```js
let price = 50;
price > 10 && price < 100; //true
price > 10 || price > 100; //true
!(price > 100); //true
```

**Short Circuiting**

Optimization for logical expressions.  
Bypassed subsequent expressions in && or || based truthy or falsy

```js
//does not call second function
let result = getFalse() && getTrue(); 

//does not call second function
let result2 = getTrue() || getFalse(); 

function getTrue() {
    return true;
}
function getFalse() {
    return false;
}
```

Order of Precedence

| Precedence | Operator type | Associativity |
| :---: | :---: | :---: |
| 19 | Grouping | n/a |
| 16 | Postfix Increment, Postfix Decrement | n/a |
| 15 | Logical NOT | right-to-left |
| 15 | Prefix Increment, Prefix Decrement | right-to-left |
| 14 | Exponentiation (**) | right-to-left |
| 13 | Multiplication (*), Division (/), Remainder (%) | left-to-right |
| 10 | Less Than (<), Less Than Or Equal (<=) | left-to-right |
| 10 | Greater Than (>), Greater Than Or Equal (>=) | left-to-right |
| 9 | Equality (==), Inequality (!=) | left-to-right |
| 9 | Strict Equality (===), Strict Inequality (!==) | left-to-right |
| 5 | Logical AND (&&) | left-to-right |
| 4 | Logical OR (&#124;&#124;) | left-to-right |
| 2 | Assignment | right-to-left |

**Summary**

True
- Boolean true
- Variable that has a value

False
- null, Nan, undefined, 0, "" or ''(empty string), false

Logical operators (and, or, and not)
- Helps you make complicated decisions

Remember short-circuiting
- Determines if a function runs

### 1.6. Utilizing JavaScript Exception Handling

Module content:
- Handling exceptions
    - try...catch statements
    - finally statement
- Throw a custom exception
- Check for type of error

A JS error object always has 'name' and 'message' properties.
```js
try {
    //some code that could fail
} catch (error) {
    //do something with error
} finally {
    //this code always runs
}
```

```js
let result;
try {
    result = x / 10;
    console.log(result); //didn't execute
} catch (error) {
    console.log(error.message);//x is not defined
} finally {
    console.log("finally block");
}
```

Throw

Can throw your own custom error.  
Create an object with at least two properties "message" and "name".

```js
try{
    throwsSomeError();
} catch (error) {
    console.log(error.message + " - " + error.name);
}

function throwsSomeError() {
    let result;
    try{
        result = x / 10;
    } catch (error) {
        //add name and message properties
        throw{
            "message": "This is my exception",
            "name": "Custom exception"
        }
    }
}
```

Detect the Error Type

Builtin error types:
- ReferenceError
- RangeError
- TypeError
- URIError
- SyntaxError
- EvalError < older code

```js
function handleError(error) {
    switch (error.name) {
        case "ReferenceError":
            console.log("ReferenceError");
            break;
        case "RangeError":
            console.log("RangeError");
            break;
        case "TypeError":
            console.log("TypeError");
            break;
        case "URIError":
            console.log("URIError");
            break;
        case "SyntaxError":
            console.log("SyntaxError");
            break;
        case "EvalError":
            console.log("EvalError");
            break;
        default:
            console.log("Default");
            break;
    }
}
```

Summary
- Always add try...catch around risky code
- Use finally block if required
- Throw custom error to communicate specific info
- Change how you handle errors based on the type of error


### 1.7. How to Determine JavaScript Variable Data Types


Module content:
- Different data types
    - Primitives 
    - Objects
- How to determine data types
    - typeof operator
    - constructor property
    - instanceof operator

Primitive Data Types

| Data type | Description |
| :---: | :---: |
| boolean | true or false |
| null | no value |
| undefined | a variable declared, but has no value |
| number | integers, decimals, float. etc. |
| string | a series (array) of characters |

Object Data Types
| Data type | Description |
| :---: | :---: |
| new Array | A collection of values |
| new Error | Contains a name and an error message |
| new Function | A block of code |
| new Object | A wrapper around and type |
| new RegExp | A regular expresion |
| new Boolean | An objects that contains true or false |
| new Number | An object that contains a numeric value |
| new String | An object that contains a char or chars |

Better use primitive boolean, number, and string. Object versions are costly and slower to access.

typeof Operator

Returns the data type of the passed in expression.  
A string value is returned such as:'string', 'number', 'object', etc.

```js
console.log(typeof "Hello");//string
console.log(typeof 4);//number
console.log(typeof 2 * 2);//number
```

```js
function test() {}
let products = [
    {id:1, name: "Tom", subObj: {}},
    {id:2, name: "Jake", subObj: {}}
]
let product = products[0];
let introDate = new Date();
let strValue = new String();
let isActive = false;
let result;
let value = null;

console.log(typeof products);   //object
console.log(typeof products[0]);//object
console.log(typeof product);    //object
console.log(typeof product.id); //number
console.log(typeof product.name);//string
console.log(typeof product.subObj);//object
console.log(typeof introDate);  //object
console.log(typeof strValue);   //object
console.log(typeof isActive);   //boolean
console.log(typeof result);     //undefined
console.log(typeof value);      //object
console.log(typeof test);       //function
```

Object Data Type / Constructor

All object data types inherit from Object(**not the primitives**).  
Object has constructor property. 
Returns a reference to the object itself.  

```js
function test() {}
let products = [
    {id:1, name: "Tom", subObj: {}},
    {id:2, name: "Jake", subObj: {}}
]
let product = products[0];
let introDate = new Date();
let strValue = new String();
let isActive = false;
let result;//undefined does not have a constructor
let value = null;// null does not have a constructor

console.log(products.constructor.toString());   //function Array() { [native code] }
console.log(products[0].constructor.toString());//function Object() { [native code] }
console.log(product.constructor.toString());    //function Object() { [native code] }
console.log(product.id.constructor.toString()); //function Number() { [native code] }
console.log(product.name.constructor.toString());//function String() { [native code] }
console.log(product.subObj.constructor.toString());//function Object() { [native code] }
console.log(introDate.constructor.toString());  //function Date() { [native code] }
console.log(strValue.constructor.toString());   //function String() { [native code] }
console.log(isActive.constructor.toString());   //function Boolean() { [native code] }
console.log(test.constructor.toString());       //function Function() { [native code] }
```

Helper Functions for the Constructor Property

```js
function isArray(value) {
    return value.constructor.toString().indexOf("Array") > -1;
}
function isDate(value) {
    return value.constructor.toString().indexOf("Date") > -1;
}
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
```
instanceof Operator

Tests if inherits from Object(not a primitive).  
Tests for a specific type of object.

```js
//object constructor function
function Product(id, name, number) {
    this.productId = id;
    this.name = name;
    this.productNumber = number;
    this.color = "Black";
    this.standartCost = 10;
    this.listPrice = 20;
}

let prod = new Product(1, "Tom", "101");
let date = new Date();
let name = new String("Name");
let value = "A simple string";

//primitives are not objects
console.log(prod instanceof Product);//true
console.log(prod instanceof Object);//true
console.log(date instanceof Date);//true
console.log(date instanceof Object);//true
console.log(name instanceof String);//true
console.log(value instanceof String);//false, primitives are not objects
console.log(value instanceof Object);//false
```

**Summary**

Important to understand the difference between primitives and Objects.

Use primitives where possible.

Detecet data types using typeof and instanceof.
- typeof for checking type
- instanceof for checking what type of object

Can use constructor property.
- Both on objects and primitives

### 1.8. Understanding 'this' in JavaScript

Module content:
- What is 'this'
- Learn how 'this' changes
- Global and function scope
- Event handlers
- Object literal
- call()/apply() methods
- Constructor functions

Introduction to the 'this' Keyword

Refers to an object.  
That object in which the current code is running.  
Sometimes the object can be changed.

JS is running within the global window object.
```js
//in HTML script block this=global window object
console.log(this.toString());//prints [object Window]
//
```

```js
let person = {
    //this=person object literal
    id: "100",
    name: "name",
    getName:function() {
        return this.id + "" + this.name;
    }
}
```

```js
function Person(id, name) {
    //current Person object
    this.id = id;
    this.name = name;
    this.getName = function() {
        return this.id + "" + this.name;
    }
}
let person1 = new Person(1, "Tom");
let person2 = new Person(2, "Cat");

console.log(person1.getName());//1Tom
console.log(person2.getName());//2Cat

```

'this' in Global and Function Scope

Different values based on executing context:
- In a method: owner object
- In a function: global object
- In an event: element that received the event

Call()/apply() methods refers to object passed in.  
'use strict' also affects 'this'.

Use strict changes the function scope behavior. Without 'use strict' function scope acts as global scope.
```html
<script>
    'use strict'
    //global scope
    console.log("this refers to:" + this.toString());//[object Window]
    console.log("this === window:" + (this === window));//true
    functionScope();
    function functionScope() {
        //Uncaught TypeError: Cannot read properties of undefined (reading 'toString')
        console.log("this refers to:" + this.toString());
        console.log("this === window:" + (this === window));
    }
</script>
```

'this'in Event Handlers

'this' refers to HTML element that it's attached to.
 ```html
<button onclick="this.style.background='Red'">
    In event handler
</button>
<button onclick="eventHandler(this)">
    Button
</button>
<script>
    'use strict';
    function eventHandler(ctl) {
        console.log(ctl.toString());// [object HTMLButtonElement]
    }
</script>

 ```

'this'in Object Literal
```js
let product = {
    "id": 101,
    "standartCost": 1059.31,
    "listPrice": 1431.42,
    grossProfit: function() {
        return (this.listPrice - this.standartCost)
            .toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }
}
console.log(product.grossProfit());// $372.11
```

'this' with call() and apply() Methods

call(): It can be used to invoke (call) a method with an owner object as an argument (parameter). With call(), an object can use a method belonging to another object.

Call and apply are very similar, both invoke the function they are called on, and take 'this' argument as their first argument.

But their other parameters are different.
- **apply**: lets you invoke the function with arguments as an array.
- **call**: requires the parameters be listed explicitly.  

**"A for array and C for comma."**

| Call | Apply |
| :---: | :---: |
| someFunc.call(thisArg, 1, 2, 3) | someFunc.apply(thisArg, [1, 2, 3] |


```js

let product = {
    "id": 101,
    "standartCost": 1059.31,
    "listPrice": 1431.42,
    grossProfit: function() {
        return (this.listPrice - this.standartCost)
            .toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }
}
let product2 = {
    "standartCost": 250,
    "listPrice": 450,
}
console.log(product.grossProfit.call(product));//$372.11
console.log(product.grossProfit.call(product2));//$200.00
console.log(product.grossProfit.apply(product));//$372.11
console.log(product.grossProfit.apply(product2));//$200.00

```

'this'in Constructor Functions

```js
function Product(id, cost, price) {
    this.id = id;
    this.standartCost = cost;
    this.listPrice = price;
    this.grossProfit = function() {
        return (this.listPrice - this.standartCost)
            .toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }
}
let product1 = new Product("1", 100, 200);
let product2 = new Product("2", 50, 100);
console.log(product1.grossProfit());//$100.00
console.log(product2.grossProfit());//$50.00
```

Summary:
- Scope determines value of 'this'
    - Global object
    - HTML element
    - Method owner
- 'use strict' makes 'this' undefined in functions
- What is passed to call() and apply() methods becomes 'this'
- constructor functions owner is 'this'

### 1.9. Using the Powerful Spread Operator

Module content:
- Power of spread
- Copy/concatenate arrays
- Pass constructors
- Shallow copy objects
- Call function with multiple parameters

Spread Operator

Expand any 'iterable' such as a string or array into an array.  
For passing multiple arguments to method.  
The syntax uses the ellipsis symbol(...).  
Always on the right-side of an equal sign.  

NOTE: IE and Edge do not support spread

Copy a String to an Array Using Spread

Convert string to array by spread operator.
```js
function stringToArray() {
    return [..."test"]
}
console.log(stringToArray());//(4) ['t', 'e', 's', 't']
```

Copy an Array of Primitives Using Spread

```js
let arr = [1, 2, 3];
//copies array
let arr2 = [...arr];
//same as slice
let arr3 = arr.slice(0);
```

Copy an Array of Objects

```js
let _products = [
    {id:1, name:"Tom"},
    {id:2, name:"Cat"}
];
//copied by ref
let products = [..._products];
products[0].name = "Jane";
console.log(_products[0].name);//Jane
console.log(products[0].name);//Jane
```

Concatenate Two Arrays Together

```js
let products1 = [
    {id:1, name:"Tom"},
    {id:2, name:"Cat"}
];
let products2 = [
    {id:1, name:"Tom"},
    {id:2, name:"Cat"}
];
//same operation
let allProds1 = products1.concat(products2);
let allProds2 = [...products1, ...products2];
```

Using Spread to Pass Parameters to a Constructor

```js
let date1 = new Date(2022, 1, 1);
let params = [2022, 1, 1];
let date2 = new Date(...params);
```

Passing Parameters to a Function

```js
function multipleParams(arg1, arg2, arg3) {
    console.log(arg1 + "," arg2 + "," arg3)
}
multipleParams(1, 2 ,3);
let arr = [1, 2, 3];
multipleParams(...arr);
```

Shallow Copy on Object Literals

```js
let prod1 = {id:1, name:"Tom", location:{city:"Ist"}};
//shallow copy
let prod2 = {...prod1};
prod2.id = 2;
console.log(prod1.id);//1
console.log(prod2.id);//2
prod2.location.city = "17";
console.log(prod1.location.city);//17
console.log(prod2.location.city);//17
```

**Summary**

* Spread operator simplifies code
* More concise
* Can make code harder to read
* Not supported by all browsers
* switch statement simplifies our code
* for/in and for/of provide specialized looping
* Math, logical and comparison operators
* Short circuiting makes our code efficient
* Can now handle exceptions
* typeof and instanceof provide us a look into our variables
* 'this' keyword changes based on scope
* Spread can make our code harder to read


