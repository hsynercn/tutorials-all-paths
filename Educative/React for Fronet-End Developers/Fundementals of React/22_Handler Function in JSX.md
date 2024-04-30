# Handler Function in JSX

In JSX, we can pass a function as a prop to a component. This function is called a handler function. It is used to handle events like `onClick`, `onChange`, etc.

```js
const App = () => {
  const handleChange = event => {
    console.log(event);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />

      <hr />

      <List />
    </div>
  );
};
```

A synthetic event is a wrapper around the browser's native event system. It provides consistent interface across different browsers for handling events in JavaScript. The synthetic event is essentially a wrapper around the browser's native event object.

In the code snippet event is a synthetic event defined by a JavaScript object. Through this object we can access the emitted value of the input.

