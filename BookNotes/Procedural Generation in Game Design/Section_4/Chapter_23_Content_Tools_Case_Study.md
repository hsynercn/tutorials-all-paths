# Procedural Generation In Game Design

## Chapter 23 Content Tools Case Study

Handcrafted elements can create memorable moments in procedural levels and break player-perceived patterns. For this purpose we need to create a tool that can create handcrafted elements.

- Easy visualization: Better for coordination, editor could be used by anyone on the team.
- Conditional elements: We can use conditional modifications.
- Addition and subtraction: We can create more complex rooms.
- Easy scripting: Allows easy further scripting for things like dialogue triggers, doors, ambush encounters.
- Easy to learn: Easy to learn and use for new team members.

### System Overview

Every pixel in a map image represents a tile. Every different color represents a different tile type. A different palette stores the tile types.

We can use GIMP and image layers to store metadata.

- We can set pixels in that layer to be an entity rather than a tile. A specific monster, a piece of furniture, a torch, a door...
- We can set percentage of layers to spawn.
