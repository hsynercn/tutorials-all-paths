# Ultimate AWS Certified Cloud Practitioner 2023

## Section 09 - Databases and Analytics

### Database Introduction

- Storing data on disk can have its limitations
  - EFS (Elastic File System)
  - EBS (Elastic Block Store)
  - EC2 Instance Store
  - S3
- In some cases we need to store data in a database
- We can structure the data
- We can build indexes to efficiently query/search the data
- We can define relationships between datasets

Databases are optimized for a purpose and come with different features, shapes and constraints.

Relational Databases

- looks like excel spreadsheets
- We use relations between tables
- Can use the SQL language to perform queries / lookups

NoSQL Databases

- NoSQL = non relational
- NoSQL databases are purpose built for specific data models and have flexible schemas for building modern applications
- Benefits:
  - Flexibility: easy to evolve data model
  - Scalability: designed to scale out by using distributed clusters
  - High performance: optimized for a specific data model and use case
  - Highly functional: built-in functions to perform complex queries

Examples: Key-value, document, graph, in-memory, search databases

NoSQL data example: JSON

- JSON = JavaScript Object Notation
- Json is a common dorm of data that fits into a NoSQL database
- Data can be nested
- Fields can change over time
- Support for new types: arrays etc.

```json
{
  "name": "John",
  "age": 30,
  "cars": [
    {
      "name": "Ford",
      "models": ["Fiesta", "Focus", "Mustang"]
    },
    {
      "name": "BMW",
      "models": ["320", "X3", "X5"]
    },
    {
      "name": "Fiat",
      "models": ["500", "Panda"]
    }
  ]
}
```

Databases and Shared Responsibility on AWS

- AWS offers use to manage different types of databases
- Benefits include:
  - Quick Provisioning, High Availability, Vertical and Horizontal Scaling
  - Automated Backup & Restore, Operations, Upgrades
  - OS Patching is handled by AWS
  - Monitoring, alerting

NOTE: Many database technologies could be run on EC2, but you must handle yourself the resiliency, backup, patching, high availability, fault tolerance, scaling, etc.

### RDS & Aurora Overview

- RDS stands for Relational Database Service
- It's managed DB service for DB use SQL as a query language
- It allows you to create databases in the cloud that are managed by AWS
  - Postgres
  - MySQL
  - MariaDB
  - Oracle
  - Microsoft SQL Server
  - Aurora (AWS Proprietary database)
