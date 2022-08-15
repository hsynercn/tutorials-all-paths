# pluralsight-js-path
## 1. JavaScript Variables and Types
### 1.1. Course Overview
 
 Course content:
 - Template literals and tagged templates
 - Difference between let and const keywords
 - How to test strings for specific content

With this course you will know how to make your JS code more maintainable.

 ### 1.2. Using Variables, Literals, and Assignments
 
 How This Course Works
 - Install VS Code
 - Basic VS Code and JS web development
 - Use demo code: https://github.com/bmaluijb/GetYourLoanApp.git
 
 To use code open index.html with a browser.

 Run cloned project index.html with a modern browser to start project.

Demo content
- Using template literals
- Using tagged template literals
- Difference between let and const
- Destructuring syntax

 Using Template Literals

This is not the best way to create long string.
```js
let summaryText = "Dear" + la.ApplicationName + ", " + reviewText + " Your risk profile is " + riskProfile;
```

For a better implementation we can use a template.

 ```js
 let data = {
    id: 1,
    name: "Tom",
    price: 130.0
 }
 //template literal preserves line breaks 
 let summaryText = `This is a template literal for data, 
 id:${data.id}, 
 name:${data.name}, 
 price:${data.price}`;
 console.log(summaryText);
 ```

 Create a Tagged Template Literal

We can use tagged template literals to prerender template.

```js
//backslash t is becomes visible in HTML after raw function, with any special chars
//also 'String.raw' is actually a tag for template literal
let applicationCode = String.raw`\t${createApplicationId()}`;

//add HTML breaks
let summaryText = highlightText
        `Dear ${la.ApplicantName}, <br>
    your application for ${"$" + la.LoanAmount}, ${reviewText}.<br>
    Your risk profile is ${riskProfile}.<br>
    Your unique application code is ${applicationCode}`;

function createApplicationId() {
    let result = '';
    let characters = 'ABCDEUVYZabcdrswxyz01789/\\#@$%()*^!';
    let charactersLength = characters.length;
    for(var i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//makes values bold in string
function highlightText(strings, ...values) {
    let str = "";
    for(let i = 0; i < strings.raw.length; i++) {
        if(i > 0) {
            str += `<b>${values[i - 1]}</b>`; //HTML bold format fao values
        }
        str += strings.raw[i];
    }

    return str;
}
```

The Difference Between Let and Const

**Block Scope**

X has the same value inside and outside the block. Because var has a global and function scope, does not have a block scope. **let** is different, it has block scope. 
```js
function myFunction() {
   var x = 10;

   if(true) {
      var x = 'Hello';
   }

   //x is 'Hello' here
}
myFunction();
```

**var** and **let** declarations are different. It is not allowed to declare an existing variable as a **let** in the same scope no matter if the existing variable was a let or var. But we can redeclare a let within its own scope. 
```js
var x = 1;
let y = 2;
let y = 4; //NOT ALLOWED

if(true) {
   var x = 10; //allowed
   let y = 4;
   let y = 2; //NOT ALLOWED
}
```

The Const Keyword

We cannot change the thing to which const is assigned to.
```js
const arr = [3, 4, 5];
arr = 3; //error
arr = "Hello"; //error
arr = null; //error
arr[0] = 22; // ok
```

To prevent change on an object we can use freeze.
```js
var arr = Object.freeze([3, 4, 5]);
```
Keywords
- **var**
   - No block scope
   - Can be redeclared anywhere
   - Can be used and reassigned anywhere

- **let**
   - Block scope
   - Can not be redeclared within scope
   - Can be reassigned within scope
- **const**
   - Block scope
   - Can not be reassigned or redeclared
   - The value it references can change inside

Destructing Syntax to Get Values from Arrays and Objects

**Array Deconstruction**

Detailed implementation.
```js
let myArray = [1, 2, 3, 4];

let temp1 = myArray[0];
let temp2 = myArray[1];
let temp3 = myArray[2];
let temp4 = myArray[3];
```

We can use destructing. We can get a smaller part of original array. If original array can't populate all variables we get undefined variables. 
```js
let myArray = [1, 2, 3, 4, 5, 6 ,7];

let[temp1, temp2, temp3, temp4] = myArray; //1, 2, 3, 4

let myArray2 = [1, 2, 3];

let[temp1, temp2, temp3, temp4] = myArray2; //1, 2, 3, undefined
```

Array deconstruction with default values.
```js
let myArray2 = [1, 2, 3];
let [
   temp1,
   temp2 = true,
   temp3,
   temp4 = false,
   ...others
] = myArray2;
```

**Object Deconstruction**

Similar to array deconstruction, we can use default values.
```js
class LoanApplication() {
   Id = 1;
   ApplicantName;
   LoanPurpose;
   LoanAmount;
}

let {
   Id,
   ApplicantName = "Harry"
} = myLoanApplication;
```

**Summary**

- Template literals
   - 'Dear ${name}'
   - Multiline
- Using tagged template literals
   - We can highlight text
   - String.raw
- let and const
   - let and const provide block scope 
   - let can be reassigned but not redeclared
   - const can't be reassigned or redeclared
- Destructuring syntax
   - var [a, b, c] = array;
   - var {Id:a, name:b} = object;

### 1.3. Applying Primitive Types

- Test string for specific content
- Test numbers for type and safety
- Understanding Symbols in JavaScript

Test String for Specific Content

Start and end keyword searching.
```js
let name = "dr jack";
name = name.trim().toLowerCase();
let dr = name.startsWith("dr"); //true
let md = name.endsWith("md"); //false
```

Context check.

```js
let content = "my house";
content = content.trim().toLowerCase();
let containsHouse = content.includes("house");
```

Test Numbers for Type and Safety

We can validate an integer input with **isInteger** function.
```js
Number.isInteger("");   // false
Number.isInteger(25);   // true
Number.isInteger(25.3); // false
Number.isInteger(25.0); // true
Number.isInteger(null); // false
Number.isInteger(infinity);// false
```

In JS all numbers(integers, floats) stored with same mechanism. They are all stored as double-precision floating-point numbers. Because of this some larger numbers can lose precision.

```js
let result = 9007199254740992 + 1;
//because of rounding
console.log(result); //9007199254740992
```
We can check safe range with **isSafeInteger**.

```js
Number.MAX_SAFE_INTEGER; //9007199254740991
Number.MIN_SAFE_INTEGER; //-9007199254740991
Number.isSafeInteger(15); //true
```

Understanding Symbols in JavaScript

Symbols is a primitive datatype that can be used an identifier for object properties. Symbols are globally unique unguessable values.

Every symbol is unique.   
```js
let id = Symbol();
let id2 = Symbol("My Id");
let id3 = Symbol("My Id");

console.log(id); //symbol
console.log(id2.toString()); //Symbol(My Id)

id2 === id3; //false
```

We can get existing symbols form registry.
```js
let id = Symbol.for("y Id");
let id2 = Symbol.for("y Id");

id === id2; //true
```

We can use symbols inside of object to mark a value is hidden, by this other developers can know that value is hidden.
```js
let loan = {
   name: "Harry",
   [Symbol.for("income")]: 1500
};

console.log(loan[Symbol.for("income")]); //1500

//it is not completely hidden
console.log(loan[Object.getOwnPropertySymbols(loan)[0]]); //1500
``` 

**Summary**
- Test strings for content
   - String.search and trim() and toLowercase()
   - String.startsWith
   - String.endsWith
   - String.includes
- Test numbers
   - Number.isInteger
   - Number.isSafeInteger
- Symbols in JavaScript
   - Symbols are unique
