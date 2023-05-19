function riverSizes(matrix) {
  // Write your code here.
  const visited = matrix.map((r) => r.map((c) => false));
  const result = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      //console.log(i, j, visited[i, j], matrix[i, j] )
      if (visited[i][j]) continue;
      if (matrix[i][j] === 0) {
        visited[i][j] = true;
        continue;
      }
      const treeInfo = { treeCount: 0 };
      bfsTree(i, j, matrix, visited, treeInfo);
      console.log(treeInfo.treeCount);
      if (treeInfo.treeCount > 0) result.push(treeInfo.treeCount);
    }
  }
  return result;
}

function bfsTree(i, j, matrix, visited, treeInfo) {
  if (visited[i][j]) return;
  visited[i][j] = true;
  if (matrix[i][j] === 0) return;
  treeInfo.treeCount++;
  const neighbours = getNeighbours(i, j, matrix, visited, treeInfo);
  console.log(i, j, neighbours);
  for (const neighbour of neighbours) {
    bfsTree(neighbour[0], neighbour[1], matrix, visited, treeInfo);
  }
}
function getNeighbours(i, j, matrix, visited) {
  const neighbours = [];
  if (i - 1 >= 0 && !visited[i - 1][j]) neighbours.push([i - 1, j]);
  if (i + 1 <= matrix.length - 1 && !visited[i + 1][j])
    neighbours.push([i + 1, j]);
  if (j - 1 >= 0 && !visited[i][j - 1]) neighbours.push([i, j - 1]);
  if (j + 1 <= matrix[0].length - 1 && !visited[i][j + 1])
    neighbours.push([i, j + 1]);
  return neighbours;
}
// Do not edit the line below.
exports.riverSizes = riverSizes;
