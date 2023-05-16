// Tip: You can use the Array.isArray function to check whether an item
// is a list or an integer.
function productSum(array, depth = 1) {
  // Write your code here.
  let sum = 0;
  for (const element of array) {
    if (Array.isArray(element)) {
      sum += (depth + 1) * productSum(element, depth + 1);
    } else {
      sum += element;
    }
  }
  return sum;
}

// Do not edit the line below.
exports.productSum = productSum;
