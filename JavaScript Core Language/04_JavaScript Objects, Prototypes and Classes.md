# pluralsight-js-path
## 1. JavaScript Objects, Prototypes, and Classes
### 1.1. Course Overview

- Creating objects
- Object properties
- Prototypes
- JavaScript classes
- Built-in JavaScript objects

## 2. Creating JavaScript Objects

Content:
- We can create object with:
    - Object literals
    - Constructor functions
    - Classes
- Object equality
- Merging properties
- Immutability

git clone https://github.com/jmcooper/javascript-opc.git

Using Object Literals to Create JavaScript Objects

Easiest way to create object in JavaScript is object literals.
```js
//object literal
let person = {
    name: "test",
    id: 1
}
console.log(person.name); //test
```
Dynamic Nature of JavaScript

JavaScript is a dynamically typed language, so we don't get static type checking. We can change objects.

```js
let person = {
    name: "test",
    id: 1
}
person.age = 33; // we can add new properties
console.log(person.age); //33
```

Adding Functions to Objects

```js
let person = {
    name: "test",
    id: 1,
    age: 17,
    isAdult: function() { return person.age >= 18; }
}
console.log(person.isAdult()); //false
```

Object Literal Property Shorthand

We can use parameters for object initialization.
```js
function registerUser(firstName, lastName) {
    let person = {
        firstName: firstName,
        lastName: lastName
    };
    console.log(JSON.stringify(person));
}
```

For shorthand syntax we can use this implementation.

```js
function registerUser(firstName, lastName) {
    let person = {
        firstName,
        lastName
    };
    console.log(JSON.stringify(person));
}
```

Object Method Declaration Shorthand

We can use this syntax inside of objects. We can't use this expression outside of objects.
```js
let person = {
    name: "billy",
    introduce() { console.log("My name is " + this.name); }
}
person.introduce(); //My name is billy
```

Inspecting Object Properties with Object.keys and for...in

```js
let person = {
    firstName: "Billy",
    lastName: "Rush",
    age: 33,
    isAdult() { return age >= 18; }
}
console.log(Object.keys(person)); //['firstName', 'lastName', 'age', 'isAdult']

for(let propertyName in person) {
    console.log(propertyName); //same variables
}
```

JavaScript Equality Operators

| Operator | Explanation|
| :---: | :---: |
| == | Should be avoided. |
| === | Most common. Should be used in almost all cases. |
| Object.is() | Less common, similar to === with mathematical differences. |

Equality Operator: ==
- Not type safe
- True cases:
    - "42" == 42
    - 0 == false
    - null == undefined
    - "" == 0
    - [1, 2] == "1, 2"

Equality Operator: === vs Object.is()
| === | Object.is()|
| :---: | :---: |
| Type-safe | Type-safe |
| Convenient | Verbose |
| Nan is not equal to Nan | Nan equals Nan |
| +0 equals -0 | +0 does not equal -0 |

Object Equality

When we compare objects we do not compare contents of the objects. We compare **memory addresses** of the objects. Thus even identical variable within different objects does not give equality.

```js
let person1 = {
    firstName: 'Tom',
    lastName: 'Cat'
};
let person2 = {
    firstName: 'Tom',
    lastName: 'Cat'
};
//for objects we compare memory addresses
person1 == person2; //false
person1 === person2; //false
Object.is(person1, person2); //false
```

Primitive types like string, JavaScript compares their values, for objects it compares memory addresses.

Object Assign and Immutability

We can create a shallow object copy with Object.assign. Assing method lets us copy or merge contents of an object to another object.

```js
let person1 = {
    firstName: "Billy",
    lastName: "Rush",
    age: 33,
    isAdult() { return age >= 18; }
}

let person2 = {};
Object.assign(person2, person1);
person1 === person2; //false
console.log(person2); //{firstName: 'Billy', lastName: 'Rush', age: 33, isAdult: ƒ}
```

Merge two objects with Object.assign. We can prevent mutation with a left empty object. 

```js
let person = {
    firstName: "Billy",
    lastName: "Rush",
    age: 33,
    isAdult() { return age >= 18; }
}
let health = {
    height: 68,
    weight: 11
};
let newObject = Object.assign({} , person, health); //adds height and weight to a new object
```

Using **Constructor Functions** to Create Objects

**new** keyword creates a new empty JavaScript object, constrcutor function adds the properties to this new object. **'this'** keyword refers to new object. 
```js
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
let person = new Person("Rush", "More");
```

This type of functions are commonly called constructor functions.

