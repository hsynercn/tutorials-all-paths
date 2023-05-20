export function firstNonRepeatingCharacter(string: string) {
  // Write your code here.
  const countMap = new Map<string, number>();
  const firstIndexMap = new Map<string, number>();
  [...string].forEach((char, index) => {
    if (!firstIndexMap.has(char)) {
      firstIndexMap.set(char, index);
    }
    countMap.has(char)
      ? countMap.set(char, (countMap.get(char) as number) + 1)
      : countMap.set(char, 1);
  });
  let minIndex = string.length;
  countMap.forEach((value, key) => {
    if (value === 1) {
      const index = firstIndexMap.get(key) as number;
      if (minIndex > index) {
        minIndex = index;
      }
    }
  });
  if (minIndex === string.length) {
    return -1;
  } else {
    return minIndex;
  }
}
