function tournamentWinner(competitions, results) {
  // Write your code here.

  const points = {};

  for (let i = 0; i < competitions.length; i++) {
    const winner = results[i] === 0 ? competitions[i][1] : competitions[i][0];
    if (!points[winner]) points[winner] = 0;
    points[winner] += 3;
  }
  let maxPoint = -1;
  let winner = "";
  for (const [key, value] of Object.entries(points)) {
    if (value >= maxPoint) {
      winner = key;
      maxPoint = value;
    }
  }
  return winner;
}

// Do not edit the line below.
exports.tournamentWinner = tournamentWinner;
