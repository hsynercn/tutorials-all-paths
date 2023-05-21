export function smallestDifference(arrayOne: number[], arrayTwo: number[]) {
  // Write your code here.
  const orderedOne = arrayOne.sort((a, b) => a - b);
  const orderedTwo = arrayTwo.sort((a, b) => a - b);
  let indexOne = 0;
  let indexTwo = 0;
  let result: number[] = [];
  let diff = Number.MAX_SAFE_INTEGER;
  while (indexOne < arrayOne.length && indexTwo < arrayTwo.length) {
    if (arrayTwo[indexTwo] === arrayOne[indexOne]) {
      return [arrayTwo[indexTwo], arrayOne[indexOne]];
    }
    if (diff > Math.abs(arrayTwo[indexTwo] - arrayOne[indexOne])) {
      result = [arrayOne[indexOne], arrayTwo[indexTwo]];
      diff = Math.abs(arrayTwo[indexTwo] - arrayOne[indexOne]);
    }
    if (arrayTwo[indexTwo] > arrayOne[indexOne]) {
      indexOne++;
    } else {
      indexTwo++;
    }
  }
  return result;
}
