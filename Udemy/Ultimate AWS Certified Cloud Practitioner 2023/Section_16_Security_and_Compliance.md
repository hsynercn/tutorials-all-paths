# Ultimate AWS Certified Cloud Practitioner 2023

## Section 16 Security and Compliance

### Shared Responsibility Model: Reminders and Examples

AWS Shared Responsibility Model

- AWS responsibility - security of the Cloud
  - Protecting infrastructure (hardware, software, networking, facilities and networking) that runs all the AWS services
  - Managed services like S3, DynamoDB, RDS
- Customer responsibility - security in the Cloud
  - For Ec2 instance, customer is responsible for management of the guest OS (including updates and security patches), firewall and network configuration, IAM
  - Encrypting application data
- Shared controls
  - Patch Management, Configuration Management, Awareness & Training

Example, for RDS

- AWS responsibility
  - Manage the underlying EC2 instance, disable SSH access
  - Automated DB patching
  - Automated OS patching
  - Audit the underlying instance and disks and guarantee it functions properly
- Your responsibility
  - Check the ports / IP / security group inbound rules in DB's SG
  - In-database user creation and permissions
  - Creating a database with or without public access
  - Ensure parameter groups or DB is configured to only allow SSL connections
  - Database encryption settings

Example, for S3

- AWS responsibility
  - Guarantee you get unlimited storage
  - Guarantee you get encryption
  - Ensure separation of the data between different customers
  - Ensure AWS employees can't access your data
- Your responsibility
  - Bucket configuration
  - Bucket policy / public settings
  - IAM user and roles
  - Enabling encryption

Generic Shared Responsibility Model

- Customer
  - Customer data
  - Platform, application, identity and access management
  - Operating system, network and firewall configuration
  - Client side data encryption and data integrity authentication
  - Server side encryption
  - Networking traffic, protection (encryption, integrity, identity)

- AWS
  - Software: Compute, Storage, Database, Analytics, Networking
  - Hardware / AWS Global Infrastructure: Regions, Availability Zones, Edge Locations

### DDoS Protection: WAF and Shield

DDOS: Distributed Denial of Service, an attempt to make your service unavailable to your users.

DDOS Protection on AWS

- AWS Shield Standard: protects against DDOS attack for your website and applications, for all customers at no additional costs
- AWS Shield Advanced: 24/7 premium DDoS protection
- AWS WAF (Web Application Firewall): Filter specific requests based on rules
- CloudFront and Route 53:
  - Availability protection using global edge network
  - Combined with AWS Shield, provides attack mitigation at the edge
- Be read to scale, leverage AWS Auto Scaling

AWS Shield

- AWS Shield Standard
  - Free service that is activated for every AWS customer
  - Provides protection from attacks such as SYN/UDP Floods, reflection attacks and other layer 3 / layer 4 attacks
- AWS Shield Advanced
  - Optional DDoS mitigation service ($3,000 per month per organization)
  - Protect against more sophisticated attacks on EC2, Elastic Load Balancing, CloudFront, Global Accelerator, Route 53
  - 24/7 access to AWS DDoS response team (DRP)
  - Protect against higher fees during usage spikes due to DDoS

AWS WAf - Web Application Firewall

- Protects your web applications from common web exploits (Layer 7)
- Layer 7 is HTTP
- Deploy on Application Load Balancer, API Gateway, CloudFront
- Define WEB ACL (Web Access Control List):
  - Rules can include IP addresses, HTTP headers, HTTP body, URI strings
  - Protects from common attacks, SQL injection and Cross-Site Scripting (XSS)
  - Size constraints, geo-match (block requests by country)
  - Rate-based rules (to count occurrences of events) for DDoS protection

### AWS Network Firewall

- Protect your entire Amazon VPC
- From Layer 3 to Layer 7 protection
- Any direction, you can inspect
  - VPC to VPC traffic
  - Outbound to internet
  - Inbound from internet
  - To / from Direct Connect and Site-to-Site VPN

### Penetration Testing on AWS Cloud

On AWS as a customer, you can perform penetration testing on some services without prior authorization, we can test these services:

- Amazon EC2 instances, NAT Gateways, and Elastic Load Balancers
- Amazon RDS
- Amazon CloudFront
- Amazon Aurora
- Amazon API Gateways
- AWS Lambda and Lambda Edge functions
- Amazon Lightsail resources
- Amazon Elastic Beanstalk environments

List can increase over time, exam does not test this list.

Prohibited Activities

- DNS zone walking via Amazon Route 53 Hosted Zones
- Denial of Service (DoS), Distributed Denial of Service (DDoS), Simulated DoS, Simulated DDoS
- Port flooding
- Protocol flooding
- Request flooding (login request flooding, API request flooding)
- For any other simulated events, contact AWS Support

### Encryption with KMS and CloudHSM

- At rest: data stored or archived on a device
  - On a hard disk, on a RDS instance, in S3 Glacier Deep Archive, etc.
- In transit (in motion): data being moved from one location to another
  - Transfer from on-premises to AWS, EC2 to Dynamo DB
  - Means data transferred on the network
- We want to encrypt data in both states to protect it
- For this we leverage encryption keys

AWS KMS - Key Management Service

- Anytime you hear encryption for an AWS service, it is most likely KMS
- KMS = AWS manages the encryption keys for you
- Encryption Opt-in:
  - EBS volumes: encrypt volumes
  - S3 bucketsÇ Server-side encryption of objects
  - Redshift database: encryption of data
  - RDS database: encryption of data
  - EFS drives (Elastic File System): encryption of data
- Encryption Automatically enabled:
  - CloudTrail Logs
  - S3 Glacier
  - Storage Gateway

CloudHSM - Hardware Security Module

- KMS: AWS manages the software for encryption
- CloudHSM: AWS provisions encryption hardware
- Dedicated Hardware: Hardware Security Module
- You manage your own encryption keys entirely (not AWS)
- HSM device is tamper resistant, FIPS 140-2 Level 3 compliance

