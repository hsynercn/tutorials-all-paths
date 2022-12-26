# pluralsight-js-path

## 1. JavaScript Generators and Iterators

### 1.1. Course Overview

- Create a custom iterator
- Old and new built-in iterators
- Pause and continue function execution with generator functions
- Simplifying asynchronous logic

## 2. Iterator and Iterable

New ES2015 data structure: Maps, Sets, WeakMaps, WeakSets

Loops: For and foreach iterate over each element in an array.

In a standard loop we can exit the loop with break but restarting the iteration is not easy.

```js
for(let i = 0: i < 10: i++) {
    if(i > 2) break;
    console.log(i * 2);
}

[1,2,3,4,5,6].forEach(value =>{
    if(i > 2) break;
    console.log(i * 2);
}):
```

An iterator lets you iterate through a collection's contents one at a time, pausing at each item.

Module Overview

- Differences with loops
- What is an iterable
- Utilizing built-in iterables
- Custom iterators

**Iterator**: An iterator is any object that implements the iterator protocol by having a **next()** method that returns a value property and a done(boolean) property.

```js
function myIterator(start, finish) {
  let index = start;
  let count = 0;
  return {
    next() {
      let result;
      if (index < finish) {
        let result = { value: index, done: false };
        index += 1;
        count++;
        return result;
      }
      return {
        value: count,
        done: true,
      };
    },
  };
}

const it = myIterator(0, 5);
let res = it.next();
while (!res.done) {
  console.log(res.value);
  res = it.next();
}
//0
//1
//2
//3
//4
```

We can breakup the execution with a more manaable method.

Iterators and Iterable

What is an Iterable?

An object that allows iteration of itself.

- An array is a built-in iterable
- There are other built-in iterables (strings, maps, and sets)
- Iterables implement the @@iterator method, must have a property with a Symbol.iterator key
- Symbol.iterator is a well-known symbol in JavaScript it specifies the default iterator for an object

for..of loops:

- This type of loop only works with iterable objects
- Do not confuse this with a for..in loop
- for..of loop iterates over VALUES, for..in loops iterates over ENUMERABLE PROPERTIES like object keys

```js
for (const value of [1, 2, 3, 4, 5]) {
  console.log(value);
}
```

```js
const arr = [1, 2, 3];
const it = arr[Symbol.iterator]();
console.log(it.next()); //{value: 1, done: false}
console.log(it.next()); //{value: 2, done: false}
console.log(it.next()); //{value: 3, done: false}
console.log(it.next()); //{value: undefined, done: true}
```

For/of loops are using the Symbol.iterator method under the hood and returning the next call on each iteration.

```js
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");
const mapIterator = map[Symbol.iterator]();
console.log(mapIterator.next().value); //['key1', 'value1']
console.log(mapIterator.next().value); //['key2', 'value2']

for (const [key, value] of map) {
  console.log(key + " " + value);
}
//key1 value1
//key2 value2
```

```js
const mySet = new Set();
mySet.add("1");
mySet.add("2");
const setIterator = mySet[Symbol.iterator]();
console.log(setIterator.next()); //{value: '1', done: false}
console.log(setIterator.next()); //{value: '2', done: false}
console.log(setIterator.next()); //{value: undefined, done: true}

for (const value of mySet) {
  console.log(value);
}
//1
//2
```

Iterating through JSON Data

```js
let data = {
  food: [
    {
      id: 1,
      name: "apple",
      calories: 88,
      dietary_preferences: ["vegan"],
      servingSize: 6,
      servingSizeUnits: "oz",
    },
    {
      id: 1,
      name: "chicken",
      calories: 125,
      dietary_preferences: ["keto"],
      servingSize: 3,
      servingSizeUnits: "oz",
    },
    {
      id: 1,
      name: "milk",
      calories: 240,
      dietary_preferences: ["keto"],
      servingSize: 8,
      servingSizeUnits: "oz",
    },
  ],
  users: {
    id: 1,
    firstName: "Bill",
    lastName: "Kill",
    email: "asd@asd.com",
  },
};
const it = data.food[Symbol.iterator]();
let position = it.next();
while (!position.done) {
  console.log(position.value);
  position = it.next();
}
//{id: 1, name: 'apple', calories: 88, servingSize: 6, servingSizeUnits: 'oz'}
//{id: 1, name: 'chicken', calories: 125, servingSize: 3, servingSizeUnits: 'oz'}
//{id: 1, name: 'milk', calories: 240, servingSize: 8, servingSizeUnits: 'oz'}
```

Iterable Object:

- It can be enumerated with a for..of loop
- It adheres to the iterator protocol
- It returns an object with an object that has a value and done property

Custom iterators can return extra data.

Custom Iterators

