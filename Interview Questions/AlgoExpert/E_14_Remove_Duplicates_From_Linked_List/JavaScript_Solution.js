// This is an input class. Do not edit.
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function removeDuplicatesFromLinkedList(linkedList) {
  // Write your code here.
  let traverse = linkedList;
  let back = null;
  while (traverse) {
    if (traverse.value === back?.value) {
      back.next = traverse.next;
    } else {
      back = traverse;
    }
    traverse = traverse.next;
  }
  return linkedList;
}

// Do not edit the lines below.
exports.LinkedList = LinkedList;
exports.removeDuplicatesFromLinkedList = removeDuplicatesFromLinkedList;
