# JavaScript Core Language
## 1. JavaScript Arrays and Collections
### 1.1. Course Overview

- Advanced arrays methods
- New data collections
- Sets
- Maps
- Typed arrays

## 2. Methods for Working with Arrays

Module Introduction

- Advanced methods(list of, find, fill)
- New ways to iterate
- New data collections (sets, maps)
- Specific methods for sets and maps
- Typed arrays

Create an Array from a List of Arguments

```js
let sales = Array.of(1, 2, 3);
let dates = Array.of('Oct','Nov','Dec');
let emptyArray = Array(5);
console.log(sales); //[1, 2, 3]
console.log(dates); //['Oct', 'Nov', 'Dec']
console.log(emptyArray); //[empty × 5]
```

Using the Spread Operator with Arrays

```js
let sales = [1, 2, 3];
function addYearlyTotal(a, b, c) {
    return a + b + c;
}

let yearlyTotal = addYearlyTotal(sales);
console.log(yearlyTotal); //'1,2,3undefinedundefined'

yearlyTotal = addYearlyTotal(...sales);
console.log(yearlyTotal); //6
```

Using Array.find and findIndex to Find a Value

```js
let sales = Array.of(1, 2, 3, 4, 5 ,6);
let firstFind = sales.find(element => element === 3); // we need to supply a function to find
console.log(firstFind); //3
```
```js
let sales = Array.of(1, 2, 3, 4, 5 ,6);
let secondFind = sales.find(element => element >= 3); // we get first proper element
console.log(secondFind); //3

let index = sales.findIndex(element => element >= 5); //we get the first proper element index
console.log(index); //4
```

Using Array Fill

```js
let myArray = Array(5);
myArray.fill(0);
console.log(myArray); //[0, 0, 0, 0, 0]
```

Methods for Iterating Through Arrays

```js
let sales = [1, 2, 3, 4, 5];
let total = 0;
sales.forEach(element => total += element);
console.log(total); //15
```

**Summary**

- Array.of
- Spread operator
- Array.find
- Array.fill
- Iterating arrays

## 3. Working with Sets

Review Data Collections

ECMAScript 6: 17 June 2015, new features, new data collections

Before
- Arrays
- Objects

ECMAScript
- Sets
- Maps
- WeakSets
- WeakMaps

| Data Type | Explanation|
| :---: | :---: |
| Boolean | Primitive |
| Null | Primitive |
| Undefined | Primitive |
| Number | Primitive |
| BigInt | Primitive |
| String | Primitive |
| Symbol | Primitive |
| Objects | - |

Object: Value in memory which could be referenced by an identifier.

Introducing Sets

Sets: Stores **unique** values of any type, whether primitive values or object references.

Methods
- Add
- Clear
- Delete
- Entries
- forEach
- Has
- Keys
- Values

Adding and Removing Values to Set

```js
let mySet = new Set();
mySet.add("1");
mySet.add("2");
mySet.add("3");
console.log(mySet.size); //3
mySet.delete("3");
console.log(mySet.size); //2
mySet.add("3").add("4").add("5").add("6");

let mySet2 = new Set(["7", "8", "9"]);
console.log(mySet2.size); //3
```

Iterating a Set

```js
let mySet = new Set(["1", "2", "3"]);
for(let element of mySet) {
    console.log(element);
}
//1
//2
//3
```

```js
let mySet = new Set(["1", "2", "3"]);
mySet.forEach((key, value, currentSet) => console.log(key));
//1
//2
//3
```

Array from.

```js
console.log(Array.from([1, 2, 3], x => 3 * x)); //[3, 6, 9]
```

Differences Between Set and WeakSet

| WeakSet |
| :---: |
| Only contain **objects** |
| No primitive data types |
| Objects are held "weakly" |
| Not iterable |
| No access to size property |
| Garbage collected |

WeakSet supports Add, Delete, Has methods.

Working with WeakSets

```js
let hiking = {categoy: 'Hiking'};
let myWeakSet = new WeakSet();

myWeakSet.add(hiking);
console.log(myWeakSet.has(hiking)); //true
```
**Summary**
- Data collections
- Intro to sets
- Adding/removing values
- Iterating sets
- Differences between Sets and WeakSets
- WeakSet

