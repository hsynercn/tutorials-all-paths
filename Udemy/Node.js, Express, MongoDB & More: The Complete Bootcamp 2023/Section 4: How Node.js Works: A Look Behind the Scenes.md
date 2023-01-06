# Node.js, Express, MongoDB & More: The Complete Bootcamp 2023

## 4. Section 4: How Node.js Works: A Look Behind the Scenes

### 4.29. Section Intro

Node.js architecture overview, events and event loops, streams.

### 4.30. Node, V8 and Libuv and C++

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. V8 engine converts JavaScript code to machine code. Libuv is a C++ library that provides asynchronous I/O operations, it gives access to the file system, network, and other system operations.

Event loop is a loop that processes events. It is a queue of callbacks. Thread pool is a pool of threads that execute tasks. It is used for I/O operations.

### 4.31. Processes, Threads and the Thread Pool

Node.js is basically a C++ program.

Node.js is a single-threaded application, but it can support concurrency via the concept of event and callbacks.

Node.js initializes the program, executes the top-level code, required modules. Registers the event callbacks. Enters the event loop.

Thread pool is a pool of threads that execute tasks. It is used for I/O operations. They offload the heavy work.

### 4.32. The Node.js Event Loop

The hearth of the Node.js is the event loop. All the application code inside callback functions (non-top-level code) is executed by the event loop.

Node.js is build around callback functions.

Node.js has a event driven architecture:

- Events are emitted
- Event loops picks them up
- Callbacks are called

Event loop does orchestration, it is responsible for executing the callbacks.

Event loops stages:

- Expired timer callbacks
- I/O polling and callbacks
- setImmediate callbacks
- Close callbacks

All pending timers or I/O operations are checked. If there are any, the event loop will wait for them to complete. If there are no pending timers or I/O operations, the event loop will terminate. On web service example event loop will never terminate, and wait for new requests.

Event loop makes Node.js asynchronous and non-blocking. We need to be careful with the blocking code, because it will block the event loop. It will effect the performance of the whole application.

Don't block:

- Don't use sync version of the fs, crypto, zlib modules in your callback functions.
- Don't perform complex calculations in your callback functions.
- Be careful with JSON in large objects.
- Don't use too complex regular expressions.

### 4.33. The Event Loop in Practice

event-loop.js:

```js
const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("--------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});

console.log("Hello from the top-level code");
```

If we execute this code, we will get:

```cmd
>node event-loop.js
Hello from the top-level code
Timer 1 finished
Immediate 1 finished
I/O finished
--------------
Process.nextTick
Immediate 2 finished
Timer 2 finished
858 Password encrypted
859 Password encrypted
864 Password encrypted
Timer 3 finished
```

`Hello from the top-level code` is the top level code, it is executed first.

`process.nextTick` and `setImmediate` allows the user to schedule callbacks in the event loop. `process.nextTick()` is processed after every phase of the event loop and `setImmediate()`is only processed on the check handler phase of the event loop.

Names of both functions are confusing. `precess.nextTick()` fires immediately on the same phase, `setImmediate()` fires on the following iteration or 'tick' of the event loop.

### 4.34. Events and Event-Driven Architecture

Observer pattern: Defines an object (called subject), which can notify a set of observers (or listeners), when a change in its state happens.

Event emitter => Event listener => Attached callback function

Emitter: New request on server 127.0.0.1:8000

Listener:

```js
const server = http.createServer();
server.on("request", (req, res) => {
  console.log("request received");
  res.end("Request received");
});
```

### 4.35. Events in Practice

