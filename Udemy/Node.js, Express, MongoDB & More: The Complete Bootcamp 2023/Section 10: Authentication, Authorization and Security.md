# Node.js, Express, MongoDB & More: The Complete Bootcamp 2023

## 10. Section 10: Authentication, Authorization and Security

### 10.124. Section Intro

Authentication and authorization are two of the most important topics in web development.

We will use JSON Web Tokens (JWT) to authenticate users and protect routes.

### 10.125. Modelling Users

We will use the following schema for users:

```js
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A user name must have less or equal then 40 characters'],
    minlength: [10, 'A user name must have more or equal then 10 characters'],
    validator: [validator.isAlpha, 'User name must only contain characters'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [
      10,
      'A user password must have more or equal then 10 characters',
    ],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A user must have a password confirmation'],
    trim: true,
    maxlength: [
      40,
      'A user password confirmation must have less or equal then 40 characters',
    ],
    minlength: [
      10,
      'A user password confirmation must have more or equal then 10 characters',
    ],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

We will use a minimum of 10 characters rule for passwords.