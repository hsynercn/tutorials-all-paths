export function missingNumbers(nums: number[]) {
  // Write your code here.
  const n = nums.length + 2;
  const sum = (n * (n + 1)) / 2;
  let arraySum = 0;
  nums.forEach((value) => {
    arraySum += value;
  });
  const difference = sum - arraySum;
  const diffAvg = difference / 2;
  let belowSum = 0;
  let numberCount = 1;
  nums.forEach((value) => {
    if (diffAvg > value) {
      belowSum += value;
      numberCount++;
    }
  });
  let smallNum = (numberCount * (numberCount + 1)) / 2 - belowSum;
  return [smallNum, difference - smallNum];
}
