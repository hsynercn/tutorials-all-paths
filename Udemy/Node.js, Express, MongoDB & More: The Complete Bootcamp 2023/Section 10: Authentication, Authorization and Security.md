# Node.js, Express, MongoDB & More: The Complete Bootcamp 2023

## 10. Section 10: Authentication, Authorization and Security

### 10.124. Section Intro

Authentication and authorization are two of the most important topics in web development.

We will use JSON Web Tokens (JWT) to authenticate users and protect routes.

### 10.125. Modelling Users

We will use the following schema for users:

```js
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    unique: true,
    trim: true,
    maxlength: [40, "A user name must have less or equal then 40 characters"],
    minlength: [10, "A user name must have more or equal then 10 characters"],
    validator: [validator.isAlpha, "User name must only contain characters"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: [
      10,
      "A user password must have more or equal then 10 characters",
    ],
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must have a password confirmation"],
    trim: true,
    maxlength: [
      40,
      "A user password confirmation must have less or equal then 40 characters",
    ],
    minlength: [
      10,
      "A user password confirmation must have more or equal then 10 characters",
    ],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
```

We will use a minimum of 10 characters rule for passwords.

### 10.126. Creating New Users

We will introduce a sign up endpoint to users controller÷

```js
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
```

Again we are using `catchAsync` handler for DB schema operation. On the router side we will create a new endpoint:

```js
const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
```

### 10.127. Managing Passwords

We will introduce some rules to user schema:

```js
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  //...
  passwordConfirm: {
    type: String,
    required: [true, "A user must have a password confirmation"],
    trim: true,
    maxlength: [
      40,
      "A user password confirmation must have less or equal then 40 characters",
    ],
    minlength: [
      10,
      "A user password confirmation must have more or equal then 10 characters",
    ],
    validate: {
      // this only works with SAVE, when we create a new object
      validator: function (element) {
        return element === this.password;
      },
      message: "Passwords are not the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
```

We will compare the password and confirm password. Also we will use bcrypt to create a hash of the password, we are using `saltround` 12 value for CPU intensive hashing.

### 10.128. How Authentication with JWT Works

JWT (JSON Web Token) is a compact, URL-safe means of transmitting information between parties as a JSON object. It is often used for authentication and authorization purposes, allowing the transmitting party to assert a claim about the token’s subject.

A JWT consists of three parts:

1. Header: Contains information about how the JWT is encoded.

2. Payload: Contains the claims. Claims are statements about an entity (typically, the user) and additional metadata.

3. Signature: A signature created by combining the encoded header and payload and a secret key, to verify that the sender of the JWT is who it claims to be.

The recipient of a JWT first verifies the signature to ensure that it was created by a trusted source, then it can use the claims to determine what access to grant the requesting party.

```mermaid
sequenceDiagram
    Client->>Server: POST /login {email, password}
    Note right of Server: If user and passwords are correct
    Note right of Server: Create unique JWT
    Server->>Client: JWT
    Note left of Client: Store JWT (cookie or localStorage)
    Client->>Server: HTTPS GET /someProtectedRoute JWT
    Note right of Server: If valid JWT, allow access
    Server->>Client: PROTECTED DATA
```

