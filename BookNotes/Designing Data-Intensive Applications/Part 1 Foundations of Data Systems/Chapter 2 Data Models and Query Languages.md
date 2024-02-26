# Chapter 2. Data Models and Query Languages

Data models are the most important part of developing software. 

- They effect how the software is written
- They effect how we think about the problem

Applications are built by layering one data model on top of another:

1. Application developer uses models to represent data from real world, creates APIs to manipulate those data structures. Those structures are often specific to the application.
2. We need to store those data structures, we express them in JSON, XML, tables in a relational database, or a graph model.
3. JSON/XML/Tables/Graphs are data in term of bytes in memory, on disk, or on a network. The representation may allow the data to be queried, searched, manipulated, and processed in different ways.
4. On the lower level it is electrical signals, magnetic fields, or optical media.

Each layer hides the complexity of the layer below it providing a clean data model.

Mastering a data model is already hard. But since the data model has such a profound effect on what the software above it can and can't do it, it is important to choose one that is appropriate for the application.

In this chapter we will look at a range of general-purpose data models for data storage and querying.

In particular, we will look at:

- Relational model
- Document model
- Graph model

We will also look at query languages for each of these models.
