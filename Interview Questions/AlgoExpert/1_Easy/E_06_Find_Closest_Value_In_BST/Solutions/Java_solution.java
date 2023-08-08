import java.util.*;
import java.lang.Math;

class Program {
  public static int findClosestValueInBst(BST tree, int target) {
    int selectedValue = tree.value;
    BST currentNode = tree;
    while (currentNode != null) {
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

  static class BST {
    public int value;
    public BST left;
    public BST right;

    public BST(int value) {
      this.value = value;
    }
  }
}
