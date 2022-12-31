# Node.js, Express, MongoDB & More: The Complete Bootcamp 2023

## 2. Section 2: Introduction to Node.js and NPM

### 2.4. Section Intro

First steps for Node.js.

### 2.5. What is Node.js and Why Use It?

Node.js is a JavaScript runtime built on Google's open source V8 JavaScript engine.

We are taking JavaScript out of the browser, Node.js is a container, runtime for JavaScript. V8 engine executes JavaScript.

We can use JavaScript on the server side of web development. By this way we can build fast, highly scalable network applications(backend).

Node.js Pros

- Single threaded, based on event driven, non-blocking I/O model
- Perfect for building fast and scalable data-intensive apps
- Companies like Netflix, Uber, Paypal started using node in prod
- JavaScript across the entire stack:faster and more efficient development
- NPM:huge library of open source packages for free
- Active developer community

| USE NODE.JS                                    | DON'T USE                                                      |
| ---------------------------------------------- | -------------------------------------------------------------- |
| API with database behind it (preferably NoSQL) | Applications with heavy server-side processing (CPU-intensive) |
| Data streaming                                 |                                                                |
| Real-time chat application                     |                                                                |

### 2.6. Running JavaScript Outside the Browser

Running JavaScript on terminal:

```cmd
node
> const name = 'test'
> name
'test'
> 7 + 5
12
> .exit
```

Underscore (\_) represents previous result:

```js
> 3 * 8
24
> _+6
30
```

### 2.7. Using Modules 1: Core Modules

Sample JavaScript file, index.js:

```js
const hello = "Hello world";
console.log(hello);
```

How to run the file:

```cmd
node index.js
```

On the node environment provides additional functionality with modules. We can access the [documentation](https://nodejs.org/docs/latest-v16.x/api/).

### 2.8. Reading and Writing Files

Using file operations:

```js
const fs = require("fs");

const textInput = fs.readFileSync("./txt/input.txt", "utf8");
console.log(textInput);

const textOut = `Information about avocado: ${textInput}\nCreated on ${Date.now()}`;

fs.writeFileSync("./txt/output.txt", textOut);
```

### 2.9. Blocking and Non-blocking: Asynchronous Nature of Node.js

Synchronous VS. Asynchronous (Blocking vs Non-Blocking)

Synchronous: blocking, execution waits until completion

```js
const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
console.log(input);
```

Asynchronous: non-blocking, we will provide a callback function for after operation

```js
const fs = require("fs");

const input = fs.readFile("input.txt", "utf8", (err, data) => {
  console.log(data);
});
console.log("Reading the file");
```

Node.js has single thread where our code is executed, only one. On this case when we execute a synchronous time consuming process it will block the other operations. It is better to use asynchronous implementation for time consuming operations like I/O operations, Node.js will wait until the result finalization and execute the addressed callback for these type of operations.

- Node.js has a non-blocking I/O model
- This is why we use so many callback functions in Node.js

Note: Not all callbacks are asynchronous.

Callback Hell: Asynchronous implementation could result in callback hell, left pyramid on the sample code represents this behavior.

```js
const fs = require("fs");
fs.readFile("start.txt", "utf-8", (err, datal) => {
  fs.readFile(`${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile("append.txt", "utf-8", (err, data3) => {
      fs.writeFile("final.txt", `${data2} ${data3}`, "utf-8", (err) => {
        if (err) throw err;
        console.log("Your file has been saved :D");
      });
    });
  });
});
```

We could avoid this problem by using the **Promises** or **Async/Await**.

### 2.10. Reading and Writing Files Asynchronously

```js
//Callback hell example
//err, data parameter pattern is common on Node.js
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file was successfully written");
      });
    });
  });
});
console.log("Will read the file");
```

### 2.11. Creating a Simple Web Server

We can user http module to create a simple web server. With the handler method we can see the details of request.

```js
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
  res.end("Hello from the server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
```

### 2.12. Routing

We can create a simple routing mechanism with a switch case statement. For error message we can return 404 and a error HTML.

```js
const http = require("http");

const server = http.createServer((req, res) => {
  const pathName = req.url;

  switch (pathName) {
    case "/":
    case "/overview":
      res.end("This is overview");
      break;
    case "/product":
      res.end("This is product");
      break;
    case "/api":
      break;
    default:
      res.writeHead(404, {
        "Content-Type": "text/html",
        "my-own-header": "myOwnHeader",
      });
      res.end("<h1>Page not found</h1>");
      break;
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
```

### 2.13. Building a (Very) Simple API

In Node.js '.' represents the current directory, if we execute the node command somewhere else it will represent another directory.

```js
fs.readFile("./dev-data/data.json", (err, data) => {
  if (err) throw err;
  res.end(data.toString());
});
```

We can use this expression for better implementation. '__dirname' points the current file location.

```js
fs.readFile(`${__dirname}/dev-data/data.json` , (err, data) => ...
```
