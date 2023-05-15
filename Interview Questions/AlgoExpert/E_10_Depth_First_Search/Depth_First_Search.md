# Depth First Search

Your are given a Node class that has a name and an array of optional children nodes. When put together, nodes form an acyclic tree-like structure.

Implement the depthFirstSearch method on the Node class, which takes in an empty array, traverses the tree using the Depth-first Search approach (specifically navigating the tree from left to right), stores all of the nodes' names in the input array, and returns it.

Sample Input:

```
graph =     A
         /  |  \
        B   C   D
       / \     / \
      E   F   G   H
         / \   \
        I   J   K
```

Sample Output:

```
["A", "B", "E", "F", "I", "J", "C", "D", "G", "K", "H"]
```

Hints

Hint 1

The Depth-first Search algorithm works by traversing a graph branch by branch. In other words, before traversing any Node's sibling Nodes, its children nodes must be traversed. How can you simply and effectively keep track of Nodes' sibling Nodes as you traverse them, all the while retaining the order in which you must traverse them?

Hint 2

The Depth-first Search algorithm works by traversing a graph branch by branch. In other words, before traversing any Node's sibling Nodes, its children nodes must be traversed. How can you simply and effectively keep track of Nodes' sibling Nodes as you traverse them, all the while retaining the order in which you must traverse them?

Optimal Space & Time Complexity

O(v + e) time | O(v) space - where v is the number of vertices of the input graph and e is the number of edges of the input graph
