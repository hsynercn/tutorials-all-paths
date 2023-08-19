# Procedural Generation In Game Design

## Chapter 2 Managing Output Boredom versus Chaos

Humans are natural pattern-finding machines, and a procedural generation algorithm is often a pattern-creating machine.

Complete randomness is not the goal of procedural generation. We want to create a system that can create interesting content, and that means creating patterns.

We want generators to make something a human would make.

With PCG we cannot escape from the content creation process. We can only automate parts of it. We can only make a generator only if we now what to generate.

An excellent starting point for when you don't know what you want to create is to figure out what you don't want to create.

For example if we are generating a forest we should populate the forest with proper monsters. Also, we should consider the monster difficulty.

If we introduce too many constraints, we will end up with a boring result.

There could be many cases which requires constraints. For example, if we are generating an action flight simulator, we should be careful with ground defense points, we should apply some constraints to make sure that the player can destroy them. We should pay attention to patrol routes, and we should make sure that the player can destroy them.

We could use PCG to generate items. Easily we can increase the number exponentially.

Even combination driven can be depleted by the user in enough time.

We can break patterns to make the game more interesting.

- Avoid grid patterns when possible: We may need plain areas for some game mechanics, for example we can consider moving smaller objects to make the area more interesting.
- When spawning pieces of you environment, make them less similar. If you have 3 rocks rotate them randomly, clump them together, and scale them randomly.
- When constructing an environment out of tiles, try using nonstandard shapes instead of squares.
IMPORTANT: Herringbone Wang tiles are a great example. This method is not too hard to implement.
- When creating height maps or other maps with Perlin or other kinds of noise, try multiplying each pixel by several layers of other noise. Which also multiplied by a scalar to adjust the other noises' intensity.
IMPORTANT: By this way we can break the repeating patterns.
- Spawn characters with randomized looks. Use props, clothing, and other accessories to make them look different.
- Random circumstances, not random outcomes. Player is ok with unpredictable environment, but not with unpredictable outcomes.
- Be careful with pure randomness. We can implement 33% chance of a mini-boss spawn as a mini-boss will spawn every 2, 3 or 4 levels, with the highest probability 3. We can use dice loading.
