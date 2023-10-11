# Ultimate AWS Certified Cloud Practitioner 2023

## Section 08 - Amazon S3

### S3 Overview

- Amazon S3 is one of the main building blocks of AWS
- It's advertised as "infinitely scaling" storage
- Many websites use Amazon S3 as a backbone
- Many AWS services use Amazon S3 as an integration as well

We will learn learn main features of S3 step by step.

Use cases:

- Backup and storage
- Disaster recovery
- Archive
- Hybrid cloud storage
- Media hosting
- Data lakes & big data analytics
- Software delivery
- Static website hosting

Some examples:

- Nasdaq stores 7 years of data into S3 Glacier
- Sysco runs analytics on its data and gain business insights

S3 bucket details:

- Amazon S3 allows people to store to objects (files) in "buckets" (directories)
- Buckets must have a globally unique name (across) all regions all accounts)
- Buckets are defined at the region level
- S3 looks like a global service but buckets are created in a region
- Naming convention:
  - No uppercase
  - No underscore
  - 3-63 characters long
  - Not an IP
  - Must start with lowercase letter or number
  - Must NOT start with the prefix xn--
  - Must NOT end with the suffix -s3alias

S3 Objects

- Objects (files) have a Key
- The key is the FULL path:
  - s3://my-bucket/my_file.txt
  - s3://my-bucket/my_folder1/another_folder/my_file.txt
- The key is composed of prefix + object name
  - s3://my-bucket/my_folder1/another_folder/my_file.txt
- There is no concept of "directories" within buckets, although the UI will trick you to think otherwise
- Just keys with very long names that contain slashes ( / )
- Object values are the content of the body
  - Max Object size is 5TB (5000GB)
  - If uploading more than 5GB, must use "multi-part upload"
- Metadata (list of text key/value pairs - system or user metadata)
- Tags (Unicode key/value pair - up to 10) - useful for security / lifecycle
- Version ID (if versioning is enabled)

### S3 Hands On

- We will go to Amazon S3 > Buckets > Create bucket
- We will create a bucket with a globally unique name, "huseyin-demo-bucket"
- We will close AWS Region, bucket will be created in one region
- We don't touch any other settings, we will click "Create bucket"

We can upload a file to this folder, from the course resources we can upload the coffee.jpg file.

- We can open the image from the Amazon S3 > Buckets > huseyin-demo-bucket > coffee.jpg > Open, it will open the image with the browser and with a URL token.
- Also we can try to use the global Object URL, but it will be forbidden, because we didn't set any permissions yet.

We can go back to S3 bucket and create a folder "images", and upload beach.jpg file to this folder and delete this folder.

### S3 Security: Bucket Policy

- User-Based
  - IAM Policies - which API calls should be allowed for specific user from IAM

- Resource-Based
  - Bucket Policies - bucket wide rules from the S3 console - allows cross account
  - Object Access Control List (ACL) - finer grain (can be disabled)
  - Bucket Access Control List (ACL) - less common (can be disabled)

- Note: an IAM principal can access an S3 object if
  - The user IAM permissions ALLOW it OR the resource policy ALLOWS it
  - AND there is no explicit DENY

- Encryption: encrypt objects in Amazon S3 using encryption keys

S3 Bucket Policy Structure

JSON based policies:

