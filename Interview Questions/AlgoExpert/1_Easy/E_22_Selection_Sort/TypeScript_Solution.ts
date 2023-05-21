export function selectionSort(array: number[]) {
  // Write your code here.
  let end = array.length - 1;
  while (end > 0) {
    let i = 0;
    let max = Number.MIN_SAFE_INTEGER;
    let maxIndex = 0;
    while (i <= end) {
      if (max < array[i]) {
        max = array[i];
        maxIndex = i;
      }
      i++;
    }
    const temp = array[maxIndex];
    array[maxIndex] = array[end];
    array[end] = temp;
    end--;
  }
  return array;
}
