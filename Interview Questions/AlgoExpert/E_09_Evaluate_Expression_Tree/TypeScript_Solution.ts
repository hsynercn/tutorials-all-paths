// This is an input class. Do not edit.
export class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function calculateNode(node: BinaryTree): number {
  if (node.value === -1) {
    return (
      calculateNode(node.left as BinaryTree) +
      calculateNode(node.right as BinaryTree)
    );
  } else if (node.value === -2) {
    return (
      calculateNode(node.left as BinaryTree) -
      calculateNode(node.right as BinaryTree)
    );
  } else if (node.value === -3) {
    const res =
      calculateNode(node.left as BinaryTree) /
      calculateNode(node.right as BinaryTree);
    return res < 0 ? Math.ceil(res) : Math.floor(res);
  } else if (node.value === -4) {
    return (
      calculateNode(node.left as BinaryTree) *
      calculateNode(node.right as BinaryTree)
    );
  }
  return node.value;
}

export function evaluateExpressionTree(tree: BinaryTree) {
  // Write your code here.
  return calculateNode(tree);
}
