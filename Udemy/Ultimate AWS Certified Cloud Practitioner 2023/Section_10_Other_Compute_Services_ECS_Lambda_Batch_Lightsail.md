# Ultimate AWS Certified Cloud Practitioner 2023

## Section 10 Other Compute Services: ECS, Lambda, Batch Lightsail

What is Docker?

- Docker is a software development platform to deploy apps
- Apps are packed in containers that can be run on any OS
- Apps run the same, regardless of where they're run
  - Any machine
  - No compatibility issues
  - Predictable behavior
  - Less work
  - Easier to maintain and deploy
  - Works with any language, any OS, any technology
- Scale containers up and down very quickly (seconds)

Docker on an OS: If we can package our app with its dependencies into a container, we can run it on any OS that supports Docker.

Where Docker images are stored?

- Docker images are stored in Docker Repositories
- Public: Docker Hub (hub.docker.com)
  - Find base images for many technologies or OS:
  - Ubuntu, MySQL, Java, Node.js, etc.
- Private: Amazon ECR (Elastic Container Registry)

Docker versus Virtual Machines

- Docker is "sort of" a virtualization technology, but not exactly
- Resources are shared with the host => many containers on one server

### ECS, Fargate and ECR Overview

- ECS = Elastic Container Service
- Launch Docker containers on AWS
- You must provision and maintain the infrastructure (EC2 instances)
- AWS takes care of starting / stopping containers
- Has integrations with the Application Load Balancer

Fargate

- Launch Docker containers on AWS
- You do not provision (no EC2 instances to manage) - simpler
- Serverless offering
- AWS just runs containers for you based on the CPU / RAM you need

ECR

- Elastic Container Registry
- Private Docker Registry on AWS
- This is where you store your Docker images so they can be run by ECS or Fargate

### Serverless Introduction

- Serverless is a new paradigm in which the developers do not have to manage servers anymore
- They just deploy functions
- Initially Serverless == FaaS (Function as a Service)
- Serverless was pioneered by AWS Lambda but now also includes anything that's manages: "databases, messaging, storage," etc.
- Serverless doesn't mean there are no servers, it means you don't manage / provision / see them

Some examples of Serverless services:

- Amazon S3
- DynamoDB
- Fargate
- Lambda (piooneer of the Serverless movement)

### Lambda Overview

Why AWS Lambda?

- Amazon EC2
  - Virtual Servers in the Cloud
  - Limited by RAM and CPU
  - Continuously running
  - Scaling means intervention to add / remove servers

- Amazon Lambda
  - Virtual functions - no servers to manage
  - Limited by time - short executions
  - Run on-demand
  - Scaling is automated

Benefits of AWS Lambda

- Easy pricing
  - Pay per request and compute time
  - Free tier of 1.000.000 AWS Lambda requests and 400.000 GB-seconds of compute time per month
- Integrated with the whole AWS suite of services
- Event-Driven: functions get invoked by AWS when needed
- Integrated with many programming languages
- Easy monitoring through AWS CloudWatch
- Easy to get more resources per functions (up to 10 GB of RAM)
- Increasing RAM will also improve CPU and network

AWS Lambda language support:

- Node.js (JavaScript)
- Python
- Java (Java 8 compatible)
- C# (.NET Core)
- Golang
- C# (PowerShell)
- Ruby
- Custom Runtime API (Community supported, example Rust)

- Lambda Container Image
  - The container image must implement Lambda Runtime API
  - ECS / Fargate is preferred for running arbitrary Docker images

Example: Serverless Thumbnail creation

- User uploads an image to S3
- S3 triggers a Lambda function
- Lambda function creates a 50x50 thumbnail of the image, and puts it in another S3 bucket
- Also pushes metadata to DynamoDB

Example: Serverless CRON job

- CloudWatch Events Event Bridge can be used to trigger Lambda functions on a schedule

AWS Lambda Pricing: example

- Pay per calls:
  - First 1.000.000 calls are free
  - Then $0.20 per 1.000.000 calls
- Pay per duration: (in increment of 1 ms)
  - 400.000 GB-seconds of compute time per month is FREE
  - 4000.000 seconds if function uses 1 GB of RAM
  - 3.200.000 seconds if function is 128 MB of RAM
  - After that $1.00 for 600.000 GB-seconds

It is usually very cheap to run AWS Lambda so it's very popular

### Lambda Hands On


