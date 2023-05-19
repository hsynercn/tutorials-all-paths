function generateDocument(characters, document) {
  // Write your code here.
  const counts = {};
  for (const char of characters) {
    if (!counts[char]) counts[char] = 0;
    counts[char]++;
  }
  for (const char of document) {
    if (!counts[char]) return false;
    counts[char]--;
    if (counts[char] < 0) return false;
  }
  return true;
}

// Do not edit the line below.
exports.generateDocument = generateDocument;
