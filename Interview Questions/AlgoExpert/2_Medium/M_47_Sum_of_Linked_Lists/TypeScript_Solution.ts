// This is an input class. Do not edit.
export class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

export function sumOfLinkedLists(
  linkedListOne: LinkedList,
  linkedListTwo: LinkedList
) {
  // Write your code here.
  let headOne = linkedListOne;
  let headTwo = linkedListTwo;
  let previous = undefined;
  let extra = 0;
  let newHead = undefined;
  while (headOne && headTwo) {
    let sum = headOne.value + headTwo.value + extra;
    sum > 9 ? (extra = 1) : (extra = 0);
    sum %= 10;
    const node = new LinkedList(sum);
    if (previous) {
      previous.next = node;
    }
    if (!newHead) {
      newHead = node;
    }
    previous = node;
    headOne = headOne.next as LinkedList;
    headTwo = headTwo.next as LinkedList;
  }

  let remainer = undefined;

  if (headOne) {
    remainer = headOne;
  } else if (headTwo) {
    remainer = headTwo;
  }
  while (remainer) {
    let sum = remainer.value + extra;
    sum > 9 ? (extra = 1) : (extra = 0);
    sum %= 10;
    const node = new LinkedList(sum);
    if (previous) {
      previous.next = node;
    }
    previous = node;
    remainer = remainer.next as LinkedList;
  }

  if (extra > 0) {
    const node = new LinkedList(extra);
    if (previous) {
      previous.next = node;
    }
    previous = node;
  }
  return newHead;
}
