# Procedural Generation In Game Design

## Chapter 26 Algorithms and Approaches

This chapter will act as a first-time hiker's map to the field of procedural generation.

### Random Numbers

#### Pseudorandom Number Generators

Random numbers play an important role for varied experience in a game.

Almost all development environments provide one or more random number generators to use. These are almost always pseudorandom number generators (PRNGs).

Pseudorandom number generators start from an initial seed value and perform a mathematical operation on the seed value to generate a new value. The new value is then used as the seed for the next iteration of the operation. The result is a sequence of numbers that appears to be random, but is actually deterministic.

### Making Use of Repeatable Series

The fact that PRNGs are deterministic is actually a useful feature. It means that if we start from the same seed value, we will always get the same sequence of numbers. This is useful for debugging and testing.

Also different players can share the same seed value to get the same experience for specific reasons.

Many multiplayer games with procedural aspects use pseudorandom number generators to ensure that all players see the same content.

IMPORTANT NOTE: Large worlds with information that can be generated from seeds do not need to save a potentially large amount of data to disk. But instead regenerate complex systems from those small initial seeds.

- There are some fine examples on this [site](https://www.filfre.net/hall-of-fame/), Elite is one of them.

### Seeds and Hashing

A hash function takes some input data and transform it into an output value. This output will be same for any given input. There are many common hash functions:

- MD5
- SHA family
- xxHash
- Murmer

Another helpful use of the fact that the hash values are statistically random is that you can use as much of the hash value as you need. For example, if you only need a 16-bit value, you can just take the first 16 bits of the hash value.

Some examples of using hash function on a game:

- A game allows player to enter an easily memorable seed value, like watermelons.
- A game generates a string describing the current date to provide a shared seed value.
- A game generates a string combining the current world seed and a specific solar system's identifying information, "Worldseed51234 Galaxy 5 Solar System 118".

### Rolling Dice

