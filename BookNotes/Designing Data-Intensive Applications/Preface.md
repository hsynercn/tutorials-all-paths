# Dedication

Tech is a powerful force in our society. Data, software, and communication can be used for bad: to entrench unfair power structures, to undermine human rights, and to protect vested interests. But they can be used for good: to make underrepresented people's voices heard, to create opportunities for everyone, and to avert disasters. This book is dedicated to everyone working toward the good.

# Preface

In the last decade we have seen many interesting developments in databases, in distributed systems, and in the ways we build applications on top of them.

- Companies are handling huge volumes of the data and traffic, they are creating new tools to handle this scale.
- Businesses need to be agile, test cheap and fast a new idea.
- Free and open source software has become very successful.
- Multi-core processors are now standard, networks are getting faster. Parallelism increases.
- IaaS as AWS makes it possible to work distributed systems even for small teams.
- We don't face outages regularly.

We call an application data-intensive if data is its primary challenge—the quantity of data, the complexity of data, or the speed at which it is changing—as opposed to compute-intensive, where CPU cycles are the bottleneck.

Tools and technologies that help us with data-intensive applications are adapting:

- NoSQL databases
- Message queues
- Caches
- Search indexes
- Stream processing frameworks

Many applications use some combinations of these.

## Who Should Read This Book

Who should know:

- How to make a data system scalable
- Highly available
- Maintainable

## Scope of This Book

The architecture of data systems and the ways are integrated into data-intensive applications.

Open platforms also reduce risk of vendor lock-in.

## Outline of This Book

Part 1: Fundamental ideas of data-intensive application design

- Chapter 1: Reliability, scalability, and maintainability
- Chapter 2: Compare several data models and query languages
- Chapter 3: Storage engines
- Chapter 4: Formats for data encoding(serialization) and evolution of schemas

Part 2: Distributed data

- Chapter 5: Replication
- Chapter 6: Partitioning/sharding
- Chapter 7: Transactions
- Chapter 8: Distributed system problems
- Chapter 9: Consistency and consensus in distributed systems

Part 3: Derived data

- Chapter 10: Batch processing
- Chapter 11: Stream processing
- Chapter 12: The future of data systems


