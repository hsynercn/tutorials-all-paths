export function isValidSubsequence(array: number[], sequence: number[]) {
  let arrayIndex = 0;
  let sequenceIndex = 0;
  while (arrayIndex < array.length && sequenceIndex < sequence.length) {
    const arrayValue = array[arrayIndex];
    const sequenceValue = sequence[sequenceIndex];
    if (arrayValue === sequenceValue) {
      sequenceIndex++;
    }
    arrayIndex++;
  }

  return sequenceIndex === sequence.length;
}
