export function moveElementToEnd(array: number[], toMove: number) {
  // Write your code here.
  let lastIndex = array.length - 1;
  let index = 0;
  while (index < lastIndex) {
    if (array[index] !== toMove) {
      index++;
      continue;
    }
    if (array[lastIndex] === toMove) {
      lastIndex--;
      continue;
    }
    let temp = array[index];
    array[index] = array[lastIndex];
    array[lastIndex] = temp;
  }
  return array;
}
