# Procedural Generation In Game Design

## Chapter 11 Puzzles

Desktop Dungeons is a puzzle rogue like that gives you disposable adventurer to guide through randomly generated, dingle-screen dungeons.

### Procedurally Generating Puzzles

Puzzles have a determined starting state and end or goal state, player performs atomic operations on the puzzle to move it from one to the other.

### Puzzle-Spaces

Algorithms are great at generating puzzles:

- Large if it contains many puzzles with distinct start and goal states
- Small if the number of distinct start and goal states are few
- Shallow if each distinct start state has exactly one corresponding goal state
- Deep if a single start state has multiple viable goal states, or vice versa

### Desired Outputs

Often, the primary role of a procedural puzzle generator is trimming down a larger puzzle-space into a subset of possible puzzles that differ along axes that can be easily randomized.

- Generation requires solvability.
- After that comes the requirement for a continuous solution.

Continuity doesn't rule out deep puzzle-spaces. It's perfectly possible to arbitrarily remove walls in a single-path maze to create multiple viable paths, this would still be a continuous maze puzzle. In order to make a maze discontinuous, you'd have to remove a reasonable number of adjacent paths and walls, rendering maze traversal actions meaningless.

Most importantly a deterministic generator can be very useful. We can get same results for debugging and daily challenges.

### Puzzle Generation Approaches

Puzzle generation depends massively on the rules of your game.

- Random Start State: We can create a random initial state, that's enough. Minesweeper is a good example.
- Backward from Goal State: Start from a specific randomly generated goal states and repeatedly undo atomic player actions at random until you reach the desired complexity.
- Heuristics: We can get benefit from heuristic approaches. With clever heuristic choices we can create richer and more interesting puzzles. Often, heuristic approach disqualifies the puzzle and forces generator to start again or redo a particular generation step if they're triggered.

For minesweeper example:

- We can pay attention to initial move pattern of player and make these sections empty in next puzzles.
- We can make the first move safe always.
- When we detect a discontinuous state we can reposition the mines.

### Extra Bonus: Permutations

We can increase our puzzle space by permutation on a valid puzzle element. But we need to provide a large pool at the beginning to prevent too much similarity.

### Desktop Dungeons, The Puzzle Rogue-like

It started with a 48-hour prototype, developers rebuilt it after the first version.

### More Puzzle than Rogue-like?

DD is primarily composed of randomly generated single-screen dungeons, each 20x20 tiles. In this game we are using static enemies, our attacks are 100% predictable. Our main resource is the explored area, exploration will generate health and mana.

### More Rogue-like than Puzzle?

DD is a resource management sim at its core like most rogue-likes. DD keeps the tension up for significant player experience.

### Player Hope As A Resource

We attempt to train player to keep trying.

### Guaranteeing Solvability

It is important to create solvable runs. This could be hard. With every move player is making irreversible decisions. During the process algorithm generated a walkable area, and added enemies and items. In some cases this total random generation could bring near impossible difficulty.

### Generating Hope

Result, they didn't change the random start-state generation. They added several heuristic steps. Providing a clear area around the start point, locating boss on a fair distance. Adding map editing skills for a fair cost also increases the success ratio.

### Conclusion

Start from somewhere.
