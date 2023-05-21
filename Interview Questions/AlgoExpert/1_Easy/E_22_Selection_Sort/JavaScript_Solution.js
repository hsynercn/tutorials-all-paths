function selectionSort(array) {
  // Write your code here.
  for (let i = 0; i < array.length; i++) {
    let smallestIndex = -1;
    let smallestVal = Number.MAX_VALUE;
    for (let j = i; j < array.length; j++) {
      if (array[j] < smallestVal) {
        smallestVal = array[j];
        smallestIndex = j;
      }
    }
    console.log(smallestVal, smallestIndex);
    let temp = array[i];
    array[i] = array[smallestIndex];
    array[smallestIndex] = temp;
  }
  return array;
}

// Do not edit the line below.
exports.selectionSort = selectionSort;