Using Object.create()

Object literals and constructor functions use Object.create to create objects. This is a very verbose method.

```js
//very verbose
let person = Object.create(
    Object.prototype,{
        firstName: {value: "Jim", enumerable:true, writable:true, configurable:true},
        lastName: {value: "Jim", enumerable:true, writable:true, configurable:true},
    }
)
```

## 3. JavaScript Object Properties

Using Bracket Notation to Access Object Properties

Dot and bracket notations are same. We can use bracket notation for property names that are not valid identifiers.
```js
let person = {
    firstName: 'Jim',
    lastName: 'Cooper',
    age: 29,
};
person.age = 30;
person['hair color'] = 'Brown';
let propertyName = 'firstName';
console.log(person[propertyName]);//Jim
```

Loop for all property names.
```js
let person = {
    firstName: 'Jim',
    lastName: 'Cooper',
    age: 29,
};
for(let propertyName in person) {
    console.log(propertyName + ": " + person[propertyName]);
}
```

Modifying Properties with Property Descriptor

We can get property info with descriptor method.
```js
let person = {
    firstName: 'Jim',
    lastName: 'Cooper',
    age: 29,
};
//{value: 'Jim', writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(person, "firstName"));
```

Using the Writable Attribute

Is property changeable after the initial value.
```js
'use strict'
let person = {
    firstName: 'Jim',
    lastName: 'Cooper',
    age: 29,
};
Object.defineProperty(person, 'firstName', {writable: false});
//Uncaught TypeError: Cannot assign to read only property 'firstName' of object
person.firstName = "Hello";
```
We can change the nested properties.
```js
'use strict'
let person = {
    name : {
        firstName: 'Jim',
        lastName: 'Cooper',
    },
    age: 29,
};
Object.defineProperty(person, 'name', {writable: false});
person.name.firstName = "Hello"; //this is OK

//but if we use freeze on that object
Object.freeze(person.name);
//Uncaught TypeError: Cannot assign to read only property 
person.name.firstName = 'Test';
```

Using the Enumerable Attribute

As default all object properties are enumerable.
If we set enumerable field of a variable to false we can't see that variable in JSON.stringify or Object.keys.
```js
let person = {
    firstName: 'Jim',
    lastName: 'Cooper',
    age: 29,
};
console.log(Object.keys(person)); //['firstName', 'lastName', 'age']

Object.defineProperty(person, 'firstName', {enumerable: false});

for(let propertyName in person) {
    console.log(propertyName + ": " + person[propertyName]); //doesn't print firstName
}

console.log(Object.keys(person)); //['lastName', 'age']
console.log(JSON.stringify(person)); //{"lastName":"Cooper","age":29}
//but still we can get that property by dot notation
console.log(person.firstName);
```

Using the Configurable Attribute

We can prevent property descriptor modifications with configurable field.
```js
let person = {
    firstName: 'Jim',
    lastName: 'Cooper',
    age: 29,
}; 
Object.defineProperty(person, 'firstName', {configurable: false});

//we can't set configurable property to true
Object.defineProperty(person, 'firstName', {configurable: true}); //Uncaught TypeError: Cannot redefine property: firstName

//we can't change enumerable property
Object.defineProperty(person, 'firstName', {enumerable: false}); //Uncaught TypeError: Cannot redefine property: firstName

//we can't delete property
delete person.firstName;

//except writable descriptor, we can change it
Object.defineProperty(person, 'firstName', {writable: false});
```

Deleting a property.

```js
'use strict';
let person = {
    firstName: 'Jim',
    lastName: 'Cooper',
    age: 29,
};
delete person.age;
console.log(JSON.stringify(person)); //{"firstName":"Jim","lastName":"Cooper"}
```

Creating Property Getters and Setters

```js
let person = {
    name: {
        firstName: 'Jim',
        lastName: 'Cooper'
    }
    age: 29,
};
//we can add a new property and add setter and getter for this property
Object.defineProperty(person, 'fullName',{
    get: function() {
        return this.name.first + ' ' + this.name.last;
    },
    set: function(value) {
        var nameParts = value.split(' ');
        this.name.first = nameParts[0];
        this.name.last = nameParts[1];
    }
});

person.fullName = 'Fred Jones';

console.log(person.fullName); //Fred Jones
console.log(person.name.firstName); //Fred
console.log(person.name.lastName); //Jones
```

## 3. JavaScript Prototypes and Inheritance

What is Prototype?

Prototypes are the mechanism by which JavaScript objects inherit features from one another.

