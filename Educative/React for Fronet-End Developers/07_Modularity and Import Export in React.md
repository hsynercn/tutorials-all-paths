# Modularity and Import Export in React

It is always recommended to define only one class per file to make it strongly cohesive. These files are basically modules. In React, we can import and export modules using the `import` and `export` keywords.

Example:

myfile.js

```js
const firstname = 'Robin';
const lastname = 'Wieruch';

export { firstname, lastname };
```

app.js

```js
import React from 'react';
import { firstname, lastname } from './myfile';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{firstname} {lastname}</h1>
      </div>
    );
  }
}
```

