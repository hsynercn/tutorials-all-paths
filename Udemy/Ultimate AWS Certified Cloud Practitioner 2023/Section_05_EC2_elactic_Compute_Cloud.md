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

