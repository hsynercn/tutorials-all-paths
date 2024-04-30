# React Component Definition Advanced

We can declare function in JS with different ways:

```js
// function declaration
function () { ... }

// arrow function declaration
const () => { ... }
```

We can remove the paranthesis if there is only one argument:

```js
// allowed
const item => { ... } 

// allowed
const (item) => { ... }

// not allowed
const item, index => { ... }

// allowed
const (item, index) => { ... }
```

If an arrow function doesn't do anything, but only returns something, we can remove the curly braces:

```js
count =>
  count + 1;
```

We can use same approach for React components:

```js
const App = () => (

  <div>
    ...
  </div>
);

const List = () =>
  list.map(item => (

    <div key={item.objectID}>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </div>

 ));
```
