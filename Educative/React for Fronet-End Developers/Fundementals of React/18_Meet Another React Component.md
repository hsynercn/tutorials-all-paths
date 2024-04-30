# Meet Another React Component

We will create a list component to handle more complex tasks.

```js
const list = [ ... ];

function App() { ... }

function List() {
  return list.map(function(item) {
    return (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    );
  });
}
```

With this example, we can see how components that encapsulate meaningful tasks can work for larger React applications.


