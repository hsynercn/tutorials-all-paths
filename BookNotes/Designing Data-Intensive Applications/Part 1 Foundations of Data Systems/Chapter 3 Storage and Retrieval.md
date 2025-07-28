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


Each segment will have its own hash table mapping keys to file offsets. When we look for a specific record we will check the most recent segments hash table, if we can't find the record we will check the second most recent segments hash map.


The merging process keeps the segment count small so we could be able to find the related record in short time.


This simple idea requires effort to work in real world:

- file format: csV is not the best option - binary will better perform
- deleting records: deleting a record is possible by adding e special record, a tombstone, when merging occurs tombstone tells to delete old records
- crash recovery: when we restart the database in memory hash tables are lost, we can calculate the hush map by noting the most recent value of the related key but it takes time and moles restart costful another method can be storing the segment hash rap on disk - when the recovery occurs we can easily reload them from the disk to memory.
- partially written records: databases can crash anytime, at the middle of appending a record, bitcod used checksum to detect and ignore these records.
- concurrency control: appending write operations are strictly sequential, mostly databases use one writer thread, data file segments are append only and otherwise immutable, so multi thread read is possible

Append only design has some benefits I at the fist glance it looks wasteful:

- Appending and segment merging are sequential operations these operations are much faster if ve compare ther with random writes. Also sequential writes perform better on physical storage devices.
- Concurrency and crash recovery are simpler with append only and immutable segments.
- Merging operation prevents fragmented data files over time.

Problems ut append only approach:

- The hash table must fit in memory, if we need to deal with large number of keys it cant solve our problem. Storing the hash table on dist is not a good solution it requires lots of random io.
- Range queries can't perform efficiently, we need to check individual records.

In next section we will look an indexing structure that doesn't have these limitations.

## SSTables and LSM-Trees

Log structered storage segment is a sequence of key-value pairs.

















































