# React Advanced State

This sample code makes heavy use of `useState`, `useReducer` hook provides more sophisticated state management.

A reducer function always receives state and action. Based on these two arguments, a reducer always returns a new state.

```js
const storiesReducer = (state, action) => {
  if (action.type === 'SET_STORIES') {
    return action.payload;
  } else {
    throw new Error();
  }
};
```

We an use the `useReducer` hook to manage state as an alternative to `useState`.

```js
const App = () => {
  ...

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    []
  );

  ...
};
```

Instead of setting state explicitly with the state updater function from useState, the useReducer state updater function dispatches an action for the reducer. The action comes with a type and an optional payload:

```js
const App = () => {
  ...

  React.useEffect(() => {
    setIsLoading(true);

    getAsyncStories()
      .then(result => {
        dispatchStories({
          type: 'SET_STORIES',
          payload: result.data.stories,
        });

        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  ...

  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );

    dispatchStories({
      type: 'SET_STORIES',
      payload: newStories,
    });
  };

  ...
};
```

We can do other state transitions in the reducer function as well. For example, we can remove a story from the list of stories:

```js
const App = () => {
  ...

  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  ...
};
```

