function commonCharacters(strings) {
  // Write your code here.
  const counts = {};
  for (const str of strings) {
    for (const c of [...new Set(str)]) {
      if (counts[c] === undefined) counts[c] = 0;
      counts[c]++;
    }
  }

  const result = [];
  for (const [key, value] of Object.entries(counts)) {
    if (value === strings.length) result.push(key);
  }
  return result;
}

// Do not edit the line below.
exports.commonCharacters = commonCharacters;
