export function runLengthEncoding(string: string) {
  // Write your code here.
  let count = 0;
  let symbol = string[0];
  let encoded = "";
  [...string].forEach((char) => {
    if (symbol === char) {
      count++;
    } else {
      encoded += convertToEncoding(count, symbol);
      count = 1;
      symbol = char;
    }
  });
  encoded += convertToEncoding(count, symbol);
  return encoded;
}

function convertToEncoding(count: number, symbol: string) {
  let encoded = "";
  while (count > 9) {
    encoded += "9" + symbol;
    count -= 9;
  }
  if (count > 0) {
    encoded += count + symbol;
  }
  return encoded;
}
