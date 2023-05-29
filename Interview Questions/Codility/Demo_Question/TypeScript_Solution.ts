function solution(A: number[]): number {
  const set = new Set(A);
  let i = 1;
  while (set.has(i)) {
    i++;
  }
  return i;
}
