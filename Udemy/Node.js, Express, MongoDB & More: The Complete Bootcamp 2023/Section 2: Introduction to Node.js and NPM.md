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

We can use this expression for better implementation. '\_\_dirname' points the current file location.

```js
fs.readFile(`${__dirname}/dev-data/data.json` , (err, data) => ...
```

We can cache the file content on a local variable to avoid reading the file for every request.

```js
const http = require("http");
const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

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
      //fs.readFile('./dev-data/data.json' , (err, data) => {
      //fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
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

### 2.14. HTML Templating: Building the Templates

We cam create placeholder strings to render populated data on the page.

```html
<div class="card__emoji">{%IMAGE%}{%IMAGE%}</div>
<div class="card__title-box">
    <h2 class="card__title">{%PRODUCTNAME%}</h2>
</div>
```

### 2.15. HTML Templating: Filling the Templates

We have created placeholder strings on the page HTML with specific keywords. At this point we can fill them with data from the JSON file or any other object.

At the first step we need to read template HTML files and data from the JSON file. We shouldn't read these files continuously for every request. Instead we should use the cached data.

We can create a replace method to replace placeholder strings with data from the JSON file, 'replaceTemplate' method uses regex patterns to find placeholder strings globally on the template HTMLs. We replace the placeholder string with product property.

Also we need add app products, for this case we are creating a card list string with join method and replacing the placeholder string on the overview template.

```js const http = require("http");
const fs = require("fs");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

//initialize the replaceTemplate method
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%ORGANIC%}/g, "not-organic");
  }
  return output;
};

const server = http.createServer((req, res) => {
  const pathName = req.url;

  switch (pathName) {
    case "/":
    case "/overview":
      res.writeHead(200, { "Content-Type": "text/html" });
      const cardsHtml = dataObj
        .map((el) => replaceTemplate(tempCard, el))
        .join("");
      const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
      res.end(output);
      break;
    case "/product":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(tempProduct);
      break;
    case "/api":
      const productData = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
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

### 2.16. Parsing Variables from URLs

On the Node.js we can parse variables from URL. At this point we can extract the product variable and render the product page with corresponding data.

```javascript
const http = require("http");
const fs = require("fs");
const url = require("url");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

//initialize the replaceTemplate method
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%ORGANIC%}/g, "not-organic");
  }
  return output;
};

const server = http.createServer((req, res) => {
  //we can use the Node URL module to access query parameters
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
    case "/":
    case "/overview":
      res.writeHead(200, { "Content-Type": "text/html" });
      const cardsHtml = dataObj
        .map((el) => replaceTemplate(tempCard, el))
        .join("");
      const overviewOutput = tempOverview.replace(
        /{%PRODUCT_CARDS%}/g,
        cardsHtml
      );
      res.end(overviewOutput);
      break;
    case "/product":
      res.writeHead(200, { "Content-Type": "text/html" });
      const product = dataObj[query.id];
      const productOutput = replaceTemplate(tempProduct, product);
      res.end(productOutput);
      break;
    case "/api":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
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

### 2.17. Using Modules 2: Our Own Modules

On the Node.js environment each file can act as a module and we can export and import variables and methods from one file to another. We can create a module file and export the replaceTemplate method and import it in the server file.

replaceTemplate.js: We can extract the replaceTemplate method.

```javascript
module.exports = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%ORGANIC%}/g, "not-organic");
  }
  return output;
};
```

On the consumer side we can import the replaceTemplate method.

```javascript
const replaceTemplate = require('./modules/replaceTemplate');
```

### 2.18. Introduction to NPM and package.json File

npm automatically comes with the Node.js, we install and manage open source packages. Package repository [npmjs](https://www.npmjs.com/).

We can create a package.json file by running the following command.

```bash
npm init
```

This command will create a package.json file with the default values. We can change the default values by answering the questions.

### 2.19. Types of Packages and Installs

There are two types of packages.

- **Dependencies**: Packages that our project depends on to run.
- **Dev Dependencies**: Packages that our project depends on to develop.

We are going to use slugify as a dependency.

```bash
npm install slugify
```

After executing the install command we can see the slugify package in the package.json file.

```json
{
  "name": "node-farm",
  "version": "1.0.0",
  "description": "Learn node.js",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Huseyin Can Ercan",
  "license": "ISC",
  "dependencies": {
    "slugify": "^1.6.5"
  }
}
```

Development dependencies are tools for development testing, code bundling, etc. We are going to use nodemon as a development dependency.

```bash
npm install nodemon --save-dev
```

This command will create the dev dependency section.

```json
{
  "name": "node-farm",
  "version": "1.0.0",
  "description": "Learn node.js",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Huseyin Can Ercan",
  "license": "ISC",
  "dependencies": {
    "slugify": "^1.6.5"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

Also we can install packages globally, for some common packages it will prevent us from installing the same package in multiple projects.

```bash
npm install -g nodemon
```

Previously we stared the Node application by running the following command.

```bash
node index.js
```

But with nodemon we can start the application by running the following command.

```bash
nodemon index.js
```

We need to add the start script to the package.json file.

```json
{
  "name": "node-farm",
  "version": "1.0.0",
  "description": "Learn node.js",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index_server.js"
  },
  "author": "Huseyin Can Ercan",
  "license": "ISC",
  "dependencies": {
    "slugify": "^1.6.5"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

When we run the following command, nodemon will start the application.

```bash
npm start
```
