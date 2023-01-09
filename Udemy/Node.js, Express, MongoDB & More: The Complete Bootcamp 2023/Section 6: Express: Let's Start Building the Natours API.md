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
const express = require('express');
const fs = require('fs');

const app = express();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```