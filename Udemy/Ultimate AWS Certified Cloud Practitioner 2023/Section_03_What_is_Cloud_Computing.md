# Ultimate AWS Certified Cloud Practitioner 2023

## Section 03 - What is Cloud Computing?

We will use the network to access a server/resource, website. For addressing we will use IP addresses. Clients and server owns an IP address.

What is server composed of?

- Compute: CPU
- Memory: RAM
- Storage: Data
- Database: Store data in a structured way
- Network: Routers, switch, DNS server

IT Terminology

- Network: Cables, routers and servers connected with each other.
- Router: A networking device that forwards data packets between computer networks. They know where to send your packets on the internet.
- Switch: Takes a packet and send it to the correct server/client on your network.

Traditional IT infrastructure requires physical servers, storage and network. This equipment requires a lot of maintenance.

- Pay for rent for the data center
- Pay for power supply, cooling, maintenance
- Adding and replacing hardware takes time
- Scaling is limited
- Hire 24/7 team to monitor the infrastructure
- Requires disaster recovery

Can we externalize the this? > CLOUD

### What is Cloud Computing?

- Cloud computing us the on-demand delivery of compute power, database storage, applications, and other IT resources.
- Through a cloud services platform with pay-as-you-go pricing.
- You can provision exactly the right type and size on computing resources you need.
- You can access as many resources as you need, almost instantly.
- Simple way to access servers, storage, databases and a set of application services.
- Amazon Web Services owns and maintains the network-connected hardware required for these application services, while you provision and use what you need via a web application.

Gmail, Dropbox, Netflix, Facebook, Instagram, Twitter, etc. are all cloud services.

The Deployment Models of the Cloud

- Private Cloud: Rackspace
  - Cloud services used by a single organization, not exposed to the public.
  - Complete control.
  - Security for sensitive applications.
  - Meet specific business needs.
- Public Cloud: Azure, AWS, GCP
  - Cloud resources owned and operated by a third-party cloud service provider delivered over the Internet.
  - Six advantages of public cloud:
    - No upfront infrastructure investment.
    - Pay for what you use.
    - Easily scale up or down.
    - No need to maintain hardware.
    - Global in minutes.
    - Focus on your core business.
- Hybrid Cloud: 
  - Keeps some servers on premises and extend some capabilities to the cloud.
  - Control over sensitive assets in your private infrastructure.
  - Flexibility and cost-effectiveness of the public cloud.

The Five Characteristics of Cloud Computing:

- On-demand self-service: Users can provision resources and use them without human interaction from the service provider.
- Broad network access: Resources available over the network, and can be accessed by diverse client platforms.
- Multi-tenancy and resource pooling:
  - Multiple customers share the same physical resources, while still being logically separated.
  - Multiple customers are serviced from the same physical resources.
- Rapid elasticity and scalability:
  - Automatically and quickly acquire and dispose resources when needed.
  - Quickly and easily scale based on demand.
- Measured service:
  - Usage is measured, users pay correctly for what they have used.

Six Advantages of Cloud Computing:

- Trade capital expense (CAPEX) for operational expense (OPEX).
  - Pay On-Demand: Don't own hardware
  - Reduced Total Cost of Ownership (TCO) & Operational Expense (OPEX)
- Benefit from massive economies of scale.
  - Prices are reduced as AWS is more efficient due to large scale.
- Stop guessing capacity
  - Scale based on actual measured usage.
- Increase speed and agility.
- Stop spending money running and maintaining data centers.
- Go global in minutes: leverage the AWS global infrastructure.

Problems solved by the Cloud

- Flexibility: Change resource types when needed
- Cost-Effectiveness: Pay as you go, for what you use
- Scalability: Accommodate larger loads by making hardware stronger or adding additional nodes.
- Elasticity: Ability to scale out and scale-in when needed
- High-availability and fault-tolerance: Build across data centers
- Agility: Rapidly develop, test and launch software applications

### The Different Types of Cloud Computing

Types of Cloud Computing:

- Infrastructure as a Service (IaaS)
  - Provides building blocks for cloud IT.
  - Provides networking, computers, data storage space.
  - Highest level of flexibility.
  - Easy parallel with traditional on-premises IT.
- Platform as a Service (PaaS)
  - Removes the need for your organization to manage the underlying infrastructure.
  - Focus on the deployment and management of your applications.
- Software as a Service (SaaS)
  - Completed product that is run and managed by the service provider.

Managed by you:

- On-premise
  - Applications
  - Data
  - Runtime
  - Middleware
  - O/S
  - Virtualization
  - Servers
  - Storage
  - Networking
- IaaS
  - Applications
  - Data
  - Runtime
  - Middleware
  - O/S
- PaaS
  - Applications
  - Data
- SaaS
  - None

Example of Cloud Computing Types

- Infrastucture as a Service (IaaS)
  - Amazon EC2
  - GCP, Azure, RaskSpace, DigitalOcean, Linode
- Platform as a Service (PaaS)
  - AWS Elastic Beanstalk
  - Heroku, Google App Engine (CGP), Windows Azure (Microsoft)
- Software as a Service (SaaS)
  - Many AWS services (ex: Rekognition for Machine Learning)
  - Google Apps, Dropbox, Zoom

Pricing of the Cloud - Quick Overview

- AWS has 3 pricing fundamentals, following the pay-as-you-go pricing model.
- Compute: Pay for the compute time you consume.
- Storage: Pay for the amount of data you store.
- Data Transfer OUT: Pay for the amount of data you transfer out of AWS.

### AWS Cloud Overview

