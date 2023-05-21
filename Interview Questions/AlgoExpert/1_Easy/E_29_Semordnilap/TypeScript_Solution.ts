export function semordnilap(words: string[]) {
  // Write your code here.
  const wordSet = new Set<string>();
  const result: string[][] = [];
  words.forEach((word) => {
    const reversed = [...word].reverse().join("");
    if (wordSet.has(reversed)) {
      result.push([word, reversed]);
    }
    wordSet.add(word);
  });
  return result;
}
