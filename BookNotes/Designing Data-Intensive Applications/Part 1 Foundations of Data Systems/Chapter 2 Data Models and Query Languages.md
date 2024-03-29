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

### Many-to-One and Many-to-Many Relationships

In previous resume example one-to-many relationships form a tree structure.

```mermaid
graph TD
  A[user] --> B[positions]
  A --> C[education]
  A --> D[first_name]
  A --> G[last_name]
  A --> H[summary]
  B --> E[job_1]
  E --> E1[job_title]
  E --> E2[organization] 
  C --> F[education_1]
  F --> F1[school_name]
  F --> F2[start]
  F --> F3[end]
  C --> L[education_2]
  L --> L1[school_name]
  L --> L2[start]
  L --> L3[end]
```

If user interface has free-text fields for region and industry, it could make sense to store them as plain text strings. But there are advantages to having standard values for these fields, which user could select from drop-down list or autocomplete:

- Consistent style and spelling across profiles
- Avoiding ambiguity, if there are multiple places with the same name
- Ease of updating, if a place or industry name changes the name is stored in only one place
- Localization support, when the site is translated into other languages, the standard values can be translated
- Better search, if the standard values are used in search filters, it is easier to search for profiles that match a particular region or industry

When we store the ID, human meaningful info will be is stored in only one place. When we store the text directly, it will duplicate the human-meaningful info in every record that uses it.

Removing such duplication is the key idea behind normalization in databases.

Normalization is the process of organizing the columns and tables of a database to minimize data redundancy. Denormalization is the process of trying to improve the read performance of a database at the expense of some write performance.

Normalizing data creates many-to-one relationships.

Which don't fit nicely into the document model. In relational databases we can refer to other to other rows in other tables by ID, because joins are easy. In document model, we don't have to make joins to create tree like structures, and support for joins are weak.

If the DB does not support joins, we have to make joins in app code by making multiple queries to DB.

We can start with a join-free document model, but the data has a tendency of becoming mode interconnected as features are added to applications.

Imagine we are adding a recommendation feature to the resume page. We want to show other user who approved the user skills. We need to create a one-to-many relationship.

### Are Document Databases Repeating History?

We use many-to-many relationships and joins for relational databases. But document databases and NoSQL reopened the debate on how best to represent such relationships in a database.

This debate is much older than NoSQL.

IMS was the first hierarchical database management system. It was developed in the late 1960s by IBM.

Like document databases, IMS worked well for one-to-many relationships, but it made many-to-many relationships difficult, and it didn't support joins.

The two most prominent solutions were relational model and network model.

- The Network Model: CODASYL (Conference on Data Systems Languages) was a consortium that defined the network model in the late 1960s. In the tree structure of the hierarchical model, a record could have exactly one parent. In the network model a record could have multiple parents.

Access Path: A path from one record to another, following the pointers. The network model allowed records to be linked in a graph, and it supported many-to-many relationships.

Access Path concept made queries more complex than in the hierarchical model. It was difficult to optimize queries.

- The Relational Model: Relational data lays out all the data in the open, this is contrast to the hierarchical and network models.

There are no labyrinthine nested structures, no complicated access paths.

In relational database, the query optimizer automatically decides which parts of the query to execute in which order, and which indexes to use.

We don't need to change the queries when the structure of the data changes, when we add a new index queries will automatically use it.

Thus relational model made it much easier to add new featured to applications.

- Comparison to Document Databases: Document databases reverted back to hierarchical model in one aspect: storing nested records within their parent record rather than in a separate table.

However, when it comes to representing many-to-one and many-to-many relationships, relational and document databases are not fundamentally different. 

In both cases the related item is referenced by a unique identifier:

- Foreign key in relational model
- Document reference in document model

That identifier resolved at read time by using a join or follow-up queries. Simple document dbs don't follow CODASYL path.

### Relational Versus Document Databases Today

There are differences between relational and document databases today:

- Fault tolerance properties
- Handling of concurrency
- This part will inspect the data model differences

Document model provides:

- Better flexibility
- Better performance due to locality
- Closer data model to the application data structures

Relational model provides:

- Better support for joins
- Many-to-one and many-to-many relationships

#### Which data model leads to simpler application code?

If our app data has document like structure, tree of one-to-many relationships, where typically the entire tree is loaded at once. Then it is a good idea to use a document model.

The relational technique of shredding, splitting a document into multiple tables can lead to cumbersome schemas and unnecessary complicated application code.

Document model has limitations, you cannot refer directly to a nested item within a document. This is not an issue as long as documents are not too deeply nested.

Poor support of joins in a document model may or may not be a problem, it depends on the application.

If you applications uses many-to-many relationships, it is a good idea to use a relational model. The document model becomes less appealing.

It is possible to reduce the need for joins by denormalizing the data, but it is a trade-off. Joins can be emulated in application code, but it is not as efficient as in a relational database. I will be slower and more complex.

For highly interconnected data:

- Document model is awkward
- Relational model is acceptable
- Graph model is the most natural

#### Schema flexibility in the document model

Most document databases, and the JSON support in relational databases, are schemaless. They do not enforce any schema on the data in documents. XML support in relational databases usually comes with the optional schema validation.

No schema means that arbitrary keys and values can be added to a document, and when reading, clients have no guarantee as to what fields the documents may contain.

Document databases are sometimes called schemaless, but this is misleading.

The database still has an implicit schema, but it is not enforced by the database.

More accurate term is schema-on-read. It means that the schema is not enforced when writing, only when reading the data.

Other option is schema-on-write. It means that the schema is enforced when writing data. Relational databases use schema-on-write.

Schema-on-read is similar to dynamic (runtime) type checking in programming languages, and schema-on-write is similar to static (compile-time) type checking.

Schema changes have a bed reputation of being slow and requiring downtime. This reputation is not entirely deserved. Most relational databases can run ALTER TABLE statement in few milliseconds or seconds.

- If we have many different types of objects, and it is not practical to define a table for each type, then a document model is a good fit.

- The structure of the data is determined by external systems over which you have no control and which may change over time, then a document model is a good fit.

In these cases schema will hurt you more than it helps.

#### Data locality for queries
