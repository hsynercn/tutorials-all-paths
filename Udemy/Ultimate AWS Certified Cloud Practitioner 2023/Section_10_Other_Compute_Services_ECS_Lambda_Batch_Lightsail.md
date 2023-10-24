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
