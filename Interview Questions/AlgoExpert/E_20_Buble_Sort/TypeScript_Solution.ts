export function bubbleSort(array: number[]) {
  // Write your code here.

  let end = array.length - 1;
  while (end > 0) {
    let cursor = 0;
    while (cursor < end) {
      if (array[cursor] > array[cursor + 1]) {
        const temp = array[cursor + 1];
        array[cursor + 1] = array[cursor];
        array[cursor] = temp;
      }
      cursor++;
    }
    end--;
  }

  return array;
}
