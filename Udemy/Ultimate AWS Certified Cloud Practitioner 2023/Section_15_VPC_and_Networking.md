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
