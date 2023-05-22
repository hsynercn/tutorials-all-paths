function isMonotonic(array) {
  // Write your code here.
  let increasing = determineIncreasing(array, 0, 1);
  for (let i = 1; i < array.length; i++) {
    let newIncreasing = determineIncreasing(array, i - 1, i);
    if (newIncreasing === "EQ") continue;
    if (increasing === "EQ") {
      increasing = newIncreasing;
      continue;
    }
    if (increasing !== newIncreasing) return false;
  }
  return true;
}
function determineIncreasing(array, i, j) {
  return array[i] < array[j] ? "INC" : array[i] > array[j] ? "DEC" : "EQ";
}
// Do not edit the line below.
exports.isMonotonic = isMonotonic;
