// This is an input class. Do not edit.
export class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

export function removeDuplicatesFromLinkedList(linkedList: LinkedList) {
  // Write your code here.
  let currentNode = linkedList;
  let lastSelectedNode = currentNode;
  while (currentNode) {
    currentNode = currentNode.next as LinkedList;
    if (currentNode) {
      if (lastSelectedNode.value === currentNode.value) {
        lastSelectedNode.next = currentNode.next;
      } else {
        lastSelectedNode = currentNode;
      }
    }
  }
  return linkedList;
}
