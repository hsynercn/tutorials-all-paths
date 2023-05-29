export function sortStack(stack: number[]) {
  // Write your code here.
  sort(stack);
  return stack;
}

function sort(stack: number[]) {
  if (stack.length != 0) {
    const value = stack.pop() as number;
    console.log("value: " + value);
    if (stack.length == 0) {
      stack.push(value);
      console.log("Bottom: " + value);
      console.log("Stack: " + stack);
      return;
    } else {
      sort(stack);
    }
    console.log(stack);
    console.log("value: " + value + " head: " + stack[stack.length - 1]);
    if (value > stack[stack.length - 1]) {
      stack.push(value);
      return;
    } else {
      const moveUp = stack.pop() as number;
      stack.push(value);
      sort(stack);
      stack.push(moveUp);
      return;
    }
  }
  console.log(stack);
}
