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

export function inOrderTraverse(tree: BST | null, array: number[]): number[] {
  // Write your code here.

  return inOrderTraverseArray(tree);
}

export function preOrderTraverse(tree: BST | null, array: number[]) {
  // Write your code here.
  return preOrderTraverseArray(tree);
}

export function postOrderTraverse(tree: BST | null, array: number[]) {
  // Write your code here.
  return postOrderTraverseArray(tree);
}

function inOrderTraverseArray(tree: BST | null): number[] {
  if (!tree) {
    return [];
  }

  return [
    ...inOrderTraverseArray(tree.left),
    tree.value,
    ...inOrderTraverseArray(tree.right),
  ];
}

function preOrderTraverseArray(tree: BST | null): number[] {
  if (!tree) {
    return [];
  }

  return [
    tree.value,
    ...preOrderTraverseArray(tree.left),
    ...preOrderTraverseArray(tree.right),
  ];
}

function postOrderTraverseArray(tree: BST | null): number[] {
  if (!tree) {
    return [];
  }

  return [
    ...postOrderTraverseArray(tree.left),
    ...postOrderTraverseArray(tree.right),
    tree.value,
  ];
}
