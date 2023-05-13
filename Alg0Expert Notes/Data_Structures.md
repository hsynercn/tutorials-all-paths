# Data Structures

## Introduction

Coding interviews require:

- Some knowledge of computer science
- Basic knowledge of coding

Data structures are the tools to solve problems, they are tools for us.

In the context of coding interviews we need some foundational data structures knowledge. In this tutorial we will cover the foundations.

## What Are Data Structures?

Coding is about manipulating data. We use data structures to organize and manage the data.

Data structure is collections of data values, the relationships among them, and the functions or operations that can be applied to the data.

## Complexity Analysis

One problem could have multiple solutions. We need to know which solution is better.

Complexity analysis is a way to compare the efficiency of different approaches to a problem.

- Time complexity
- Space complexity

We need to know the time and space complexity of the data structures we use to decide which one to use when we solve a problem.

- Complexity Analysis: The process of determining how efficient an algorithm. Complexity analysis usually involves finding both the time complexity and space complexity of an algorithm.
  - Complexity analysis is effectively used to determine how "good" an algorithm is and whether it's "better" than another one.

- Time Complexity: A measure of how fast an algorithm runs, time complexity is a central concept in the field of algorithms and in coding interviews. It is expressed using Big O notation.

- Space Complexity: A measure of how much auxiliary memory an algorithm takes up, space complexity is a central concept in the field of algorithms and in coding interviews. It is expressed using Big O notation.

## Memory

We will cover the memory scope for interview purpose. Memory is a big topic.

A byte stores 8 bits of information. A bit is a binary digit, it can be 0 or 1.

- 0000 0000
- 0000 0001
- 0000 0010
- 0000 0011

A byte can store 256 different values.

For bigger numbers, we need more bytes. And we need to use back to back empty bytes to allocate more memory.

Endianness: The order in which bytes are stored in computer memory.

- Big Endian: The most significant byte (the "big end") of the data is placed at the byte with the lowest address.
- Little Endian: The least significant byte (the "little end") of the data is placed at the byte with the lowest address.

Most of the time we deal with fixed size data types. For example, in Java, int is 4 bytes, long is 8 bytes, char is 2 bytes, boolean is 1 byte.

Pointers: A pointer is a variable whose value is the address of another variable, i.e., direct address of the memory location.
