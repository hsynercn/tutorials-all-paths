# Arrow Functions in React

Arrow Functions are a more concise way of writing a function in JavaScript.

```js
// JavaScript ES5 function
function getGreetingFunc() {
  return 'Welcome to JavaScript';
}

// JavaScript ES6 arrow function with body
const getGreetingArrow1 = () => {
  return 'Welcome to JavaScript';
}

// JavaScript ES6 arrow function without body and implicit return
const getGreetingArrow2 = () =>
  'Welcome to JavaScript';
```

Arrow function are concise and easy to read, they are also useful in React.

```jsx
const students = [
  { ID: 1, present: true},
  { ID: 2, present: true},
  { ID: 3, present: false}, 
];

const presentStudents = students.filter(student => student.present);

const square = (n) => n*n
```