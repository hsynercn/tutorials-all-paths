# BST Treversal

Write three functions that take in a Binary Search Tree (BST) and an empty array, traverse the BST, add its nodes' values to the input array, and return that array. The three functions should traverse the BST using the in-order, pre-order, and post-order tree-traversal techniques, respectively.

Each `BST` node has an integer `value`, a `left` child node, and a `right` child node. A node is said to be a valid `BST` node if and only if it satisfies the BST property: its `value` is strictly greater than the values of every node to its left; its `value` is less than or equal to the values of every node to its right; and its children nodes are either valid `BST` nodes themselves or `None` / `null`.

Sample Input

```
tree =   10
       /     \
      5      15
    /   \   /   \
   2     5 13   22
 /           \
1            14
```

Sample Output

```
inOrderTraverse: [1, 2, 5, 5, 10, 13, 14, 15, 22] // where the array is the input array
preOrderTraverse: [10, 5, 2, 1, 5, 15, 13, 14, 22] // where the array is the input array
postOrderTraverse: [1, 2, 5, 5, 14, 13, 22, 15, 10] // where the array is the input array
```

Hints

Hint 1

Realize that in-order traversal simply means traversing left nodes before traversing current nodes before traversing right nodes. Try implementing this algorithm recursively by calling the inOrderTraverse method on a left node, then appending the current node's value to the input array, and then calling the inOrderTraverse method on a right node.

Hint 2

Apply the same logic described in Hint #1 for the two other traversal methods, but change the order in which you do things.

Optimal Space & Time Complexity

O(n) time | O(n) space - where n is the number of nodes in the BST
