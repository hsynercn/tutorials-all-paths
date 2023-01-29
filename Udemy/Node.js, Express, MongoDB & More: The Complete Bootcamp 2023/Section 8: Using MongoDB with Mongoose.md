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
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
).replace("<USERNAME>", process.env.DATABASE_USERNAME);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection successful!");
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

### 8.85. Creating a Simple Tour Model

We will define the tour model:

```js
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});

//we use uppercase for model names
const Tour = mongoose.model("Tour", tourSchema);
```

In this example we have used validators and several configurations for the entity properties.

### 8.86. Creating Documents and Testing the Model

We are going to create a document and test the model:

```js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
).replace("<USERNAME>", process.env.DATABASE_USERNAME);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection successful!");
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});

//we use uppercase for model names
const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
  name: "The Forest Hiker",
  rating: 4.7,
  price: 497,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
    console.log("Document saved!");
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  });
```

In this if we run `npm start` once we will see the saved document on the MongoDB collection. Previously we deleted the collection and the documents. When we run this file and save the document MongoDB will create the collection and save the document.

If we pay attention to schema we can see that we have defined the `name` property as unique. If we try to save a document with the same name we will get an error. We can also see that we have defined the `price` property as required. If we try to save a document without the price we will get an error.

### 8.87. Intro to Back-End Architecture: MVC, Types of Logic, and More

MVC is a software design pattern that separates the application into three main logical components:

- Model: Business Logic
- View: Presentation Logic
- Controller: Application Logic

The model is the data, the view is the presentation of the data, and the controller is the logic that decides what the user sees and does.

```mermaid
graph LR
A[Request] --> B[Router]
B --> C[Controller]
C --> D[Model]
D --> C
C --> F[Response]
C --> E[View]
E --> C
```

Application Logic

- Code that is concerned about the applications's implementation, not the underlying business problem we're trying to solve(e.g. showing and selling tours).
- Concerned about managing requests and responses.
- About the app's more technical aspects.
- Bridge between model and view layers.

Business Logic

- Code that actually solves the business problem we set out to solve.
- Directly related to business rules how the business works, and business needs.
- Examples:
  - Creating new tours in the database
  - Checking if user's password is correct
  - Validating user input data
  - Ensuring only users who bought a tour can review it.

Fat model/thin controller: offload as much logic as possible from the controller and into the model, and keep the controllers as simple as possible.

### 8.88. Refactoring the MVC

We will remove all `fs` related code and add a models folder Tour model to our project.

tourModel.js:

```js
const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});

//we use uppercase for model names
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
```

Our folder structure should look like this:

```bash
.
├── app.js
├── config.env
├── controllers
│   ├── tourController.js
│   └── userController.js
├── models
│   └── tourModel.js
├── package-lock.json
├── package.json
├── routes
│   ├── tourRoutes.js
│   └── userRoutes.js
└── server.js
```

Our controller doesn't return data:

```js
exports.getTour = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    id: req.params.id,
    /*
    data: {
      tour: tour,
    },
    */
  });
};
```

### 8.89. Another Way of Creating Documents

We will create a new document using the `create` method of the model:

```js
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
```

We can return the created document in the response. Additionally we can use the `try/catch` block to handle errors and return a response with the error message.

### 8.90. Reading Documents

We will read documents from the database with the following code:

```js
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
```

`Tour.find()` returns all documents from the collection. `Tour.findById()` returns a document with the specified id, it is the same as `Tour.findOne({ _id: req.params.id })`.

### 8.91. Updating Documents

We will use the following code to update documents:

```js
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
```

`Tour.findByIdAndUpdate()` updates the document with the specified id. The third parameter is an object with options. `new: true` returns the updated document. `runValidators: true` runs the validators defined in the schema.

### 8.92. Deleting Documents

We will use the following code to delete documents:

```js
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
```

`Tour.findByIdAndDelete()` deletes the document with the specified id, as a common practice we return `null` in the response.

### 8.93. Modeling the Tours

We have changed the schema of the Tour model:

```js
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have a description"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});
```

We have added new fields to the schema. We have also added validators to some fields.

### 8.94. Importing Development Data

We will import the development data using the following code:

```js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Tour = require("../../models/tourModel");

dotenv.config({ path: "./../../config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
).replace("<USERNAME>", process.env.DATABASE_USERNAME);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection successful!");
  });

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Deleted all tours!");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const importData = async () => {
  const fileContent = fs.readFileSync(
    `${__dirname}/tours-simple.json`,
    "utf-8"
  );
  const tours = JSON.parse(fileContent);
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
```

