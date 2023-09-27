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

IAM Policies are written in JSON. They are attached to users, groups or roles. They define the permissions of the user.

Consists of:

- Version: policy language version, always 2012-10-17.
- Id: an identifier for the policy (optional).
- Statement: one or more individual statements (required).

Statement consists of:

- Sid: an identifier for the statement (optional).
- Effect: whether the statement allows or denies access (Allow, Deny).
- Principal: account/user/role to which this policy applied to.
- Action: list of actions this policy allows or denies.
- Resource: list of resources to which the actions apply to.
- Condition: conditions for when this policy is in effect (optional).

Policies have the following structure:

```json
{
  "Version": "2012-10-17",
  "Id": "S3-Account-Permissions",
  "Statement": [
    {
      "Sid": "Stmt1234567890",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:user/root"
      },
      "Action": [
        "s3:ListAllMyBuckets",
        "s3:GetBucketLocation"
      ],
      "Resource": ["arn:aws:s3:::mybucket/*"]
    }
  ]
}
```

### IAM Policies Hands On

We can remove users from user groups. For our admin user example we can remove that user from the admin group and attach a policy to the user directly.

From the IAM dashboard we can see the added permissions to that user. We can see different policies which comes from different user groups or directly attached to the user.

Policy JSON for AdministratorAccess:

```JSON
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
        }
    ]
}
```

Policy for IAMReadOnlyAccess:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "iam:GenerateCredentialReport",
                "iam:GenerateServiceLastAccessedDetails",
                "iam:Get*",
                "iam:List*",
                "iam:SimulateCustomPolicy",
                "iam:SimulatePrincipalPolicy"
            ],
            "Resource": "*"
        }
    ]
}
```

We can create custom policies from IAM > Policies > Create policy.

### IAM - Password Policy

We have 2 defence protect users:

- Password Policy
  - Strong passwords = higher security for your account.
  - In AWS, you can setup a password policy.
    - Set a minimum password length.
    - Require specific character types.
      - including uppercase letters
      - lowercase letters
      - numbers
      - non-alphanumeric characters
    - Allow all IAM users to change their own passwords.
    - Require users to change their password after some time.
    - Prevent password reuse.
- Multi Factor Authentication (MFA)
  - Users have to access to your account and can change AWS resources.
  - We need to protect our Root Accounts and IAM users.
  - MFA = password you know + security device you own.
  - Main benefit of MFA: If a password is stolen or hacked, the account is not compromised.

MFA device options in AWS:

- Virtual MFA device
  - Google Authenticator (phone only)
  - Authy (multi-device)
- Universal 2nd Factor (U2F) Security Key
  - YubiKey (USB device)
- Hardware Key Fob MFA Device
  - Gemalto (USB device)
- Hardware Key Fob MFA Device for AWS GovCloud (US)
  - SurePassID (USB device)

### IAM MFA Hands On

We can create custom policies from IAM > Account settings > Edit password policy. We can enable expiration, password change, password reuse, minimum password length etc.