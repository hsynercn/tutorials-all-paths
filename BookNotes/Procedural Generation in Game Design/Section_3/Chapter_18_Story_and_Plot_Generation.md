# Procedural Generation In Game Design

## Chapter 18 Story and Plot Generation

Stories in gammes may simply be a way to provide causality and motivation to the actions taken by a given player.

- Some games represents stories through emotion and dramatic tension.
- Some games utilizes complex world building and simulation to create a player-guided form of storytelling.

### Grammars and Story Grammars

We will focus on graph grammars. Let's build a basic grammar.

1. A -> C
2. A -> B
3. B -> CC

These are more formally called rewrite rules. Symbol to the left the arrow is the pattern can be rewritten to the symbol on the right-hand side of the arrow.

If we start with A we can rewrite it with C. But in these rule set we should be able to reach a point where we cannot rewrite the symbol.

If we convert rules:

1. Journey -> Journey, Encounter
2. Encounter -> Encounter, Encounter
3. Encounter -> Discovery, Journey

With these rules we can get Journey and get quests like this:

- Journey, Encounter, Discovery, Encounter

We can create concrete actions and events:

1. Journey -> Go to town
2. Journey -> Go to the forest
3. Encounter -> Fight a goblin
4. Encounter -> Fight a troll
5. Discovery -> Find gold
6. Discovery -> Find a weapon

Grammars are often used as procedural content generators by taking one or more symbols as a starting set and then randomly applying a number of valid random rules until either a point is reached where no more rules can be applied or a certain number of rules have been applied.

### Game World

Stories are based around character relations, and specifically about conflicts between characters.

For this purpose we need to model the game world in an explicit way. We can use a social network, a directed graph where the nodes are characters and the edges are relationships between characters. Relations could change over time.
