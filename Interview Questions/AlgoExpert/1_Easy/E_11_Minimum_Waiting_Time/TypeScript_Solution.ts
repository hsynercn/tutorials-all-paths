export function minimumWaitingTime(queries: number[]) {
  // Write your code here.

  //1,4,5
  //0,1,5 = 6

  //4,1,5
  //0,4,5 = 9

  //5,4,1
  //0,5,9 = 14

  queries = queries.sort((a, b) => a - b);
  let sum = 0;
  let currentWaitingTime = 0;
  queries.forEach((time) => {
    sum += currentWaitingTime;
    currentWaitingTime += time;
  });
  return sum;
}
