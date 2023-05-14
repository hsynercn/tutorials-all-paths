export function sortedSquaredArray(array: number[]) {
  let positives: number[] = [];
  let negatives: number[] = [];
  positives = [...array.filter(value => value >= 0)];
  negatives = [...array.filter(value => value < 0)];
  negatives = negatives.map(value => -value);
  negatives = negatives.reverse();
  
  console.log(positives);
  console.log(negatives);

  let indexPositives = 0;
  let indexNegatives = 0;
  const sortedAbsNumber: number[] = [];

  while(indexPositives < positives.length && indexNegatives < negatives.length) {
    if (positives[indexPositives] > negatives[indexNegatives]) {
      sortedAbsNumber.push(negatives[indexNegatives]);
      indexNegatives++;
    } else {
      sortedAbsNumber.push(positives[indexPositives]);
      indexPositives++;
    }
  }

  if(indexPositives < positives.length) {
    sortedAbsNumber.push(...positives.slice(indexPositives, positives.length))
  }

  if(indexNegatives < negatives.length) {
    sortedAbsNumber.push(...negatives.slice(indexNegatives, negatives.length))
  }

  console.log(sortedAbsNumber);
  
  const calculationMap = new Map<number, number>();
  const result: number[] = new Array(array.length);
  sortedAbsNumber.forEach((value, index) => {
    const absValue = Math.abs(value);
    if(calculationMap.has(absValue)) {
      result[index] = calculationMap.get(absValue) as number;
    } else {
      result[index] = absValue*absValue;
      calculationMap.set(absValue, result[index]);
    }
  });
  return result;
}
