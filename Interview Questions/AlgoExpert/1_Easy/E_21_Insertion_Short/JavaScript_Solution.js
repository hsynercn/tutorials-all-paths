function insertionSort(array) {
  // Write your code here. Ali
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
function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// Do not edit the line below.
exports.insertionSort = insertionSort;
