# Node.js, Express, MongoDB & More: The Complete Bootcamp 2023

## 7. Section 7: Introduction to MongoDB

### 7.69. Section Intro

This section is about MongoDB.

### 7.70. What is MongoDB?

MongoDB is a document-based, NoSQL database. Each database can contain one or more collections. The corresponding entity on a relational database is a table.

Each collection can contain one or more documents. The corresponding entity on a relational database is a row. Each document can contain one or more fields. The corresponding entity on a relational database is a column.

MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need.

Key features:

- Document based: MongoDB stores data in documents (field-value pair data structure)
- Scalable: Very easy to distribute data across multiple machines as your users and amount of data grows
- Flexible: No document data schema required, so each document can have different number and type of fields
- Performant: Embedded data models, indexing, sharding, flexible documents, native duplication, and more
- Free and open source: MongoDB is free and open source, and it is available on multiple platforms

BSON: Data format MongoDB uses for data storage. Like JSON, but typed. So MongoDB documents are typed.

Embedded documents: Documents can contain other documents. This is called embedding.

```json
{
  "name": "Jonas",
  "age": 30,
  "address": {
    "street": "Main St",
    "city": "New York"
  }
}
```

Embedding/Denormalizing: Including related data into a single document. This allows for quicker access and easier data models (it's not always the best solution though).

Normalization: Using multiple documents to store related data. Relational databases use this approach.

### 7.71. No Need to Install MongoDB Locally

We don't need to install MongoDB locally. We can use MongoDB Atlas, which is a cloud database service. We can continue from section 79.

### 7.72. Installing MongoDB on macOS

SKIP

### 7.73. Installing MongoDB on Windows

SKIP

### 7.74. Creating a Database

SKIP

### 7.75. Creating a Documents

SKIP

### 7.76. CRUD: Querying (Reading) Documents

SKIP

### 7.77. CRUD: Updating Documents

SKIP

### 7.78. CRUD: Deleting Documents

SKIP

### 7.79. Using Compass App for CRUD Operations

Compass is a GUI for MongoDB. We can use Compass to create, read, update, and delete documents.

### 7.80. Creating a Hosted Database with Atlas

We are going to use MongoDB Atlas, which is a cloud database service. We are not going to use local MongoDB for the project.

MongoDB Atlas is a cloud database service for MongoDB. It is a fully managed database as a service. It is free for small databases.

We can create a free account on [link](https://www.mongodb.com/cloud/atlas), and then create a project with a free cluster.

### 7.81. Connecting to Our Hosted Database

On the Atlas dashboard first we need to be sure we have a database cluster. Then we need to create a new database user and whitelist our IP address.

After that we can use `Connect` button from the cluster dashboard, we can choose the Atlas connection. UI will provide the required connection string.

We can allow IP access from anywhere, or we can whitelist our IP address.

UI changes by time, these notes could become outdated.
