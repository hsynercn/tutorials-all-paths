export function getNthFib(n: number) {
  // Write your code here.
  let firstNum = 0;
  let secondNum = 1;

  if (n === 1) {
    return firstNum;
  }

  let index = 2;
  while (index < n) {
    let nextValue = firstNum + secondNum;
    firstNum = secondNum;
    secondNum = nextValue;
    index++;
  }
  return secondNum;
}
