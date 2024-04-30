# React Impossible States

In some cases data belongs to same concept but separates with different `useState` hooks. This can lead to impossible states.

The impossible state happens when an error occurs for the asynchronous data fetching. The state for the error is set, but the state for the loading indicator isn't revoked. In the UI, this would lead to an infinite loading indicator.

We can improve our code by moving states that belong together from multiple `useState` and `useReducer` hooks into a single `useReducer` hook.

```js
const App = () => {
  ...

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    []
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  ...
};
```

We can merge them to one `useReducer` hook.

```js
const App = () => {
  ...

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  ...
};
```

Async data fetching can use the reducer.

```js
const App = () => {
  ...

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  React.useEffect(() => {

    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    getAsyncStories()
      .then(result => {
        dispatchStories({

          type: 'STORIES_FETCH_SUCCESS',

          payload: result.data.stories,
        });
      })
      .catch(() =>

        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })

      );
  }, []);

  ...
};
```

The reducer function can handle the state transitions.

```js
const storiesReducer = (state, action) => {
  switch (action.type) {

    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          story => action.payload.objectID !== story.objectID
        ),
      };

    default:
      throw new Error();
  }
};
```

With this implementation we moved unreliable state transitions with multiple `useState` hooks to predictable state transitions with a single `useReducer` hook.Still we didn't get fully rid of impossible states, because it's still possible to leave out a crucial boolean flag before, but we moved one step closer towards more predictable state management.

