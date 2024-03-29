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
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello from the server side");
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

We can see the response from Postman if we submit a GET request to localhost:3000.

### 6.51. APIs and RESTful API Design

API: Application Programming Interface, a piece of software that can be used by another piece of software, in order to allow applications to talk to each other.

- Web APIs
- Node.js fs or http APIs
- Browser's DOM JavaScript API
- With object oriented programming when exposing methods to the public, we are creating an API

API has a wider definition.

We will focus on the web API part.

REST Architecture:

- Separate API into logical resources
- Expose structured resource-based URLs
- Use HTTP methods (verbs)
- Send data as JSON (usually)
- Be stateless

Resource: Object or representation of something, which has data associated to it. Any information can be named can be a resource.

Important: Endpoints should contain only resources (nouns) and should use HTTP methods for actions.

Bad Practice:

<https://www.natours.com/addNewTour>

- /getTour
- /updateTour
- /deleteTour
- /getTourByUser
- /deleteTourByUser

Better implementation, CRUD operations:

READ:

- GET /tours
- GET /tours/7 > with tour id

CREATE:

- POST /tours

UPDATE:

- PUT /tour > client sends the whole updated object
- PATCH /tour > client sends the updated parts of the object

DELETE:

- DELETE /tour/7

We needs authentication for these type operations.

We can map HTTP methods to CRUD operations.

JSON: JavaScript Object Notation, it is the common way to transfer data.

We will use JSend, JSend is a specification that lays down some rules for how JSON responses from web servers should be formatted.

```json
{
  "status": "success",
  "data": {
    "id": 5,
    "tourName": "The Park Camper"
  }
}
```

There are other standers for JSON response formatting:

- JSOPN:API
- OData JSON Protocol

A RESTful API should be stateless.

Stateless RESTful API: All state is handled on the client side. This means that each request must contain all the information necessary to process a certain request. The server should not have to remember previous requests.

For example, BAD use case:

- GET /tours/nextPage > Web server should remember the last page
- `nextPage = currentPage + 1`

Normal use case:

- GET /tours/page/6 > Web server respond with page 6 content.

### 6.52. Starting Our API: Handling GET Requests

We start with API and we will implement the dynamically generated pages.

We are going to follow JSend specification.

In this example we are serving the tours content form api/v1/tours endpoint from a local file.

```javascript
const express = require("express");
const fs = require("fs");

const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

### 6.53. Handling POST Requests

We will implement the POST request for creating a new tour. Also we will need a middleware. A middleware can modify the incoming request data. Without using middleware we can't access the request body.

```javascript
const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

On this sample we are receiving the new tour objects from the POST endpoint and saving them to a local file. Each time we modify the file service will restart because of the `nodemon`, we can see the updated tour list when we consume the GET endpoint. Even if we don't modify the file, we can see the updated tour list because we are changing the `tours` variable.

### 6.54. Responding to URL Parameters

We will define and use parameter on the URL. We need to define a route that can accept parameters, like this <http://localhost:3000/api/v1/tours/5>.

```js
app.get("/api/v1/tours/:id/:x/:y/:t?", (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    id: req.params.id,
    data: {
      tours,
    },
  });
});
```

On the Express framework we can use `:` to define a parameter, we can use multiple parameters and we can use `?` to make a parameter optional. In this example we need to give id, x, and y as parameters on the URL, otherwise we will get a 404 error.

In a better implementation we can use input validation. We can check the id value exists in the tours array, for invalid values we return an error.

```js
app.get("/api/v1/tours/:id", (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; //a trick to convert string to number
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "error",
      message: "Tour not found",
    });
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    id: req.params.id,
    data: {
      tour: tour,
    },
  });
});
```

### 6.55. Handling PATCH Requests

We can use PATCH or PUT requests to update a resource. Main difference between them is that PUT request is used to update the whole resource, while PATCH request is used to update a part of the resource.

In this example we will implement the PATCH request to update a tour without paying attention to local file.

```js
app.patch("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id * 1; //a trick to convert string to number

  if (!tours.find((tour) => tour.id === id)) {
    return res.status(404).json({
      status: "error",
      message: "Tour not found",
    });
  }
  //this is showcase implementation we are nopt changing anything on the file
  res.status(200).json({
    status: "success",
    data: {
      tour: "updated tour",
    },
  });
});
```

### 6.56. Handling DELETE Requests

For DELETE requests e will apply the id validation, we will return 204 status with no content, null data.

