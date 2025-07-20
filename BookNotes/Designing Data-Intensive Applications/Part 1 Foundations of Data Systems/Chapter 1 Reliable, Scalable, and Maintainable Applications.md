## Chapter 1. Reliable, Scalable, and Maintainable Applications

Reliability: tolerating hardware and software errors, human faults

Scalability: measuring load and performance latency percentiles, throughput

Maintainability: operability, simplicity, easy to change

Many applications today are data-intensive, as opposed to compute-intensive.

Limiting factor is not the cpu, it is the amout and complexity of the data.

Common building blocks for data-intensive applications:

- Databases: Store data so that they, or another application, can find it again later.
- Caches: Remember the result of an expensive operation, to speed up reads.
- Search indexes: Allow users to search data by keyword or filter it in various ways.
- Stream processing: Send a message to another process, to be handled asynchronously.
- Batch processing: Periodically crunch a large amount of accumulated data.

When building an application, we still need to figure out which tools and which approaches are the most appropriate for the task at hand. And it can be hard to combine tools when you need to do something that a single tool can't do.

Main goal is creating reliable, scalable, maintainable data systems.

## Thinking About Data Systems

We can think about databases, queues, caches, etc. as tools for solving different problems as data systems. New tools are developed to solve specific problems. A single tool can't solve all problems.

! We use different tools for different smaller tasks, and application creates the required integration.

There will be many concerns when we create# date system, our organization structure, legacy infrastructure, time limits. 

In this book we will focus on the following properties of data systems:

- Reliability: The system should continue to work correctly (performing the correct function at the desired level of performance) even in the face of adversity (hardware or software faults, and even human error).

- Scalability: As the system grows (in data volume, traffic volume, or complexity), there should be reasonable ways of dealing with that growth.

- Maintainability: Over time, many different people will work on the system (engineering and operations, both maintaining current behavior and adapting the system to new use cases), and they should all be able to work on it productively.

## Reliability

- The application performs the function that the user expected.
- It can tolerate the user making mistakes or using the software in unexpected ways.
- Its performance is good enough for the required use case, under the expected load and data volume.
- The system prevents any unauthorized access and abuse.

Roughly it means "continue to work correctly, even when things go wrong".

Things that can go wrong called faults. Systems that anticipate faults and can cope with them are called fault-tolerant or resilient.

Fault is not the same as a failure.

Failure is when the system as a whole stops providing the required service to the user. Fault mecens one system component is deviating from standard.

It is best to design fault-tolerant systems that prevent faults from causing failures.

It can make sense to increase the rate of faults by triggering them deliberately, to ensure that the system continues to work when faults occur. The Netflix Chaos Monkey is an example of this approach.

We generally prefer tolerating faults over preventing faults.

### Hardware Faults

Hardware faults are common. Hard disks crash, RAM becomes faulty, the power grid has a glitch, someone unplugs the wrong network cable. We can use hardware redundancy to mitigate the risk of individual hardware components failing. Also some platform such as Amazon Web Services (AWS) use virtual machines (VMs) to provide an abstraction of hardware.

Designing for failure is an important part of building reliable systems.

### Software Errors

Software errors ere messy, harder to deal.


Another class of fault is a systematic error within the system.

- A software bug that causes every instance of a service to crash when given a particular bad input.
- A runaway process that depletes shared resources, like network or cpu#
- A service that the system depends on is slow or unavailable
- Cascading failures where a small fault in one component triggers a fault in another component, which in turn triggers further faults.

Some bugs can lie dormant for a long time until a particular rare combination of circumstances causes them to manifest as a failure.

### Human Errors

Humans cause the majority of outages.

- Design systems in a way that minimizes opportunities for error. However, if we make an interface people will work around them.
- Decouple the places where people make the most mistakes from the places where they can cause failures. Sandbox environments, safe ways to test changes before deploying them to production.
- Test thoroughly at all levels, from unit tests to whole-system integration tests and manual tests.
- Allow quick and easy recovery from human errors, to minimize the impact in the case of a failure.
- Set up detailed and clear monitoring, such as performance metrics and error rates. In other engineering disciplines this is referred to as telemetry.
- Implement good management practices and training for operations engineers, so that they are less likely to make dangerous mistakes.

