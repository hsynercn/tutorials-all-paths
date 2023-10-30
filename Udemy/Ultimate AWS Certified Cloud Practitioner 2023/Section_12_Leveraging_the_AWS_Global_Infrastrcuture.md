# Ultimate AWS Certified Cloud Practitioner 2023

## Section 12 Leveraging the AWS Global Infrastructure

### Why Global Applications?

- A global application is an application that is deployed in multiple regions around the world
- On AWS: this could be Regions and / or Edge Locations
- Decreased latency:
  - Latency is the time it takes for a network packet to reach a server
  - It takes time for a packet from Asia to reach the US
  - Deploy your applications closer to your users to decrease latency, better experience
- Disaster Recovery (DR)
  - If an AWS region goes down (earthquake, hurricane, etc...)
  - You can fail-over to another region and have your application still working
  - A DR plan is important to increase the availability of your application
- Attack protection: distributed global infrastructure is harder to attack

Global AWS Infrastructure:

- Regions: For deploying application and infrastructure
- Availability Zones (AZ): Made of multiple data centers, for high availability
- Edge Locations: For content delivery as close as possible to users

Every region has at multiple AZs.

Global Applications in AWS

- Global DNS: Route 53
  - Great to router users to the closest deployment with least latency
  - Great for disaster recovery strategies
- Global Content Delivery Network (CDN): CloudFront
  - Replicate part of your application to AWS Edge Locations to decrease latency
  - Cache common requests, improved user experience and decreased latency
- S3 Transfer Acceleration
  - Accelerate global uploads and downloads into Amazon S3
- AWS Global Accelerator
  - Improve global application availability and performance using the AWS global network

### Route 53 Overview

It is a important service for global application deployment.

- Route53 is a Managed DNS (Domain Name System)
- DNS is a collection of rules and records which helps clients understand how to reach a server through URLs

- In AWS the most common records are:
  - A: URL to IPv4
  - AAAA: URL to IPv6
  - CNAME: URL to URL
  - Alias: URL to AWS resource

Basic flow:

- Web browser makes a DNS request for "myapp.mydomain.com"
- Route53 responds with the IP address of the web server
- Web browser makes the HTTP request to the web server using the IP
- Web server responds

We need to know routing policies at a high-level.

Route 53 Routing Policies:

- Simple Routing Policy
  - Use when you need to redirect to a single resource
  - No health checks
- Weighted Routing Policy
  - Control the % of the requests that go to specific endpoints, acts like a load balancer
  - Can use health checks
- Latency Routing Policy
  - Redirect to the server that has the least latency close to us
- Failover Routing Policy
  - Route traffic only to the healthy endpoint

### Route 53 Hands On

- Create a registered domain name
- We can see the domain under hosted zones
- Create a EC2 instance with a simple web page
- Create a record set for the domain name
- We can see the web page when we go to the domain name

### CloudFront Overview

