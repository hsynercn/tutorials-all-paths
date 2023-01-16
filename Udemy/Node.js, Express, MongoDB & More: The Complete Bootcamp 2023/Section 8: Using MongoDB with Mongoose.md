# Node.js, Express, MongoDB & More: The Complete Bootcamp 2023

## 8. Section 8: Using MongoDB with Mongoose

### 8.82. Section Intro

We will connect to MongoDB from our app using Mongoose.

### 8.83. Connecting Our Database with the Express App

We will get our connection string from MongoDB Atlas. We can use the `Connect`page of the cluster and select the application connection.

We will get the connection string from the `Connect your application` section.

```bash
mongodb+srv://hcanercan:<password>@cluster0.8cjdopq.mongodb.net/?retryWrites=true&w=majority
```

On the config.env file we will add the connection string, username and password:

```bash
NODE_ENV = development
PORT = 8000
DATABASE_PASSWORD=XXX
DATABASE_USERNAME=XXX
DATABASE=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.8cjdopq.mongodb.net/natours?retryWrites=true&w=majority
```

On the server.js file we will connect to the database:

```js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

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
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

We should see the success message on the console. On the connection string we are replacing the password and username with the environment variables.

### 8.84. What is Mongoose

- Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, it provides higher level of abstraction.
- Mongoose allows for rapid and simple development of mongoDB database interactions.
- Features: schemas to model data and relationships, easy data validation, simple query API, middleware, etc.
- Mongoose schema: where we model our data, by describing the structure of the data, default values, and validation.
- Mongoose model: a wrapper for the schema, providing an interface to the database for CRUD operations.

