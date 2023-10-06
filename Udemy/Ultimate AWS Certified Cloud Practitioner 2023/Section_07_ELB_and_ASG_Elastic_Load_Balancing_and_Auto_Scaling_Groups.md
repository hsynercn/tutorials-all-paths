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

### Elastic Load Balancer (ELB) Overview

- Load Balancers are servers that forward internet traffic to multiple servers (EC2 Instances) downstream

Incoming traffic is distributed across multiple targets.

Why use a Load Balancer?

- Spread load across multiple downstream instances
- Expose a single point of access (DNS) to your application
- Seamlessly handle failures of downstream instances
- Do regular health checks to your instances
- Provide SSL termination (HTTPS) for your websites
- High availability across zones

An ELB (Elastic Load Balancer) is a managed load balancer

- AWS guarantees that it will be working
- AWS takes care of upgrades, maintenance, high availability
- AWS provides only a few configuration knobs

It costs less to setup your own load balancer but it will be a lot more effort on your end (maintenance, integrations)

4 types of load balancers offered by AWS:

- Application Load Balancer (HTTP / HTTPS only) - Layer 7
- Network Load Balancer (ultra-high performance, allows for TCP) - Layer 4
- Gateway Load Balancer - Layer 3
- Classic Load Balancer (RETIRED in 2023) - Layer 4 & 7

|Application Load Balancer|Network Load Balancer|Gateway Load Balancer|
|---|---|---|
|HTTP / HTTPS / gRPC protocols (Layer 7)|TCP / UDP protocols (Layer 4)|GENEVE Protocol on IP Packets (Layer 3)|
|HTTPS Routing features|High Performance: millions of request per seconds|Route Traffic to Firewalls that you manage on EC2 Instances|
|Static DNS (URL)|Static IP through Elastic IP|Intrusion detection|

### Application Load Balancer (ALB) Hands On

We need something to send traffic, so we will start with creating 2 EC2 instances. We will create 2 instances with below start script:

```bash
#!/bin/bash
# Use this for your user data (script from top to bottom)
# install httpd (Linux 2 version)
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Hello World from $(hostname -f)</h1>" > /var/www/html/index.html
```

Set the names as:

- My First Instance
- My Second Instance

We should see the Apache pages from the direct HTTP connections to EC2 instances. But we want to use single URL to access both instances.

We will create an Application Load Balancer (ALB) to distribute the traffic between instances. We can create a new ALB from EC2 > Load Balancers > Create Load Balancer:

- We will use "DemoALB" as name
- Select all mappings
- Create and select a new security group with HTTP traffic allowed from anywhere
- Create a target group with previously created instances, I will use "Include as pending below"

If we go to the ALB DNS name we should see the Apache pages from the instances, after several refreshes we should see the pages from both instances.





