// This is the class of the input root.
// Do not edit it.
class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export function branchSums(root: BinaryTree): number[] {
  // Write your code here.
  const nodeStack: BinaryTree[] = [];
  const result: number[] = [];
  const nodeSumMap = new Map<BinaryTree, number>();
  nodeSumMap.set(root, root.value);
  nodeStack.push(root);
  while (nodeStack.length > 0) {
    const currentNode: BinaryTree = nodeStack.pop() as BinaryTree;
    const previousNodeSum = nodeSumMap.get(currentNode) as number;
    if (currentNode.right) {
      nodeSumMap.set(
        currentNode.right,
        previousNodeSum + currentNode.right.value
      );
      nodeStack.push(currentNode.right);
    }
    if (currentNode.left) {
      nodeSumMap.set(
        currentNode.left,
        previousNodeSum + currentNode.left.value
      );
      nodeStack.push(currentNode.left);
    }
    if (currentNode.left === null && currentNode.right === null) {
      console.log("leaf:" + previousNodeSum);
      result.push(previousNodeSum);
    }
  }
  return result;
}
