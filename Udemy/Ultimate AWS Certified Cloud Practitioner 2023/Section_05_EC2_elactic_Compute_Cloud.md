# Ultimate AWS Certified Cloud Practitioner 2023

## Section 05 - EC2 - Elastic Compute Cloud

### AWS Budget Setup

To prevent unexpected charges, we can set up a budget to notify us when we are approaching our budget limit.

We can see the current charges in the billing dashboard AWS Billing > Bills.

We can monitor the capacity usage of free tier services in the billing dashboard AWS Billing > AWS Free Tier.

### EC2 Basics

We will create our first website using EC2. It is a popular AWS service.

- EC2 = Elastic Compute Cloud = Infrastructure as a Service
- It mainly consists in capability of:
  - Renting virtual machines (EC2)
  - Storing data on virtual drives (EBS)
  - Distributing load across machines (ELB)
  - Scaling the services using an auto-scaling group (ASG)
- Knowing EC2 is fundamental to understand how the Cloud works.

EC2 sizing and configuration options:

- Operating System: Linux, Windows, Mac OS
- How much CPU
- How much RAM
- How much Storage
  - Network attached (EBS and EFS)
  - Hardware (EC2 Instance Store)
- Network card: speed of the card, public IP address
- Firewall rules: security groups
- Bootstrap script: launch commands on the instance at first start (user data)

EC2 User Data

- We can use a bootstrap script with EC2 User data script.
- It will be executed during the first start of the instance.
- EC2 user data is used to automate boot tasks such as:
  - Installing updates
  - Installing software
  - Downloading common files from the internet
  - Anything you can think of
- It will be executed by the root user.

There are lots of EC2 instance types. We will use t2.micro, it is a free tier eligible instance up to 750 hours per month.

### Create an EC2 Instance with EC2 User Data to have a Website Hands On

- We will launch our first virtual server using the AWS Console.
- We'll get a first high-level approach to the various parameters.
- We will see that our web server is launched using EC2 user data.
- We will learn how to start / stop / terminate our instance.

We can launch our first instance with EC2 > Instances > Launch an instance.

- We can set name as "My First Instance".
- We can select Amazon Linux 2 AMI (HVM), it is free tier eligible.
- We will select instance type t2.micro.
- We need to add a SHH key pair.
  - Set a name "EC2 Tutorial".
  - Select RSA.
  - Select .pem for new Windows or Mac OS versions.
- We enable HTTP traffic.

We will provide this script to user data:

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

We can create tne instance now, it will take 20 seconds to be ready. We can see the details of the instance in the EC2 dashboard, public IPv4, private IPv4, etc.

We can access the server with HTTP and ip of the instance and our service will return a Hello World message.

We can stop the instance and start it again BUT we will lose the public IPv4 address.

### EC2 Instance Types Basics

We can use different types of EC2 instances that are optimized for different use cases.

- General purpose
- Compute optimized
- Memory optimized
- Accelerated computing
- Storage optimized
- Instance features
- Measuring instance performance

AWS has a naming convention for EC2 instance types:

- m5.2xlarge
  - m: instance class
  - 5: generation
  - 2xlarge: size within the instance class


Instance type details:

- General purpose (m): Great for diversity of workloads such as web servers.
  - Balance between compute, memory and networking
  - During the course we will use t2.micro which is a general purpose instance.

- Compute optimized (c): Great for compute-intensive tasks that require high performance processors.
  - Batch processing workloads
  - Media transcoding
  - High performance web servers
  - High performance computing (HPC)
  - Scientific modeling and machine learning
  - Gaming servers

- Memory optimized (r): Good for processing large data sets.
  - High performance, relational/non-relational databases
  - Distributed web scale cache stores
  - In-memory databases optimized for BI (business intelligence)
  - Applications performing real-time processing of big unstructured data.

- Storage optimized (l): Great for storage-intensive tasks that require high, sequential read and write access to large data sets on local storage.
  - High frequency online transaction processing (OLTP) systems
  - Relational and NoSQL databases
  - Cache for in-memory databases (Redis, Memcached)
  - Data warehousing applications
  - Distributed file systems

### Security Groups & Classic Ports Overview

- Security Groups are the fundamental of network security in AWS.
- They control how traffic is allowed into or out of our EC2 instances.
- Security groups only contain allow rules.
- Security groups rules can reference by IP or by security group.

Security groups are acting as a firewall on EC2 instances:

- They regulate:
  - Access to ports
  - Authorized IP ranges - IPv4 and IPv6
  - Control of inbound network (from other to the instance)
  - Control of outbound network (from the instance to other)

Security group good to know:

- Can be attached to multiple instances
- Locked down to a region / VPC combination
- Does live "outside" the EC2 - if traffic is blocked the EC2 instance won't see it
- It's good to maintain one separate security group for SSH access
- If your application is not accessible (time out), then it's a security group issue
- If your application gives a "connection refused" error, then it's an application error or it's not launched
- All inbound traffic is blocked by default
- All outbound traffic is authorized by default

Classic Ports to know:

- 22 = SSH (Secure SHell) - log into a Linux instance
- 21 = FTP (File Transfer Protocol) - upload files into a file share
- 22 = SFTP (Secure File Transfer Protocol) - upload files using SSH
- 80 = HTTP - access unsecured websites
- 443 = HTTPS - access secured websites
- 3389 = RDP (Remote Desktop Protocol) - log into a Windows instance

### Security Groups Hands On

We can access the inbound rule details from EC2 > Security Groups > some security group > Edit inbound rules.

Timeouts mostly caused by security group configurations.

### SSH Overview

