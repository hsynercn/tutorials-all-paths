type SpecialArray = Array<number | SpecialArray>;

// Tip: You can use the Array.isArray function to check whether an item
// is a list or an integer.
export function productSum(array: SpecialArray) {
  // Write your code here.
  return calculate(1, array);
}

function calculate(depth: number, array: SpecialArray) {
  let sum = 0;
  array.forEach((item) => {
    if (Array.isArray(item)) {
      sum += calculate(depth + 1, item) * depth;
    } else {
      sum += item * depth;
    }
  });
  return sum;
}
