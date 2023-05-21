# Common Characters


Write a function that takes in a non-empty list of non-empty strings and returns a list of characters that are common to all strings in the list, ignoring multiplicity.


Note that the strings are not guaranteed to only contain alphanumeric characters. The list you return can be in any order.

Sample Input
```
["abc", "bcd", "cbaccd"]
```

Sample Output
```
["b", "c"]
```

Hints

Hint 1

What data structure could be helpful to remember characters we've seen and how many strings contained those characters?

Hint 2

We can use a hash table to store characters we've seen and how many strings contained those characters. We can then iterate through the hash table and add characters that appeared in all strings to our final answer.

Optimal Space & Time Complexity

O(n*m) time | O(m) space - where n is the number of strings and m is the length of the longest string
  