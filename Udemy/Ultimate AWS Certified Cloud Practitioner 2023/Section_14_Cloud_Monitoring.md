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

