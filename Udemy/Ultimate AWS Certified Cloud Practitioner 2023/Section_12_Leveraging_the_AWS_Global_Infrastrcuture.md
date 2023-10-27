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


