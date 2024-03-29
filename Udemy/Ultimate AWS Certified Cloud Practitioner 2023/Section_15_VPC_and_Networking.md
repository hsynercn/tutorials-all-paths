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

- NACL (Network ACL):
  - A firewall which controls traffic from and to subnet
  - Can have ALLOW and DENY rules
  - Are attached at the SUBNET level
  - Rules only include IP addresses

- Security Groups
  - A firewall that controls traffic to and from an ENI / an EC2 Instance
  - Can have only ALLOW rules
  - Rules include IP addresses and other security groups


|Security Group|Network ACL|
|--|--|
|Operates at the instance level|Operates at the subnet level|
|Supports allow rules only|Supports allow rules and deny rules|
|Is stateful÷ Return traffic is automatically allowed, regardless of any rules|Is stateless: Return traffic must be explicitly allowed by rules|
|We evaluate all rules before deciding whether to allow traffic|We process rules in number order when deciding whether to allow traffic|
|Applies to an instance only if someone specifies the security group when launching the instance, or associate the security group with the instance later on|Automatically applies to all instances in the subnets it's associated with (therefore, you don't have to rely on users to specify the security group)|

### VPC Flow Logs and VPC Peering

VPC Flow Logs

- Capture information about IP traffic going into your interfaces:
  - VPC Flow Logs
  - Subnet Flow Logs
  - Elastic Network Interface Flow Logs
- Helps to monitor and troubleshoot connectivity issues: Example:
  - Subnets to internet
  - Subnets to subnets
  - Internet to subnets
- Capture network information from AWS managed interfaces too: Elastic Load Balancers, ElastiCache, RDS, Aurora, etc...
- VPC Flow logs data can go to S3, CloudWatch, and Kinesis Data Firehose

VPC Peering

- Connect two VPC, privately using AWS' network
- Make them behave as if they were in the same network
- Must not have overlapping CIDR (IP address range)
- VPC Peering connection is not transitive (must be established for each VPC that need to communicate with each other)

### VPC Endpoints - Interface and Gateway (S3 and DynamoDB)

- Endpoints allow you to connect AWS Services using a private netwrok instead of the public www network
- This gives you enhanced security and lower latency to access AWS services
- VPC Endpoint Gateway: S3 and DynamoDB
- VPC Endpoint Interface: the rest

### AWS PrivateLink (VPC Endpoint Services)

- Most secure and scalable way to expose a service to 1000s of VPCs
- Does not require VPC peering, internet gateway, NAT, route tables
- Requires a network load balancer (Service VPC) and ENI (Customer VPC)

### Direct Connect and Site-to-Site VPN

- Site to Site VPN
  - Connect an on-premises VPN to AWS
  - The connection is automatically encrypted
  - Goes over the public internet
- Direct Connect (DX)
  - Establish a physical connection between on-premises and AWS
  - The connection is private, secure and fast
  - Goes over a private network
  - Takes at least a month to establish

How to implement a Site-to-Site VPN

- On-premises must use a Customer Gateway (CGW)
- AWS must use a Virtual Private Gateway (VGW)

### Client VPN

- Connects from your computer using OpenVPN to your private network in AWS and on-premises
- Allow you to connect to your EC2 instances over a private IP (just as if you were on the private VPC network)
- Goes over public internet

### Transit Gateway

Network topologies can become complex. To solve this issue we use Transit Gateway.

- For having transitive peering between thousands of VPC and on-premises, hub and spoke (star) connection
- One single Gateway to provide this functionality
- Works with Direct Connect Gateway, VPN connections

### VPC and Networking Summary

- VPC: Virtual Private Cloud
- Subnets: Tied to an AZ, network partition of the VPC
- Internet Gateway: at the VPC level, provide Internet Access
- NAT Gateway / Instances: give internet access to private subnets (NAT = Network Address Translation)
- NACL: Stateless, subnet rules for inbound and outbound
- Security Groups: Stateful, operate at the EC2 instance level or ENI
- VPC Peering: Connect two VPC with non overlapping IP ranges, non transitive
- Elastic IP: Fixed public IPv4, ongoing cost if not in-use

- VPC Endpoints: Provide private access to AWS Service with VPC
- PrivateLink: Privately connect to a service in a 3rd party VPC
- VPC Flow Logs: network traffic logs
- Site to Site VPN: VPN over public internet between on-premises DC and AWS
- Client VPN: OpenVPN connection from your computer into your VPC
- Direct Connect: direct private connection to AWS
- Transit Gateway: Connect thousands of VPC and on-premises using a single gateway


