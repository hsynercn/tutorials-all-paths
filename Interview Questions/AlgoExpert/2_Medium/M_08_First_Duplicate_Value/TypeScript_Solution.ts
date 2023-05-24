export function firstDuplicateValue(array: number[]) {
  // Write your code here.
  const values = new Array(array.length + 1).fill(0);
  let duplicated = -1;
  let index = 0;
  while (duplicated === -1 && index < array.length) {
    values[array[index]]++;
    if (values[array[index]] > 1) {
      duplicated = array[index];
    }
    index++;
  }

  return duplicated;
}
