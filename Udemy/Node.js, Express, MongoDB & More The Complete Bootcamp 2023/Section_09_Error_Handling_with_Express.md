# Node.js, Express, MongoDB & More: The Complete Bootcamp 2023

## 9. Section 9: Using MongoDB with Mongoose

### 9.110. Section Intro

Error handling is an important part of any application. In this section, we will learn how to handle errors in Express.

### 9.111. Debugging Node.js with ndb

We will use `ndb` to debug our Node.js applications. `ndb` is a Node.js debugger that is built on top of Chrome DevTools. It allows us to debug our Node.js applications using the same tools that we use to debug our front-end applications.

We can install `ndb` globally using `npm`:

```bash
npm install -g ndb
```

We can then run our application using `ndb`:

```bash
ndb app.js
```

`ndb` will open a new tab in our browser. We can then set breakpoints in our code and debug our application.

### 9.112. Handling Unhandled Routes

It is better to return a specific message when a user tries to access a route that does not exist. We can do this by using the `all` method:

```js
const express = require("express");
const morgan = require("morgan");

const app = express();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//routers
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//if we are here, it means that the route is not defined
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
```

In this example we have used the àll` method at the end of the middleware stack. This means that if we are here, it means that the route is not defined.

### 9.113. An Overview of Error Handling

`Operational errors` are errors that we can predict and handle. For example, if a user tries to access a route that does not exist, we can handle this error.

Problems that we can predict will happen at some point, so we just need to handle them in advance.

- Invalid path accessed
- Invalid user input (validator error from mongoose)
- Failed to connect to server
- Failed to connect to database
- Request timeout

`Programming errors` bugs that we developers introduce to our code. Difficult to find and handle.

- Reading properties on undefined
- Passing a number where an object is expected
- Using await without async
- Using req.query instead of req.body

We are going to use a error handling middleware to handle errors. Client can decide what to do with the error.

### 9.114. Implementing a Global Error Handling Middleware

We can create a global error handling middleware that will handle all errors in our application. We can do this by using the `app.use` method:

```js
//if we are here, it means that the route is not defined
app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;

  //passing the error to the next middleware, express will know that this is an error
  next(err);
});

//four arguments are required for error handling middleware, express will know that this is an error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
```

Passing a parameter to the `next` function will tell express that this is an error. Express will then redirect the error to the error handling middleware.

`app.use` with an error parameter is an error handling middleware. It will be called only if an error is passed to the `next` function.

### 9.115. Better Errors and Refactoring

We have can create a error class to store error information:

appError.js:

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
```

Our class wil extend the Error class, it will hold the message also we will add the status code and status. This class will handle operational errors. Also we will store the stack trace of the error.

Additionally we will move the error handler function to a separate file:

errorController.js:

```js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
module.exports = errorHandler;
```

Again we are using a 4 parameter function.

Lastly we will use our new class and function:

app.js:

```js
//if we are here, it means that the route is not defined
app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;

  //passing the error to the next middleware, express will know that this is an error
  next(err);
});

//four arguments are required for error handling middleware, express will know that this is an error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
```

New implementation:

```js
//if we are here, it means that the route is not defined
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//four arguments are required for error handling middleware, express will know that this is an error handling middleware
app.use(globalErrorHandler);
```

### 9.116. Catching Errors in Async Functions

We need a standard way to handle asynchronous exceptions, previously we were using the `try catch` block for every controller method.

```js
// eslint-disable-next-line arrow-body-style
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
module.exports = catchAsync;
```

Upper example will wrap our asynchronous functions and will pass the error to the next middleware, and in this case we are calling the next from catch block with an error parameter.

We can use the `catchAsync` function to wrap our asynchronous functions:

```js
exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});
```

### 9.117. Adding 404 Not Found Errors

We will add more reasonable messages for specific cases:

```js
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
});
```

In this sample we are checking if the tour exists, if not we are passing an error to the next middleware.

### 9.118. Errors During Development vs Production

We will follow different strategies for development and production. In development we will send the stack trace to the client, in production we will not send the stack trace.

Production will contain less details about the error:

```js
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  console.error("ERROR", err);
  //Programming or other unknown error: don't leak error details
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
module.exports = errorHandler;
```

In this sample we can see that the error handler for development will send the stack trace to the client, but in production we will not send the stack trace.

### 9.119. Handling Invalid Database IDs

We can convert MongoDB errors to our custom errors:

```js
const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  console.error("ERROR", err);
  //Programming or other unknown error: don't leak error details
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastErrorDB(error);

    sendErrorProd(error, res);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
module.exports = errorHandler;
```

In this sample:

```javascript
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
```

This method will replace the MongoDB cast error with a proper error message with less details.

### 9.120. Handling Duplicate Database Fields

We will handle duplicate database fields:

```js
const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value`;
  return new AppError(message, 400);
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    sendErrorProd(error, res);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
```

We will look for the specific error code and replace it with a more meaningful error message.

### 9.121. Handling Mongoose Validation Errors

We will extract the Mongoose error for better readability on the prod:

```js
const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  console.error("ERROR", err);
  //Programming or other unknown error: don't leak error details
  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === "ValidationError") error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
module.exports = errorHandler;
```

In this case we can see errors similar to this:

```json
{
  "status": "fail",
  "message": "Invalid input data: A tour name must have more or equal then 10 characters. Difficulty is either: easy, medium, difficult"
}
```

### 9.122. Errors Outside Express: Unhandled Rejections

We can face exceptions outside Express, for example when we cannot connect to the database. We can handle this with the `unhandledRejection` event:

```js
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//safety net for unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
```

Event listener for `process.on('unhandledRejection')` will catch the error and shut down the server gracefully.

### 9.123. Catching Uncaught Exceptions

In previous example we handled unhandled rejections. We can also handle uncaught exceptions:

```js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<USERNAME>', process.env.DATABASE_USERNAME);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//safety net for unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
```

We have placed the `process.on('uncaughtException')` before all of the operations that can throw an error. We can test this by changing the database password in the `config.env` file.
