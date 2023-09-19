# Procedural Generation In Game Design

## Chapter 26 Algorithms and Approaches

This chapter will act as a first-time hiker's map to the field of procedural generation.

### Random Numbers

#### Pseudorandom Number Generators

Random numbers play an important role for varied experience in a game.

Almost all development environments provide one or more random number generators to use. These are almost always pseudorandom number generators (PRNGs).

Pseudorandom number generators start from an initial seed value and perform a mathematical operation on the seed value to generate a new value. The new value is then used as the seed for the next iteration of the operation. The result is a sequence of numbers that appears to be random, but is actually deterministic.

#### Making Use of Repeatable Series

The fact that PRNGs are deterministic is actually a useful feature. It means that if we start from the same seed value, we will always get the same sequence of numbers. This is useful for debugging and testing.

Also different players can share the same seed value to get the same experience for specific reasons.

Many multiplayer games with procedural aspects use pseudorandom number generators to ensure that all players see the same content.

IMPORTANT NOTE: Large worlds with information that can be generated from seeds do not need to save a potentially large amount of data to disk. But instead regenerate complex systems from those small initial seeds.

- There are some fine examples on this [site](https://www.filfre.net/hall-of-fame/), Elite is one of them.

#### Seeds and Hashing

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

#### Rolling Dice

We can say getting random number is like rolling a dice. We can use this analogy to explain the concept of probability.

- d100s are commonly used as percentile success roll, checking if that roll is less than or equal to the percentage chance of something happening.
- Small dice pools can be used for any numbers that need to have highly tunable ranges.

#### Normal Distribution

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

#### Weighted Distribution

We can create more common results and some rare results by using weighted distribution. Also we can use not return policy on the bag.

Some examples for weighted distribution:

- Picking random encounter templates from a list of possible hand-created templates.
- Selecting materials for a randomly generated item.
- Shopkeeper inventory generation.

### Height Maps

2D grids of smoothly varying values are called height maps.

#### Box Linear Filters

Box blur provides a means to create a smooth height map with a controllable method of placing the peaks.

#### Midpoint Displacement

Midpoint displacement is a technique used in computer graphics and terrain generation to create natural-looking landscapes or surfaces with fractal-like features. It's also known as the diamond-square algorithm, and it's a simple method for generating heightmaps or terrain elevation data. This technique is particularly popular in generating realistic terrain for computer games, simulations, and procedural map generation.

#### Perlin and Simplex Noise

Perlin and simplex noise are two of the most common noise functions used in procedural generation. They produce gradients that have rolling waves that appear at similar rates in every direction.

Simplex has advantages over Perlin noise, it is faster to generate. It is visually isotropic in all directions. Perlin noise has some directional artifacts. But it is under patent. OpenSimplex noise is a variant of simplex noise that is not under patent.

### Sequence Generation

#### Lindenmayer Systems (L-Systems)

L-systems are a type of formal grammar that can be used to generate fractal-like structures. They are named after the biologist Aristid Lindenmayer, who originally developed them to describe the growth of plants.

- Generating road divisions and building placement sequence for a city.
- Branching headwaters of a river system.
- Generating branching road systems and satellite villages around a major trade hub.

#### Markov Chains

Markov chains produce a sequence by utilizing a directed graph of nodes. Each node has a set of possible transitions to other nodes. Each transition has a probability associated with it. The sequence is generated by starting at a particular node and then randomly choosing a transition to follow. The process is repeated until a termination condition is met.

- Generating music from note patterns.
- Simulating the volatile mood swings of dwarves.
- Generating random recipes.

### Filling Space

#### Random Walks

Random walks are a simple technique for filling space with a sequence of points. The process starts with a single point. Then, at each step, a random direction is chosen and a new point is placed in that direction. The process is repeated until the desired number of points have been placed.

- One dimensional random walk
- Two dimensional random walk

A powerful method of maze generation is a series of loop-erased random walks (Wilson's algorithm).

Some applications:

- Creating river systems between mountains and bodies of water.
- Creating road systems between points of interest.
- Creating systems of caverns.
- Connecting the doors of rooms generated by a separated method.
- Creating sewer layouts.

#### Cellular Automata

Cellular automata are a broad category of systems that operate on a graph of discrete cells.

A common and familiar cellular automata is Conway's Game of Life. It is a two-dimensional grid of cells. Each cell has two possible states: alive or dead. The state of each cell is determined by the state of its eight neighbors. The rules are:

Rules of Conway's Game of Life:

- Live: 0 or 1 neighbors -> dead
- Live: 2 or 3 neighbors -> live
- Live: 4 or more neighbors -> dead
- Dead: 3 neighbors -> live

Rules for a simplistic 2D cave map generator:

- Open: 6 - 8 wall neighbors -> wall
- Wall: 0 - 4 wall neighbors -> open

Caves of Qud is using cellular automata to create caves. Algorithm begins with a 55% chance to contain a wall, and it runs above rules for 2 iterations.

Some applications:

- Simulating grow patterns for spreading plants and forests.
- Simulating spreading fire.
- Simulating migration and proliferation patterns for animals.

#### Settling

A settling algorithm takes a set of assorted shapes that are generated with some overlap. A physic simulation is run to allow the shapes to settle into a stable configuration.

Some applications:

- Generating a pile of randomly sized dungeons rooms with larger physics colliders than the interior rooms to allow them to settle into a stable configuration.
- Generating a pile of very randomly shaped areas and allowing them to settle out, creating a cave system.
- Generating a sewer system from piles of straight and curved sections.

#### Wang Tiles

Wang tiles are a set of square tiles with colored edges. The tiles are placed in a grid such that the edges of adjacent tiles match. The tiles are chosen randomly from a set of tiles that have the same edge colors.

Some applications:

- The placement of hand-built tiles with predefined edge connections for 2D platformer levels.
- Adding hand-built details to a room.
- Creating large forests of trees.

### Partitioning Space

It is often the case in generating procedural content that you have an open, unidentified space that you need to partition into set of regions.

#### Binary Space Partition

A binary partition takes a given space and splits it in half, and then takes two areas that were created and splits those in half, and repeats until some threshold is reached.

Caves of Qud builds the internal structure of many types of ruins by using a simple binary space partition space. Each time the area is split, a door is placed in the wall between the two new areas.

Example use cases:

- To create a traditional Rogue-style room layout, you can place a smaller rectangular room inside the borders of each generated region and connecting to the adjacent regions with hallways.
- Filling an area with walls and doors to form connected rooms.

#### Voronoi Diagrams

A Voronoi diagram is a constructed by taking a set of seed points on a plane and partitioning plane so that the region containing each seed contains only the points on the plane closest to the seed. Mostly we use them to partition space into regions.

Some use cases:

- Generating the areas of farmed fields from the placement of farmhouses in a countryside.
- Generate territorial control of dragons from the placement of their lairs.

#### Dijkstra Maps

Dijkstra maps partition space in a manner similar to that of Voroni diagrams; however, they work on a discrete graph instead of a continuous plane.

A Dijkstra map is generated by taking a set of seed points and calculating the distance from each node in the graph to the closest seed point.

 Caves of Qud utilizes Dijkstra maps with randomly places seeds in order to generate a uniform population of uneven spaces.

 Use cases for Dijkstra maps:

- Finding furthest point from the entrance of a cave system to place treasure or a boss encounter.
- Evenly distributing encounters throughout a nonuniform space.
- Analyzing areas to place internal features, for example a set of square buildings in a nonuniform space.
- Filling national borders with cities.

#### Tree Mapping

Tree mapping is a technique for partitioning space that is similar to binary space partitioning. The difference is that instead of splitting the space in half, it is split into a set of smaller areas.

Some use cases:

- Creating a basic city street grid for a set of buildings and city blocks of known size.
- Creating the rooms of a side-view building given a list of room sizes.

### Putting It All Together

Let's create a galaxy:

1. We can create stars with normal distribution in 3D. We will assign each star a random seed.
2. We will generate basic information about them, size and color.
3. We can use weighted distribution to for each star in our galaxy to pick the type, temperature and size.
4. We can pick the display color based on the temperature.
5. We can generate a random name with a Markov chain. This is fast enough that we can do it in real time whenever we mouse over the star.
6. A weighted table could tell us if it has one or more companion stars or planets.
7. When the player zooms in to a planet we can generate more detail, for example using Perlin noise layers to generate the topography, L-systems to generate layouts of the cities.

Procedural generation opens endless doors in endless hallways to endless untracked worlds.
