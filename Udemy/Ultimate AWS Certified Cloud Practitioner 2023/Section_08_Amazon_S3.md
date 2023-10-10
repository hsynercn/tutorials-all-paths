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

