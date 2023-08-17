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