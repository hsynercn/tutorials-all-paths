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

### Complexity Analysis Definition

The process of determining how efficient an algorithm. Complexity analysis usually involves finding both the time complexity and space complexity of an algorithm.

Complexity analysis is effectively used to determine how "good" an algorithm is and whether it's "better" than another one.

### Time Complexity

A measure of how fast an algorithm runs, time complexity is a central concept in the field of algorithms and in coding interviews. It is expressed using Big O notation.

### Space Complexity

A measure of how much auxiliary memory an algorithm takes up, space complexity is a central concept in the field of algorithms and in coding interviews. It is expressed using Big O notation.

## Memory

We will cover the memory scope for interview purpose. Memory is a big topic.

### Bit

Short for binary digit, a bit is a fundamental unit of information in computer science that represents a state with one of two values, typically 0 and 1.

### Byte

A group of 8 bits. A byte can store 256 different values. A byte stores 8 bits of information.

- 0000 0000
- 0000 0001
- 0000 0010
- 0000 0011

### Fixed-Width Integer

An integer represented by a fixed amount of bits. A 32-bit integer represented by 4 bytes, 64-bit integer is represented by 8 bytes.

### Memory Definition

Broadly speaking, memory is the foundation layer of computing, where all data is stored.

In the context of coding interviews, it's important to note following points:

- Data stored in memory is stored in bytes and, by extension, bits.
- Bytes in memory can "point" to other bytes in memory, to store references to other data.
- The amount of memory that a machine has is bounded, making it valuable to limit how much memory an algorithm takes up.
- Accessing a byte or a fixed number of bytes (like 4 bytes or 8 bytes in the case of 32-bit and 64-bit integers) is an elementary operation, which can be loosely treated as a single unit of operational work.

Endianness: The order in which bytes are stored in computer memory.

- Big Endian: The most significant byte (the "big end") of the data is placed at the byte with the lowest address.
- Little Endian: The least significant byte (the "little end") of the data is placed at the byte with the lowest address.

Most of the time we deal with fixed size data types. For example, in Java, int is 4 bytes, long is 8 bytes, char is 2 bytes, boolean is 1 byte.

Pointers: A pointer is a variable whose value is the address of another variable, i.e., direct address of the memory location.

## Big O Notation

We can't use the time duration to express time complexity. Mostly time cost of the algorithm effected by the size of the input.

```
f1(a) => 1 + a[0]   O(1)
f2(a) => sum(a)     O(N)
f3(a) => pair(a)    O(N^2)
f4(a) => f1 + f3    O(N^2)
f5(a) => 2*f1       O(N^2)
```

Asymptotic analysis: The process of evaluating the time and space complexity of an algorithm.

Better to worse time complexity:

```
O(1)
O(log(N))
O(N)
O(N*log(N))
O(N^2)
O(N^3)
O(N^4)
O(2^N)
O(N!)
```

We cannot simplify the different factors in the Big O notation:

```
O(M^2 + N)
```

### Big O Notation Definition

The notation used to describe the time complexity and space complexity of algorithms.

Variables used in Big O notation denote the sizes of inputs to algorithms. For example O(n) might be the time complexity of an algorithm that traverses through an array of length n. Similarly, O(n + m) might be the time complexity of an algorithm that traverses through an array of length n and through a string of length m.

The following are examples of common complexities and their Big O notations, ordered from fastest to slowest:

- Constant: O(1)
- Logarithmic: O(log(N))
- Linear: O(N)
- Log-Linear: O(Nlog(N))
- Quadratic: O(N^2)
- Cubic: O(N^3)
- Exponential: O(2^N)
- Factorial: O(N!)

Note that in the context of coding interviews, Big O notation is usually understood to describe the worst-case complexity of an algorithm, even though the worst-case complexity might differ from the average-case complexity.

## Logarithm

logb(x) = y if and only if b^y = x

log2(8) = 3

In computer science base of the logarithm is 2.

log(N) complexity is better than O(N) complexity. For each input duplication the time cost is only increased by 1.

### Logarithm Definition

A mathematical concept that's widely used in Computer Science and that's defined by the following equation:

logb(x) = y if and only if b^y = x

In the context of coding interviews, the logarithm is used the complexity analysis of algorithms, and its usage always implies a logarithm of base 2. In other words, the logarithm used in the context of coding interviews is defined by the following equation:

log(N) = y if and only if 2^y = N

In plain English, if an algorithm has a logarithmic time complexity (O(log(n))), where n is the size of the input, then whenever the algorithm's input doubles in size (i.e., whenever n doubles), the number of operations needed to complete the algorithm only increases by one unit. Conversely, an algorithm with a linear time complexity would see its number of operations double if its input size doubled.

As an example, a linear-time-complexity algorithm with an input of size n = 1,000 might take roughly 1,000 operations to complete, whereas a logarithmic-time-complexity algorithm with the same input would take roughly 10 operations to complete, since 2^10 ~= 1,000.

## Arrays


