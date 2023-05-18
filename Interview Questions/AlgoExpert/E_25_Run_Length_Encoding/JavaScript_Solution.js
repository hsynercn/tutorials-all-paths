function runLengthEncoding(string) {
  // Write your code here.
  let counter = 1;
  const result = [];
  for (let i = 1; i < string.length; i++) {
    const char = string[i];
    const back = string[i - 1];
    if (char !== back || counter >= 9) {
      result.push(counter);
      result.push(back);
      counter = 0;
    }
    counter++;
  }

  result.push(`${counter}${string[string.length - 1]}`);
  return result.join("");
}

// Do not edit the line below.
exports.runLengthEncoding = runLengthEncoding;
