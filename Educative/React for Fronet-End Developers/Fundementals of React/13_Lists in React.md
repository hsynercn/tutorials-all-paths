# Lists in React

We can use list data structures in React to render multiple elements. We can use the map function to iterate over the list and render each element.

```js
import React from 'react';

const list = [
  {
    title: 'React',
  },
  {
    title: 'Redux',
  },
];


function App() {
  return (
    <div>
      ...
      <hr />
      {list.map(function(item) {
        return <div>{item.title}</div>;
      })}
    </div>
  );
}

export default App;
```

React will display each item now, but you can still improve your code so React handles advanced dynamic lists more gracefully. By assigning a key attribute to each list item’s element, React can identify modified items if the list changes.

```js
import React from 'react';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];


function App() {
  return (
    <div>
    ...
    <hr />
      {list.map(function(item) {
      return (
        <div key={item.objectID}>
                  {item.title}
        </div>
      );
      })}
    </div>
    );
}

export default App;
```

