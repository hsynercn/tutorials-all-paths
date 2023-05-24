export function spiralTraverse(array: number[][]) {
  let result: number[] = [];

  while (array.length > 0) {
    if (array.length > 0) {
      let upRow: number[] = array.shift() as number[];
      result.push(...upRow);
    }

    if (array.length > 0 && array[0].length > 0) {
      array.forEach((row) => {
        result.push(row.pop() as number);
      });
    }

    if (array.length > 0) {
      let upRow: number[] = array.pop() as number[];
      result.push(...upRow.reverse());
    }

    if (array.length > 0 && array[0].length > 0) {
      [...array].reverse().forEach((row) => {
        result.push(row.shift() as number);
      });
    }
  }

  console.log(array);

  return result;
}
