export function nodeDepths(root: BinaryTree) {
  // Write your code here.
  let totalDepth = 0;
  const stack: BinaryTree[] = [];
  const depthMap = new Map<BinaryTree, number>();
  depthMap.set(root, 0);
  stack.push(root);
  while (stack.length > 0) {
    const currentNode = stack.pop() as BinaryTree;
    const currentDepth = depthMap.get(currentNode) as number;
    totalDepth += currentDepth;
    if (currentNode.right) {
      depthMap.set(currentNode.right, currentDepth + 1);
      stack.push(currentNode.right);
    }
    if (currentNode.left) {
      depthMap.set(currentNode.left, currentDepth + 1);
      stack.push(currentNode.left);
    }
  }
  return totalDepth;
}

// This is the class of the input binary tree.
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
