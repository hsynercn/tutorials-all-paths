# Ultimate AWS Certified Cloud Practitioner 2023

## Section 06 - EC2 Instance Storage

### EBS Overview

What is an EBS Volume?

- An EBS (Elastic Block Store) Volume is a network drive you can attach to your instances while they run.
- It allows your instances to persist data, even after their termination.
- They can only be mounted to one instance at a time (at the CCP level)
- They are bound to a specific availability zone (AZ)

NOTE:

- CCP - Certified Cloud Practitioner - one EBS can be only mounted to one EC2 instance. 
- Associate Level (Solutions Architect, Developer, SysOps): "multi-attach" feature for some EBS

Analogy: We can think EBS as a "network USB stick"

Free tier: 30 GB of free EBS storage of type General Purpose SSD or Magnetic per month

EBS Volume

- It is a network drive (not a physical drive)
  - It uses the network to communicate the instance, which means there might be a bit of latency
  - It can be detached from an EC2 instance and attached to another one quickly
- It is locked to an AZ
  - An EBS Volume in us-east-1a cannot be attached to us-east-1b
  - To move a volume across, you first need to snapshot it
- Have a provisioned capacity (size in GBs, and IOPS)
  - You get billed for all the provisioned capacity
  - You can increase the capacity of the drive over time

Delete on Termination Attribute:

- By default, the root EBS volume is deleted when the EC2 instance is terminated
- By default, any other attached EBS volume is not deleted when the EC2 instance is terminated

This behavior can be controlled by the "Delete on Termination" flag from AWS console or CLI

Use case: preserve root volume when instance is terminated

### EBS Hands On
