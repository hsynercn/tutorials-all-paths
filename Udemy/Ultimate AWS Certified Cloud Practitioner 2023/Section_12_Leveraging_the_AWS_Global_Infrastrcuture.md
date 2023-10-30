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

- CloudFront is a Content Delivery Network (CDN)
- Improves read performance, content is cached at the edge
- Improves user experience
- 216 Point of Presence globally (edge locations)
- DDoS protection, integration with Shield, AWS Web Application Firewall

CloudFront Origins:

- S3 bucket
  - For distributing files and caching them at the edge
  - Enhanced security with CloudFront Origin Access Control (OAC)
  - OAC is replacing Origin Access Identity (OAI)
  - CloudFront can be used as an ingress (to upload files to S3)
- Custom Origin (HTTP)
  - Application Load Balancer
  - EC2 instance
  - S3 website (must first enable the bucket as a static S3 website)
  - Any HTTP backend you want

CloudFront at a high level:

- Client makes a request to CloudFront
- If CloudFront does not have the file cached, it will forward the request to the origin S3 or HTTP
- The origin will send the file back to CloudFront, which will cache the file and send it back to the client

CloudFront vs S3 Cross Region Replication

- CloudFront
  - Global Edge network, global service
  - Files are cached for a TTL (maybe a day)
  - Great for static content that must be available everywhere
- S3 Cross Region Replication
  - Must be setup for each region you want replication to happen
  - Files are updated in near real-time
  - Read only
  - Great for dynamic content that needs to be available at low-latency in few regions

### S3 Transfer Acceleration

- Increase transfer speed by transferring file to an AWS edge location which will forward the data to the S3 bucket in the target region

We can test the speed of the transfer acceleration from this [link](https://s3-accelerate-speedtest.s3-accelerate.amazonaws.com/en/accelerate-speed-comparsion.html).

### AWS Global Accelerator

