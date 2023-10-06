# Ultimate AWS Certified Cloud Practitioner 2023

## Section 07 - ELB & ASG - Elastic Load Balancing & Auto Scaling Groups

### High Availability, Scalability, Elasticity

Scalability and High Availability

- Scalability means that an application/system can handle greater loads by adapting
- There are two kinds of scalability
  - Vertical Scalability
  - Horizontal Scalability (elasticity)
- Scalability is linked but different to High Availability

Let's use a call center example.

Vertical Scalability

- Vertical Scalability means increasing the size of the instance
- For example, your application runs on a t2.micro
- Scaling that application vertically means running it on a t2.large
- Vertical scalability is very common for non distributed systems, such as a database
- There is usually a limit to how much you can vertically scale (hardware limit)

For call center example it means:

- Junior Operator > Senior Operator switch

Horizontal Scalability

- Horizontal Scalability means increasing the number of instances/systems for your application
- Horizontal scaling implies distributed systems
- This is very common for web applications / modern applications
- It's easy to horizontally scale thanks to the cloud offerings such as Amazon EC2

For call center example it means:

- 10 x Junior Operator > 20 x Junior Operator switch

High Availability

- High availability usually goes hand in hand with horizontal scaling
- High availability means running your application/system across multiple AZ's, at least 2 Availability Zones
- The goal of high availability is to survive a data center loss (disaster)

High Availability vs Scalability for EC2

- Vertical Scaling: Increase instance size (scale up/down)
  - From: t2.nano (1 vCPU, 0.5 GB RAM)
  - To: u-12tb1.metal (448 vCPU, 24 TB RAM)

- Horizontal Scaling: Increase number of instances (scale out/in)
  - Auto Scaling Group
  - Load Balancer

- High Availability: Run instances across multiple AZ's
  - Auto Scaling Group multi AZ
  - Load Balancer multi AZ


