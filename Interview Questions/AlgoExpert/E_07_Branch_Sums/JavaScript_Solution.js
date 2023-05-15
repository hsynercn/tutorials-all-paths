// This is the class of the input root.
// Do not edit it.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function branchSums(root) {
  // Write your code here.
  const results = [];
  traverseTree(root, results, 0);
  return results;
}

function traverseTree(root, results, sum) {
  if (!root) {
    return;
  }
  const newSum = sum + root.value;
  if (!root.left && !root.right) {
    results.push(newSum);
  }
  traverseTree(root.left, results, newSum);
  traverseTree(root.right, results, newSum);
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.branchSums = branchSums;
