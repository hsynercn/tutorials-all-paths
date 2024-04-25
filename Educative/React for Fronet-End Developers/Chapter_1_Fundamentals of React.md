# Fundamentals of React

## Entering React after learning JavaScript

React is a view only library, Model View Controller (MVC) is a design pattern that is used to separate the data from representation.

REact has a simple API and JS provides both functional and object-oriented programming paradigms.

Learning JS before React is beneficial, otherwise JS specific problems could be difficult to solve.

## Ternary Operator in React

 We cannot use an if-else statement directly in JSX, but you can return early from the rendering function. Returning null is valid in React when displaying nothing. Just like we did in the example given below.

```jsx
import React from 'react';

export default class App extends React.Component {
  render() {
    const users = [
      { name: 'Robin' },
      { name: 'Markus' },
    ];

    const showUsers = true;
    if (!showUsers) {
      return null;
    }

    return (
      <ul>
        {users.map(user => <li>{user.name}</li>)}
      </ul>
    );
  }
}
```

In other way we can use a ternary operator:

```jsx
import React from 'react';

export default class App extends React.Component {
  render() {
       const users = [
      { name: 'Robin' },
      { name: 'Markus' },
    ];
    const showUsers = true;
    return (
      <div>
        {
          showUsers ? (
            <ul>
              {users.map(user => <li>{user.name}</li>)}
            </ul>
          ) : (
            null
          )
        }
      </div>
    );
  }
}
```

Another method is using '&&' operator:

```jsx
import React from 'react';

export default class App extends React.Component {
  render() {
    const users = [
      { name: 'Robin' },
      { name: 'Markus' },
    ];
    const showUsers = true;
    return (
      <div>
        {
          showUsers && (
            <ul>
              {users.map(user => <li>{user.name}</li>)}
            </ul>
          )
        }
      </div>
    );
  }
}
```