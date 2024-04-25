# Ternary Operator in React

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