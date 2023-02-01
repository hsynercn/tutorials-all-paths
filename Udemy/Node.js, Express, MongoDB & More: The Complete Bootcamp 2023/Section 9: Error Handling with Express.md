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
const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//if we are here, it means that the route is not defined
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
```

In this example we have used the àll` method at the end of the middleware stack. This means that if we are here, it means that the route is not defined.

### 9.113. An Overview of Error Handling

