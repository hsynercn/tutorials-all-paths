# Ultimate AWS Certified Cloud Practitioner 2023

## Section 14 Cloud Monitoring

### CloudWatch Metrics and CloudWatch Alarms Overview

Amazon CloudWatch Metrics

- CloudWatch provides metrics for every service in AWs
- Metric is a variable to monitor (CPUUtilization, NetworkIn, etc)
- Metrics have timestamps
- Can create CloudWatch dashboards of metrics

Important Metrics

- EC2 instances: CPU Utilization, Status Check, Network (not RAM)
  - Default metrics every 5 minutes
  - Option for Detailed Monitoring every 1 minute
- EBS Volumes: Disk Read/Writes
- S3 buckets: BucketSizeBytes, NumberOfObjects, AllRequests
- Billing: Total Estimated Charge (only in us-east-1)
- Service Limits: how much you are using a service API
- Custom metrics: push your own metrics

Amazon CloudWatch Alarms

- Alarms are used to rigger notifications for any metric
- Alarm actions:
  - Auto Scaling: increase or decrease EC2 instances "desired count"
  - EC2 Actions: stop, terminate, reboot or recover an EC2 instance
  - SNS notifications: send a notification into an SNS topic
- Various options (sampling, %, max, min, etc)
- Can choose the period the on which to evaluate an alarm
- Example: create a billing alarm on the CloudWatch metric
- Alarm States: OK, INSUFFICIENT_DATA, ALARM

### CloudWatch Metrics and CloudWatch Alarms Hands On

Under CloudWatch > All metrics we can see the metrics for all the services in AWS.

We can go EC2 > Per-Instances Metrics > CPUUtilization and see the metrics for the CPU utilization of the instances.

We can create a alarm for the CPUUtilization metric. We can choose the period of time to evaluate the alarm, the threshold, the number of periods to evaluate the alarm, the action to take when the alarm is triggered and the name of the alarm.

Billing data is only available in us-east-1. We can create a billing alarm for the Total Estimated Charge metric.

### CloudWatch Logs Overview

- CloudWatch Logs can collect from:
  - Elastic Beanstalk: collection of logs from application
  - ECS: collection from containers
  - AWS Lambda: collection from function logs
  - CloudTrail based on filter
  - CloudWatch log agents: on EC2 machines (can be on-premise too)
  - Route53: Log DNS queries
- Enables real-time monitoring of logs
- Adjustable CloudWatch Logs retention

CloudWatch Logs for EC2

- By default, no logs from EC2 instance will go to CloudWatch
- You need to run a CloudWatch agent on EC2 to push the log files you want
- Make sure IAM permissions are correct
- The CloudWatch log agent can be setup on-premise too

### CloudWatch Logs Hands On

We can see the log groups from CloudWatch > Log groups, we can see a lambda exception from the related log group.

### EventBridge Overview (Formerly CloudWatch Events)

- Schedule: Cron jobs (scheduled scripts), schedule every hour > trigger script on Lambda function
- Event Pattern: Event rules to react to a service doing something, IAM Root User Sign in Event > SNS Topic with Email Notification
- Trigger Lambda functions, send SQS/SNS messages

Sources can be lots of things and we can trigger many kinds of targets.

Events

- Default Event Bus: AWS services
- Partner Event Bus: SaaS integration, Zendesk or DataDog
- Custom Event Bus: your own applications

Schema Registry: model event schema

We can archive events (all/filter) sent to an event bus (indefinitely or set period).

Ability to replay archived events.

### EventBridge Hands On

- We can create a rule to trigger a Lambda every hour.
- We can create a rule to trigger notification when a root user signs in.
- We can create a rule to trigger a Lambda when a EC2 instance state changes.

### AWS CloudTrail

- Provides governance, compliance and audit for your AWs Account
- CloudTrail is enabled by default
- G an history of events / API calls made with your AWS account by:
  - Console
  - SDK
  - CLI
  - AWS Services
- Can put logs from CloudTrail into CloudWatch Logs or S3
- A trail can be applied to all regions (default) or a single region
- IMPORTANT: If a resource is deleted in AWS, look into CloudTrail first

We can inspect and audit the history of events that happened in our AWS account. For long term storage we can send them to S3 Bucket or CloudWatch Logs.

### AWS X-Ray

- Debugging in Production: the good old way
  - Test locally
  - Add log statements everywhere
  - Re-deploy in production
- Log formats differ across applications and logs analysis is hard
- Debugging: one big monolith is easy, distributed services are hard
- No common view of your entire architecture

We can get visual analysis of our applications from X-Ray.

AWS X-Ray advantages

- Troubleshooting performance (bottlenecks)
- Understand dependencies in a microservice architecture
- Pinpoint service issues
- Review request behavior
- Find errors and exceptions
- Are we meeting time SLA (Service Level Agreement)?
- Where I am throttling?
- Identify users that are impacted

### AWS CodeGuru

- A Machine Learning-powered service for automated code review and application performance recommendations
- Provides two functionalities
  - CodeGuru Reviewer: automated code reviews for static code analysis (development)
  - CodeGuru Profiler: visibility/recommendations about application performance during runtime (production)

Amazon CodeGuru Reviewer

- Identify critical issues, security vulnerabilities and hard to find bugs
- Example: common coding best practices, resource leaks, security detection, input validation
- Uses Machine Learning and automated reasoning
- Hard-learned lessons across millions of code reviews on 1000s of open-source and Amazon repositories
- Supports Java and Python
- Integrates with GitHub, Bitbucket, AWS CodeCommit

Amazon CodeGuru Profiler

- Helps understand the runtime behavior of your applications
- Example: identify if your application is consuming excessive CPU on a particular method, or a particular line of code
- Features:
  - Identify and remove code inefficiencies
  - Improve application performance and reduce cost
  - Decrease compute costs
  - Provide heap summary, identify which objects using up memory
  - Anomaly detection
- Support applications running on AWS or on-premise
- Minimal overhead on application

### AWS Health Dashboard

Service History

- Shows all regions, all services health
- Shows historical information for each day
- Has an RSS feed you can subscribe to
- Previously called AWS Service Health Dashboard

Your Account

- Previously called AWS Personal Health Dashboard
- AWS Account Health Dashboard provides alerts and remediation guidance when AWS is experiencing events that may impact you
- While the Service Health Dashboard displays the general status of AWS services, Account Health Dashboard gives you a personalized view into the performance and availability of the AWS services underlying your AWS resources
- The dashboard displays relevant and timely information to help you manage events in progress and provides proactive notifications to help you plan for scheduled activities
- Can aggregate data from an entire AWS Organization

More on Your Account:

- Global services
- Shows how AWS outages directly impact you and your AWS resources
- Alert, remediation, proactive, scheduled activities

### Cloud Monitoring Summary

- CloudWatch
  - Metrics: monitor the performance of AWS services and billing metrics
  - Alarms: automate notification, perform EC2 action, notify to SNS based on metric
  - Logs: collect log files from EC2 instances, servers, Lambda functions
  - Events (or EventBridge): react to events in AWS, ot trigger a rule on a schedule
- CloudTrail: audit API calls made within your AWS account
- CloudTrail Insights: automated analysis of your CloudTrail Events
- X-Ray: trace requests made through your distributed applications
- AWS Health Dashboard: status of all AWS services across all regions
- AWS Account Health Dashboard: AWS events that impact your infrastructure
- Amazon CodeGuru: automated code reviews and application performance recommendations

