# Ultimate AWS Certified Cloud Practitioner 2023

## Section 04 - IAM - Identity and Access Management

### IAM Introduction: Users, Groups, Policies

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

### IAM Users & Groups Hands On

IAM is a global service, it does not belong to a region.

Root account is usually too powerful, so it should not be used or shared. Instead, create a user with admin permissions.

For our example we will start with a IAM user:

IAM > Users > Create user: 

- Set username "someusername"
- Select "I want to create an IAM user" option.
- After that we will set permissions, we can create a "Admin" group and add the user to it. Admin group will have AdministratorAccess policy.
- We can add a tag to the user, for example "Department" with value "Engineering".

After this part we can create a account alias from the IAM dashboard.

[https://huseyincerc-udemy-tutorial.signin.aws.amazon.com/console](https://huseyincerc-udemy-tutorial.signin.aws.amazon.com/console)

With this link we can go to account login page and login with our recently created user's IAM username and password.

### IAM Policies


