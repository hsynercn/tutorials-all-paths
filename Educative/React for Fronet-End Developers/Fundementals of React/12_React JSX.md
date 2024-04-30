# React JSX

In React returned output of the App component resembles HTML, this output called JSX.

App.js

```js
import React from 'react';

const title = 'React';

function App() {
    return (
      <div>
          <h1> Hello {title} </h1>
      </div>
    );
}

export default App;
```

We can run the app with "npm start" command.

```js
import React from 'react';

function getTitle() {
    return title;
}

function App() {
  return (
    <div>
      <h1>Hello {getTitle('React')}</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  );
}

export default App;
```

Everything in curly braces in JSX can be used for JavaScript expressions.

JSX (JavaScript XML) is a syntax extension for JavaScript, it was initially invented for React.

Without any extra templating syntax, except for the curly braces, we can use JavaScript in HTML.

