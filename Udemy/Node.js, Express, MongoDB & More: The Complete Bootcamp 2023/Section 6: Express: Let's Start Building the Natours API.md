# Node.js, Express, MongoDB & More: The Complete Bootcamp 2023

## 6. Section 6: Express: Let's Start Building the Natours API

### 6.47. Section Intro

We will start building with Express, most popular Node framework. It makes development easier.

### 6.48. The Problem with Callbacks: Callback Hell

Express is built on the Node.js, it is the most popular framework.

- Express isa minimal Node.js framework, a higher level of abstraction.
- Express contains a very robust set of features: complex routing, easier handling of requests and responses, middleware, server-side rendering, etc.
- Express allows for rapid development of Node applications, we don't have to re-invent the wheel.
- Express makes it easier to organize our applications into the MCV architecture

### 6.49. Installing Postman

We can use Postman for API testing, it simplifies API development. We can download it from [here](https://www.postman.com/).

We can test the dog API with Postman, we can test the random image API endpoint with GET requests.

### 6.50. Setting up Express and Basic Routing

We will execute `npm init` and create a project. We will install Express and Nodemon.

After that we can create simple app.js file:

```javascript
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello from the server side');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

We can see the response from Postman if we submit a GET request to localhost:3000.

