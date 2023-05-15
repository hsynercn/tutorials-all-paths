class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export function findClosestValueInBst(tree: BST, target: number) {
  // Write your code here.

  let selectedValue = tree.value;
  let currentNode: BST | null = tree;
  while (currentNode !== null) {
    if (
      Math.abs(selectedValue - target) > Math.abs(currentNode.value - target)
    ) {
      selectedValue = currentNode.value;
    }
    if (currentNode.value > target) {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }
  }
  return selectedValue;
}
