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

RDS Deployments: Multi-Region

Multi-Region (Read Replicas)

- Disaster recovery in case of region issue
- Local performance for global reads
- Replication cost

### ElastiCache Overview

- The same way RDS is to get managed relational databases
- ElastiCache is to get managed Redis or Memcached
- Caches are in-memory databases with high performance, low latency
- Helps reduce load off databases for read intensive workloads
- AWS takes care of OS maintenance / patching, optimizations, setup, configuration, monitoring, failure recovery and backups

ElastiCache Solution Architecture - Cache

We can lift read load off our RDS database by using ElastiCache. ElastiCache could provide fast read / write access to our application. It can relieve pressure from the main database.

### DynamoDB Overview

- Fully managed highly available with replication across 3 AZ
- NoSQL database - not a relational database
- Scales to massive workloads, distributed "serverless" database
- Millions of requests per seconds, trillions of rows, 100s of TB of storage
- Fast and consistent in performance - low latency retrieval
- Integrated with IAM for security, authorization and administration
- Low cost and auto scaling capabilities
- Standard and Infrequent Access (IA) Table Class

DynamoDB is a key/value database

- Primary key: Partition key and Sort key
- Attributes: Custom attributes

DynamoDB Accelerator - DAX

- Fully Managed in-memory cache for DynamoDB
- 10x performance improvement - single digit millisecond latency to microseconds latency - when accessing your DynamoDB tables
- Secure, highly scalable, highly available
- Difference with ElasticCache at the CCP level: DAX is only used for and is integrated with DynamoDB, while ElastiCache can be used for other databases

### DynamoDB Hands On

- Table name: DemoTable
- Partition key: user_id
- We can add items to this table
- Delete table

### DynamoDB Global Tables

- Make a DynamoDB table accessible with low latency in multiple-regions.
- Active-Active replication, read/write to any AWS Region.

Users can use a DynamoDB table in the US and in Europe and the data will be replicated between the two regions.

### Redshift Overview

- Redshift is based on PostgreSQL, but it is not used for OLTP (Online Transaction Processing)
- It is OLAP (Online Analytical Processing) - used for Business Intelligence / Data Warehousing
- Load data once every hour, not every second
- 10x better performance than other data warehouses, scale PBs of data
- Columnar storage of data (instead of row based)
- Massively Parallel Query Execution (MPP) - highly available
- Pay as you go based on the instances provisioned
- Has a SQL interface for performing queries
- BI tools such as AWS Quicksight or Tableau integrate with Redshift

### Amazon EMR

- EMR = Elastic MapReduce
- EMR helps create Hadoop clusters (big data) to analyze and process vast amounts of data
- The clusters can be made of hundreds of EC2 instances
- Also supports Apache Spark, HBase, Presto, Flink...
- EMR takes care of all the provisioning and configuration
- Auto-scaling and integrated with Spot instances
- Use cases: data processing, machine learning, web indexing, big data

### Amazon Athena

- Serverless query service to perform analytics directly on S3 objects
- Uses standard SQL language to query the files
- Supports CSV, JSON, ORC, Avro, and Parquet files (built on Presto)
- Pricing $5 per TB of data scanned
- Use compressed or columnar data for cost savings (less scan)
- Use cases: Business intelligence / analytics / reporting, analyze AWS Cost and Usage reports, query VPC Flow Logs, query CloudTrail logs, etc.

Exam Tip: analyze data in S3 using serverless SQL, use Athena

### Amazon QuickSight

- Serverless machine learning-powered business intelligence service to create interactive dashboards from various data sources
- Fast, automatically scalable, embeddable, with per-session pricing
- Use cases:
  - Business analytics
  - Building visualizations
  - Perform ad-hoc analysis
  - Get business insights using data
- Integrated with RDS, Aurora, Athena, Redshift, S3

### DocumentDB

- Aurora is an "AWS-implementation" of MySQL and PostgreSQL
- DocumentDB is the same for MongoDB (which is a NoSQL database)
- MongoDB is used to store, query, and index JSON data
- Similar "deployment concepts" as Aurora
- Fully Managed, highly available with replication across 3 AZ
- DocumentDB storage automatically grows in increments of 10GB, up to 64TB
- Automatically scales to workloads with millions of requests per seconds

### Amazon Neptune

- Fully managed graph database
- A popular graph dataset would be a social network
  - Users have friends
  - Posts have comments
  - Comments have likes from users
  - Users share and like posts
- Highly available across 3 AZ, with up to 15 read replicas
- Build and run applications working with highly connected datasets - optimized for these complex and hard queries
- Can store up to billions of relations and query the graph with milliseconds latency
- Highly available with replications across multiple AZs
- Great for knowledge graphs (Wikipedia), fraud detection, social networking, recommendation engines, social networking

### Amazon QLDB

