# Semordnilap

Write a function that takes a list of unique strings and returns a list of semordnilap pairs.

A semordnilap is a word or a phrase that spells a different word when backwards ("semordnilap" is a semordnilap of "palindromes").

The order of the returned pairs and the order of the strings within the pairs does not matter.

Sample Input

```
words_list = ['bat', 'tab', 'cat']
```

Sample Output

```
[('bat', 'tab')]
```

Hints

Hint 1

It can be helpful to convert the input array into a set, so that you can check if a word exists in the list in constant time.
