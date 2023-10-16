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

Advantages over using RDS versus deploying DB on EC2

- RDS is a managed service
  - Automated provisioning, OS patching
  - Continuous backups and restore to specific timestamp (Point in Time Restore)
  - Monitoring dashboards
  - Read replicas for improved read performance
  - Multi AZ setup for DR (Disaster Recovery)
  - Maintenance windows for upgrades
  - Scaling capability (vertical and horizontal)
  - Storage backed by EBS (gp2 or io1)
- BUT you cannot SSH into your instances

RDS Solutions Architecture

In our case we can create a scenario where we have a web application that has a Elastic Load Balancer and an Auto Scaling Group. The Auto Scaling Group will have EC2 instances that will be connected to a RDS instance. The RDS instance will have a Multi-AZ setup and will have a Read Replica.

Amazon Aurora

- Aurora is a proprietary technology from AWS (not open sourced)
- PostgreSQL and MySQL are both supported as Aurora DB (that means your drivers will work as if Aurora was a Postgres or MySQL database)
- Aurora is "AWS cloud optimized" and claims 5x performance improvement over MySQL on RDS, over 3x the performance of Postgres on RDS
- Aurora storage automatically grows in increments of 10GB, up to 128TB
- Aurora costs more than RDS (20% more) - but is more efficient
- Not in the free tier

### RDS Hands On

We will create a database from RDS > Create database.

- For hands on case we will start with standard create
- We wil select MySQL, community edition
- Templates > Free tier
- We will set a password
- For free tier we will use t2.micro
- We will enable public access
- We will set a nre security group: demo-database-rds

After creating the DB we can take snapshots. Delete the DB and snapshot later.

### RDS Deployments: Read Replicas Multi-AZ

- Read replicas:
  - Scale the read workload of your DB
  - Can create up to 15 read replicas
  - Data is only written to the main DB
  - Application(s) can read from multiple replicas, but only can write to the main DB

- Multi AZ (Disaster Recovery):
  - Failover in case of AZ outage (high availability)
  - Data in only read/written to the main database
  - Can only have 1 other AZ as failover 
