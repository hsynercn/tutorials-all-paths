## Chapter 7 Level Design II Handcrafted Integration

Enhancing a procedurally generated play environment with handcrafted content can add variety and depth to experience.

### Standard Dungeons

Expand standard "room and hallway" gameplay to include areas that make the best use of the procedural generation system.

We can store the info on a text file, creating non-rectangular rooms could be more interesting.

Notes:

- External room walls are not included, game adds those as part of the area gen code.
- Data does not include enemy spawns or treasure locations.

Standard dungeon area gen: Algorithm builds dungeon from existing area. This is an iterative loop that continues until you reach a desired room count or simply run out of dungeon space.

Starting environment: We will start with an undefined ptorodungeon area. We will place a starting room.

Steps:

1. Take all existing wall tiles that have 2 neighboring walls along the same axis are exposed to unused space. Make them candidates. Put them in a pool.

2. Select a candidate from the bag, decide to add a room or hallway.

3. If it fits add a door to old position. And recalculate the new candidate pool. If it does not fit, go back to candidate pool and select a new candidate.

4. Once you have placed a room convert any unused space tile that is adjacent to a floor tie.

We can use different shapes to create different rooms.

Once this is done:

- We can create new doors to connect rooms.
- We can add door to long empty walls.
- We can add secret doors.

