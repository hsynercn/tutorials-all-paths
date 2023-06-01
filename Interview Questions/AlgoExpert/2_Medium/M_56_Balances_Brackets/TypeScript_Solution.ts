export function balancedBrackets(string: string) {
  // Write your code here.
  const stack: string[] = [];

  const chars = [...string];
  let i = 0;
  let balanced = true;
  while (i < chars.length && balanced) {
    if (["(", "[", "{"].includes(chars[i])) {
      stack.push(chars[i]);
      console.log(stack);
    } else if ([")", "]", "}"].includes(chars[i])) {
      if (
        (chars[i] === ")" && stack[stack.length - 1] === "(") ||
        (chars[i] === "]" && stack[stack.length - 1] === "[") ||
        (chars[i] === "}" && stack[stack.length - 1] === "{")
      ) {
        stack.pop();
      } else {
        balanced = false;
      }
    }
    i++;
  }
  console.log(stack);
  if (stack.length > 0) {
    balanced = false;
  }
  return balanced;
}
