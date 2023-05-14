export function tournamentWinner(competitions: string[][], results: number[]) {
  const pointMap = new Map<string, number>();
  results.forEach((value, index) => {
    const winner =
      value === 1 ? competitions[index][0] : competitions[index][1];
    if (!pointMap.has(winner)) {
      pointMap.set(winner, 3);
    } else {
      const point = pointMap.get(winner) as number;
      pointMap.set(winner, point + 3);
    }
  });
  let maxPoint = -1;
  let winner = "";
  pointMap.forEach((value, key) => {
    if (value > maxPoint) {
      winner = key;
      maxPoint = value;
    }
  });
  return winner;
}