```js
app.delete("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id * 1; //a trick to convert string to number

  if (!tours.find((tour) => tour.id === id)) {
    return res.status(404).json({
      status: "error",
      message: "Tour not found",
    });
  }
  //this is showcase implementation we are not changing anything on the file
  //usually we will return 204 status code with null data
  res.status(204).json({
    status: "success",
    data: null,
  });
});
```

### 6.57. Refactoring the Routes

We will reorganize the the routes for a better implementation.

```js
const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; //a trick to convert string to number
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "error",
      message: "Tour not found",
    });
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    id: req.params.id,
    data: {
      tour: tour,
    },
  });
};

const createTour = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
      if (err) {
        console.log(err);
      }
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1; //a trick to convert string to number

  if (!tours.find((tour) => tour.id === id)) {
    return res.status(404).json({
      status: "error",
      message: "Tour not found",
    });
  }
  //this is showcase implementation we are nopt changing anything on the file
  res.status(200).json({
    status: "success",
    data: {
      tour: "updated tour",
    },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1; //a trick to convert string to number

  if (!tours.find((tour) => tour.id === id)) {
    return res.status(404).json({
      status: "error",
      message: "Tour not found",
    });
  }
  //this is showcase implementation we are not changing anything on the file
  //usually we will return 204 status code with null data
  res.status(204).json({
    status: "success",
    data: null,
  });
};

/*
app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);
*/

app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

With above implementation we are using a simpler way to implement the routes. We are using the route method to group the routes with the same path.

### 6.58. Middleware and the Request-Response Cycle

We call it middleware because it is executed receiving the request and sending the response. In Express every thing is middleware, routing, parser etc.

All the middleware functions are called as middleware stack. Middleware order is defined on the code.

**Middleware Stack**: Middleware_1>Middleware_2>Middleware_3>...>Middleware_N

- middleware: ... next() > parsing body
- middleware: ... next() > logging
- middleware: ... next() > setting headers
- middleware: ... next() > router

**Request-Response Cycle**: Incoming Request>Middleware Stack>Response

### 6.59. Creating Our Own Middleware

We can create our own middleware functions.

```javascript
//this is a middleware function
app.use(express.json());

//we can create our own middleware functions
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  //we need to call next function to move to the next middleware, otherwise the request will be stuck here
  next();
});
```

In this example we are creating a middleware function that will log a message to the console. We are calling the next function to move to the next middleware. Calling the next function is critical, otherwise the request will be stuck in the middleware.

Middleware function order is important.

```js
//this is a middleware function
app.use(express.json());

app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//we can create our own middleware functions
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  //we need to call next function to move to the next middleware, otherwise the request will be stuck here
  next();
});
```

In this case if we consume the get API we can't see the message in the console. Because the middleware is called after the route middleware. On the route middleware we are ending the request-response cycle.

We define global middleware functions before the route middleware.

### 6.60. Using 3rd-Party Middleware

Morgan is a popular logging middleware.

```js
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

//this is a middleware function
app.use(express.json());
```

We can use morgan middleware to log the request to the console. Last line is the output of the request.

```bash
App running on port 3000...
Hello from the middleware
2023-01-12T20:44:56.451Z
GET /api/v1/tours 200 2.018 ms - 8555
```

### 6.61. Implementing the "Users" Routes

We are going to implement the users routes with empty handlers.

```js
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

app.route("/api/v1/users").get(getAllUsers).post(createUser);

app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
```

At this point all of the code located under one file.

### 6.62. Creating and Mounting Multiple Routers

We need to create separate routers for tours and users for each resource.

```javascript
const tourRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(createTour);

tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
```

We are creating two routers for tours and users. We are using the route method to group the routes with the same path.

### 6.63. A Better File Structure

We can migrate the resource specific logic to separated files.

app.js:

```js
const express = require("express");
const morgan = require("morgan");
const app = express();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

app.use(morgan("dev"));

//this is a middleware function
app.use(express.json());

//we can create our own middleware functions
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//routers
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

App.js is mainly used for middleware declaration and routing. We are using the tourRouter and userRouter to handle the requests. Router definitions are also middleware.

Basic file structure:

```bash
.
├── app.js
├── controllers
│   ├── tourController.js
│   └── userController.js
├── package-lock.json
├── package.json
├── routes
│   ├── tourRoutes.js
│   └── userRoutes.js
└── server.js
```

We are creating a controllers folder to store the controller functions. We are creating a routes folder to store the route definitions. As a common practice we will store express related details in the app.js file. server.js file is used to start the server.

