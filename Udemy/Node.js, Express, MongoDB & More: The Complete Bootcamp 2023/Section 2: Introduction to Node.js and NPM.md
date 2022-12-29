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
|Data streaming||
|Real-time chat application||

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

Underscore (_) represents previous result:

```js
> 3 * 8
24
> _+6
30
```

### 2.7. Using Modules 1: Core Modules

Sample JavaScript file, index.js:

```js
const hello = 'Hello world';
console.log(hello);
```

How to run the file:

```cmd
node index.js
```

On the node environment provides additional functionality with modules.
