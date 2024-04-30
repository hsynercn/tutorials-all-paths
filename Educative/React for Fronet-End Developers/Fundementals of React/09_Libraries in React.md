# Libraries in React

React is only the view layer for your application.

There is some internal state management offered by React, but apart from this, it is only a component library which renders HTML for your browser. Everything else can be added from APIs, libraries, or frameworks.

We can fetch data with native API calls or we can use Axios.

```js
import React from 'react';
const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title: 'Hello!',
    };
  }

 componentDidMount() {
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ title: data.hits[0].title }));
  }

 render() {
    return (
      <h1> {this.state.title} </h1>
    );
  }
}
```

As an alternative we can use Axios.

```js
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    axios.get('https://api.mydomain.com')
      .then(data => this.setState({ data }));
  }

  render() {
    // JSX
  }
}

export default App;
```

In summary React is a simple tool for development, it could be integrated with other libraries and frameworks to build a complete application.

