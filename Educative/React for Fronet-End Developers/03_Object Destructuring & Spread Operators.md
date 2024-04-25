# Object Destructuring & Spread Operators

Object destructuring is a way to extract properties from an object and assign them to variables. It is a shorthand syntax that allows you to extract multiple properties from an object.

Otherwise we need to assign each property to a variable separately.

```js
const student = {
  ID: '21',
  name: 'Jhon',
  GPA: '3.0',
};

const {ID, name, GPA} = student;
```

We can rename the variables while destructuring:

```js
const student = {
  ID: '21',
  name: 'Jhon',
  GPA: '3.0',
};

const {name: studentName} = student;
```

We can use destructuring for stateless components:

```jsx
function Greeting({ greeting }) {
  return <h1>{greeting}</h1>;
}
```

Rest destructuring, it is often used for splitting out a part of an object, but keeping the remaining properties in another object.

```js
const student = {
  ID: '21',
  name: 'Jhon',
  GPA: '3.0',
};

const {ID, ...rest} = student;
```

Spread operator spreads the contents of an array into its elements which makes operations like concatenation easier.

```js
a = [1,2,3];
b = [4,5,6];
c = [...a, ...b]; //spread operator
console.log("c: " + c);
```

Some use cases for spread operator:

- Adding elements to an array: `const newArray = [...oldArray, newElement, ...anotherArray];`
- Array cloning: `const cloneArray = [...oldArray];`
- Merging objects: `const newObject = {...oldObject, newProperty: value};`