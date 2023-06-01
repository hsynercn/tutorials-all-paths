// Do not edit the class below except
// for the breadthFirstSearch method.
// Feel free to add new properties
// and methods to the class.
export class Node {
  name: string;
  children: Node[];

  constructor(name: string) {
    this.name = name;
    this.children = [];
  }

  addChild(name: string): Node {
    this.children.push(new Node(name));
    return this;
  }

  breadthFirstSearch(array: string[]) {
    // Write your code here.
    const qeueu: Node[] = [];
    qeueu.push(this);
    while (qeueu.length > 0) {
      let currentNode = qeueu.shift() as Node;
      array.push(currentNode.name);
      currentNode.children.forEach((node) => {
        qeueu.push(node);
      });
    }
    return array;
  }
}

function bfs(node: Node, qeueu: Node[]) {}
