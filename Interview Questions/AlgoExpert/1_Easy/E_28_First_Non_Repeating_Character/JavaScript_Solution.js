function firstNonRepeatingCharacter(string) {
  // Write your code here.
  const counts = {};
  for (const char of string) {
    if (!counts[char]) counts[char] = 0;
    counts[char]++;
  }
  console.log(counts);
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (counts[char] === 1) return i;
  }
  return -1;
}

// Do not edit the line below.
exports.firstNonRepeatingCharacter = firstNonRepeatingCharacter;
