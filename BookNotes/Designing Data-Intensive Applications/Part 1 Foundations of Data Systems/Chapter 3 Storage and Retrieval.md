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

Log structered storage segment is a sequence of key-value pairs. We use the most recent value for a specific key. Other than that we don't care about order of key value pairs.

If we change the segment format and mode key value pairs ordered by key.

We will get sorted string table, SSTable in short.in this format we can't simply append new records.

SSTables have some advantages to log segments with hash indexes:

1. Merging segments is simple end cheap. Even it will work with bigger files than available memory. This approach will use mergesort algorithm it will read files side by side and copy the lowest key to output file this approach will create sorted new segment files. If we find the same value in multiple segment we can use the most recent segment as the real value and discard others.
2. Searching for a specific key is easy, we don't have to keep the index of all values. We have a sorted space and we can navigate in this space when we are searching for a value. Still we may need some sparse indexing for several kilobytes.
3. Since read is scanning several key value pairs it is possible to group those records into a block and compress it by this way also we can reduce io bandwidth usage.

### Constructing and maintaining SSTables

How do we keep our data sorted.

Keeping a sorted structure on dise is possible by B trees. Maintaining on memory is much easier.

We can use red black trees or AVL trees.

- When a write comes odd it to an in memory balanced tree data structure. This tree is sometimes called a memtable.
- When memtable gets bigger write it out as an SSTables. This SSTables becomes the most recent segment of the database. Database writes can continue with new memtable instance.
- When we serve values first we well check memtable, after that most recent segment on disk.
- Periodically we will run compaction on segment files.


This design has one problem, if the database crashes memtable gets lost to avoid this problem we can keep e separate log on disk.

That log can recover the memtable - we will reset after each segment write.

### Making an LSM-tree out of SSTable

Loy structured merge tree, it is based on earlier work on log structured file systems.

Storage engines that are based on this principle of merging end compacting sorted files are often called LSM storage engines.

Lucene is an indexing engine for full text search, it uses a term dictionary. It stores word as keys and the list of ids of the documents as values. This mapping sotred as a SSTable-like sorted file, merged at the background if needed.

### Performance optimizations

We need to pay attention to details when we optimize a storage engine.

As an example LSM-tree algorithm is slow whne we check an unexisting value. First we check the memtable, after we check the segments from most recent one to oldest one. After that we can be sure the value does not exists.

To optimize this operation we can use a Bloom filter, it is a memory efficient data structure to approximate contents of a set.

There are also different strategies for order and timing of compaction and merging operations. Common options are size tiered and leveled compaction. Size tiered compaction new and smaller SSTables are merged into older und larger SSTables. Leveled compaction splits key range into smaller SSTables and older data is moved into separate levels.

The basic idea of log structured merge tree ( LSM-tree ) is keeping SSTables and merging them in the background.

## B-Trees

Log structured indexes have sone level of acceptance but they ere not the most common index type.

Most popular indexing type is B-Trees.

It is introduced in 1970, still it is the common index type for relational databases and for some nonrelational databases.

B-Trees and SSTable keep the key value pairs sorted. With different ways.


Log structured indexes splits database into variable size segments. Commonly several megabytes or more. Log structured indexes write a segment sequentially always.

B-Trees break the database into fixed size blocks. Most commonly 4 KB pages ( blocks ). And B-Trees will read or write one page at a time.

This approach is closer to disk hardware, disks are also arranged in fixed size blocks.

Each page can be identified with en addres, by this way one page can refer to another page and create a tree.

One page will be the root, when we look for a key we start from there. The page will store several keys and references to child pages. Each child will store a range of keys. We will go down until we find the individual record.

Branching factor: number of child page references in a page. Generally it is several hundreds.

When ve update a record we will find the related page and write that page with the updated value.

Adding a new record can be tricky. We need to find the related key range page and insert to record there. But if there is no space in that page we need to splot that page to 2 and insert that record.

This approach keeps the tree balanced, n keys will always has a depth of O ( log n ).

A 4 level tree of 4 KB pages with a 500 branching factor can store 250 TB.

### Making B-Trees reliable

Basic write operation of a B-Tree is to overwrite a page ondish with new data.

We accept overwrite does not change the location of the page. This is opposite to LSM-trees, they work append only.

We can think overwriting a page as a hardware operation. A magnetic hard drive positions head to correct location and overwrite that sector. SSD will word differently in some aspects yet it does the same thing.

Some operations require different pages to be overwritten. If we split a page because of size adjustment we need to write 2 pages also ve need to update parent page.

Updating multiple pages at a time is a risky job. If the task gets interrupted we will face corrupted records even with a orphan page.
 
B-Trees usually include a write ahead log ( WAL or redo log ), this file contairs the tree changes. This log can be used for restore operation after a crash.

Another complication is providing concurrent access to pages .B-Trees use latches (lightweight locks).

### B-Tree optimizations

There are several optimizations:

1. Some databases use copy on write scheme. A modified page is written to a different location and parent pages will be replaced.

2. We can use shorter keys for boundaries, we don't have to store full keys. More keys in a page provides higher branching factor which means fewer levels.

3. In general pages can be randomly distributed on disk. They don't have to be ordered. Some B-Tree implementions are trying to keep pages in order but it is hard because growing creates new pages. In contrast LSM-tree does compaction and merging which keeps keys sequential. If we need sorted order key scans performance will be different.

4. Leaf pages can contain left and right sibling page pointer for ordered key scans.

5. B-Tree variants such as fractal trees uses some log structured applications to reduce disk seeks.

## Comparing B-Trees and LSM-Tree

B-Tree implementations are usually more mature than LSM-Tree implementations. LSM-Tree is faster for writes, B-Tree is faster for reads.
 
### Advantages of LSM-Tree

B-Tree index writes every data twice at minimum, first on the write ahead log, later on the tree page.

Also ve have overhead from writing the entire page. Some storage engines writes whole page twice for redundancy.

Log structured indexes also rewrite data multiple times because of compaction and merging.

This write abundancy creates the write amplification. And it could be a concern for SSD hardware which the write operations are limited.

Write amplification can also harm the performance of database by creating write bottlenecks.

LSM-Trees sustain higher write through put than B-Trees, partly this caused by lesser write amplification, partly they write pages sequentially rather than overwriting pages. This is a important difference for magnetic hard drives.

LSM-Trees can be compressed better and create smaller files on the disk than B-Trees. B-Trees can create fragmentation because of split pages.

Most ot SSDs use un interned log structure algorithm to turn random writes into sequential writes on the low level chip.

Still lower write amplification is a benefit on SSDs.






















































