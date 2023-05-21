export function isPalindrome(string: string) {
  // Write your code here.
  const array = [...string];
  let palindrome = true;
  while (palindrome && array.length > 1) {
    const left = array.shift();
    const rigth = array.pop();
    palindrome = left === rigth && palindrome;
  }
  return palindrome;
}
