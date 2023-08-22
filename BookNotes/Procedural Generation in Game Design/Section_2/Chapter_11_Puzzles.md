# Procedural Generation In Game Design

## Chapter 11 Puzzles

Desktop Dungeons is a puzzle roguelike that gives you dısposable adventurer to guide through randomly generated, dingle-screen dungeons.

### Procedurally Generating Puzzles

Puzzles have a determined starting state and and end or goal state, player performs atomatic operations on the puzzle to move it from one to the other.

### Puzzle-Spaces

Algorithms are great at generating puzzles:

- Large if it contains many puzzles with distinct start and goal states
- Small if the number of distinct start and goal states if few
- Shallow if each distint start state has exacrtly one corresponding goal state
- Deep if a single start state has multiple viable goal states, or vice versa

### Desired Outputs

Ofren, the primary role of a procedural puzzle generator is trimming down a larger puzzle-space into a subset of possible puzzles that differ along axes that can be easily randomized.

- Generation requires solvability.
- After that comes the requirement for a continious solution.

Continuity doesn't rule out deep puzzle-spaces. It's perfectly possible to arbitrarily remove walls in a single-path maze to create multiple viable paths, this would still be a continuous maze puzzle. In order to make a maze discontinuous, you'd have to remove a reasonable number of adjacent paths and walls, rendering maze treversal actions meaningles.

Most importantly a deterministic generator can be very useful. We can get same results for debugging and daily challanges.

### Puzzle Generation Approaches

Puzzle generation depends massively on the rules of your game.

- Random Start State: We can create a random initial state, that's enough. Minesweeper is a good example.
- Backward from Goal State: Start from a specific randomly generated goal states and repeatedly undo atomic player actions at random until you reach the desired complexity.
- Heuristics:  

