# Named & Default Exports

We can add default keyword to a function or a class to export it as a default export. 

- to export and import a single functionality from a module
- to highlight the main functionality of the exported API of a module
- to have a fallback import functionality

Example:

myfile.js

```js
const robin = {
  firstname: 'Robin',
  lastname: 'Wieruch',
};

export default robin;
```

app.js

```js
import React from 'react';
import developer from './myfile.js';

export default class App extends React.Component {
  render() {
    return (
      <p>Hello, {developer.firstname}!</p>
    );
  }
}
```

