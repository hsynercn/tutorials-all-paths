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

We can learn details from the begin [begin](https://us-east-2.console.aws.amazon.com/lambda/home?region=us-east-2#/begin) link.

- On this page we can try different languages to see execution results.
- We can see how to trigger Lambda functions.
- How cost is calculated.

We will create a Lambda function:

- Select use a blueprint
- Search for hello-world-python3
- Create function

After creation create a test event ant try it, we will see the duration time and logs.

We can change the settings of the function:

- Memory 128 MB to 10240 MB
- Timeout 1 sec to 15 min

### Amazon API Gateway

- Fully manages service for developers to easily create, publish, maintain, monitor, and secure APIs
- Serverless and scalable
- Supports RESTful APIs and WebSocket APIs
- Support for security, user authentication, API throttling, API keys, monitoring

Example: building a serverless API

- Client will send REST API calls to API Gateway
- API Gateway make PROXY REQUEST to Lambda
- Lambda executes the code and makes CRUD operation to DynamoDB

### Batch Overview

- Fully manages batch processing at any scale
- Efficiently run 100.000s of computing batch jobs on AWS
- A batch job is a job with a start and an end (opposed to continuous jobs)
- Batch will dynamically launch EC2 or Spot instances
- AWS Batch provisions the right amount of compute / memory
- You submit or schedule batch jobs and AWS Batch does the rest
- Batch jobs are defined as Docker images and run on ECS (Elastic Container Service)
- Helpful for cost optimizations and focusing less on the infrastructure

Batch vs Lambda

- Lambda:
  - Time limit
  - Limited runtimes
  - Limited temporary disk space
  - Serverless
- Batch:
  - No time limit
  - Any runtime as long as it's packages as a Docker image
  - Rely on EBS / instance store for disk space
  - Relies on EC2 (can be managed by AWS)

### Lightsail Overview

- Virtual servers, storage, databases, and networking
- Low and predictable pricing
- Simpler alternative to EC2, RDS, ELB, EBS, Route 53, etc.
- Great for people with less cloud experience
- Can setup notifications and monitoring of your Lightsail resources
- Use cases:
  - Simple web applications (has templates for LAMP, Nginx, MEAN, Node.js, etc.)
  - Websites (templates for WordPress, Magento, Plesk, Joomla, etc.)
  - Dev / Test environments
- Has high availability but no auto-scaling, limited AWS integrations

### Other ComputeS - Summary

- Docker: container technology to run applications
- ECS: run Docker containers on EC2 instances
- Fargate:
  - Run Docker containers without provisioning the infrastructure
  - Serverless offering (no EC2 instances)
- ECR: Private Docker Images Repository
- Batch: run batch jobs on AWS across manages EC2 instances
- Lightsail: predictable and lw pricing for simple application and DB stacks

Lambda Summary

- Lambda is Serverless, Functions as a Service (FaaS), seamless scaling, reactive
- Lambda Billing
  - By the time run x by the RAM provisioned
  - By the number of invocations
- Language Support: many programming languages except arbitrary Docker images
- Invocation time: up to 15 minutes
- Use cases:
  - Create Thumbnails for images uploaded onto S3
  - Run a Serverless cron job
- API Gateway: expose Lambda functions as HTTP API

