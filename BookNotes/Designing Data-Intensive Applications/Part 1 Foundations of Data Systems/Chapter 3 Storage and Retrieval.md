# Chapter 3. Storage and Retrieval

A database do 2 things:

- store data 
- provide data when requested

This chapter will explain the mechanics of database internally.

We need to know internals of Q database to use it optionally, at least as a rough idea.



There are 2 main groups of storage engines:

- optimized for transactional workloods
- optimezed for analytics


For this chapter we will mainly focus on relational and nosql databases, we will examine 2 families of storage engines:

- log structured
- page oriented

## Data structures that power your database


Imagine we have a basic database with 2 methods:

- db-set
- ab-get

These functions implement a key-value store, imagine this is a text file like csv and it is storing values by appending new valves et the end of file
, without deleting the existing records.

Mostly appending to end of a file is a efficient operation. Similarly many databases ux e similar mechanism.

They use log, in ise append only data file. There are additional issues for a real database like concurrency, reclaiming disk.

Logs are very useful in general.

In contrast read operation is very costly, we need to scan all of the records, search cost will be o(n).

Cost will increase with the increasing size of records in complexity is not good.

For better search performance we can use indexes. Indexes are the tables for finding. 

We can use multiple indexes to tind the data with different ways.

An index is an additional data derived from the primary data. We can add indexes freely.

Most of the databases allow it. But there is a cost, when we add records we need to update indexes.

This will increase the cost and slow downs the writes.

This is a trade off, increasing read speed slows write speed. Thus we need to select indexes manually.


## Hash indexes

We can start with indexes for key value data, we can use indexes for different types off data.

Key value store is a familiar concept to programming languages, we can find it as hash maps.

For our log store simply we can store the start offset of our records on our table.

Bitcost is an example which follows this approach, hash map is kept on memory.

Values can use more space than ram, we have them so if necessary we can get them from memory.

Bitcase is well suited for high count of writes - but if there are lots of distinct keys it can be infeasible.

As we described if we only append to a file we can run out  disk space. We need to use e methot to solve this problem.

A solution con be using segments with certain size when we reach a limit we will create a new segment and close the old one.

We will made subsequent writes to new segment. We con apply compaction on these segments. It will delete dublicated records - and keep the most recent ones.

Compaction will decrease the sizes significantly, if the segment is not polluted by different keys it should decrease the size

Also we can merge multiple segment after compaction. Segments are never modified after they reached the size limit merged segments will be written to a new file.


Merging and compacting operation can be done as a background task.


We can still serve reads from the old segment file and write requests to new segment file.

After the merging completed we will switch to latest segment file, read will performed from new merged segment file old segment file can be deleted.







































.



