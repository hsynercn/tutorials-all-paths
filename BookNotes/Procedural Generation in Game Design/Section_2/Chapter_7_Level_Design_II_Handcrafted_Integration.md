# Procedural Generation In Game Design

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

### Crypt Generation

Similarly we want to arrange areas procedurally, this time we want to create tight catacomb style areas interspersed with chambers for breathing room.

Each room is a 7 x 7 block. Rooms have some additional data for treasure and other objects.

Steps:

1. Place a starter room. This is a random room tile with at least 2 exits.
2. Pick a room placed in the level that has an open exit.
3. Place that new room perfectly adjacent to the fırst.
4. Once we have no room wıth avaılable exits we can evaluate the dungeon. We can chec kfor total room count to evaluate the result.

### Best Practices

Keep the data sımple: Use the sımplest possıble data format for your project. A text file is perfect.

Keep the data lean and purposeful, rely on your procedural systems to popupate them with creatures, treasures, and traps.

Don't write an editor: Easily you can get lost in that way Notepad is just fine.
