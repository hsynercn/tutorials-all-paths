export function twoNumberSum(array: number[], targetSum: number): number[] {
    const set = new Set<number>();
    let result: number[] = [];
    array.forEach(value => {
      const required = targetSum - value;
      if(set.has(required)) {
        result = [required, value];
      }
      set.add(value);
    })
    return result;
  }
  