function getNthFib(n) {
  // Write your code here.
  if (n === 1) return 0;
  let sum = 0;
  let sum2 = 1;
  for (let i = 2; i < n; i++) {
    let temp = sum2;
    sum2 = sum + sum2;
    sum = temp;
  }
  return sum2;
}

// Do not edit the line below.
exports.getNthFib = getNthFib;
