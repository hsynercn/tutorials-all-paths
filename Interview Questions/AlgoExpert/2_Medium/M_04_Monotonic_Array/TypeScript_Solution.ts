export function isMonotonic(array: number[]) {
  // Write your code here.
  if (array.length < 2) {
    return true;
  }
  let increase = true;
  let decrease = true;
  let i = 1;
  while (i < array.length && (increase || decrease)) {
    if (array[i - 1] < array[i]) {
      decrease = false;
    } else if (array[i - 1] > array[i]) {
      increase = false;
    }
    i++;
  }
  return increase || decrease;
}
