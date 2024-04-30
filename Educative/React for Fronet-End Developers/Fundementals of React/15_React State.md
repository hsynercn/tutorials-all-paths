# React State

React state is used to make applications interactive.

There is a utility function called `useState` that is used to manage state. The `useState` function is a hook that allows you to add state to functional components. There are other hooks as well.

```js
const App = () => {
  const stories = [ ... ];

  const [searchTerm, setSearchTerm] = React.useState('');

  ...
};
```

`useState` hook takes an initial state as an argument. In the above example, the initial state is an empty string.

Function will return an array with two values, he first value is the current state value, and the second value is a function that allows you to update the state.

