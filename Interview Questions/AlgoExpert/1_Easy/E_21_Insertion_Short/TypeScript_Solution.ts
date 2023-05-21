export function insertionSort(array: number[]) {
  // Write your code here.
  for (let i = 0; i < array.length; i++) {
    let num = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > num) {
      swap(array, j + 1, j);
      j--;
    }
  }
  return array;
}

function swap(array: number[], i: number, j: number) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