### How Important Is Reliability?

Even 'noncritical' systems can be very important to the people who use them, they have responsibility.

## Scalability

Even if a system is working reliably today, that doesn't mean it will necessarily work reliably in the future. What happens if the concurrent number of users of the app increases?

Scalability is the term we use to describe a system's ability to cope with increased load.

### Describing Load

Firstly we need to describe the current load on the system, only then we can discuss growth questions.

The best choice of parameters depends on the architecture of your system: 

- It may be requests per second to a web server
- The ratio of reads to write in a database
- The number of simultaneously active users in a chat room, the hit rate on a cache, or something else.

For a more concrete example we can look at Twitter. Two of Twitter's main operations are:

- Post tweet: A user can publish a new message to their followers (4.6k requests/sec on average, 12k requests/sec at peak)
- Home timeline: A user can view tweets from the people they follow (300k requests/sec)

Main problem is fan-out. When a user posts a tweet, it needs to be delivered to all of their followers. This is a write-heavy workload.

There are broadly two ways of implementing these two operations:

1 - Posting a tweet simply inserts the new tweet into a global collection of tweets. When a user requests their timeline, we can look up all the people they follow, find all the tweets for each of those users, and merge them together to form the user's home timeline. This is a read-heavy workload.

SQL could look like this:

```sql
SELECT tweets.*, users.* FROM tweets
JOIN users ON tweets.sender_id = users.id
JOIN follows ON follows.followee_id = tweets.sender_id
WHERE follows.follower_id = :current_user
```

2 - Maintain a cache for each user's home timeline like a mailbox of tweets for each recipient. When a user posts a tweet we can look up all the people who follow that user, insert the new tweet into each of their home timeline caches. The request to read the home timeline is then cheap, because its result has been computed ahead of time.

Firstly Twitter used the first approach, but the systems struggled to keep up with the load of home queries. Then they switched to the second approach. This works better because read load is much higher than write load.

Downside of this approach is posting a tweet is more expensive, because it needs to be delivered to all followers.

Final thing is Twitter is using a hybrid approach. Most users' tweets continue to be fanned out to home timelines at the time when they are posted. But a few users with a very large number of followers are excepted from this fan-out. Tweets from celebrities are fetched separately and merged with that user's home timeline when it is read.

### Describing Performance

When we describe the load on your system, we can investigate how system behaves under that load.

- When you increase a load parameter and keep the system resources (CPU, memory, network bandwidth, etc.) unchanged, how is the performance of your system affected?

- When you increase a load parameter, how much do you need to increase the resources if you want to keep performance unchanged?

In some cases we pay attention to throughput, for online services response tire is more important.

Latency and response time are often used synonymously, but they are not the same.

Latency is the duration that a request is waiting to be handled - during which it is latent, awaiting service. Response time is the delay between a request and the response being received.

Usually we use average response time, but it can be misleading. Percentiles are a better way to describe the distribution of response times.

The median is also known as the 50th percentile. We can understand the outliners by looking at percentiles. For example, the 95th percentile is the value for which 95% of the data are smaller. If the 95th percentile response time of a service is 1 second, that means 95 out of 100 requests take less than 1 second, and 5 out of 100 requests take 1 second or more. 99.9th percentile is often known as the tail latency.

Percentiles
- 95th → p95
- 99th → p99
- 99.9th → p999

Percentiles are often used in service level objectives (SLOs), which are a part of a service level agreement (SLA) between different teams in the same organization, or between organizations.

We cannot ignore the high percentiles, they are also known as tail latencies. They can be a source of user complaints. Customers with the slowest experience are often the most valuable customers. Because they have the most data.

### Percentiles In Practice

High percentiles easily become important. Even in parallel requests, if one of them is slow, it can slow down the whole process on the client side. This could make the whole flow slow, this is known as tail latency amplification.

We can calculate percentiles by keeping a histogram of response times.

- Forward decay: Older data is exponentially less significant. This is useful for tracking recent changes in the system's performance.
- TDigest: A data structure that allows you to estimate percentiles with a small amount of memory, even with a large number of data points and in a distributed system.
- HdrHistogram: A data structure that allows you to accurately represent and analyze the distribution of recorded values, even at extremely large scales.

