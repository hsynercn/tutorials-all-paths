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

We can define multiple event listeners for the same event.

```js
const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on('newSale', (data) => {
    console.log('There was a new sale');
});

myEmitter.on('newSale', () => {
    console.log('Customer name: Jonas');
});

myEmitter.on('newSale', (stock) => {
    console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit('newSale', 9);
```

After executing this file we will get:

```cmd
There was a new sale
Customer name: Jonas
There are now 9 items left in stock
```

Also we can follow a similar example with http a server:

```js
const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Request received');
    console.log(req.url);
    res.end('Request received');
});

server.on('request', (req, res) => {
    console.log('Another request!');
});

server.on('close', () => {
    console.log('Server closed');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests');
});
```

### 4.36. Introduction to Streams

Streams: Used to process (read and write) data piece by piece without completing the whole completing the whole read or write operation, and therefore without keeping all the data in memory.

- Readable streams: Used for read operations.
  - HTTP requests
  - fs read streams
- Writable streams: Used for write operations.
  - HTTP responses
  - fs write streams
- Duplex streams: Used for read and write operations.
  - net web socket
- Transform streams: Used to modify or transform the data as it is written or read.
  - zlib Gzip creation

### 4.37. Streams in Practice

We can start with a whole file read operation for the entire test file, but our test file is too large. Node process will go out of resources and fail.

```js
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //solution 1
    //the problem is that the file is read in the memory and then sent to the client
    //file is too big and the server will crash
    fs.readFile('test-file.txt', (err, data) => {
        if (err) console.log(err);
        res.end(data);
    });
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests');
});
```

We can try to use a readable stream. In this case there is a problem, we cannot send the data as fast as read speed. This will create back pressure.

```js
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //solution 2
    //this will create a readable stream
    //we can get the data chunk by chunk
    const readable = fs.createReadStream('test-file.txt');
    readable.on('data', (chunk) => {
        res.write(chunk);
    });
    readable.on('end', () => {
        res.end();
    });
    readable.on('error', (err) => {
        console.log(err);
        res.status = 500;
        res.end('File not found');
    });
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests');
});
```

As a best practice solution we can use the pipe operator. Below example will act as a duplex or transform stream. We can transfer the data in a balance between read and write speed, `readableSource.pipe(writableDestination)`.

```javascript
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //solution 3
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
    //readableSource.pipe(writableDestination); we can say this is a duplex or a transform stream

});

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests');
});
```

### 4.38. How Requiring Modules Really Works

- Each JavaScript file is treated as a module.
- Node uses CommonJS module system: require(), exports() or module.exports
- ES module system is used in browsers: import/export
- There have been attempts to bring ES modules to node.js

What happens when we call the require:

- Resolving and Loading
  - Core modules
  - Developer modules
  - 3rd-party modules
- Wrapping
  - Wraps the module in a IIFE(Immediately Invoked Function Expression) expression
  - Each module has its own scope
- Execution
- Returning exports
- Caching

Path resolving: How Node decides which module to load

1. Start with the core modules
2. If begins with './' or '../' tries to load developer module
3. In no file found tries to find folder with index.js in it
4. Else goes to node_modules and try to find module there

```js
(function exports, require, module, __filename, __dirname) {
  //module code
});
```

- require: function to require module
- module: reference to current module
- exports: a reference to module.exports, used to export object from a module
- __filename: absolute path of the current module's file
- __dirname: directory name of the current module

After wrapping the module code is executed.

Returning exports:

- require function returns exports of the required module
- module.exports is the returned object
- We can use module.exports to export one single variable: one class or one function (module.exports = Calculator)
- We can use module.exports to export multiple variables: (exports.add = (a+b) => a + b)

Caching: Modules are executed once, when we require same module we will receive a cached result.

### 4.39. Requiring Modules in Practice

If we expose the parameters of a IIFE module function:

module.js file:

```js
//contains all arguments of the function 
console.log(arguments);
```

We will receive this output:

```json
[Arguments] {
  '0': {},
  '1': [Function: require] {
    resolve: [Function: resolve] { paths: [Function: paths] },
    main: Module {
      ...
  },
  '2': Module {
    id: '.',
    path: '/Users/huseyincanercan/hobby_workspace/tutorials-all-paths/Udemy/Node.js, 
    ...
  },
  '3': '.../modules.js',
  '4': '.../starter'
}
```

First values is the exports, we are not exporting anything. Second values is require function. Third one is the module, number 3 and 4 are file and directory.

If we inspect the Node `module` module wrapper function:

```js
console.log(require('module').wrapper);
```

We will receive:

```bash
[
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});'
]
```

Creating a test module, test-module-1.js:

```js
class Calculator {
    add(a, b) {
        return a + b;
    }
    multiply(a, b) {
        return a * b;
    }
    divide(a, b) {
        return a / b;
    }
}

module.exports = Calculator;
```

alternatively:

```js
module.exports = class {
    add(a, b) {
        return a + b;
    }
    multiply(a, b) {
        return a * b;
    }
    divide(a, b) {
        return a / b;
    }
}
```

Using the module:

```js
//exported entity is a class, we use uppercase for class name
const Calculator = require('./test-module-1');
const calc1 = new Calculator();
console.log(calc1.add(1, 2));
```

Directly using the `exports`:

test-module-2.js file:

```js
exports.add = (a, b) => a + b;
exports.multiply = (a,b) => a*b;
exports.subtract = (a,b) => a-b;
exports.divide = (a,b) => a/b;
```

We can consume the second module by this way:

```js
//module exports
//for classes we use uppercase
const Calculator = require('./test-module-1');
const calc1 = new Calculator();
console.log(calc1.add(1, 2));

//exports
const calc2 = require('./test-module-2');
console.log(calc2.add(1, 2));
```

Commonly we use destructuring for module exports:

```js
//destructure
const {add, multiply, divide, subtract} = require('./test-module-2');
console.log(multiply(4, 2));
```

Caching mechanism example:

test-module-3.js file:

```js
console.log('Hello form the module');

module.exports = () => { 
    console.log('Log this text');
}
```

If we require same module multiple times:

```js
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
```

We will get this result, module is only loaded once:

```bash
Hello form the module
Log this text
Log this text
Log this text
```
