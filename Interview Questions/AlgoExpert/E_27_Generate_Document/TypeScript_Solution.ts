export function generateDocument(characters: string, document: string) {
  // Write your code here.
  const resourceMap = new Map<string, number>();
  const targetMap = new Map<string, number>();

  [...characters].forEach((char) => {
    resourceMap.has(char)
      ? resourceMap.set(char, (resourceMap.get(char) as number) + 1)
      : resourceMap.set(char, 1);
  });

  [...document].forEach((char) => {
    targetMap.has(char)
      ? targetMap.set(char, (targetMap.get(char) as number) + 1)
      : targetMap.set(char, 1);
  });

  let canGenerateTarget = true;
  targetMap.forEach((value, key) => {
    if (!(resourceMap.has(key) && (resourceMap.get(key) as number) >= value)) {
      canGenerateTarget = false;
    }
  });

  return canGenerateTarget;
}