Every function is JavaScript has a prototype property. Objects have a prototype, but they don't have a prototype property.

```js
'use strict';
let myFunction = function() {};

console.log(JSON.stringify(myFunction.prototype)); //{}

let person = {firstName: 'Jim'};

console.log(JSON.stringify(person.prototype)); //undefined

console.log(JSON.stringify(person.__proto__));// {}
```

A prototype is an instance of an object in memory.

**A Function's Prototype:**
It is an object **instance** that will become the prototype for all objects created using this function as a constructor.

**An Objects's Prototype**
An object's prototype is the object **instance** from which the object is inherited.

If we create a new object with constructor function our new object get it's ```__proto__``` property form function's prototype.

```js
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

//we are manipulating the same object
Person.prototype.age = 22;

let billy = new Person("Billy", "Rush");
let sofia = new Person("Billy", "Rush");

Person.prototype === billy.__proto__; //true, they are same object

console.log(JSON.stringify(billy.__proto__)); //{"age":22}
console.log(JSON.stringify(sofia.__proto__)); //{"age":22}

sofia.__proto__ = 19;

console.log(JSON.stringify(billy.__proto__)); //{"age":19}
console.log(JSON.stringify(sofia.__proto__)); //{"age":19}
```

Instance vs. Prototype Properties

```js
'use strict';
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.age = 22;

let billy = new Person("Billy", "Rush"); //age: 22
let jack = new Person("Jack", "Rush"); //age: 22

console.log(billy.age); //22
console.log(jack.age); //22

//we are adding a new property to jack
jack.age = 33;

console.log(billy.age); //22
console.log(jack.age); //33

console.log(jack.__proto__.age); //22
console.log(jack.hasOwnProperty('age')); //true
console.log(jack.age); //33

console.log(billy.hasOwnProperty('age')); //false
console.log(billy.age); //still we can get this value
```

When we access an object's property JavaScript checks the object itself first, later checks the prototype. **Instance property overrides the prototype property.**

Changing a Function's Prototype

```js
'use strict';
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.age = 22;

let billy = new Person("Billy", "Rush"); //age: 22
let jack = new Person("Jack", "Rush"); //age: 22

//set a new object for prototype
Person.prototype = { age: 18 };

let newObject = new Person("New", "New"); //age: 18

//billy and jack prototype object is different than newObject
console.log(billy.age); //22
console.log(jack.age); //22
console.log(newObject.age); //18
```

Multiple Levels of Inheritance

By default, all objects in JavaScript inherit from object.

```js
'use strict';
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

let billy = new Person("Billy", "Rush");

//we always hit a null in prototype chain
console.log(JSON.stringify(billy.__proto__)); //{}
console.log(JSON.stringify(billy.__proto__.__proto__)); //{}
console.log(JSON.stringify(billy.__proto__.__proto__.__proto__)); //null, end of the chain
```
We can create a more meaningful inheritance chains.

Creating Prototypal Inheritance Chains

```js
'use strict';
function Person(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    Object.defineProperty(this, 'fullName', {
        get: function() {
            return this.firstName + ' ' + this.lastName;
        },
        enumerable: true
    });
}

function Student(firstName, lastName, age) {
    Person.call(this, firstName, lastName, age);
    this._enrolledCourses = [];

    this.enroll = function(courseId) {
        this._enrolledCourses.push(courseId);
    }

    this.getCourses = function() {
        //we can access to Person object's property
        return this.fullName + 'enrolled courses ' + this._enrolledCourses.join(',');
    }
}
// we need to add these two lines to create a prototype chain
Student.prototype = Object.create(Person.prototype);
// we are replacing the Student constructor with newly set Person constructor
Student.prototype.constructor = Student;

let bill = new Student('Billy', 'Rush', 33);

console.log(JSON.stringify(bill));
console.log(JSON.stringify(bill.__proto__));
console.log(JSON.stringify(bill.__proto__.__proto__));
```

JavaScript Classes

Classes play the exact same role as **constructor functions**. They are templates for creating objects and encapsulating logic related to those objects.

Basically anything we can do with constructor functions, we can do with classes. Classes are really just syntactic sugar for a cleaner way to do all this.

**Class structure is not supported by IE.**

Creating Object with Classes

```js
'use strict';
class Person {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}

let bill = new Person('Bill', 'Rush');

console.log(JSON.stringify(bill)); //{"firstName":"Bill","lastName":"Rush"}
```

Creating Getters and Setters with Classes

