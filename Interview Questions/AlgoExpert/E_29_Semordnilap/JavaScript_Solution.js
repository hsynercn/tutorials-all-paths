function semordnilap(words) {
  // Write your code here.
  const semordnilaps = {};
  const result = [];
  for (const word of words) {
    if (semordnilaps[word]) {
      result.push([word, semordnilaps[word]]);
    } else {
      semordnilaps[generateSemordnilap(word)] = word;
    }
  }
  return result;
}

function generateSemordnilap(word) {
  const chars = [...word];
  const result = [];
  while (chars.length) {
    const char = chars.pop();
    result.push(char);
  }
  return result.join("");
}

// Do not edit the line below.
exports.semordnilap = semordnilap;
