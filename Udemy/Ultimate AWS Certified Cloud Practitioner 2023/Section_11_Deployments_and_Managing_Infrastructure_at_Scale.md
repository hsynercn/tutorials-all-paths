# Ultimate AWS Certified Cloud Practitioner 2023

## Section 11 Deployments and Managing Infrastructure at Scale

What is CloudFormation

- CloudFormation is a declarative way of outlining your AWS Infrastructure, for any resources (most of them are supported)
- For example, within a CloudFormation template, you say:
  - I want a security group
  - Want two EC2 instances using this security group
  - I want a S3 bucket
  - I want a load balancer (ELB) in front of these machines

Then the CloudFormation creates those for you, in the right order, with the exact configuration that you specify.

Benefits of CloudFormation

- Infrastructure as code
  - No resources are manually created, which is excellent for control
  - Changes to the insfrastructure are reviewed through code

- Cost
  - Each resources within the stack is tagged with an identifier so you can easily see how much a stack costs you
  - You can estimate the costs of your resources using the CloudFormation template
  - Savings strategy: In dev, you could automation deletion of templates at 5 PM and recreated at 8 AM safely

- Productivity
  - Ability to destroy and re-create an infrastructure on the cloud on the fly
  - Automated generation of Diagram for your templates!
  - Declarative programming (no need to figure out ordering and orchestration)

- Don't reinvent the wheel
  - Leverage existing templates on the web
  - Leverage the documentation

- Supports (almost) all AWS resources
  - Everything in the course is supported
  - You can use "custom resources" for resources that are not supported

CloudFormation Stack Designer

- Example: WordPress CloudFormation Stack
- We can see all the resources
- We can see the relations between the components

### CloudFormation Hands On

Go to us-east-1, otherwise you will not be able to create a CloudFormation stack.

- We will create a stack and use the 0-just-ec2.yaml for source.
- We can check the resources from the designer.

AFter submit we can see it is creating the stack and we can see the provided configuration.

After this step we can update the stack and select the 1-ec2-wit-sg-eip.yaml. After we set a name for security group we can see the change set of the stack.

During the changes AWs will handle the resource deletion and creation process in the background.

### CDK Overview

AWS Cloud Development Kit (CDK)

- Define your cloud infrastructure using a familiar programming language
  - JavaScript, TypeScript, Python, Java, C#
- The code is "compiled" into CloudFormation template (JSON/YAML)
- You can therefore deploy infrastructure and application runtime code together
  - Great for Lambda functions
  - Great for Docker containers ECS / EKS

### Beanstalk Overview

Developer problems on AWS

- Managing infrastructure
- Deploying Code
- Configuring all the databases, load balancers
- Configuring all the databases, load balancers, etc
- Scaling concerns
- Most web apps have the same architecture (ALB + ASG)
- Possibly, consistently across different applications and environments

AWS Elastic Beanstalk

- Elastic Beanstalk is a developer centric view of deploying an application on AWS
- It uses all components we've seen before: EC2, ASG, ELB, RDS, etc.
- But it's all in one view that's easy to make sense of!
- We still have full control over the configuration
- Beanstalk = Platform as a Service (PaaS)
- Beanstalk is free but you pay for the underlying instances

Elastic Beanstalk

- Managed service
  - Instance configuration / OS is handled by Beanstalk
  - Deployment strategy is configurable but performed by Elastic Beanstalk
  - Capacity provisioning
  - Load balancing and auto-scaling
  - Application health-monitoring and responsiveness
- Just the application code is the responsibility of the developer

Three architecture models

- Single instance deployment: good for dev
- LB + ASG: great for production or pre-production web applications
- ASG only: great for non-web apps in production (workers, etc)

Beastalk supports:

- Go
- Java SE
- Java with Tomcat
- .NET on Windows Server with IIS
- Node.js
- PHP
- Python
- Ruby
- Packer Builder
- Single Container Docker
- Multi container Docker
- If not supported, you can write your custom platform (advanced)

Beanstalk supports health monitoring.

### Beanstalk Hands On


