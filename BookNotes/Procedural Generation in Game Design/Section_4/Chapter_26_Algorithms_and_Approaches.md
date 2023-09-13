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
- A game generates a string combining the current world seed and a specific solar system's identifying information, "Worldseed51234 Galaxy 5 Solar System 118". This will allow the solar system to be generated again exactly the same way if the player later visits it again.

### Rolling Dice

We can say getting random number is like rolling a dice. We can use this analogy to explain the concept of probability.

- d100s are commonly used as percentile success roll, checking if that roll is less than or equal to the percentage chance of something happening.
- Small dice pools can be used for any numbers that need to have highly tunable ranges.

### Normal Distribution

It is often useful to generate a normal "bell curve" or "Gaussian" distribution of numbers instead of a linear one.

```
GaussianRandomNumber(mean,std) {
    A = random number between 0 and 1
    B = random number between 0 and 1
    C = sqrt(-2 * ln(A)) * cos(2 * pi * B)
    return C * std + mean
}
```

There are faster known algorithms like [Ziggurat algorithm](https://en.wikipedia.org/wiki/Ziggurat_algorithm).

Some examples of using normal distribution:

- Generating a random temperature for particular day of the year.
- Deciding what time a NPC prefers to go bed.
- Deciding the size of a planet in a solar system.

### Weighted Distribution

```mermaid
  graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
```
