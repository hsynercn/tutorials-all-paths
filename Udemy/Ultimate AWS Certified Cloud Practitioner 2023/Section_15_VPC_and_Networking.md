# Ultimate AWS Certified Cloud Practitioner 2023

## Section 15 VPC and Networking

### VPC Overview

- VPC is something you should know in depth for the AWS Certified Cloud Solutions Architect Associate and AWS Certified SysOps Administrator.

- At the AWS Certified Cloud Practitioner Level, you should know about:
  - VPC (Virtual Private Cloud), Internet Gateways and NAT Gateways (Network Address Translation)
  - Security Groups and Network ACL (Access Control Lists), VPC Flow Logs
  - VPC Peering, VPC Endpoints
  - Site to Site VPN and Direct Connect
  - Transit Gateway

- I will just give you an overview, less than 1 or 2 questions at your exam.
- We will look at the "default VPC" (created by default by AWS for you)
- There is a summary lecture at the end. It's ok if you don't understand everything right now.

### IP Addresses in AWS

- IPv4 Internet Protocol version 4 (4.3 Billion Addresses)
  - Public IPv4 can be used on the Internet
  - EC2 instance gets a new public IP address every time you stop then start it by default
  - Private IPv4 can be used on private networks (LAN) such as internal AWS networking (eg 192.168.1.1)
  - Private IPv4 is fixed for EC2 Instances even if you start/stop them
- Elastic IP allows you to attach a fixed public IPv4 address to EC2 instance
  - Note: has ongoing cost if not attached to an EC2 instance or if the EC2 instance is stopped
- IPv6 Internet Protocol version 6
  - Every IP address is public (no private range)
  - Example: 3ffe:1900:4545:3:200:f8ff:fe21:67cf

### VPC, Subnet, Internet Gateway, NAT Gateway

VPC and Subnets Primer

- VPC - Virtual Private Cloud: private network to deploy your resources (specific to regional resource)
- Subnets allow you to partition your network inside your VPC (Availability Zone resource)
- Public Subnet: A subnet that is accessible from the internet
- Private Subnet: A subnet that is not accessible from the internet
- Route Tables: We define access to the internet and between subnets.

Internet Gateway and NAT Gateways

- Internet Gateways helps our VPC instances connect with the internet
- Public Subnets have a route to the internet gateway
- NAT Gateways (AWS-managed) or NAT Instances (self-managed) allow your instances in your Private Subnets to access the internet while remaining private

If we go to VPC in the AWS Console, we can see the default VPC that is created for us with IPv4 CIDR block, similar to 172.31.0.0/16 and if we check the Subnets we can see the 3 subnets on different availability zones.

### Security Groups and Network Access Control List (NACL)
