export function cycleInGraph(edges: number[][]) {
  // Write your code here.
  let visitedNodes = new Set<number>();

  let cycle = false;
  let i = 0;
  while (i < edges.length && cycle === false) {
    cycle = cycle || dfs(edges, i, visitedNodes);
    i++;
  }
  return cycle;
}

function dfs(
  edges: number[][],
  node: number,
  visitedNodes: Set<number>
): boolean {
  visitedNodes.add(node);
  let cycle = false;
  edges[node].forEach((connected) => {
    if (visitedNodes.has(connected)) {
      cycle = true;
    }
  });
  if (cycle) {
    return true;
  }
  for (let index = 0; index < edges[node].length; index++) {
    cycle = cycle || dfs(edges, edges[node][index], visitedNodes);
  }
  visitedNodes.delete(node);
  return cycle;
}
