export function findThreeLargestNumbers(array: number[]) {
  // Write your code here.
  let result: number[] = [
    Number.MIN_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
  ];
  array.forEach((value) => {
    if (value >= result[2]) {
      result[0] = result[1];
      result[1] = result[2];
      result[2] = value;
    } else if (value >= result[1]) {
      result[0] = result[1];
      result[1] = value;
    } else if (value >= result[0]) {
      result[0] = value;
    }
  });

  return result;
}