Mac, Linux and Windows 10 have SSH clients installed by default. Before Windows 10 we need to install Putty.

### How to SSH Using  Windows 10

We can check the SSH support with command `ssh` in the terminal.

- Go th .pem file location.
- Execute:
  
  ```bash
  ssh -i "EC2 Tutorial.pem"  ec2-user@3.23.85.11
  ```

Be careful with the instance IP, if we stop and start the instance it could change.

### EC2 Instance Connect

EC2 > Instances > some instance > Connect to instance, we can use console to connect to the instance. And this method will use a temporary SSH key.

Example command:

```bash
whoami
```

REMINDER: We need an active SSH port in the security group.

### EC2 Instance Roles Demo

After connecting the EC2 session we can check the instance role with command:

```bash
aws --version
aws iam list-users
```

At this we will see there is no credentials configured.

One bad option is to configure the credentials in the EC2 instance, but it is not recommended. Anybody who has access to the instance will have access to the credentials.

For a better option we can go EC2 instances, select the instance, Actions > Security > Modify IAM role > Create new role > Select DemoRoleForEC2 and update the role.

After this we can see the result of the command:

```bash
aws iam list-users
```

### EC2 Instances Purchasing Options

- On-Demand Instances: short workload, predictable pricing, pay by second
- Reserved (1-3 years):
  - Reserved Instances: long workloads
  - Convertible Reserved Instances: long workloads with flexible instances
- Saving Plans (1-3 years): commitment to an amount of usage, long workload
- Spot Instances: Short workloads, for cheap, can lose instances (less reliable)
- Dedicated Hosts: book an entire physical server, control instance placement
- Dedicated Instances: no other customers will share our hardware
- Capacity Reservation: reserve capacity in a specific AZ for any duration

EC2 On Demand

- Pay for what you use:
  - Linux or Windows: billing per second, after the first minute
  - All other operating systems: billing per hour
- Has the highest cost but no upfront payment
- No long-term commitment
- Recommended for short-term and un-interrupted workloads, where we can't predict how the application will behave

EC2 Reserved Instances

- Up to 75% discount compared to On-Demand
- You reserve a specific instance configuration in a specific region (we can't change the region)
- Reservation period can be 1 or 3 years
- Payment options: No Upfront, Partial Upfront, All Upfront
- Reserved instance scope: regional or zonal
- Recommended for long-term workloads (think database)
- You can buy and sell in the Reserved Instance Marketplace

Convertible Reserved Instances

- Can change the EC2 instance type, instance family, OS, scope and tenancy
- Up to 54% discount

EC2 Saving Plans

- Get a discount based on long-term usage
- Commit to a certain type of usage
- Usage beyond EC2 Savings Plan is billed at the On-Demand rate
- Locked to specific instance family & AWS region
- Flexible across:
  - Instance size
  - OS (Linux, Windows)
  - Tenancy (Host, Dedicated, Default)

EC2 Spot Instances

- Can get a discount of up to 90% compared to On-Demand
- Instances that you can "lose" at any point of time if your max price is less than the current spot price
- The MOST cost-efficient instances in AWS
- Useful for workloads that are resilient to failure:
  - Batch jobs
  - Data analysis
  - Image processing
  - Any distributed workloads
  - Workloads with a flexible start and end time
- Not great for critical jobs or databases

EC2 Dedicated Hosts

- A physical EC2 server dedicated for our use
- Allows you address compliance requirements and use your existing server-bound software licenses
- Purchasing Options:
  - On-demand: pay per second for active Dedicated Host
  - Reserved: 1 to 3 years (No Upfront, Partial Upfront, All Upfront)
- The most expensive option
-Useful for software that have complicated licensing model (BYOL - Bring Your Own License)
- Or for companies that have strong regulatory or compliance needs

Dedicated Instances

- Instances run on hardware that's dedicated to you
- May share hardware with other instances in the same account
- No control over instance placement (can move hardware after stop/start)

|Characteristic|Dedicated Instances|Dedicated Hosts|
|---|---|---|
|Enables the use of dedicated physical servers|Yes|Yes|
|Per instance billing(subject to a $2 per region fee)|Yes||
|Per host billing||Yes|
|Visibility of sockets, cores, and threads||Yes|
|Affinity between a host and an instance||Yes|
|Targeted instance placement||Yes|
|Automatic instance placement|Yes|Yes|
|Add capacity using an allocation request||Yes|

EC2 Capacity Reservations

- Reserve capacity for EC2 instances in a specific AZ for any duration
- You always have access to EC2 capacity when you need it
- No time commitment (create/cancel anytime), no billing discount
- Combine with regional reserved instances and saving plans to benefit from billing discounts
- You are charged at On-Demand rate whether you run instances or not
- Suitable for short-term, uninterrupted workloads that needs to be in a specific AZ

### Shared Responsibility Model for EC2

AWS is responsible for:

- Infrastructure (global network security)
- Isolation on physical hosts
- Replacing faulty hardware
- Compliance validation

We are responsible for:

- Security group rules
- Operating system patches and updates
- Software and utilities installed on the EC2 instance
- IAM Role assigned to the instance and IAM user access management
- Data security on your instance

### EC2 Summary

- EC2 Instance: AMI (OS) + Instance Size (CPU + RAM) + Storage + Security Group + EC2 User Data
- Security Groups: Firewall attached to the EC2 instance
- EC2 User Data: Script launched at the first start of an instance
- SSH: Start a terminal into an EC2 instance, port 22
- EC2 Instance Role: link to IAM roles
- Purchasing Options: On-Demand, Spot, Reserved (Standard + Convertible + Scheduled), Dedicated Host, Dedicated Instance

