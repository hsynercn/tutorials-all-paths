# One Edit

You are given two strings. Write a function to determine if the second string is one edit away from the first string.

An edit is defined as either:

- Inserting a character
- Removing a character
- Replacing a character

If there is more than one edit between the two strings, return false. If the strings are equal, return true.

Sample Input
```
str1 = "abc"
str2 = "abd"
```

Sample Output
```
true // 1 edit away
```

Hints

Hint 1

If the difference in lengths of the strings is greater than 1, then there is no way to make them equal with a single edit.

Hint 2

If the lengths of the strings are the same, then the only possible edit is a replace, because adding or removing a character would make the strings different lengths.

Hint 3

If the strings are different lengths, the only possible moves are adding and removing a character. These are essentially the same operation, because they represent the case where one string has a character that another does not.

Optimal Space & Time Complexity

O(n) time | O(1) space - where n is the length of the input strings