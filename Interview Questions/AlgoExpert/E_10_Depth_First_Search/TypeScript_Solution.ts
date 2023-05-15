// Do not edit the class below except
// for the depthFirstSearch method.
// Feel free to add new properties
// and methods to the class.
export class Node {
  name: string;
  children: Node[];

  constructor(name: string) {
    this.name = name;
    this.children = [];
  }

  addChild(name: string) {
    this.children.push(new Node(name));
    return this;
  }

  depthFirstSearch(array: string[]) {
    // Write your code here.
    const stack: Node[] = [];
    stack.push(this);
    while (stack.length > 0) {
      const curentNode = stack.pop() as Node;
      array.push(curentNode.name);
      if (curentNode.children.length > 0) {
        curentNode.children.reverse().forEach((child) => {
          stack.push(child);
        });
      }
    }
    return array;
  }
}
