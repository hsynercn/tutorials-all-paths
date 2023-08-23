# Procedural Generation In Game Design

## Chapter 12 Procedural Logic

Keep Talking and Nobody Explodes uses procedural generation. In this case we are generating game logic itself.

Game contains complex puzzles which solved by multiple players in co-op mode.

### Usula Approach to Procedural Generation

We can combine multiple puzzles with several basic parameters and create hard or easy puzzles.

### A Different Application: Procedural Logic

The rules of the Keep Talking and Nobody Explodes are the meat of the game. And they are generated procedurally. Current version is locked, but with this mechanism easily we can change the rules and create new versions.

### How The Rule Logic Is Generated

In the simplest versions we need to scramble list of possibilites. For more complex puzzles we need to generation logical quaries.

- Trivial Case: Blinking led will provide mors codes and we will translate them to words. These word will be translated to frequencies.
- Countable Problems: We could add a fairly complex logic with cable colors, symbols, led state. And we can construct a Venn diagram around these possilities.

### Not So Trivial: Procedural Logic

Combination mapping is not a easy solution for large space puzzles. Instead, we can follow a logical approach which uses natural language.

Some examples:

- If there is more than one red wire and last digit of the serial number is odd, cut the last red wire.
- Otherwise, if the last wire is yellow and there are no red wires, cut the first wire.
- Otherwise, if there is exactly one blue wire, cut the first wire.
- Otherwise, if there is more than one yellow wire, cut the last wire.
- Otherwise, cut the second wire.

These rules are constructed with queries and a solution. We can generate rules for a puzzle with various types of quaries and solutions.

### Quaries: Asking Questions

A query is designed to ask a yes or no question: Is the wire red?

A query has a textual representation that can be used within the generated manual and is also tied to logic in the game that evaluates the question.

Query:
- Text used in manual: "there (is:are) more than (batteryCount) (battery|batteries) on the bomb"
- Function used in game: MoreThanXBatteries
- Arguments: batteryCound

### Solutions: Taking Action

When quaries are satisfied, the player must perform an action to solve the puzzle.

Solution:
- Text used in manual: "cut ht ethird wire"
- Function used in game: CutWire3

### Improving the Process

- Better Quaries: Creating interesting quaries is a vital part of the design process. We wish to increase communication.
- Compound Quaries: We need to avoid complex quaries.
- Query Context: We should avoit quaries directly related to bomb itself.

### Conclusion

Procedural generation can be a valuable tool during development for content creation.

IMPORTANT: Always keep sight of your design goals and ensure that your procedural generation is in service of those goals.
