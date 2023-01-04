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