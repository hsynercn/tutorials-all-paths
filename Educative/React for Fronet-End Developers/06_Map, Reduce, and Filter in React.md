# Map, Reduce & Filter in React

We can render a single element with this way:

```jsx
import React from 'react';

export default class App extends React.Component {
  render() {
    var user = { name: 'Robin' };
    return (
      <div>
        <h1>{user.name}</h1>
      </div>
    );
  }
}
```

We can use JS to render multiple elements:

```jsx
import React from 'react';

export default class App extends React.Component {
  render() {
    var users = [
      { name: 'Robin' },
      { name: 'Markus' },
    ];

    return (
      <ul>
        {users.map(function (user) {
          return <li>{user.name}</li>;
        })}
      </ul>
    );
  }
}
```

Map method creates a new array with the results of calling a user written function on every element in the calling array.

We can use arrow function:

```jsx
import React from 'react';

export default class App extends React.Component {
  render() {
    var users = [
      { name: 'Robin' },
      { name: 'Markus' },
    ];

    return (
      <ul>
        {users.map(user => <li>{user.name}</li>)}
      </ul>
    );
  }
}
```

We can apply a filter to the map:

```jsx
import React from 'react';

export default class App extends React.Component {
  render() {
    var users = [
      { name: 'Robin', isDeveloper: true },
      { name: 'Markus', isDeveloper: false },
      { name: 'John', isDeveloper: true },
    ];

    return (
      <ul>
        {users
          .filter(user => user.isDeveloper)
          .map(user => <li>{user.name}</li>)
        }
      </ul>
    );
  }
}
```