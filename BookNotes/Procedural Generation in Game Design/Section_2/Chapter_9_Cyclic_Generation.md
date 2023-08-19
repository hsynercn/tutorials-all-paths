# Procedural Generation In Game Design

## Chapter 9 Cyclic Generation

There are several ways of generating dungeons for rogue like games. The most popular method is drilling out the dungeon from an arbitrary starting point. There are many dead ends in the result in this practice and user needs to backtrack. We can add connections between branches to make it better.

Cyclic generation uses a different approach.

### Cycles

In real world branching trees are rare. In most cities, buildings, and parks, you can go around in circles. Cycles are also very dominant in handcrafted levels. We can harvest some ideas from role-playing maps.

In regular dungeons start and goal points are located on the branches. Cycle method provides different approaches:

- We can use different challenges for alternative paths.
- We can use shorter but more dangerous paths.
- We can use directed connections to make the path more interesting.

### Using Graphs to Express Cycles

In general, when one is generating something as complex as a complete game level. It makes a lot of sense to break down the process into multiple steps.

We can use tile based representation for a graph on a 2D plane.

```mermaid
stateDiagram-v2
    Start --> Node1
    Node1 --> Node2
    Node2 --> Node3
    Node3 --> Goal_Lock
    Node3 --> Node4
    Node4 --> Node5
    Node5 --> Node6_Key
    Node6_Key --> Start
```

### Patterns

We can apply several graph transformation rules.

- Adding a secret shortcut to a long and dangerous level.
- Adding a lock to map and add a key at midpoint.

Our main goal is keeping the player engaged. We can use a lot of different patterns to achieve this goal.
