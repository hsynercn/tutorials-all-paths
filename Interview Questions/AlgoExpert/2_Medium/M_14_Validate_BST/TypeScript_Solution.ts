// This is an input class. Do not edit.
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

export function validateBst(tree: BST) {
  // Write your code here.
  return dfs(tree, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
}

function dfs(tree: BST, min: number, max: number): boolean {
  if (tree.left && tree.left.value >= tree.value) {
    return false;
  }
  if (tree.right && tree.right.value < tree.value) {
    return false;
  }
  if (tree.value >= max || tree.value < min) {
    return false;
  }
  let left = tree.left ? dfs(tree.left, min, tree.value) : true;
  let right = tree.right ? dfs(tree.right, tree.value, max) : true;
  return left && right;
}
