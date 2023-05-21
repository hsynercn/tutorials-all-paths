function findThreeLargestNumbers(array) {
  // Write your code here.
  let result = array.slice(0, 3).sort((a, b) => a - b);
  let min = Math.min(...result);
  for (let i = 3; i < array.length; i++) {
    if (array[i] > min) {
      console.log(min, result);
      result.push(array[i]);
      result = result.sort((a, b) => a - b).slice(1);
    }
  }
  return result;
}

// Do not edit the line below.
exports.findThreeLargestNumbers = findThreeLargestNumbers;
