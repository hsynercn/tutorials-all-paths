# Procedural Generation In Game Design

## Chapter 6 Level Design I Case Study

Catlateral Damage is a 3D first-person shooter like content. Developer created a generator after several months.

### Overview

We need a large space which will be divided to different rooms and populated with furniture. After that we will add items on them and start player form a location.

### Rules

We will not use exterior places. We will use single story spaces with multiple rooms. Some rooms will be smaller than others. Furniture will be located in the middle of the room or along with the walls. Time limit should be enough to complete the map.

### How It Works

Generator takes some hard-coded data, builds a 2D floor plan and creates a 3D space. The generation code uses a squarified tree maps algorithm to take the big rectangle space and divide it up into smaller rectangular spaces with the values specified in the level's data file.

Each room in each level also has an associated data file. These files contain the list of furniture that can be placed within the room. Generation code uses a rectangle packing algorithm to place rectangular boundaries objects within the surface areas.

After that we will calculate the finish time and rewards.

### Conclusion

Most people don't notice that the levels are procedurally generated. This could be both good and bad. It can mean levels are good enough for play, or it can show lack of content.
