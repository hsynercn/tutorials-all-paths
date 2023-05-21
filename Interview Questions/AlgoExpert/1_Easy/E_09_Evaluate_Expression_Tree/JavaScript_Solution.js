// This is an input class. Do not edit.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function evaluateExpressionTree(tree) {
  // Write your code here.
  if (!tree) return;
  if (tree.value === -1) {
    return (
      evaluateExpressionTree(tree.left) + evaluateExpressionTree(tree.right)
    );
  } else if (tree.value === -2) {
    return (
      evaluateExpressionTree(tree.left) - evaluateExpressionTree(tree.right)
    );
  } else if (tree.value === -3) {
    const x =
      evaluateExpressionTree(tree.left) / evaluateExpressionTree(tree.right);
    return x < 0 ? Math.ceil(x) : Math.floor(x);
  } else if (tree.value === -4) {
    return (
      evaluateExpressionTree(tree.left) * evaluateExpressionTree(tree.right)
    );
  } else {
    return tree.value;
  }

  return -1;
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.evaluateExpressionTree = evaluateExpressionTree;
