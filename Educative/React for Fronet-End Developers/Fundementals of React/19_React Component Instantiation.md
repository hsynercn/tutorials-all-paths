# React Component Instantiation

Classes are most often used in object-oriented programming languages. JavaScript, always flexible in its programming paradigms, allows functional programming and object-oriented programming to co-exist side-by-side.

```js
class Developer {
   constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName() {
    return this.firstName + ' ' + this.lastName;
  } 
}
```

After defining the Developer class we can instantiate an instance:

```js
// class instantiation
const robin = new Developer('Robin', 'Wieruch');

console.log(robin.getName());
// "Robin Wieruch"
```

Once we’ve defined a component, we can use it like an HTML element anywhere in our JSX. The element produces an instance of your component, or in other words, the component gets instantiated. It’s not much different from a JavaScript class definition and usage.

```js
// definition of List component
function List() {
    // class instantiation
    const robin = new Developer('Robin', 'Wieruch');

    // another class instantiation
    const dennis = new Developer('Dennis', 'Wieruch');

    return (
      <div>
        {robin.getName()};
        {dennis.getName()};

      </div>
    );
}
```