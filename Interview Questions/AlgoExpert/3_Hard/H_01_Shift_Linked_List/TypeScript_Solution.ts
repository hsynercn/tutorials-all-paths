// This is the class of the input linked list.
export class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

export function shiftLinkedList(head: LinkedList, k: number) {
  // Write your code here.
  let size = 0;
  let temp = head;
  while (temp) {
    console.log(temp.value);
    size++;
    temp = temp.next as LinkedList;
  }
  console.log("size: " + size);
  let shift = k % size;

  if (shift < 0) {
    shift = size + shift;
  }

  if (shift === 0) {
    return head;
  }

  const remain = size - shift;
  let iterator = 1;
  temp = head;
  let newEnd: LinkedList = head;
  let newBegin: LinkedList = head;
  let mergePoint: LinkedList = head;
  while (temp) {
    console.log(temp.value);
    if (iterator === remain) {
      console.log("remain end: " + temp.value);
      newEnd = temp;
      newBegin = newEnd.next as LinkedList;
    } else if (iterator === size) {
      mergePoint = temp;
    }
    iterator++;
    temp = temp.next as LinkedList;
  }
  newEnd.next = null;
  mergePoint.next = head;
  return newBegin;
}
