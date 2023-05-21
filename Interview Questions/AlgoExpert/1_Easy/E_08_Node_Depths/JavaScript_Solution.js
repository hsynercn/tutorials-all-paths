function nodeDepths(root) {
  // Write your code here.
  return traverseTree(root, 0);
}

function traverseTree(root, depth) {
  if (!root) return 0;

  return (
    depth +
    traverseTree(root.left, depth + 1) +
    traverseTree(root.right, depth + 1)
  );
}

// This is the class of the input binary tree.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Do not edit the line below.
exports.nodeDepths = nodeDepths;
