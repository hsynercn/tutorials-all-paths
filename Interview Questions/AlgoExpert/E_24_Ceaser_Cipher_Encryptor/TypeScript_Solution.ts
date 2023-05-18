export function caesarCipherEncryptor(string: string, key: number) {
  // Write your code here.
  let aIndex = "a".charCodeAt(0);
  let zIndex = "z".charCodeAt(0);
  let alphabetSize = zIndex - aIndex + 1;
  let result = "";
  [...string].forEach((char) => {
    let index = char.charCodeAt(0);
    index = ((index - aIndex + key) % alphabetSize) + aIndex;
    result += String.fromCharCode(index);
  });
  return result;
}
