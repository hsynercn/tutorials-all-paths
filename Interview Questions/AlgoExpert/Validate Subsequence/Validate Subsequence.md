# Validate Subsequence

Given two non-empty arrays of integers, write a function that determines whether the second array is a subsequence of the first one.

A subsequence of an array is a set of numbers that aren't necessarily adjacent in the array but that are in the same order as they appear in the array. For instance, the numbers `[1, 3, 4]` form a subsequence of the array `[1, 2, 3, 4]`, and so do the numbers `[2, 4]`. Note that a single number in an array and the array itself are both valid subsequences of the array.

Sample Input

```
array = [5, 1, 22, 25, 6, -1, 8, 10]
sequence = [1, 6, -1, 10]
```

Sample Output

```
true
```

Hints

Hint 1

You can solve this question by iterating through the main input array once.

Hint 2

Iterate through the main array, and as soon as you find the first integer from the subsequence, you can begin iterating through the subsequence array. For every subsequent integer in the main array, check whether it is equal to the current integer in the subsequence array. If so, move onto the next integer in the subsequence array. If not, continue iterating through the main array.

Hint 3

To make the logic in Hint #2 describes, you will have to declare a variable holing your position in the potential subsequence. At first, this position will be the 0th index in the sequence; as you find the sequence's integers in the main array, you can then increment this position until you reach the end of the sequence.

Optimal Space & Time Complexity

O(n) time | O(1) space - where n is the length of the array
