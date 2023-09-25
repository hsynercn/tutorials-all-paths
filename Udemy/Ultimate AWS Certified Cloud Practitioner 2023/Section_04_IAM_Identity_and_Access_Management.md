# Ultimate AWS Certified Cloud Practitioner 2023

## Section 04 - IAM - Identity and Access Management

- IAM = Identity and Access Management, **GLOBAL** service.
- Root account created by default: should not be used or shared.
- Users are people within your organization, and can be grouped.
- Groups only contain users, not other groups.
- Users don't have to belong to a group, and users can belong to multiple groups.

For example:

- Developers: Alice, Bob, Charles
- Audit Team: Charles, David
- Operations: David, Edward
- No Group: Fred

IAM: Permissions

- Users or Groups can be assigned JSON documents called policies.
- Policies define the permissions of the users.
- 

For example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1234567890",
      "Effect": "Allow",
      "Action": [
        "s3:ListAllMyBuckets",
        "s3:GetBucketLocation"
      ],
      "Resource": "*"
    }
  ]
}
```

