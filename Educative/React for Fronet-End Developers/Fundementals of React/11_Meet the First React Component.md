# Meet the First React Component

We will start with a basic component.

```js
import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
```

In the above code snippet, we have created a simple component named `App`. It is a functional component. 

This component is a function that returns a JSX element. The JSX element is a `div` element containing an `h1` element with the text "Hello World".

This component is basically a JavaScript function.

Variables defined in the function body will be re-defined each time this function runs.

```js
import React from 'react';

function App() {

  const title = 'React'; 

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
```

JS variables declaration keywords:

- `var`: global scope
- `let`: block scope
- `const`: block scope, read-only
