function findClosestValueInBst(tree, target) {
  // Write your code here.
  let traverse = tree;
  let closest = traverse;
  while (traverse) {
    if (Math.abs(traverse.value - target) < Math.abs(closest.value - target)) {
      closest = traverse;
    }
    if (target > traverse.value) {
      traverse = traverse.right;
    } else if (target < traverse.value) {
      traverse = traverse.left;
    } else break;
  }
  return closest.value;
}

// This is the class of the input tree. Do not edit.
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Do not edit the line below.
exports.findClosestValueInBst = findClosestValueInBst;
