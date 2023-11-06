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
