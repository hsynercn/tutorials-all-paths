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

### SQS Overview

- Simple Queue Service (SQS) is a managed message queue service
- Producers will send messages to the queue
- Consumers will retrieve messages from the queue and process them
- Oldest AWS offering (over 10 years old)
- Fully manages service, used to decouple applications
- Scales from 1 message per second to 10,000s per second
- Default retention of messages: 4 days, maximum of 14 days
- No limit to how many messages can be in the queue
- Messages are deleted after they are read by consumers
- Low latency (<10 ms on publish and receive)
- Consumers share the work to read messages and scale horizontally

SQS to decouple applications or integrate applications.

Video processing example:

- Requests goes to web server (Auto Scaling Group)
- SQS Queue (decoupling)
- Video processing workers (Auto Scaling Group)

FIFO Queue: First In First Out, messages are processed in order, one by one.

### Kinesis Overview

- Kinesis = real-time big data streaming
- Managed service to collect, process, and analyze real-time streaming data at any scale
- Kinesis Data Streams: low latency streaming ingest at scale from hundreds of thousands of sources
- Kinesis Data Firehose: load streams into S3, Redshift, ElasticSearch, Splunk
- Kinesis Data Analytics: perform real-time analytics on streams using SQL
- Kinesis Video Streams: monitor real-time video streams for machine learning

### SNS Overview

- SNS (Simple Notification Service)

What if we need to send one message to many services?

- Direct integration: Application 1 sends a message to Application 2, Application 3, Application 4
- Pub / Sub: Application 1 sends a message to SNS, which fans out to Application 2, Application 3, Application 4


Details:

- The event publisher only sends massages to one SNS topic
- As many event subscribers as we want to listen to the SNS topic notifications
- Each subscriber to the topic will get all messages
- Up to 12.500.000 subscriptions per topic, 100.000 topics limit per account

### Amazon MQ Overview

