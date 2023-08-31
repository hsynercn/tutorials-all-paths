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

### Story Model

For this model we will break away from the linear model used in traditional story grammars and instead use a directed graph model commonly seen in interactive fictions.

In this model discrete sections of the story comes from nodes, with edges indicating different branches of the story.

By this way now we are technically working with a graph grammar.

### Rule Design

We can separate the rules into two categories:

- IRR: Initial rewrite rules
- SRR: Secondary rewrite rules

IRR will create the skeleton of the story, and SRR will add details to the story.

For a simple IRR example, we can imagine a money and debt case, X will own less then his debt to Y. This rule can be translated to X challenges player to poker and X takes winning to Y.

Pattern search in a graph is a NP hard problem, it is better to keep rules simple.

### Secondary Rewrite Rules

We will rewrite specific events fom our story. For an example we can add a cheating case to our poker game.

- World Simulation: It will be better if we could effect the wold with our story. Also dynamic conditions can be used to trigger events.

- Metric-Guided Generation: We can increase the SRR selection weights to create more normalized stories. We can avoid critical paths by using this method.

### Conclusion

Story generation is not an easy task.
