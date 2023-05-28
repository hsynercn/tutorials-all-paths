# Missing Numbers

You are given an unordered list of unique integers `nums` in the range `[1, n]`' where `n` represents the length of `nums + 2`. This means that two numbers in this range are missing from the list.

Sample Input
```
nums = [1, 4, 3]
```

Sample Output
```
[2, 5]
```

Hints

Hint 1

How would you solve this problem if there was only one missing number? Can that solution be applied to this problem with two missing numbers?

Hint 2

To efficiently find a single missing number, you can sum up all of the values in the array as well as sum up all of the values in the expected array (i.e. in the range [1, n]). The difference between these values is the missing number.

Hint 3

If you take an average of the two missing numbers, one of the missing numbers must be less than that average, and one must be greater than the average.

Hint 4

If you take an average of the two missing numbers, one of the missing numbers must be less than that average, and one must be greater than the average.

Hint 5

Since we know there is one missing number on each side of the average, we can treat each side of the list as its own problem to find one missing number in that list.

Optimal Space & Time Complexity

O(n) time | O(1) space - where n is the length of the input array