app.js:

```js
const express = require("express");
const morgan = require("morgan");
const app = express();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

app.use(morgan("dev"));

//this is a middleware function
app.use(express.json());

//we can create our own middleware functions
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  //we need to call next function to move to the next middleware, otherwise the request will be stuck here
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//routers
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
```

server.js:

```js
const app = require("./app");
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

### 6.64. Param Middleware

We can use param middleware to handle the parameters in the url. In previous sample we checked the id parameter value validity in the handler function. With this middleware we can check the validity of the id parameter value from one location.

```js
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  const id = req.params.id * 1; //a trick to convert string to number
  const tour = tours.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};
```

We will export this function from tourController.js and use it in the tourRoutes.js file.

```js
const express = require("express");
const tourController = require("./../controllers/tourController");

const router = express.Router();

//if we don't send the id, the middleware will not be called
router.param("id", tourController.checkID);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
```

We will consume the middleware function before router definitions.

### 6.65. Chaining Multiple Middleware Functions

We will introduce a new middleware function to check the body of the request. We will check the name and price properties of the body.

tourController.js:

```js
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};
```

We will use this middleware function in the tourRoutes.js file.

tourRoutes.js:

```js
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
```

Last line will use the checkBody middleware function before the createTour function.

### 6.66. Serving Static Files

We can use express.static middleware function to serve static files. Can serve the content of the public folder.

```bash
.
├── css
│   └── style.css
├── overview.html
└── tour.html
```

We can add the following line to the app.js file.

```js
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
```

Last line will serve the content of the public folder.

- <http://localhost:3000/tour.html>
- <http://localhost:3000/overview.html>

These URLs will became available after adding the static middleware function.

### 6.67. Environment Variables

Node.js can run in different environments. We might want to use different configurations, log levels, databases for different environments.

Express sets the environment development by default.

Environment variables are outside of the application. Thus we will use server.js instead of app.js.

```js
const app = require("./app");

console.log(app.get("env"));
console.log(process.env);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

We will get a output like this:

```bash
development
{
  NVM_INC: '.../include/node',
  MANPATH: '...//share/man:',
  TERM_PROGRAM: 'vscode',
  ...
}
```

These environment variables come from the process core module.

If we execute the nodemon with a environment variable, we can access it in the application.

```bash
NODE_ENV=development nodemon server.js
```

```js
console.log(process.env.NODE_ENV);
```

It will have the `development` value. But overloading the parameters on the command is not a good idea. We can use config.env file to store the environment variables.

config.env:

```env
NODE_ENV = development
PORT = 8000
USERNAME = jonas
PASSWORD = 123456
```

server.js:

```js
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

`dotenv` package will read the config.env file and add the environment variables to the process.env object.

We can use the environment variables in the application.

On the app.js file:

```js
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
```

We can enable the morgan middleware function only in the development environment.

Lastly we can set environment from the package.json file.

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start:dev": "nodemon server.js",
    "start:prod": "NODE_ENV=production nodemon server.js"
  }
}
```

```bash
npm run start:dev
npm run start:prod
```

Will run different environment variables.

### 6.68. Setting up ESLint + Prettier in VS Code

ESLint provides linting for JavaScript. Prettier provides code formatting. We will use both of them in our project.

We need these packages:

```json
"devDependencies": {
    "eslint": "^8.32.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-config-prettier": "^8.6.0",
    "eslint-plugin-import": "^2.27.4",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-react": "^7.32.0",
    "markdown-notes-tree": "^1.12.0",
    "nodemon": "^2.0.20",
    "prettier": "^2.8.3"
  }
```

We need a .eslintrc.json file in the root folder:

```json
{
  "extends": ["airbnb", "prettier", "plugin:node/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "spaced-comment": "off",
    "no-console": "warn",
    "consistent-return": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "no-process-exit": "off",
    "no-param-reassign": "off",
    "no-return-await": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "prefer-destructuring": ["error", { "object": true, "array": false }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "req|res|next|val" }]
  }
}
```

After installing the packages, we can restart the VS Code to see alerts.

We can follow the Airbnb style guide. Our configuration extends the airbnb, prettier and node recommended rules. For specific rules we can override them. `no-unused-vars` rule is an important one and can prevent some bugs, but we want to ignore the `req`, `res`, `next` and `val` variables, because they are used in the express application middleware functions commonly.

We can check the rules on the [ESLint website](https://eslint.org/docs/rules/).