## 4. Creating and Using Maps

Introducing Maps

**Maps**: Map uses key-value pairs and keeps the original insertion order of the keys. Any value (objects and primitive values) may be used as either a key or a value.

We can use stings, numbers, functions, and objects for key. 

Adding and removing Values in a Map

```js
const monthlySales = new Map();
//add elements
monthlySales.set('sale1', 100);
monthlySales.set('sale2', 125);
console.log(monthlySales); //Map(2) {'sale1' => 100, 'sale2' => 125}

console.log(monthlySales.has('sale1')); //true
console.log(monthlySales.get('sale1')); //100

//remove element
monthlySales.delete('sale1');
console.log(monthlySales.has('sale1')); //false
```

Iterating through a Map

```js
const monthlySales = new Map();
monthlySales.set('sale1', 100);
monthlySales.set('sale2', 125);
monthlySales.set('sale3', 400);
monthlySales.set('sale4', 50);

console.log(monthlySales.keys()); //MapIterator {'sale1', 'sale2', 'sale3', 'sale4'}
monthlySales.forEach((key,value) => console.log(key + ' ' + value));
//100 sale1
//125 sale2
//400 sale3
//50 sale4

let total = 0;
for(let value of monthlySales.values()) {
    total += value;
}
console.log(total); //675
```

Difference Between Maps and Objects

Map:
- Faster searching
- Key, value pairs: We can use any data type for keys
- Keeps insertion order
- We create a Map with only one method

Understanding the Difference of Maps and WeakMaps

WeakMap
- Keys must be objects
- Objects are held "weakly"
- Not iterable
- Garbage collected
- Not enumerable

**Summary**
- Maps
- Add/remove values
- Iterate a map
- Maps vs, objects
- Maps vs. WeakMaps


## 5. Exploring Typed Arrays

**Typed Arrays**: Array-like objects that provide a mechanism for accessing raw binary data. Handles direct memory allocation.

Benefits
- Accessing raw binary data
- Faster performance
- Strictly controlled data
- APIs that support typed arrays

WebGL, Canvas, Web Sockets...

We can't directly use array buffer from JS file, we need to define a view with specific data type.
 
Array Buffer:16 bytes
- Uint8Array: 16 units
- UInt16Array: 8 units
- UInt32Array: 4 units
- Float64Array: 2 units  
Goes up to
- BigUInt64Array: size in bytes: 8

Standard Arrays vs. Typed Arrays


| Standard | Typed |
| :---: | :---: |
| Accept most data types | Restricted data types |
| Standard variable storage | Binary data |
| Standard processing | Faster processing |
|  | Once in view, acts like array |
|  | Native APIs |

Creating Typed Array Buffers

We cannot manipulate the buffer itself.
```js
let buffer = new ArrayBuffer(16); ///16 bytes
console.log(buffer.byteLength === 16) //true
```

Accessing Typed Arrays with Views

We need to pay attention to value boundaries.

```js
let buffer = new ArrayBuffer(16); ///16 bytes
console.log(buffer.byteLength === 16) //true
let view1 = new Int8Array(buffer); //we need to give a buffer

view1[0] = 32;
view1[5] = 1;
console.log(view1); //Int8Array(16) [32, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, buffer: ArrayBuffer(16), byteLength: 16, byteOffset: 0, length: 16]

let view2 = new DataView(buffer);
view2.setInt8(2, 43);
console.log(view1); //Int8Array(16) [32, 0, 43, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, buffer: ArrayBuffer(16), byteLength: 16, byteOffset: 0, length: 16]

let view3 = new DataView(buffer, 7, 3);
view3.setInt8(0, 11);
view3.setInt8(1, 11);
console.log(view1); //Int8Array(16) [32, 0, 43, 0, 0, 1, 0, 11, 11, 0, 0, 0, 0, 0, 0, 0, buffer: ArrayBuffer(16), byteLength: 16, byteOffset: 0, length: 16]
```

**Summary**
- Intro to typed arrays
- Typed arrays vs. standard arrays
- Creating array buffers
- Accessing typed arrays with views

