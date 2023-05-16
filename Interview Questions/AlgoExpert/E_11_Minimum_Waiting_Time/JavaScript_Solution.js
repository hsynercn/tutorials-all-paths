function minimumWaitingTime(queries) {
  // Write your code here.
  queries = queries.sort((a, b) => a - b);
  let sum = 0;
  let waitingTime = 0;
  for (let i = 0; i < queries.length; i++) {
    const n = queries[i];
    sum += waitingTime;
    waitingTime += n;
    console.log(sum);
  }
  return sum;
}

// Do not edit the line below.
exports.minimumWaitingTime = minimumWaitingTime;