```js
let idx = 0;
const veganOnly = data.filter((food) => {
  return food.dietary_preferences.includes("vegan");
});
const veganIterable = {
  [Symbol.iterator]() {
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const current = veganOnly[idx];
        idx++;
        if (current) {
          return { value: current, done: false };
        } else {
          return { value: current, done: true };
        }
      },
    };
  },
};
```

Iterator result interface:

- property: done, boolean, **required**
- property: value, anything if value is undefined, may be absent
- property: next, function, **required**
- property: throw, method, optional
- property: return, method, optional

This tutorial is shitty, so I didn't take extra notes.

**Summary**

- Defined iterables and iterators
- Built in iterables
- Creating custom iterators
- Custom iteration of functions
- Implemented optional methods on custom iterator

## 3. Generator Functions

Intro

- Generator functions
- The 'Yield' keyword
- What is yield delegation?
- Early completion of a generator
- Generator error handling

**Generator Function**: A function that can be paused and resumed at a later time, while having ability to pass values to and from the function at each pause point.

- Generators are functions that can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances.

Syntax of a generator function:Add a asterix between keyword and function

```js
function* gen(){...}
function *gen(){...}
function * gen(){...}
const obj = {
    *gen(params){...}
}
```

Executing the generator function alone **does not execute** its containing code.

```js
//we put an asterisk before the function name
function* timeStampGenerator() {
  console.log(Date.now());
}

timeStampGenerator(); //executing generator function does not execute function itself
const it = timeStampGenerator(); //returns an iterator
it.next();
```

**Yield:** Yield keyword signals the pause point of a generator function until next call.

```js
function* timeStampGenerator() {
  console.log("execution start");
  yield;
  console.log("execution continued");
}
const it = timeStampGenerator();
it.next(); //prints execution start
it.next(); //prints execution continued
```

```js
function* timestampGenerator() {
  var ts = Date.now();
  console.log("original ts: ", ts);
  yield ts;
  console.log("boo");
  var additionalTime = yield;
  console.log("additionalTime: ", additionalTime);
  if (additionalTime) {
    ts = ts + additionalTime;
  }
  console.log("updated ts: ", ts);
}
const it = timestampGenerator();

const originalTimestamp = it.next(); //original ts:  1671886716547
//{value: 1671886716547, done: false}

it.next(); //boo

it.next(1000 * 60); //additionalTime:  60000
//updated ts:  1671886776547
```

Yield Delegation
Yield delegation essentially allows a host generator function to control the iteration of a different generator function.

In a generator function yield keyword is used to pause execution, and send values back to iterator.

```js
function* gen1() {
  yield 1;
  yield 2;
  return 4;
}
function* gen2() {
  const val = yield* gen1();
  yield 3;
  yield val;
}

const it = gen2();
console.log(it.next()); //{value: 1, done: false}
console.log(it.next()); //{value: 2, done: false}
console.log(it.next()); //{value: 3, done: false}
console.log(it.next()); //{value: 4, done: false}
```

```js
function* gen1() {
  return ["three", "six", "nine"];
}
function* gen2() {
  const val = yield* gen1();
}

const it = gen2();
console.log(it.next()); //{value: "three", done: false}
console.log(it.next()); //{value: "six", done: false}
console.log(it.next()); //{value: "nine", done: false}
```

Possible Yield Actions

- Send a value to the iterator
  - yield 'goes to iterator'
- Receive a value from the iterator
  - const x = yield;
  - it.next('value for x')//=> x is now 'value for x'

Error Handling and Early Completion

iterator.return: The return method ends a generator functions execution

iterator.throw: The throw method will end a generator functions execution while also throwing an exception that cam be handled by the generator.

```js
function* errorHandling() {
    try {
        yield 1;
        throw ('this is another error');
        yield 2;
        yield 3;
    } catch (error) {
        console.error(error)
    }
}
const errorIt = errorHandling();
console.log(errorIt.next());//{value: 1, done: false}
console.log(errorIt.next());//{value: undefined, done: true}
```

**Summary**
- Generator functions return iterators
- The 'yield' keyword
- Yield delegation (yield*)
- Early completion of generator
- Error handling

## 4. Real-world Examples and Cancelable Async Flows(CAF)

CAF: Cancelable Asyns Flow, makes generator functions work like async functions. Gives the ability to externally cancel an async request.

```js
function delay(ms) {
    return new Promise( function c(res){
        setTimeout( res, ms );
    });
}
var token = new CAF.cancelToken();
var main = CAF(function *main(signal,ms){
    yield delay(ms);
    console.log("All done!");
});
main( token.signal, 100);
// only wait 5 seconds for the request!
delay(5000).then( function on Elapsed(){
    token.abort( "Request took too long!" );
});
```

**Summary**
- Using generator functions for async flows
- CAF.cancelToken()
- CAF.delay()
- CAF.timeout()