function smallestDifference(arrayOne, arrayTwo) {
  // Write your code here.
  arrayOne = arrayOne.sort((a, b) => a - b);
  arrayTwo = arrayTwo.sort((a, b) => a - b);
  let smallestDiff = Number.MAX_VALUE;
  let result = [];
  let idx1 = 0;
  let idx2 = 0;
  while (idx1 < arrayOne.length && idx2 < arrayTwo.length) {
    const num1 = arrayOne[idx1];
    const num2 = arrayTwo[idx2];
    const diff = Math.abs(num1 - num2);
    if (num1 === num2) {
      return [num1, num2];
    }
    if (diff < smallestDiff) {
      smallestDiff = diff;
      result = [num1, num2];
    }
    if (num1 < num2) {
      idx1++;
    } else {
      idx2++;
    }
  }
  return result;
}

// Do not edit the line below.
exports.smallestDifference = smallestDifference;
