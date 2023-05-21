# Middle Node

You're given a Linked List with at least one node. Write a function that returns the middle node of the Linked List. If there are two middle nodes (i.e. an even length list), your function should return the second of these nodes.

Each `LinkedList` node has an integer `value` as well as a `next` node pointing to the next node in the list or to `None` / `null` if it's the tail of the list.

Sample Input

```
linkedList = 2 -> 7 -> 3 -> 5
```

Sample Output

```
3 -> 5
```

Hints

Hint 1

The middle node of a Linked List will always be at index `length / 2`

Hint 2

While the LinkedList class has no length, you can calculate it by simply iterating through the entire list.

Hint 3

If you create a slow and a fast pointer, with the fast one iterating at twice the speed, the slow one will be in the middle when the fast one reaches the end.

Optimal Space & Time Complexity

O(n) time | O(1) space - where n is the number of nodes in the Linked List
