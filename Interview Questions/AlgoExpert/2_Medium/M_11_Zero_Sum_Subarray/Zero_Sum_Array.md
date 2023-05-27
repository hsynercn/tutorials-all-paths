# Zero Sum Subarray

You are given a list of integers `nums`. Write a function that returns a boolean representing whether there exists a zero-sum subarray of nums.

A zero-sum subarray is any subarray where all of the values add up to zero. A subarray is any contiguous section of the array. For the purposes of this problem, a subarray can be as small as one element and as long as the original array.

Sample Input
```
nums = [-5, -5, 2, 3, -2]
```

Sample Output
```
true
```

Hints

Hint 1

A good way to approach this problem is to first think of a simpler version. How would you check if the entire array sum is zero?

Hint 2

If the entire array does not sum to zero, then you need to check if there are any smaller subarrays that sum to zero. For this, it can be helpful to keep track of all of the sums from [0, i], where i is every index in the array.

Hint 3

After recording all sums from [0, i], what would it mean if a sum is repeated?

Optimal Space & Time Complexity

O(n) time | O(n) space - where n is the length of the input array