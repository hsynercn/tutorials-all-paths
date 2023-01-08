# Node.js, Express, MongoDB & More: The Complete Bootcamp 2023

## 5. Section 5: Asynchronous JavaScript: Promises and Async, Await

### 5.40. Section Intro

Node is all about asynchronous execution. Modern Node uses promises and async functions.

### 5.41. The Problem with Callbacks: Callback Hell

When we need to execute several asynchronous operations in a consecutive order we can face a callback hell.

```js
const fs = require('fs');
const superagent = require('superagent');

//deeper nested callbacks are hard to maintain 
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) {
        return console.log(err);
      }
      console.log(res.body.message);
      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        console.log('Random dog img saved');
      });
    });
});
```

In this sample application we are fetching a random image from an API endpoint and writing it to a file. Fetch and write operations are asynchronous. At the left side we can see the callback pyramid, even deeper nested calls are harder to maintain.

### 5.42. From Callback Hell to Promises

At the beginning our promise is pending. After some time promise is resolved or failed, in both cases the promise is resolved.

```js
const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      if (err) {
        return console.log(err);
      }
      console.log(res.body.message);
      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        console.log('Random dog img saved');
      });
    })
    .catch(err => {
        console.log(err);
    });
});
```

If we chose to return promises from our handler functions we can create event chains.

```js
const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Done');
  })
  .catch((err) => {
    console.log(err);
  });
```

Every handler method should return a promise, by this way we can use then to consume the promise return value in the next handler. This is a flat structure.