### Approaches for Coping with Load

How do we maintain good performance as load increases?

An architecture that is appropriate for one level of load is unlikely to cope with 10 times that load.

Scaling up: Vertical scaling. Moving to a more powerful machine.

Scaling out: Horizontal scaling. Distributing the load across multiple smaller machines.

There is a dichotomy between scaling up and scaling out.

Usually good architecture involves a combination of both.

For example using several fairly powerful machines can be still can be simpler and cheaper than using many smaller machines.

Some systems are elastic, they can automatically add computing resources when they detect a load increase. Others require manual intervention.

Distributing stateless services is relatively easy. Distributing stateful services is much harder. Thus keeping the dat/state on a single node is easier until scaling costs become too high.

In future distributed systems will become default even for small applications.

Architecture is specific to problem:

- volume of the reads
- volume of the writes
- volume of the data of store
- complexity of the data
- access patterns
- mixture of everything

### Maintainability

It is a known fact majority of the cost of software is not the initial development but the ongoing maintenance.

- Bug fixing
- Keeping the system operational
- Investigating the causes of failures
- Adapting new platforms
- Modifying it for new use cases
- Repaying technical debt
- Adding new features

Every legacy system is unpleasant in its own way, so it is difficult to give general advice.

To minimize the pain during maintenance, we can follow some principles:

- Operability: Make it easy for operations teams to keep the system running smoothly.
- Simplicity: Make it easy for new engineers to understand the system, by removing as much complexity as possible from the system.
- Evolvability: Make it easy for engineers to make changes to the system in the future, adapting it for unanticipated use cases as requirements change. Also known as extensibility, modifiability, or plasticity.

#### Operability: Making Life Easy for Operations

Good operations can often work around the limitations of bad (incomplete) software, but good software cannot run reliably with bad operations.

A good operations team is responsible for:

- Monitoring the health of the system and restoring service if it goes into a bad state.
- Tracking down the cause of problems, such as system failures or degraded performance.
- Keeping software and platforms up to date, including security patches and hardware upgrades.
- Etc.

Good operability means making routine tasks easy, allowing the operations team focus their efforts on high value activities. Data systems can do various things to make routine tasks easy:

- Providing visibility into the runtime behavior of the system, with good monitoring
- Providing good support for automation and integration with standard tools
- Avoiding dependency on individual machines
- Providing good documentation and an easy-to-understand operational model
- Providing good behavior, giving admins to override the system's defaults
- Self-healing where possible
- Exhibiting predictable behavior, minimizing surprises

#### Simplicity: Managing Complexity

Small software projects are simple, when they grow they become complex.

This complexity slows down everyone who needs to work on the system, further increase the cost of maintenance. A complex software project described as a "big ball of mud".

There are several symptoms of complexity:

- Explosion of complexity
- Explosion of state space
- Tight coupling of modules
- Tangled dependencies
- Inconsistent naming and terminology
- Performance problem hacks
- Special casing to work around issues

When complexity makes the maintenance hard, budgets and schedules are often overrun. In complex software there is also a greater risk of bugs.

Making a system simpler does not necessarily mean reducing its capabilities. It means removing accidental complexity.

Moseley and Marks define accidental complexity as complexity that is not inherent in the problem that the software solves, but arises only from the implementation.

Abstraction is a good tool to remove accidental complexity. But it is hard to find good abstractions.

#### Evolvability: Making Change Easy

System requirements change over time.

Agile organizational process provide a framework for adapting to change.

Simple and easy-to-understand systems are easier to change than complex systems.

### Summary

This chapter explains the fundamental ways of thinking about data-intensive applications.

An application has to meet various requirements in order to be useful:

- Functional requirements: Do what it is supposed to do
  - Store data
  - Retrieve data
  - Search data
  - Process data
- Nonfunctional requirements: General properties
  - Reliability
  - Scalability
  - Maintainability
  - Security
  - Compatibility

RELIABILITY: Making system correctly even when faults occur.

SCALABILITY: Keeping the performance good even under high load.

MAINTAINABILITY: Making it easy for engineers to work on the system. Reduce complexity, make it good to operate.

There is no easy way to achieve these properties. However, there are some patterns and techniques that can help.