- Resources: buckets and objects
- Effect: Allow / Deny
- Actions: Set of API to Allow or Deny
- Principal: The account or user to apply the policy to

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::huseyin-demo-bucket/*"
    }
  ]
}
```

Use S3 bucket for policy to:

- Grant public access to bucket
- Force objects to be encrypted at upload
- Grant access to another account (Cross Account)

Examples:

- Public Access: S3 bucket allows public access
- IAM permissions: IAM user has S3 permissions
- EC2 instance access: Uses IAM roles to access S3 buckets
- Cross Account Access: Bucket policy allows another account to access S3 bucket
- Block Public Access:
  - These settings we created to prevent company data leaks
  - If you know your bucket should be never be public, leave these settings on
  - Can be set at the account level (all buckets)
  - Block all public access
    - Block public access to buckets and objects granted through new access control lists (ACLs)
    - Block public access to buckets and objects granted through any access control lists (ACLs)
    - Block public access to buckets and objects granted through new public bucket or access point policies
    - Block public and cross-account access to buckets and objects through any public bucket or access point policies

### S3 Security: Bucket Policy Hands On

We can make our previous bucket public, Amazon S3 > Buckets > huseyin-demo-bucket > Permissions > Bucket public access > Edit and disable all settings.

We will open to edit bucket policy and go to policy generator:

- We will use "*" for principal
- Select "GetObject" for action
- We will use "arn:aws:s3:::huseyin-demo-bucket/*" for Amazon Resource Name (ARN), we can get the bucket name form the bucket page

We will add statement and copy it to the bucket policy and save it.

With these changes we should be able to see the resources with public URL, [https://huseyin-demo-bucket.s3.us-east-2.amazonaws.com/coffee.jpg](https://huseyin-demo-bucket.s3.us-east-2.amazonaws.com/coffee.jpg).

### S3 Website Overview

- S3 can host static websites and have them accessible on the internet

The website URL will be:

- [http://bucket-name.s3-website-aws-region.amazonaws.com](http://bucket-name.s3-website-aws-region.amazonaws.com)

OR

- [http://bucket-name.s3-website.aws-region.amazonaws.com](http://bucket-name.s3-website.aws-region.amazonaws.com)

depending on the region.

- If you get a 403 Forbidden error, make sure the bucket policy allows public reads.

### S3 Website Hands On

Open the related bucket and go to Properties > Static website hosting > Edit > Enable > Save changes and set the index document to "index.html".

We need to upload the index.html file to the bucket and we can open the website with the URL [http://huseyin-demo-bucket.s3-website.us-east-2.amazonaws.com/](http://huseyin-demo-bucket.s3-website.us-east-2.amazonaws.com/).

### S3 Versioning Overview

- You can version your files in Amazon S3
- In is enabled at the bucket level
- Same key overwrite will change the "version": 1, 2, 3
- It is best practice to version your buckets
  - Protect against unintended deletes (ability to restore a version)
  - Easy roll back to previous version
- Notes:
  - Any file that is not versioned prior to enabling versioning will have version "null"
  - Suspending versioning does not delete the previous versions

### S3 Versioning Hands On

We need to go properties of the bucket and enable versioning.

We will edit the index.html file and upload it again, if we enable the "Show version" option we can see the previous version of the file.

If we delete the file, we can see the previous version of the file.

### Replication Overview

- Must enable versioning in source and destination
- CRR: Cross Region Replication
- SRR: Same Region Replication
- Buckets can be in different accounts
- Copying is asynchronous
- Must give proper IAM permissions to S3
-Use cases:
  - CRR: Compliance, lower latency access, replication across accounts
  - SRR: Log aggregation, live replication between production and test accounts

### S3 Replication Hands On

Let's create a new bucket for replication, "huseyin-demo-bucket-origin-v2", enable versioning. Upload a file to this bucket.

We will create a new bucket for replication, "huseyin-demo-bucket-replica-v2", enable versioning.

We need to go to origin bucket > Management > Create replication rule:

- We can use "DemoREplicationRule"
- We need to set the destination bucket, "huseyin-demo-bucket-replica-v2"
- IAM role: Create new role

After creation it will ask the replication of existing objects. We need to wait for a while to see the replication, if we check the destination bucket we can see the replicated file with same version.

### S3 Storage Classes Overview

- Amazon S3 Standard - General Purpose
- Amazon S3 Standard - Infrequent Access (IA)
- Amazon S3 One Zone - Infrequent Access
- Amazon S3 Glacier Instant Retrieval
- Amazon S3 Glacier Flexible Retrieval
- Amazon S3 Glacier Deep Archive
- Amazon S3 Intelligent Tiering

We can move between classes manually or using S3 Lifecycle configurations.

Durability:

- High durability: 99.999999999, 11 nines, of objects across multiple AZ
- If you store 10,000,000 objects with Amazon S3, you can on average expect to incur a loss of a single object once every 10,000 years
- Same for all storage classes

Availability:

- Measures how readily available a service is
- Varies depending on storage class
- Example: S3 standard has 99.99% availability = not available 53 minutes per year

S3 Standard - General Purpose

- 99.99% availability
- Used for frequently accessed data
- Low latency and high throughput
- Sustain 2 concurrent facility failures
- Use cases: Big data analytics, mobile & gaming applications, content distribution

S3 Storage Classes - Infrequent Access (IA)

- For data that is less frequently accessed, but requires rapid access when needed
- Lower cost than S3 Standard, but you are charged a retrieval fee
- Amazon S3 Standard - Infrequent Access (IA)
  - 99.9% availability
  - Sustain 2 concurrent facility failures
  - Use cases: As a data store for disaster recovery, backups
- Amazon S3 One Zone - Infrequent Access
  - 99.5% availability
  - Data is stored in a single AZ
  - High durability (99.999999999%) in a single AZ, data lost when AZ is destroyed
  - Use cases: Storing secondary backup copies of on-premise data, or storing data you can recreate

Amazon S3 Glacier Storage Classes

- Low-cost object storage meant for archiving/backup
- Pricing: price for storage + object retrieval price
- Amazon S3 Glacier Instant Retrieval
  - Millisecond retrieval, great for data accessed once a quarter
  - Minimum storage duration of 90 days
- Amazon S3 Glacier Flexible Retrieval (formerly Amazon S3 Glacier)
  - Expedited (1 to 5 minutes), Standard (3 to 5 hours), Bulk (5 to 12 hours, free)
  - Minimum storage duration of 90 days
- Amazon S3 Glacier Deep Archive - for long term storage:
  - Standard (12 hours), Bulk (48 hours, free)
  - Minimum storage duration of 180 days

S3 Intelligent Tiering

- Small monthly monitoring and auto-tiering fee
- Moves objects between two access tiers based on changing access patterns
- There are no retrieval charges in S3 Intelligent-Tiering

Behavior:

- Frequent Access tier (automatic): default tier
- Infrequent Access tier (automatic): objects not access for 30 days
- Archive Instant Access tier (automatic): objects not access for 90 days
- Archive Access tier (optional): configurable from 90 days to 700+ days
- Deep Archive Access tier (optional): configurable from 180 days to 700+ days

### S3 Storage Classes Hands On

We will create a bucket from Amazon S3 > Buckets > Create bucket, "huseyin-s3-storage-classes-demos-2022". And we will upload a image file to this bucket.

Under the bucket we can see the properties:

- Standard: Frequently accessed data (more than once a month) with millisecond access
- Intelligent Tiering: Data with changing or unknown access patterns
- One Zone - IA: Recreateable data, infrequently accessed (once a month) stored in a single AZ with milliseconds access
- Glacier Instant Retrieval: Long-lived archive data accessed once a quarter with instant retrieval in milliseconds
- Glacier Flexible Retrieval (Formerly Glacier): Long-lived archive data accessed once a year with retrieval of minutes to hours
- Glacier Deep Archive: Long-lived archive data accessed than once a year with retrieval of hours
- Reduced redundancy: Noncritical, frequently accessed data with milliseconds access, not recommended as S3 Standard is cheaper

Lifecycle Management:

- Under bucket management we can create lifecycle rules
- We can move the files to different storage classes after a period of time
- We can review transition and expiration rules

### S3 Encryption

We could get one question about encryption in the exam.

- Server-Side Encryption (DEFAULT)
  - Server encrypts the file after receiving it

- Client-Side Encryption
  - Client encrypts the file and uploads the encrypted file to S3

Both model exist in S3, by default server-side encryption is enabled.

### Shared Responsibility Model for S3