Getter and setter syntax is cleaner than constructor classes.

```js
'use strict';
class Person {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
    set fullName(fullName) {
        let nameParts = fullName.split();
        this.firstName = nameParts[0];
        this.lastName = nameParts[1];
    }
}
```

Adding Functions to Classes

```js
'use strict';
class Person {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
    set fullName(fullName) {
        let nameParts = fullName.split();
        this.firstName = nameParts[0];
        this.lastName = nameParts[1];
    }
    isAdult() {
        return this.age >= 18;
    }
}
```

Modifying Property Descriptor on Classes

When we create a getter it is created with enumerable set to false. Generally this is not important because we don't iterate over keys of objects frequently.

Classes have prototypes just like functions. Getters and setter live on the prototype. We can change prototype 

**Object.keys only returns that object's own enumerable properties.** If we want to check prototype properties we can use **Object.keys(Object.getPrototypeOf(person))**.
```js
'use strict';
class Person {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
    set fullName(fullName) {
        let nameParts = fullName.split(' ');
        this.firstName = nameParts[0];
        this.lastName = nameParts[1];
    }
    isAdult() {
        return this.age >= 18;
    }
}
//we can change setter/getter descriptor with Object.defineProperty
Object.defineProperty(Person.prototype, 'fullName', {enumerable: true});

let jack = new Person('Jack', 'Black', 22);
console.log(Object.keys(Object.getPrototypeOf(jack))); //['fullName']
```

Using Inheritance with JavaScript Classes

```js
'use strict';
class Person {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
    set fullName(fullName) {
        let nameParts = fullName.split(' ');
        this.firstName = nameParts[0];
        this.lastName = nameParts[1];
    }
    isAdult() {
        return this.age >= 18;
    }
}

//extends keyword provides inheritance
class Student extends Person{
    constructor(firstName, lastName, age) {
        //we are calling the parent class constructor
        super(firstName, lastName, age);
        this._enrolledCourses = [];
    }
    
    enroll(courseId) {
        this._enrolledCourses.push(courseId);
    }

    getCourses() {
        return this.fullName + ' enrolled courses ' + this._enrolledCourses.join(',');
    }
}

let jack = new Student("Jack", "Black", 22);
jack.enroll("CS101");
console.log(jack.getCourses()); //Jack Black enrolled courses CS101
```

Using Static Properties and Methods

Static properties and methods are items that you can access on a class without having to first create an instance of that class.

```js
'use strict';
class Person {
    static adultAge = 18;
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    getInfo() {
        return `My name is ${this.firstName} ${this.lastName} and I am ${this.age} years old.`
    }
    static getAgeLimit() {
        return this.adultAge;
    }
}
console.log(Person.adultAge); //18
console.log(Person.getAgeLimit()); //18
let bill = new Person('Bill', 'Hill', 33);
console.log(Person.getInfo()); //Uncaught TypeError: Person.getInfo is not a function
```

There is no getInfo function directly under the Person class.

Using Built-in JavaScript Objects

- Math
- Date
- Regex

```js
console.log(Math.PI); //3.141592653589793
console.log(Math.max(2, 42, 29)); //42
console.log(Math.round(29.6)); //30
```

Managing Dates with the Date Object

```js
let date = new Date(0);
console.log(date.toString()); //displayed as local time: Thu Jan 01 1970 02:00:00 GMT+0200 (GMT+03:00)

//for some reason month is zero based, others are 1 based
let date2 = new Date(2050, 3, 25, 13, 1, 30, 50);
console.log(date2); //Mon Apr 25 2050 13:01:30 GMT+0300 (GMT+03:00)

//Local machine time zone
console.log(date.getFullYear());
console.log(date.getMonth()); //ZERO BASED
console.log(date.getDate());
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());
console.log(date.getMilliseconds());

//Universal Time Zone
console.log(date.getUTCFullYear());
console.log(date.getUTCMonth()); //ZERO BASED
console.log(date.getUTCDate());
console.log(date.getUTCHours());
console.log(date.getUTCMinutes());
console.log(date.getUTCSeconds());
console.log(date.getUTCMilliseconds());
```

Validating Strings with the RegExp.test() Function

```js
let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
regex.test('Stringer1'); //true
```

Searching Strings with the RegExp.exec() Function

```js
let regex = /ERROR:/;
//prints: ['ERROR:', index: 8, input: 'INFO:Ok;ERROR:Something broke;', groups: undefined]
console.log(regex.exec('INFO:Ok;ERROR:Something broke;'));
```

