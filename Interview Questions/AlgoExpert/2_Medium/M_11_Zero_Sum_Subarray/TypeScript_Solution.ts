export function zeroSumSubarray(nums: number[]) {
  // Write your code here.
  if (!nums.length) {
    return false;
  }

  let sum = 0;
  nums.forEach((value) => {
    sum += value;
  });

  if (sum === 0) {
    return true;
  }

  let valueSet = new Set<number>();
  sum = 0;
  for (let index = 0; index < nums.length; index++) {
    sum += nums[index];
    if (valueSet.has(sum)) {
      return true;
    }
    valueSet.add(sum);
  }

  return false;
}
