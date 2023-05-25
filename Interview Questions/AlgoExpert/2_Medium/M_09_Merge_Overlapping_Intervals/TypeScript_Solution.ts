export function mergeOverlappingIntervals(array: number[][]) {
    // Write your code here.
    array.sort((a,b) => a[0] - b[0]);
    let result: number[] = [];
  
    let i = 1;
    while (i < array.length) {
      if(!(array[i-1][1] < array[i][0])) {
        array[i][0] = array[i-1][0];
        if(array[i-1][1] > array[i][1]) {
          array[i][1] = array[i-1][1];
        }
        array.splice(i-1, 1);
        i--;
      }
      i++;
    }
    return array;
  }
  