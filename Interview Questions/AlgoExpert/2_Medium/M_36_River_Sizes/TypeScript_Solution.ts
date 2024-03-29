export function riverSizes(matrix: number[][]) {
  // Write your code here.
  let uniqueMarker = 2;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1) {
        markNode(uniqueMarker, i, j, matrix);
        uniqueMarker++;
      }
    }
  }
  console.log(matrix);
  const countMap = new Map<number, number>();
  matrix.forEach((row) => {
    row.forEach((mark) => {
      if (mark > 1) {
        countMap.has(mark)
          ? countMap.set(mark, (countMap.get(mark) as number) + 1)
          : countMap.set(mark, 1);
      }
    });
  });
  console.log(countMap);
  const result: number[] = [];
  countMap.forEach((value, key) => {
    result.push(value);
  });
  return result;
}

function markNode(mark: number, i: number, j: number, matrix: number[][]) {
  if (matrix[i][j] !== 1) {
    return;
  }
  matrix[i][j] = mark;
  console.log(matrix);
  if (i - 1 >= 0) {
    markNode(mark, i - 1, j, matrix);
  }
  if (i + 1 < matrix.length) {
    markNode(mark, i + 1, j, matrix);
  }
  if (j - 1 >= 0) {
    markNode(mark, i, j - 1, matrix);
  }
  if (j + 1 < matrix[i].length) {
    markNode(mark, i, j + 1, matrix);
  }
  return;
}
