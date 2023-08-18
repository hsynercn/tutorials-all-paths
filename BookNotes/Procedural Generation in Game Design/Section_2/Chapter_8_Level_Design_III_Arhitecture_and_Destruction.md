## Chapter 8 Level Design III Arhitecture and Destruction

Windforge is a dieselpunk game which provides building functionality around the map. In this content it is logicall to use procedural content.

- Area definition and landmark placement
- Playable world areas
- Architecture
- Object placement
- Enemy placement and spawning

### Architecture Generation

Divide and conquer approach could be used for architecture. Main steps to this process:

1. Calculate the bounding box.
2. Split the box into regions.
3. Skim perimeter regions.
4. Place connections.
5. Assign region types.
6. Make adjustments.
7. Generate the regions.

### Step 1: Calculate the Bounding Box

Bounding box defined where the architecture should be places, and what its maximum dimensions should be. Mostly we select the largest island in the given area.

### Step 2: Split the Box into Regions

We can use axis-aligned binary splits to divide the space defined by he bounding box into smaller regions. This is a recursive process, we typically stop dividing if dimensions became too small.

Some simple approaches for dividing:

- Split along a random axis: Generates the most variesy, but it is the most unpredictable.
- Always split the shorter axis: Generates long narrow regions, it works well with hybrid solutions to provide more variety.
- Always split the longer axis: Regions are simlar and mostly have square aspect ratios.

We can apply a weighted random selection as a hybrid solution. We can also terminate the splitting early to generate larger regions.

### Step 3: Skim Perimeter Regions

It would be boring if every structure found in game were a perfect rectangle. We can remove perimeter regions to get some variations.

For dungeons embedded into islands, we can typically remove a random percentage of the regions along the perimeter of bounding box. We can use top-down region removal or we can use traversing and avoid adjacent visited regions if possible. And then remove regions that weren't visited. Also we should remove the floating regions.

### Step 4: Place Connections

We will connect the generated zones. First we will start with a graph which contains all connections, we can use traversal to create doorss. Random treversal is one possibility.

Nodes can be:

- Regular door
- Small opening
- Empty connection
- Trap door
- Boss door
- Treasure door

### Step 5: Assign Region Types

We will assign each region a type.

- Treasure room
- Boss room
- Enterance room
- Hub region
- Trap region

We will apply some rules:

- Place boss treasure room in a terminal region away from entrance
- Place boss room near treasure room

### Step 6: Make Adjustments

We can fix small aspects:

- Use empty connections between adjacent boss rooms.
- Use trap doors for the connections with trap regions.
- Use treasure doors for the connections with treasure regions.

### Step 7: Generate the Regions

We will populate the previous results, player will be able to see regions after this step:

1. Generate the walls and connections between the regions.
2. Generate the contents of each region.

This step will divide the region into subregions. Subdivision approach is similar to perviously mentioned region splitting. This time the sub division will be more flexible and open-ended. Also we will place objects on these subregions. This method will prevent overlapping.

### Discussion

By this approach we can generate fine content for a large world. But for some instances we can polish a result to create a specific quest area.

