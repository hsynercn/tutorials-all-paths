# Chaper 1. Reliable, Scalable, and Maintainable Applications

Many applications today are data-intensive, as opposed to compute-intensive.

Common building blocks for data-intensive applications:

- Databases: Store data so that they, or another application, can find it again later.
- Caches: Remember the result of an expensive operation, to speed up reads.
- Search indexes: Allow users to search data by keyword or filter it in various ways.
- Stream processing: Send a message to another process, to be handled asynchronously.
- Batch processing: Periodically crunch a large amount of accumulated data.

## Thinking About Data Systems

We can think about databases, queues, caches, etc. as tools for solving different problems as data systems. New tools are developed to solve specific problems. A single tool can't solve all problems.

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

Thins that can go wrong called faults. Systems that anticipate faults and can cope with them are called fault-tolerant or resilient.

Fault is not the same as a failure.

Failure is when the system as a whole stops providing the required service to the user.

It can make sense to increase the rate of faults by triggering them deliberately, to ensure that the system continues to work when faults occur. The Netflix Chaos Monkey is an example of this approach.

We generally prefer tolerating faults over preventing faults.

### Hardware Faults

Hardware faults are common. Hard disks crash, RAM becomes faulty, the power grid has a glitch, someone unplugs the wrong network cable. We can use hardware redundancy to mitigate the risk of individual hardware components failing. Also some platform such as Amazon Web Services (AWS) use virtual machines (VMs) to provide an abstraction of hardware.

### Software Errors

Another class of fault is a systematic error within the system.

- A software bug that causes every instance of a service to crash when given a particular bad input.
- A runaway process that depletes shared resources
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

The best choice of parameters depends on the architecture of your system, it may be requests per second to a web server, the ratio of reads to write in a database, the number of simultaneously active users in a chat room, the hit rate on a cache, or something else.

### Describing Performance

When you increase a load parameter and keep the system resources (CPU, memory, network bandwidth, etc.) unchanged, how is the performance of your system affected?

When you increase a load parameter, how much do you need to increase the resources if you want to keep performance unchanged?

Latency and response time are often used synonymously, but they are not the same. Latency is the duration that a request is waiting to be handled - during which it is latent, awaiting service. Response time is the delay between a request and the response being received.

Usually we use average response time, but it can be misleading. Percentiles are a better way to describe the distribution of response times.

The median is also known as the 50th percentile. We can understand the outliners by looking at percentiles. For example, the 95th percentile is the value for which 95% of the data are smaller. If the 95th percentile response time of a service is 1 second, that means 95 out of 100 requests take less than 1 second, and 5 out of 100 requests take 1 second or more. 99.9th percentile is often known as the tail latency.

Percentiles are often used in service level objectives (SLOs), which are a part of a service level agreement (SLA) between different teams in the same organization, or between organizations.
