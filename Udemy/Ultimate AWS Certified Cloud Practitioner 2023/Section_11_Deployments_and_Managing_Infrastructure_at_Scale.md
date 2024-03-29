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

- Creation process will ask about environment:
  - Web server environment
  - Worker environment
- Set "MyApplication" as application name
- Set "MyApplication-dev" as environment name
- Select Node.js as platform
- Select sample application
- Use single instance

Under service access:

- Select "Create and use new service role"
- Go to IAM , create a new role with
  - AWSElasticBeanstalkWebTier
  - AWSElasticBeanstalkWorkerTier
  - AWSElasticBeanstalkMulticontainerDocker
- Set "aws-elasticbeanstalk-ec2-role" as role name

After role creation select new role for service role and create Beanstalk app with skipping other steps.

### AWS Code Deploy

- We want to deploy our application automatically
- Works with EC2 instances
- Works with On-Premises servers
- It is a hybrid service
- Servers / Instances must be provisioned and configured ahead of time the CodeDeploy Agent

### CodeCommit Overview

- Before pushing the application code to servers, it needs to be stored somewhere
- Developers usually store code in a repository, using the Git technology (e.g. GitHub)
- A common public offering is GitHub, AWS' competing product is CodeCommit

- CodeCommit:
  - Source-control service that hosts Git-based repositories
  - Makes it easy to collaborate with others on code
  - The code changes are automatically versioned

- Benefits
  - Fully manages
  - Scalable and highly available
  - Private, Secured, Integrated with AWS

### AWS CodeBuild

- Code building service in the cloud
- Compiles source code, run tests, and produces packages that are ready to be deployed (by CodeDeploy) for example)
- Benefits:
  - Fully manages, serverless
  - Continuous scaling and highly available
  - Secure
  - Pay-as-you-go pricing - only pay for the build time

### AWS CodePipeline

- Orchestrate the different steps to have the code automatically pushed to production
  - Code > Build > Test > Provision > Deploy
  - Basis for CICD (Continuous Integration and Continuous Delivery)
- Benefits:
  - Fully managed, compatible with CodeCommit, CodeBuild, CodeDeploy, GitHub, 3rd party Git services
  - Fast delivery and rapid updates

### AWS CodeArtifact

- Software packages depend on each other to be built and new ones are created
- Storing and retrieving these dependencies is called artifact management
- Traditionally you need to setup your own artifact management system
- CodeArtifact is a secure, scalable, and cost-effective artifact management service
- Works with common dependency management tools such as Maven, Gradle, npm, yarn, twine, pip, and NuGet
- Developers and CodeBuild can retrieve these artifacts from CodeArtifact

### AWS CodeStar

- Unified UI to easily manage software development activities in one place
- "Quick way" to get started to correctly set up CodeCommit, CodePipeline, CodeBuild, CodeDeploy, Elastic Beanstalk, EC2
- Can edit the code "in the cloud" with AWS Cloud9

### AWS Cloud9

- AWS Cloud9 is a cloud-based IDE for writing, running, and debugging code
- "Classic" IDE (like IntelliJ, VS Code, etc...) are downloaded on a computer before being used
- A cloud IDE can be used within a web browser, meaning you can work on your projects from anywhere
- AWS Cloud9 is also allows for code collaboration in real-time

### CodeStar and Cloud9 Hands On

If we search for CodeCommit we can see several functions.

But for a better experience we can use CodeStar.

- Go to CodeStar start a new project
- Select Python (Flask) with AWS Elastic Beanstalk
- Use "DemoProject" as project name
- Create a dummy key pair
- Create a new role for CodeStar

After the creation we can see the project dashboard. We can initialize a Cloud9 environment and check the code. If we edit and commit the code we can see the changes in the CodeCommit.

After the hands on part we can delete the project from CodeStar > Projects.

### System Manager (SSM) Overview

- Helps you manage your EC2 and On-Premises systems at scale
- Another Hybrid AWS service
- Get operational insights about the state of your infrastructure
- Suite of 10+ products
- Most important features are:
  - Patching automation for enhanced compliance
  - Run commands across an entire fleet of servers
  - Store parameter configuration with SSM Parameter Store
- Works for Linux, Windows, MacOS, and Raspberry Pi OS

How System Manager works:

- We need to install the SSM agent onto the systems we control
- Installed by default on Amazon Linux AMI and some Ubuntu AMI
- If an instance can't be controlled with SSM, it's probably an issue with the SSM agent
- Thanks to the SSM agent, we can run commands, path and configure our server

### SSM Session Manager

- Allows you to start a secure shell on your EC2 and on-premises servers
- No SSH access, bastion hosts, or SSH keys needed
- No port 22 needed (better security)
- Supports Linux, macOS, and Windows
- Send session log data to S3 or CloudWatch Logs

### SSM Parameter Store

- Secure storage for configuration and secrets
- API keys, passwords, DB connection strings, etc...
- Serverless, scalable, durable, easy SDK
- Control access permissions using IAM
- version tracking and encryption (optional)

### OpsWorks Overview

- Chef and Puppet help you perform server configuration automatically, or repetitive actions
- They work great with EC2 and on-premises VM
- AWS OpsWorks = Managed Chef and Puppet
- It's an alternative to AWS SSM
- Only provision standard AWS resources
  - EC2 instances, Databases, Load Balancers, EBS volumes

IMPORTANT: In the exam if Chef or Puppet needed => AWS OpsWorks

### Deployment Summary

- CloudFormation: (AWS only)
  - Infrastructure as code, works with almost all of AWS resources
  - Repeat across Regions and Accounts
- Beanstalk (AWS only)
  - Platform as a Service (PaaS), limited to certain programming languages or Docker
  - Deploy code consistently with a known architecture: ALB + EC2 + RDS
- CodeDeploy (hybrid): deploy and upgrade any application onto servers
- Systems Manager (hybrid): patch, configure and run commands at scale
- OpsWorks (hybrid): managed Chef and Puppet in AWS

### Developer Services

- CodeCommit: Store code in private git repository (version controlled)
- CodeBuild: Build and test code in AWS
- CodeDeploy: Deploy code onto servers
- CodePipeline: Orchestration of pipeline (from code to build to deploy)
- CodeArtifact: Store software packages / dependencies on AWS
- CodeStar: Unified view for allowing developers to do CICD and code
- Cloud9: Cloud IDE (Integrated Development Environment) with collaboration features
- AWS CDK: Define your cloud infrastructure using a familiar programming language
