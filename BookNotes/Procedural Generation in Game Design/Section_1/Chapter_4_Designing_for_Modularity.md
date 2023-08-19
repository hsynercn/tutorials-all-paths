# Procedural Generation In Game Design
## Chapter 4 Designing for Modularity

Modularity is the use of discrete units called modules, to assemble larger sutructures, which we wll call gestalts. One example could be the RPG inventory system. The assembly mechanism is the users's choice of equipment with several constraints. The gestalt is the entire equipment loadout.

1. The aseembly mechanism icludes some degree of randomness.
2. The gestalt space is too large to craft every possible gestalt by hand.

Craft modules that assemble into desirable gestalts, and design an assembly mechanism to manifest them.

### Assembly Mechanism and Gestalt Spaces

A gestalt space is the set of all possible gestalts that can be assembled from a set of modules, by a given assembly mechanism. When a gestalt crosses a certain threshold of undesirability, we say it entes the null zone of our gestalt space.

Most assembly mechanisms produce gestalt spaces within a certain size class. For an example, we are populating a dungeon room with 3 monsters from a set of five monster types. Each monster type can be chosen multiple times. For simplicity's sake, position doesn't matter.

In this exmaple monster types are the modules, the population algorithm is the assembly mechanism and room is the gestalt.

Dungeon populator has 5x5x5=125 ways to populate the room. But there are 35 distinc gestalts.

- A gestalt that cares about order is permutation.
- Doesn't care about it is called combination.

Note: The number of r combinations of a set of size n with repetition allowed is (r + n - 1)!/(r!(n - 1)).

If we have fire imp and a water elemental as monsters, and if they attack each other. This could be a null zone gestalt. We can accept this result or we can prevent this with some constraint.

### Enabling Play

Our main goal is to give our system as much play as possible.

- Mechanics as Shared Substrates: We can consider using completing stats rather than adding set items to unlock some additional benefits. Another example could be the movement on a turn-based game map, some elemens could effect the mevement capability in several ways like, teleporting, slowing down, or pulling the player.

- Orthogonality: It refers to the partitioning of the design into modules that don't overlap.

- Equivalence of Impact: An overshadowing module is one whose impact is so powerful that it distorts the gestalts it gets assembled into. One example could be a out-of-depth monster on the map, in one aspect it could make the map impossible and it will force user to flee. But also we can add a high reward to make it useful.

### Plotting Desirable Gestalts

We are operating on modules and assembly mechanisms. Gestalts are out of our direct reach.

In one case we can mention the Caves of Qud faction system as an example. In this case design introduces a faction system between factions and it generates relations between factions which uses some random reasons to fabricate a relation status. By this way we can break the player hostile environment and create fun encounters/batteles between different faction groups.

### Inserting Memorable Asymmetry

In the systemization of the module, we can provide similar mechanics to player. It could be a balanced loot system which provides equal power and stats for the weapon. But this could be a boring factor for the user. In addition we can add unique weapons to classes which adds unique mechanics.