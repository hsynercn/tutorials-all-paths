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
