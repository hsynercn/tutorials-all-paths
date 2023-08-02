function isValidSubsequence(array, sequence) {
  // Write your code here.
  let i = 0;
  let j = 0;

  while (i < array.length && j < sequence.length) {
    const targetNum = sequence[j];
    if (array[i] === targetNum) {
      j++;
    }
    i++;
  }
  if (j >= sequence.length && i <= array.length) return true;
  return false;
}

// Do not edit the line below.
exports.isValidSubsequence = isValidSubsequence;
