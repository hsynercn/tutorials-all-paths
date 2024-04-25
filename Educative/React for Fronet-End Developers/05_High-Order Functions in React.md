# High Order Functions in React

High Order Functions are functions that take other functions as arguments or return functions as their results.

Lets imagine a React component which uses filtering:

```jsx
import React from 'react';

const doFilter = query => user =>
   query === user.name;

export default class App extends React.Component {

  constructor(props){
    super(props);  
    
    this.state = {
    query: '',
    };
    
    this.onChange=this.onChange.bind(this);
  }
  
  onChange(event) {
    this.setState({ query: event.target.value });
  }
  
  render() {
  const users = [
      { name: 'Robin' },
      { name: 'Markus' },
    
    ];
    return (
      <div>
        <ul>
          { users
            .filter(doFilter(this.state.query))
            .map(myuser => <li>{myuser.name}</li>)
          }
        </ul>
        <input
          type="text"
          onChange={this.onChange}
        />
      </div>
    );
  }
}
```

In this example we can see that the `doFilter` function is a high order function, it takes a query and returns a function that takes a user and returns a boolean.

Extracting these functions into (higher-order) functions outside of a React component can be beneficial for testing React’s local state management in isolation as well.