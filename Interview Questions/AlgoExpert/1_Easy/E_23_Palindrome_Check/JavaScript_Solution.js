function isPalindrome(string) {
  // Write your code here.
  let i = 0;
  let j = string.length - 1;
  while (i < j) {
    if (string[i] !== string[j]) return false;
    i++;
    j--;
  }
  return true;
}

// Do not edit the line below.
exports.isPalindrome = isPalindrome;
