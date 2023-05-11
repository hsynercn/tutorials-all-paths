# pluralsight-js-path

## 1.JavaScript Promises and Async Programming

### 1.1. Course Overview

- Asynchronous programming
- Consuming & creating promises
- Using Aync/Await in JavaScript

You will know how to work with promise based libraries.

## 2. Understanding Promises

We can create nested flow like this for waiting data loads and solving race conditions. But this is not a fine implementation practice.
```js
export function callbacks () {
  let xhr = new XMLHttpRequest();
  let statuses = [];
  xhr.open("GET", "http://localhost:3000/orderStatuses");
  xhr.onload () => {
    statuses JSON.parse (xhr.responseText);
    let xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "http://localhost:3000/orders/1");
    xhr2.onload () => {
      const order = JSON.parse (xhr2. responseText);
      const description = statuses.map (t => {
        if (t.id === order.orderStatusId) {
          return t.description;
        }
      }) [0];
    setText (`Order Status: ${description}`);
    };
  };
}
```

Why Is the Pyramid Bad?

Callback Pyramid of Doom: A common problem that arises when a program uses many levels of nested indentation to control access to a function.
- Dirty code
- Error handling

```js
a("test", (err, aResult) => {
  b(aResult, (err, bResult) => {
    c(bResult, (err, cResult) => {
      d(cResult);
    });
  });
});
```

Solving the Callback Pyramid

Promise: Object that represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. Readable asynchronous code.

Promise States
- Pending
- Fulfilled
- Rejected

## 3. Consuming Promises

We are using the response data after the then.
```js
export function get() {
  axios.get("http://localhost:3000/orders/1")
  .then(({data})=> {
    setText(JSON.stringify(data));
  });
}
```

Handling Errors with Promises

```js
export function get() {
  axios.get("http://localhost:3000/orders/1")
  .then(({data})=> {
    setText(JSON.stringify(data));
  })
  .catch(err => setText(err));
}
```

Returning Promises
```js
axios.get("http://localhost:3000/orders/1").then(({data})=> {
  setText(JSON.stringfy(data));
  return "test";
})
.then(result => console.log(result));
```
After the response tendering with setText we will see "test" on the console, return will pass data to promise.

Catching Errors in a Chain

```js
export function chainCatch () {
  axios
    .get ("http://localhost:3000/orders/1")
    then (({ data }) => {
      return axios.get(
        `http://localhost:3000/addresses/${data.shippingAddress}`
      );
    })
    .then (({ data }) => {
      setText (`City: ${data my.city}`); You, a few seconds ago
    })
    .catch (err => setText (err));
}
```

Performing One Last Operation

```js
export function chainCatch () {
  axios
    .get ("http://localhost:3000/orders/1")
    then (({ data }) => {
      return axios.get(
        `http://localhost:3000/addresses/${data.shippingAddress}`
      );
    })
    .then (({ data }) => {
      setText (`City: ${data my.city}`); You, a few seconds ago
    })
    .catch (err => setText (err))
    .finally(() => {
      hideWaiting();
    })
}
```

## 4. Creating and Queuing Promises

A pending promise is a promise that has not yet settled.

```js
let wait = new Promise();//pending promise
```

If the associated promise has already been resolved, either to a value, a rejection, or another promise, this method [resolve] does nothing.

We can try to resolve same promise multiple times, but it will be ineffective. For this code sample if we don't clear the interval even for the next executions we are not going to see another **setText** execution.
```js
export function interval() {
  let counter = 0;
  let interval;
  const wait = new Promise ((resolve) => {
    interval = setInterval(() => {
      console.log("INTERVAL");
      resolve (`Timeout! ${++counter} `);
    }, 1500);
  });
  wait.then (text => setText (text))
  .finally (() => clearInterval(interval));
}
```

Rejecting a Promise

We can create custom rejection cases.
```js
export function xhr () {
  let request = new Promise ((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/users/7");
    xhr.onload () => {
      if (xhr.status === 200) {
        resolve (xhr.responseText);
      } else {
        reject (xhr.statusText);
      }
    }
    xhr.onerror () => reject ("Request Failed");
    xhr.send();
  });

  request.then (result => setText (result))
    .catch (reason => setText (reason));
}
```

Waiting for All Promises to Resolve

Even one fail will reject the whole promise set.
```js
export function allPromises () {
  let categories = axios.get ("http://localhost:3000/itemCategories");
  let statuses = axios.get ("http://localhost:3000/orderStatuses");
  let userTypes = axios.get ("http://localhost:3000/userTypes");

  //returned value array is same
  Promise.all([categories, statuses, userTypes])
    .then(([cat, stat, type]) => {
      setText("");
      appendText (JSON.stringify (cat.data));
      appendText (JSON.stringify (stat.data));
      appendText (JSON.stringify (type.data));
    });
}
```

Settling All Promises

We can wait all promises individually and still process rejected and fulfilled processes together.
```js
export function allSettled () {
  let categories = axios.get("http://localhost:3000/itemCategories");
  let statuses = axios.get ("http://localhost:3000/orderStatuses");
  let userTypes = axios.get ("http://localhost:3000/userTypes");
  let addressTypes = axios.get ("http://localhost:3000/addressTypes");

  Promise.allSettled ( [categories, statuses, userTypes, addressTypes])
  .then ((values) => {
    let results = values.map (v => {
    if(v.status === 'fulfilled') {
      return `FULFILLED: ${JSON.stringify (v.value.data[0])} `;
    }
    return `REJECTED: ${v.reason.message} `;
    });
    setText (results);
  }).catch (reasons => {
    setText (reasons);
  });
}
```

Racing Promises

We will pay attention to firt resolved promise by this way, this is a rare use case.
```js
export function race () {
  let users = axios.get ("http://localhost:3000/users");
  let backup = axios.get ("http://localhost:3001/users");
  Promise.race ([users, backup])
    then (users => setText (JSON.stringify (users.data)))
    .catch (reason => setText (reason));
}
```

Ways to Queue Promises
- all
- allSettled
- race

## 5. Iterating with Async/Await

Promises are older now. Async/Await is syntactic sugar does the some thing.

Return value is wrapped in a promise.
```js
const getNames = async () => {
  return [];
}
```

Await
- Must be used inside of async
- Only blocks current function

```js
export async function get() {
  const {data} = await axios.get("http://localhost:3000/orders/1");
}
```

Handling errors with async/await.
```js
export async function get() {
  try {
    const {data} = await axios.get("http://localhost:3000/orders/1");
  } catch (error) {
    console.log(error);
  }
}
```

Chaining Async/Await

```js
axios.get("orders/1")
  .then(({data}) => {
    return axios.get(`/addresses/${data.shippingAddress}`);
  })
  .then(({data}) => {
    console.log(data.city);
  })
```

Awaiting Concurrent Requests

```js
export async function concurrent () {
  const orderStatus = axios.get ("http://localhost:3000/orderStatuses")
  const orders = axios.get("http://localhost:3000/orders");

  const {data: statuses} = await orderStatus;
  const {data: order} = await orders;
}
```

Awaiting Parallel Calls

```js
await Promise.all([
  (async () => {
    const orderStatus = axios.get ("http://localhost:3000/orderStatuses")
  })(),
  (async () => {
    const orders = axios.get("http://localhost:3000/orders");
  })()
]);
```

**Summary**
- Pending
- Fulfilled
- Rejected