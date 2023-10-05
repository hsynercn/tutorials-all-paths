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

We can list the existing volumes from EC2 > Volumes > some volume id, and we can see the volume type, size, availability zone, state, etc.

Also we can create a new volume from EC2 > Volumes > Create Volume. We should create the volume in the same AZ as the instance we want to attach it to.

After the creation we can attach the volume to an instance from same AZ. After this part we can that EBS available for the OS of the instance by formatting it.

Under the instance details Storage part contains the EBS volume details. During the instance creation we have kept the default Delete on Termination flag as true, so when we terminate the instance the EBS volume will be deleted as well.

### EBS Snapshots Overview

- Make a backup (snapshot) of your EBS volume at a point in time
- Not necessary to detach volume to do snapshot, but recommended
- Can copy snapshots across AZ or Region

EBS Snapshots Features

- EBS Snapshot Archive
  - Move a Snapshot to an "archive tier" that is 75% cheaper
  - Takes within 24 to 72 hours for restoring the archive
- Recycle Bin for EBS Snapshots
  - Setup rules to retain deleted snapshots so you can recover them after an accidental deletion
  - Specify retention (from 1 day to 1 year)

We can create a snapshot from EC2 > Volumes > some volume id > Actions > Create Snapshot.

We can create a new volume on a different AZ from a snapshot from EC2 > Snapshots > some snapshot id > Actions > Create Volume.

We can go to recycle bin from EC2 > Snapshots > Recycle Bin and create a retention rule for deleted snapshots.

We can create a demo retention rule:

- Retention rule name: DemoRetentionRule
- Resource type: EBS Snapshots
- Name: DemoRetentionRule

Let's delete the snapshot from EC2 > Snapshots > some snapshot id, we can see its Storage tier is "Standard". After deleting it we can see that it is moved to Recycle Bin and we can recover it.

### AMI Overview

- AMI = Amazon Machine Image
- AMI are a customization of an EC2 instance
  - We add our own software, configuration, operating system, monitoring
  - Faster boot / configuration time because all our software is pre-packaged
- AMI are built for a specific region (and can be copied across regions)
- We can launch EC2 instances from:
  - A Public AMI: AWS provided
  - Your own AMI: you make and maintain them yourself
  - An AWS Marketplace AMI: an AMI someone else made

AMI Process (from an EC2 instance)

- Start an EC2 instance and customize it
- Stop the instance (for data integrity)
- Build an AMI - this will also create EBS snapshots
- Launch instances from other AMIs

### AMI Hands On

We will start with creating an instance:

- Select the existing security group: `launch-wizard-1`
- We will user data:

```bash
#!/bin/bash
# Use this for your user data (script from top to bottom)
# install httpd (Linux 2 version)
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
```

We need to wait for script after initialization to complete.

We can use Instances dropdown > Image and templates > Create image to create an AMI from the instance with 'DemoImage' name.

We need to wait to complete the AMI creation process, after that we can use that image from EC2 > AMIs > DemoImage > Launch instance from AMI or Instances > Launch instances > My AMIs > DemoImage.

If create a new instance only providing the index.html file in user data is enough to see a web page from the instance public IP. Because other tools are already installed in the AMI.


