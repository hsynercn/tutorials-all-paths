// This is an input class. Do not edit.
export class LinkedList {
    value: number;
    next: LinkedList | null;

    constructor(value: number) {
        this.value = value;
        this.next = null;
    }
}

export function middleNode(linkedList: LinkedList) {
    // Write your code here.
    let midNode = linkedList;
    let currentNode = linkedList;
    let index = 0;
    while (currentNode) {
        index++;
        if (index % 2 === 0) {
            midNode = midNode.next as LinkedList;
        }
        currentNode = currentNode.next as LinkedList;
    }
    return midNode;
}
