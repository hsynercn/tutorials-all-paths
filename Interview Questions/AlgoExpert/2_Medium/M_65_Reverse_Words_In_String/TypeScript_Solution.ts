export function reverseWordsInString(string: string) {
  // Write your code here.
  let words: string[] = [];
  let emptySpaces: string[] = [];
  let emptySpace = "";
  let word = "";
  const chars = [...string];
  chars.forEach((char) => {
    if (word !== "" && char === " ") {
      words.push(word);
      word = "";
    } else if (char !== " ") {
      word += char;
    }
    if (emptySpace !== "" && char !== " ") {
      emptySpaces.push(emptySpace);
      emptySpace = "";
    } else if (char === " ") {
      emptySpace += char;
    }
  });

  if (word !== "") {
    words.push(word);
    word = "";
  }
  if (emptySpace !== "") {
    emptySpaces.push(emptySpace);
    emptySpace = "";
  }
  let result = "";
  console.log(words);
  console.log(emptySpaces);

  while (words.length !== 0 || emptySpaces.length !== 0) {
    if (chars[chars.length - 1] !== " ") {
      if (words.length !== 0) {
        result += words.pop();
      }
      if (emptySpaces.length !== 0) {
        result += emptySpaces.pop();
      }
    } else {
      if (emptySpaces.length !== 0) {
        result += emptySpaces.pop();
      }
      if (words.length !== 0) {
        result += words.pop();
      }
    }
  }
  return result;
}
