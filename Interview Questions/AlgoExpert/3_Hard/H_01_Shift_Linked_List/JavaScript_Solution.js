// This is the class of the input linked list.
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function shiftLinkedList(head, k) {
  // Write your code here.
  const { tail, length } = getLength(head);
  const newHeadDist = negativeMod(-1 * k, length);
  console.log(newHeadDist);
  if (!newHeadDist) return head;
  let newTail = head;
  for (let i = 0; i < newHeadDist - 1; i++) {
    newTail = newTail.next;
  }
  let newHead = newTail.next;
  tail.next = head;
  newTail.next = null;
  return newHead;
}

function getLength(head) {
  let traverse = head;
  let count = 1;
  while (traverse.next) {
    traverse = traverse.next;
    count++;
  }
  return { tail: traverse, length: count };
}
function negativeMod(k, length) {
  return ((k % length) + length) % length;
}
// Do not edit the lines below.
exports.LinkedList = LinkedList;
exports.shiftLinkedList = shiftLinkedList;
