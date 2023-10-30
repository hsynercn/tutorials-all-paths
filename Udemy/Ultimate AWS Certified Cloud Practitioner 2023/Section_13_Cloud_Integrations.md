# Ultimate AWS Certified Cloud Practitioner 2023

## Section 13 Cloud Integrations

### Cloud Integrations Overview

When we start deploying multiple applications, they will inevitably need to communicate with each other.

There are two patterns of application communication

- Synchronous communication: Application 1 calls Application 2 and waits for a response (application to application)
- Asynchronous communication: Application 1 sends a message to Application 2 without waiting for a response (application to queue to application)

- Synchronous between applications can be problematic if here are a sudden spikes of traffic
- What if you need to suddenly encode 1000 videos but usually it is only 10 videos?
- In that case it is better to decouple your application:
  - using SQS: queue model
  - using SNS: pub/sub model
  - using Kinesis: real time data streaming model
- These services can scale independently from your application



