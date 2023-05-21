type Triplet = [number, number, number];

export function threeNumberSum(array: number[], targetSum: number): Triplet[] {
  // Write your code here.
  const sumMap = new Map<number, number[][]>();
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const sumArray = [array[i], array[j]];
      const sum = array[i] + array[j];
      if (sumMap.has(sum)) {
        const sums = sumMap.get(sum) as number[][];
        sums.push(sumArray);
      } else {
        sumMap.set(sum, [sumArray]);
      }
    }
  }
  const result: Triplet[] = [];
  const usedNumbers = new Set<number>();
  array.forEach((value) => {
    const required = targetSum - value;
    if (sumMap.has(required)) {
      //console.log(value + " > " + sumMap.get(required));
      const sums = sumMap.get(required) as number[][];
      sums.forEach((sum) => {
        const set = new Set<number>([...sum]);
        if (
          !set.has(value) &&
          !usedNumbers.has(sum[0]) &&
          !usedNumbers.has(sum[1])
        ) {
          const resultArray = [value, sum[0], sum[1]].sort((n1, n2) => n1 - n2);
          result.push([resultArray[0], resultArray[1], resultArray[2]]);
        }
      });
      usedNumbers.add(value);
    }
  });
  console.log(result);
  if (!result) {
    return [[-1, -1, -1]];
  }

  return result.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    } else if (a[1] !== b[1]) {
      return a[1] - b[1];
    } else {
      return a[2] - b[2];
    }
  });
}
