function threeNumberSum(array, targetSum) {
  // Write your code here.
  console.log(array);
  console.log(array);

  const result = [];
  for (const num of array) {
    const twoSumTarget = targetSum - num;
    console.log("twoSumTarget", num, twoSumTarget);
    const s = new Set();
    for (const n of array) {
      if (n === num) continue;
      const remaining = twoSumTarget - n;
      console.log("remaining", n, remaining, s);

      if (s.has(remaining)) {
        const rr = [num, n, remaining].sort((a, b) => a - b);
        if (!result.find((r) => r[0] === rr[0] && r[1] === rr[1]))
          result.push(rr);
      } else {
        s.add(n);
      }
    }
  }

  return result.sort((a, b) =>
    a[0] < b[0]
      ? -1
      : a[0] > b[0]
      ? 1
      : a[1] < b[1]
      ? -1
      : a[1] > b[1]
      ? 1
      : a[2] < b[2]
      ? -1
      : 1
  );
}

// Do not edit the line below.
exports.threeNumberSum = threeNumberSum;
