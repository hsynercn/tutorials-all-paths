# Procedural Generation In Game Design

## Chapter 22 Understanding the Generated

We need to be sure about our content quality when we use procedural generation. This chapter will offer a method for automatically validating the generated content.

### Expressive Range and Generative Spaces

Generators are like little mini designers who operate in a very specific domain.

Expressive range of a generative system is the potential range of the content the system might be able to create. Expressive range is made up of many potential generative spaces.

### Qualities of the Generated

- Types of Qualities: There is no universal set of qualities that apply to all games. We need to define our own qualities. For example we can look at the distribution of resource across the map.
  - Topological: Topological properties are based on the underlying structure of the content created. For a level generator these properties could be the loops in the level.
  - Experiential: Describe how player will interact with and experience the generated content.
  - Aesthetic: Aesthetic properties are based on the visual appearance of the generated content.
  - Semantic: Semantic meaning behind the generated content.

Example

- Linearity: Topological property, a level that is highly linear is one that follows a straight path.
- Leniency: Experiential property, a level that is highly lenient is one that allows the player to make mistakes without being punished.

We can use these properties to create a quality profile for our generator.

Also we can imagine:

- Density: An aesthetic quality describing how much screen space is taken up with level elements versus left as open space.
- Risk-reward ratio: An experiential quality describing how much risk the player must take on in order to achieve a reward.

### Formalizing Qualities into Metrics

We need to create normalized metrics to insights on a specific quality we care about.

#### Example

- Linearity: We can capture the average vertical change in the level.

We will calculate the mid points of each platform as a data point, and perform linear regression to find a line of best fit through platform midpoints. We can then calculate how far off from that line each platform is.

**Linearity**
$${\sum_{p=1}^n |y - y_e|} \over n$$

Because we divide by the number of platforms in the level, we can compare levels.

- Leniency: We can create a metric for harm levels of the level.

|Leniency|Element|
|---|---|
|0.0|Gaps, enemies, long falls|
|0.25|Springs, stompers|
|0.75|Moving platforms|
|1.0|Jumps without a gap|

**Leniency**
$${\sum_{e=1}^n leniency(e)} \over n$$

Summing the score for each level component and dividing by the total number of components gets us a leniency score between 0 and 1. Still we are losing some data points, we will get same result for consecutive enemies and gaps.

Metrics versus Requirements: How often does your generator hit the requirements you specify for it? Perhaps some of these metrics will move to the generator's fitness function at a later point.

### Qualities of the Generator

We can say we have n-dimensional generative space. We can use metrics to describe the generator's behavior in this space.

- Variety
- Unintentional Bias
- Responsiveness
- Content Families

### Visualizing Expressive Range

Histograms: We can use histograms to visualize the distribution of a metric across a set of generated content.

### Conclusion

We can use systematic methods to understand generator's capabilities. "Understanding the generated" can help with both the design and development of generative systems.
