# Chapter 2. Data Models and Query Languages

Data models are the most important part of developing software. 

- They effect how the software is written
- They effect how we think about the problem

Applications are built by layering one data model on top of another:

1. Application developer uses models to represent data from real world, creates APIs to manipulate those data structures. Those structures are often specific to the application.
2. We need to store those data structures, we express them in JSON, XML, tables in a relational database, or a graph model.
3. JSON/XML/Tables/Graphs are data in term of bytes in memory, on disk, or on a network. The representation may allow the data to be queried, searched, manipulated, and processed in different ways.
4. On the lower level it is electrical signals, magnetic fields, or optical media.

Each layer hides the complexity of the layer below it providing a clean data model.

Mastering a data model is already hard. But since the data model has such a profound effect on what the software above it can and can't do it, it is important to choose one that is appropriate for the application.

In this chapter we will look at a range of general-purpose data models for data storage and querying.

In particular, we will look at:

- Relational model
- Document model
- Graph model

We will also look at query languages for each of these models.

## Relational Model Versus Document Model

Best know data model today is SQL, which is based on the relational model.

Data is organized into relations (called tables in SQL). Each relation is an unordered collection of tuples (rows in SQL). Each tuple is an unordered collection of attributes (columns in SQL).

80s and 90s, the relational model was the only widely accepted model for database management. The dominance of relational databases lasted around 25-30 years.

Root of relational databases lie in business data processing. It was performed on mainframe computers:

- Transaction processing: Recording and processing of business transactions
- Batch processing: Periodic processing of large amounts of data (e.g. payroll, billing)

Today relational data bases are used for many different use cases:

- Online publishing
- Social networking
- E-commerce
- Games

### The Birth of NoSQL

NoSQL is the latest attempt to break the stranglehold of SQL.

There are several reasons for the adoption of NoSQL:

- Need for greater scalability than relational databases.Including very large datasets or very high write throughput.
- Free and open source software over commercial database products.
- Specialized query operations that are not well supported by the relational model.
- Frustration with the restrictiveness of the relational model.

Different applications have different requirements, probably NoSQL and SQL will coexist for a long time.

### The Object-Relational Mismatch

Most application development today is done in object-oriented programming languages. If data is stored in relational tables, an awkward translation layer is required between the objects in the application code and the database model of tables, rows, and columns.

The disconnect between the models is sometimes called the object-relational mismatch.

ORM frameworks like ActiveRecord and Hibernate reduce the amount of boilerplate code for the translation, but they don't eliminate the mismatch.

The disconnection between the models sometimes called an impedance mismatch.

Imagine we are creating a resume page. We will use user, education, work experience, and skills.

- In traditional SQL model, the most common normalized representation is to put each type of information in a separate table.
- Later versions of SQL added support for structured data types (arrays, JSON, XML) to allow more flexibility in the schema.
- Third option is encoding everything into a single JSON or XML document and storing that in a single text column in a table.

```json
{
  "user": "user1",
  "first_name": "John",
  "last_name": "Doe",
  "summary": "Software Engineer",
  "education": [
    {"institution": "MIT", "degree": "PhD", "year": 2005},
    {"institution": "ETH", "degree": "MSc", "year": 2001}
  ],
  "work_experience": [
    {"company": "Google", "title": "Software Engineer", "year": 2010},
    {"company": "Facebook", "title": "Software Engineer", "year": 2008}
  ],
  "skills": [
    {"name": "C++", "level": "advanced"},
    {"name": "Java", "level": "advanced"}
  ]
}
```

Some developers think JSON model reduces the impedance mismatch between the application code and storage layer. However there are also problems with JSON as a data encoding format. The lack of schema is often cited as an advantage.

JSON representation has better locality than the multi-table schema. In a relational example we need to perform multiple queries or perform a multi-way join.

The one-to-many relationships from the user profile to the user's positions, education, and skills imply a tree structure. JSON makes the tree structure explicit.