We can run the script with the following command:

for deleting all documents:

```bash
node dev-data/data/import-dev-data.js --delete
```

for importing the development data:

```bash
node dev-data/data/import-dev-data.js --import
```

### 8.95. Making the API Better: Filtering

We will use the following code to filter the documents:

```js
exports.getAllTours = async (req, res) => {
  console.log(req.query);
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(req.query, queryObj);
    const tours = await Tour.find(queryObj);
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
```

If we access the following url:

```bash
http://localhost:{{PORT}}/api/v1/tours?duration=5&difficulty=easy&sort=1&limit=10
```

We can see the following output:

```bash
{ duration: '5', difficulty: 'easy', sort: '1', limit: '10' }
{ duration: '5', difficulty: 'easy' }
```

Mongoose will apply the remaining query parameters to the query.

```js
const tours = await Tour.find({
  duration: 5,
  difficulty: "easy",
});

const tours = await Tour.find()
  .where("duration")
  .equals(5)
  .where("difficulty")
  .equals("easy");
```

These lines could give the same result.

### 8.96. Making the API Better: Advanced Filtering

We will use the following code to filter the documents:

```js
exports.getAllTours = async (req, res) => {
  console.log(req.query);
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(queryStr);

    const query = Tour.find(JSON.parse(queryStr));
    const tours = await query;

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
```

We need to translate the request query to a mongoose query. We can use the following code to do that:

```js
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
```

We can use the following url to test the code:

```bash
http://localhost:{{PORT}}/api/v1/tours?duration[gte]=5&difficulty=easy&sort=1&limit=10&price[lt]=1500
```

The replace method will put a dollar sign before the operators for the mongoose query.

For real world applications we need to define documentation for the API.

### 8.97. Making the API Better: Sorting

We will use the following code to sort the documents:

```js
exports.getAllTours = async (req, res) => {
  console.log(req.query);
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(queryStr);

    let query = Tour.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const tours = await query;

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
```

We will convert the sort query parameter to a mongoose query:

```js
if (req.query.sort) {
  const sortBy = req.query.sort.split(",").join(" ");
  query = query.sort(sortBy);
} else {
  query = query.sort("-createdAt");
}
```

We are using createdAt as a default sort parameter.

### 8.98. Making the API Better: Limiting Fields

We will use the following code to limit the fields of the documents:

```js
exports.getAllTours = async (req, res) => {
  console.log(req.query);
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1) Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(queryStr);

    let query = Tour.find(JSON.parse(queryStr));

    //2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    const tours = await query;

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
```

We will convert the fields query parameter to a mongoose query:

```js
if (req.query.fields) {
  const fields = req.query.fields.split(",").join(" ");
  query = query.select(fields);
} else {
  query = query.select("-__v");
}
```

MongoDB will return the \_\_v field by default. We will exclude it. We can use the following url to test the code:

```bash
http://localhost:{{PORT}}/api/v1/tours?fields=name,duration,difficulty,price
```

Mongo will return the listed fields, we only need to separate them with spaces.

Also we can change the model properties to be private:

```js
const tourSchema = new mongoose.Schema({
  //...
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  //...
});
```

select: false will exclude the property from the response.

### 8.99. Making the API Better: Pagination

We will use the following code to paginate the documents:

```js
exports.getAllTours = async (req, res) => {
  console.log(req.query);
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1) Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(queryStr);

    let query = Tour.find(JSON.parse(queryStr));

    //2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) {
        throw new Error("This page does not exist");
      }
    }

    const tours = await query;

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
```

Pagination is available in mongoose. We will use the following url to test the code:

```bash
http://localhost:{{PORT}}/api/v1/tours?page=2&limit=10
```

We will use the following code to handle the case when the page does not exist:

```js
//4) Pagination
const page = req.query.page * 1 || 1;
const limit = req.query.limit * 1 || 100;
const skip = (page - 1) * limit;
query = query.skip(skip).limit(limit);

if (req.query.page) {
  const numTours = await Tour.countDocuments();
  if (skip >= numTours) {
    throw new Error("This page does not exist");
  }
}
```

Simply we are calculating the skip value and then we are using the skip and limit methods of mongoose.

### 8.100. Making the API Better: Aliasing

We may use specific URL cases to easily access specific result sets:

