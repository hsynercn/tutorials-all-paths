export function nodeDepths(root: BinaryTree) {
  // Write your code here.
  let totalDepth = 0;
  const stack: BinaryTree[] = [];
  root.depth = 0;
  stack.push(root);
  while (stack.length > 0) {
    const currentNode = stack.pop() as BinaryTree;
    totalDepth += currentNode.depth as number;
    if (currentNode.right) {
      currentNode.right.depth = (currentNode.depth as number) + 1;
      stack.push(currentNode.right);
    }
    if (currentNode.left) {
      currentNode.left.depth = (currentNode.depth as number) + 1;
      stack.push(currentNode.left);
    }
  }
  return totalDepth;
}

// This is the class of the input binary tree.
class BinaryTree {
  value: number;
  depth?: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
