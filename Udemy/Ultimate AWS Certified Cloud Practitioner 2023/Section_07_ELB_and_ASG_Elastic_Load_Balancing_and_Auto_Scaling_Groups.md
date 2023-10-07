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

### Auto Scaling Groups (ASG) Overview

- In real life, the load on your websites and applications can change
- In the cloud (AWS) we can create and get rid of servers very quickly
- The goal of an Auto Scaling Group (ASG) is to:
  - Scale out (add EC2 instances) to match an increased load
  - Scale in (remove EC2 instances) to match a decreased load
  - Ensure we have a minimum and a maximum number of machines running
  - Automatically register new instances to a load balancer
  - Replace unhealthy instances
- Cost Savings: only run at an optimal capacity (principle of the cloud)

Our load balancer redirects traffic to our auto scaling group.

### Auto Scaling Groups (ASG) Hands On

We need to delete existing EC2 instances first.

After we can create a new Auto Scaling Group (ASG) from EC2 > Auto Scaling > Auto Scaling Groups > Create Auto Scaling Group:

- Use "DemoASG" as name
- Create launch template, "DemoLaunchTemplate"
  - Template will say ASG to how to create EC2 instances
  - We w,ll select Amazon Linux 2023 AMI
  - t2.micro as instance type
  - Select the existing security group "launch-wizard-1"
- After creating the launch template we can select it from the ASG creation page
- We will select 3 AZ and select subnets

In the next page we should see advanced settings.

- We will select the existing load balancer "demo-tg-alb"
- No VPC Lattice service
- Turn on Elastic Load Balancing health checks

Configure group size and scaling policies:

- Group size:
  - Desired capacity: 2
  - Minimum capacity: 1
  - Maximum capacity: 4

EC2 > Target groups > demo-tg-alb should display 2 healthy instances. If we cannot get the health status we can edit the health check options form settings and increase the interval and timeout durations.

### Auto Scaling Groups (ASG) Strategies

- Manual Scaling: Update the size of an ASG manually
- Dynamic Scaling: Respond to changing demand
  - Simple / Step Scaling
    - When a CloudWatch alarm triggered (example CPU > 70%), then add 2 units
    - When a CloudWatch alarm triggered (example CPU < 30%), then remove 1 unit
  - Target Tracking Scaling
    - Example target: average CPU usage across instances in ASG
  - Scheduled Scaling
    - Anticipate a scaling based on known usage patterns
    - Example: increase the min capacity to 10 at 5pm on Fridays
- Predictive Scaling
  - Uses machine learning to predict future traffic

### Section Cleanup

- First we need to delete the Auto Scaling Group (ASG)
- After that we can delete the Application Load Balancer (ALB)
- We can delete the instances

### ELB & ASG Summary

- High Availability: Run instances across multiple AZ's
- Vertical Scaling: Increase instance size (scale up/down)
- Horizontal Scaling: Increase number of instances (scale out/in)
- Elasticity: Scale up and down
- Agility: Create and get rid of resources very quickly
- ELB (Elastic Load Balancer): 
  - Distribute traffic across multiple instances
  - Support health checks
  - 4 types:
    - Application Load Balancer (HTTP / HTTPS only) - Layer 7
    - Network Load Balancer (ultra-high performance, allows for TCP) - Layer 4
    - Gateway Load Balancer - Layer 3
    - Classic Load Balancer (RETIRED in 2023) - Layer 4 & 7
- ASG (Auto Scaling Group):
  - Implement elasticity for your application, across multiple AZ's
  - Scale EC2 instances based on the demand on your system, replace unhealthy
  - Integrated with ELB