```URL
http://localhost:{{PORT}}/api/v1/tours?sort=price,ratingsAverage,price&limit=5
```

```js
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,difficulty,ratingsAverage,summary";
  next();
};
```

We can use a middleware to insert specific parameter into the query.

```js
router
  .route("/top-5-tours")
  .get(tourController.aliasTopTours, tourController.getAllTours);
```

We can wire the parameters to a specific endpoint from the router.

### 8.101. Refactoring API Features

We will separate the API features into a separate file:

```js
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    console.log("filter");
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //we will manipulate the query object
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
```

We can use our new class on the controller:

```js
exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
```

This example shows the simplified version of the controller.

```javascript
const features = new APIFeatures(Tour.find(), req.query)
  .filter()
  .sort()
  .limitFields()
  .paginate();
```

These lines are equivalent to previous versions of tour controller.

### 8.102 Aggregation Pipeline: Matching and Grouping

We can use aggregation pipelines to use different strategies to extract data:

```js
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          numOfTours: { $sum: 1 },
          numRating: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
```

We are using greater than for ratings average property. Grouping the results with uppercase difficulty. We are counting the number of records with sum 1. We can use $sum, $avg, $min and $max operators on properties.

In this sample we will receive the following output:

```json
{
  "status": "success",
  "data": {
    "stats": [
      {
        "_id": "EASY",
        "numOfTours": 4,
        "numRating": 159,
        "avgRating": 4.675,
        "avgPrice": 1272,
        "minPrice": 397,
        "maxPrice": 1997
      },
      {
        "_id": "MEDIUM",
        "numOfTours": 3,
        "numRating": 70,
        "avgRating": 4.8,
        "avgPrice": 1663.6666666666667,
        "minPrice": 497,
        "maxPrice": 2997
      },
      {
        "_id": "DIFFICULT",
        "numOfTours": 2,
        "numRating": 41,
        "avgRating": 4.6,
        "avgPrice": 1997,
        "minPrice": 997,
        "maxPrice": 2997
      }
    ]
  }
}
```

### 8.103. Aggregation Pipeline: Unwinding and Projecting

We will use the following lines to generate a report for yearly tours:

```js
exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numOfTourStarts: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      {
        $addFields: { month: "$_id" },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numOfTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        plan,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
```

`$unwind` operator will return multiplied result of tour objects. With this aggregation pipeline we can this result:

```json
{
  "status": "success",
  "data": {
    "plan": [
      {
        "numOfTourStarts": 3,
        "tours": ["The Forest Hiker", "The Sea Explorer", "The Sports Lover"],
        "month": 7
      },
      {
        "numOfTourStarts": 2,
        "tours": ["The Forest Hiker", "The Star Gazer"],
        "month": 10
      },
      {
        "numOfTourStarts": 2,
        "tours": ["The Sea Explorer", "The Park Camper"],
        "month": 8
      },
      {
        "numOfTourStarts": 2,
        "tours": ["The Sea Explorer", "The City Wanderer"],
        "month": 6
      },
      {
        "numOfTourStarts": 2,
        "tours": ["The Forest Hiker", "The Wine Taster"],
        "month": 4
      },
      {
        "numOfTourStarts": 2,
        "tours": ["The Wine Taster", "The Sports Lover"],
        "month": 9
      },
      {
        "numOfTourStarts": 2,
        "tours": ["The City Wanderer", "The Star Gazer"],
        "month": 3
      },
      {
        "numOfTourStarts": 1,
        "tours": ["The City Wanderer"],
        "month": 5
      },
      {
        "numOfTourStarts": 1,
        "tours": ["The Northern Lights"],
        "month": 12
      },
      {
        "numOfTourStarts": 1,
        "tours": ["The Wine Taster"],
        "month": 2
      }
    ]
  }
}
```

### 8.104 Virtual Properties

We can define virtual properties on our models. These properties are not stored in the database. We can use these properties to calculate values on the fly.

```js
const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
    },
    //...
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// we can't use virtual properties in queries
tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});
```

### 8.105 Document Middleware

There are 4 types of middleware on the mongoose:

- Document Middleware
- Query Middleware
- Aggregation Middleware
- Model Middleware

Document middleware runs before and after save and create commands. We can use this middleware to encrypt passwords.

```js

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre('save', (next) => {
  console.log('Will save document...');
  next();
});
```

With this sample we can introduce a slug property to our tour objects when we create them.

### 8.106 Query Middleware