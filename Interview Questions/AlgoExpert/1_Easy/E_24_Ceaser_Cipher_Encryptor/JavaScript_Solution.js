// from 97 to 122
function caesarCipherEncryptor(string, key) {
  // Write your code here.
  const result = [];
  for (const char of string) {
    const ascii = char.charCodeAt(0);
    const newAscii = ((ascii + key - 97) % 26) + 97;
    console.log(char, ascii, newAscii);
    result.push(newAscii);
  }
  return String.fromCharCode(...result);
}

// Do not edit the line below.
exports.caesarCipherEncryptor = caesarCipherEncryptor;
