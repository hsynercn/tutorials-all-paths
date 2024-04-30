# React DOM

We are using App component in our application from the start, in the src/index.js file:

```js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

We are using `react-dom`, `ReactDOM.render()` function uses an HTML node to replace it with JSX. This method integrates React into HTML.

It expects 2 arguments:

- First one is to render JSX, it creates an instance of App component. We can directly pass simple JSX without any component instantiation.

- Second argument specifies the where React application enters your HTML. It expects an element with an `id="root"`.

