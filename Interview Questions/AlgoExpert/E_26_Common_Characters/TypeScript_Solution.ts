export function commonCharacters(strings: string[]) {
  // Write your code here.
  const result: string[] = [];
  const charMap = new Map<string, number>();
  strings.forEach((string) => {
    const charSet = new Set<string>([...string]);
    console.log(charSet);
    charSet.forEach((uniqueChar) => {
      if (charMap.has(uniqueChar)) {
        const count = charMap.get(uniqueChar) as number;
        charMap.set(uniqueChar, count + 1);
      } else {
        charMap.set(uniqueChar, 1);
      }
    });
  });
  charMap.forEach((value, key) => {
    if (value === strings.length) {
      result.push(key);
    }
  });

  return result;
}
