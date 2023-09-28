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

We can add our MFA device to our root user from IAM > Users > Security credentials > Assigned MFA device > Manage.

### AWS Access Keys, CLI and SDK

How can users access AWS?

- AWS Management Console (protected by password + MFA)
- AWS Command Line Interface (CLI): protected by access keys.
- AWS Software Developer Kit (SDK): protected by access keys.

Access keys are generated through the AWS console. Access keys are secret like password.

What's the AWS CLI?

- A tool that enables you to interact with AWS services using commands in your command-line shell.
- Direct access to the public APIs of AWS services.
- You can create scripts to manage your resources.
- It is open sourced [https://github.com/aws/aws-cli](https://github.com/aws/aws-cli)
- Alternative to using AWS Management Console.

What's the AWS SDK?

- AWS Software Development Kit (SDK)
- Language specific APIs
- Enables you to access and manage AWS services programmatically.
- Embedded within your application.
- Supports
  - SDKs (JavaScript, Python, PHP, Ruby, .NET, Go, C++, etc.)
  - Mobile SDKs (iOS, Android)
  - IoT SDKs (Arduino, JavaScript, Python, etc.)
  - Example: AWS CLI is using the AWS SDK for Python

### AWS CLI Setup on Windows

Go to [installation page](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) download and run msi installer.

Run this command to check if it is installed correctly:

```bash
aws --version
```

### AWS CLI Hands On

We will go to IAM > Users > Specific user > Security credentials > Create access key. We will create a new access key for CLI. We will note the access key details.

After installation we can set the access key details with this command:

```bash
aws configure
```

We will enter the access key details and default region name and default output format.

We can check if it is working with this command:

```bash
aws iam list-users
```

We should see the list of users in our account. AWS CLI and console will act similarly with the same permissions.

### AWS Cloud Shell

We can use cloud shell as an alternative to CLI. This service is not available in all regions.

We can issue commands from the console:

```bash
aws iam list-users
```

If we create files or resources from the cloud shell, they will stay. We can download or upload files.

We can do this course without cloud shell.

### IAM Roles for Services

- Some AWS services will need to perform actions on your behalf.
- We need to assign permissions to AWS services with IAM Roles.
- Common roles:
  - EC2 Instance Roles
  - Lambda Function Roles
  - Roles For CloudFormation

### IAM Roles Hands On

We need to open IAM > Roles > Create role. Trusted entity type will be AWS service. 

- We will select EC2 as the only use case.
- We will only give IAMReadOnlyAccess permission to this role.
- We will set the role name as "DemoRoleForEC2".

### IAM Security Tools

- IAM credentials report
  - Report that lists all your account's users and the status of their various credentials.
- IAM Access Advisor
  - Access advisor shows the service permissiıns granted to a user and when those services were last accessed.
  - We can review used permissions and remove unused permissions.

### IAM Security Tools Hands On

IAM > Credential report > Generate report. We can download the report as a csv file.

We can get information about password last used, access key last used, access key last rotated etc.

IAM > Users > Specific user > Access Advisor. We can see the services that user used and when they used it. We can consider removing unused permissions.

### IAM Best Practices

- Do not user root account except for AWS account setup.
- One physical user = One AWs user
- Assign users to groups and assign permissions to groups.
- Create a strong password policy.
- Use and enforce the use of MFA.
- Create and use Roles for giving permissions to AWS services.
- Use Access Keys for Programmatic Access (CLI/SDK).
- Audit permissions of your account using ISM Credentials Report & IAM Access Advisor.
- Never share IAM users & Access Keys.

### Shared Responsibility Model for IAM

CCP exam will ask about shared responsibility model for IAM.

What AWS is responsible for, what the customer is responsible for.

AWS:

- Infrastructure (global network security)
- Configuration and vulnerability analysis
- Compliance validation

User:

- Users, groups, roles, policies management and monitoring
- Enable MFA for all users
- Key rotation
- IAM tools to apply appropriate permissions
- Analyze access patterns and review permissions

### IAM Summary

- Users: mapped to a physical user, has a password to login to AWS console.
- Groups: contains users only, no groups of groups.
- Policies: JSON documents that define permissions of users or groups.
- Roles: for EC2 instances, Lambda functions, CloudFormation, etc.
- Security: MFA + password policy
- AWS CLI: command line tool
- AWS SDK: programmatic access
- Access Keys: access AWS using CLI or SDK
- Audit: IAM Credentials Report, IAM Access Advisor
